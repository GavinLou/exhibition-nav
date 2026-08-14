"use client";

import { useEffect, useRef, ReactNode } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type MapContainerProps = {
  center?: [number, number];
  zoom?: number;
  onMapReady?: (map: maplibregl.Map) => void;
  children?: ReactNode;
};

export function MapContainer({
  center = [120.3115, 22.7715],
  zoom = 17,
  onMapReady,
}: MapContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center,
      zoom,
    });

    mapRef.current = map;

    map.on("load", () => {
      onMapReady?.(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [center, zoom, onMapReady]);

  return <div ref={containerRef} style={{ width: "100%", height: "500px" }} />;
}
