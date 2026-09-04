'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@/styles/design-tokens.css';

interface RouteMapProps {
  routeGeoJSON: any;
  attractions: Array<{
    id: string;
    name?: string;
    title?: string;
    latitude: number;
    longitude: number;
    order: number;
    translations?: {
      zh_TW?: {
        title: string;
      };
    };
  }>;
  totalDistance?: number;
  totalWalkTime?: number;
  totalDuration?: number;
}

export default function RouteMap({
  routeGeoJSON,
  attractions,
  totalDistance = 0,
  totalWalkTime = 0,
  totalDuration = 0,
}: RouteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

  // 地圖初始化（只執行一次）
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    console.log('[RouteMap] Initializing map...');

    // 創建地圖
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
            maxzoom: 20, // 增加最大 zoom
          },
        },
        layers: [
          {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 20, // 增加最大 zoom
          },
        ],
      },
      center: [121.42015, 24.76587], // 佛光山佛陀紀念館
      zoom: 16,
      minZoom: 14, // 設定最小 zoom,避免縮太小
      maxZoom: 19, // 設定最大 zoom,避免放太大導致圖磚消失
    });

    map.on('load', () => {
      console.log('[RouteMap] Map loaded');
    });

    mapInstance.current = map;

    return () => {
      console.log('[RouteMap] Cleanup map');
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // 更新地圖內容（當數據變化時）
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) {
      console.log('[RouteMap] Map not ready, skipping update');
      return;
    }

    console.log('[RouteMap] Updating map content...', {
      attractionsCount: attractions?.length,
      routeFeaturesCount: routeGeoJSON?.features?.length,
    });

    // 等待地圖載入完成
    if (!map.isStyleLoaded()) {
      map.once('styledata', () => {
        updateMapContent(map);
      });
    } else {
      updateMapContent(map);
    }

    function updateMapContent(map: maplibregl.Map) {
      console.log('[RouteMap] Cleaning up old layers...');

      // 移除所有路線相關的圖層
      const layersToRemove = ['route-line', 'route-line-shadow', 'route-arrows'];
      layersToRemove.forEach(layerId => {
        if (map.getLayer(layerId)) {
          console.log(`[RouteMap] Removing layer: ${layerId}`);
          map.removeLayer(layerId);
        }
      });

      // 移除所有路線相關的資料源
      const sourcesToRemove = ['route', 'route-data'];
      sourcesToRemove.forEach(sourceId => {
        if (map.getSource(sourceId)) {
          console.log(`[RouteMap] Removing source: ${sourceId}`);
          map.removeSource(sourceId);
        }
      });

      // 移除舊的標記
      const oldMarkers = document.querySelectorAll('.maplibregl-marker');
      console.log(`[RouteMap] Removing ${oldMarkers.length} old markers`);
      oldMarkers.forEach((marker) => marker.remove());

      if (attractions.length === 0) {
        console.log('[RouteMap] No attractions, skipping map update');
        return;
      }

      // 添加路線
      if (routeGeoJSON && routeGeoJSON.features && routeGeoJSON.features.length > 0) {
        // 存到全域變數方便除錯
        (window as any).lastRouteGeoJSON = routeGeoJSON;

        console.log('[RouteMap] Route GeoJSON:', JSON.stringify(routeGeoJSON, null, 2));

        // 檢查每個 feature 的座標數量
        routeGeoJSON.features.forEach((feature: any, idx: number) => {
          const coordCount = feature.geometry?.coordinates?.length || 0;
          console.log(`[RouteMap] Feature ${idx}: ${coordCount} coordinates`);
          if (coordCount > 0) {
            console.log(`[RouteMap] Feature ${idx} first coord:`, feature.geometry.coordinates[0]);
            console.log(`[RouteMap] Feature ${idx} last coord:`, feature.geometry.coordinates[coordCount - 1]);
          }
        });

        map.addSource('route', {
          type: 'geojson',
          data: routeGeoJSON,
        });

        map.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#C9A876',
            'line-width': 4,
            'line-opacity': 0.8,
          },
        });

        console.log('[RouteMap] Route layer added');
      }

      // 添加景點標記
      attractions.forEach((attraction, index) => {
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundColor = '#C9A876';
        el.style.border = '3px solid white';
        el.style.borderRadius = '50%';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.fontWeight = 'bold';
        el.style.color = 'white';
        el.style.fontSize = '14px';
        el.style.cursor = 'pointer';
        el.textContent = (index + 1).toString();

        const title =
          attraction.title ||
          attraction.translations?.zh_TW?.title ||
          attraction.name ||
          `景點 ${index + 1}`;

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([attraction.longitude, attraction.latitude])
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(
              `<div style="font-family: 'Noto Serif TC', serif; padding: 8px;">
                <strong style="color: #2C3E50;">${index + 1}. ${title}</strong>
              </div>`
            )
          )
          .addTo(map);

        console.log(`[RouteMap] Marker ${index + 1} added at:`, [
          attraction.longitude,
          attraction.latitude,
        ]);
      });

      // 調整視圖以顯示所有景點
      if (attractions.length > 0) {
        const bounds = new maplibregl.LngLatBounds();
        attractions.forEach((a) => {
          bounds.extend([a.longitude, a.latitude]);
        });
        map.fitBounds(bounds, { padding: 80 });
        console.log('[RouteMap] Bounds adjusted');
      }
    }
  }, [routeGeoJSON, attractions]);

  return (
    <div className="relative w-full h-full">
      {/* 地圖容器 */}
      <div
        ref={mapContainer}
        className="w-full h-full rounded-2xl overflow-hidden"
        style={{
          minHeight: '400px',
          boxShadow: 'var(--shadow-lg)',
        }}
      />

      {/* 統計資訊 - 左下角浮動 */}
      <div
        className="absolute bottom-6 left-6 flex flex-col gap-3 pointer-events-none"
        style={{ zIndex: 1000 }}
      >
        {/* 步行距離 */}
        <div
          className="p-4 rounded-xl pointer-events-auto"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: 'var(--shadow-md)',
            minWidth: '160px',
          }}
        >
          <div
            className="text-sm mb-1"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-secondary)',
            }}
          >
            步行距離
          </div>
          <div
            className="text-2xl font-bold"
            style={{
              color: '#C9A876',
              fontFamily: 'var(--font-primary)',
            }}
          >
            {(totalDistance / 1000).toFixed(2)} 公里
          </div>
        </div>

        {/* 步行時間 */}
        <div
          className="p-4 rounded-xl pointer-events-auto"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: 'var(--shadow-md)',
            minWidth: '160px',
          }}
        >
          <div
            className="text-sm mb-1"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-secondary)',
            }}
          >
            步行時間
          </div>
          <div
            className="text-2xl font-bold"
            style={{
              color: '#C9A876',
              fontFamily: 'var(--font-primary)',
            }}
          >
            {Math.round(totalWalkTime)} 分鐘
          </div>
        </div>

        {/* 參觀時間 */}
        <div
          className="p-4 rounded-xl pointer-events-auto"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: 'var(--shadow-md)',
            minWidth: '160px',
          }}
        >
          <div
            className="text-sm mb-1"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-secondary)',
            }}
          >
            參觀時間
          </div>
          <div
            className="text-2xl font-bold"
            style={{
              color: '#C9A876',
              fontFamily: 'var(--font-primary)',
            }}
          >
            {totalDuration} 分鐘
          </div>
        </div>
      </div>
    </div>
  );
}
