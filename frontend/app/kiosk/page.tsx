'use client';

import { useState } from 'react';
import { LayoutDashboard, Building2, Landmark, ShoppingBag, Settings } from 'lucide-react';
import type { StepNumber, ItineraryItem, LanguageType } from '@/types/kiosk';
import Step1SelectTheme from '@/components/kiosk/Step1SelectTheme';
import Step2ViewRoute from '@/components/kiosk/Step2ViewRoute';
import Step3Search from '@/components/kiosk/Step3Search';
import Step4Confirm from '@/components/kiosk/Step4Confirm';
import LeftNavigation from '@/components/kiosk/LeftNavigation';
import ItineraryPanel from '@/components/kiosk/ItineraryPanel';
import TopBar from '@/components/kiosk/TopBar';

export default function KioskPage() {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [language, setLanguage] = useState<LanguageType>('zh_TW');
  const [isAccessible, setIsAccessible] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  // 切換步驟（帶淡入淡出動畫）
  const goToStep = (step: StepNumber) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsTransitioning(false);
    }, 500); // 0.5s 淡出時間
  };

  // 處理主題選擇
  const handleThemeSelect = (themeId: string, items: ItineraryItem[]) => {
    setSelectedThemeId(themeId);
    setItineraryItems(items);
  };

  // 處理行程項目更新
  const handleItemsChange = (items: ItineraryItem[]) => {
    setItineraryItems(items);
  };

  // 處理新增景點
  const handleAddItem = (item: ItineraryItem) => {
    setItineraryItems([...itineraryItems, { ...item, sequenceOrder: itineraryItems.length + 1 }]);
  };

  // 處理輸出行程（顯示 QR Code）
  const handleExportItinerary = () => {
    setShowQRCode(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 背景圖片 + 漸層遮罩 */}
      <div className="absolute inset-0 bg-overlay">
        <img
          src="/images/kiosk/pic_A12-00224_10.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 頂部 Logo 和控制 */}
      <TopBar
        language={language}
        isAccessible={isAccessible}
        onLanguageChange={setLanguage}
        onAccessibleChange={setIsAccessible}
      />

      {/* 左側步驟導航 */}
      <LeftNavigation currentStep={currentStep} onStepChange={goToStep} />

      {/* 中間內容區域 - 增加間距 */}
      <div className="absolute left-[144px] top-[173px] w-[1200px] h-[774px]">
        {/* Step 1 */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentStep === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Step1SelectTheme
            onSelectTheme={handleThemeSelect}
            onNext={() => goToStep(2)}
            selectedThemeId={selectedThemeId}
          />
        </div>

        {/* Step 2 */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentStep === 2 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Step2ViewRoute
            items={itineraryItems}
            onNext={() => goToStep(3)}
          />
        </div>

        {/* Step 3 */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentStep === 3 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Step3Search
            onAddItem={handleAddItem}
            onNext={() => goToStep(4)}
          />
        </div>

        {/* Step 4 */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentStep === 4 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Step4Confirm
            items={itineraryItems}
            showQRCode={showQRCode}
            onCloseQRCode={() => setShowQRCode(false)}
          />
        </div>
      </div>

      {/* 右側行程面板 - 向右移動增加間距 */}
      <ItineraryPanel
        items={itineraryItems}
        currentStep={currentStep}
        onItemsChange={handleItemsChange}
        onNext={() => goToStep(Math.min(4, currentStep + 1) as StepNumber)}
        onExport={handleExportItinerary}
      />
    </div>
  );
}
