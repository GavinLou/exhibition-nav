# 資料庫工具使用說明

## 目錄結構

```
database/
├── data/              # CSV 資料檔案目錄
│   ├── Visiter.csv
│   ├── Attractions.csv
│   └── ...（所有表的 CSV 模板）
├── scripts/           # 工具腳本
│   ├── generate_csv_templates.sh   # 生成 CSV 模板
│   └── csv_to_sql.py               # CSV 轉 SQL 工具
└── init-scripts/      # 資料庫初始化腳本
```

## 使用步驟

### 1. 導出現有資料（Excel 可直接開啟）✅

**已完成！** 所有現有資料已導出並包含 UTF-8 BOM，Excel 可直接開啟，中文正常顯示。

```bash
cd database/scripts
./export_data_to_csv_excel.sh
```

**已導出的表**：
- Base_Location (41 筆)
- Attractions (41 筆)
- Attractions_Translations (41 筆)
- Visiter (10 筆)
- Recommended_Itinerary_Group (8 筆)
- Recommended_Itinerary_Item (8 筆)
- Recommended_Itinerary_Translations (2 筆)

### 1-B. 生成空白 CSV 模板（可選）

如果需要其他表的空白模板：

```bash
cd database/scripts
./generate_csv_templates.sh
```

### 2. 編輯 CSV 檔案

1. 打開你想要匯入資料的 CSV 檔案（例如 `data/Visiter.csv`）
2. 在第一行（欄位名稱）下方添加資料
3. 每一行代表一筆記錄

**範例：Visiter.csv**

```csv
id,email,hashed_password,name,gender,phone,is_active,is_verified,created_at,update_at
550e8400-e29b-41d4-a716-446655440001,test@example.com,hashed_pw,測試用戶,male,0912345678,true,true,2024-01-15 10:30:00,2024-01-15 10:30:00
```

#### 資料格式說明

- **UUID**：使用標準 UUID 格式（例如 `550e8400-e29b-41d4-a716-446655440001`）
- **日期時間**：`YYYY-MM-DD HH:MM:SS` 或 `YYYY-MM-DD`
- **布林值**：`true` / `false`
- **數字**：直接輸入數字
- **字串**：直接輸入文字
- **空值**：留空或填入 `NULL`
- **POINT 座標**：`POINT(經度 緯度)`，例如 `POINT(120.4407 22.7543)`
- **LINESTRING**：`LINESTRING(lng1 lat1, lng2 lat2, ...)`

### 3. 轉換 CSV 為 SQL

使用 `csv_to_sql.py` 工具將 CSV 轉換為 SQL INSERT 語句：

```bash
cd database/scripts
python3 csv_to_sql.py ../data/Visiter.csv
```

這會生成 `Visiter_insert.sql` 檔案。

### 4. 複製 SQL 並執行

1. 打開生成的 `.sql` 檔案（例如 `data/Visiter_insert.sql`）
2. 複製所有 SQL 語句
3. 在資料庫工具中貼上並執行

**或者直接使用指令執行：**

```bash
# 使用 Docker
docker-compose exec db psql -U GavinLou -d bmc_navigation -f /path/to/Visiter_insert.sql

# 或者複製到容器內執行
docker cp database/data/Visiter_insert.sql exhibition-nav-db-1:/tmp/
docker-compose exec db psql -U GavinLou -d bmc_navigation -f /tmp/Visiter_insert.sql
```

## 工具功能

### generate_csv_templates.sh

- 自動連接資料庫
- 讀取所有表的結構
- 為每個表生成 CSV 模板（包含欄位名稱）

### csv_to_sql.py

- 讀取 CSV 檔案
- 自動判斷資料類型（UUID、數字、布林、字串等）
- 生成正確的 SQL INSERT 語句
- 處理特殊字元轉義（單引號等）
- 支援 PostGIS 幾何類型（POINT、LINESTRING）

## 常見問題

### Q: 如何產生 UUID？

線上工具：https://www.uuidgenerator.net/
或使用 PostgreSQL：`SELECT gen_random_uuid();`

### Q: CSV 中的單引號怎麼處理？

直接輸入即可，工具會自動轉義為 `''`。

### Q: 如何處理大量資料？

1. 分批處理：將大 CSV 分成多個小檔案
2. 每個檔案轉換後逐一執行 SQL

### Q: 如何更新資料？

工具目前只生成 INSERT 語句。如需 UPDATE，請手動修改生成的 SQL。

## 範例檔案

已提供範例檔案：`data/Visiter_example.csv`
對應的 SQL：`data/Visiter_example_insert.sql`

## 提示

1. **先測試小量資料**：先用幾筆資料測試，確認格式正確後再大量匯入
2. **備份資料庫**：匯入前先備份
3. **檢查 SQL**：執行前先檢查生成的 SQL 是否正確
4. **使用交易**：可以在 SQL 開頭加上 `BEGIN;`，結尾加上 `COMMIT;` 或 `ROLLBACK;`
