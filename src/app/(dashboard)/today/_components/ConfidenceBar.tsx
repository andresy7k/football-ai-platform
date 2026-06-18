"use client";

import { cn } from "@/utils/cn";

interface ConfidenceBarProps {
  confidence: number;
  className?: string;
}

function getConfidenceLabel(confidence: number): string {
  if (confidence >= 80) return "High Confidence";
  if (confidence >= 50) return "Medium Confidence";
  return "Low Confidence";
}

export function ConfidenceBar({ confidence, className }: ConfidenceBarProps) {
  const fillColor =
    confidence >= 80
      ? "bg-[var(--color-confidence-high)]"
      : confidence >= 50
        ? "bg-[var(--color-confidence-medium)]"
        : "bg-[var(--color-confidence-low)]";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center justify-between">
        <span className="text-caption text-[var(--color-text-tertiary)]">
          {getConfidenceLabel(confidence)}
        </span>
        <span
          className={cn(
            "text-number-small",
            confidence >= 80 && "text-[var(--color-confidence-high)]",
            confidence >= 50 && confidence < 80 && "text-[var(--color-confidence-medium)]",
            confidence < 50 && "text-[var(--color-confidence-low)]",
          )}
        >
          {confidence}%
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={cn("h-full rounded-full transition-all duration-800 ease-out", fillColor)}
          style={{ width: `${confidence}%` }}
          role="progressbar"
          aria-valuenow={confidence}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`AI confidence: ${confidence}%`}
        />
      </div>
    </div>
  );
}
