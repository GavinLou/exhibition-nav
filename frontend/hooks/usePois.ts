"use client";

import { useEffect, useState } from "react";
import type { Poi } from "@/types";
import { fetchPois } from "@/lib/api";

export function usePois() {
  const [pois, setPois] = useState<Poi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPois()
      .then(setPois)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { pois, loading, error };
}
