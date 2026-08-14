-- 为Park_Network创建pgRouting拓扑
-- 这会自动生成source和target字段，连接路网的节点

-- 创建拓扑（容差设为0.00001度，约1米）
SELECT pgr_createTopology('public."Park_Network"', 0.00001, 'geom', 'id');

-- 分析拓扑，检查是否有问题
SELECT pgr_analyzeGraph('public."Park_Network"', 0.00001, 'geom', 'id');

-- 创建空间索引以提高查询性能
CREATE INDEX IF NOT EXISTS park_network_source_idx ON "Park_Network"(source);
CREATE INDEX IF NOT EXISTS park_network_target_idx ON "Park_Network"(target);
CREATE INDEX IF NOT EXISTS park_network_geom_idx ON "Park_Network" USING GIST(geom);
