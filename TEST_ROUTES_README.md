# 景点和路线测试系统

## 功能说明

这是一个测试页面，用于验证数据库架构和前端功能：
- ✅ 显示所有景点（从 Base_Location、Attractions、Attractions_Translations 表读取）
- ✅ 支持多语言景点信息（繁体中文、英文、日文）
- ✅ 两条独立路线规划（路线A和路线B）
- ✅ 实时计算路线距离和步行时间
- ✅ 动态添加/删除/排序景点
- ✅ 地图显示景点和路线
- ✅ 鼠标悬停显示景点介绍

## 访问地址

前端页面: http://localhost:3000/test-routes

## 已完成的功能

### 后端 API

1. **GET /api/attractions** - 获取所有景点列表
   - 返回13个景点的完整信息
   - 包含多语言翻译数据

2. **GET /api/attractions/{id}** - 获取单个景点详情

3. **GET /api/route/calculate** - 计算两点之间的路径
   - 参数: start_lat, start_lon, end_lat, end_lon
   - 返回距离（米）和预估时间（分钟）
   - 当前使用直线距离计算

4. **POST /api/itinerary/calculate** - 计算整条路线
   - 请求体: { "attraction_ids": ["uuid1", "uuid2", ...] }
   - 返回总距离、总时间和路径GeoJSON

### 前端功能

1. **地图显示**
   - 使用 MapLibre GL 显示 OpenStreetMap 地图
   - 蓝色标记显示所有景点
   - 红色线条显示路线A
   - 蓝色线条显示路线B

2. **路线管理**
   - 两个独立路线面板（路线A和路线B）
   - 显示每条路线的总距离和预估时间
   - 支持上下移动景点改变顺序
   - 支持删除景点

3. **景点选择**
   - 底部显示所有景点网格
   - 点击按钮添加到路线A或路线B
   - 已添加的景点按钮会被禁用

4. **语言切换**
   - 支持繁体中文、英文、日文切换
   - 景点名称和描述会随语言改变

5. **交互功能**
   - 鼠标悬停景点标记显示弹窗
   - 显示景点标题和描述
   - 自动调整地图视野显示所有景点

## 数据库状态

- ✅ Base_Location: 13个位置点
- ✅ Attractions: 13个景点
- ✅ Attractions_Translations: 多语言翻译数据
- ✅ Park_Network: 71条路网段
- ✅ pgRouting拓扑已创建（source/target字段已生成）
- ✅ 路网长度和成本已计算

## 测试步骤

1. 确保所有服务正在运行:
   ```bash
   docker compose up -d
   ```

2. 访问测试页面:
   ```
   http://localhost:3000/test-routes
   ```

3. 测试功能:
   - 点击"显示所有景点"按钮查看地图上的13个景点
   - 从底部景点列表添加景点到路线A或路线B
   - 使用↑↓按钮调整景点顺序
   - 观察路线时间和距离的实时更新
   - 切换语言查看翻译效果
   - 鼠标悬停景点查看详细介绍

## 下一步改进

1. **路径算法升级**
   - 目前使用直线距离
   - 可升级为使用 pgRouting 计算实际路网路径

2. **UI美化**
   - 添加更好的样式和动画
   - 改进路线颜色和标记样式

3. **功能增强**
   - 添加景点搜索
   - 保存和分享路线
   - 打印路线PDF

## API 测试示例

```bash
# 获取所有景点
curl http://localhost:8000/api/attractions | jq '.'

# 计算路径
curl "http://localhost:8000/api/route/calculate?start_lat=22.757614&start_lon=120.439726&end_lat=22.757811&end_lon=120.438949" | jq '.'

# 计算完整行程
curl -X POST http://localhost:8000/api/itinerary/calculate \
  -H "Content-Type: application/json" \
  -d '{"attraction_ids": ["uuid1", "uuid2", "uuid3"]}' | jq '.'
```

## 技术栈

**后端:**
- FastAPI
- SQLAlchemy
- PostgreSQL + PostGIS + pgRouting
- Pydantic

**前端:**
- Next.js 14
- React
- TypeScript
- MapLibre GL JS
- Tailwind CSS
