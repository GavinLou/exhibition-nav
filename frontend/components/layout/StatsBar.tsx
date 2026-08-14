"use client";

import {
  Clock,
  Footprints,
  MapPin,
  Coffee,
  Star,
  Accessibility,
  TrendingDown,
} from "lucide-react";
import { Toggle } from "@/components/ui";
import type { ItineraryStats } from "@/types";

type StatsBarProps = {
  stats: ItineraryStats;
  accessibilityMode: boolean;
  shortWalkMode: boolean;
  onAccessibilityChange: (value: boolean) => void;
  onShortWalkChange: (value: boolean) => void;
};

export function StatsBar({
  stats,
  accessibilityMode,
  shortWalkMode,
  onAccessibilityChange,
  onShortWalkChange,
}: StatsBarProps) {
  const statItems = [
    {
      icon: Clock,
      label: "總時間",
      value: `${stats.totalTime} 分鐘`,
      color: "var(--color-accent)",
    },
    {
      icon: Footprints,
      label: "步行距離",
      value: `${stats.totalDistance} m`,
      color: "var(--color-accent-secondary)",
    },
    {
      icon: MapPin,
      label: "景點數",
      value: `${stats.poiCount} 個`,
      color: "var(--color-success)",
    },
    {
      icon: Coffee,
      label: "休息點",
      value: `${stats.restStops} 處`,
      color: "var(--color-warning)",
    },
    {
      icon: Star,
      label: "適合度",
      value: `${stats.rating.toFixed(1)} ★`,
      color: "#EAB308",
    },
  ];

  return (
    <div className="h-20 px-6 flex items-center justify-between glass border-t border-[var(--color-glass-border)] rounded-none">
      <div className="flex items-center gap-8">
        {statItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted)]">{item.label}</p>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-[var(--color-muted)]" />
          <Toggle
            checked={shortWalkMode}
            onChange={onShortWalkChange}
            label="少走路模式"
          />
        </div>
        <div className="flex items-center gap-2">
          <Accessibility className="w-4 h-4 text-[var(--color-muted)]" />
          <Toggle
            checked={accessibilityMode}
            onChange={onAccessibilityChange}
            label="無障礙模式"
          />
        </div>
      </div>
    </div>
  );
}
