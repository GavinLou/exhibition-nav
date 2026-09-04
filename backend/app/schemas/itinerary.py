from pydantic import BaseModel
from typing import List, Optional
from datetime import date, time
from uuid import UUID


class ItineraryItemCreate(BaseModel):
    target_id: str  # Attraction ID
    duration: int  # 停留時間（分鐘）
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    is_guide: bool = False
    sequence_order: int


class ItineraryGroupCreate(BaseModel):
    visiter_id: Optional[str] = None  # 如果沒有會使用預設的第三筆
    total_participants: int
    visit_date: date
    title: str
    theme_title: str  # 主題標題
    start_hour: int
    start_minute: int
    qr_code: str  # QR Code 內容
    walk_times: List[int]  # 每段路線的走路時間（分鐘）
    items: List[ItineraryItemCreate]


class ItineraryGroupResponse(BaseModel):
    id: str
    visiter_id: str
    total_participants: int
    visit_date: date
    title: str
    is_confirm: bool
    is_accessible_required: bool
    status: str
    created_at: str
