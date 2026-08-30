'use client';

import { useState } from 'react';
import '@/styles/design-tokens.css';

interface ItineraryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  estimatedDuration: number;
  order: number;
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
  const [itinerary, setItinerary] = useState(initialItinerary);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    groupName: '',
    numberOfPeople: 1,
    needsNarrator: false,
    hasDisabilities: false,
    startTime: '',
  });

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItinerary = [...itinerary];
    [newItinerary[index - 1], newItinerary[index]] = [newItinerary[index], newItinerary[index - 1]];
    // 更新 order
    newItinerary.forEach((item, i) => {
      item.order = i + 1;
    });
    setItinerary(newItinerary);
  };

  const handleMoveDown = (index: number) => {
    if (index === itinerary.length - 1) return;
    const newItinerary = [...itinerary];
    [newItinerary[index], newItinerary[index + 1]] = [newItinerary[index + 1], newItinerary[index]];
    // 更新 order
    newItinerary.forEach((item, i) => {
      item.order = i + 1;
    });
    setItinerary(newItinerary);
  };

  const handleConfirm = () => {
    if (bookingInfo.groupName && bookingInfo.numberOfPeople > 0) {
      onConfirm(bookingInfo);
    }
  };

  const totalDuration = itinerary.reduce((sum, item) => sum + item.estimatedDuration, 0);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/kiosk/pic_A12-00224_10.jpg)',
          filter: 'grayscale(20%) blur(0.5px)',
          opacity: 0.35,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          opacity: 0.7,
        }}
      />

      {/* 內容區 */}
      <div className="relative z-10 w-full h-full flex gap-6 p-12">
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
              確認行程
            </h1>
            <p
              className="text-lg"
              style={{
                fontFamily: 'var(--font-secondary)',
                color: 'var(--color-text-secondary)',
              }}
            >
              查看您的行程路線並填寫預約資訊
            </p>
          </div>

          {/* 地圖區域 */}
          <div
            className="flex-1 rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              backdropFilter: 'blur(20px)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {/* 這裡可以放入實際的地圖組件 */}
            <div className="relative w-full h-full">
              <img
                src="/images/kiosk/map.png"
                alt="地圖"
                className="w-full h-full object-contain"
              />
              {/* 路線標記可以疊加在這裡 */}
            </div>
          </div>
        </div>

        {/* 右側：行程詳情與預約資訊 */}
        <div
          className="w-[480px] flex flex-col"
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
              行程景點 ({itinerary.length})
            </h2>

            <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
              {itinerary.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm"
                    style={{
                      backgroundColor: 'var(--color-primary-gold)',
                      color: 'white',
                    }}
                  >
                    {item.order}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className="font-semibold text-sm truncate"
                      style={{
                        fontFamily: 'var(--font-secondary)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {item.estimatedDuration} 分鐘
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
                      style={{
                        opacity: index === 0 ? 0.3 : 1,
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === itinerary.length - 1}
                      className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
                      style={{
                        opacity: index === itinerary.length - 1 ? 0.3 : 1,
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="p-3 rounded-lg text-center"
              style={{
                backgroundColor: 'rgba(201, 168, 118, 0.1)',
                color: 'var(--color-primary-gold)',
              }}
            >
              預估總時間：{totalDuration} 分鐘
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
              {/* 姓名 */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  團體/姓名 *
                </label>
                <input
                  type="text"
                  value={bookingInfo.groupName}
                  onChange={(e) =>
                    setBookingInfo({ ...bookingInfo, groupName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '2px solid var(--color-secondary-mist)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-secondary)',
                  }}
                  placeholder="請輸入團體名稱或姓名"
                />
              </div>

              {/* 人數 */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  人數 *
                </label>
                <input
                  type="number"
                  min="1"
                  value={bookingInfo.numberOfPeople}
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      numberOfPeople: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '2px solid var(--color-secondary-mist)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-secondary)',
                  }}
                />
              </div>

              {/* 開始時間 */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
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
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '2px solid var(--color-secondary-mist)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-secondary)',
                  }}
                />
              </div>

              {/* 是否需要導覽員 */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookingInfo.needsNarrator}
                    onChange={(e) =>
                      setBookingInfo({ ...bookingInfo, needsNarrator: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'var(--font-secondary)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    需要導覽員服務
                  </span>
                </label>
              </div>

              {/* 是否有身障需求 */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookingInfo.hasDisabilities}
                    onChange={(e) =>
                      setBookingInfo({ ...bookingInfo, hasDisabilities: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'var(--font-secondary)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    有無障礙需求
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* 底部按鈕 */}
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-4 rounded-xl text-lg font-semibold transition-all"
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
                transitionDuration: 'var(--duration-base)',
                opacity: bookingInfo.groupName && bookingInfo.numberOfPeople >= 1 ? 1 : 0.5,
              }}
            >
              確定預約
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
