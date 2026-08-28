'use client';

import { useEffect, useState } from 'react';
import type { RecommendedItinerary, ItineraryItem } from '@/types/kiosk';

interface Step1SelectThemeProps {
  onSelectTheme: (themeId: string, items: ItineraryItem[]) => void;
  onNext: () => void;
  selectedThemeId: string | null;
}

export default function Step1SelectTheme({
  onSelectTheme,
  onNext,
  selectedThemeId,
}: Step1SelectThemeProps) {
  const [themes, setThemes] = useState<RecommendedItinerary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/recommended-itineraries')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched themes:', data);
        // 確保 data 是陣列
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

  const handleThemeClick = async (themeId: string) => {
    try {
      console.log('Fetching theme details for:', themeId);
      const res = await fetch(`/api/recommended-itineraries/${themeId}`);
      const data = await res.json();
      console.log('Theme details response:', data);
      console.log('Items count:', data.items?.length);
      onSelectTheme(themeId, data.items || []);

      // 自動進入下一步
      setTimeout(() => {
        onNext();
      }, 300);
    } catch (error) {
      console.error('Failed to fetch theme details:', error);
    }
  };

  return (
    <div className="glass w-full h-full rounded-[32px] relative overflow-hidden bg-white/60 backdrop-blur-xl">
      {/* 背景 */}
      <div className="absolute inset-0 bg-white/10 rounded-[20px]" />

      {/* 標題 */}
      <h1 className="absolute left-12 top-12 text-white text-4xl font-bold">
        熱門主題行程
      </h1>

      {/* 主題卡片網格 */}
      <div className="absolute left-12 top-32 right-12 bottom-12 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-xl">載入中...</div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-x-12 gap-y-12">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeClick(theme.id)}
                className={`group relative transition-all ${
                  selectedThemeId === theme.id
                    ? 'ring-4 ring-white/50'
                    : 'hover:scale-105'
                }`}
              >
                <div className="glass rounded-[20px] p-6 h-full flex flex-col gap-2">
                  {/* 封面圖 */}
                  <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-white/30">
                    <img
                      src={theme.imageUrl}
                      alt={theme.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/themes/placeholder.jpg';
                      }}
                    />
                  </div>

                  {/* 標題和描述 */}
                  <div className="flex flex-col items-center text-center gap-0.5">
                    <h3 className="text-white text-xl font-medium">
                      {theme.title}
                    </h3>
                    <p className="text-white/75 text-lg">
                      {theme.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
