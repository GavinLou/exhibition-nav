"use client";

import { useState, useCallback, useMemo } from "react";
import type { ItineraryItem, ItineraryStats, Poi } from "@/types";

const DEFAULT_STAY_DURATION: Record<string, number> = {
  entrance: 5,
  landmark: 20,
  facility: 30,
  exit: 5,
};

export function useItinerary(pois: Poi[]) {
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [shortWalkMode, setShortWalkMode] = useState(false);

  const addItem = useCallback(
    (poiId: number) => {
      const poi = pois.find((p) => p.id === poiId);
      if (!poi) return;

      setItems((prev) => {
        if (prev.some((item) => item.poiId === poiId)) return prev;

        const newItem: ItineraryItem = {
          poiId,
          name: poi.name,
          category: poi.category || "landmark",
          stayDuration: DEFAULT_STAY_DURATION[poi.category || "landmark"] || 15,
          order: prev.length + 1,
        };
        return [...prev, newItem];
      });
    },
    [pois]
  );

  const removeItem = useCallback((poiId: number) => {
    setItems((prev) => {
      const filtered = prev.filter((item) => item.poiId !== poiId);
      return filtered.map((item, index) => ({ ...item, order: index + 1 }));
    });
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  const setFromTheme = useCallback(
    (poiIds: number[]) => {
      const newItems: ItineraryItem[] = poiIds
        .map((poiId, index) => {
          const poi = pois.find((p) => p.id === poiId);
          if (!poi) return null;
          return {
            poiId,
            name: poi.name,
            category: poi.category || "landmark",
            stayDuration:
              DEFAULT_STAY_DURATION[poi.category || "landmark"] || 15,
            order: index + 1,
          };
        })
        .filter((item): item is ItineraryItem => item !== null);

      setItems(newItems);
    },
    [pois]
  );

  const stats: ItineraryStats = useMemo(() => {
    const totalTime = items.reduce((sum, item) => sum + item.stayDuration, 0);
    const totalDistance = items.length * 150;
    const restStops = items.filter((item) => item.category === "facility").length;

    let rating = 4.5;
    if (items.length > 5) rating -= 0.5;
    if (shortWalkMode && totalDistance > 500) rating -= 0.3;
    if (accessibilityMode) rating += 0.2;

    return {
      totalTime,
      totalDistance,
      poiCount: items.length,
      restStops,
      rating: Math.min(5, Math.max(1, rating)),
    };
  }, [items, shortWalkMode, accessibilityMode]);

  return {
    items,
    stats,
    accessibilityMode,
    shortWalkMode,
    addItem,
    removeItem,
    clearAll,
    setFromTheme,
    setAccessibilityMode,
    setShortWalkMode,
  };
}
