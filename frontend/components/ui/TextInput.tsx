'use client';

import React from 'react';
import '@/styles/design-tokens.css';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  disabled?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function TextInput({
  value,
  onChange,
  placeholder = '請輸入...',
  type = 'text',
  disabled = false,
  className = '',
  size = 'medium',
}: TextInputProps) {
  const sizeMap = {
    small: {
      padding: '0.5rem 0.75rem',
      fontSize: '14px',
      borderRadius: '0.75rem',
    },
    medium: {
      padding: '1rem',
      fontSize: '1rem',
      borderRadius: '1rem',
    },
    large: {
      padding: '1.25rem',
      fontSize: '1.25rem',
      borderRadius: '1.25rem',
    },
  };

  const config = sizeMap[size];

  return (
    <div className={`input-wrapper ${className}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full transition-all"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          border: '2px solid var(--color-primary-gold)',
          padding: config.padding,
          fontSize: config.fontSize,
          borderRadius: config.borderRadius,
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-secondary)',
          boxShadow: '0 0.4rem rgba(201, 168, 118, 0.2)',
          cursor: disabled ? 'not-allowed' : 'text',
          opacity: disabled ? 0.6 : 1,
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid var(--color-primary-gold)';
          e.currentTarget.style.outlineOffset = '2px';
          e.currentTarget.style.boxShadow = '0 0.4rem rgba(201, 168, 118, 0.3), 0 0 0 3px rgba(201, 168, 118, 0.1)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
          e.currentTarget.style.boxShadow = '0 0.4rem rgba(201, 168, 118, 0.2)';
        }}
      />

      <style jsx>{`
        input::placeholder {
          color: var(--color-text-secondary);
          opacity: 0.6;
        }

        input:disabled {
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
