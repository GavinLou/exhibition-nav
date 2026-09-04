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
  const handleStep3Confirm = (bookingInfo: BookingInfo) => {
    console.log('預約資訊:', bookingInfo);
    console.log('行程:', itinerary);

    // 這裡可以：
    // 1. 發送到後端 API 儲存預約
    // 2. 生成 QR Code
    // 3. 顯示完成頁面

    alert('預約成功！\n\n團體/姓名：' + bookingInfo.groupName + '\n人數：' + bookingInfo.numberOfPeople);

    // 重置回第一步
    setCurrentStep(1);
    setSelectedThemeId('');
    setSelectedThemeTitle('');
    setItinerary([]);
  };

  const handleStep3Back = () => {
    setCurrentStep(2);
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
          onBack={handleStep3Back}
          onConfirm={handleStep3Confirm}
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
