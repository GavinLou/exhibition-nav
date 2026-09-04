'use client';

import { useState } from 'react';
import StarRating from '@/components/ui/StarRating';
import CustomSelect from '@/components/ui/CustomSelect';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import '@/styles/design-tokens.css';

interface DraggableItineraryItemProps {
  item: {
    id: string;
    order: number;
    title: string;
    rating: number;
    estimatedDuration: number;
    customDuration?: number;
    needsNarrator?: boolean;
  };
  onDurationChange: (id: string, duration: number) => void;
  onToggleNarrator: (id: string) => void;
  onRemove: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragOver: (index: number) => void;
  onDragEnd: () => void;
  index: number;
}

export default function DraggableItineraryItem({
  item,
  onDurationChange,
  onToggleNarrator,
  onRemove,
  onDragStart,
  onDragOver,
  onDragEnd,
  index,
}: DraggableItineraryItemProps) {
  const [isDragging, setIsDragging] = useState(false);

  const durationOptions = [
    { value: 15, label: '15分' },
    { value: 30, label: '30分' },
    { value: 45, label: '45分' },
    { value: 60, label: '60分' },
    { value: 90, label: '90分' },
    { value: 120, label: '120分' },
  ];

  return (
    <div
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
        onDragStart(index);
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        onDragOver(index);
      }}
      onDragEnd={() => {
        setIsDragging(false);
        onDragEnd();
      }}
      className="w-19/20 rounded-lg p-3 flex items-center gap-3"
      style={{
        backgroundColor: isDragging
          ? 'rgba(201, 168, 118, 0.2)'
          : 'rgba(255, 255, 255, 0.5)',
        minHeight: '80px',
        opacity: isDragging ? 0.5 : 1,
        border: isDragging ? '2px dashed var(--color-primary-gold)' : 'none',
        marginBottom: '16px',
        padding: '20px 20px',
      }}
    >
      {/* 拖動手柄 */}
      <div
        className="flex-shrink-0 cursor-move"
        style={{
          color: 'var(--color-text-secondary)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="8" y1="6" x2="8" y2="6.01" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="6" x2="16" y2="6.01" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="12" x2="8" y2="12.01" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="12" x2="16" y2="12.01" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="18" x2="8" y2="18.01" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="18" x2="16" y2="18.01" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

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

      {/* 中間：內容區域 */}
      <div className="flex-1 min-w-0 flex flex-col gap-2 center">
        {/* 上排：名字 + 評分 */}
        <div className="flex items-center gap-2">
          <h4
            className="font-semibold truncate flex-1"
            style={{
              fontFamily: 'var(--font-secondary)',
              color: 'var(--color-text-primary)',
              fontSize: '15px',
            }}
          >
            {item.title}
          </h4>
          <StarRating
            rating={item.rating}
            readonly={true}
            size="small"
            showNumber={false}
          />
        </div>

        {/* 下排：時間 + 導覽員 */}
        <div className="flex items-center gap-14">
          <CustomSelect
            options={durationOptions}
            value={item.customDuration || item.estimatedDuration}
            onChange={(val) => onDurationChange(item.id, Number(val))}
          />

          <div className="flex items-center gap-2">
            <ToggleSwitch
              checked={item.needsNarrator || false}
              onChange={() => onToggleNarrator(item.id)}
              size="small"
            />
            <span
              style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: '12px',
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
        onClick={() => onRemove(item.id)}
         className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
        style={{
          color: 'var(--color-error)',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
        }}
      >
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
  );
}
