from fastapi import APIRouter

from app.db.session import engine
from app.schemas.poi import PoiResponse
from app.services import poi as poi_service

router = APIRouter()


@router.get("/poi", response_model=list[PoiResponse])
def list_poi():
    """列出所有景點"""
    with engine.connect() as conn:
        return poi_service.get_all_pois(conn)


@router.get("/poi/{poi_id}", response_model=PoiResponse)
def get_poi(poi_id: int):
    """取得單一景點"""
    from fastapi import HTTPException

    with engine.connect() as conn:
        poi = poi_service.get_poi_by_id(conn, poi_id)
        if not poi:
            raise HTTPException(status_code=404, detail="景點不存在")
        return poi
