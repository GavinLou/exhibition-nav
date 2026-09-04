'use client';

import React from 'react';
import '@/styles/design-tokens.css';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export default function ToggleSwitch({
  checked,
  onChange,
  label,
  size = 'medium',
  disabled = false,
}: ToggleSwitchProps) {
  const sizeMap = {
    small: {
      fontSize: '14px',
      width: '2.8em',
      height: '1.6em',
      sliderSize: '1.6em',
      translateX: '1.2em',
    },
    medium: {
      fontSize: '17px',
      width: '3.5em',
      height: '2em',
      sliderSize: '2em',
      translateX: '1.6em',
    },
    large: {
      fontSize: '20px',
      width: '4em',
      height: '2.2em',
      sliderSize: '2.2em',
      translateX: '1.8em',
    },
  };

  const config = sizeMap[size];

  return (
    <label
      className="inline-flex items-center gap-2"
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div
        style={{
          fontSize: config.fontSize,
          position: 'relative',
          display: 'inline-block',
          width: config.width,
          height: config.height,
        }}
      >
        {/* Hidden checkbox */}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          style={{
            opacity: 0,
            width: 0,
            height: 0,
          }}
        />

        {/* Slider */}
        <span
          style={{
            position: 'absolute',
            cursor: disabled ? 'not-allowed' : 'pointer',
            inset: 0,
            background: checked
              ? 'var(--color-primary-gold)'
              : 'rgba(200, 200, 200, 0.4)',
            borderRadius: '50px',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: checked ? '0 0 8px rgba(201, 168, 118, 0.3)' : 'none',
          }}
        >
          {/* Slider button */}
          <span
            style={{
              position: 'absolute',
              content: '""',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: config.sliderSize,
              width: config.sliderSize,
              left: 0,
              bottom: 0,
              backgroundColor: 'white',
              borderRadius: '50px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: checked ? `translateX(${config.translateX})` : 'translateX(0)',
            }}
          />
        </span>
      </div>

      {/* Label */}
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px',
            color: 'var(--color-text-primary)',
            userSelect: 'none',
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
}
