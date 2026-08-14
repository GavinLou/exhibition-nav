from fastapi import APIRouter, HTTPException

from app.db.session import engine
from app.schemas.route import RouteResponse
from app.services import routing as routing_service

router = APIRouter()


@router.get("/route", response_model=RouteResponse)
def get_route(from_id: int, to_id: int):
    """計算兩個景點之間的最短路徑"""
    with engine.connect() as conn:
        result = routing_service.calculate_shortest_path(conn, from_id, to_id)
        if not result:
            raise HTTPException(
                status_code=404,
                detail="找不到路徑，請確認景點id是否存在、路網是否連通"
            )
        return result
