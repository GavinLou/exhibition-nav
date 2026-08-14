"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { GlassCard } from "@/components/ui";
import { ContentCard } from "./ContentCard";
import type { ExploreItem, ExploreCategoryInfo } from "@/types";

type ExplorePanelProps = {
  category: ExploreCategoryInfo;
  items: ExploreItem[];
  onClose: () => void;
  onAddToItinerary: (poiId: number) => void;
};

export function ExplorePanel({
  category,
  items,
  onClose,
  onAddToItinerary,
}: ExplorePanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <GlassCard className="h-full flex flex-col animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-glass-border)]">
        <h2 className="text-lg font-semibold gradient-text">{category.name}</h2>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-white/5 transition-colors touch-target"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--color-foreground)] hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--color-foreground)] hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 p-4 overflow-x-auto scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-[280px] flex-shrink-0"
              style={{ scrollSnapAlign: "start" }}
            >
              <ContentCard
                item={item}
                onAddToItinerary={
                  item.poiId ? () => onAddToItinerary(item.poiId!) : undefined
                }
              />
            </div>
          ))}

          {items.length === 0 && (
            <div className="w-full text-center text-[var(--color-muted)] py-12">
              <p>暫無資料</p>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
