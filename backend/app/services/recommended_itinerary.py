from sqlalchemy import text
from sqlalchemy.engine import Connection
from typing import List, Dict, Any


def get_all_recommended_itineraries(conn: Connection, language: str = "zh_TW") -> List[Dict[str, Any]]:
    """取得所有推薦行程列表"""
    sql = text("""
        SELECT
            rig.id,
            rit.title,
            rit.description,
            rig.image_url,
            rig.estimated_duration_minutes,
            rit.language_code
        FROM "Recommended_Itinerary_Group" rig
        LEFT JOIN "Recommended_Itinerary_Translations" rit
            ON rig.id = rit.recommended_group_id
        WHERE rit.language_code = :language
        ORDER BY rig.created_at DESC
    """)

    rows = conn.execute(sql, {"language": language}).fetchall()

    return [
        {
            "id": str(row.id),
            "title": row.title,
            "description": row.description,
            "imageUrl": row.image_url or f"/images/themes/{row.id}.jpg",
            "estimatedDurationMinutes": row.estimated_duration_minutes,
            "items": []  # 列表頁不需要詳細項目
        }
        for row in rows
    ]


def get_recommended_itinerary_detail(
    conn: Connection,
    itinerary_id: str,
    language: str = "zh_TW"
) -> Dict[str, Any] | None:
    """取得推薦行程詳情，包含所有景點和路線計算"""

    # 1. 取得行程基本資訊
    group_sql = text("""
        SELECT
            rig.id,
            rit.title,
            rit.description,
            rig.image_url,
            rig.estimated_duration_minutes,
            rit.language_code
        FROM "Recommended_Itinerary_Group" rig
        LEFT JOIN "Recommended_Itinerary_Translations" rit
            ON rig.id = rit.recommended_group_id
        WHERE rig.id = :itinerary_id AND rit.language_code = :language
    """)

    group_row = conn.execute(
        group_sql,
        {"itinerary_id": itinerary_id, "language": language}
    ).fetchone()

    if not group_row:
        return None

    # 2. 取得行程項目（景點列表）
    items_sql = text("""
        SELECT
            rii.id,
            rii.target,
            rii.target_id,
            rii.suggested_stay_minutes,
            rii.sequence_order,
            COALESCE(
                ST_Y(bl_a.geom::geometry),
                ST_Y(bl_ex.geom::geometry),
                ST_Y(bl_ev.geom::geometry),
                ST_Y(bl_r.geom::geometry),
                ST_Y(bl_ct.geom::geometry)
            ) as latitude,
            COALESCE(
                ST_X(bl_a.geom::geometry),
                ST_X(bl_ex.geom::geometry),
                ST_X(bl_ev.geom::geometry),
                ST_X(bl_r.geom::geometry),
                ST_X(bl_ct.geom::geometry)
            ) as longitude,
            COALESCE(
                at.title,
                et.title,
                evt.title,
                rt.title,
                ctt.title
            ) as title,
            COALESCE(
                at.description,
                et.description,
                evt.description,
                rt.description,
                ctt.description,
                ''
            ) as description,
            COALESCE(
                a.image_url,
                ex.image_url,
                ev.image_url,
                r.image_url,
                ct.image_url
            ) as image_url
        FROM "Recommended_Itinerary_Item" rii
        -- Attractions
        LEFT JOIN "Attractions" a ON rii.target = 'attractions' AND rii.target_id = a.id
        LEFT JOIN "Base_Location" bl_a ON a.location_id = bl_a.id
        LEFT JOIN "Attractions_Translations" at ON a.id = at."Attractions_id" AND at.language_code = :language
        -- Exhibition
        LEFT JOIN "Exhibition" ex ON rii.target = 'exhibition' AND rii.target_id = ex.id
        LEFT JOIN "Base_Location" bl_ex ON ex.location_id = bl_ex.id
        LEFT JOIN "Exhibition_Translations" et ON ex.id = et."Exhibition_id" AND et.language_code = :language
        -- Event
        LEFT JOIN "Event" ev ON rii.target = 'event' AND rii.target_id = ev.id
        LEFT JOIN "Base_Location" bl_ev ON ev.location_id = bl_ev.id
        LEFT JOIN "Event_Translations" evt ON ev.id = evt."Event_id" AND evt.language_code = :language
        -- Restaurant
        LEFT JOIN "Restaurant" r ON rii.target = 'restaurant' AND rii.target_id = r.id
        LEFT JOIN "Base_Location" bl_r ON r.location_id = bl_r.id
        LEFT JOIN "Restaurant_Translations" rt ON r.id = rt."Restaurant_id" AND rt.language_code = :language
        -- Collection Themes
        LEFT JOIN "Collection_Themes" ct ON rii.target = 'collection_Themes' AND rii.target_id = ct.id
        LEFT JOIN "Base_Location" bl_ct ON ct.location_id = bl_ct.id
        LEFT JOIN "Collection_Themes_Translations" ctt ON ct.id = ctt."Themes_id" AND ctt.language_code = :language
        WHERE rii.recommended_group_id = :itinerary_id
        ORDER BY rii.sequence_order
    """)

    items_rows = conn.execute(
        items_sql,
        {"itinerary_id": itinerary_id, "language": language}
    ).fetchall()

    items = []
    total_distance = 0.0

    for row in items_rows:
        items.append({
            "id": str(row.id),
            "targetType": row.target,
            "targetId": str(row.target_id),
            "title": row.title or "未命名",
            "description": row.description or "",
            "imageUrl": row.image_url or f"/images/{row.target}/{row.target_id}.jpg",
            "suggestedStayMinutes": row.suggested_stay_minutes,
            "sequenceOrder": row.sequence_order,
            "location": {
                "lat": float(row.latitude) if row.latitude else 22.7543,
                "lng": float(row.longitude) if row.longitude else 120.4407
            }
        })

    # 3. 計算總距離（使用 pgRouting）
    # 簡化計算：使用直線距離的 1.3 倍作為步行距離估算
    if len(items) > 1:
        for i in range(len(items) - 1):
            curr = items[i]["location"]
            next_loc = items[i + 1]["location"]
            # 使用 Haversine 公式計算距離（簡化版）
            import math
            lat1, lon1 = math.radians(curr["lat"]), math.radians(curr["lng"])
            lat2, lon2 = math.radians(next_loc["lat"]), math.radians(next_loc["lng"])
            dlat = lat2 - lat1
            dlon = lon2 - lon1
            a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
            c = 2 * math.asin(math.sqrt(a))
            distance_km = 6371 * c * 1.3  # 地球半徑 * 1.3（步行修正係數）
            total_distance += distance_km

    # 4. 計算歷史評分（從 Itinerary_Item_Review 表）
    rating_sql = text("""
        SELECT AVG(rating) as avg_rating
        FROM "Itinerary_Item_Review"
        WHERE is_visible = true
    """)

    rating_row = conn.execute(rating_sql).fetchone()
    average_rating = round(float(rating_row.avg_rating), 1) if rating_row.avg_rating else 4.5

    return {
        "id": str(group_row.id),
        "title": group_row.title,
        "description": group_row.description,
        "imageUrl": group_row.image_url or f"/images/themes/{group_row.id}.jpg",
        "estimatedDurationMinutes": group_row.estimated_duration_minutes,
        "totalDistance": round(total_distance, 2),
        "averageRating": average_rating,
        "items": items
    }
