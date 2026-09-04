'use client';

import { useState } from 'react';
import '@/styles/design-tokens.css';

type MobilityMode = 'walking' | 'wheelchair';

interface MobilitySwitcherProps {
  onChange?: (mode: MobilityMode) => void;
}

export default function MobilitySwitcher({ onChange }: MobilitySwitcherProps) {
  const [currentMode, setCurrentMode] = useState<MobilityMode>('walking');

  const handleModeChange = (mode: MobilityMode) => {
    setCurrentMode(mode);
    if (onChange) {
      onChange(mode);
    }
  };

  return (
    <div
      className="flex gap-4 items-center"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        backdropFilter: 'blur(20px)',
        padding: 'var(--spacing-4)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* 行人按鈕 */}
      <button
        onClick={() => handleModeChange('walking')}
        className="px-4 py-2 rounded-lg font-semibold transition-all"
        style={{
          backgroundColor: currentMode === 'walking' ? 'var(--color-primary-gold)' : 'transparent',
          color: currentMode === 'walking' ? 'white' : 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="步行模式"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* 行人圖標 */}
          <circle cx="12" cy="4" r="2" />
          <path d="M10.5 8.5 L12 8 L13.5 8.5" />
          <path d="M12 8 L12 13" />
          <path d="M12 13 L9 21" />
          <path d="M12 13 L15 21" />
          <path d="M12 13 L14 10" />
        </svg>
      </button>

      {/* 輪椅按鈕 */}
      <button
        onClick={() => handleModeChange('wheelchair')}
        className="px-4 py-2 rounded-lg font-semibold transition-all"
        style={{
          backgroundColor: currentMode === 'wheelchair' ? 'var(--color-primary-gold)' : 'transparent',
          color: currentMode === 'wheelchair' ? 'white' : 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="輪椅模式"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* 輪椅圖標 */}
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7 L12 11 L16 11" />
          <circle cx="8" cy="17" r="4" />
          <path d="M12 11 L14 17" />
          <circle cx="18" cy="17" r="1.5" />
        </svg>
      </button>
    </div>
  );
}
