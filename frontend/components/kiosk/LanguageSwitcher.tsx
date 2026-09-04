'use client';

import { useState } from 'react';
import '@/styles/design-tokens.css';

type Language = 'zh-TW' | 'en';

interface LanguageSwitcherProps {
  onChange?: (lang: Language) => void;
}

export default function LanguageSwitcher({ onChange }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<Language>('zh-TW');

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    if (onChange) {
      onChange(lang);
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
      <button
        onClick={() => handleLanguageChange('zh-TW')}
        className="px-4 py-2 rounded-lg font-semibold transition-all"
        style={{
          fontFamily: 'var(--font-secondary)',
          backgroundColor: currentLang === 'zh-TW' ? 'var(--color-primary-gold)' : 'transparent',
          color: currentLang === 'zh-TW' ? 'white' : 'var(--color-text-secondary)',
          fontSize: '1rem',
        }}
      >
        繁中
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className="px-4 py-2 rounded-lg font-semibold transition-all"
        style={{
          fontFamily: 'var(--font-secondary)',
          backgroundColor: currentLang === 'en' ? 'var(--color-primary-gold)' : 'transparent',
          color: currentLang === 'en' ? 'white' : 'var(--color-text-secondary)',
          fontSize: '1rem',
        }}
      >
        EN
      </button>
    </div>
  );
}
