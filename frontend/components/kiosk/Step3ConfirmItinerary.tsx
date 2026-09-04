'use client';

import { useState, useEffect } from 'react';
import '@/styles/design-tokens.css';
import KioskLayout from './KioskLayout';
import RouteMap from '@/components/maps/RouteMap';
import DraggableItineraryItem from './DraggableItineraryItem';
import BookingDialog from './BookingDialog';

interface ItineraryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  estimatedDuration: number;
  customDuration?: number;
  needsNarrator?: boolean;
  order: number;
  rating: number;
  latitude: number;
  longitude: number;
  translations: {
    zh_TW: {
      title: string;
      description: string;
    };
  };
}

interface Step3ConfirmItineraryProps {
  itinerary: ItineraryItem[];
  themeTitle: string;
  onBack: (updatedItinerary?: ItineraryItem[]) => void;
  onConfirm: (bookingInfo: any) => void;
  onComplete: () => void; // 完成後重置到第一步驟
}

export default function Step3ConfirmItinerary({
  itinerary: initialItinerary,
  themeTitle,
  onBack,
  onConfirm,
  onComplete,
}: Step3ConfirmItineraryProps) {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalWalkTime, setTotalWalkTime] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [segmentWalkTimes, setSegmentWalkTimes] = useState<number[]>([]);

  // 初始化：計算最短路徑排序
  useEffect(() => {
    if (initialItinerary.length === 0) return;

    const optimizeRoute = async () => {
      try {
        const response = await fetch('/api/itinerary/optimize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            attraction_ids: initialItinerary.map((item) => item.id),
          }),
        });

        if (!response.ok) throw new Error('Failed to optimize route');

        const data = await response.json();

        console.log('[Step3] Optimize data:', data);
        console.log('[Step3] Initial itinerary:', initialItinerary);

        // 重新排序行程，保留 customDuration 和 needsNarrator
        const sorted = data.sorted_attraction_ids.map((id: string, index: number) => {
          const item = initialItinerary.find((i) => i.id === id);
          if (!item) return null;

          // 保留 Step2 設置的 customDuration 和 needsNarrator
          // 注意：customDuration 可能是 undefined，這樣才能在後續修改時正確顯示 estimatedDuration
          return {
            ...item,
            order: index + 1,
            customDuration: item.customDuration, // 不要自動填入 estimatedDuration
            needsNarrator: item.needsNarrator || false,
          };
        }).filter(Boolean) as ItineraryItem[];

        console.log('[Step3] Sorted itinerary:', sorted);

        setItinerary(sorted);
        setRouteGeoJSON(data.route_geojson);
        setTotalDistance(data.total_distance_m);
        setTotalWalkTime(data.total_time_minutes);
        setSegmentWalkTimes(data.segment_walk_times || []);
      } catch (error) {
        console.error('Error optimizing route:', error);
        // 如果優化失敗，使用原始順序
        setItinerary(initialItinerary.map((item, index) => ({ ...item, order: index + 1 })));
      } finally {
        setIsOptimizing(false);
      }
    };

    optimizeRoute();
  }, [initialItinerary]);

  // 拖放處理
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const newItinerary = [...itinerary];
    const draggedItem = newItinerary[draggedIndex];

    // 移除拖動的項目
    newItinerary.splice(draggedIndex, 1);
    // 插入到新位置
    newItinerary.splice(index, 0, draggedItem);

    // 更新 order
    newItinerary.forEach((item, i) => {
      item.order = i + 1;
    });

    setItinerary(newItinerary);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    // 重新計算路線
    recalculateRoute();
  };

  // 重新計算路線（順序改變後）
  const recalculateRoute = async () => {
    if (itinerary.length === 0) return;

    try {
      const response = await fetch('/api/itinerary/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attraction_ids: itinerary.map((item) => item.id),
        }),
      });

      if (!response.ok) throw new Error('Failed to calculate route');

      const data = await response.json();
      setRouteGeoJSON(data.route_geojson);
      setTotalDistance(data.total_distance_m);
      setTotalWalkTime(data.total_time_minutes);
      setSegmentWalkTimes(data.segment_walk_times || []);
    } catch (error) {
      console.error('Error recalculating route:', error);
    }
  };

  const handleDurationChange = (id: string, duration: number) => {
    setItinerary(
      itinerary.map((item) =>
        item.id === id ? { ...item, customDuration: duration } : item
      )
    );
  };

  const handleToggleNarrator = (id: string) => {
    setItinerary(
      itinerary.map((item) =>
        item.id === id ? { ...item, needsNarrator: !item.needsNarrator } : item
      )
    );
  };

  const handleRemoveAttraction = (id: string) => {
    const newItinerary = itinerary.filter((item) => item.id !== id);
    // 更新 order
    newItinerary.forEach((item, i) => {
      item.order = i + 1;
    });
    setItinerary(newItinerary);
    // 重新計算路線
    setTimeout(recalculateRoute, 100);
  };

  const totalDuration = itinerary.reduce(
    (sum, item) => sum + (item.customDuration || item.estimatedDuration),
    0
  );

  if (isOptimizing) {
    return (
      <KioskLayout>
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div
              className="text-3xl font-bold mb-4"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-primary-gold)',
              }}
            >
              正在規劃最佳路線...
            </div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto"
              style={{ borderColor: 'var(--color-primary-gold)', borderTopColor: 'transparent' }}
            />
          </div>
        </div>
      </KioskLayout>
    );
  }

  return (
    <KioskLayout>
      {/* 內容區 */}
      <div className="relative z-10 w-5/6 h-2/3 left-1/10 top-1/5  flex gap-6 px-12 pt-48 pb-12 ">
        {/* 左側：全部景點列表 + 搜尋 */}
        <div className="flex-1 flex flex-col">
          {/* 標題 + 搜尋 - 置中 */}
          <div className="mb-8 flex flex-col items-center">
            <h1
              className="text-5xl font-bold mb-6 text-center"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
                background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-primary-gold))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              確認行程路線
            </h1>
          </div>

          {/* 地圖（統計資訊已整合在地圖左下角） */}
          <div className="flex-1 min-h-0">
            {routeGeoJSON && itinerary.length > 0 ? (
              <RouteMap
                routeGeoJSON={routeGeoJSON}
                attractions={itinerary}
                totalDistance={totalDistance}
                totalWalkTime={totalWalkTime}
                totalDuration={totalDuration}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div className="text-center">
                  <div
                    className="text-xl mb-2"
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-secondary)',
                    }}
                  >
                    {!routeGeoJSON ? '路線資料載入中...' : '請選擇景點'}
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-secondary)',
                    }}
                  >
                    (行程數: {itinerary.length}, 路線: {routeGeoJSON ? '✓' : '✗'})
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 右側：行程列表與預約資訊 */}
        <div
          className="w-1/3 flex flex-col px-4"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
            padding: '24px 24px',
          }}
        >
          {/* 行程列表 */}
          <div className="flex-1 overflow-y-auto">
            <h2
              className="text-2xl w-19/20 font-bold mb-2 text-center"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
                background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-primary-gold))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.05em',
                marginBottom: '16px', 
              }}
            >
              我的行程
            </h2>


            <div
              className="space-y-2 mb-4 overflow-y-auto pr-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--color-primary-gold) rgba(255,255,255,0.1)',
              }}
            >
              {itinerary.map((item, index) => (
                <DraggableItineraryItem
                  key={item.id}
                  item={item}
                  index={index}
                  onDurationChange={handleDurationChange}
                  onToggleNarrator={handleToggleNarrator}
                  onRemove={handleRemoveAttraction}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </div>
          </div>

          {/* 底部按鈕 */}
          <div className="flex gap-4 w-19/20"
            style={{
                marginTop: '16px',
              }}>
            <button
              onClick={() => onBack(itinerary)}
              className="flex-1 py-6 rounded-2xl text-xl font-semibold transition-all hover:scale-105"
              style={{
                fontFamily: 'var(--font-secondary)',
                backgroundColor: 'transparent',
                color: 'var(--color-text-secondary)',
                border: '3px solid var(--color-secondary-mist)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              返回
            </button>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="flex-1 py-6 rounded-2xl text-xl font-semibold transition-all hover:scale-105"
              style={{
                fontFamily: 'var(--font-secondary)',
                backgroundColor: itinerary.length > 0 ? 'var(--color-primary-gold)' : 'var(--color-secondary-mist)',
                color: 'white',
                boxShadow: 'var(--shadow-lg)',
                transitionDuration: 'var(--duration-base)',
                opacity: itinerary.length === 0 ? 0.5 : 1,
                cursor: itinerary.length === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              確定
            </button>
          </div>
        </div>
      </div>

      {/* 預約 Dialog */}
      <BookingDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={(bookingInfo) => {
          // 呼叫 onConfirm 儲存資料，但不關閉 dialog
          onConfirm(bookingInfo);
        }}
        onComplete={() => {
          // 完成後關閉 dialog 並重置到第一步驟
          setIsDialogOpen(false);
          onComplete();
        }}
        themeTitle={themeTitle}
        itinerary={itinerary}
        segmentWalkTimes={segmentWalkTimes}
      />
    </KioskLayout>
  );
}
