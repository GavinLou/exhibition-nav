'use client';

import { LayoutDashboard, Map, Search, CheckCircle } from 'lucide-react';
import type { StepNumber } from '@/types/kiosk';

interface LeftNavigationProps {
  currentStep: StepNumber;
  onStepChange: (step: StepNumber) => void;
}

const steps = [
  { number: 1 as StepNumber, icon: LayoutDashboard, label: '選擇主題' },
  { number: 2 as StepNumber, icon: Map, label: '查看路線' },
  { number: 3 as StepNumber, icon: Search, label: '搜尋景點' },
  { number: 4 as StepNumber, icon: CheckCircle, label: '確認輸出' },
];

export default function LeftNavigation({ currentStep, onStepChange }: LeftNavigationProps) {
  return (
    <div className="absolute left-[62px] top-[390px] z-20">
      {/* 移除 overflow，避免 scrollbar，加深顏色 */}
      <div className="glass w-[68px] h-auto rounded-full p-[10px] flex flex-col gap-[10px] bg-black/30 backdrop-blur-xl">
        {steps.map(({ number, icon: Icon }) => (
          <button
            key={number}
            onClick={() => onStepChange(number)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              currentStep === number
                ? 'bg-white/50 shadow-lg'
                : 'hover:bg-white/20'
            }`}
          >
            <Icon className="w-6 h-6 text-white" />
          </button>
        ))}
      </div>


    </div>
  );
}
