"use client";

import { MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 px-6 flex items-center justify-between glass border-b border-[var(--color-glass-border)] rounded-none">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] flex items-center justify-center">
          <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
        </div>
        <div>
          <h1 className="text-lg font-bold gradient-text">佛陀紀念館</h1>
          <p className="text-xs text-[var(--color-muted)]">智慧導覽系統</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-[var(--color-muted)]">歡迎蒞臨</p>
          <p className="text-xs text-[var(--color-muted)]">
            {new Date().toLocaleDateString("zh-TW", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </header>
  );
}
