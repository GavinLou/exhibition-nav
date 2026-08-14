"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Poi, RouteResponse, ItineraryItem } from "@/types";

type InteractiveMapProps = {
  pois: Poi[];
  itinerary: ItineraryItem[];
  route: RouteResponse | null;
  onMarkerClick: (poiId: number) => void;
};

const CATEGORY_COLORS: Record<string, string> = {
  entrance: "#22C55E",
  landmark: "#A855F7",
  facility: "#F59E0B",
  exit: "#EF4444",
};

export function InteractiveMap({
  pois,
  itinerary,
  route,
  onMarkerClick,
}: InteractiveMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          "raster-tiles": {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap",
          },
        },
        layers: [
          {
            id: "simple-tiles",
            type: "raster",
            source: "raster-tiles",
            minzoom: 0,
            maxzoom: 19,
            paint: {
              "raster-saturation": -0.8,
              "raster-brightness-min": 0.1,
              "raster-brightness-max": 0.3,
            },
          },
        ],
      },
      center: [120.3115, 22.7715],
      zoom: 17,
    });

    mapRef.current = map;

    map.on("load", () => {
      setMapReady(true);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mapReady) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const itineraryPoiIds = new Set(itinerary.map((i) => i.poiId));

    pois.forEach((poi) => {
      const isInItinerary = itineraryPoiIds.has(poi.id);
      const color = CATEGORY_COLORS[poi.category || "landmark"] || "#64748B";
      const itineraryOrder = itinerary.find((i) => i.poiId === poi.id)?.order;

      const el = document.createElement("div");
      el.className = "marker-container";
      el.innerHTML = `
        <div style="
          width: ${isInItinerary ? "48px" : "40px"};
          height: ${isInItinerary ? "48px" : "40px"};
          border-radius: 50%;
          background: ${isInItinerary ? `linear-gradient(135deg, #22D3EE, #A855F7)` : color};
          border: 3px solid ${isInItinerary ? "#fff" : "rgba(255,255,255,0.3)"};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          ${isInItinerary ? "animation: pulse 2s infinite;" : ""}
        ">
          <span style="
            color: white;
            font-weight: bold;
            font-size: ${isInItinerary ? "16px" : "14px"};
          ">${itineraryOrder || poi.id}</span>
        </div>
      `;

      el.addEventListener("click", () => onMarkerClick(poi.id));

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([poi.lon, poi.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25, closeButton: false }).setHTML(`
            <div style="padding: 8px; font-family: system-ui;">
              <strong style="color: #0F172A;">${poi.name}</strong>
              ${isInItinerary ? `<br><span style="color: #22D3EE; font-size: 12px;">行程第 ${itineraryOrder} 站</span>` : ""}
            </div>
          `)
        )
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [pois, itinerary, mapReady, onMarkerClick]);

  useEffect(() => {
    if (!mapRef.current || !mapReady) return;

    if (mapRef.current.getLayer("route-line")) {
      mapRef.current.removeLayer("route-line");
    }
    if (mapRef.current.getSource("route")) {
      mapRef.current.removeSource("route");
    }

    if (route && route.geometry.coordinates.length > 0) {
      mapRef.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: route.geometry,
        },
      });

      mapRef.current.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#22D3EE",
          "line-width": 4,
          "line-opacity": 0.8,
        },
      });
    }
  }, [route, mapReady]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 4px 12px rgba(34, 211, 238, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 4px 20px rgba(34, 211, 238, 0.5);
          }
        }
      `}</style>
    </div>
  );
}
