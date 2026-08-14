"use client";

import type { MapMarkerData } from "@/types";

type SVGRouteOverlayProps = {
  itinerary: { id: string; order: number }[];
  markers: MapMarkerData[];
};

export function SVGRouteOverlay({ itinerary, markers }: SVGRouteOverlayProps) {
  if (itinerary.length < 2) return null;

  const sortedItinerary = [...itinerary].sort((a, b) => a.order - b.order);

  const getMarkerPosition = (id: string) => {
    const marker = markers.find((m) => m.id === id);
    return marker ? { x: marker.x, y: marker.y } : null;
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      preserveAspectRatio="none"
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="var(--color-primary)"
          />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {sortedItinerary.map((item, index) => {
        if (index === 0) return null;

        const prevItem = sortedItinerary[index - 1];
        const prevPos = getMarkerPosition(prevItem.id);
        const currPos = getMarkerPosition(item.id);

        if (!prevPos || !currPos) return null;

        return (
          <g key={`route-${prevItem.id}-${item.id}`}>
            <line
              x1={`${prevPos.x}%`}
              y1={`${prevPos.y}%`}
              x2={`${currPos.x}%`}
              y2={`${currPos.y}%`}
              stroke="var(--color-primary)"
              strokeWidth="3"
              strokeDasharray="8 4"
              strokeLinecap="round"
              filter="url(#glow)"
              markerEnd="url(#arrowhead)"
              className="animate-dash"
            />
          </g>
        );
      })}

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -24;
          }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
      `}</style>
    </svg>
  );
}
