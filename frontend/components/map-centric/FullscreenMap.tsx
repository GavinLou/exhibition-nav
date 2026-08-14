"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type FullscreenMapProps = {
  onMapReady?: (map: maplibregl.Map) => void;
};

export function FullscreenMap({ onMapReady }: FullscreenMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          "osm-tiles": {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap",
          },
        },
        layers: [
          {
            id: "osm-layer",
            type: "raster",
            source: "osm-tiles",
            minzoom: 0,
            maxzoom: 19,
            paint: {
              "raster-saturation": -0.7,
              "raster-brightness-min": 0.05,
              "raster-brightness-max": 0.25,
              "raster-contrast": 0.1,
            },
          },
        ],
      },
      center: [120.3115, 22.7715],
      zoom: 17,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on("load", () => {
      setIsReady(true);
      onMapReady?.(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [onMapReady]);

  return (
    <div className="absolute inset-0 z-0">
      <div ref={containerRef} className="w-full h-full" />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-background)]">
          <div className="text-[var(--color-muted)]">地圖載入中...</div>
        </div>
      )}
    </div>
  );
}
