'use client';

import { useState } from 'react';
import { Clock, Trash2, GripVertical, User } from 'lucide-react';
import type { ItineraryItem, StepNumber } from '@/types/kiosk';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ItineraryPanelProps {
  items: ItineraryItem[];
  currentStep: StepNumber;
  onItemsChange: (items: ItineraryItem[]) => void;
  onNext: () => void;
  onExport?: () => void;
}

function SortableItem({ item, onDelete, onToggleGuide }: {
  item: ItineraryItem;
  onDelete: () => void;
  onToggleGuide: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const startTime = item.startTime || '10:00';
  const endTime = item.endTime || '10:20';

  return (
    <div ref={setNodeRef} style={style} className="flex gap-2 mb-2">
      {/* 序號和連接線 */}
      <div className="flex flex-col items-center w-9">
        <div className="w-7 h-7 rounded-full bg-[#2E7D32] flex items-center justify-center">
          <span className="text-white text-xs font-bold">{item.sequenceOrder}</span>
        </div>
        <div className="w-0.5 h-14 bg-[#2E7D32]" />
      </div>

      {/* 內容 */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[#212121] font-bold text-sm">{item.title}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleGuide}
              className={`p-1 rounded transition-colors ${
                item.isGuide ? 'bg-[#2E7D32] text-white' : 'text-[#616161] hover:bg-gray-200'
              }`}
              title={item.isGuide ? '已安排導覽員' : '安排導覽員'}
            >
              <User className="w-3 h-3" />
            </button>
            <button
              onClick={onDelete}
              className="p-1 text-[#616161] hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
            <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1">
              <GripVertical className="w-3 h-3 text-[#616161]" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#212121]">停留 {item.suggestedStayMinutes} 分</span>
          <span className="text-[#616161]">{startTime} - {endTime}</span>
        </div>
      </div>
    </div>
  );
}

export default function ItineraryPanel({
  items,
  currentStep,
  onItemsChange,
  onNext,
  onExport,
}: ItineraryPanelProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
        ...item,
        sequenceOrder: index + 1,
      }));

      onItemsChange(newItems);
    }
  };

  const handleDelete = (id: string) => {
    const newItems = items
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, sequenceOrder: index + 1 }));
    onItemsChange(newItems);
  };

  const handleToggleGuide = (id: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, isGuide: !item.isGuide } : item
    );
    onItemsChange(newItems);
  };

  const getButtonText = () => {
    if (currentStep === 1) return '下一步';
    if (currentStep === 2 || currentStep === 3) return '新增景點';
    return '輸出行程';
  };

  const isButtonDisabled = () => {
    if (currentStep === 1) return items.length === 0;
    return false;
  };

  return (
    <div className="absolute right-[75px] top-[173px] w-[388px] h-[774px] z-10">
      <div className="glass w-full h-full rounded-[32px] relative bg-white/60 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/5 rounded-[32px]" />

        {/* 標題 */}
        <h2 className="absolute top-8 left-0 right-0 text-center text-[#212121] text-[22px] font-bold">
          行程
        </h2>

        {/* 行程列表 */}
        <div className="absolute top-20 left-5 right-5 bottom-24 overflow-y-auto pr-2">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full text-[#616161] text-center px-4">
              請在左邊選擇一個主題
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {items.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    onDelete={() => handleDelete(item.id)}
                    onToggleGuide={() => handleToggleGuide(item.id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* 底部按鈕 */}
        <button
          onClick={currentStep === 4 ? onExport : onNext}
          disabled={isButtonDisabled()}
          className="absolute bottom-[28px] left-5 right-5 h-12 bg-[#2E7D32] rounded-3xl flex items-center justify-center text-white font-bold text-lg transition-all disabled:opacity-10 hover:bg-[#1B5E20]"
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}
