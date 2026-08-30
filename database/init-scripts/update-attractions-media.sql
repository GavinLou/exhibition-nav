-- 更新景點的圖片、影片、語音 URL

-- 檢查現有資料
SELECT id, image_url FROM "Attractions" LIMIT 5;

-- 從 CSV 更新影片和語音 URL（假設已經有圖片 URL）
-- 這裡只是示例，實際應該匯入所有41個景點

COPY "Attractions"(id, location_id, status, image_url)
FROM '/docker-entrypoint-initdb.d/data/Attractions.csv'
DELIMITER ','
CSV HEADER;

COPY "Attractions_Translations"(id, "Attractions_id", title, language_code, description, video_url, audio_url)
FROM '/docker-entrypoint-initdb.d/data/Attractions_Translations.csv'
DELIMITER ','
CSV HEADER;

-- 驗證更新
SELECT
  a.id,
  at.title,
  a.image_url,
  at.video_url,
  at.audio_url
FROM "Attractions" a
JOIN "Attractions_Translations" at ON a.id = at."Attractions_id"
WHERE at.language_code = 'zh_TW'
LIMIT 10;
