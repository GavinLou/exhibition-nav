from sqlalchemy import text
from sqlalchemy.engine import Connection
from typing import Dict, Optional


def get_attraction_average_rating(conn: Connection, attraction_id: str) -> Optional[float]:
    """
    獲取景點的平均評分
    從 Itinerary_Item_Review 計算所有與此景點相關的評分平均值
    """
    query = text("""
        SELECT AVG(iir.rating)::DECIMAL(3,2) as avg_rating
        FROM "Itinerary_Item_Review" iir
        JOIN "Recommended_Itinerary_Item" rii ON iir.itinerary_item_id = rii.id
        WHERE rii.target = 'attractions'
          AND rii.target_id = :attraction_id
          AND iir.is_visible = true
    """)

    result = conn.execute(query, {"attraction_id": attraction_id})
    row = result.fetchone()

    if row and row.avg_rating:
        return float(row.avg_rating)
    return None


def get_all_attractions_ratings(conn: Connection) -> Dict[str, float]:
    """
    獲取所有景點的平均評分
    返回 {attraction_id: avg_rating} 的字典
    """
    query = text("""
        SELECT
            rii.target_id as attraction_id,
            AVG(iir.rating)::DECIMAL(3,2) as avg_rating,
            COUNT(iir.id) as review_count
        FROM "Itinerary_Item_Review" iir
        JOIN "Recommended_Itinerary_Item" rii ON iir.itinerary_item_id = rii.id
        WHERE rii.target = 'attractions'
          AND iir.is_visible = true
        GROUP BY rii.target_id
    """)

    result = conn.execute(query)
    ratings = {}

    for row in result:
        if row.avg_rating:
            ratings[str(row.attraction_id)] = {
                'rating': float(row.avg_rating),
                'count': row.review_count
            }

    return ratings


def submit_itinerary_item_review(
    conn: Connection,
    itinerary_item_id: str,
    visitor_id: str,
    rating: int,
    comment: str = ""
) -> bool:
    """
    提交行程項目評分
    rating: 1-5 的整數
    """
    if rating < 1 or rating > 5:
        raise ValueError("Rating must be between 1 and 5")

    # 檢查是否已經評分過
    check_query = text("""
        SELECT id FROM "Itinerary_Item_Review"
        WHERE itinerary_item_id = :itinerary_item_id
          AND "Visiter_id" = :visitor_id
    """)

    existing = conn.execute(check_query, {
        "itinerary_item_id": itinerary_item_id,
        "visitor_id": visitor_id
    }).fetchone()

    if existing:
        # 更新現有評分
        update_query = text("""
            UPDATE "Itinerary_Item_Review"
            SET rating = :rating,
                comment = :comment,
                updated_at = NOW()
            WHERE itinerary_item_id = :itinerary_item_id
              AND "Visiter_id" = :visitor_id
        """)

        conn.execute(update_query, {
            "rating": rating,
            "comment": comment,
            "itinerary_item_id": itinerary_item_id,
            "visitor_id": visitor_id
        })
    else:
        # 插入新評分
        insert_query = text("""
            INSERT INTO "Itinerary_Item_Review"
            (id, itinerary_item_id, "Visiter_id", rating, comment, is_visible)
            VALUES (gen_random_uuid(), :itinerary_item_id, :visitor_id, :rating, :comment, true)
        """)

        conn.execute(insert_query, {
            "itinerary_item_id": itinerary_item_id,
            "visitor_id": visitor_id,
            "rating": rating,
            "comment": comment
        })

    conn.commit()
    return True
