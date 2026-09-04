'use client';

import { useEffect, useState } from 'react';
import '@/styles/design-tokens.css';
import KioskLayout from './KioskLayout';
import CustomSelect from '@/components/ui/CustomSelect';
import StarRating from '@/components/ui/StarRating';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import TextInput from '@/components/ui/TextInput';
interface Attraction {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  audioUrl?: string;
  rating?: number;
  estimatedDuration: number;
  latitude?: number;
  longitude?: number;
}

interface ItineraryItem extends Attraction {
  order: number;
  needsNarrator?: boolean; // 是否需要導覽員
  customDuration?: number; // 自訂參觀時長（分鐘）
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

        // 將主題的全部景點加入行程，使用正確的參觀時長
        if (themeData.items && Array.isArray(themeData.items)) {
          const themeItinerary = themeData.items.map((item: any, index: number) => {
            // 找到對應的景點資料以獲取rating和其他資訊
            const attractionData = attractionsData.find((a: any) => a.id === (item.targetId || item.id));

            return {
              id: item.targetId || item.id,
              title: item.title || '景點',
              description: item.description || '',
              imageUrl: item.imageUrl || '/images/attractions/placeholder.jpg',
              videoUrl: item.videoUrl,
              audioUrl: item.audioUrl,
              rating: attractionData?.rating || 4.5,
              estimatedDuration: item.suggestedStayMinutes || item.estimatedDuration || 30,
              latitude: item.location?.lat || attractionData?.latitude,
              longitude: item.location?.lng || attractionData?.longitude,
              order: index + 1,
              needsNarrator: false,
              customDuration: undefined,
            };
          });
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

  const handleToggleNarrator = (id: string) => {
    setItinerary(itinerary.map(item =>
      item.id === id ? { ...item, needsNarrator: !item.needsNarrator } : item
    ));
  };

  const handleChangeDuration = (id: string, duration: number) => {
    setItinerary(itinerary.map(item =>
      item.id === id ? { ...item, customDuration: duration } : item
    ));
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
    <KioskLayout>
      {/* 內容區 - 增加頂部空間避開 LOGO 和步驟指示器 */}
      <div className="relative z-10 w-5/6 h-2/3 left-1/10 top-1/5  flex gap-6 px-12 pt-48 pb-12 ">
        {/* 左側：全部景點列表 + 搜尋 */}
        <div className="flex-1 flex flex-col">
          {/* 標題 + 搜尋 - 置中 */}
          <div className="mb-8 flex flex-col items-center">
            <h1
              className="text-5xl font-bold mb-6 text-center"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
                background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-primary-gold))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              選擇景點
            </h1>

            {/* 搜尋框 */}
            <div className="relative w-full max-w-2xl"
              style={{
                marginBottom: '16px',
              }}
            >
              <TextInput
                value={searchText}
                onChange={setSearchText}
                size="small"
              />
            </div>
          </div>

          {/* 景點網格 */}
          <div
            className="flex-1 overflow-y-auto"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              backdropFilter: 'blur(10px)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              padding: '20px',
              paddingRight: '15px', // 為 scrollbar 留空間
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--color-primary-gold) rgba(255,255,255,0.1)',
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>載入中...</div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-6 pb-6 w-24/25">
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
                          className="text-sm font-semibold text-center truncate px-1"
                          style={{
                            fontFamily: 'var(--font-primary)',
                            color: 'var(--color-text-primary)',
                          }}
                          title={attraction.title}
                        >
                          {attraction.title}
                        </h3>
{/* 💡 修改後：拿掉 > 0 的限制，並用 || 4 來給予預設值 */}
{(attraction.rating === 0 || attraction.rating) && (
  <div className="flex justify-center mt-1">
    <StarRating
      rating={attraction.rating || 4} // 💡 魔法在這裡：如果評分是 0、null 或 undefined，就直接帶入 4
      readonly={true}
      size="small"
      showNumber={false}
    />
  </div>
)}
                        {added && (
                          <span
                            className="text-xs mt-1 text-center block"
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
          className="w-1/3 flex flex-col px-4"
          style={{
    backgroundColor: 'var(--color-bg-card)',
    backdropFilter: 'blur(20px)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    padding: '24px 24px',
          }}
        >
          <div className="mb-6">
            <h2
              className="text-2xl w-19/20 font-bold mb-2 text-center"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-primary)',
                background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-primary-gold))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.05em',
                marginBottom: '16px', 
              }}
            >
              我的行程
            </h2>
          </div>

          {/* 行程列表 */}
          <div className="flex-1 overflow-y-auto">
            {itinerary.length === 0 ? (
              <div
                className="flex items-center justify-center h-full text-center"
                style={{ 
                  color: 'var(--color-text-secondary)',
                }}
              >
                <p>尚未加入景點<br />請從左側選擇景點</p>
              </div>
            ) : (
              <div className="space-y-4 ">
                {itinerary.map((item) => (
                  <div
                    key={item.id}
                    className="w-19/20 rounded-lg p-3 flex items-center gap-3"
                    style={{
                    // 💡 5. 將原本大盒子的「毛玻璃、精緻圓角與陰影」轉移到每個獨立的卡片上
                      backgroundColor: 'var(--color-bg-card)', 
                      backdropFilter: 'blur(20px)',
                      borderRadius: 'var(--radius-xl)',
                      boxShadow: 'var(--shadow-md)', // 使用中等陰影，層次更分明
                      marginBottom: '16px',
                      padding: '20px 20px',
                    }}
                  >
                    {/* 左側：順序數字 */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
                      style={{
                        backgroundColor: 'var(--color-primary-gold)',
                        color: 'white',
                        fontFamily: 'var(--font-primary)',
                      }}
                    >
                      {item.order}
                    </div>

                    {/* 中間：內容區域（上下兩排） */}
                    <div className="flex-1 min-w-0 flex flex-col gap-2 center">
                      {/* 上排：名字 + 評分 */}
                      <div className="flex items-center gap-2">
                        <h4
                          className="font-semibold truncate flex-1"
                          style={{
                            fontFamily: 'var(--font-secondary)',
                            color: 'var(--color-text-primary)',
                            fontSize: '18px',
                          }}
                        >
                          {item.title}
                        </h4>
                        <StarRating
                          rating={item.rating || 0}
                          readonly={true}
                          size="small"
                          showNumber={false}
                        />
                      </div>

                      {/* 下排：時間選擇 + 導覽員開關 */}
                      <div className="flex items-center gap-22">
                        {/* 時間選擇 */}
                        <CustomSelect
                          options={[
                            { value: 15, label: '15分' },
                            { value: 30, label: '30分' },
                            { value: 45, label: '45分' },
                            { value: 60, label: '60分' },
                            { value: 90, label: '90分' },
                            { value: 120, label: '120分' },
                          ]}
                          value={item.customDuration || item.estimatedDuration}
                          onChange={(value) => handleChangeDuration(item.id, Number(value))}
                        />

                        {/* 導覽員開關 */}
                        <div className="flex items-center gap-2">
                          <ToggleSwitch
                            checked={item.needsNarrator || false}
                            onChange={() => handleToggleNarrator(item.id)}
                            size="small"
                          />
                          <span
                            style={{
                              fontFamily: 'var(--font-secondary)',
                              fontSize: '18px',
                              color: 'var(--color-text-secondary)',
                            }}
                          >
                            導覽員
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 右側：刪除按鈕 */}
                    <button
                      onClick={() => handleRemoveAttraction(item.id)}
                      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                      style={{
                        color: 'var(--color-error)',
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                      }}
                    >
                      {/* 垃圾桶圖標 */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 底部按鈕 - 加高 */}
          <div className="flex gap-4 w-19/20"
            style={{
                marginTop: '16px',
              }}>
            <button
              onClick={onBack}
              className="flex-1 py-6 rounded-2xl text-xl font-semibold transition-all hover:scale-105"
              style={{
                fontFamily: 'var(--font-secondary)',
                backgroundColor: 'transparent',
                color: 'var(--color-text-secondary)',
                border: '3px solid var(--color-secondary-mist)',
                boxShadow: 'var(--shadow-md)',
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
      {selectedAttraction && (() => {
        // 檢查是否有媒體內容
        const hasImage = !mediaErrors.image && selectedAttraction.imageUrl;
        const hasVideo = !mediaErrors.video && selectedAttraction.videoUrl;
        const hasAudio = !mediaErrors.audio && selectedAttraction.audioUrl;

        // 只有當有圖片+影片，或全部三種時才撐滿高度
        // 其他情況（只有圖片、只有語音、圖片+語音）都縮小居中
        const shouldStretch = (hasImage && hasVideo) || (hasImage && hasVideo && hasAudio);

        return (
          <div
            className="absolute inset-0 z-50 flex items-center justify-center animate-modal-fade-in"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
            }}
            onClick={() => setSelectedAttraction(null)}
          >
            <div
              className="max-w-6xl w-full m-12 flex gap-6 items-center animate-modal-slide-up"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxHeight: '85vh',
              }}
            >
              {/* 左側：媒體區域 - 根據內容動態調整高度 */}
              <div
                className="flex-1 flex flex-col gap-4 overflow-y-auto"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xl)',
                  padding: 'var(--spacing-6)',
                  // 只有圖片+影片時才撐滿高度
                  height: shouldStretch ? 'auto' : 'fit-content',
                  alignSelf: shouldStretch ? 'stretch' : 'center',
                  maxHeight: shouldStretch ? '85vh' : '60vh',
                }}
              >
              {/* 圖片 */}
              {!mediaErrors.image && selectedAttraction.imageUrl && (
                <div className="w-full rounded-xl overflow-hidden">
                  <img
                    src={selectedAttraction.imageUrl}
                    alt={selectedAttraction.title}
                    className="w-full aspect-video object-cover"
                    onError={() => {
                      console.log('Image failed to load:', selectedAttraction.imageUrl);
                      setMediaErrors(prev => ({ ...prev, image: true }));
                    }}
                  />
                </div>
              )}

              {/* 影片 - 載入失敗則不顯示 */}
              {!mediaErrors.video && selectedAttraction.videoUrl && (
                <div className="w-full rounded-xl overflow-hidden">
                  <video
                    src={selectedAttraction.videoUrl}
                    controls
                    className="w-full aspect-video bg-black"
                    onError={(e) => {
                      console.log('Video failed to load:', selectedAttraction.videoUrl);
                      setMediaErrors(prev => ({ ...prev, video: true }));
                    }}
                    onLoadedMetadata={(e) => {
                      // 確認影片真的有內容
                      const video = e.currentTarget;
                      if (video.duration === 0 || isNaN(video.duration)) {
                        console.log('Video has no duration:', selectedAttraction.videoUrl);
                        setMediaErrors(prev => ({ ...prev, video: true }));
                      }
                    }}
                  />
                </div>
              )}

              {/* 語音 - 載入失敗則不顯示 */}
              {!mediaErrors.audio && selectedAttraction.audioUrl && (
                <div
                  className="w-full p-4 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(201, 168, 118, 0.1)',
                  }}
                >
                  <audio
                    src={selectedAttraction.audioUrl}
                    controls
                    className="w-full"
                    onError={(e) => {
                      console.log('Audio failed to load:', selectedAttraction.audioUrl);
                      setMediaErrors(prev => ({ ...prev, audio: true }));
                    }}
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

            {/* 右側：介紹 + 按鈕 - 固定高度 */}
            <div
              className="w-[450px] flex flex-col"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                padding: 'var(--spacing-8)',
                height: '70vh',
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

              {/* 固定高度的可滾動介紹區域 */}
              <div
                className="overflow-y-auto mb-6 pr-2"
                style={{
                  flex: '1 1 auto',
                  minHeight: 0,
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
        );
      })()}

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
    </KioskLayout>
  );
}
