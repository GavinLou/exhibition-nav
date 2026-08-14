"use client";

import { useState, useCallback } from "react";
import type { RouteResponse } from "@/types";
import { fetchRoute } from "@/lib/api";

export function useRoute() {
  const [route, setRoute] = useState<RouteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateRoute = useCallback(async (fromId: number, toId: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchRoute(fromId, toId);
      setRoute(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "路徑計算失敗";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearRoute = useCallback(() => {
    setRoute(null);
    setError(null);
  }, []);

  return { route, loading, error, calculateRoute, clearRoute };
}
