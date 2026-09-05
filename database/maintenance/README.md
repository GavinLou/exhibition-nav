# 数据库维护脚本

## 拓扑重建脚本

### 使用场景

当遇到以下情况时需要重建拓扑：

1. **行程路线优化API返回500错误**
   - 错误信息包含 `Park_Network_vertices_pgr does not exist`
   - 或 `InFailedSqlTransaction`

2. **路网数据更新后**
   - 新增或修改了 Park_Network 中的路径数据
   - 需要重新计算拓扑关系

3. **cost字段异常**
   - cost、reverse_cost 或 length_m 字段为 0
   - 路径规划结果不正确

### 使用方法

#### 方法1：使用Docker（推荐）

```bash
# 在项目根目录执行
docker exec -i bmc_gis_db psql -U GavinLou -d bmc_navigation < database/maintenance/recreate_topology.sql
```

#### 方法2：进入容器执行

```bash
# 1. 进入数据库容器
docker exec -it bmc_gis_db psql -U GavinLou -d bmc_navigation

# 2. 在 psql 提示符下执行
\i /docker-entrypoint-initdb.d/maintenance/recreate_topology.sql
```

#### 方法3：直接执行SQL命令

```bash
# 完整的重建流程
docker exec bmc_gis_db psql -U GavinLou -d bmc_navigation -c "
-- 清空 source 和 target
UPDATE \"Park_Network\" SET source = NULL, target = NULL;

-- 更新長度和 cost
UPDATE \"Park_Network\"
SET
    length_m = ST_Length(geom::geography),
    cost = ST_Length(geom::geography),
    reverse_cost = ST_Length(geom::geography);

-- 創建拓撲
SELECT pgr_createTopology('Park_Network', 0.00001, 'geom', 'id', clean := true);

-- 分析拓撲
SELECT pgr_analyzeGraph('Park_Network', 0.00001, 'geom', 'id');
"
```

### 重建后必须重启后端

拓扑重建完成后，必须重启后端API服务以清除失败的数据库事务：

```bash
docker restart bmc_backend_api
```

### 验证拓扑是否正常

```bash
# 检查拓扑表
docker exec bmc_gis_db psql -U GavinLou -d bmc_navigation -c "
SELECT 
    (SELECT COUNT(*) FROM \"Park_Network\") as total_edges,
    (SELECT COUNT(*) FROM \"Park_Network_vertices_pgr\") as total_vertices,
    (SELECT COUNT(*) FROM \"Park_Network\" WHERE source IS NOT NULL) as edges_with_source;
"
```

预期结果：
- `total_edges`: 路网总边数（应该 > 0）
- `total_vertices`: 拓扑顶点数（应该 > 0）
- `edges_with_source`: 有source的边数（应该等于 total_edges）

### 常见问题

#### Q: 为什么需要清空 source 和 target？

A: `pgr_createTopology()` 在发现 source/target 已有值时，会认为拓扑已存在而跳过创建。清空这些字段可以确保拓扑被正确重建。

#### Q: cost 字段应该是什么值？

A: cost 字段应该等于路径的实际长度（米），通过 `ST_Length(geom::geography)` 计算得出。如果是 0，pgRouting 无法正确计算最短路径。

#### Q: 拓扑重建需要多长时间？

A: 对于 100-200 条路网数据，通常在 1-2 秒内完成。

## 维护建议

1. **定期备份数据库**
   ```bash
   docker exec bmc_gis_db pg_dump -U GavinLou bmc_navigation > backup.sql
   ```

2. **监控 API 错误日志**
   ```bash
   docker logs bmc_backend_api --tail 100 | grep -i error
   ```

3. **在生产环境部署前验证拓扑**
   - 确保 `Park_Network_vertices_pgr` 表存在且有数据
   - 测试行程优化API能否正常返回结果


🎯 使用方法

将来如果遇到同样的问题，只需执行：

# 重建拓扑
docker exec -i bmc_gis_db psql -U GavinLou -d bmc_navigation < database/maintenance/recreate_topology.sql

# 重启后端
docker restart bmc_backend_api