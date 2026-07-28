// src/components/Map/MapView.tsx
// ---------------------------------------------------------
// 這支元件是目前MVP的地圖核心，負責：
//   1. 初始化MapLibre地圖
//   2. 呼叫後端 /api/poi，把景點畫成地圖上的marker
//   3. 讓使用者依序點兩個marker，呼叫 /api/route，把回傳的
//      GeoJSON路徑畫成地圖上的一條線
//
// "use client" 這一行是Next.js App Router的規定：
// 凡是會用到瀏覽器功能(這裡是操作地圖DOM、滑鼠事件)的元件，
// 都必須宣告成「客戶端元件」，不然Next.js預設會嘗試在伺服器端
// 執行這支程式，但伺服器端沒有瀏覽器環境，會直接報錯。
// ---------------------------------------------------------
"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// 這裡定義從後端 /api/poi 拿到的資料長什麼樣子，
// TypeScript會幫你檢查程式碼裡有沒有拼錯欄位名稱。
type Poi = {
  id: number;
  name: string;
  category: string;
  lon: number;
  lat: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MapView() {
  // useRef 用來拿到畫面上那個 <div> 的實際DOM節點，
  // MapLibre需要一個真實的DOM元素才能把地圖畫進去。
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // 用ref存地圖實體本身，這樣重新render元件時不會重複建立新地圖。
  const mapRef = useRef<maplibregl.Map | null>(null);

  // 記錄使用者依序點了哪些景點id（最多存2個，用來當路徑的起點/終點）
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 記錄目前路徑的距離資訊，顯示在畫面上給使用者看
  const [distance, setDistance] = useState<number | null>(null);

  // ---------------------------------------------------------
  // 第一個 useEffect：只在元件第一次出現時執行一次(依賴陣列是空的[])，
  // 負責「建立地圖」跟「畫出所有景點marker」。
  // ---------------------------------------------------------
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    // 上面這行防呆：如果DOM還沒準備好，或地圖已經建立過了，就不重複建立。

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      // style用MapLibre官方提供的免費demo底圖，先求「有地圖能看」，
      // 之後正式上線可以換成付費底圖(MapTiler等)或自己用QGIS產的圖層。
      style: "https://demotiles.maplibre.org/style.json",
      center: [120.3115, 22.7715], // [經度, 緯度]，注意順序跟平常講話相反
      zoom: 17,
    });
    mapRef.current = map;

    // 等地圖底圖載入完成後，才去呼叫API拿景點資料、畫marker，
    // 如果太早畫，地圖可能還沒準備好承載圖層。
    map.on("load", () => {
      loadPois(map);
    });

    // React元件被移除時的清理工作，避免記憶體洩漏
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ---------------------------------------------------------
  // 呼叫後端拿景點清單，並且在地圖上畫出來
  // ---------------------------------------------------------
  async function loadPois(map: maplibregl.Map) {
    const res = await fetch(`${API_URL}/api/poi`);
    const pois: Poi[] = await res.json();

    pois.forEach((poi) => {
      const marker = new maplibregl.Marker({ color: "#8B4513" })
        .setLngLat([poi.lon, poi.lat])
        .setPopup(new maplibregl.Popup({ offset: 25 }).setText(poi.name))
        .addTo(map);

      // 點擊marker時，把這個景點id記錄進selectedIds
      marker.getElement().addEventListener("click", () => {
        handleSelectPoi(poi.id);
      });
    });
  }

  // ---------------------------------------------------------
  // 使用者點選景點的邏輯：
  //   點第1個 -> 記成起點
  //   點第2個 -> 記成終點，觸發算路徑
  //   點第3個 -> 重新從這一點開始選(清空重選)
  // ---------------------------------------------------------
  function handleSelectPoi(poiId: number) {
    setSelectedIds((prev) => {
      if (prev.length >= 2) {
        return [poiId];
      }
      return [...prev, poiId];
    });
  }

  // ---------------------------------------------------------
  // 第二個 useEffect：專門「盯著」selectedIds這個狀態，
  // 只要它變成剛好2個元素，就去呼叫路徑API。
  // 這種「資料變了就自動反應」的寫法是React的核心概念。
  // ---------------------------------------------------------
  useEffect(() => {
    if (selectedIds.length === 2 && mapRef.current) {
      fetchAndDrawRoute(mapRef.current, selectedIds[0], selectedIds[1]);
    }
  }, [selectedIds]);

  async function fetchAndDrawRoute(map: maplibregl.Map, fromId: number, toId: number) {
    const res = await fetch(`${API_URL}/api/route?from_id=${fromId}&to_id=${toId}`);

    if (!res.ok) {
      alert("這兩個景點之間找不到路徑");
      return;
    }

    const geojson = await res.json();
    setDistance(geojson.properties.distance_meters);

    // MapLibre畫線的方式：先確認有沒有已存在的"route"資料源，
    // 有的話直接更新資料(setData)，沒有的話才第一次建立source+layer。
    // 這樣使用者重新選兩個點時，是「更新」既有的線，而不是疊加出很多條線。
    const existingSource = map.getSource("route") as maplibregl.GeoJSONSource | undefined;

    if (existingSource) {
      existingSource.setData(geojson);
    } else {
      map.addSource("route", { type: "geojson", data: geojson });
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#B22222",
          "line-width": 4,
        },
      });
    }
  }

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />
      <div style={{ marginTop: "8px" }}>
        {selectedIds.length === 0 && <p>請點選地圖上的景點作為起點</p>}
        {selectedIds.length === 1 && <p>已選起點，請點選另一個景點作為終點</p>}
        {distance !== null && <p>路徑距離：約 {distance} 公尺</p>}
      </div>
    </div>
  );
}
