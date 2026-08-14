"use client";

import { ThemeCard } from "./ThemeCard";
import type { Theme } from "@/types";

type ThemeGridProps = {
  themes: Theme[];
  activeThemeId: string | null;
  onSelectTheme: (theme: Theme) => void;
};

export function ThemeGrid({
  themes,
  activeThemeId,
  onSelectTheme,
}: ThemeGridProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider px-1">
        主題遊程
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isActive={theme.id === activeThemeId}
            onSelect={() => onSelectTheme(theme)}
          />
        ))}
      </div>
    </div>
  );
}
