"use client";

import { Plus, MapPin, Clock } from "lucide-react";
import { GlassCard } from "@/components/ui";
import type { ExploreItem } from "@/types";

type ContentCardProps = {
  item: ExploreItem;
  onAddToItinerary?: () => void;
};

export function ContentCard({ item, onAddToItinerary }: ContentCardProps) {
  return (
    <GlassCard className="p-4 flex flex-col h-full" hover>
      <div className="aspect-video rounded-lg bg-[var(--color-secondary)] mb-3 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-secondary)]/20 flex items-center justify-center">
          <span className="text-4xl opacity-30">🏛️</span>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-[var(--color-foreground)]">
              {item.title}
            </h3>
            <p className="text-sm text-[var(--color-accent)]">{item.subtitle}</p>
          </div>

          {item.poiId && onAddToItinerary && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToItinerary();
              }}
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--color-accent)]/20 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors touch-target flex-shrink-0"
              aria-label={`將 ${item.title} 加入行程`}
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        <p className="text-sm text-[var(--color-muted)] mt-2 line-clamp-2">
          {item.description}
        </p>

        {(item.location || item.hours) && (
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-[var(--color-muted)]">
            {item.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{item.location}</span>
              </div>
            )}
            {item.hours && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{item.hours}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
