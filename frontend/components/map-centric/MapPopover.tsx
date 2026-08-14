"use client";

import { X, Plus, MapPin, Clock } from "lucide-react";
import type { MapMarkerData } from "@/types";

type MapPopoverProps = {
  marker: MapMarkerData;
  isInItinerary: boolean;
  onClose: () => void;
  onAddToItinerary: () => void;
};

export function MapPopover({
  marker,
  isInItinerary,
  onClose,
  onAddToItinerary,
}: MapPopoverProps) {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="
          relative z-10 w-full max-w-md mx-4
          glass rounded-2xl overflow-hidden
          animate-in fade-in zoom-in-95 duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video bg-[var(--color-surface)] relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center">
            <span className="text-6xl opacity-30">🏛️</span>
          </div>

          <button
            onClick={onClose}
            className="
              absolute top-3 right-3
              w-10 h-10 rounded-full
              bg-black/50 backdrop-blur-sm
              flex items-center justify-center
              text-white hover:bg-black/70
              transition-colors
            "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold text-[var(--color-foreground)]">
            {marker.name}
          </h2>

          <div className="flex flex-wrap gap-3 mt-2 text-sm text-[var(--color-muted)]">
            {marker.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{marker.location}</span>
              </div>
            )}
            {marker.hours && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{marker.hours}</span>
              </div>
            )}
          </div>

          <p className="mt-3 text-[var(--color-foreground)]/80 leading-relaxed">
            {marker.description}
          </p>

          <button
            onClick={onAddToItinerary}
            disabled={isInItinerary}
            className={`
              w-full mt-5 py-3 px-4 rounded-xl
              flex items-center justify-center gap-2
              font-medium transition-all duration-200
              ${
                isInItinerary
                  ? "bg-[var(--color-surface)] text-[var(--color-muted)] cursor-not-allowed"
                  : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] active:scale-[0.98]"
              }
            `}
          >
            <Plus className="w-5 h-5" />
            {isInItinerary ? "已加入行程" : "加入行程"}
          </button>
        </div>
      </div>
    </div>
  );
}
