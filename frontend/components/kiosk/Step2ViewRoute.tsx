'use client';

import dynamic from 'next/dynamic';
import type { ItineraryItem } from '@/types/kiosk';

// 動態載入地圖元件（避免 SSR 問題）
const MapView = dynamic(() => import('./MapView'), { ssr: false });

interface Step2ViewRouteProps {
  items: ItineraryItem[];
  onNext: () => void;
}

export default function Step2ViewRoute({ items, onNext }: Step2ViewRouteProps) {
  // 調試：檢查接收到的資料
  console.log('Step2ViewRoute received items:', items);
  console.log('Items count:', items.length);

  // 計算總時間和距離
  const totalTime = items.reduce((sum, item) => sum + item.suggestedStayMinutes, 0);
  const totalDistance = 2.5; // km (暫時寫死)
  const rating = 4.8;

  return (
    <div className="glass w-full h-full rounded-[32px] relative overflow-hidden bg-white/60 backdrop-blur-xl">
      {/* 背景 */}
      <div className="absolute inset-0 bg-white/10 rounded-[32px]" />

      {/* 如果沒有資料，顯示提示 */}
      {items.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl text-center">
            <p>請先選擇一個主題行程</p>
            <p className="text-lg mt-4 opacity-75">返回上一步選擇主題</p>
          </div>
        </div>
      ) : (
        <>
          {/* MapLibre GL JS 地圖 */}
          <div className="absolute left-[30px] top-[18px] w-[1140px] h-[737px] rounded-[25px] overflow-hidden">
            <MapView items={items} showRoute={true} key="step2-map" />
          </div>

          {/* 統計面板 */}
          <div className="absolute left-[50px] bottom-[16px] w-[513px] h-[131px] bg-[#727272] rounded-[20px] flex items-center justify-around px-8">
            <div className="text-center">
              <div className="text-[#212121] font-bold text-sm mb-1">總時間</div>
              <div className="text-white text-2xl font-bold">{Math.floor(totalTime / 60)}h {totalTime % 60}m</div>
            </div>
            <div className="text-center">
              <div className="text-[#212121] font-bold text-sm mb-1">步行距離</div>
              <div className="text-white text-2xl font-bold">{totalDistance} km</div>
            </div>
            <div className="text-center">
              <div className="text-[#212121] font-bold text-sm mb-1">歷史評分</div>
              <div className="text-white text-2xl font-bold">{rating} ⭐</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
