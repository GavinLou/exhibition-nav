-- 移除 Attractions 的 rating 欄位
-- 評分將由 Itinerary_Item_Review 表格管理

ALTER TABLE "Attractions"
DROP COLUMN IF EXISTS rating;

-- 驗證結構
\d "Attractions"

-- 檢查 Itinerary_Item_Review 表格結構
\d "Itinerary_Item_Review"

-- 查看現有評分數據
SELECT
    COUNT(*) as total_reviews,
    AVG(rating) as avg_rating,
    MIN(rating) as min_rating,
    MAX(rating) as max_rating
FROM "Itinerary_Item_Review"
WHERE is_visible = true;
