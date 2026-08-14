"use client";

type RouteInfoProps = {
  selectedCount: number;
  distance: number | null;
  loading?: boolean;
  error?: string | null;
};

export function RouteInfo({ selectedCount, distance, loading, error }: RouteInfoProps) {
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (loading) {
    return <p>計算路徑中...</p>;
  }

  if (selectedCount === 0) {
    return <p>請點選地圖上的景點作為起點</p>;
  }

  if (selectedCount === 1) {
    return <p>已選起點，請點選另一個景點作為終點</p>;
  }

  if (distance !== null) {
    return <p>路徑距離：約 {distance} 公尺</p>;
  }

  return null;
}
