from fastapi import APIRouter, HTTPException
from app.db.session import engine
from app.schemas.attractions import (
    AttractionResponse,
    ItineraryRequest,
    ItineraryResponse,
    RouteResponse
)
from app.services import attractions as attractions_service
from typing import List

router = APIRouter()


@router.get("/attractions", response_model=List[AttractionResponse])
def list_attractions():
    """获取所有景点列表（包含翻译）"""
    with engine.connect() as conn:
        return attractions_service.get_all_attractions(conn)


@router.get("/route/calculate", response_model=RouteResponse)
def calculate_route(
    start_lat: float,
    start_lon: float,
    end_lat: float,
    end_lon: float
):
    """计算两点之间的路径"""
    with engine.connect() as conn:
        route = attractions_service.calculate_route_between_points(
            conn, start_lat, start_lon, end_lat, end_lon
        )
        if not route:
            raise HTTPException(status_code=404, detail="无法找到路径")
        return route


@router.get("/attractions/{attraction_id}", response_model=AttractionResponse)
def get_attraction(attraction_id: str):
    """获取单个景点详情"""
    with engine.connect() as conn:
        attraction = attractions_service.get_attraction_by_id(conn, attraction_id)
        if not attraction:
            raise HTTPException(status_code=404, detail="景点不存在")
        return attraction


@router.post("/itinerary/calculate", response_model=ItineraryResponse)
def calculate_itinerary(request: ItineraryRequest):
    """
    计算行程路线
    给定一系列景点ID，按顺序计算总距离和时间
    """
    with engine.connect() as conn:
        # 获取所有景点信息
        attractions = []
        for attraction_id in request.attraction_ids:
            attraction = attractions_service.get_attraction_by_id(conn, attraction_id)
            if not attraction:
                raise HTTPException(
                    status_code=404,
                    detail=f"景点 {attraction_id} 不存在"
                )
            attractions.append(attraction)

        if len(attractions) < 2:
            # 单个景点，无需计算路径
            return ItineraryResponse(
                attractions=attractions,
                total_distance_m=0,
                total_time_minutes=0,
                route_geojson={
                    "type": "FeatureCollection",
                    "features": []
                }
            )

        # 计算每段路径
        total_distance = 0
        total_time = 0
        features = []

        for i in range(len(attractions) - 1):
            start = attractions[i]
            end = attractions[i + 1]

            route = attractions_service.calculate_route_between_points(
                conn,
                start.latitude,
                start.longitude,
                end.latitude,
                end.longitude
            )

            if route:
                total_distance += route.total_cost
                total_time += route.total_time_minutes
                features.append(route.geojson)

        # 合并所有路径为一个GeoJSON FeatureCollection
        route_geojson = {
            "type": "FeatureCollection",
            "features": features
        }

        return ItineraryResponse(
            attractions=attractions,
            total_distance_m=total_distance,
            total_time_minutes=total_time,
            route_geojson=route_geojson
        )
