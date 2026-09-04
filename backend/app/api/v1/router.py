from fastapi import APIRouter

from app.api.v1 import poi, route, attractions, recommended_itinerary, itinerary

router = APIRouter()

router.include_router(poi.router, tags=["景點"])
router.include_router(route.router, tags=["路徑"])
router.include_router(attractions.router, tags=["景點管理"])
router.include_router(recommended_itinerary.router, tags=["推薦行程"])
router.include_router(itinerary.router, prefix="/itinerary", tags=["行程管理"])
