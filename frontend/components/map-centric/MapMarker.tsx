"use client";

import type { MapMarkerData } from "@/types";
import { CATEGORIES } from "@/lib/apiService";

type MapMarkerProps = {
  marker: MapMarkerData;
  isInItinerary?: boolean;
  itineraryOrder?: number;
  onClick: () => void;
};

export function MapMarker({
  marker,
  isInItinerary = false,
  itineraryOrder,
  onClick,
}: MapMarkerProps) {
  const categoryInfo = CATEGORIES.find((c) => c.id === marker.category);
  const color = categoryInfo?.color || "#059669";

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            text-white font-bold text-sm
            shadow-lg transition-all duration-200
            group-hover:scale-110
            ${isInItinerary ? "ring-2 ring-white ring-offset-2 ring-offset-transparent" : ""}
          `}
          style={{
            backgroundColor: isInItinerary ? "var(--color-primary)" : color,
            boxShadow: `0 4px 12px ${color}40`,
          }}
        >
          {isInItinerary && itineraryOrder ? itineraryOrder : "●"}
        </div>

        <div
          className="
            px-2 py-1 rounded-md text-sm font-medium
            bg-[var(--color-glass)] backdrop-blur-sm
            border border-[var(--color-glass-border)]
            text-[var(--color-foreground)]
            whitespace-nowrap
            opacity-90 group-hover:opacity-100
            transition-opacity duration-200
          "
        >
          {marker.name}
        </div>
      </div>
    </div>
  );
}
