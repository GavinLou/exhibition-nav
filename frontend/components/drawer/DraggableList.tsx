"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, Clock } from "lucide-react";
import type { MapMarkerData } from "@/types";

type ItineraryItemData = {
  id: string;
  name: string;
  order: number;
};

type DraggableListProps = {
  items: ItineraryItemData[];
  markers: MapMarkerData[];
  onReorder: (items: ItineraryItemData[]) => void;
  onRemove: (id: string) => void;
};

function SortableItem({
  item,
  onRemove,
}: {
  item: ItineraryItemData;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-3 p-3 rounded-xl
        bg-[var(--color-surface)] border border-[var(--color-border)]
        ${isDragging ? "shadow-lg" : ""}
      `}
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none text-[var(--color-muted)] hover:text-[var(--color-foreground)] cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-[var(--color-primary)] text-white"
      >
        {item.order}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-[var(--color-foreground)] truncate">
          {item.name}
        </p>
        <div className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
          <Clock className="w-3 h-3" />
          <span>15 分鐘</span>
        </div>
      </div>

      <button
        onClick={onRemove}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function DraggableList({
  items,
  onReorder,
  onRemove,
}: DraggableListProps) {
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

      const newItems = arrayMove(items, oldIndex, newIndex).map((item, i) => ({
        ...item,
        order: i + 1,
      }));

      onReorder(newItems);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              onRemove={() => onRemove(item.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
