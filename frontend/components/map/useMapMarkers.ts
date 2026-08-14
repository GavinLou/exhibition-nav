"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { Poi } from "@/types";

type UseMapMarkersOptions = {
  map: maplibregl.Map | null;
  pois: Poi[];
  onMarkerClick?: (poiId: number) => void;
};

export function useMapMarkers({ map, pois, onMarkerClick }: UseMapMarkersOptions) {
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    pois.forEach((poi) => {
      const marker = new maplibregl.Marker({ color: "#8B4513" })
        .setLngLat([poi.lon, poi.lat])
        .setPopup(new maplibregl.Popup({ offset: 25 }).setText(poi.name))
        .addTo(map);

      marker.getElement().addEventListener("click", () => {
        onMarkerClick?.(poi.id);
      });

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [map, pois, onMarkerClick]);
}
