'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// 动态导入地图组件，禁用SSR
const RouteTestMap = dynamic(
  () => import('@/components/test/RouteTestMap'),
  { ssr: false }
);

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

export default function TestRoutesPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [routeA, setRouteA] = useState<string[]>([]);
  const [routeB, setRouteB] = useState<string[]>([]);
  const [routeAInfo, setRouteAInfo] = useState<RouteInfo | null>(null);
  const [routeBInfo, setRouteBInfo] = useState<RouteInfo | null>(null);
  const [showAllAttractions, setShowAllAttractions] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('zh_TW');

  // 获取所有景点
  useEffect(() => {
    fetchAttractions();
  }, []);

  const fetchAttractions = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/attractions');
      const data = await response.json();
      setAttractions(data);
      setLoading(false);
    } catch (error) {
      console.error('获取景点失败:', error);
      setLoading(false);
    }
  };

  // 计算路线
  const calculateRoute = async (attractionIds: string[], setRouteInfo: (info: RouteInfo | null) => void) => {
    if (attractionIds.length < 2) {
      setRouteInfo(null);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/itinerary/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attraction_ids: attractionIds,
        }),
      });
      const data = await response.json();
      setRouteInfo(data);
    } catch (error) {
      console.error('计算路线失败:', error);
      setRouteInfo(null);
    }
  };

  // 当路线A改变时重新计算
  useEffect(() => {
    calculateRoute(routeA, setRouteAInfo);
  }, [routeA]);

  // 当路线B改变时重新计算
  useEffect(() => {
    calculateRoute(routeB, setRouteBInfo);
  }, [routeB]);

  // 添加景点到路线
  const addToRoute = (attractionId: string, route: 'A' | 'B') => {
    if (route === 'A') {
      if (!routeA.includes(attractionId)) {
        setRouteA([...routeA, attractionId]);
      }
    } else {
      if (!routeB.includes(attractionId)) {
        setRouteB([...routeB, attractionId]);
      }
    }
  };

  // 从路线移除景点
  const removeFromRoute = (index: number, route: 'A' | 'B') => {
    if (route === 'A') {
      const newRoute = [...routeA];
      newRoute.splice(index, 1);
      setRouteA(newRoute);
    } else {
      const newRoute = [...routeB];
      newRoute.splice(index, 1);
      setRouteB(newRoute);
    }
  };

  // 移动景点顺序
  const moveAttraction = (index: number, direction: 'up' | 'down', route: 'A' | 'B') => {
    const currentRoute = route === 'A' ? [...routeA] : [...routeB];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= currentRoute.length) return;

    [currentRoute[index], currentRoute[newIndex]] = [currentRoute[newIndex], currentRoute[index]];

    if (route === 'A') {
      setRouteA(currentRoute);
    } else {
      setRouteB(currentRoute);
    }
  };

  const getAttractionById = (id: string) => {
    return attractions.find(a => a.id === id);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours > 0) {
      return `${hours}小时${mins}分钟`;
    }
    return `${mins}分钟`;
  };

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(2)} km`;
    }
    return `${Math.round(meters)} m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* 地图区域 */}
      <div className="flex-1 relative">
        <RouteTestMap
          attractions={showAllAttractions ? attractions : []}
          routeAInfo={routeAInfo}
          routeBInfo={routeBInfo}
          selectedLanguage={selectedLanguage}
        />
      </div>

      {/* 控制面板 */}
      <div className="h-80 bg-gray-100 border-t border-gray-300 overflow-y-auto">
        <div className="p-4">
          {/* 顶部按钮 */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setShowAllAttractions(!showAllAttractions)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {showAllAttractions ? '隐藏所有景点' : '显示所有景点'}
            </button>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="zh_TW">繁体中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          {/* 路线面板 */}
          <div className="grid grid-cols-2 gap-4">
            {/* 路线 A */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-2 text-red-600">路线 A</h3>
              {routeAInfo && (
                <div className="mb-2 text-sm text-gray-600">
                  <div>总距离: {formatDistance(routeAInfo.total_distance_m)}</div>
                  <div>预计时间: {formatTime(routeAInfo.total_time_minutes)}</div>
                </div>
              )}
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {routeA.map((id, index) => {
                  const attraction = getAttractionById(id);
                  if (!attraction) return null;
                  return (
                    <div key={id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="font-bold">{index + 1}.</span>
                      <span className="flex-1">{attraction.name}</span>
                      <button
                        onClick={() => moveAttraction(index, 'up', 'A')}
                        disabled={index === 0}
                        className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveAttraction(index, 'down', 'A')}
                        disabled={index === routeA.length - 1}
                        className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removeFromRoute(index, 'A')}
                        className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 路线 B */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-2 text-blue-600">路线 B</h3>
              {routeBInfo && (
                <div className="mb-2 text-sm text-gray-600">
                  <div>总距离: {formatDistance(routeBInfo.total_distance_m)}</div>
                  <div>预计时间: {formatTime(routeBInfo.total_time_minutes)}</div>
                </div>
              )}
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {routeB.map((id, index) => {
                  const attraction = getAttractionById(id);
                  if (!attraction) return null;
                  return (
                    <div key={id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="font-bold">{index + 1}.</span>
                      <span className="flex-1">{attraction.name}</span>
                      <button
                        onClick={() => moveAttraction(index, 'up', 'B')}
                        disabled={index === 0}
                        className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveAttraction(index, 'down', 'B')}
                        disabled={index === routeB.length - 1}
                        className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removeFromRoute(index, 'B')}
                        className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 景点列表 */}
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">所有景点</h3>
            <div className="grid grid-cols-3 gap-2">
              {attractions.map((attraction) => {
                const translation = attraction.translations[selectedLanguage];
                const title = translation?.title || attraction.name;

                return (
                  <div key={attraction.id} className="p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-sm mb-1">{title}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToRoute(attraction.id, 'A')}
                        className="flex-1 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                        disabled={routeA.includes(attraction.id)}
                      >
                        → A
                      </button>
                      <button
                        onClick={() => addToRoute(attraction.id, 'B')}
                        className="flex-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={routeB.includes(attraction.id)}
                      >
                        → B
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
