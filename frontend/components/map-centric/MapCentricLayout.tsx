"use client";

import { useState, useCallback, useMemo } from "react";
import { FullscreenMap } from "./FullscreenMap";
import { MapMarker } from "./MapMarker";
import { SVGRouteOverlay } from "./SVGRouteOverlay";
import { MapPopover } from "./MapPopover";
import { SidebarNav } from "@/components/sidebar";
import { ItineraryDrawer } from "@/components/drawer";
import { StatsPanel } from "@/components/stats";
import { useActiveCategory } from "@/hooks/useActiveCategory";
import { MARKERS } from "@/lib/apiService";
import type { MapMarkerData } from "@/types";

type ItineraryItem = {
  id: string;
  name: string;
  order: number;
};

export function MapCentricLayout() {
  const { activeCategory, selectCategory } = useActiveCategory();
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerData | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  const filteredMarkers = useMemo(() => {
    return MARKERS.filter((m) => m.category === activeCategory);
  }, [activeCategory]);

  const itineraryIds = useMemo(() => {
    return new Set(itinerary.map((i) => i.id));
  }, [itinerary]);

  const handleMarkerClick = useCallback((marker: MapMarkerData) => {
    setSelectedMarker(marker);
  }, []);

  const handleAddToItinerary = useCallback(() => {
    if (!selectedMarker) return;
    if (itineraryIds.has(selectedMarker.id)) return;

    setItinerary((prev) => [
      ...prev,
      {
        id: selectedMarker.id,
        name: selectedMarker.name,
        order: prev.length + 1,
      },
    ]);
    setSelectedMarker(null);
  }, [selectedMarker, itineraryIds]);

  const handleReorder = useCallback((newItems: ItineraryItem[]) => {
    setItinerary(newItems);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setItinerary((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      return filtered.map((item, i) => ({ ...item, order: i + 1 }));
    });
  }, []);

  const handleClear = useCallback(() => {
    setItinerary([]);
  }, []);

  const stats = useMemo(() => {
    const poiCount = itinerary.length;
    const totalTime = poiCount * 15;
    const totalDistance = poiCount * 150;
    return { totalTime, totalDistance, poiCount };
  }, [itinerary]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <FullscreenMap />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <SVGRouteOverlay itinerary={itinerary} markers={MARKERS} />

        <div className="pointer-events-auto">
          {filteredMarkers.map((marker) => {
            const itineraryItem = itinerary.find((i) => i.id === marker.id);
            return (
              <MapMarker
                key={marker.id}
                marker={marker}
                isInItinerary={itineraryIds.has(marker.id)}
                itineraryOrder={itineraryItem?.order}
                onClick={() => handleMarkerClick(marker)}
              />
            );
          })}
        </div>
      </div>

      <SidebarNav
        activeCategory={activeCategory}
        onSelectCategory={selectCategory}
      />

      <ItineraryDrawer
        items={itinerary}
        markers={MARKERS}
        onReorder={handleReorder}
        onRemove={handleRemove}
        onClear={handleClear}
      />

      <StatsPanel
        totalTime={stats.totalTime}
        totalDistance={stats.totalDistance}
        poiCount={stats.poiCount}
      />

      {selectedMarker && (
        <MapPopover
          marker={selectedMarker}
          isInItinerary={itineraryIds.has(selectedMarker.id)}
          onClose={() => setSelectedMarker(null)}
          onAddToItinerary={handleAddToItinerary}
        />
      )}
    </div>
  );
}
