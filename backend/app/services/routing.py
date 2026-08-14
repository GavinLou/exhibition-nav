import json

from sqlalchemy import text
from sqlalchemy.engine import Connection

from app.schemas.route import RouteResponse, RouteProperties, RouteGeometry


def calculate_shortest_path(conn: Connection, from_id: int, to_id: int) -> RouteResponse | None:
    """
    使用 pgRouting 的 pgr_dijkstra 計算兩點間最短路徑。
    回傳 GeoJSON Feature 格式，若找不到路徑則回傳 None。
    """
    sql = text("""
        SELECT
            r.seq,
            r.node,
            r.edge,
            r.cost,
            r.agg_cost,
            ST_AsGeoJSON(w.the_geom) AS geom_json
        FROM pgr_dijkstra(
            'SELECT gid AS id, source, target, cost, reverse_cost FROM ways',
            :from_id,
            :to_id
        ) r
        LEFT JOIN ways w ON r.edge = w.gid
        ORDER BY r.seq
    """)

    rows = conn.execute(sql, {"from_id": from_id, "to_id": to_id}).fetchall()

    if not rows:
        return None

    coordinates: list[list[float]] = []
    total_distance = 0.0

    for row in rows:
        if row.geom_json:
            segment = json.loads(row.geom_json)
            coordinates.extend(segment["coordinates"])
        total_distance = row.agg_cost

    return RouteResponse(
        properties=RouteProperties(distance_meters=round(total_distance, 1)),
        geometry=RouteGeometry(coordinates=coordinates),
    )
