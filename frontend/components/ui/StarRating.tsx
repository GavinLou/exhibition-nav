'use client';

import React, { useState } from 'react';
import '@/styles/design-tokens.css';

interface StarRatingProps {
  rating: number; // 當前評分 (1-5)
  onRatingChange?: (rating: number) => void; // 評分改變回調（唯讀模式不傳）
  readonly?: boolean; // 是否唯讀
  size?: 'small' | 'medium' | 'large'; // 星星大小
  showNumber?: boolean; // 是否顯示數字
}

export default function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = 'medium',
  showNumber = true,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeMap = {
    small: '16px',
    medium: '24px',
    large: '32px',
  };

  const fontSize = sizeMap[size];

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div
      className="inline-flex items-center gap-1"
      style={{
        cursor: readonly ? 'default' : 'pointer',
      }}
    >
      {/* 星星 */}
      <div className="inline-flex" style={{ direction: 'rtl' }}>
        {[5, 4, 3, 2, 1].map((value) => {
          const isActive = value <= displayRating;
          const isHovering = value <= hoverRating;

          return (
            <label
              key={value}
              onClick={() => handleClick(value)}
              onMouseEnter={() => handleMouseEnter(value)}
              onMouseLeave={handleMouseLeave}
              style={{
                cursor: readonly ? 'default' : 'pointer',
                color: isActive
                  ? 'var(--color-primary-gold)'
                  : 'rgba(200, 200, 200, 0.4)',
                transition: 'color 0.3s ease',
                fontSize: fontSize,
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              ★
            </label>
          );
        })}
      </div>

      {/* 數字顯示 */}
      {showNumber && rating > 0 && (
        <span
          style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px',
            color: 'var(--color-text-secondary)',
            marginLeft: '4px',
          }}
        >
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
