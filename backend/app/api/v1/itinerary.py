from fastapi import APIRouter, HTTPException
from app.db.session import engine
from app.schemas.itinerary import ItineraryGroupCreate, ItineraryGroupResponse
from app.services import itinerary as itinerary_service
from sqlalchemy import text

router = APIRouter()


@router.post("/create", response_model=ItineraryGroupResponse)
def create_itinerary(data: ItineraryGroupCreate):
    """
    創建新的行程
    """
    try:
        with engine.connect() as conn:
            result = itinerary_service.create_itinerary_group(conn, data)
            return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/qrcode/{qr_content}")
def get_itinerary_by_qrcode(qr_content: str):
    """
    根據 QR Code 內容獲取行程資訊
    """
    try:
        print(f"[API] Received QR Code: {qr_content}")
        with engine.connect() as conn:
            result = itinerary_service.get_itinerary_by_qrcode(conn, qr_content)
            if not result:
                print(f"[API] Not found: {qr_content}")
                raise HTTPException(status_code=404, detail="Itinerary not found")
            print(f"[API] Found itinerary: {result.get('id')}")
            return result
    except HTTPException:
        raise
    except Exception as e:
        print(f"[API] Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/recent")
def get_recent_itineraries():
    """
    獲取最近的行程 QR Codes
    """
    try:
        with engine.connect() as conn:
            query = text("""
                SELECT code
                FROM "Qr_Code"
                WHERE target = 'itinerary'
                ORDER BY created_at DESC
                LIMIT 10
            """)

            result = conn.execute(query)
            qr_codes = [row.code for row in result]

            return {"qr_codes": qr_codes}
    except Exception as e:
        print(f"[API] Error fetching recent itineraries: {e}")
        raise HTTPException(status_code=500, detail=str(e))
