'use client';

import { useState, useEffect } from 'react';
import '@/styles/design-tokens.css';

interface NumberPickerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  allowedValues?: number[]; // 允許的特定值（例如：[0, 15, 30, 45]）
  label?: string;
}

export default function NumberPicker({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  allowedValues,
  label,
}: NumberPickerProps) {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleDecrement = () => {
    if (allowedValues) {
      // 使用允許的值列表（循環）
      const currentIndex = allowedValues.indexOf(currentValue);
      let newValue;
      if (currentIndex > 0) {
        newValue = allowedValues[currentIndex - 1];
      } else {
        // 到達最小值，循環到最大值
        newValue = allowedValues[allowedValues.length - 1];
      }
      setCurrentValue(newValue);
      onChange(newValue);
    } else {
      // 使用 min/max/step（循環）
      let newValue;
      if (currentValue > min) {
        newValue = currentValue - step;
      } else {
        // 到達最小值，循環到最大值
        newValue = max;
      }
      setCurrentValue(newValue);
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    if (allowedValues) {
      // 使用允許的值列表（循環）
      const currentIndex = allowedValues.indexOf(currentValue);
      let newValue;
      if (currentIndex < allowedValues.length - 1) {
        newValue = allowedValues[currentIndex + 1];
      } else {
        // 到達最大值，循環到最小值
        newValue = allowedValues[0];
      }
      setCurrentValue(newValue);
      onChange(newValue);
    } else {
      // 使用 min/max/step（循環）
      let newValue;
      if (currentValue < max) {
        newValue = currentValue + step;
      } else {
        // 到達最大值，循環到最小值
        newValue = min;
      }
      setCurrentValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {label && (
        <label
          className="block mb-2 text-sm font-medium"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-secondary)',
          }}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={handleDecrement}
          className="rounded-l-lg p-3 h-11 transition-all hover:scale-105"
          style={{
            backgroundColor: 'rgba(201, 168, 118, 0.1)',
            border: '2px solid var(--color-primary-gold)',
            color: 'var(--color-primary-gold)',
          }}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          value={currentValue.toString().padStart(2, '0')}
          readOnly
          className="h-11 text-center text-2xl font-bold focus:outline-none"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            borderTop: '2px solid var(--color-primary-gold)',
            borderBottom: '2px solid var(--color-primary-gold)',
            borderLeft: 'none',
            borderRight: 'none',
            color: 'var(--color-primary-gold)',
            fontFamily: 'var(--font-primary)',
            width: '80px',
          }}
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="rounded-r-lg p-3 h-11 transition-all hover:scale-105"
          style={{
            backgroundColor: 'rgba(201, 168, 118, 0.1)',
            border: '2px solid var(--color-primary-gold)',
            color: 'var(--color-primary-gold)',
          }}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
