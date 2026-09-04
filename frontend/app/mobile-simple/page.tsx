'use client';

import { useState } from 'react';

export default function MobileSimplePage() {
  const [selectedQR, setSelectedQR] = useState('');
  const [clickCount, setClickCount] = useState(0);

  const qrCodes = [
    '攝手之旅_賴廷宇_1人_202609021000',
    '測試主題_張三_5人_202609021000',
  ];

  const handleSelect = (qr: string) => {
    console.log('Selected:', qr);
    setSelectedQR(qr);
    setClickCount(prev => prev + 1);
    alert(`已選擇: ${qr}`);
  };

  const handleView = () => {
    if (selectedQR) {
      console.log('Viewing:', selectedQR);
      alert(`即將查看: ${selectedQR}`);
      window.location.href = `/mobile/itinerary?qr=${encodeURIComponent(selectedQR)}`;
    } else {
      alert('請先選擇行程');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#2C3E50',
      color: 'white',
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        簡化版 - 選擇行程
      </h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        點擊次數: {clickCount}
      </div>

      <div style={{ marginBottom: '30px' }}>
        {qrCodes.map((qr, index) => {
          const parts = qr.split('_');
          const displayName = parts.length >= 2 ? `${parts[0]} - ${parts[1]}` : qr;

          return (
            <button
              key={index}
              onClick={() => handleSelect(qr)}
              style={{
                width: '100%',
                padding: '20px',
                marginBottom: '10px',
                backgroundColor: selectedQR === qr ? '#C9A876' : '#34495E',
                border: selectedQR === qr ? '3px solid #C9A876' : '2px solid #7F8C8D',
                borderRadius: '10px',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{displayName}</div>
              <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '5px' }}>{qr}</div>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleView}
        disabled={!selectedQR}
        style={{
          width: '100%',
          padding: '20px',
          backgroundColor: selectedQR ? '#C9A876' : '#7F8C8D',
          border: 'none',
          borderRadius: '10px',
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
          cursor: selectedQR ? 'pointer' : 'not-allowed',
          opacity: selectedQR ? 1 : 0.5,
        }}
      >
        查看行程 {selectedQR ? '✓' : ''}
      </button>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#34495E',
        borderRadius: '10px',
        fontSize: '14px',
      }}>
        <div>選中的 QR: {selectedQR || '(未選擇)'}</div>
        <div>按鈕狀態: {selectedQR ? '啟用' : '禁用'}</div>
      </div>
    </div>
  );
}
