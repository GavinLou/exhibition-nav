"use client";

import { Route, Trash2 } from "lucide-react";
import { GlassCard, TouchButton } from "@/components/ui";
import { ItineraryItem } from "./ItineraryItem";
import { QRCodeButton } from "./QRCodeButton";
import type { ItineraryItem as ItineraryItemType } from "@/types";

type ItineraryPanelProps = {
  items: ItineraryItemType[];
  onRemoveItem: (poiId: number) => void;
  onClearAll: () => void;
};

export function ItineraryPanel({
  items,
  onRemoveItem,
  onClearAll,
}: ItineraryPanelProps) {
  return (
    <div className="h-full flex flex-col gap-4">
      <GlassCard className="flex-1 p-4 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Route className="w-5 h-5 text-[var(--color-accent)]" />
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
              我的行程
            </h2>
            {items.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
                {items.length}
              </span>
            )}
          </div>

          {items.length > 0 && (
            <TouchButton
              variant="ghost"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={onClearAll}
            >
              清除
            </TouchButton>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[var(--color-muted)] py-12">
              <Route className="w-12 h-12 mb-4 opacity-30" />
              <p className="text-sm">尚未規劃行程</p>
              <p className="text-xs mt-1">
                選擇左側主題，或點擊地圖上的景點
              </p>
            </div>
          ) : (
            items.map((item) => (
              <ItineraryItem
                key={item.poiId}
                item={item}
                onRemove={() => onRemoveItem(item.poiId)}
              />
            ))
          )}
        </div>
      </GlassCard>

      <QRCodeButton items={items} />
    </div>
  );
}
