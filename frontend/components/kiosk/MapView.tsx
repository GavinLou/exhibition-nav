'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { ItineraryItem } from '@/types/kiosk';

interface MapViewProps {
  items: ItineraryItem[];
  showRoute?: boolean;
}

export default function MapView({ items, showRoute = false }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const isInitializing = useRef(false);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current || isInitializing.current) {
      console.log('Map already exists or initializing, skipping');
      return;
    }

    console.log('Initializing map...');
    isInitializing.current = true;

    // 初始化地圖（佛光山座標）
    const newMap = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
          },
        ],
      },
      center: [120.4407, 22.7543], // 佛光山中心座標
      zoom: 15,
      attributionControl: false,
    });

    // 等待樣式載入完成
    newMap.on('load', () => {
      console.log('Map load event fired!');
      // 使用 setTimeout 確保在下一個事件循環中設置
      setTimeout(() => {
        console.log('Map fully loaded, setting state');
        map.current = newMap;
        // 添加導航控制
        if (map.current) {
          map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
        }
        setMapLoaded(true);
      }, 0);
    });

    return () => {
      console.log('Cleaning up map...');
      isInitializing.current = false;

      // 清理標記
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      setMapLoaded(false);
    };
  }, []);

  useEffect(() => {
    console.log('MapView useEffect - items:', items);
    console.log('MapView useEffect - mapLoaded:', mapLoaded);
    console.log('MapView useEffect - map.current:', map.current);

    if (!mapLoaded || !map.current || items.length === 0) {
      console.log('MapView: Waiting...', { mapLoaded, hasMap: !!map.current, itemsCount: items.length });
      return;
    }

    console.log('MapView: Ready to update map with items');

    // 確保地圖已載入
    const updateMap = () => {
      console.log('MapView updateMap called');
      if (!map.current || !map.current.isStyleLoaded()) {
        console.log('MapView: Map not ready');
        return;
      }

      console.log('MapView: Updating markers and routes');

      // 清除現有標記
      console.log('Clearing', markersRef.current.length, 'old markers');
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // 添加景點標記
      items.forEach((item, index) => {
        if (item.location) {
          // 創建自定義標記
          const el = document.createElement('div');
          el.className = 'w-8 h-8 rounded-full bg-[#2E7D32] border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-lg';
          el.textContent = String(index + 1);

          const marker = new maplibregl.Marker({ element: el })
            .setLngLat([item.location.lng, item.location.lat])
            .setPopup(
              new maplibregl.Popup({ offset: 25 }).setHTML(
                `<div class="p-2">
                  <h3 class="font-bold text-sm">${item.title}</h3>
                  <p class="text-xs text-gray-600">${item.description}</p>
                </div>`
              )
            )
            .addTo(map.current!);

          markersRef.current.push(marker);
        }
      });
      console.log('Added', markersRef.current.length, 'new markers');

      // 清除舊的路線（如果存在）
      if (map.current.getLayer('route')) {
        console.log('Removing old route layer');
        map.current.removeLayer('route');
      }
      if (map.current.getSource('route')) {
        console.log('Removing old route source');
        map.current.removeSource('route');
      }

      // 如果需要顯示路線
      if (showRoute && items.length > 1) {
        console.log('Adding new route');
        const coordinates = items
          .filter((item) => item.location)
          .map((item) => [item.location!.lng, item.location!.lat]);

        console.log('Route coordinates:', coordinates);

        // 添加新的路線 source
        map.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates,
            },
          },
        });

        // 添加新的路線 layer
        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#2E7D32',
            'line-width': 4,
            'line-opacity': 0.8,
          },
        });

        console.log('Route added successfully');

        // 調整地圖視角以顯示所有標記
        const bounds = new maplibregl.LngLatBounds();
        coordinates.forEach((coord) => bounds.extend(coord as [number, number]));
        map.current.fitBounds(bounds, { padding: 50 });
      }
    };

    // 直接更新（因為我們已經確保 mapLoaded 為 true）
    updateMap();
  }, [items, showRoute, mapLoaded]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full rounded-[25px] overflow-hidden"
      style={{ minHeight: '737px' }}
    />
  );
}
