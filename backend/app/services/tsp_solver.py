"""
TSP (Traveling Salesman Problem) Solver
使用貪婪演算法計算訪問所有景點的近似最短路徑
"""
from sqlalchemy.engine import Connection
from typing import List, Tuple
from app.services import attractions as attractions_service


def calculate_optimal_route(
    conn: Connection,
    attraction_ids: List[str],
    start_attraction_id: str = None
) -> List[str]:
    """
    計算訪問所有景點的近似最短路徑
    使用貪婪演算法（Nearest Neighbor）+ 實際路網距離

    Args:
        conn: 資料庫連接
        attraction_ids: 景點 ID 列表
        start_attraction_id: 起始景點 ID（可選）

    Returns:
        排序後的景點 ID 列表（最短路徑順序）
    """
    if len(attraction_ids) <= 1:
        return attraction_ids

    # 獲取所有景點資料
    attractions_map = {}
    for attr_id in attraction_ids:
        attr = attractions_service.get_attraction_by_id(conn, attr_id)
        if attr:
            attractions_map[attr_id] = attr

    if len(attractions_map) <= 1:
        return attraction_ids

    # 貪婪演算法：每次選擇最近的未訪問景點（使用實際路網距離）
    if start_attraction_id and start_attraction_id in attractions_map:
        current = start_attraction_id
    else:
        # 從列表第一個開始
        current = attraction_ids[0]

    unvisited = set(attraction_ids)
    unvisited.remove(current)
    route = [current]

    print(f"[TSP] Starting from: {current}")

    while unvisited:
        current_attr = attractions_map[current]
        nearest = None
        min_distance = float('inf')

        # 找最近的未訪問景點（使用 Park_Network 實際路網距離）
        for next_id in unvisited:
            next_attr = attractions_map[next_id]

            # 使用 pgRouting 計算實際路網距離
            route_result = attractions_service.calculate_route_between_points(
                conn,
                current_attr.latitude,
                current_attr.longitude,
                next_attr.latitude,
                next_attr.longitude
            )

            if route_result:
                distance = route_result.total_cost  # 實際路網距離（公尺）
            else:
                # 如果找不到路徑，使用直線距離作為備案
                distance = _haversine_distance(
                    current_attr.latitude, current_attr.longitude,
                    next_attr.latitude, next_attr.longitude
                ) * 1000  # 轉換為公尺

            print(f"[TSP] Distance from {current} to {next_id}: {distance:.2f}m")

            if distance < min_distance:
                min_distance = distance
                nearest = next_id

        if nearest:
            print(f"[TSP] Next nearest: {nearest} (distance: {min_distance:.2f}m)")
            route.append(nearest)
            unvisited.remove(nearest)
            current = nearest
        else:
            # 如果找不到，加入剩餘的（不應該發生）
            route.extend(list(unvisited))
            break

    print(f"[TSP] Final route: {route}")
    return route


def _haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    使用 Haversine 公式計算兩點間的直線距離（公里）
    """
    import math

    # 地球半徑（公里）
    R = 6371.0

    # 轉換為弧度
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    # Haversine 公式
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad

    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.asin(math.sqrt(a))

    distance = R * c

    return distance


def calculate_route_with_distances(
    conn: Connection,
    attraction_ids: List[str]
) -> Tuple[List[str], float, float]:
    """
    計算路線並返回總距離和總時間
    使用多起點 + 2-opt 優化來找到更好的路徑

    Returns:
        (sorted_ids, total_distance_meters, total_time_minutes)
    """
    if len(attraction_ids) <= 1:
        return (attraction_ids, 0.0, 0.0)

    print(f"[TSP] Optimizing route for {len(attraction_ids)} attractions")

    # 方法1: 嘗試每個景點作為起點,選最好的
    best_route = None
    best_distance = float('inf')
    best_time = 0.0

    for start_id in attraction_ids:
        route = calculate_optimal_route(conn, attraction_ids, start_id)
        distance, time = _calculate_total_distance(conn, route)

        print(f"[TSP] Route starting from {start_id}: distance={distance:.2f}m")

        if distance < best_distance:
            best_distance = distance
            best_time = time
            best_route = route

    print(f"[TSP] Best greedy route: {best_route}, distance={best_distance:.2f}m")

    # 方法2: 2-opt 優化 (改善路徑)
    if len(attraction_ids) >= 3:
        improved_route = _two_opt_optimize(conn, best_route)
        improved_distance, improved_time = _calculate_total_distance(conn, improved_route)

        print(f"[TSP] After 2-opt: {improved_route}, distance={improved_distance:.2f}m")

        if improved_distance < best_distance:
            best_distance = improved_distance
            best_time = improved_time
            best_route = improved_route
            print(f"[TSP] 2-opt improved by {best_distance - improved_distance:.2f}m")

    print(f"[TSP] Final route: {best_route}, distance={best_distance:.2f}m, time={best_time:.2f}min")
    return (best_route, best_distance, best_time)


def _calculate_total_distance(
    conn: Connection,
    route: List[str]
) -> Tuple[float, float]:
    """
    計算路徑的總距離和總時間
    """
    total_distance = 0.0
    total_time = 0.0

    for i in range(len(route) - 1):
        start_id = route[i]
        end_id = route[i + 1]

        start_attr = attractions_service.get_attraction_by_id(conn, start_id)
        end_attr = attractions_service.get_attraction_by_id(conn, end_id)

        if start_attr and end_attr:
            route_result = attractions_service.calculate_route_between_points(
                conn,
                start_attr.latitude,
                start_attr.longitude,
                end_attr.latitude,
                end_attr.longitude
            )

            if route_result:
                total_distance += route_result.total_cost
                total_time += route_result.total_time_minutes

    return (total_distance, total_time)


def _two_opt_optimize(
    conn: Connection,
    route: List[str],
    max_iterations: int = 100
) -> List[str]:
    """
    2-opt 優化演算法
    嘗試交換路徑中的兩段,看是否能縮短總距離
    """
    improved = True
    iteration = 0
    best_route = route[:]
    best_distance, _ = _calculate_total_distance(conn, best_route)

    while improved and iteration < max_iterations:
        improved = False
        iteration += 1

        for i in range(1, len(route) - 2):
            for j in range(i + 1, len(route)):
                # 嘗試反轉 i 到 j 之間的路徑
                new_route = route[:i] + route[i:j][::-1] + route[j:]
                new_distance, _ = _calculate_total_distance(conn, new_route)

                if new_distance < best_distance:
                    best_route = new_route
                    best_distance = new_distance
                    improved = True
                    print(f"[TSP] 2-opt iteration {iteration}: improved to {new_distance:.2f}m")
                    break

            if improved:
                route = best_route
                break

    return best_route
