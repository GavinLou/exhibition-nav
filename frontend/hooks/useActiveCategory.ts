"use client";

import { useState, useCallback } from "react";
import type { MarkerCategory } from "@/types";

export function useActiveCategory() {
  const [activeCategory, setActiveCategory] = useState<MarkerCategory>("itinerary");

  const selectCategory = useCallback((category: MarkerCategory) => {
    setActiveCategory(category);
  }, []);

  return {
    activeCategory,
    selectCategory,
  };
}
