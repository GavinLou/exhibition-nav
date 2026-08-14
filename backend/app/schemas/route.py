from pydantic import BaseModel


class RouteProperties(BaseModel):
    distance_meters: float


class RouteGeometry(BaseModel):
    type: str = "LineString"
    coordinates: list[list[float]]


class RouteResponse(BaseModel):
    type: str = "Feature"
    properties: RouteProperties
    geometry: RouteGeometry
