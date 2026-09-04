-- 新增景點評分欄位
ALTER TABLE "Attractions"
ADD COLUMN rating DECIMAL(2,1) DEFAULT 4.5;

-- 為現有景點設定隨機但合理的評分（4.0-5.0）
UPDATE "Attractions" SET rating = 4.0 + (RANDOM() * 1.0);

-- 驗證更新
SELECT a.id, at.title, a.rating
FROM "Attractions" a
JOIN "Attractions_Translations" at ON a.id = at."Attractions_id"
WHERE at.language_code = 'zh_TW'
ORDER BY a.rating DESC
LIMIT 10;
