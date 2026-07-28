// src/app/page.tsx
// ---------------------------------------------------------
// Next.js App Router 的規則：app/page.tsx 就是網站首頁 "/"。
//
// 這裡用 next/dynamic 搭配 { ssr: false } 動態載入 MapView，
// 原因：MapLibre需要瀏覽器的window物件才能運作，
// 但Next.js預設會先在伺服器端「預先渲染」頁面(SSR)，
// 伺服器端沒有window，直接import MapView會報錯。
// dynamic + ssr:false 告訴Next.js「這個元件只在瀏覽器端載入，
// 伺服器渲染階段先跳過它」。
// ---------------------------------------------------------
"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/Map/MapView"), {
  ssr: false,
  loading: () => <p>地圖載入中...</p>,
});

export default function Home() {
  return (
    <main style={{ padding: "24px" }}>
      <h1>佛陀紀念館 GIS 導覽 — 測試版</h1>
      <MapView />
    </main>
  );
}
