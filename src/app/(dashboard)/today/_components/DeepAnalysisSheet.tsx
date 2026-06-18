"use client";

import { Sheet } from "@/components/ui/Sheet";
import { ConfidenceBar } from "@/app/(dashboard)/today/_components/ConfidenceBar";
import { formatKickoff, formatDateShort } from "@/utils/date";
import type { MatchWithDetails } from "@/services/match.service";

interface DeepAnalysisSheetProps {
  match: MatchWithDetails | null;
  open: boolean;
  onClose: () => void;
}

export function DeepAnalysisSheet({ match, open, onClose }: DeepAnalysisSheetProps) {
  if (!match) return null;

  const { match: matchData, competition, homeTeam, awayTeam, analysis } = match;

  if (!analysis?.deep_analysis) {
    return (
      <Sheet open={open} onClose={onClose} title="Deep Analysis">
        <p className="text-body text-[var(--color-text-tertiary)]">
          Deep analysis is not yet available for this match.
        </p>
      </Sheet>
    );
  }

  const deep = analysis.deep_analysis;

  return (
    <Sheet open={open} onClose={onClose} title="Deep Analysis">
      <div className="flex flex-col gap-5">
        {/* Match header */}
        <div>
          <span className="text-caption text-[var(--color-text-secondary)]">
            {competition?.name} • {formatKickoff(matchData.kickoff)}
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-headline text-white">
              {homeTeam?.name ?? "Home"}
            </span>
            <span className="text-caption text-[var(--color-text-tertiary)]">vs</span>
            <span className="text-headline text-white">
              {awayTeam?.name ?? "Away"}
            </span>
          </div>
        </div>

        <ConfidenceBar confidence={analysis.confidence} />

        {/* AI Narrative */}
        <div className="flex flex-col gap-2">
          <h3 className="text-subhead font-semibold text-white">AI Analysis</h3>
          <p className="text-body text-[var(--color-text-secondary)] leading-relaxed">
            {deep.ai_narrative}
          </p>
        </div>

        {/* Form Comparison */}
        <div className="flex flex-col gap-2">
          <h3 className="text-subhead font-semibold text-white">Recent Form</h3>
          <div className="flex gap-3">
            <div className="flex-1 rounded-[var(--radius-badge)] bg-white/10 p-3">
              <p className="text-caption text-[var(--color-text-tertiary)] mb-1">
                {homeTeam?.short_name}
              </p>
              <p className="text-body text-white">
                {deep.form.home.split("").join(" ")}
              </p>
            </div>
            <div className="flex-1 rounded-[var(--radius-badge)] bg-white/10 p-3">
              <p className="text-caption text-[var(--color-text-tertiary)] mb-1">
                {awayTeam?.short_name}
              </p>
              <p className="text-body text-white">
                {deep.form.away.split("").join(" ")}
              </p>
            </div>
          </div>
        </div>

        {/* H2H */}
        <div className="flex flex-col gap-2">
          <h3 className="text-subhead font-semibold text-white">
            Head to Head ({deep.h2h.played} meetings)
          </h3>
          <div className="flex gap-3">
            <div className="flex-1 rounded-[var(--radius-badge)] bg-white/10 p-3 text-center">
              <p className="text-number text-[var(--color-team-home)]">{deep.h2h.home_wins}</p>
              <p className="text-caption text-[var(--color-text-tertiary)]">
                {homeTeam?.short_name} wins
              </p>
            </div>
            <div className="flex-1 rounded-[var(--radius-badge)] bg-white/10 p-3 text-center">
              <p className="text-number text-[var(--color-push)]">{deep.h2h.draws}</p>
              <p className="text-caption text-[var(--color-text-tertiary)]">Draws</p>
            </div>
            <div className="flex-1 rounded-[var(--radius-badge)] bg-white/10 p-3 text-center">
              <p className="text-number text-[var(--color-team-away)]">{deep.h2h.away_wins}</p>
              <p className="text-caption text-[var(--color-text-tertiary)]">
                {awayTeam?.short_name} wins
              </p>
            </div>
          </div>
        </div>

        {/* Injuries */}
        {deep.injuries.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-subhead font-semibold text-white">Injuries</h3>
            <div className="flex flex-col gap-1.5">
              {deep.injuries.map((injury, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-[var(--radius-badge)] bg-white/10 px-3 py-2"
                >
                  <span className="text-body-small text-white">{injury.player}</span>
                  <span
                    className={`text-caption font-medium ${
                      injury.status === "fit"
                        ? "text-[var(--color-teal)]"
                        : "text-[var(--color-orange)]"
                    }`}
                  >
                    {injury.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Odds Movement */}
        {deep.odds_movement.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-subhead font-semibold text-white">Odds Movement</h3>
            <div className="flex flex-col gap-1">
              {deep.odds_movement.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-[var(--radius-badge)] bg-white/10 px-3 py-2"
                >
                  <span className="text-caption text-[var(--color-text-tertiary)]">
                    {formatDateShort(point.date)}
                  </span>
                  <div className="flex gap-3">
                    <span className="text-caption text-[var(--color-text-secondary)]">
                      Home: {point.home.toFixed(2)}
                    </span>
                    <span className="text-caption text-[var(--color-text-secondary)]">
                      Away: {point.away.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended bet */}
        {analysis.recommended_bet && (
          <div className="rounded-[var(--radius-card)] bg-[var(--color-primary)]/20 p-4">
            <p className="text-caption text-[var(--color-text-tertiary)] mb-0.5">
              Recommended Bet
            </p>
            <p className="text-headline text-[var(--color-primary)]">
              {analysis.recommended_bet}
            </p>
          </div>
        )}
      </div>
    </Sheet>
  );
}
