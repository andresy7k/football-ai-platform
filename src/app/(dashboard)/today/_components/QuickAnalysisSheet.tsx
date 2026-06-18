"use client";

import { Sheet } from "@/components/ui/Sheet";
import { ConfidenceBar } from "@/app/(dashboard)/today/_components/ConfidenceBar";
import { formatKickoff } from "@/utils/date";
import type { MatchWithDetails } from "@/services/match.service";

interface QuickAnalysisSheetProps {
  match: MatchWithDetails | null;
  open: boolean;
  onClose: () => void;
}

export function QuickAnalysisSheet({ match, open, onClose }: QuickAnalysisSheetProps) {
  if (!match) return null;

  const { match: matchData, competition, homeTeam, awayTeam, analysis } = match;

  return (
    <Sheet open={open} onClose={onClose} title="Quick Analysis">
      <div className="flex flex-col gap-4">
        {/* Match header */}
        <div className="flex items-center justify-between">
          <span className="text-caption text-[var(--color-text-secondary)]">
            {competition?.name} • {formatKickoff(matchData.kickoff)}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="text-headline text-white">
            {homeTeam?.short_name ?? "Home"}
          </span>
          <span className="text-caption text-[var(--color-text-tertiary)]">vs</span>
          <span className="text-headline text-white">
            {awayTeam?.short_name ?? "Away"}
          </span>
        </div>

        {/* Analysis */}
        {analysis ? (
          <div className="flex flex-col gap-3">
            <ConfidenceBar confidence={analysis.confidence} />
            <p className="text-body text-[var(--color-text-secondary)] leading-relaxed">
              {analysis.quick_analysis}
            </p>
            {analysis.recommended_bet && (
              <div className="rounded-[var(--radius-badge)] bg-white/10 px-3 py-2">
                <span className="text-caption text-[var(--color-text-tertiary)]">
                  Recommended bet:{" "}
                </span>
                <span className="text-caption font-semibold text-[var(--color-teal)]">
                  {analysis.recommended_bet}
                </span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-body text-[var(--color-text-tertiary)]">
            Analysis not yet available for this match.
          </p>
        )}
      </div>
    </Sheet>
  );
}
