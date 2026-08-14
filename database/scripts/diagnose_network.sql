-- 路网连通性诊断脚本
-- 用于检查Park_Network表中是否有断开的路段

-- 1. 基本统计
SELECT '=== 路网基本统计 ===' as section;
SELECT
    COUNT(*) as total_edges,
    COUNT(DISTINCT source) as unique_sources,
    COUNT(DISTINCT target) as unique_targets,
    (SELECT COUNT(*) FROM "Park_Network_vertices_pgr") as total_vertices
FROM "Park_Network";

-- 2. 连通分量分析
SELECT '=== 连通分量分析 ===' as section;
SELECT
    component,
    COUNT(*) as vertex_count,
    ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM "Park_Network_vertices_pgr"), 1) as percentage
FROM pgr_connectedComponents(
    'SELECT id, source, target, cost, reverse_cost FROM "Park_Network"'
)
GROUP BY component
ORDER BY vertex_count DESC;

-- 3. 找出孤立的顶点（连接边数少于2的顶点）
SELECT '=== 孤立或端点顶点 ===' as section;
SELECT
    v.id,
    COUNT(pn.id) as edge_count,
    ST_Y(v.the_geom) as latitude,
    ST_X(v.the_geom) as longitude,
    ST_AsText(v.the_geom) as location
FROM "Park_Network_vertices_pgr" v
LEFT JOIN "Park_Network" pn ON v.id = pn.source OR v.id = pn.target
GROUP BY v.id, v.the_geom
HAVING COUNT(pn.id) <= 1
ORDER BY edge_count, v.id
LIMIT 20;

-- 4. 检查每个景点到最近路网节点的距离
SELECT '=== 景点到路网的距离 ===' as section;
SELECT
    a.id as attraction_id,
    bl.name,
    ROUND(MIN(ST_Distance(
        bl.geom::geography,
        v.the_geom::geography
    ))::numeric, 2) as distance_to_network_m
FROM "Attractions" a
JOIN "Base_Location" bl ON a.location_id = bl.id
CROSS JOIN "Park_Network_vertices_pgr" v
GROUP BY a.id, bl.name
ORDER BY distance_to_network_m DESC
LIMIT 10;

-- 5. 推荐需要连接的顶点对
SELECT '=== 建议连接的顶点对（断开的分量之间） ===' as section;
WITH components AS (
    SELECT node, component
    FROM pgr_connectedComponents('SELECT id, source, target, cost, reverse_cost FROM "Park_Network"')
),
component_stats AS (
    SELECT component, COUNT(*) as vertex_count
    FROM components
    GROUP BY component
),
top_components AS (
    SELECT component
    FROM component_stats
    ORDER BY vertex_count DESC
    LIMIT 3
)
SELECT
    c1.component as comp1,
    c2.component as comp2,
    v1.id as vertex1_id,
    v2.id as vertex2_id,
    ROUND(ST_Distance(v1.the_geom::geography, v2.the_geom::geography)::numeric, 2) as distance_m,
    ST_Y(v1.the_geom) as v1_lat,
    ST_X(v1.the_geom) as v1_lon,
    ST_Y(v2.the_geom) as v2_lat,
    ST_X(v2.the_geom) as v2_lon
FROM components c1
JOIN "Park_Network_vertices_pgr" v1 ON c1.node = v1.id
JOIN components c2 ON c1.component < c2.component
JOIN "Park_Network_vertices_pgr" v2 ON c2.node = v2.id
WHERE c1.component IN (SELECT component FROM top_components)
  AND c2.component IN (SELECT component FROM top_components)
  AND ST_Distance(v1.the_geom::geography, v2.the_geom::geography) < 100  -- 100米以内
ORDER BY distance_m
LIMIT 10;
