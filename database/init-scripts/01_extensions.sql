-- 01_extensions.sql
-- ---------------------------------------------------------
-- 檔名開頭的 01_ 是刻意的：postgres 官方映像會依「檔名字母順序」
-- 依序執行 /docker-entrypoint-initdb.d/ 底下的檔案，
-- 所以之後如果要加更多初始化腳本(建表、灌測試資料)，
-- 用 02_xxx.sql、03_xxx.sql 命名，順序才可控。
--
-- 這個檔案只在「資料庫第一次建立、資料夾是空的」時才會被執行，
-- 如果你之後改了這個檔案想重跑，需要先把 db_data 這個 volume 刪掉：
--   docker compose down -v
-- （注意 -v 會清空資料庫所有資料，正式環境千萬別對正式資料庫這樣做）
-- ---------------------------------------------------------

-- 啟用 PostGIS：讓 PostgreSQL 認得地理座標型別(geometry/geography)，
-- 並支援空間索引、空間查詢函式(例如算兩點距離、判斷是否在範圍內)。
CREATE EXTENSION IF NOT EXISTS postgis;

-- 啟用 pgRouting：建立在 PostGIS 之上，
-- 提供路網分析函式，例如最短路徑(pgr_dijkstra)、
-- 之後你要做「最短路線」「避開樓梯的無障礙路線」都會用到這個。
CREATE EXTENSION IF NOT EXISTS pgrouting;
