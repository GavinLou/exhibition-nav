'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { QRCodeSVG } from 'qrcode.react';
import type { ItineraryItem } from '@/types/kiosk';

// 動態載入地圖元件
const MapView = dynamic(() => import('./MapView'), { ssr: false });

interface Step4ConfirmProps {
  items: ItineraryItem[];
  showQRCode?: boolean;
  onCloseQRCode?: () => void;
}

export default function Step4Confirm({ items, showQRCode = false, onCloseQRCode }: Step4ConfirmProps) {
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    participants: 1,
  });

  // 監聽外部的 showQRCode prop
  useEffect(() => {
    setShowQRDialog(showQRCode);
  }, [showQRCode]);

  const totalTime = items.reduce((sum, item) => sum + item.suggestedStayMinutes, 0);
  const totalDistance = 2.5; // km
  const rating = 4.8;

  const handleCloseDialog = () => {
    setShowQRDialog(false);
    onCloseQRCode?.();
  };

  return (
    <div className="glass w-full h-full rounded-[32px] relative overflow-hidden bg-white/60 backdrop-blur-xl">
      {/* 背景 */}
      <div className="absolute inset-0 bg-white/10 rounded-[32px]" />

      {/* MapLibre GL JS 地圖 */}
      <div className="absolute left-[30px] top-[18px] w-[1140px] h-[737px] rounded-[25px] overflow-hidden">
        <MapView items={items} showRoute={true} key="step4-map" />
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

      {/* QR Code Dialog */}
      {showQRDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass w-[700px] rounded-[32px] p-12 bg-white/80 backdrop-blur-xl">
            <h2 className="text-[#2E7D32] text-3xl font-bold mb-8 text-center">
              掃描 QR Code 取得您的行程
            </h2>

            <div className="bg-white rounded-[24px] p-10 flex flex-col items-center shadow-2xl">
              <QRCodeSVG
                value={JSON.stringify({
                  itineraryId: `IT-${Date.now()}`,
                  items: items.map(item => ({
                    title: item.title,
                    duration: item.suggestedStayMinutes,
                    location: item.location
                  })),
                  totalTime,
                  totalDistance,
                  ...formData
                })}
                size={320}
                level="H"
                includeMargin={true}
              />
              <p className="mt-6 text-gray-700 text-lg font-medium">請使用手機掃描此 QR Code</p>
              <p className="mt-2 text-gray-500 text-sm">行程將傳送至您的手機</p>
            </div>

            <div className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="姓名（選填）"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-6 py-4 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#2E7D32] transition-all"
              />
              <input
                type="tel"
                placeholder="電話（選填）"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-6 py-4 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#2E7D32] transition-all"
              />
              <input
                type="number"
                placeholder="參觀人數"
                min="1"
                value={formData.participants}
                onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 1 })}
                className="w-full px-6 py-4 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#2E7D32] transition-all"
              />
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleCloseDialog}
                className="flex-1 h-14 bg-gray-400 hover:bg-gray-500 rounded-2xl text-white font-bold text-lg transition-all"
              >
                關閉
              </button>
              <button
                onClick={() => {
                  // 可以在這裡添加儲存到資料庫的邏輯
                  alert('行程已儲存！');
                  handleCloseDialog();
                }}
                className="flex-1 h-14 bg-[#2E7D32] hover:bg-[#1B5E20] rounded-2xl text-white font-bold text-lg transition-all"
              >
                確認並儲存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
