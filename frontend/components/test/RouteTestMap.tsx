'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface Attraction {
  id: string;
  name: string;
  status: string;
  latitude: number;
  longitude: number;
  translations: {
    [key: string]: {
      language_code: string;
      title: string;
      description: string;
    };
  };
}

interface RouteInfo {
  attractions: Attraction[];
  total_distance_m: number;
  total_time_minutes: number;
  route_geojson: any;
}

interface RouteTestMapProps {
  attractions: Attraction[];
  routeAInfo: RouteInfo | null;
  routeBInfo: RouteInfo | null;
  selectedLanguage: string;
}

export default function RouteTestMap({
  attractions,
  routeAInfo,
  routeBInfo,
  selectedLanguage,
}: RouteTestMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<maplibregl.Marker[]>([]);
  const popups = useRef<maplibregl.Popup[]>([]);

  // 初始化地图
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // 使用OpenStreetMap样式
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: [120.3115, 22.7715], // 佛陀纪念馆附近
      zoom: 15,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // 更新景点标记
  useEffect(() => {
    if (!map.current) return;

    // 清除旧标记和弹窗
    markers.current.forEach(marker => marker.remove());
    popups.current.forEach(popup => popup.remove());
    markers.current = [];
    popups.current = [];

    // 添加景点标记
    attractions.forEach((attraction) => {
      const translation = attraction.translations[selectedLanguage];
      const title = translation?.title || attraction.name;
      const description = translation?.description || '';

      // 创建弹窗内容
      const popupContent = `
        <div style="padding: 8px;">
          <h3 style="font-weight: bold; margin-bottom: 4px;">${title}</h3>
          <p style="font-size: 12px; color: #666;">${description}</p>
        </div>
      `;

      const popup = new maplibregl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(popupContent);

      const marker = new maplibregl.Marker({ color: '#3b82f6' })
        .setLngLat([attraction.longitude, attraction.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      // 鼠标悬停显示弹窗
      const element = marker.getElement();
      element.addEventListener('mouseenter', () => {
        popup.addTo(map.current!);
      });
      element.addEventListener('mouseleave', () => {
        popup.remove();
      });

      markers.current.push(marker);
      popups.current.push(popup);
    });

    // 如果有景点，调整视图以显示所有景点
    if (attractions.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      attractions.forEach(attraction => {
        bounds.extend([attraction.longitude, attraction.latitude]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [attractions, selectedLanguage]);

  // 更新路线A
  useEffect(() => {
    if (!map.current) return;

    const sourceId = 'route-a';
    const layerId = 'route-a-layer';

    // 移除旧图层
    if (map.current.getLayer(layerId)) {
      map.current.removeLayer(layerId);
    }
    if (map.current.getSource(sourceId)) {
      map.current.removeSource(sourceId);
    }

    // 添加新路线
    if (routeAInfo && routeAInfo.route_geojson.features.length > 0) {
      map.current.addSource(sourceId, {
        type: 'geojson',
        data: routeAInfo.route_geojson,
      });

      map.current.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ef4444',
          'line-width': 4,
          'line-opacity': 0.8,
        },
      });
    }
  }, [routeAInfo]);

  // 更新路线B
  useEffect(() => {
    if (!map.current) return;

    const sourceId = 'route-b';
    const layerId = 'route-b-layer';

    // 移除旧图层
    if (map.current.getLayer(layerId)) {
      map.current.removeLayer(layerId);
    }
    if (map.current.getSource(sourceId)) {
      map.current.removeSource(sourceId);
    }

    // 添加新路线
    if (routeBInfo && routeBInfo.route_geojson.features.length > 0) {
      map.current.addSource(sourceId, {
        type: 'geojson',
        data: routeBInfo.route_geojson,
      });

      map.current.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 4,
          'line-opacity': 0.8,
        },
      });
    }
  }, [routeBInfo]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
