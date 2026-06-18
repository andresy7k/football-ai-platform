"use client";

import { useState } from "react";
import { ConfidenceBar } from "@/app/(dashboard)/today/_components/ConfidenceBar";
import { cn } from "@/utils/cn";
import { formatKickoff } from "@/utils/date";
import type { MatchWithDetails } from "@/services/match.service";

interface MatchCardProps {
  matchData: MatchWithDetails;
  onQuickAnalysis: (match: MatchWithDetails) => void;
  onDeepAnalysis: (match: MatchWithDetails) => void;
  onAddToPortfolio: (match: MatchWithDetails) => void;
}

export function MatchCard({
  matchData,
  onQuickAnalysis,
  onDeepAnalysis,
  onAddToPortfolio,
}: MatchCardProps) {
  const { match, competition, homeTeam, awayTeam, analysis } = matchData;
  const [expanded, setExpanded] = useState(false);

  const getScore = (score: number | null) =>
    score !== null ? score.toString() : "—";

  return (
    <article
      className={cn(
        "glass rounded-[var(--radius-card)] overflow-hidden",
        "transition-all duration-150 ease-out",
      )}
      aria-label={`${homeTeam?.name} vs ${awayTeam?.name}`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left transition-transform active:scale-[0.99]"
      >
        {/* Header: Competition + Time */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-[var(--radius-badge)] bg-white/10 px-2.5 py-1 text-caption font-medium text-[var(--color-text-secondary)]">
              {competition?.name ?? "Unknown League"}
            </span>
          </div>
          <span className="text-subhead text-[var(--color-text-tertiary)]">
            {formatKickoff(match.kickoff)}
          </span>
        </div>

        {/* Teams + Score */}
        <div className="mb-3 flex items-center justify-center gap-4">
          {/* Home Team */}
          <div className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-subhead font-semibold">
              {homeTeam?.short_name?.slice(0, 3) ?? "HOM"}
            </div>
            <span className="text-headline-small text-white text-center leading-tight line-clamp-1">
              {homeTeam?.name ?? "Home"}
            </span>
            <span className="text-caption text-[var(--color-text-tertiary)]">
              Home
            </span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-2">
            <span className="text-number-large text-white">
              {match.status === "finished" || match.status === "live"
                ? getScore(match.home_score)
                : "—"}
            </span>
            <span className="text-body text-[var(--color-text-tertiary)]">:</span>
            <span className="text-number-large text-white">
              {match.status === "finished" || match.status === "live"
                ? getScore(match.away_score)
                : "—"}
            </span>
          </div>

          {/* Away Team */}
          <div className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-subhead font-semibold">
              {awayTeam?.short_name?.slice(0, 3) ?? "AWY"}
            </div>
            <span className="text-headline-small text-white text-center leading-tight line-clamp-1">
              {awayTeam?.name ?? "Away"}
            </span>
            <span className="text-caption text-[var(--color-text-tertiary)]">
              Away
            </span>
          </div>
        </div>

        {/* Confidence */}
        {analysis && (
          <ConfidenceBar confidence={analysis.confidence} />
        )}
      </button>

      {/* Action Buttons */}
      <div className="flex gap-2 border-t border-[var(--color-border-subtle)] px-4 py-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAnalysis(matchData);
          }}
          className={cn(
            "flex-1 rounded-[var(--radius-badge)] bg-white/10 px-3 py-2",
            "text-caption font-medium text-[var(--color-text-secondary)]",
            "hover:bg-white/[0.15] active:scale-[0.97] transition-all",
          )}
        >
          Quick Analysis
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeepAnalysis(matchData);
          }}
          className={cn(
            "flex-1 rounded-[var(--radius-badge)] bg-white/10 px-3 py-2",
            "text-caption font-medium text-[var(--color-text-secondary)]",
            "hover:bg-white/[0.15] active:scale-[0.97] transition-all",
          )}
        >
          Deep Analysis
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToPortfolio(matchData);
          }}
          className={cn(
            "flex-1 rounded-[var(--radius-badge)] bg-[var(--color-primary)]/20 px-3 py-2",
            "text-caption font-medium text-[var(--color-primary)]",
            "hover:bg-[var(--color-primary)]/30 active:scale-[0.97] transition-all",
          )}
        >
          + Portfolio
        </button>
      </div>
    </article>
  );
}
