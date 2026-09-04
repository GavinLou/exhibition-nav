-- 修正景點媒體 URL 順序對應
-- 根據正確的景點順序（1-41）重新映射影片和語音 URL

-- 先清空現有的 video_url 和 audio_url
UPDATE "Attractions_Translations"
SET video_url = NULL, audio_url = NULL
WHERE language_code = 'zh_TW';

-- 1. 佛光大佛
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/1.mp4', audio_url = '/audio/attractions/1.mp3'
WHERE language_code = 'zh_TW' AND title = '佛光大佛';

-- 2. 大佛平台
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/2.mp4', audio_url = '/audio/attractions/2.mp3'
WHERE language_code = 'zh_TW' AND title = '大佛平台';

-- 3. 大佛平台抄經堂
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/3.mp4', audio_url = '/audio/attractions/3.mp3'
WHERE language_code = 'zh_TW' AND title = '大佛平台抄經堂';

-- 4. 佛光樓
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/4.mp4', audio_url = '/audio/attractions/4.mp3'
WHERE language_code = 'zh_TW' AND title = '佛光樓';

-- 5. 四聖塔/觀音塔
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/5.mp4', audio_url = '/audio/attractions/5.mp3'
WHERE language_code = 'zh_TW' AND title = '四聖塔/觀音塔';

-- 6. 四聖塔/文殊塔
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/6.mp4', audio_url = '/audio/attractions/6.mp3'
WHERE language_code = 'zh_TW' AND title = '四聖塔/文殊塔';

-- 7. 四聖塔/地藏塔
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/7.mp4', audio_url = '/audio/attractions/7.mp3'
WHERE language_code = 'zh_TW' AND title = '四聖塔/地藏塔';

-- 8. 四聖塔/普賢塔
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/8.mp4', audio_url = '/audio/attractions/8.mp3'
WHERE language_code = 'zh_TW' AND title = '四聖塔/普賢塔';

-- 9. 佛光一滴
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/9.mp4', audio_url = '/audio/attractions/9.mp3'
WHERE language_code = 'zh_TW' AND title = '佛光一滴';

-- 10. 觀音殿
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/10.mp4', audio_url = '/audio/attractions/10.mp3'
WHERE language_code = 'zh_TW' AND title = '觀音殿';

-- 11. 五和塔
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/11.mp4', audio_url = '/audio/attractions/11.mp3'
WHERE language_code = 'zh_TW' AND title = '五和塔';

-- 12. 六度塔
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/12.mp4', audio_url = '/audio/attractions/12.mp3'
WHERE language_code = 'zh_TW' AND title = '六度塔';

-- 13. 金佛殿
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/13.mp4', audio_url = '/audio/attractions/13.mp3'
WHERE language_code = 'zh_TW' AND title = '金佛殿';

-- 14. 玉佛殿
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/14.mp4', audio_url = '/audio/attractions/14.mp3'
WHERE language_code = 'zh_TW' AND title = '玉佛殿';

-- 15. 本館一樓
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/15.mp4', audio_url = '/audio/attractions/15.mp3'
WHERE language_code = 'zh_TW' AND title = '本館一樓';

-- 16. 大覺堂
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/16.mp4', audio_url = '/audio/attractions/16.mp3'
WHERE language_code = 'zh_TW' AND title = '大覺堂';

-- 17. 七誡塔
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/17.mp4', audio_url = '/audio/attractions/17.mp3'
WHERE language_code = 'zh_TW' AND title = '七誡塔';

-- 18. 八道塔
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/18.mp4', audio_url = '/audio/attractions/18.mp3'
WHERE language_code = 'zh_TW' AND title = '八道塔';

-- 19. 本館二樓
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/19.mp4', audio_url = '/audio/attractions/19.mp3'
WHERE language_code = 'zh_TW' AND title = '本館二樓';

-- 20. 護生圖
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/20.mp4', audio_url = '/audio/attractions/20.mp3'
WHERE language_code = 'zh_TW' AND title = '護生圖';

-- 21. 小品店
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/21.mp4', audio_url = '/audio/attractions/21.mp3'
WHERE language_code = 'zh_TW' AND title = '小品店';

-- 22. 祇園
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/22.mp4', audio_url = '/audio/attractions/22.mp3'
WHERE language_code = 'zh_TW' AND title = '祇園';

-- 23. 萬人照相台
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/23.mp4', audio_url = '/audio/attractions/23.mp3'
WHERE language_code = 'zh_TW' AND title = '萬人照相台';

-- 24. 一教塔
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/24.mp4', audio_url = '/audio/attractions/24.mp3'
WHERE language_code = 'zh_TW' AND title = '一教塔';

-- 25. 二眾塔｜三好兒童館
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/25.mp4', audio_url = '/audio/attractions/25.mp3'
WHERE language_code = 'zh_TW' AND title = '二眾塔｜三好兒童館';

-- 26. 三好塔
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/26.mp4', audio_url = '/audio/attractions/26.mp3'
WHERE language_code = 'zh_TW' AND title = '三好塔';

-- 27. 四給塔
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/27.mp4', audio_url = '/audio/attractions/27.mp3'
WHERE language_code = 'zh_TW' AND title = '四給塔';

-- 28. 禪畫禪話
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/28.mp4', audio_url = '/audio/attractions/28.mp3'
WHERE language_code = 'zh_TW' AND title = '禪畫禪話';

-- 29. 古德偈語與佛陀行化本事
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/29.mp4', audio_url = '/audio/attractions/29.mp3'
WHERE language_code = 'zh_TW' AND title = '古德偈語與佛陀行化本事';

-- 30. 菩提廣場
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/30.mp4', audio_url = '/audio/attractions/30.mp3'
WHERE language_code = 'zh_TW' AND title = '菩提廣場';

-- 31. 八宗祖師像
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/31.mp4', audio_url = '/audio/attractions/31.mp3'
WHERE language_code = 'zh_TW' AND title = '八宗祖師像';

-- 32. 十八羅漢像
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/32.mp4', audio_url = '/audio/attractions/32.mp3'
WHERE language_code = 'zh_TW' AND title = '十八羅漢像';

-- 33. 雙閣樓
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/33.mp4', audio_url = '/audio/attractions/33.mp3'
WHERE language_code = 'zh_TW' AND title = '雙閣樓';

-- 34. 雙閣樓 滴水坊
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/34.mp4', audio_url = '/audio/attractions/34.mp3'
WHERE language_code = 'zh_TW' AND title = '雙閣樓 滴水坊';

-- 35. 樟樹林 滴水坊
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/35.mp4', audio_url = '/audio/attractions/35.mp3'
WHERE language_code = 'zh_TW' AND title = '樟樹林 滴水坊';

-- 36. 禮敬大廳
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/36.mp4', audio_url = '/audio/attractions/36.mp3'
WHERE language_code = 'zh_TW' AND title = '禮敬大廳';

-- 37. 禮敬大廳 滴水坊
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/37.mp4', audio_url = '/audio/attractions/37.mp3'
WHERE language_code = 'zh_TW' AND title = '禮敬大廳 滴水坊';

-- 38. 禮敬大廳二樓 百味軒自助餐
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/38.mp4', audio_url = '/audio/attractions/38.mp3'
WHERE language_code = 'zh_TW' AND title = '禮敬大廳二樓 百味軒自助餐';

-- 39. 禮敬大廳二樓 禪悅齋 合菜圓桌
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/39.mp4', audio_url = '/audio/attractions/39.mp3'
WHERE language_code = 'zh_TW' AND title = '禮敬大廳二樓 禪悅齋 合菜圓桌';

-- 40. 千家寺院百萬人士功德芳名碑牆
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/40.mp4', audio_url = '/audio/attractions/40.mp3'
WHERE language_code = 'zh_TW' AND title = '千家寺院百萬人士功德芳名碑牆';

-- 41. 犀牛區
UPDATE "Attractions_Translations"
SET video_url = '/videos/attractions/41.mp4', audio_url = '/audio/attractions/41.mp3'
WHERE language_code = 'zh_TW' AND title = '犀牛區';

-- 驗證更新結果
SELECT
    CASE
        WHEN title = '佛光大佛' THEN 1
        WHEN title = '大佛平台' THEN 2
        WHEN title = '大佛平台抄經堂' THEN 3
        WHEN title = '佛光樓' THEN 4
        WHEN title = '四聖塔/觀音塔' THEN 5
        WHEN title = '四聖塔/文殊塔' THEN 6
        WHEN title = '四聖塔/地藏塔' THEN 7
        WHEN title = '四聖塔/普賢塔' THEN 8
        WHEN title = '佛光一滴' THEN 9
        WHEN title = '觀音殿' THEN 10
        WHEN title = '五和塔' THEN 11
        WHEN title = '六度塔' THEN 12
        WHEN title = '金佛殿' THEN 13
        WHEN title = '玉佛殿' THEN 14
        WHEN title = '本館一樓' THEN 15
        WHEN title = '大覺堂' THEN 16
        WHEN title = '七誡塔' THEN 17
        WHEN title = '八道塔' THEN 18
        WHEN title = '本館二樓' THEN 19
        WHEN title = '護生圖' THEN 20
        WHEN title = '小品店' THEN 21
        WHEN title = '祇園' THEN 22
        WHEN title = '萬人照相台' THEN 23
        WHEN title = '一教塔' THEN 24
        WHEN title = '二眾塔｜三好兒童館' THEN 25
        WHEN title = '三好塔' THEN 26
        WHEN title = '四給塔' THEN 27
        WHEN title = '禪畫禪話' THEN 28
        WHEN title = '古德偈語與佛陀行化本事' THEN 29
        WHEN title = '菩提廣場' THEN 30
        WHEN title = '八宗祖師像' THEN 31
        WHEN title = '十八羅漢像' THEN 32
        WHEN title = '雙閣樓' THEN 33
        WHEN title = '雙閣樓 滴水坊' THEN 34
        WHEN title = '樟樹林 滴水坊' THEN 35
        WHEN title = '禮敬大廳' THEN 36
        WHEN title = '禮敬大廳 滴水坊' THEN 37
        WHEN title = '禮敬大廳二樓 百味軒自助餐' THEN 38
        WHEN title = '禮敬大廳二樓 禪悅齋 合菜圓桌' THEN 39
        WHEN title = '千家寺院百萬人士功德芳名碑牆' THEN 40
        WHEN title = '犀牛區' THEN 41
    END as correct_order,
    title,
    video_url,
    audio_url
FROM "Attractions_Translations"
WHERE language_code = 'zh_TW'
ORDER BY correct_order;
