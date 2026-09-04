'use client';

import { useState } from 'react';
import StarRating from '@/components/ui/StarRating';
import StarRatingInput from '@/components/ui/StarRatingInput';
import '@/styles/design-tokens.css';

export default function DemoRatingPage() {
  const [rating, setRating] = useState(0);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <div
        className="max-w-2xl w-full p-12 rounded-3xl"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          backdropFilter: 'blur(20px)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <h1
          className="text-4xl font-bold mb-8 text-center"
          style={{
            fontFamily: 'var(--font-primary)',
            color: 'var(--color-text-primary)',
            background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-primary-gold))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          評分組件示範
        </h1>

        <div className="space-y-8">
          {/* 唯讀評分顯示 */}
          <div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              1. 唯讀評分顯示（StarRating）
            </h2>
            <p
              className="mb-4"
              style={{
                fontFamily: 'var(--font-secondary)',
                color: 'var(--color-text-secondary)',
              }}
            >
              用於顯示景點的平均評分，遊客無法點擊修改
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span style={{ color: 'var(--color-text-secondary)' }}>大尺寸：</span>
                <StarRating rating={4.5} readonly={true} size="large" showNumber={true} />
              </div>
              <div className="flex items-center gap-4">
                <span style={{ color: 'var(--color-text-secondary)' }}>中尺寸：</span>
                <StarRating rating={3.8} readonly={true} size="medium" showNumber={true} />
              </div>
              <div className="flex items-center gap-4">
                <span style={{ color: 'var(--color-text-secondary)' }}>小尺寸：</span>
                <StarRating rating={5.0} readonly={true} size="small" showNumber={true} />
              </div>
              <div className="flex items-center gap-4">
                <span style={{ color: 'var(--color-text-secondary)' }}>無評分：</span>
                <StarRating rating={0} readonly={true} size="medium" showNumber={true} />
              </div>
            </div>
          </div>

          {/* 可交互評分輸入 */}
          <div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              2. 可交互評分（StarRatingInput）
            </h2>
            <p
              className="mb-4"
              style={{
                fontFamily: 'var(--font-secondary)',
                color: 'var(--color-text-secondary)',
              }}
            >
              用於讓遊客提交評分，點擊星星或 hover 查看效果
            </p>

            <div className="flex flex-col items-center gap-4 p-8 rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
              <StarRatingInput
                value={rating}
                onChange={setRating}
                name="demo-rating"
                size="large"
              />
              <p
                style={{
                  fontFamily: 'var(--font-secondary)',
                  color: 'var(--color-text-primary)',
                  fontSize: '18px',
                }}
              >
                您的評分：{rating > 0 ? `${rating} 星` : '尚未評分'}
              </p>
            </div>
          </div>

          {/* 使用範例 */}
          <div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              3. 使用方式
            </h2>
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                fontFamily: 'monospace',
                fontSize: '14px',
              }}
            >
              <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--color-text-primary)' }}>
{`// 唯讀顯示
<StarRating
  rating={4.5}
  readonly={true}
  size="medium"
  showNumber={true}
/>

// 可交互評分
<StarRatingInput
  value={rating}
  onChange={(value) => setRating(value)}
  name="attraction-rating"
  size="large"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
