-- itinerary_status 已經存在，使用原有的枚舉值
-- 'confirming', 'apply', 'in_progress', 'cancel'

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'target_type') THEN
        CREATE TYPE TARGET_TYPE AS ENUM ('RESTAURANT', 'EXHIBITION', 'EVENT', 'COLLECTION', 'TOUR_SCHEDULE');
    END IF;
END $$;

-- 創建 Itinerary_Group 表 (如果不存在)
CREATE TABLE IF NOT EXISTS "Itinerary_Group" (
    id UUID NOT NULL,
    "Visiter_id" UUID NOT NULL,
    total_participants INT NOT NULL DEFAULT 1,
    visit_date DATE NOT NULL,
    title VARCHAR(100),
    is_confirm BOOLEAN NOT NULL DEFAULT FALSE,
    is_accessible_required BOOLEAN NOT NULL DEFAULT FALSE,
    status ITINERARY_STATUS NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY(id)
);

COMMENT ON COLUMN "Itinerary_Group"."id" IS '行程總記錄唯一識別碼';
COMMENT ON COLUMN "Itinerary_Group"."Visiter_id" IS '發起行程的遊客 ID';
COMMENT ON COLUMN "Itinerary_Group"."total_participants" IS '參觀總人數';
COMMENT ON COLUMN "Itinerary_Group"."visit_date" IS '預計參觀日期';
COMMENT ON COLUMN "Itinerary_Group"."title" IS '遊客自己取的行程名稱，例如：我的博物館一日遊';
COMMENT ON COLUMN "Itinerary_Group"."is_confirm" IS '是否被管理員確認過';
COMMENT ON COLUMN "Itinerary_Group"."is_accessible_required" IS '是否需要無障礙協助';
COMMENT ON COLUMN "Itinerary_Group"."status" IS '行程狀態';

-- 創建 Itinerary_Item 表 (如果不存在)
CREATE TABLE IF NOT EXISTS "Itinerary_Item" (
    id UUID NOT NULL,
    group_id UUID NOT NULL,
    target TARGET_TYPE NOT NULL,
    target_id UUID NOT NULL,
    start_time TIME,
    end_time TIME,
    is_guide BOOLEAN NOT NULL DEFAULT FALSE,
    sequence_order INT NOT NULL DEFAULT 1,
    PRIMARY KEY(id),
    FOREIGN KEY(group_id) REFERENCES "Itinerary_Group"(id) ON DELETE CASCADE
);

COMMENT ON COLUMN "Itinerary_Item"."group_id" IS '關聯到主表的 ID';
COMMENT ON COLUMN "Itinerary_Item"."target" IS '目標類型: RESTAURANT, EXHIBITION, EVENT, COLLECTION, TOUR_SCHEDULE';
COMMENT ON COLUMN "Itinerary_Item"."target_id" IS '目標實體的 UUID';
COMMENT ON COLUMN "Itinerary_Item"."start_time" IS '預計開始時間';
COMMENT ON COLUMN "Itinerary_Item"."end_time" IS '預計結束時間';
COMMENT ON COLUMN "Itinerary_Item"."is_guide" IS '是否需要導覽員';
COMMENT ON COLUMN "Itinerary_Item"."sequence_order" IS '顯示順序';
