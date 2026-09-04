from sqlalchemy import text
from sqlalchemy.engine import Connection
from app.schemas.attractions import AttractionResponse, AttractionTranslation, RouteResponse, RouteSegment
from app.services import ratings as ratings_service
from typing import List, Optional
import json


def get_all_attractions(conn: Connection) -> List[AttractionResponse]:
    """获取所有景点及其翻译"""
    query = text("""
        SELECT
            a.id,
            bl.name,
            a.status,
            a.image_url,
            ST_Y(bl.geom) as latitude,
            ST_X(bl.geom) as longitude,
            COALESCE(
                json_agg(
                    json_build_object(
                        'language_code', at.language_code,
                        'title', at.title,
                        'description', at.description,
                        'video_url', at.video_url,
                        'audio_url', at.audio_url
                    )
                ) FILTER (WHERE at.id IS NOT NULL),
                '[]'
            ) as translations
        FROM "Attractions" a
        JOIN "Base_Location" bl ON a.location_id = bl.id
        LEFT JOIN "Attractions_Translations" at ON a.id = at."Attractions_id"
        GROUP BY a.id, bl.name, a.status, a.image_url, bl.geom
        ORDER BY bl.name
    """)

    result = conn.execute(query)
    attractions = []

    # 獲取所有景點的評分
    all_ratings = ratings_service.get_all_attractions_ratings(conn)

    for row in result:
        translations_dict = {}
        for trans in row.translations:
            translations_dict[trans['language_code']] = AttractionTranslation(**trans)

        attraction_id = str(row.id)
        rating_info = all_ratings.get(attraction_id, {'rating': 0, 'count': 0})

        attractions.append(AttractionResponse(
            id=attraction_id,
            name=row.name,
            status=row.status,
            image_url=row.image_url,
            rating=rating_info['rating'],
            rating_count=rating_info['count'],
            latitude=row.latitude,
            longitude=row.longitude,
            translations=translations_dict
        ))

    return attractions


def get_attraction_by_id(conn: Connection, attraction_id: str) -> Optional[AttractionResponse]:
    """获取单个景点详情"""
    query = text("""
        SELECT
            a.id,
            bl.name,
            a.status,
            a.image_url,
            ST_Y(bl.geom) as latitude,
            ST_X(bl.geom) as longitude,
            COALESCE(
                json_agg(
                    json_build_object(
                        'language_code', at.language_code,
                        'title', at.title,
                        'description', at.description,
                        'video_url', at.video_url,
                        'audio_url', at.audio_url
                    )
                ) FILTER (WHERE at.id IS NOT NULL),
                '[]'
            ) as translations
        FROM "Attractions" a
        JOIN "Base_Location" bl ON a.location_id = bl.id
        LEFT JOIN "Attractions_Translations" at ON a.id = at."Attractions_id"
        WHERE a.id = :attraction_id
        GROUP BY a.id, bl.name, a.status, a.image_url, bl.geom
    """)

    result = conn.execute(query, {"attraction_id": attraction_id})
    row = result.fetchone()

    if not row:
        return None

    translations_dict = {}
    for trans in row.translations:
        translations_dict[trans['language_code']] = AttractionTranslation(**trans)

    # 獲取評分
    avg_rating = ratings_service.get_attraction_average_rating(conn, attraction_id) or 0

    return AttractionResponse(
        id=str(row.id),
        name=row.name,
        status=row.status,
        image_url=row.image_url,
        rating=avg_rating,
        rating_count=0,  # 可以優化為也查詢評分數量
        latitude=row.latitude,
        longitude=row.longitude,
        translations=translations_dict
    )


def calculate_route_between_points(
    conn: Connection,
    start_lat: float,
    start_lon: float,
    end_lat: float,
    end_lon: float
) -> Optional[RouteResponse]:
    """
    使用pgRouting计算基于实际路网的路径
    """
    # 查询使用pgRouting计算实际路网路径
    query = text("""
        WITH start_vertex AS (
            SELECT id
            FROM "Park_Network_vertices_pgr"
            ORDER BY ST_Distance(
                the_geom,
                ST_SetSRID(ST_MakePoint(:start_lon, :start_lat), 4326)::geography
            )
            LIMIT 1
        ),
        end_vertex AS (
            SELECT id
            FROM "Park_Network_vertices_pgr"
            ORDER BY ST_Distance(
                the_geom,
                ST_SetSRID(ST_MakePoint(:end_lon, :end_lat), 4326)::geography
            )
            LIMIT 1
        ),
        route AS (
            SELECT
                r.seq,
                r.node,
                r.edge,
                r.cost,
                r.agg_cost,
                pn.geom,
                ST_AsGeoJSON(pn.geom) as geom_json
            FROM pgr_dijkstra(
                'SELECT id, source, target, cost, reverse_cost FROM "Park_Network"',
                (SELECT id FROM start_vertex),
                (SELECT id FROM end_vertex),
                directed := false
            ) r
            LEFT JOIN "Park_Network" pn ON r.edge = pn.id
            WHERE r.edge > 0
        )
        SELECT
            seq,
            node,
            edge,
            cost,
            agg_cost,
            geom_json,
            (SELECT SUM(cost) FROM route) as total_cost
        FROM route
        ORDER BY seq
    """)

    try:
        result = conn.execute(query, {
            "start_lat": start_lat,
            "start_lon": start_lon,
            "end_lat": end_lat,
            "end_lon": end_lon
        })

        rows = result.fetchall()

        if not rows or len(rows) == 0:
            # 如果找不到路径，使用直线距离
            return _calculate_direct_route(conn, start_lat, start_lon, end_lat, end_lon)

        total_cost = rows[0].total_cost if rows[0].total_cost else 0
        # 步行速度 4.5 km/h = 75 m/min
        total_time_minutes = total_cost / 75.0

        # 收集所有路径段的坐标（只保留连续路径，去除重复点）
        all_coordinates = []
        path = []

        for row in rows:
            path.append(RouteSegment(
                seq=row.seq,
                node=row.node,
                edge=row.edge,
                cost=row.cost,
                agg_cost=row.agg_cost,
                geom=row.geom_json
            ))

            if row.geom_json:
                geom_data = json.loads(row.geom_json)
                # LineString的坐标是数组
                if geom_data.get('type') == 'LineString':
                    coords = geom_data['coordinates']

                    # 如果是第一个线段，加入所有点
                    if len(all_coordinates) == 0:
                        all_coordinates.extend(coords)
                    else:
                        # 否则，跳过第一个点（因为它应该等于上一个线段的最后一个点）
                        # 避免重复点
                        if len(coords) > 1:
                            all_coordinates.extend(coords[1:])
                        elif len(coords) == 1:
                            # 如果只有一个点，检查是否与最后一个点重复
                            if all_coordinates[-1] != coords[0]:
                                all_coordinates.append(coords[0])

        # 创建GeoJSON
        geojson = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": all_coordinates
            },
            "properties": {
                "total_cost": total_cost,
                "total_time_minutes": total_time_minutes,
                "method": "pgrouting"
            }
        }

        print(f"[Route] pgRouting result: {len(all_coordinates)} coordinates, distance={total_cost:.2f}m")
        if len(all_coordinates) > 0:
            print(f"[Route] First coord: {all_coordinates[0]}, Last coord: {all_coordinates[-1]}")

        return RouteResponse(
            total_cost=total_cost,
            total_time_minutes=total_time_minutes,
            path=path,
            geojson=geojson
        )

    except Exception as e:
        print(f"Error calculating route with pgRouting: {e}")
        # 如果pgRouting失败，使用直线距离
        return _calculate_direct_route(conn, start_lat, start_lon, end_lat, end_lon)


def _calculate_direct_route(
    conn: Connection,
    start_lat: float,
    start_lon: float,
    end_lat: float,
    end_lon: float
) -> RouteResponse:
    """
    计算直线距离作为fallback
    """
    direct_distance_query = text("""
        SELECT ST_Distance(
            ST_SetSRID(ST_MakePoint(:start_lon, :start_lat), 4326)::geography,
            ST_SetSRID(ST_MakePoint(:end_lon, :end_lat), 4326)::geography
        ) as distance
    """)

    distance_result = conn.execute(direct_distance_query, {
        "start_lat": start_lat,
        "start_lon": start_lon,
        "end_lat": end_lat,
        "end_lon": end_lon
    })

    distance = distance_result.fetchone().distance
    time_minutes = distance / 75.0

    geojson = {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [[start_lon, start_lat], [end_lon, end_lat]]
        },
        "properties": {
            "total_cost": distance,
            "total_time_minutes": time_minutes,
            "method": "direct_fallback"
        }
    }

    return RouteResponse(
        total_cost=distance,
        total_time_minutes=time_minutes,
        path=[],
        geojson=geojson
    )
