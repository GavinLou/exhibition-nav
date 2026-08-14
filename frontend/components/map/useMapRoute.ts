"use client";

import { useEffect } from "react";
import maplibregl from "maplibre-gl";
import type { RouteResponse } from "@/types";
import type { Feature, LineString } from "geojson";

type UseMapRouteOptions = {
  map: maplibregl.Map | null;
  route: RouteResponse | null;
};

export function useMapRoute({ map, route }: UseMapRouteOptions) {
  useEffect(() => {
    if (!map || !map.isStyleLoaded()) return;

    if (!route) {
      try {
        if (map.getLayer("route-line")) {
          map.removeLayer("route-line");
        }
        if (map.getSource("route")) {
          map.removeSource("route");
        }
      } catch {
        // Style not fully loaded yet
      }
      return;
    }

    const existingSource = map.getSource("route") as maplibregl.GeoJSONSource | undefined;

    if (existingSource) {
      existingSource.setData(route as unknown as Feature<LineString>);
    } else {
      map.addSource("route", { type: "geojson", data: route as unknown as Feature<LineString> });
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#B22222",
          "line-width": 4,
        },
      });
    }
  }, [map, route]);
}
