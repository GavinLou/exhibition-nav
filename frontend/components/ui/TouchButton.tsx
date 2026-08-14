"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

type TouchButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "success";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: ReactNode;
};

export function TouchButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  className = "",
  disabled,
  ...props
}: TouchButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 touch-target select-none";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] text-[var(--color-primary)] hover:opacity-90 active:scale-95",
    secondary:
      "glass border border-[var(--color-glass-border)] text-[var(--color-foreground)] hover:border-[var(--color-accent)] active:scale-95",
    ghost:
      "bg-transparent text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-white/5 active:scale-95",
    success:
      "bg-[var(--color-success)] text-white hover:opacity-90 active:scale-95",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[56px]",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
