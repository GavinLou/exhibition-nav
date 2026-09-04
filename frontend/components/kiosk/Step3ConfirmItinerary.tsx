'use client';

import { useState, useEffect } from 'react';
import '@/styles/design-tokens.css';
import KioskLayout from './KioskLayout';
import RouteMap from '@/components/maps/RouteMap';
import DraggableItineraryItem from './DraggableItineraryItem';
import TextInput from '@/components/ui/TextInput';

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

interface BookingInfo {
  groupName: string;
  numberOfPeople: number;
  needsNarrator: boolean;
  hasDisabilities: boolean;
  startTime: string;
}

interface Step3ConfirmItineraryProps {
  itinerary: ItineraryItem[];
  onBack: () => void;
  onConfirm: (bookingInfo: BookingInfo) => void;
}

export default function Step3ConfirmItinerary({
  itinerary: initialItinerary,
  onBack,
  onConfirm,
}: Step3ConfirmItineraryProps) {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalWalkTime, setTotalWalkTime] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    groupName: '',
    numberOfPeople: 1,
    needsNarrator: false,
    hasDisabilities: false,
    startTime: '',
  });

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

  const handleConfirm = () => {
    if (bookingInfo.groupName && bookingInfo.numberOfPeople > 0) {
      onConfirm(bookingInfo);
    }
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
      <div className="relative z-10 w-full h-4/5 top-1/6 flex gap-6 p-12">
        {/* 左側：地圖 */}
        <div className="flex-1 flex flex-col">
          {/* 標題 */}
          <div className="mb-6">
            <h1
              className="text-4xl font-bold mb-2"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              確認行程路線
            </h1>
            <p
              className="text-lg"
              style={{
                fontFamily: 'var(--font-secondary)',
                color: 'var(--color-text-secondary)',
              }}
            >
              路線已自動優化為最短路徑，您可以拖動調整順序
            </p>
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
          className="w-[500px] flex flex-col"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
            padding: 'var(--spacing-8)',
          }}
        >
          {/* 行程列表 */}
          <div className="mb-6">
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              我的行程 ({itinerary.length} 個景點)
            </h2>

            <div
              className="space-y-2 mb-4 overflow-y-auto pr-2"
              style={{
                maxHeight: '400px',
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

            <div
              className="p-3 rounded-lg text-center"
              style={{
                backgroundColor: 'rgba(201, 168, 118, 0.15)',
                color: 'var(--color-primary-gold)',
                fontFamily: 'var(--font-secondary)',
                fontWeight: 'bold',
              }}
            >
              預估總時間：{totalDuration + Math.round(totalWalkTime)} 分鐘
              <span style={{ fontSize: '0.9em', opacity: 0.8 }}>
                {' '}（參觀 {totalDuration} + 步行 {Math.round(totalWalkTime)}）
              </span>
            </div>
          </div>

          {/* 預約資訊表單 */}
          <div className="flex-1 overflow-y-auto mb-6">
            <h3
              className="text-xl font-bold mb-4"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              預約資訊
            </h3>

            <div className="space-y-4">
              {/* 團體/姓名 */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-secondary)',
                  }}
                >
                  團體/姓名 *
                </label>
                <TextInput
                  value={bookingInfo.groupName}
                  onChange={(val) => setBookingInfo({ ...bookingInfo, groupName: val })}
                  placeholder="請輸入團體名稱或姓名"
                  size="medium"
                />
              </div>

              {/* 人數 */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-secondary)',
                  }}
                >
                  人數 *
                </label>
                <TextInput
                  type="number"
                  value={bookingInfo.numberOfPeople.toString()}
                  onChange={(val) =>
                    setBookingInfo({
                      ...bookingInfo,
                      numberOfPeople: parseInt(val) || 1,
                    })
                  }
                  size="medium"
                />
              </div>

              {/* 開始時間 */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-secondary)',
                  }}
                >
                  預計開始時間
                </label>
                <input
                  type="time"
                  value={bookingInfo.startTime}
                  onChange={(e) =>
                    setBookingInfo({ ...bookingInfo, startTime: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    border: '2px solid var(--color-primary-gold)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-secondary)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* 底部按鈕 */}
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105"
              style={{
                fontFamily: 'var(--font-secondary)',
                backgroundColor: 'transparent',
                color: 'var(--color-text-secondary)',
                border: '2px solid var(--color-secondary-mist)',
              }}
            >
              返回
            </button>
            <button
              onClick={handleConfirm}
              disabled={!bookingInfo.groupName || bookingInfo.numberOfPeople < 1}
              className="flex-1 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105"
              style={{
                fontFamily: 'var(--font-secondary)',
                backgroundColor:
                  bookingInfo.groupName && bookingInfo.numberOfPeople >= 1
                    ? 'var(--color-primary-gold)'
                    : 'var(--color-secondary-mist)',
                color: 'white',
                boxShadow: 'var(--shadow-md)',
                opacity: bookingInfo.groupName && bookingInfo.numberOfPeople >= 1 ? 1 : 0.5,
                cursor:
                  bookingInfo.groupName && bookingInfo.numberOfPeople >= 1
                    ? 'pointer'
                    : 'not-allowed',
              }}
            >
              確定預約
            </button>
          </div>
        </div>
      </div>
    </KioskLayout>
  );
}
