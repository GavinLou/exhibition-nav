"use client";

import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { GlassCard } from "@/components/ui";
import { ExplorePanel } from "./ExplorePanel";
import { EXPLORE_CATEGORIES, EXPLORE_ITEMS } from "@/lib/mockData";
import type { ExploreCategory, ExploreItem, ExploreCategoryInfo } from "@/types";

type ExploreSidebarProps = {
  onAddToItinerary: (poiId: number) => void;
};

export function ExploreSidebar({ onAddToItinerary }: ExploreSidebarProps) {
  const [activeCategory, setActiveCategory] = useState<ExploreCategory | null>(
    null
  );
  const [items, setItems] = useState<ExploreItem[]>([]);

  useEffect(() => {
    if (activeCategory) {
      setItems(EXPLORE_ITEMS.filter((item) => item.category === activeCategory));
    }
  }, [activeCategory]);

  const activeCategoryInfo = EXPLORE_CATEGORIES.find(
    (c) => c.id === activeCategory
  );

  return (
    <div className="mt-4">
      <h2 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider px-1 mb-3">
        探索更多
      </h2>

      {!activeCategory ? (
        <div className="grid grid-cols-5 gap-2">
          {EXPLORE_CATEGORIES.map((category) => {
            const IconComponent =
              (LucideIcons[category.icon as keyof typeof LucideIcons] as React.FC<{
                className?: string;
              }>) || LucideIcons.Info;

            return (
              <GlassCard
                key={category.id}
                variant="subtle"
                hover
                onClick={() => setActiveCategory(category.id)}
                className="p-3 flex flex-col items-center gap-2"
              >
                <IconComponent className="w-5 h-5 text-[var(--color-accent)]" />
                <span className="text-[10px] text-[var(--color-muted)] text-center leading-tight">
                  {category.name}
                </span>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <ExplorePanel
          category={activeCategoryInfo!}
          items={items}
          onClose={() => setActiveCategory(null)}
          onAddToItinerary={onAddToItinerary}
        />
      )}
    </div>
  );
}
