"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

type Direction = "x" | "y";

export function usePanelAnimation<T extends HTMLElement>(
  isOpen: boolean,
  direction: Direction
) {
  const panelRef = useRef<T>(null);

  useEffect(() => {
    if (!panelRef.current) return;

    const prop = direction === "x" ? "xPercent" : "yPercent";
    const value = isOpen ? 0 : 100;

    gsap.to(panelRef.current, {
      [prop]: value,
      duration: 0.4,
      ease: "power2.inOut",
    });
  }, [isOpen, direction]);

  return panelRef;
}
