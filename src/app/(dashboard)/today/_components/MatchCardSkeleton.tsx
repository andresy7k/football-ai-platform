export function MatchCardSkeleton() {
  return (
    <div className="glass animate-shimmer rounded-[var(--radius-card)] p-4" style={{ backgroundSize: "200% 100%" }}>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-28 rounded-full bg-white/10" />
          <div className="h-3 w-16 rounded-full bg-white/10" />
        </div>

        {/* Teams */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/10" />
            <div className="h-3 w-20 rounded-full bg-white/10" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-white/10" />
            <span className="text-body text-white/20">:</span>
            <div className="h-6 w-6 rounded bg-white/10" />
          </div>
          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/10" />
            <div className="h-3 w-20 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Confidence bar */}
        <div className="flex flex-col gap-1">
          <div className="h-3 w-24 rounded-full bg-white/10" />
          <div className="h-1 w-full rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}
