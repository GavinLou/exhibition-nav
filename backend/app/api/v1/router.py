from fastapi import APIRouter

from app.api.v1 import poi, route

router = APIRouter()

router.include_router(poi.router, tags=["景點"])
router.include_router(route.router, tags=["路徑"])
