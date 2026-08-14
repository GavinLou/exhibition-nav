"use client";

import { useState } from "react";
import { Clock, Footprints, MapPin, ChevronUp, ChevronDown } from "lucide-react";
import { usePanelAnimation } from "@/hooks/usePanelAnimation";

type StatsPanelProps = {
  totalTime: number;
  totalDistance: number;
  poiCount: number;
};

export function StatsPanel({ totalTime, totalDistance, poiCount }: StatsPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const panelRef = usePanelAnimation<HTMLDivElement>(isOpen, "y");

  const stats = [
    {
      icon: Clock,
      label: "預估時間",
      value: `${totalTime} 分鐘`,
      color: "#059669",
    },
    {
      icon: Footprints,
      label: "步行距離",
      value: `${totalDistance} 公尺`,
      color: "#D97706",
    },
    {
      icon: MapPin,
      label: "景點數量",
      value: `${poiCount} 個`,
      color: "#8B5CF6",
    },
  ];

  return (
    <div
      ref={panelRef}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40"
      style={{ transform: "translateX(-50%) translateY(0)" }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full
          w-16 h-8 rounded-t-xl
          glass flex items-center justify-center
          text-[var(--color-muted)] hover:text-[var(--color-foreground)]
          transition-colors
        "
      >
        {isOpen ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </button>

      <div className="glass rounded-t-2xl px-8 py-4">
        <div className="flex items-center gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-xs text-[var(--color-muted)]">{stat.label}</p>
                <p className="text-lg font-bold text-[var(--color-foreground)]">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
