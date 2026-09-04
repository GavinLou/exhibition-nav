'use client';

import React, { useState } from 'react';
import '@/styles/design-tokens.css';

interface StarRatingInputProps {
  value: number; // 當前選中的評分 (1-5)
  onChange: (rating: number) => void; // 評分改變回調
  name?: string; // input name（用於表單）
  size?: 'small' | 'medium' | 'large';
}

/**
 * 可交互的星星評分輸入組件
 * 用於讓遊客提交評分
 */
export default function StarRatingInput({
  value,
  onChange,
  name = 'rating',
  size = 'large',
}: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeMap = {
    small: '20px',
    medium: '30px',
    large: '40px',
  };

  const fontSize = sizeMap[size];

  const handleClick = (rating: number) => {
    onChange(rating);
  };

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || value;

  return (
    <div className="inline-flex flex-col items-center gap-2">
      {/* 星星輸入 */}
      <div
        className="inline-flex"
        style={{ direction: 'rtl' }}
        role="radiogroup"
        aria-label="評分"
      >
        {[5, 4, 3, 2, 1].map((rating) => {
          const isActive = rating <= displayRating;
          const id = `${name}-star${rating}`;

          return (
            <React.Fragment key={rating}>
              <input
                type="radio"
                id={id}
                name={name}
                value={rating}
                checked={value === rating}
                onChange={() => handleClick(rating)}
                style={{ display: 'none' }}
              />
              <label
                htmlFor={id}
                onMouseEnter={() => handleMouseEnter(rating)}
                onMouseLeave={handleMouseLeave}
                style={{
                  cursor: 'pointer',
                  color: isActive
                    ? 'var(--color-primary-gold)'
                    : 'rgba(200, 200, 200, 0.4)',
                  transition: 'color 0.3s ease, transform 0.2s ease',
                  fontSize: fontSize,
                  lineHeight: 1,
                  userSelect: 'none',
                  display: 'inline-block',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.9)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ★
              </label>
            </React.Fragment>
          );
        })}
      </div>

      {/* 評分文字提示 */}
      {displayRating > 0 && (
        <span
          style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
          }}
        >
          {displayRating === 1 && '很差'}
          {displayRating === 2 && '不好'}
          {displayRating === 3 && '普通'}
          {displayRating === 4 && '不錯'}
          {displayRating === 5 && '很棒'}
        </span>
      )}
    </div>
  );
}
