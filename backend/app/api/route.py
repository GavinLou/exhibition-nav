# app/api/route.py
# ---------------------------------------------------------
# 這支檔案是目前MVP的核心：接收「起點景點id、終點景點id」，
# 呼叫 pgRouting 算最短路徑，把結果轉成前端(MapLibre)看得懂的
# GeoJSON格式回傳。
#
# GeoJSON 是地圖界的通用資料格式，MapLibre、Google Maps、
# QGIS 等幾乎所有GIS工具都吃這個格式，所以後端統一輸出GeoJSON，
# 前端不用另外寫轉換邏輯。
# ---------------------------------------------------------

import json

from fastapi import APIRouter, HTTPException
from sqlalchemy import text

from app.db.session import engine

# APIRouter 可以想成「這支檔案自己的迷你FastAPI app」，
# 之後 main.py 會把這個 router「掛」到整個應用程式上。
# 這樣做的好處：以後 api/chat.py（AI對話）、api/qrcode.py（QR Code）
# 都可以各自獨立寫，最後在 main.py 統一組裝，不會全部擠在一支檔案。
router = APIRouter()


@router.get("/route")
def get_route(from_id: int, to_id: int):
    """
    計算兩個景點之間的最短路徑。

    使用範例：GET /api/route?from_id=1&to_id=5
    """

    # pgr_dijkstra 是 pgRouting 提供的最短路徑函式，用法：
    #   pgr_dijkstra(邊的查詢SQL, 起點node id, 終點node id)
    # 它會回傳「經過哪些節點、走了哪些edge、每一步累積走了多少成本」，
    # 一列代表路徑上的一個節點。
    #
    # LEFT JOIN ways：因為 pgr_dijkstra 回傳的是「edge的id(gid)」，
    # 不包含實際座標線段，所以要再去 ways 表把每段路的
    # 實際幾何線段(the_geom)撈出來，才能畫在地圖上。
    #
    # :from_id / :to_id 是 SQLAlchemy 的「具名參數」寫法，
    # 讓使用者輸入的數字安全地代入SQL，不會有SQL injection的風險
    # (絕對不要用 f-string 把使用者輸入直接拼進SQL字串)。
    sql = text(
        """
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
        ORDER BY r.seq;
        """
    )

    with engine.connect() as conn:
        rows = conn.execute(sql, {"from_id": from_id, "to_id": to_id}).fetchall()

    # pgr_dijkstra 找不到路徑時會回傳空結果（例如兩個點之間完全沒有路連通）
    if not rows:
        raise HTTPException(status_code=404, detail="找不到路徑，請確認景點id是否存在、路網是否連通")

    coordinates = []
    total_distance = 0.0

    for row in rows:
        # pgr_dijkstra 對「最後一個節點」那一列，edge 會是 -1，
        # 代表「已經到終點了，這一列後面沒有下一段路」，
        # 這種列在 LEFT JOIN 之後 geom_json 會是 None，要跳過不處理。
        if row.geom_json:
            segment = json.loads(row.geom_json)
            coordinates.extend(segment["coordinates"])

        # agg_cost 是「累積成本」，最後一列的 agg_cost 就是整條路徑的總距離(公尺)，
        # 每一輪迴圈都覆寫它，跑完迴圈自然留下最後(也就是最大)的那個值。
        total_distance = row.agg_cost

    # 回傳標準 GeoJSON Feature 格式，MapLibre 可以直接拿這個物件當地圖圖層的資料來源。
    return {
        "type": "Feature",
        "properties": {
            "distance_meters": round(total_distance, 1),
        },
        "geometry": {
            "type": "LineString",
            "coordinates": coordinates,
        },
    }


@router.get("/poi")
def list_poi():
    """
    列出所有景點，前端要先知道有哪些景點、座標在哪，才能畫marker。
    """
    sql = text(
        """
        SELECT id, name, category, ST_X(geom) AS lon, ST_Y(geom) AS lat
        FROM poi
        ORDER BY id;
        """
    )
    with engine.connect() as conn:
        rows = conn.execute(sql).fetchall()

    return [
        {"id": r.id, "name": r.name, "category": r.category, "lon": r.lon, "lat": r.lat}
        for r in rows
    ]
