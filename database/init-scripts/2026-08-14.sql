CREATE TYPE "gender_type" AS ENUM (
	'male',
	'female',
	'other'
);

CREATE TYPE "role_type" AS ENUM (
	'Super_admin',
	'Library_staff',
	'Visitor',
	'Guest'
);

CREATE TYPE "exhibition_type" AS ENUM (
	'online', 
	'special', 
	'permanent'
);

CREATE TYPE "collection_themes_type" AS ENUM (
	'permanent', 
	'curated_selection', 
	'modern'
);

CREATE TYPE "event_type" AS ENUM (
	'enduring', 
	'single_session', 
	'year'
);

CREATE TYPE "language_type" AS ENUM (
	'zh_TW',
	'en',
	'ja'
);

CREATE TYPE "status_type" AS ENUM (
	'open',
	'maintenance',
	'closed'
);

CREATE TYPE "itinerary_status" AS ENUM (
	'confirming',
	'apply',
	'in_progress',
	'cancel'
);

CREATE TYPE "target_type" AS ENUM (
	'restaurant',
	'attractions',
	'event',
	'exhibition',
	'exhibit',
	'collection_Themes',
	'collection',
	'itinerary'
);

CREATE TYPE "sender_type" AS ENUM (
	'user',
	'assistant'
);

CREATE TABLE IF NOT EXISTS "Restaurant" (
	"id" UUID NOT NULL,
	-- 關聯到 Base_Location
	"location_id" UUID NOT NULL,
	"Attractions_id" UUID NOT NULL,
	-- 景點是否開放
	"status" STATUS_TYPE NOT NULL,
	"image_url" VARCHAR(150),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Restaurant"."location_id" IS '關聯到 Base_Location';
COMMENT ON COLUMN "Restaurant"."status" IS '景點是否開放';


CREATE TABLE IF NOT EXISTS "Attractions_Translations" (
	"id" UUID NOT NULL,
	-- 關聯到 Attractions
	"Attractions_id" UUID NOT NULL,
	"title" VARCHAR(100) NOT NULL,
	"language_code" LANGUAGE_TYPE NOT NULL,
	"description" TEXT NOT NULL,
	"video_url" VARCHAR(150),
	"audio_url" VARCHAR(150),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Attractions_Translations"."Attractions_id" IS '關聯到 Attractions';


CREATE TABLE IF NOT EXISTS "Attractions" (
	"id" UUID NOT NULL,
	-- 關聯到 Base_Location
	"location_id" UUID NOT NULL,
	"status" STATUS_TYPE NOT NULL,
	"image_url" VARCHAR(150),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Attractions"."location_id" IS '關聯到 Base_Location';


CREATE TABLE IF NOT EXISTS "Visiter" (
	"id" UUID NOT NULL,
	"email" VARCHAR(50) NOT NULL,
	"hashed_password" VARCHAR(255) NOT NULL,
	"name" VARCHAR(20) NOT NULL,
	"gender" GENDER_TYPE NOT NULL,
	"phone" VARCHAR(20),
	"is_active" BOOLEAN NOT NULL,
	"is_verified" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"update_at" TIMESTAMP NOT NULL,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "Restaurant_Translations" (
	"id" UUID NOT NULL,
	"Restaurant_id" UUID NOT NULL,
	"title" VARCHAR(100) NOT NULL,
	"video_url" VARCHAR(150),
	"audio_url" VARCHAR(150),
	"language_code" LANGUAGE_TYPE NOT NULL,
	"description" TEXT NOT NULL,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "Event" (
	"id" UUID NOT NULL,
	"image_url" VARCHAR(150),
	-- 關聯到 Base_Location
	"location_id" UUID NOT NULL,
	"Attractions_id" UUID NOT NULL,
	"status" STATUS_TYPE NOT NULL,
	"type" EVENT_TYPE NOT NULL,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	-- 活動總長度(分鐘)，例如: 90
	"duration_minutes" INT NOT NULL,
	-- 報名費用，0 代表免費
	"price" INT NOT NULL DEFAULT 0,
	-- 人數上限，NULL 代表不限制
	"max_participants" INT,
	-- 適合人數或客群描述，例如: 2-4人、適合親子
	"suitable_group_size" VARCHAR(50),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Event"."location_id" IS '關聯到 Base_Location';
COMMENT ON COLUMN "Event"."duration_minutes" IS '活動總長度(分鐘)，例如: 90';
COMMENT ON COLUMN "Event"."price" IS '報名費用，0 代表免費';
COMMENT ON COLUMN "Event"."max_participants" IS '人數上限，NULL 代表不限制';
COMMENT ON COLUMN "Event"."suitable_group_size" IS '適合人數或客群描述，例如: 2-4人、適合親子';


CREATE TABLE IF NOT EXISTS "Event_Translations" (
	"id" UUID NOT NULL,
	"Event_id" UUID NOT NULL,
	"title" VARCHAR(100) NOT NULL,
	"video_url" VARCHAR(150),
	"audio_url" VARCHAR(150),
	"language_code" LANGUAGE_TYPE NOT NULL,
	"description" TEXT NOT NULL,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "Park_Network" (
	-- 馬路片段流水號
	"id" SERIAL NOT NULL,
	-- 道路名稱
	"name" VARCHAR(100),
	-- 由 pgRouting 自動生成的起點路口 ID
	"source" INTEGER,
	-- 由 pgRouting 自動生成的終點路口 ID
	"target" INTEGER,
	-- 道路長度（公尺）
	"length_m" FLOAT NOT NULL,
	-- 正向通行成本
	"cost" FLOAT NOT NULL,
	-- 反向通行成本 (-1 代表單行不可通)
	"reverse_cost" FLOAT NOT NULL,
	-- 是否為無障礙通道 (TRUE=平地斜坡, FALSE=階梯)
	"accessible" BOOLEAN NOT NULL DEFAULT true,
	-- PostGIS WGS84 經緯度線段
	"geom" GEOMETRY(LINESTRING, 4326) NOT NULL,
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Park_Network"."id" IS '馬路片段流水號';
COMMENT ON COLUMN "Park_Network"."name" IS '道路名稱';
COMMENT ON COLUMN "Park_Network"."source" IS '由 pgRouting 自動生成的起點路口 ID';
COMMENT ON COLUMN "Park_Network"."target" IS '由 pgRouting 自動生成的終點路口 ID';
COMMENT ON COLUMN "Park_Network"."length_m" IS '道路長度（公尺）';
COMMENT ON COLUMN "Park_Network"."cost" IS '正向通行成本';
COMMENT ON COLUMN "Park_Network"."reverse_cost" IS '反向通行成本 (-1 代表單行不可通)';
COMMENT ON COLUMN "Park_Network"."accessible" IS '是否為無障礙通道 (TRUE=平地斜坡, FALSE=階梯)';
COMMENT ON COLUMN "Park_Network"."geom" IS 'PostGIS WGS84 經緯度線段';


CREATE TABLE IF NOT EXISTS "Opening_Schedules" (
	"id" UUID NOT NULL,
	"target" TARGET_TYPE NOT NULL,
	"target_id" UUID NOT NULL,
	"day_of_week" INT NOT NULL,
	"start_time" TIME NOT NULL,
	"end_time" TIME NOT NULL,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "Opening_Exceptions" (
	"id" UUID NOT NULL,
	"target" TARGET_TYPE NOT NULL,
	"target_id" UUID NOT NULL,
	"exception_date" DATE NOT NULL,
	"is_closed" BOOLEAN NOT NULL DEFAULT true,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "Base_Location" (
	-- 共通主鍵
	"id" UUID NOT NULL DEFAULT gen_random_uuid(),
	-- 地點/活動/餐廳名稱
	"name" VARCHAR(250) NOT NULL,
	-- 分類: event, restaurant, exhibit, spot
	"target" TARGET_TYPE NOT NULL,
	-- PostGIS WGS84 經緯度座標
	"geom" GEOMETRY(POINT, 4326) NOT NULL,
	"created_at" TIMESTAMP DEFAULT now(),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Base_Location"."id" IS '共通主鍵';
COMMENT ON COLUMN "Base_Location"."name" IS '地點/活動/餐廳名稱';
COMMENT ON COLUMN "Base_Location"."target" IS '分類: event, restaurant, exhibit, spot';
COMMENT ON COLUMN "Base_Location"."geom" IS 'PostGIS WGS84 經緯度座標';


CREATE TABLE IF NOT EXISTS "Assignment" (
	-- 指派紀錄唯一識別碼
	"id" UUID NOT NULL,
	-- 員工 ID
	"employee_id" UUID NOT NULL,
	-- 工作業務類型: RESTAURANT, EXHIBITION, EVENT, TOUR
	"target" TARGET_TYPE NOT NULL,
	-- 對應各個業務表的 id
	"target_id" UUID NOT NULL,
	"role" ROLE_TYPE NOT NULL,
	-- 工作描述，例如：主廚、驗票員、外場服務生
	"job_description" TEXT,
	-- 調派開始日期
	"start_date" DATE,
	-- 調派結束日期，NULL 代表長期駐點
	"end_date" DATE,
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Assignment"."id" IS '指派紀錄唯一識別碼';
COMMENT ON COLUMN "Assignment"."employee_id" IS '員工 ID';
COMMENT ON COLUMN "Assignment"."target" IS '工作業務類型: RESTAURANT, EXHIBITION, EVENT, TOUR';
COMMENT ON COLUMN "Assignment"."target_id" IS '對應各個業務表的 id';
COMMENT ON COLUMN "Assignment"."job_description" IS '工作描述，例如：主廚、驗票員、外場服務生';
COMMENT ON COLUMN "Assignment"."start_date" IS '調派開始日期';
COMMENT ON COLUMN "Assignment"."end_date" IS '調派結束日期，NULL 代表長期駐點';


CREATE TABLE IF NOT EXISTS "Employee" (
	-- 員工唯一識別碼
	"id" UUID NOT NULL,
	"name" VARCHAR(50) NOT NULL,
	"email" VARCHAR(100),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Employee"."id" IS '員工唯一識別碼';


CREATE TABLE IF NOT EXISTS "Qr_Code" (
	"id" UUID NOT NULL,
	"code" VARCHAR(50) NOT NULL UNIQUE,
	-- EXHIBITION, RESTAURANT, EVENT, COLLECTION, LOCATION
	"target" TARGET_TYPE NOT NULL,
	-- 對應各個表底下的 id
	"target_id" UUID NOT NULL,
	-- 累計掃描次數，可以用來做熱門度分析
	"scan_count" INT NOT NULL DEFAULT 0,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"updated_at" TIMESTAMP NOT NULL DEFAULT now(),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Qr_Code"."target" IS 'EXHIBITION, RESTAURANT, EVENT, COLLECTION, LOCATION';
COMMENT ON COLUMN "Qr_Code"."target_id" IS '對應各個表底下的 id';
COMMENT ON COLUMN "Qr_Code"."scan_count" IS '累計掃描次數，可以用來做熱門度分析';


CREATE TABLE IF NOT EXISTS "Exhibition_Translations" (
	"id" UUID NOT NULL,
	"Exhibition_id" UUID NOT NULL,
	"title" VARCHAR(100) NOT NULL,
	"video_url" VARCHAR(150),
	"audio_url" VARCHAR(150),
	"language_code" LANGUAGE_TYPE NOT NULL,
	"description" TEXT NOT NULL,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "Exhibition" (
	"id" UUID NOT NULL,
	-- 關聯到 Base_Location
	"location_id" UUID NOT NULL,
	"Attractions_id" UUID NOT NULL,
	"image_url" VARCHAR(150),
	"status" STATUS_TYPE NOT NULL,
	"type" EXHIBITION_TYPE NOT NULL,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	-- 報名費用，0 代表免費
	"price" INT NOT NULL DEFAULT 0,
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Exhibition"."location_id" IS '關聯到 Base_Location';
COMMENT ON COLUMN "Exhibition"."price" IS '報名費用，0 代表免費';
COMMENT ON COLUMN "Exhibition"."type" IS '展覽類型';


CREATE TABLE IF NOT EXISTS "Exhibit" (
	"id" UUID NOT NULL,
	"Exhibition_id" UUID NOT NULL,
	"image_url" VARCHAR(150),
	-- 關聯到 Base_Location
	"location_id" UUID NOT NULL,
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Exhibit"."location_id" IS '關聯到 Base_Location';


CREATE TABLE IF NOT EXISTS "Exhibit_Translations" (
	"id" UUID NOT NULL,
	"Exhibit_id" UUID NOT NULL,
	"title" VARCHAR(100) NOT NULL,
	"video_url" VARCHAR(150),
	"audio_url" VARCHAR(150),
	"language_code" LANGUAGE_TYPE NOT NULL,
	"description" TEXT NOT NULL,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "Itinerary_Group" (
	-- 行程總記錄唯一識別碼
	"id" UUID NOT NULL,
	-- 發起行程的遊客 ID
	"Visiter_id" UUID NOT NULL,
	-- 參觀總人數
	"total_participants" INT NOT NULL DEFAULT 1,
	-- 預計參觀日期
	"visit_date" DATE NOT NULL,
	-- 遊客自己取的行程名稱，例如：我的博物館一日遊
	"title" VARCHAR(100),
	-- 是否被管理員確認過
	"is_confirm" BOOLEAN NOT NULL,
	-- 是否需要無障礙協助
	"is_accessible_required" BOOLEAN NOT NULL,
	-- 行程狀態
	"status" ITINERARY_STATUS NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Itinerary_Group"."id" IS '行程總記錄唯一識別碼';
COMMENT ON COLUMN "Itinerary_Group"."Visiter_id" IS '發起行程的遊客 ID';
COMMENT ON COLUMN "Itinerary_Group"."total_participants" IS '參觀總人數';
COMMENT ON COLUMN "Itinerary_Group"."visit_date" IS '預計參觀日期';
COMMENT ON COLUMN "Itinerary_Group"."title" IS '遊客自己取的行程名稱，例如：我的博物館一日遊';
COMMENT ON COLUMN "Itinerary_Group"."is_confirm" IS '是否被管理員確認過';
COMMENT ON COLUMN "Itinerary_Group"."is_accessible_required" IS '是否需要無障礙協助';
COMMENT ON COLUMN "Itinerary_Group"."status" IS '行程狀態';


CREATE TABLE IF NOT EXISTS "Itinerary_Item" (
	"id" UUID NOT NULL,
	-- 關聯到主表的 ID
	"group_id" UUID NOT NULL,
	-- 目標類型: RESTAURANT, EXHIBITION, EVENT, COLLECTION, TOUR_SCHEDULE
	"target" TARGET_TYPE NOT NULL,
	-- 目標實體的 UUID
	"target_id" UUID NOT NULL,
	-- 預計開始時間
	"start_time" TIME,
	-- 預計結束時間
	"end_time" TIME,
	-- 是否需要導覽員
	"is_guide" BOOLEAN NOT NULL,
	-- 顯示順序
	"sequence_order" INT NOT NULL DEFAULT 1,
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Itinerary_Item"."group_id" IS '關聯到主表的 ID';
COMMENT ON COLUMN "Itinerary_Item"."target" IS '目標類型: RESTAURANT, EXHIBITION, EVENT, COLLECTION, TOUR_SCHEDULE';
COMMENT ON COLUMN "Itinerary_Item"."target_id" IS '目標實體的 UUID';
COMMENT ON COLUMN "Itinerary_Item"."start_time" IS '預計開始時間';
COMMENT ON COLUMN "Itinerary_Item"."end_time" IS '預計結束時間';
COMMENT ON COLUMN "Itinerary_Item"."is_guide" IS '是否需要導覽員';
COMMENT ON COLUMN "Itinerary_Item"."sequence_order" IS '顯示順序';


CREATE TABLE IF NOT EXISTS "Tour_Schedule" (
	-- 解說行程唯一識別碼
	"id" UUID NOT NULL,
	-- 解說行程唯一識別碼
	"item_id" UUID NOT NULL,
	-- 主要負責導覽的員工 ID
	"employee_id" UUID NOT NULL,
	-- 本人確認
	"is_confirm" BOOLEAN NOT NULL,
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Tour_Schedule"."id" IS '解說行程唯一識別碼';
COMMENT ON COLUMN "Tour_Schedule"."item_id" IS '解說行程唯一識別碼';
COMMENT ON COLUMN "Tour_Schedule"."employee_id" IS '主要負責導覽的員工 ID';
COMMENT ON COLUMN "Tour_Schedule"."is_confirm" IS '本人確認';


CREATE TABLE IF NOT EXISTS "AI_Chat_Message" (
	"id" UUID NOT NULL,
	-- 屬於哪次對話
	"session_id" UUID NOT NULL,
	-- user / assistant
	"sender" SENDER_TYPE NOT NULL,
	-- 聊天的對話文字內容
	"content" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "AI_Chat_Message"."session_id" IS '屬於哪次對話';
COMMENT ON COLUMN "AI_Chat_Message"."sender" IS 'user / assistant';
COMMENT ON COLUMN "AI_Chat_Message"."content" IS '聊天的對話文字內容';


CREATE TABLE IF NOT EXISTS "AI_Chat_Session" (
	"id" UUID NOT NULL,
	-- 哪位遊客在聊天
	"Visiter_id" UUID NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	-- 使用者最後有沒有把這次推薦變成正式行程
	"is_converted_to_itinerary" BOOLEAN NOT NULL DEFAULT false,
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "AI_Chat_Session"."Visiter_id" IS '哪位遊客在聊天';
COMMENT ON COLUMN "AI_Chat_Session"."is_converted_to_itinerary" IS '使用者最後有沒有把這次推薦變成正式行程';


CREATE TABLE IF NOT EXISTS "Visiter_AI_Preference" (
	"Visiter_id" UUID NOT NULL,
	"preference_tags" JSONB NOT NULL DEFAULT '{}',
	"updated_at" TIMESTAMP NOT NULL DEFAULT now(),
	PRIMARY KEY("Visiter_id")
);




CREATE TABLE IF NOT EXISTS "AI_Itinerary_Draft" (
	"id" UUID NOT NULL,
	"session_id" UUID NOT NULL,
	-- RESTAURANT, EXHIBITION, EVENT, COLLECTION
	"target" TARGET_TYPE NOT NULL,
	"target_id" UUID NOT NULL,
	-- AI 建議的開始時間
	"suggested_start_time" TIME,
	-- AI 建議的遊玩順序
	"suggested_order" INT NOT NULL,
	-- AI 推薦這項目的原因，例如：因為您提過帶小小孩，此展區設有親子友善設施
	"reason_to_recommend" TEXT,
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "AI_Itinerary_Draft"."target" IS 'RESTAURANT, EXHIBITION, EVENT, COLLECTION';
COMMENT ON COLUMN "AI_Itinerary_Draft"."suggested_start_time" IS 'AI 建議的開始時間';
COMMENT ON COLUMN "AI_Itinerary_Draft"."suggested_order" IS 'AI 建議的遊玩順序';
COMMENT ON COLUMN "AI_Itinerary_Draft"."reason_to_recommend" IS 'AI 推薦這項目的原因，例如：因為您提過帶小小孩，此展區設有親子友善設施';


CREATE TABLE IF NOT EXISTS "Collection_Translations" (
	"id" UUID NOT NULL,
	"Collection_id" UUID NOT NULL,
	"title" VARCHAR(100) NOT NULL,
	"video_url" VARCHAR(150),
	"audio_url" VARCHAR(150),
	"language_code" LANGUAGE_TYPE NOT NULL,
	"description" TEXT NOT NULL,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "Collection" (
	"id" UUID NOT NULL,
	"Themes_id" UUID NOT NULL,
	-- 關聯到 Base_Location
	"location_id" UUID NOT NULL,
	"image_url" VARCHAR(150),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Collection"."location_id" IS '關聯到 Base_Location';


CREATE TABLE IF NOT EXISTS "Collection_Themes" (
	"id" UUID NOT NULL,
	-- 關聯到 Base_Location
	"location_id" UUID NOT NULL,
	"Attractions_id" UUID NOT NULL,
	"status" STATUS_TYPE NOT NULL,
	"type" COLLECTION_THEMES_TYPE NOT NULL,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	"image_url" VARCHAR(150),
	-- 報名費用，0 代表免費
	"price" INT NOT NULL DEFAULT 0,
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Collection_Themes"."location_id" IS '關聯到 Base_Location';
COMMENT ON COLUMN "Collection_Themes"."price" IS '報名費用，0 代表免費';


CREATE TABLE IF NOT EXISTS "Collection_Themes_Translations" (
	"id" UUID NOT NULL,
	"Themes_id" UUID NOT NULL,
	"title" VARCHAR(100) NOT NULL,
	"video_url" VARCHAR(150),
	"audio_url" VARCHAR(150),
	"language_code" LANGUAGE_TYPE NOT NULL,
	"description" TEXT NOT NULL,
	PRIMARY KEY("id")
);




CREATE TABLE IF NOT EXISTS "Recommended_Itinerary_Item" (
	"id" UUID NOT NULL,
	"recommended_group_id" UUID NOT NULL,
	-- 目標類型: COLLECTION, EXHIBITION, RESTAURANT, EVENT
	"target" TARGET_TYPE NOT NULL,
	-- 目標實體的 UUID
	"target_id" UUID NOT NULL,
	-- 建議在此景點停留的分鐘數
	"suggested_stay_minutes" INT NOT NULL DEFAULT 60,
	-- 遊覽順序，從 1 開始
	"sequence_order" INT NOT NULL,
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Recommended_Itinerary_Item"."target" IS '目標類型: COLLECTION, EXHIBITION, RESTAURANT, EVENT';
COMMENT ON COLUMN "Recommended_Itinerary_Item"."target_id" IS '目標實體的 UUID';
COMMENT ON COLUMN "Recommended_Itinerary_Item"."suggested_stay_minutes" IS '建議在此景點停留的分鐘數';
COMMENT ON COLUMN "Recommended_Itinerary_Item"."sequence_order" IS '遊覽順序，從 1 開始';


CREATE TABLE IF NOT EXISTS "Recommended_Itinerary_Translations" (
	"id" UUID NOT NULL,
	-- 關聯到官方推薦主表
	"recommended_group_id" UUID NOT NULL,
	"language_code" LANGUAGE_TYPE NOT NULL,
	-- 範本標題，例如：文青必訪美學路線
	"title" VARCHAR(100) NOT NULL,
	-- 範本詳細特色介紹
	"description" TEXT NOT NULL,
	"video_url" VARCHAR(150),
	"audio_url" VARCHAR(150),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Recommended_Itinerary_Translations"."recommended_group_id" IS '關聯到官方推薦主表';
COMMENT ON COLUMN "Recommended_Itinerary_Translations"."title" IS '範本標題，例如：文青必訪美學路線';
COMMENT ON COLUMN "Recommended_Itinerary_Translations"."description" IS '範本詳細特色介紹';


CREATE TABLE IF NOT EXISTS "Recommended_Itinerary_Group" (
	-- 官方推薦行程唯一識別碼
	"id" UUID NOT NULL,
	-- 預估這條路線總共要花多少分鐘，例如: 120
	"estimated_duration_minutes" INT NOT NULL,
	-- 範本封面圖，例如：親子遊的溫馨照片
	"image_url" VARCHAR(150),
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"updated_at" TIMESTAMP NOT NULL DEFAULT now(),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Recommended_Itinerary_Group"."id" IS '官方推薦行程唯一識別碼';
COMMENT ON COLUMN "Recommended_Itinerary_Group"."estimated_duration_minutes" IS '預估這條路線總共要花多少分鐘，例如: 120';
COMMENT ON COLUMN "Recommended_Itinerary_Group"."image_url" IS '範本封面圖，例如：親子遊的溫馨照片';


CREATE TABLE IF NOT EXISTS "Itinerary_Item_Review" (
	-- 評分唯一識別碼
	"id" UUID NOT NULL,
	-- 關聯到遊客行程細項的 ID
	"itinerary_item_id" UUID NOT NULL UNIQUE,
	-- 留下評分的遊客 ID
	"Visiter_id" UUID NOT NULL,
	-- 星等分數：1 到 5 顆星
	"rating" INT NOT NULL,
	-- 文字評論內容，選填
	"comment" TEXT,
	-- 是否顯示（若有不當言論，管理員可隱藏）
	"is_visible" BOOLEAN NOT NULL DEFAULT true,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"updated_at" TIMESTAMP NOT NULL DEFAULT now(),
	PRIMARY KEY("id")
);


COMMENT ON COLUMN "Itinerary_Item_Review"."id" IS '評分唯一識別碼';
COMMENT ON COLUMN "Itinerary_Item_Review"."itinerary_item_id" IS '關聯到遊客行程細項的 ID';
COMMENT ON COLUMN "Itinerary_Item_Review"."Visiter_id" IS '留下評分的遊客 ID';
COMMENT ON COLUMN "Itinerary_Item_Review"."rating" IS '星等分數：1 到 5 顆星';
COMMENT ON COLUMN "Itinerary_Item_Review"."comment" IS '文字評論內容，選填';
COMMENT ON COLUMN "Itinerary_Item_Review"."is_visible" IS '是否顯示（若有不當言論，管理員可隱藏）';

ALTER TABLE "Attractions_Translations"
ADD FOREIGN KEY("Attractions_id") REFERENCES "Attractions"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Event"
ADD FOREIGN KEY("Attractions_id") REFERENCES "Attractions"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Collection_Themes"
ADD FOREIGN KEY("Attractions_id") REFERENCES "Attractions"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Restaurant"
ADD FOREIGN KEY("Attractions_id") REFERENCES "Attractions"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Exhibition"
ADD FOREIGN KEY("Attractions_id") REFERENCES "Attractions"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Restaurant_Translations"
ADD FOREIGN KEY("Restaurant_id") REFERENCES "Restaurant"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Event_Translations"
ADD FOREIGN KEY("Event_id") REFERENCES "Event"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Base_Location"
ADD FOREIGN KEY("id") REFERENCES "Event"("location_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Base_Location"
ADD FOREIGN KEY("id") REFERENCES "Restaurant"("location_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Employee"
ADD FOREIGN KEY("id") REFERENCES "Assignment"("employee_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Attractions"
ADD FOREIGN KEY("location_id") REFERENCES "Base_Location"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Exhibition_Translations"
ADD FOREIGN KEY("Exhibition_id") REFERENCES "Exhibition"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Exhibition"
ADD FOREIGN KEY("location_id") REFERENCES "Base_Location"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Visiter"
ADD FOREIGN KEY("id") REFERENCES "Itinerary_Group"("Visiter_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Itinerary_Group"
ADD FOREIGN KEY("id") REFERENCES "Itinerary_Item"("group_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Employee"
ADD FOREIGN KEY("id") REFERENCES "Tour_Schedule"("employee_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Exhibit"
ADD FOREIGN KEY("Exhibition_id") REFERENCES "Exhibition_Translations"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Exhibit_Translations"
ADD FOREIGN KEY("Exhibit_id") REFERENCES "Exhibit"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Visiter"
ADD FOREIGN KEY("id") REFERENCES "AI_Chat_Session"("Visiter_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "AI_Chat_Session"
ADD FOREIGN KEY("id") REFERENCES "AI_Chat_Message"("session_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Visiter"
ADD FOREIGN KEY("id") REFERENCES "Visiter_AI_Preference"("Visiter_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "AI_Chat_Session"
ADD FOREIGN KEY("id") REFERENCES "AI_Itinerary_Draft"("session_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Collection"
ADD FOREIGN KEY("Themes_id") REFERENCES "Collection_Themes"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Collection_Themes_Translations"
ADD FOREIGN KEY("Themes_id") REFERENCES "Collection_Themes"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Collection_Translations"
ADD FOREIGN KEY("Collection_id") REFERENCES "Collection"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Collection_Themes"
ADD FOREIGN KEY("location_id") REFERENCES "Base_Location"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Exhibit"
ADD FOREIGN KEY("location_id") REFERENCES "Base_Location"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Collection"
ADD FOREIGN KEY("location_id") REFERENCES "Base_Location"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Recommended_Itinerary_Group"
ADD FOREIGN KEY("id") REFERENCES "Recommended_Itinerary_Translations"("recommended_group_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Recommended_Itinerary_Group"
ADD FOREIGN KEY("id") REFERENCES "Recommended_Itinerary_Item"("recommended_group_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Itinerary_Item"
ADD FOREIGN KEY("id") REFERENCES "Itinerary_Item_Review"("itinerary_item_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "Visiter"
ADD FOREIGN KEY("id") REFERENCES "Itinerary_Item_Review"("Visiter_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
-- 修正推薦行程項目的 target_id（UUID 錯誤）
-- 這些更新語句應該在所有資料匯入後執行
DO $$
BEGIN
    -- 只有在這些記錄存在時才更新（避免重複執行錯誤）
    IF EXISTS (SELECT 1 FROM "Recommended_Itinerary_Item" WHERE id = '7f2698d3-bd49-4bf9-9c4d-b6d16645c6c7') THEN
        UPDATE "Recommended_Itinerary_Item"
        SET target_id = '9da51fd6-f5bf-4c2b-a8c9-ca5de5d687b7'
        WHERE id = '7f2698d3-bd49-4bf9-9c4d-b6d16645c6c7';
    END IF;

    IF EXISTS (SELECT 1 FROM "Recommended_Itinerary_Item" WHERE id = '1c409025-e2e5-4c19-be27-268bf6d96e71') THEN
        UPDATE "Recommended_Itinerary_Item"
        SET target_id = 'fe3fc8e8-83cb-42b3-9242-adefa1c15138'
        WHERE id = '1c409025-e2e5-4c19-be27-268bf6d96e71';
    END IF;

    IF EXISTS (SELECT 1 FROM "Recommended_Itinerary_Item" WHERE id = 'f6c511e9-f01b-4013-b182-efb5cc61fe1a') THEN
        UPDATE "Recommended_Itinerary_Item"
        SET target_id = '63a01ed5-2b70-45c7-811f-377f6290659b'
        WHERE id = 'f6c511e9-f01b-4013-b182-efb5cc61fe1a';
    END IF;
END $$;
