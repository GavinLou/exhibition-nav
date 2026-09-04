from sqlalchemy import text
from sqlalchemy.engine import Connection
from app.schemas.itinerary import ItineraryGroupCreate, ItineraryGroupResponse
from typing import Optional
import uuid
from datetime import datetime, time, timedelta


def create_itinerary_group(conn: Connection, data: ItineraryGroupCreate) -> ItineraryGroupResponse:
    """
    創建行程總記錄和行程項目
    """
    # 如果沒有提供 visiter_id，使用預設的第三筆資料
    visiter_id = data.visiter_id
    if not visiter_id:
        # 獲取第三筆 Visiter 的 ID
        visiter_query = text("""
            SELECT id FROM "Visiter"
            ORDER BY created_at
            LIMIT 1 OFFSET 2
        """)
        visiter_result = conn.execute(visiter_query)
        visiter_row = visiter_result.fetchone()
        if visiter_row:
            visiter_id = str(visiter_row.id)
        else:
            raise Exception("No default visiter found")

    # 生成新的 UUID
    group_id = str(uuid.uuid4())

    # 插入 Itinerary_Group
    insert_group_query = text("""
        INSERT INTO "Itinerary_Group" (
            id,
            "Visiter_id",
            total_participants,
            visit_date,
            title,
            is_confirm,
            is_accessible_required,
            status
        ) VALUES (
            :id,
            :visiter_id,
            :total_participants,
            :visit_date,
            :title,
            :is_confirm,
            :is_accessible_required,
            :status
        )
    """)

    conn.execute(insert_group_query, {
        "id": group_id,
        "visiter_id": visiter_id,
        "total_participants": data.total_participants,
        "visit_date": data.visit_date,
        "title": data.title,
        "is_confirm": False,
        "is_accessible_required": False,
        "status": "apply"  # 使用原本的枚舉值: confirming, apply, in_progress, cancel
    })

    # 計算每個景點的開始和結束時間
    current_time = datetime.combine(data.visit_date, time(data.start_hour, data.start_minute))

    # 插入 Itinerary_Item
    for index, item in enumerate(data.items):
        item_id = str(uuid.uuid4())

        # 計算這個景點的開始和結束時間
        start_time = current_time.time()
        end_time = (current_time + timedelta(minutes=item.duration)).time()

        insert_item_query = text("""
            INSERT INTO "Itinerary_Item" (
                id,
                group_id,
                target,
                target_id,
                start_time,
                end_time,
                is_guide,
                sequence_order
            ) VALUES (
                :id,
                :group_id,
                :target,
                :target_id,
                :start_time,
                :end_time,
                :is_guide,
                :sequence_order
            )
        """)

        conn.execute(insert_item_query, {
            "id": item_id,
            "group_id": group_id,
            "target": "attractions",  # Itinerary_Item 的 target 仍然用 attractions
            "target_id": item.target_id,
            "start_time": start_time,
            "end_time": end_time,
            "is_guide": item.is_guide,
            "sequence_order": item.sequence_order
        })

        # 更新時間：結束時間 + 走路時間（如果有下一個景點）
        current_time = current_time + timedelta(minutes=item.duration)
        if index < len(data.walk_times):
            current_time = current_time + timedelta(minutes=data.walk_times[index])

    # 插入 Qr_Code 記錄
    qrcode_id = str(uuid.uuid4())
    insert_qrcode_query = text("""
        INSERT INTO "Qr_Code" (
            id,
            code,
            target,
            target_id,
            scan_count
        ) VALUES (
            :id,
            :code,
            :target,
            :target_id,
            0
        )
    """)

    conn.execute(insert_qrcode_query, {
        "id": qrcode_id,
        "code": data.qr_code,
        "target": "itinerary",  # QR Code 的 target 用 itinerary
        "target_id": group_id
    })

    conn.commit()

    # 返回創建的資料
    return ItineraryGroupResponse(
        id=group_id,
        visiter_id=visiter_id,
        total_participants=data.total_participants,
        visit_date=str(data.visit_date),
        title=data.title,
        is_confirm=False,
        is_accessible_required=False,
        status="apply",
        created_at=datetime.now().isoformat()
    )


def get_itinerary_by_qrcode(conn: Connection, qr_content: str) -> Optional[dict]:
    """
    根據 QR Code 內容獲取行程資訊
    QR Code 格式: 主題_姓名_人數_日期時間
    """
    try:
        # 直接查詢 Qr_Code 表找到對應的 Itinerary_Group
        qrcode_query = text("""
            SELECT target_id
            FROM "Qr_Code"
            WHERE code = :qr_code AND target = 'itinerary'
            LIMIT 1
        """)

        qrcode_result = conn.execute(qrcode_query, {"qr_code": qr_content})
        qrcode_row = qrcode_result.fetchone()

        if not qrcode_row:
            print(f"[Itinerary] QR Code not found: {qr_content}")
            return None

        group_id = str(qrcode_row.target_id)
        print(f"[Itinerary] Found group_id: {group_id}")

        # 查詢行程資訊
        query = text("""
            SELECT
                ig.id,
                ig."Visiter_id",
                ig.total_participants,
                ig.visit_date,
                ig.title,
                ig.is_confirm,
                ig.status,
                ig.created_at
            FROM "Itinerary_Group" ig
            WHERE ig.id = :group_id
        """)

        result = conn.execute(query, {"group_id": group_id})
        row = result.fetchone()

        if not row:
            print(f"[Itinerary] Group not found: {group_id}")
            return None

        # 獲取行程項目
        items_query = text("""
            SELECT
                ii.id,
                ii.target_id,
                ii.start_time,
                ii.end_time,
                ii.is_guide,
                ii.sequence_order,
                at.title as attraction_name,
                bl.geom
            FROM "Itinerary_Item" ii
            LEFT JOIN "Attractions" a ON ii.target_id::uuid = a.id
            LEFT JOIN "Attractions_Translations" at ON a.id = at."Attractions_id" AND at.language_code = 'zh_TW'
            LEFT JOIN "Base_Location" bl ON a.location_id = bl.id
            WHERE ii.group_id = :group_id
            ORDER BY ii.sequence_order
        """)

        items_result = conn.execute(items_query, {"group_id": str(row.id)})
        items = []
        for item_row in items_result:
            items.append({
                "id": str(item_row.id),
                "target_id": str(item_row.target_id),
                "attraction_name": item_row.attraction_name,
                "start_time": str(item_row.start_time) if item_row.start_time else None,
                "end_time": str(item_row.end_time) if item_row.end_time else None,
                "is_guide": item_row.is_guide,
                "sequence_order": item_row.sequence_order
            })

        return {
            "id": str(row.id),
            "total_participants": row.total_participants,
            "visit_date": str(row.visit_date),
            "title": row.title,
            "is_confirm": row.is_confirm,
            "status": row.status,
            "created_at": str(row.created_at),
            "items": items
        }
    except Exception as e:
        print(f"Error parsing QR code: {e}")
        return None
