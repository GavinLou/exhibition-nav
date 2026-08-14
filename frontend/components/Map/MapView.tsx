"use client";

import { useEffect, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";

import { MapContainer, useMapMarkers, useMapRoute } from "@/components/map";
import { RouteInfo } from "@/components/nav";
import { usePois, useRoute, usePoiSelection } from "@/hooks";

export default function MapView() {
  const [map, setMap] = useState<maplibregl.Map | null>(null);

  const { pois } = usePois();
  const { route, loading, error, calculateRoute } = useRoute();
  const { selectedIds, isComplete, selectPoi } = usePoiSelection();

  const handleMapReady = useCallback((m: maplibregl.Map) => {
    setMap(m);
  }, []);

  useMapMarkers({ map, pois, onMarkerClick: selectPoi });
  useMapRoute({ map, route });

  useEffect(() => {
    if (isComplete) {
      calculateRoute(selectedIds[0], selectedIds[1]);
    }
  }, [isComplete, selectedIds, calculateRoute]);

  return (
    <div>
      <MapContainer onMapReady={handleMapReady} />
      <div style={{ marginTop: "8px" }}>
        <RouteInfo
          selectedCount={selectedIds.length}
          distance={route?.properties.distance_meters ?? null}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
