"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, X, Smartphone } from "lucide-react";
import { TouchButton, GlassCard } from "@/components/ui";
import type { ItineraryItem } from "@/types";

type QRCodeButtonProps = {
  items: ItineraryItem[];
  disabled?: boolean;
};

export function QRCodeButton({ items, disabled }: QRCodeButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const qrData =
    typeof window !== "undefined"
      ? `${window.location.origin}/mobile?route=${items.map((i) => i.poiId).join(",")}`
      : "";

  return (
    <>
      <TouchButton
        variant="success"
        size="lg"
        fullWidth
        icon={<QrCode className="w-5 h-5" />}
        onClick={() => setShowModal(true)}
        disabled={disabled || items.length === 0}
      >
        產生手機 QR Code
      </TouchButton>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <GlassCard
            className="p-8 max-w-sm w-full mx-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold gradient-text">掃描 QR Code</h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white p-4 rounded-xl mb-6">
              <QRCodeSVG
                value={qrData}
                size={240}
                level="M"
                className="w-full h-auto"
              />
            </div>

            <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
              <Smartphone className="w-5 h-5 flex-shrink-0" />
              <p>使用手機掃描，即可在手機上查看完整導覽路線</p>
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );
}
