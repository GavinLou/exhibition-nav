"use client";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export function Toggle({ checked, onChange, label, disabled = false }: ToggleProps) {
  return (
    <label
      className={`inline-flex items-center gap-3 touch-target ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
          checked
            ? "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)]"
            : "bg-[var(--color-secondary)]"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      {label && (
        <span className="text-sm text-[var(--color-foreground)]">{label}</span>
      )}
    </label>
  );
}
