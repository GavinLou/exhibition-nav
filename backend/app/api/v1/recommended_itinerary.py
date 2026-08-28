from fastapi import APIRouter, HTTPException
from app.db.session import engine
from app.services import recommended_itinerary as itinerary_service
from typing import List

router = APIRouter()


@router.get("/recommended-itineraries")
def list_recommended_itineraries(language: str = "zh_TW"):
    """取得所有推薦行程列表"""
    with engine.connect() as conn:
        return itinerary_service.get_all_recommended_itineraries(conn, language)


@router.get("/recommended-itineraries/{itinerary_id}")
def get_recommended_itinerary(itinerary_id: str, language: str = "zh_TW"):
    """取得單一推薦行程詳情（包含路線計算）"""
    with engine.connect() as conn:
        itinerary = itinerary_service.get_recommended_itinerary_detail(
            conn, itinerary_id, language
        )
        if not itinerary:
            raise HTTPException(status_code=404, detail="推薦行程不存在")
        return itinerary
