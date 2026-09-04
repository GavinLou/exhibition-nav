'use client';

import { ReactNode } from 'react';
import '@/styles/design-tokens.css';
import LanguageSwitcher from './LanguageSwitcher';
import MobilitySwitcher from './MobilitySwitcher';

interface KioskLayoutProps {
  children: ReactNode;
  showLanguageSwitcher?: boolean;
}

export default function KioskLayout({
  children,
  showLanguageSwitcher = true
}: KioskLayoutProps) {
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
          opacity: 0.5,
        }}
      />

      {/* 左上角 LOGO */}
      <div
        className="absolute top-8 left-8 z-30"
        style={{
          width: '500px',
          height: '150px',
          padding: 'var(--spacing-4)',
        }}
      >
        <img
          src="/images/kiosk/home01.png"
          alt="佛光山佛陀紀念館"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* 右上角切換器 */}
      {showLanguageSwitcher && (
        <div className="absolute top-30 right-32 z-30 flex gap-4">
          <MobilitySwitcher />
          <LanguageSwitcher />
        </div>
      )}

      {/* 內容區域 */}
      {children}
    </div>
  );
}
