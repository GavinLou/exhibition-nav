from pydantic import BaseModel
from typing import Optional
from uuid import UUID


class AttractionTranslation(BaseModel):
    """景点翻译信息"""
    language_code: str
    title: str
    description: str
    video_url: Optional[str] = None
    audio_url: Optional[str] = None


class AttractionResponse(BaseModel):
    """景点响应模型"""
    id: str  # UUID as string
    name: str
    status: str
    image_url: Optional[str] = None
    latitude: float
    longitude: float
    rating: float = 0  # 平均評分 (0-5)，從 Itinerary_Item_Review 計算
    rating_count: int = 0  # 評分數量
    translations: dict[str, AttractionTranslation] = {}  # language_code -> translation


class RouteSegment(BaseModel):
    """路径段"""
    seq: int
    node: int
    edge: int
    cost: float
    agg_cost: float
    geom: Optional[str] = None  # GeoJSON LineString


class RouteResponse(BaseModel):
    """路径响应"""
    total_cost: float  # 总成本（米）
    total_time_minutes: float  # 预估步行时间（分钟）
    path: list[RouteSegment]
    geojson: dict  # GeoJSON格式的完整路径


class ItineraryRequest(BaseModel):
    """行程请求"""
    attraction_ids: list[str]  # UUID列表


class ItineraryResponse(BaseModel):
    """行程响应"""
    attractions: list[AttractionResponse]
    total_distance_m: float
    total_time_minutes: float
    route_geojson: dict


class OptimizeRouteRequest(BaseModel):
    """優化路線請求"""
    attraction_ids: list[str]  # 要優化順序的景點 ID 列表


class OptimizeRouteResponse(BaseModel):
    """優化路線響應"""
    sorted_attraction_ids: list[str]  # 排序後的景點 ID
    attractions: list[AttractionResponse]  # 排序後的景點資訊
    total_distance_m: float  # 總距離（米）
    total_time_minutes: float  # 總步行時間（分鐘）
    route_geojson: dict  # 路線的 GeoJSON
