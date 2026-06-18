"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:scale-[0.97]",
  secondary:
    "glass glass-hover text-white border-[var(--color-border-subtle)]",
  ghost:
    "bg-transparent text-[var(--color-primary)] hover:bg-white/5 active:scale-[0.97]",
  danger:
    "bg-[var(--color-red)] text-white hover:opacity-90 active:scale-[0.97]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-caption",
  md: "h-[44px] px-5 text-body-small",
  lg: "h-[52px] px-6 text-body",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", loading, disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "touch-target inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-semibold transition-all duration-150 ease-out",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
