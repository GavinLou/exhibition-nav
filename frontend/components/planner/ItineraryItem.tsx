"use client";

import { Clock, X, GripVertical } from "lucide-react";
import type { ItineraryItem as ItineraryItemType } from "@/types";

type ItineraryItemProps = {
  item: ItineraryItemType;
  onRemove: () => void;
};

const CATEGORY_COLORS: Record<string, string> = {
  entrance: "#22C55E",
  landmark: "#A855F7",
  facility: "#F59E0B",
  exit: "#EF4444",
};

export function ItineraryItem({ item, onRemove }: ItineraryItemProps) {
  const color = CATEGORY_COLORS[item.category] || "#64748B";

  return (
    <div className="group flex items-center gap-3 p-3 glass-subtle rounded-xl hover:border-[var(--color-accent)] transition-all">
      <div className="flex items-center gap-2">
        <GripVertical className="w-4 h-4 text-[var(--color-muted)] opacity-0 group-hover:opacity-100 cursor-grab" />
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {item.order}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-[var(--color-foreground)] truncate">
          {item.name}
        </p>
        <div className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
          <Clock className="w-3 h-3" />
          <span>{item.stayDuration} 分鐘</span>
        </div>
      </div>

      <button
        onClick={onRemove}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors touch-target"
        aria-label={`移除 ${item.name}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
