"use client";

import { useState } from "react";
import { Route, ChevronRight, ChevronLeft, Trash2, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { usePanelAnimation } from "@/hooks/usePanelAnimation";
import { DraggableList } from "./DraggableList";
import type { MapMarkerData } from "@/types";

type ItineraryItem = {
  id: string;
  name: string;
  order: number;
};

type ItineraryDrawerProps = {
  items: ItineraryItem[];
  markers: MapMarkerData[];
  onReorder: (items: ItineraryItem[]) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

export function ItineraryDrawer({
  items,
  markers,
  onReorder,
  onRemove,
  onClear,
}: ItineraryDrawerProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const panelRef = usePanelAnimation<HTMLDivElement>(isOpen, "x");

  const qrData =
    typeof window !== "undefined"
      ? `${window.location.origin}/mobile?route=${items.map((i) => i.id).join(",")}`
      : "";

  return (
    <>
      <div
        ref={panelRef}
        className="fixed right-0 top-0 bottom-0 w-[340px] z-40 flex"
        style={{ transform: "translateX(0)" }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full
            w-8 h-16 rounded-l-xl
            glass flex items-center justify-center
            text-[var(--color-muted)] hover:text-[var(--color-foreground)]
            transition-colors
          "
        >
          {isOpen ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1 glass rounded-l-2xl p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Route className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="text-lg font-bold text-[var(--color-foreground)]">
                我的行程
              </h2>
              {items.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
                  {items.length}
                </span>
              )}
            </div>

            {items.length > 0 && (
              <button
                onClick={onClear}
                className="text-sm text-[var(--color-muted)] hover:text-[var(--color-error)] flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                清除
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[var(--color-muted)] py-12">
                <Route className="w-12 h-12 mb-4 opacity-30" />
                <p className="text-sm">尚未規劃行程</p>
                <p className="text-xs mt-1">點擊地圖上的景點加入</p>
              </div>
            ) : (
              <DraggableList
                items={items}
                markers={markers}
                onReorder={onReorder}
                onRemove={onRemove}
              />
            )}
          </div>

          {items.length > 0 && (
            <button
              onClick={() => setShowQR(true)}
              className="
                mt-4 w-full py-3 rounded-xl
                bg-[var(--color-primary)] text-white
                flex items-center justify-center gap-2
                font-medium hover:bg-[var(--color-primary-light)]
                transition-colors active:scale-[0.98]
              "
            >
              <QrCode className="w-5 h-5" />
              產生手機 QR Code
            </button>
          )}
        </div>
      </div>

      {showQR && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowQR(false)}
        >
          <div
            className="glass rounded-2xl p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-4 text-center">
              掃描 QR Code
            </h3>
            <div className="bg-white p-4 rounded-xl">
              <QRCodeSVG value={qrData} size={240} className="w-full h-auto" />
            </div>
            <p className="text-sm text-[var(--color-muted)] mt-4 text-center">
              使用手機掃描，即可查看完整導覽路線
            </p>
          </div>
        </div>
      )}
    </>
  );
}
