'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import '@/styles/design-tokens.css';

function ItineraryContent() {
  const searchParams = useSearchParams();
  const qrContent = searchParams.get('qr');
  const [itineraryData, setItineraryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (qrContent) {
      fetchItinerary(qrContent);
    }
  }, [qrContent]);

  const fetchItinerary = async (qr: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/itinerary/qrcode/${encodeURIComponent(qr)}`);

      if (!response.ok) {
        throw new Error('找不到行程資料');
      }

      const data = await response.json();
      setItineraryData(data);
    } catch (err: any) {
      setError(err.message || '載入失敗');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-4"
            style={{
              borderColor: 'var(--color-primary-gold)',
              borderTopColor: 'transparent',
            }}
          />
          <p style={{ color: 'var(--color-text-primary)' }}>載入中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div
          className="text-center p-8 rounded-2xl"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <p
            className="text-xl mb-4"
            style={{
              color: 'var(--color-error)',
              fontFamily: 'var(--font-primary)',
            }}
          >
            {error}
          </p>
          <button
            onClick={() => window.history.back()}
            onTouchEnd={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            className="px-6 py-3 rounded-lg active:scale-95 transition-all"
            style={{
              backgroundColor: 'var(--color-primary-gold)',
              color: 'white',
              fontFamily: 'var(--font-secondary)',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  if (!itineraryData) {
    return null;
  }

  // 解析 QR Code 內容
  const qrParts = qrContent?.split('_') || [];
  const themeTitle = qrParts[0] || '';
  const groupName = qrParts[1] || '';
  const peopleCount = qrParts[2] || '';
  const dateTime = qrParts[3] || '';

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      {/* 標題卡片 */}
      <div
        className="mb-6 p-6 rounded-2xl"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          backdropFilter: 'blur(20px)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <h1
          className="text-3xl font-bold mb-4"
          style={{
            fontFamily: 'var(--font-primary)',
            color: 'var(--color-text-primary)',
            background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-primary-gold))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {themeTitle}
        </h1>
        <div
          className="space-y-2"
          style={{
            fontFamily: 'var(--font-secondary)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <p>👤 團體/姓名: {groupName}</p>
          <p>👥 人數: {peopleCount}</p>
          <p>📅 參觀日期: {itineraryData.visit_date}</p>
          <p>
            ⏰ 開始時間: {dateTime.slice(8, 10)}:{dateTime.slice(10, 12)}
          </p>
          <p>
            📊 狀態:{' '}
            <span
              style={{
                color:
                  itineraryData.status === 'confirming'
                    ? 'var(--color-success)'
                    : itineraryData.status === 'in_progress'
                    ? 'var(--color-primary-gold)'
                    : itineraryData.status === 'cancel'
                    ? 'var(--color-error)'
                    : 'var(--color-text-secondary)',
              }}
            >
              {itineraryData.status === 'confirming' && '確認中'}
              {itineraryData.status === 'apply' && '申請中'}
              {itineraryData.status === 'in_progress' && '進行中'}
              {itineraryData.status === 'cancel' && '已取消'}
            </span>
          </p>
        </div>
      </div>

      {/* 行程列表 */}
      <div className="space-y-4">
        <h2
          className="text-2xl font-bold mb-4"
          style={{
            fontFamily: 'var(--font-primary)',
            color: 'var(--color-text-primary)',
          }}
        >
          行程景點 ({itineraryData.items?.length || 0})
        </h2>

        {itineraryData.items?.map((item: any, index: number) => (
          <div
            key={item.id}
            className="p-4 rounded-xl flex items-center gap-4"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl"
              style={{
                backgroundColor: 'var(--color-primary-gold)',
                color: 'white',
                fontFamily: 'var(--font-primary)',
              }}
            >
              {index + 1}
            </div>
            <div className="flex-1">
              <h3
                className="font-semibold text-lg mb-1"
                style={{
                  fontFamily: 'var(--font-secondary)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {item.attraction_name || `景點 ${index + 1}`}
              </h3>
              <div
                className="text-sm space-y-1"
                style={{
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-secondary)',
                }}
              >
                {item.start_time && item.end_time && (
                  <p>
                    ⏰ {item.start_time} - {item.end_time}
                  </p>
                )}
                {item.is_guide && (
                  <p style={{ color: 'var(--color-primary-gold)' }}>
                    👨‍🏫 需要導覽員
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 返回按鈕 */}
      <div className="mt-8">
        <button
          onClick={() => {
            console.log('[Itinerary] Back button clicked');
            window.history.back();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            console.log('[Itinerary] Touch end on back button');
            window.history.back();
          }}
          className="w-full py-4 rounded-xl text-lg font-semibold active:scale-95 transition-all"
          style={{
            fontFamily: 'var(--font-secondary)',
            backgroundColor: 'var(--color-primary-gold)',
            color: 'white',
            boxShadow: 'var(--shadow-md)',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          返回掃描頁面
        </button>
      </div>
    </div>
  );
}

export default function ItineraryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div
              className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-4"
              style={{
                borderColor: 'var(--color-primary-gold)',
                borderTopColor: 'transparent',
              }}
            />
            <p style={{ color: 'var(--color-text-primary)' }}>載入中...</p>
          </div>
        </div>
      }
    >
      <ItineraryContent />
    </Suspense>
  );
}
