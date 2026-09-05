-- 手動重建 Park_Network 拓撲
-- 使用方式：
-- docker exec bmc_gis_db psql -U GavinLou -d bmc_navigation -f /docker-entrypoint-initdb.d/maintenance/recreate_topology.sql

\echo '=========================================='
\echo '開始重建 Park_Network 拓撲'
\echo '=========================================='

-- 檢查資料數量
\echo '檢查 Park_Network 資料...'
SELECT COUNT(*) as total_edges FROM "Park_Network";

-- 清空 source 和 target
\echo '清空 source 和 target 字段...'
UPDATE "Park_Network" SET source = NULL, target = NULL;

-- 更新長度和 cost
\echo '更新 length_m, cost, reverse_cost 字段...'
UPDATE "Park_Network"
SET
    length_m = ST_Length(geom::geography),
    cost = ST_Length(geom::geography),
    reverse_cost = ST_Length(geom::geography)
WHERE ST_Length(geom::geography) > 0;

-- 刪除舊的拓撲表（如果存在）
\echo '清理舊的拓撲表...'
DROP TABLE IF EXISTS "Park_Network_vertices_pgr";

-- 重建拓撲
\echo '創建新拓撲...'
SELECT pgr_createTopology('Park_Network', 0.00001, 'geom', 'id', clean := true);

-- 分析拓撲
\echo '分析拓撲...'
SELECT pgr_analyzeGraph('Park_Network', 0.00001, 'geom', 'id');

-- 顯示結果
\echo '=========================================='
\echo '拓撲重建完成！'
\echo '=========================================='
\echo '統計信息：'
SELECT
    (SELECT COUNT(*) FROM "Park_Network") as total_edges,
    (SELECT COUNT(*) FROM "Park_Network_vertices_pgr") as total_vertices,
    (SELECT COUNT(*) FROM "Park_Network" WHERE source IS NOT NULL) as edges_with_source,
    (SELECT ROUND(AVG(cost)::numeric, 2) FROM "Park_Network") as avg_cost;

-- 測試路徑查詢（取前兩個頂點測試）
\echo '測試路徑查詢...'
SELECT
    CASE
        WHEN COUNT(*) > 0 THEN '✓ 路徑查詢正常'
        ELSE '✗ 路徑查詢失敗'
    END as test_result
FROM pgr_dijkstra(
    'SELECT id, source, target, cost, reverse_cost FROM "Park_Network"',
    (SELECT id FROM "Park_Network_vertices_pgr" ORDER BY id LIMIT 1),
    (SELECT id FROM "Park_Network_vertices_pgr" ORDER BY id LIMIT 1 OFFSET 1),
    directed := false
);
