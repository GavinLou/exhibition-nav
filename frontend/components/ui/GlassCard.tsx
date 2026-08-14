"use client";

import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "subtle" | "gradient";
  hover?: boolean;
  onClick?: () => void;
};

export function GlassCard({
  children,
  className = "",
  variant = "default",
  hover = false,
  onClick,
}: GlassCardProps) {
  const baseClasses = "transition-all duration-200";

  const variantClasses = {
    default: "glass",
    subtle: "glass-subtle",
    gradient: "glass gradient-border",
  };

  const hoverClasses = hover
    ? "hover:scale-[1.02] hover:border-[var(--color-accent)] active:scale-[0.98]"
    : "";

  const clickableClasses = onClick ? "cursor-pointer touch-target" : "";

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      {children}
    </div>
  );
}
