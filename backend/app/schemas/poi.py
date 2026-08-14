from pydantic import BaseModel


class PoiResponse(BaseModel):
    id: int
    name: str
    category: str | None
    lon: float
    lat: float
