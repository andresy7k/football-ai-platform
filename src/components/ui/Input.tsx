"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-subhead text-[var(--color-text-secondary)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-[44px] w-full rounded-[var(--radius-button)] bg-white/5 px-4 text-body text-white",
            "border border-[var(--color-border-subtle)]",
            "placeholder:text-[var(--color-text-tertiary)]",
            "focus:outline-none focus:border-[var(--color-primary)] focus:bg-white/[0.07]",
            "transition-all duration-150 ease-out",
            error && "border-[var(--color-red)]",
            className,
          )}
          {...props}
        />
        {error && (
          <span className="text-caption text-[var(--color-red)]">{error}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
