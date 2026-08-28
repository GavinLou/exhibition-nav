'use client';

import { Globe, Accessibility } from 'lucide-react';
import type { LanguageType } from '@/types/kiosk';

interface TopBarProps {
  language: LanguageType;
  isAccessible: boolean;
  onLanguageChange: (lang: LanguageType) => void;
  onAccessibleChange: (accessible: boolean) => void;
}

const languages: { code: LanguageType; label: string }[] = [
  { code: 'zh_TW', label: '繁中' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日' },
];

export default function TopBar({
  language,
  isAccessible,
  onLanguageChange,
  onAccessibleChange,
}: TopBarProps) {
  return (
    <>
      {/* Logo */}
      <div className="absolute left-[62px] top-[22px] z-20">
        <img
          src="/images/kiosk/home01.png"
          alt="Logo"
          className="w-[489px] h-[131px] object-contain"
        />
      </div>

      {/* 語言和身心障礙切換按鈕（左側ICON上方） - 拉開間距、加深顏色 */}
      <div className="absolute left-[62px] top-[700px] z-20 flex flex-col gap-4">
        {/* 語言切換 */}
        <div className="glass w-[68px] rounded-full p-2 flex flex-col items-center gap-2 bg-black/30 backdrop-blur-xl">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                language === lang.code
                  ? 'bg-white/50 text-white shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/20'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* 身心障礙需求 */}
        <button
          onClick={() => onAccessibleChange(!isAccessible)}
          className={`glass w-[68px] h-[68px] rounded-full flex items-center justify-center transition-all bg-black/30 backdrop-blur-xl ${
            isAccessible
              ? 'bg-white/50 shadow-lg'
              : 'hover:bg-white/20'
          }`}
        >
          <Accessibility
            className={`w-8 h-8 ${isAccessible ? 'text-white' : 'text-white/80'}`}
          />
        </button>
      </div>
    </>
  );
}
