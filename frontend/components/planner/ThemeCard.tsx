"use client";

import * as LucideIcons from "lucide-react";
import { GlassCard } from "@/components/ui";
import type { Theme } from "@/types";

type ThemeCardProps = {
  theme: Theme;
  isActive: boolean;
  onSelect: () => void;
};

export function ThemeCard({ theme, isActive, onSelect }: ThemeCardProps) {
  const IconComponent =
    (LucideIcons[theme.icon as keyof typeof LucideIcons] as React.FC<{
      className?: string;
    }>) || LucideIcons.Map;

  const difficultyLabels = ["輕鬆", "適中", "挑戰"];

  return (
    <GlassCard
      variant={isActive ? "gradient" : "subtle"}
      hover
      onClick={onSelect}
      className={`p-4 ${isActive ? "animate-pulse-glow" : ""}`}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${theme.color}20` }}
        >
          <IconComponent
            className="w-6 h-6"
            style={{ color: theme.color }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-base truncate ${
              isActive ? "gradient-text" : "text-[var(--color-foreground)]"
            }`}
          >
            {theme.name}
          </h3>
          <p className="text-xs text-[var(--color-muted)] mt-0.5 line-clamp-2">
            {theme.description}
          </p>

          <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-muted)]">
            <span>{theme.duration} 分鐘</span>
            <span>·</span>
            <span>{theme.distance}m</span>
            <span>·</span>
            <span
              className="px-1.5 py-0.5 rounded text-[10px]"
              style={{
                backgroundColor: `${theme.color}20`,
                color: theme.color,
              }}
            >
              {difficultyLabels[theme.difficulty - 1]}
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
