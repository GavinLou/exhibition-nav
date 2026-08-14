"use client";

import { useState, useCallback } from "react";

export function usePoiSelection() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const selectPoi = useCallback((poiId: number) => {
    setSelectedIds((prev) => {
      if (prev.length >= 2) {
        return [poiId];
      }
      return [...prev, poiId];
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const fromId = selectedIds[0] ?? null;
  const toId = selectedIds[1] ?? null;
  const isComplete = selectedIds.length === 2;

  return { selectedIds, fromId, toId, isComplete, selectPoi, clearSelection };
}
