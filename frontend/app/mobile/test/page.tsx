'use client';

import { useState } from 'react';
import '@/styles/design-tokens.css';

export default function MobileTestPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [touchCount, setTouchCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
    console.log(message);
  };

  const handleClick = () => {
    setClickCount((c) => c + 1);
    addLog(`Click event fired! Total clicks: ${clickCount + 1}`);
  };

  const handleTouchStart = () => {
    addLog('Touch start');
  };

  const handleTouchEnd = () => {
    setTouchCount((c) => c + 1);
    addLog(`Touch end! Total touches: ${touchCount + 1}`);
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      {/* 標題 */}
      <div className="mb-6">
        <h1
          className="text-3xl font-bold mb-2"
          style={{
            fontFamily: 'var(--font-primary)',
            color: 'var(--color-text-primary)',
          }}
        >
          Mobile 觸控測試
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-secondary)',
          }}
        >
          測試按鈕是否可以在手機上正常點擊
        </p>
      </div>

      {/* 統計 */}
      <div
        className="mb-6 p-4 rounded-lg"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          className="text-lg mb-2"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-secondary)',
          }}
        >
          點擊次數: <strong>{clickCount}</strong>
        </div>
        <div
          className="text-lg"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-secondary)',
          }}
        >
          觸控次數: <strong>{touchCount}</strong>
        </div>
      </div>

      {/* 測試按鈕 */}
      <div className="space-y-4 mb-6">
        <button
          onClick={handleClick}
          className="w-full py-4 rounded-xl text-xl font-semibold active:scale-95 transition-all"
          style={{
            fontFamily: 'var(--font-secondary)',
            backgroundColor: 'var(--color-primary-gold)',
            color: 'white',
            boxShadow: 'var(--shadow-md)',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          測試按鈕 (onClick)
        </button>

        <button
          onTouchStart={handleTouchStart}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleTouchEnd();
          }}
          className="w-full py-4 rounded-xl text-xl font-semibold active:scale-95 transition-all"
          style={{
            fontFamily: 'var(--font-secondary)',
            backgroundColor: 'var(--color-secondary-mist)',
            color: 'white',
            boxShadow: 'var(--shadow-md)',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          測試按鈕 (onTouch)
        </button>

        <button
          onClick={handleClick}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleTouchEnd();
          }}
          className="w-full py-4 rounded-xl text-xl font-semibold active:scale-95 transition-all"
          style={{
            fontFamily: 'var(--font-secondary)',
            backgroundColor: '#4CAF50',
            color: 'white',
            boxShadow: 'var(--shadow-md)',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          測試按鈕 (Both)
        </button>
      </div>

      {/* 清除日誌按鈕 */}
      <button
        onClick={() => setLogs([])}
        className="mb-4 px-4 py-2 rounded-lg"
        style={{
          backgroundColor: '#f44336',
          color: 'white',
          fontFamily: 'var(--font-secondary)',
        }}
      >
        清除日誌
      </button>

      {/* 日誌 */}
      <div
        className="p-4 rounded-lg max-h-96 overflow-y-auto"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <h2
          className="text-lg font-bold mb-2"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          事件日誌
        </h2>
        <div
          className="space-y-1 font-mono text-sm"
          style={{
            color: 'var(--color-text-secondary)',
          }}
        >
          {logs.length === 0 ? (
            <div>沒有日誌</div>
          ) : (
            logs.map((log, index) => <div key={index}>{log}</div>)
          )}
        </div>
      </div>
    </div>
  );
}
