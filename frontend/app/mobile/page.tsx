'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/design-tokens.css';

export default function MobilePage() {
  const router = useRouter();
  const [qrInput, setQrInput] = useState('');
  const [recentQRCodes, setRecentQRCodes] = useState<string[]>([
    '攝手之旅_賴廷宇_1人_202609021000',
    '測試主題_張三_5人_202609021000',
  ]);
  const [loading, setLoading] = useState(false);

  // 載入最近的 QR Codes (從 API)
  useEffect(() => {
    const loadRecentQRCodes = async () => {
      try {
        const baseUrl = window.location.origin;
        const response = await fetch(`${baseUrl}/api/itinerary/recent`);
        if (response.ok) {
          const data = await response.json();
          if (data.qr_codes && data.qr_codes.length > 0) {
            setRecentQRCodes(data.qr_codes);
          }
        }
      } catch (error) {
        console.error('[Mobile] Failed to load recent QR codes:', error);
        // 保留預設值，不更新
      }
    };
    loadRecentQRCodes();
  }, []);

  const handleScan = () => {
    console.log('[Mobile] handleScan called, qrInput:', qrInput);
    if (qrInput.trim()) {
      // 將 QR Code 內容編碼後導航到行程頁面
      console.log('[Mobile] Navigating to itinerary page');
      router.push(`/mobile/itinerary?qr=${encodeURIComponent(qrInput)}`);
    } else {
      console.log('[Mobile] qrInput is empty, not navigating');
    }
  };

  const handleQuickSelect = (qrCode: string) => {
    setQrInput(qrCode);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        backgroundImage: 'url(/images/kiosk/pic_A12-00224_10.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 遮罩層 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(44, 62, 80, 0.85)',
          backdropFilter: 'blur(10px)',
        }}
      />

      {/* 內容 */}
      <div
        className="relative z-10 w-full max-w-md p-8 rounded-2xl"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          backdropFilter: 'blur(20px)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <h1
          className="text-4xl font-bold mb-8 text-center"
          style={{
            fontFamily: 'var(--font-primary)',
            color: 'var(--color-text-primary)',
            background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-primary-gold))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          掃描行程 QR Code
        </h1>

        {/* QR Code 圖示 */}
        <div className="flex justify-center mb-8">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-primary-gold)"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        </div>

        {/* 輸入框（模擬掃描） */}
        <div className="mb-6">
          <label
            className="block text-sm font-semibold mb-2"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-secondary)',
            }}
          >
            QR Code 內容
          </label>
          <input
            type="text"
            value={qrInput}
            onChange={(e) => setQrInput(e.target.value)}
            placeholder="請輸入或掃描 QR Code"
            className="w-full px-4 py-3 rounded-lg text-lg"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '2px solid var(--color-primary-gold)',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-secondary)',
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleScan();
              }
            }}
          />
          <p
            className="mt-2 text-sm"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-secondary)',
            }}
          >
            範例: 佛教藝術巡禮_王小明_15人_202609020930
          </p>
        </div>

        {/* 快速選擇按鈕 */}
        {!loading && recentQRCodes.length > 0 && (
          <div className="mb-6">
            <label
              className="block text-sm font-semibold mb-2"
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-secondary)',
              }}
            >
              或選擇最近的行程
            </label>
            <div className="space-y-2">
              {recentQRCodes.slice(0, 3).map((qrCode, index) => {
                const parts = qrCode.split('_');
                const displayText = parts.length >= 2
                  ? `${parts[0]} - ${parts[1]}`
                  : qrCode;

                return (
                  <button
                    type="button"
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('[Mobile] Quick select clicked:', qrCode);
                      handleQuickSelect(qrCode);
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('[Mobile] Quick select touched:', qrCode);
                      handleQuickSelect(qrCode);
                    }}
                    className="w-full py-3 px-4 rounded-lg text-left active:scale-95 transition-all"
                    style={{
                      fontFamily: 'var(--font-secondary)',
                      backgroundColor: qrInput === qrCode
                        ? 'rgba(201, 168, 118, 0.3)'
                        : 'rgba(255, 255, 255, 0.1)',
                      border: qrInput === qrCode
                        ? '3px solid var(--color-primary-gold)'
                        : '2px solid rgba(255, 255, 255, 0.2)',
                      color: 'var(--color-text-primary)',
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    <div className="font-semibold flex items-center justify-between">
                      <span>{displayText}</span>
                      {qrInput === qrCode && (
                        <span style={{ color: 'var(--color-primary-gold)' }}>✓</span>
                      )}
                    </div>
                    <div className="text-sm opacity-70 mt-1">{qrCode}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 掃描按鈕 */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            console.log('[Mobile] Button clicked!');
            handleScan();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            console.log('[Mobile] Touch start on button');
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            console.log('[Mobile] Touch end on button, qrInput:', qrInput);
            if (qrInput.trim()) {
              handleScan();
            } else {
              alert('請先輸入或選擇 QR Code');
            }
          }}
          disabled={!qrInput.trim()}
          className="w-full py-4 rounded-xl text-xl font-semibold transition-all active:scale-95"
          style={{
            fontFamily: 'var(--font-secondary)',
            backgroundColor: qrInput.trim()
              ? 'var(--color-primary-gold)'
              : 'var(--color-secondary-mist)',
            color: 'white',
            boxShadow: 'var(--shadow-md)',
            opacity: qrInput.trim() ? 1 : 0.5,
            cursor: qrInput.trim() ? 'pointer' : 'not-allowed',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            pointerEvents: qrInput.trim() ? 'auto' : 'none',
          }}
        >
          查看行程 {qrInput.trim() ? '✓' : ''}
        </button>
      </div>
    </div>
  );
}
