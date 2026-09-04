'use client';

import { useEffect, useState } from 'react';
import type { RecommendedItinerary } from '@/types/kiosk';
import CircularGallery from '@/components/CircularGallery';
import KioskLayout from './KioskLayout';
import '@/styles/design-tokens.css';

interface Step1SelectThemeProps {
  onSelectTheme: (themeId: string, themeTitle: string) => void;
  onNext: () => void;
}

export default function Step1SelectTheme({
  onSelectTheme,
  onNext,
}: Step1SelectThemeProps) {
  const [themes, setThemes] = useState<RecommendedItinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<RecommendedItinerary | null>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showGallery, setShowGallery] = useState(true);

  useEffect(() => {
    fetch('/api/recommended-itineraries')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setThemes(data);
        } else {
          console.error('Expected array but got:', data);
          setThemes([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch themes:', error);
        setThemes([]);
        setLoading(false);
      });
  }, []);

  const handleThemeClick = (index: number) => {
    if (themes[index]) {
      setShowGallery(false);
      setTimeout(() => {
        setSelectedTheme(themes[index]);
      }, 100);
    }
  };

  const handleConfirmTheme = () => {
    if (selectedTheme) {
      onSelectTheme(selectedTheme.id, selectedTheme.title);
      onNext();
    }
  };

  const handleBack = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setSelectedTheme(null);
      setIsAnimatingOut(false);
      setTimeout(() => {
        setShowGallery(true);
      }, 100);
    }, 600);
  };

  // 準備 CircularGallery 需要的資料格式
  const galleryItems = themes.map((theme) => ({
    image: theme.imageUrl,
    text: theme.title,
  }));

  return (
    <KioskLayout>
      {/* 內容區 */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {loading ? (
          <div className="text-2xl" style={{ color: 'var(--color-text-secondary)' }}>
            載入中...
          </div>
        ) : (
          <>
            {/* 未選擇狀態：3D 圓形畫廊 */}
            {!selectedTheme && showGallery && (
              <div className="w-full h-full flex flex-col items-center justify-center pt-32 animate-gallery-appear">
                {/* 標題區域 - 往下移動 */}
                <div className="mb-12">
                  

                  <h1
                    className="text-6xl font-bold mb-3 text-center"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-primary-gold))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.05em',
                    }}
                  >
                    選擇主題行程 
                  </h1>
                  <h4
                    className="text-6xl font-bold mb-3 text-center"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-primary-gold))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.05em',
                    }}
                  >
                    點擊主題卡片，開始您的文化之旅
                  </h4>
                </div>

                {/* 3D Circular Gallery - 全寬，更扁 */}
                <div className="w-full flex-1 px-12" style={{ maxHeight: '350px' }}>
                  <CircularGallery
                    items={galleryItems}
                    bend={0.5}
                    textColor="var(--color-primary-gold)"
                    borderRadius={0.08}
                    font="bold 30px Noto Serif TC"
                    fontUrl="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@700&display=swap"
                    scrollSpeed={2.0}
                    scrollEase={0.05}
                    onItemClick={handleThemeClick}
                  />
                </div>
              </div>
            )}

            {/* 選擇狀態：左側圖片 + 右側介紹 - 往中間靠攏 */}
            {selectedTheme && (
              <div
                className={`w-full h-full flex items-center justify-center gap-8 px-24 ${
                  isAnimatingOut ? 'animate-fade-out-reverse' : 'animate-fade-in'
                }`}
              >
                {/* 左側：選中的圖片 - 往中間 */}
                <div
                  className={`flex-shrink-0 ${
                    isAnimatingOut ? 'animate-slide-out-left' : 'animate-slide-in-left'
                  }`}
                  style={{ width: '450px' }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: 'var(--radius-xl)',
                      boxShadow: 'var(--shadow-xl)',
                      border: '4px solid var(--color-primary-gold)',
                    }}
                  >
                    <img
                      src={selectedTheme.imageUrl}
                      alt={selectedTheme.title}
                      className="w-full aspect-[5/3] object-cover"
                    />
                    <div
                      className="p-6"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      }}
                    >
                      <h3
                        className="text-3xl font-bold text-center"
                        style={{
                          fontFamily: 'var(--font-primary)',
                          color: 'var(--color-primary-gold)',
                        }}
                      >
                        {selectedTheme.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* 右側：介紹內容 - 固定高度 + scrollbar */}
                <div
                  className={`flex-shrink-0 flex flex-col ${
                    isAnimatingOut ? 'animate-slide-out-right' : 'animate-slide-in-right'
                  }`}
                  style={{
                    width: '600px',
                    height: '750px',
                    backgroundColor: 'var(--color-bg-card)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-xl)',
                    padding: 'var(--spacing-8)',
                  }}
                >
                  <h2
                    className="text-5xl font-bold mb-6 text-center"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {selectedTheme.title}
                  </h2>

                  {/* 可滾動的文字區域 */}
                  <div
                    className="flex-1 overflow-y-auto mb-6 pr-4"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'var(--color-primary-gold) rgba(255,255,255,0.1)',
                    }}
                  >
                    <p
                      className="text-xl leading-relaxed"
                      style={{
                        fontFamily: 'var(--font-secondary)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >
                      {selectedTheme.description || '探索佛陀紀念館的精彩之旅，體驗文化與藝術的完美融合。這個主題將帶您領略獨特的文化魅力，感受歷史與現代的交織。'}
                    </p>
                  </div>

                  {/* 按鈕組 */}
                  <div className="flex gap-6">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-6 rounded-2xl text-2xl font-semibold transition-all hover:scale-105"
                      style={{
                        fontFamily: 'var(--font-secondary)',
                        backgroundColor: 'transparent',
                        color: 'var(--color-text-secondary)',
                        border: '3px solid var(--color-secondary-mist)',
                        transitionDuration: 'var(--duration-base)',
                      }}
                    >
                      返回
                    </button>
                    <button
                      onClick={handleConfirmTheme}
                      className="flex-1 py-6 rounded-2xl text-2xl font-semibold transition-all hover:scale-105"
                      style={{
                        fontFamily: 'var(--font-secondary)',
                        backgroundColor: 'var(--color-primary-gold)',
                        color: 'white',
                        boxShadow: 'var(--shadow-lg)',
                        transitionDuration: 'var(--duration-base)',
                        transitionTimingFunction: 'var(--ease-out-back)',
                      }}
                    >
                      確認主題
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        /* 畫廊出現動畫 */
        @keyframes gallery-appear {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-gallery-appear {
          animation: gallery-appear 0.6s var(--ease-out-expo) forwards;
        }

        @keyframes slide-in-left {
          from {
            transform: translateX(-80px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s var(--ease-out-expo) forwards;
        }

        @keyframes slide-out-left {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-80px);
            opacity: 0;
          }
        }

        .animate-slide-out-left {
          animation: slide-out-left 0.6s var(--ease-out-expo) forwards;
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(80px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s var(--ease-out-expo) forwards;
        }

        @keyframes slide-out-right {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(80px);
            opacity: 0;
          }
        }

        .animate-slide-out-right {
          animation: slide-out-right 0.6s var(--ease-out-expo) forwards;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        @keyframes fade-out-reverse {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .animate-fade-out-reverse {
          animation: fade-out-reverse 0.4s ease-out;
        }

        /* 自訂 scrollbar 樣式 */
        div::-webkit-scrollbar {
          width: 8px;
        }

        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        div::-webkit-scrollbar-thumb {
          background: var(--color-primary-gold);
          border-radius: 4px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: var(--color-primary-gold);
          opacity: 0.8;
        }
      `}</style>
    </KioskLayout>
  );
}
