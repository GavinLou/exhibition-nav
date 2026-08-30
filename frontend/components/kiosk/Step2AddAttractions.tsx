'use client';

import { useEffect, useState } from 'react';
import '@/styles/design-tokens.css';

interface Attraction {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  audioUrl?: string;
  estimatedDuration: number;
}

interface ItineraryItem extends Attraction {
  order: number;
}

interface Step2AddAttractionsProps {
  themeId: string;
  themeTitle: string;
  onNext: (itinerary: ItineraryItem[]) => void;
  onBack: () => void;
}

export default function Step2AddAttractions({
  themeId,
  themeTitle,
  onNext,
  onBack,
}: Step2AddAttractionsProps) {
  const [allAttractions, setAllAttractions] = useState<Attraction[]>([]);
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [mediaErrors, setMediaErrors] = useState<{
    image: boolean;
    video: boolean;
    audio: boolean;
  }>({ image: false, video: false, audio: false });

  // 獲取全部景點 + 主題預設行程
  useEffect(() => {
    Promise.all([
      // 獲取全部41個景點
      fetch('/api/attractions').then((res) => res.json()),
      // 獲取主題預設行程
      fetch(`/api/recommended-itineraries/${themeId}`).then((res) => res.json()),
    ])
      .then(([attractionsData, themeData]) => {
        // 處理全部景點
        if (Array.isArray(attractionsData)) {
          setAllAttractions(attractionsData);
          setFilteredAttractions(attractionsData);
        }

        // 將主題的全部景點加入行程
        if (themeData.items && Array.isArray(themeData.items)) {
          const themeItinerary = themeData.items.map((item: any, index: number) => ({
            id: item.attractionId || item.id,
            title: item.title || '景點',
            description: item.description || '',
            imageUrl: item.imageUrl || '/images/attractions/placeholder.jpg',
            videoUrl: item.videoUrl,
            audioUrl: item.audioUrl,
            estimatedDuration: item.estimatedDuration || 30,
            order: index + 1,
          }));
          setItinerary(themeItinerary);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      });
  }, [themeId]);

  // 搜尋功能
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredAttractions(allAttractions);
    } else {
      const filtered = allAttractions.filter((attraction) =>
        attraction.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredAttractions(filtered);
    }
  }, [searchText, allAttractions]);

  const handleAttractionClick = (attraction: Attraction) => {
    setMediaErrors({ image: false, video: false, audio: false });
    setSelectedAttraction(attraction);
  };

  const handleAddAttraction = () => {
    if (selectedAttraction && !itinerary.find((item) => item.id === selectedAttraction.id)) {
      setItinerary([
        ...itinerary,
        {
          ...selectedAttraction,
          order: itinerary.length + 1,
        },
      ]);
    }
    setSelectedAttraction(null);
  };

  const handleRemoveAttraction = (id: string) => {
    const newItinerary = itinerary
      .filter((item) => item.id !== id)
      .map((item, index) => ({
        ...item,
        order: index + 1,
      }));
    setItinerary(newItinerary);
  };

  const handleNext = () => {
    if (itinerary.length > 0) {
      onNext(itinerary);
    }
  };

  const isAttractionAdded = (id: string) => {
    return itinerary.some((item) => item.id === id);
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/kiosk/pic_A12-00224_10.jpg)',
          filter: 'grayscale(20%) blur(0.5px)',
          opacity: 0.35,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          opacity: 0.5,
        }}
      />

      {/* 左上角 LOGO */}
      <div
        className="absolute top-8 left-8 z-30"
        style={{
          width: '500px',
          height: '150px',
          padding: 'var(--spacing-4)',
        }}
      >
        <img
          src="/images/kiosk/home01.png"
          alt="佛光山佛陀紀念館"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* 內容區 - 增加頂部空間避開 LOGO 和步驟指示器 */}
      <div className="relative z-10 w-full h-full flex gap-6 px-12 pt-48 pb-12">
        {/* 左側：全部景點列表 + 搜尋 */}
        <div className="flex-1 flex flex-col">
          {/* 標題 + 搜尋 - 置中 */}
          <div className="mb-8 flex flex-col items-center">
            <h1
              className="text-5xl font-bold mb-6 text-center"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              選擇景點
            </h1>

            {/* 搜尋框 - 加高 */}
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="搜尋景點..."
                className="w-full px-8 py-6 rounded-2xl text-2xl"
                style={{
                  fontFamily: 'var(--font-secondary)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '3px solid var(--color-primary-gold)',
                  color: 'var(--color-text-primary)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              />
              <div
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-3xl pointer-events-none"
                style={{ color: 'var(--color-primary-gold)' }}
              >
                🔍
              </div>
            </div>
          </div>

          {/* 景點網格 */}
          <div className="flex-1 overflow-y-auto pr-2">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>載入中...</div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-6 pb-6">
                {filteredAttractions.map((attraction) => {
                  const added = isAttractionAdded(attraction.id);
                  return (
                    <button
                      key={attraction.id}
                      onClick={() => handleAttractionClick(attraction)}
                      className="group relative transition-all hover:scale-105"
                      style={{
                        transitionDuration: 'var(--duration-base)',
                        opacity: added ? 0.6 : 1,
                      }}
                    >
                      <div
                        className="h-full flex flex-col overflow-hidden"
                        style={{
                          backgroundColor: 'var(--color-bg-card)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: 'var(--radius-lg)',
                          boxShadow: 'var(--shadow-md)',
                          padding: 'var(--spacing-3)',
                        }}
                      >
                        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-2">
                          <img
                            src={attraction.imageUrl}
                            alt={attraction.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/images/attractions/placeholder.jpg';
                            }}
                          />
                        </div>
                        <h3
                          className="text-sm font-semibold text-center line-clamp-2"
                          style={{
                            fontFamily: 'var(--font-primary)',
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          {attraction.title}
                        </h3>
                        {added && (
                          <span
                            className="text-xs mt-1 text-center"
                            style={{ color: 'var(--color-primary-gold)' }}
                          >
                            ✓ 已加入
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 右側：行程列表 */}
        <div
          className="w-96 flex flex-col"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
            padding: 'var(--spacing-8)',
          }}
        >
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              fontFamily: 'var(--font-primary)',
              color: 'var(--color-text-primary)',
            }}
          >
            我的行程 ({itinerary.length})
          </h2>

          {/* 行程列表 */}
          <div className="flex-1 overflow-y-auto mb-6 pr-2">
            {itinerary.length === 0 ? (
              <div
                className="flex items-center justify-center h-full text-center"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <p>尚未加入景點<br />請從左側選擇景點</p>
              </div>
            ) : (
              <div className="space-y-3">
                {itinerary.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm"
                      style={{
                        backgroundColor: 'var(--color-primary-gold)',
                        color: 'white',
                      }}
                    >
                      {item.order}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-semibold truncate text-sm"
                        style={{
                          fontFamily: 'var(--font-secondary)',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-xs"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        約 {item.estimatedDuration} 分鐘
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveAttraction(item.id)}
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors text-lg"
                      style={{
                        color: 'var(--color-error)',
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 底部按鈕 - 加高 */}
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 py-6 rounded-2xl text-xl font-semibold transition-all hover:scale-105"
              style={{
                fontFamily: 'var(--font-secondary)',
                backgroundColor: 'transparent',
                color: 'var(--color-text-secondary)',
                border: '3px solid var(--color-secondary-mist)',
              }}
            >
              返回
            </button>
            <button
              onClick={handleNext}
              disabled={itinerary.length === 0}
              className="flex-1 py-6 rounded-2xl text-xl font-semibold transition-all hover:scale-105"
              style={{
                fontFamily: 'var(--font-secondary)',
                backgroundColor: itinerary.length > 0 ? 'var(--color-primary-gold)' : 'var(--color-secondary-mist)',
                color: 'white',
                boxShadow: 'var(--shadow-lg)',
                transitionDuration: 'var(--duration-base)',
                opacity: itinerary.length === 0 ? 0.5 : 1,
                cursor: itinerary.length === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              下一步
            </button>
          </div>
        </div>
      </div>

      {/* 景點詳情彈窗 - 帶動畫和多媒體 */}
      {selectedAttraction && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center animate-modal-fade-in"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
          }}
          onClick={() => setSelectedAttraction(null)}
        >
          <div
            className="max-w-6xl w-full m-12 flex gap-6 animate-modal-slide-up"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: '85vh',
            }}
          >
            {/* 左側：媒體區域 */}
            <div
              className="flex-1 flex flex-col gap-4 overflow-y-auto"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                padding: 'var(--spacing-6)',
              }}
            >
              {/* 圖片 */}
              {!mediaErrors.image && selectedAttraction.imageUrl && (
                <div className="w-full rounded-xl overflow-hidden">
                  <img
                    src={selectedAttraction.imageUrl}
                    alt={selectedAttraction.title}
                    className="w-full aspect-video object-cover"
                    onError={() => setMediaErrors({ ...mediaErrors, image: true })}
                  />
                </div>
              )}

              {/* 影片 */}
              {!mediaErrors.video && selectedAttraction.videoUrl && (
                <div className="w-full rounded-xl overflow-hidden bg-black">
                  <video
                    src={selectedAttraction.videoUrl}
                    controls
                    className="w-full aspect-video"
                    onError={() => setMediaErrors({ ...mediaErrors, video: true })}
                  />
                </div>
              )}

              {/* 語音 */}
              {!mediaErrors.audio && selectedAttraction.audioUrl && (
                <div
                  className="w-full p-4 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(201, 168, 118, 0.1)',
                  }}
                >
                  <p
                    className="text-sm mb-2"
                    style={{
                      color: 'var(--color-primary-gold)',
                      fontFamily: 'var(--font-secondary)',
                    }}
                  >
                    🎧 語音導覽
                  </p>
                  <audio
                    src={selectedAttraction.audioUrl}
                    controls
                    className="w-full"
                    onError={() => setMediaErrors({ ...mediaErrors, audio: true })}
                  />
                </div>
              )}

              {/* 如果所有媒體都失敗，顯示預設訊息 */}
              {mediaErrors.image && !selectedAttraction.videoUrl && !selectedAttraction.audioUrl && (
                <div
                  className="w-full aspect-video rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(201, 168, 118, 0.1)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <p>📷 圖片載入中...</p>
                </div>
              )}
            </div>

            {/* 右側：介紹 + 按鈕 */}
            <div
              className="w-[450px] flex flex-col"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                padding: 'var(--spacing-8)',
              }}
            >
              <h2
                className="text-4xl font-bold mb-6"
                style={{
                  fontFamily: 'var(--font-primary)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {selectedAttraction.title}
              </h2>

              {/* 可滾動的介紹區域 */}
              <div
                className="flex-1 overflow-y-auto mb-6 pr-2"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'var(--color-primary-gold) rgba(255,255,255,0.1)',
                }}
              >
                <p
                  className="text-lg leading-relaxed mb-4"
                  style={{
                    fontFamily: 'var(--font-secondary)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.8',
                  }}
                >
                  {selectedAttraction.description || '探索這個精彩的景點，體驗獨特的文化之旅。'}
                </p>

                <div
                  className="inline-block px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(201, 168, 118, 0.15)',
                    color: 'var(--color-primary-gold)',
                    fontFamily: 'var(--font-secondary)',
                    fontWeight: 'bold',
                  }}
                >
                  ⏱ 約 {selectedAttraction.estimatedDuration} 分鐘
                </div>
              </div>

              {/* 按鈕組 - 加高 */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedAttraction(null)}
                  className="flex-1 px-8 py-6 rounded-2xl text-2xl font-semibold transition-all hover:scale-105"
                  style={{
                    fontFamily: 'var(--font-secondary)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)',
                    border: '3px solid var(--color-secondary-mist)',
                  }}
                >
                  關閉
                </button>
                {!isAttractionAdded(selectedAttraction.id) && (
                  <button
                    onClick={handleAddAttraction}
                    className="flex-1 px-8 py-6 rounded-2xl text-2xl font-semibold transition-all hover:scale-105"
                    style={{
                      fontFamily: 'var(--font-secondary)',
                      backgroundColor: 'var(--color-primary-gold)',
                      color: 'white',
                      boxShadow: 'var(--shadow-xl)',
                      transitionDuration: 'var(--duration-base)',
                    }}
                  >
                    加入景點
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modal-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-modal-fade-in {
          animation: modal-fade-in 0.25s ease-out;
        }

        @keyframes modal-slide-up {
          from {
            transform: translateY(60px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-modal-slide-up {
          animation: modal-slide-up 0.4s var(--ease-out-expo) forwards;
        }

        /* 自訂 scrollbar */
        div::-webkit-scrollbar {
          width: 6px;
        }

        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        div::-webkit-scrollbar-thumb {
          background: var(--color-primary-gold);
          border-radius: 3px;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
