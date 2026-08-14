"use client";

import * as LucideIcons from "lucide-react";
import { CATEGORIES } from "@/lib/apiService";
import type { MarkerCategory } from "@/types";

type SidebarNavProps = {
  activeCategory: MarkerCategory;
  onSelectCategory: (category: MarkerCategory) => void;
};

export function SidebarNav({ activeCategory, onSelectCategory }: SidebarNavProps) {
  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <div className="glass rounded-2xl p-2 flex flex-col gap-2">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          const IconComponent =
            (LucideIcons[category.icon as keyof typeof LucideIcons] as React.FC<{
              className?: string;
            }>) || LucideIcons.Circle;

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                relative w-14 h-14 rounded-xl
                flex flex-col items-center justify-center gap-1
                transition-all duration-200
                touch-target
                ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white shadow-lg"
                    : "text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-white/5"
                }
              `}
              style={{
                boxShadow: isActive ? `0 4px 16px ${category.color}40` : undefined,
              }}
              title={category.name}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-[10px] font-medium">{category.name}</span>

              {isActive && (
                <div
                  className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
