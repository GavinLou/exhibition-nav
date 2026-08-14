from sqlalchemy import text
from sqlalchemy.engine import Connection

from app.schemas.poi import PoiResponse


def get_all_pois(conn: Connection) -> list[PoiResponse]:
    sql = text("""
        SELECT id, name, category, ST_X(geom) AS lon, ST_Y(geom) AS lat
        FROM poi
        ORDER BY id
    """)
    rows = conn.execute(sql).fetchall()
    return [
        PoiResponse(id=r.id, name=r.name, category=r.category, lon=r.lon, lat=r.lat)
        for r in rows
    ]


def get_poi_by_id(conn: Connection, poi_id: int) -> PoiResponse | None:
    sql = text("""
        SELECT id, name, category, ST_X(geom) AS lon, ST_Y(geom) AS lat
        FROM poi
        WHERE id = :poi_id
    """)
    row = conn.execute(sql, {"poi_id": poi_id}).fetchone()
    if not row:
        return None
    return PoiResponse(id=row.id, name=row.name, category=row.category, lon=row.lon, lat=row.lat)
