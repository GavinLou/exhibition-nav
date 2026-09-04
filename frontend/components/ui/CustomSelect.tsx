'use client';

import React, { useState, useRef, useEffect } from 'react';
import '@/styles/design-tokens.css';

interface SelectOption {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = '請選擇',
  className = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // 關閉下拉選單（點擊外部時）
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={selectRef}
      className={`relative ${className}`}
      style={{
        width: 'fit-content',
        minWidth: '120px',
      }}
    >
      {/* 選中的項目 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer transition-all"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          backdropFilter: 'blur(10px)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-md)',
          border: '2px solid var(--color-primary-gold)',
          fontFamily: 'var(--font-secondary)',
          color: 'var(--color-text-primary)',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <span>{selectedOption?.label || placeholder}</span>
        {/* 箭頭圖標 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="10px"
          viewBox="0 0 512 512"
          style={{
            fill: 'var(--color-primary-gold)',
            transition: 'transform 300ms',
            transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>

      {/* 選項列表 */}
      <div
        style={{
          position: 'absolute',
          top: isOpen ? '100%' : '0',
          left: 0,
          right: 0,
          marginTop: '4px',
          backgroundColor: 'var(--color-bg-card)',
          backdropFilter: 'blur(10px)',
          borderRadius: 'var(--radius-md)',
          border: '2px solid var(--color-primary-gold)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 300ms, top 300ms',
          zIndex: 1000,
        }}
      >
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className="cursor-pointer transition-all"
            style={{
              padding: '8px 12px',
              fontFamily: 'var(--font-secondary)',
              color: 'var(--color-text-primary)',
              fontSize: '14px',
              backgroundColor:
                option.value === value
                  ? 'rgba(201, 168, 118, 0.2)'
                  : 'transparent',
              display: option.value === value ? 'none' : 'block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(201, 168, 118, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                option.value === value
                  ? 'rgba(201, 168, 118, 0.2)'
                  : 'transparent';
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
