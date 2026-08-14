"use client";

import dynamic from "next/dynamic";

const MapCentricLayout = dynamic(
  () =>
    import("@/components/map-centric/MapCentricLayout").then(
      (mod) => mod.MapCentricLayout
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-screen h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-[var(--color-muted)]">載入中...</div>
      </div>
    ),
  }
);

export default function HomePage() {
  return <MapCentricLayout />;
}
