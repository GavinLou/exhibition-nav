-- 02_seed.sql
-- ---------------------------------------------------------
-- 這支腳本建立兩張表：poi（景點）、ways（道路），
-- 並塞入幾筆假資料，讓你可以馬上測試 pgRouting 能不能算出路徑。
-- 之後有真實佛館資料時，把這支腳本的 INSERT 換成真實座標即可，
-- 表格結構(CREATE TABLE)不用動。
-- ---------------------------------------------------------

-- =========================================================
-- 景點表：poi = Point of Interest
-- =========================================================
CREATE TABLE IF NOT EXISTS poi (
    id serial PRIMARY KEY,          -- 景點編號，之後前端/API都用這個id指定景點
    name text NOT NULL,             -- 景點名稱，例如「大殿」
    category text,                  -- 分類，例如 landmark(地標) / facility(設施) / entrance(入口)
    geom geometry(Point, 4326) NOT NULL
    -- geometry(Point, 4326)：
    --   Point 代表這是「一個點」(不是線、不是面)
    --   4326 是座標系統代號，代表「WGS84經緯度」，
    --   也就是 GPS、Google Maps 用的那套座標系統，
    --   只要跟前端(MapLibre)、手機GPS對齊用同一套，之後才不會對不上位置。
);

-- =========================================================
-- 道路表：ways（pgRouting 官方慣用的表名/欄位命名）
-- =========================================================
CREATE TABLE IF NOT EXISTS ways (
    gid serial PRIMARY KEY,         -- 這條路的編號(edge id)
    source integer NOT NULL,        -- 這條路的「起點」是哪個節點id
    target integer NOT NULL,        -- 這條路的「終點」是哪個節點id
    -- 這裡的 source/target 我們直接借用 poi.id 當節點編號，
    -- 對「小規模、景點=路口」這種簡單場景是可行的；
    -- 之後如果路網變複雜(路上有很多不是景點的轉彎點)，
    -- 會需要另外一張 nodes 表專門存路網節點，先不用煩惱這個。

    cost double precision NOT NULL,         -- 沿這條路「正向」走的成本(這裡先用公尺數當成本)
    reverse_cost double precision NOT NULL, -- 沿這條路「反向」走的成本
    -- 之後要做「無障礙模式」，做法通常是：
    --   把樓梯那條路的 cost 設成一個很大的數字(例如999999)，
    --   pgRouting 算最短路徑時就會自動避開它，不用改演算法本身。

    the_geom geometry(LineString, 4326) NOT NULL
    -- LineString：這是一條「線」，由起點到終點的實際路徑線段組成，
    -- 前端畫路線在地圖上，就是把這個欄位轉成座標陣列去畫。
);

-- =========================================================
-- 空間索引：讓「按範圍查詢」、「算距離」這類操作不會整表掃描
-- GIST 是 PostGIS 專用的空間索引類型
-- =========================================================
CREATE INDEX IF NOT EXISTS poi_geom_idx ON poi USING GIST (geom);
CREATE INDEX IF NOT EXISTS ways_geom_idx ON ways USING GIST (the_geom);

-- 這兩個是給 pgRouting 查詢「這個節點有哪些路」用的一般索引
CREATE INDEX IF NOT EXISTS ways_source_idx ON ways (source);
CREATE INDEX IF NOT EXISTS ways_target_idx ON ways (target);

-- =========================================================
-- 塞入假景點資料（座標大略落在佛陀紀念館附近，僅供測試用）
-- ST_MakePoint(經度, 緯度) 順序是 (lon, lat)，跟一般講話習慣「緯度在前」相反，容易搞混要注意。
-- ST_SetSRID(..., 4326) 是宣告這個座標點用的座標系統代號
-- =========================================================
INSERT INTO poi (id, name, category, geom) VALUES
(1, '入口',   'entrance', ST_SetSRID(ST_MakePoint(120.3110, 22.7710), 4326)),
(2, '大殿',   'landmark', ST_SetSRID(ST_MakePoint(120.3115, 22.7715), 4326)),
(3, '佛塔',   'landmark', ST_SetSRID(ST_MakePoint(120.3120, 22.7720), 4326)),
(4, '餐廳',   'facility', ST_SetSRID(ST_MakePoint(120.3125, 22.7712), 4326)),
(5, '出口',   'exit',     ST_SetSRID(ST_MakePoint(120.3105, 22.7725), 4326));

-- 因為上面手動指定了 id，序列(serial)的計數器不會自動往前跳，
-- 這行手動把序列對齊目前最大值，避免之後新增資料時 id 衝突。
SELECT setval('poi_id_seq', (SELECT MAX(id) FROM poi));

-- =========================================================
-- 塞入道路資料：用「兩個景點的id配對」描述路網長什麼樣子
-- 這裡刻意設計成「不只一條路能走」，例如 1號到5號
-- 可以走 1→2→3→5，也可以走 1→4→5，這樣才有「比較」最短路徑的意義。
--
-- 這段 INSERT 用 SELECT 動態算出：
--   1. the_geom：直接用兩個景點的座標連成一條線(ST_MakeLine)
--   2. cost：這條線的實際長度(公尺)，用 ->geography 轉換後 ST_Length 就是公尺數
--      (如果不轉成 geography，ST_Length 算出來的單位會是「經緯度差」，不是公尺，數字沒意義)
-- 好處是你不用自己手動算距離、猜一個數字填進去。
-- =========================================================
INSERT INTO ways (source, target, the_geom, cost, reverse_cost)
SELECT
    s.id,
    t.id,
    ST_MakeLine(s.geom, t.geom) AS the_geom,
    ST_Length(ST_MakeLine(s.geom, t.geom)::geography) AS cost,
    ST_Length(ST_MakeLine(s.geom, t.geom)::geography) AS reverse_cost
    -- reverse_cost 這裡跟 cost 給一樣的值，代表「這條路雙向距離一樣」，
    -- 之後如果有單行道或者只能往一個方向走的設計，才需要讓兩個值不同。
FROM poi s, poi t
WHERE (s.id, t.id) IN (
    (1, 2),  -- 入口 -> 大殿
    (2, 3),  -- 大殿 -> 佛塔
    (3, 5),  -- 佛塔 -> 出口
    (2, 4),  -- 大殿 -> 餐廳
    (4, 5),  -- 餐廳 -> 出口
    (1, 4)   -- 入口 -> 餐廳（讓路網不只一條路可以走）
);
