"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { StatsBar } from "./StatsBar";
import type { ItineraryStats } from "@/types";

type DashboardShellProps = {
  leftPanel: ReactNode;
  centerContent: ReactNode;
  rightPanel: ReactNode;
  stats: ItineraryStats;
  accessibilityMode: boolean;
  shortWalkMode: boolean;
  onAccessibilityChange: (value: boolean) => void;
  onShortWalkChange: (value: boolean) => void;
};

export function DashboardShell({
  leftPanel,
  centerContent,
  rightPanel,
  stats,
  accessibilityMode,
  shortWalkMode,
  onAccessibilityChange,
  onShortWalkChange,
}: DashboardShellProps) {
  return (
    <div className="h-screen flex flex-col bg-[var(--color-background)]">
      <Header />

      <main className="flex-1 flex overflow-hidden">
        <aside className="w-[300px] flex-shrink-0 p-4 overflow-y-auto">
          {leftPanel}
        </aside>

        <section className="flex-1 p-4 overflow-hidden">
          {centerContent}
        </section>

        <aside className="w-[340px] flex-shrink-0 p-4 overflow-y-auto">
          {rightPanel}
        </aside>
      </main>

      <StatsBar
        stats={stats}
        accessibilityMode={accessibilityMode}
        shortWalkMode={shortWalkMode}
        onAccessibilityChange={onAccessibilityChange}
        onShortWalkChange={onShortWalkChange}
      />
    </div>
  );
}
