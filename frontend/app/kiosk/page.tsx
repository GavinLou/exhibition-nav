'use client';

import { useState } from 'react';
import Step1SelectTheme from '@/components/kiosk/Step1SelectTheme';
import Step2AddAttractions from '@/components/kiosk/Step2AddAttractions';
import Step3ConfirmItinerary from '@/components/kiosk/Step3ConfirmItinerary';
import '@/styles/design-tokens.css';

type StepNumber = 1 | 2 | 3;

interface ItineraryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  estimatedDuration: number;
  customDuration?: number;
  needsNarrator?: boolean;
  order: number;
  rating: number;
  latitude: number;
  longitude: number;
  translations: {
    zh_TW: {
      title: string;
      description: string;
    };
  };
}

interface BookingInfo {
  groupName: string;
  numberOfPeople: number;
  needsNarrator: boolean;
  hasDisabilities: boolean;
  startTime: string;
}

export default function KioskPage() {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [selectedThemeId, setSelectedThemeId] = useState<string>('');
  const [selectedThemeTitle, setSelectedThemeTitle] = useState<string>('');
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  // Step 1 -> Step 2
  const handleSelectTheme = (themeId: string, themeTitle: string) => {
    setSelectedThemeId(themeId);
    setSelectedThemeTitle(themeTitle);
  };

  const handleStep1Next = () => {
    setCurrentStep(2);
  };

  // Step 2 -> Step 3
  const handleStep2Next = (selectedItinerary: any[]) => {
    setItinerary(selectedItinerary);
    setCurrentStep(3);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  // Step 3 -> Complete
  const handleStep3Confirm = async (bookingInfo: any) => {
    console.log('預約資訊:', bookingInfo);

    try {
      // 儲存到資料庫
      const today = new Date();
      const visitDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

      const itineraryData = {
        total_participants: bookingInfo.numberOfPeople,
        visit_date: visitDate,
        title: `${selectedThemeTitle}_${bookingInfo.groupName}`,
        theme_title: selectedThemeTitle,
        start_hour: bookingInfo.startHour,
        start_minute: bookingInfo.startMinute,
        qr_code: bookingInfo.qrCode || '',
        walk_times: bookingInfo.segmentWalkTimes || [],
        items: (bookingInfo.itinerary || []).map((item: any, index: number) => ({
          target_id: item.id,
          duration: item.customDuration || item.estimatedDuration || 30,
          sequence_order: index + 1,
          is_guide: item.needsNarrator || false
        }))
      };

      console.log('送出資料:', itineraryData);

      const response = await fetch('/api/itinerary/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itineraryData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('預約成功儲存到資料庫:', result);
      } else {
        const errorText = await response.text();
        console.error('儲存失敗:', errorText);
        alert('儲存失敗: ' + errorText);
      }
    } catch (error) {
      console.error('儲存預約時發生錯誤:', error);
      alert('儲存預約時發生錯誤: ' + error);
    }

    // QR Code 已經在 Dialog 中顯示
    // 不需要 alert，讓用戶看完 QR Code 後自行關閉
  };

  const handleStep3Back = (updatedItinerary?: ItineraryItem[]) => {
    // 如果 Step3 有修改行程(拖動順序、修改時間等),更新 state
    if (updatedItinerary) {
      setItinerary(updatedItinerary);
    }
    setCurrentStep(2);
  };

  const handleComplete = () => {
    // 重置所有狀態，回到第一步驟
    setCurrentStep(1);
    setSelectedThemeId('');
    setSelectedThemeTitle('');
    setItinerary([]);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Step 1: 選擇主題 */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          currentStep === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Step1SelectTheme
          onSelectTheme={handleSelectTheme}
          onNext={handleStep1Next}
        />
      </div>

      {/* Step 2: 新增景點 */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          currentStep === 2 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {selectedThemeId && (
          <Step2AddAttractions
            themeId={selectedThemeId}
            themeTitle={selectedThemeTitle}
            initialItinerary={itinerary.length > 0 ? itinerary : undefined}
            onNext={handleStep2Next}
            onBack={handleStep2Back}
          />
        )}
      </div>

      {/* Step 3: 確認行程 */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          currentStep === 3 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Step3ConfirmItinerary
          itinerary={itinerary}
          themeTitle={selectedThemeTitle}
          onBack={handleStep3Back}
          onConfirm={handleStep3Confirm}
          onComplete={handleComplete}
        />
      </div>

      {/* 步驟指示器 - 往左移動 */}
      <div
        className="absolute top-8 right-32 z-20 flex gap-3"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          backdropFilter: 'blur(20px)',
          padding: 'var(--spacing-4)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className="flex items-center gap-2"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all"
              style={{
                backgroundColor:
                  currentStep === step
                    ? 'var(--color-primary-gold)'
                    : currentStep > step
                    ? 'var(--color-secondary-sage)'
                    : 'var(--color-secondary-mist)',
                color: currentStep >= step ? 'white' : 'var(--color-text-secondary)',
              }}
            >
              {currentStep > step ? '✓' : step}
            </div>
            <span
              className="font-semibold"
              style={{
                fontFamily: 'var(--font-secondary)',
                color:
                  currentStep === step
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-secondary)',
              }}
            >
              {step === 1 && '選擇主題'}
              {step === 2 && '新增景點'}
              {step === 3 && '確認行程'}
            </span>
            {step < 3 && (
              <div
                className="w-8 h-0.5 mx-2"
                style={{
                  backgroundColor:
                    currentStep > step
                      ? 'var(--color-secondary-sage)'
                      : 'var(--color-secondary-mist)',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
