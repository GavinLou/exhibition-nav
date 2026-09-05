-- 为Park_Network创建pgRouting拓扑
-- 这会自动生成source和target字段，连接路网的节点

DO $$
DECLARE
    has_data BOOLEAN;
    has_topology BOOLEAN;
    vertex_count INTEGER;
BEGIN
    -- 檢查 Park_Network 是否有資料
    SELECT EXISTS (SELECT 1 FROM "Park_Network" LIMIT 1) INTO has_data;

    -- 檢查拓撲表是否存在
    SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'Park_Network_vertices_pgr'
    ) INTO has_topology;

    IF NOT has_data THEN
        RAISE NOTICE 'Park_Network is empty, skipping topology creation';
        RETURN;
    END IF;

    RAISE NOTICE 'Park_Network has data, proceeding with topology setup...';

    -- 如果拓撲表不存在，或者存在但沒有頂點，需要創建拓撲
    IF has_topology THEN
        SELECT COUNT(*) INTO vertex_count FROM "Park_Network_vertices_pgr";
        IF vertex_count > 0 THEN
            RAISE NOTICE 'Topology already exists with % vertices', vertex_count;
            RETURN;
        END IF;
        RAISE NOTICE 'Topology table exists but is empty, recreating...';
    ELSE
        RAISE NOTICE 'Topology does not exist, creating...';
    END IF;

    -- 清空 source 和 target 字段，確保 pgr_createTopology 能正確執行
    UPDATE "Park_Network" SET source = NULL, target = NULL;
    RAISE NOTICE 'Cleared source and target fields';

    -- 更新 length_m, cost 和 reverse_cost 字段（基於實際幾何長度）
    UPDATE "Park_Network"
    SET
        length_m = ST_Length(geom::geography),
        cost = ST_Length(geom::geography),
        reverse_cost = ST_Length(geom::geography)
    WHERE ST_Length(geom::geography) > 0;
    RAISE NOTICE 'Updated length_m, cost, and reverse_cost fields';

    -- 创建拓扑（容差设为0.00001度，约1米，clean := true 清理舊數據）
    PERFORM pgr_createTopology('Park_Network', 0.00001, 'geom', 'id', clean := true);

    -- 獲取創建的頂點數量
    SELECT COUNT(*) INTO vertex_count FROM "Park_Network_vertices_pgr";
    RAISE NOTICE 'pgRouting topology created successfully with % vertices', vertex_count;

    -- 分析拓扑，检查是否有问题
    PERFORM pgr_analyzeGraph('Park_Network', 0.00001, 'geom', 'id');
    RAISE NOTICE 'Topology analysis complete';

EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error creating topology: %', SQLERRM;
END $$;

-- 创建空间索引以提高查询性能
CREATE INDEX IF NOT EXISTS park_network_source_idx ON "Park_Network"(source);
CREATE INDEX IF NOT EXISTS park_network_target_idx ON "Park_Network"(target);
CREATE INDEX IF NOT EXISTS park_network_geom_idx ON "Park_Network" USING GIST(geom);
