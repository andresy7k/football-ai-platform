"use client";

import { useState } from "react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { formatKickoff } from "@/utils/date";
import type { MatchWithDetails } from "@/services/match.service";

interface SaveBetSheetProps {
  match: MatchWithDetails | null;
  open: boolean;
  onClose: () => void;
}

const MARKETS = [
  { value: "home", label: "Home Win" },
  { value: "draw", label: "Draw" },
  { value: "away", label: "Away Win" },
  { value: "over", label: "Over 2.5" },
  { value: "under", label: "Under 2.5" },
  { value: "btts", label: "Both to Score" },
];

export function SaveBetSheet({ match, open, onClose }: SaveBetSheetProps) {
  const [market, setMarket] = useState("home");
  const [odds, setOdds] = useState("");
  const [stake, setStake] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!match) return null;

  const { match: matchData, competition, homeTeam, awayTeam, analysis } = match;

  const handleSave = () => {
    setError(null);
    const oddsNum = parseFloat(odds);
    const stakeNum = parseFloat(stake);

    if (!odds || isNaN(oddsNum) || oddsNum < 1.01) {
      setError("Enter valid odds (minimum 1.01)");
      return;
    }
    if (!stake || isNaN(stakeNum) || stakeNum <= 0) {
      setError("Enter a valid stake");
      return;
    }

    // Will connect to bet service in Phase 8
    onClose();
  };

  const suggestedOdds = analysis?.odds_snapshot?.[market as keyof typeof analysis.odds_snapshot];

  return (
    <Sheet open={open} onClose={onClose} title="Add to Portfolio">
      <div className="flex flex-col gap-5">
        {/* Match info */}
        <div className="flex items-center justify-between rounded-[var(--radius-badge)] bg-white/10 px-4 py-3">
          <div>
            <p className="text-headline-small text-white">
              {homeTeam?.short_name} vs {awayTeam?.short_name}
            </p>
            <p className="text-caption text-[var(--color-text-tertiary)]">
              {competition?.name} • {formatKickoff(matchData.kickoff)}
            </p>
          </div>
        </div>

        {/* Market */}
        <div className="flex flex-col gap-2">
          <label className="text-subhead text-[var(--color-text-secondary)]">
            Market
          </label>
          <div className="grid grid-cols-3 gap-2">
            {MARKETS.map((m) => (
              <button
                key={m.value}
                onClick={() => setMarket(m.value)}
                className={`rounded-[var(--radius-badge)] px-3 py-2.5 text-caption font-medium transition-all ${
                  market === m.value
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-white/10 text-[var(--color-text-secondary)] hover:bg-white/20"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Odds */}
        <div className="flex flex-col gap-2">
          <label className="text-subhead text-[var(--color-text-secondary)]">
            Odds (decimal)
          </label>
          <input
            type="number"
            step="0.01"
            min="1.01"
            placeholder={suggestedOdds ? suggestedOdds.toFixed(2) : "2.00"}
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            className="h-[44px] w-full rounded-[var(--radius-button)] bg-white/10 px-4 text-body text-white placeholder:text-[var(--color-text-tertiary)] border border-[var(--color-border-subtle)] focus:outline-none focus:border-[var(--color-primary)]"
          />
          {suggestedOdds && (
            <p className="text-caption text-[var(--color-text-tertiary)]">
              Suggested: {suggestedOdds.toFixed(2)} (from AI odds snapshot)
            </p>
          )}
        </div>

        {/* Stake */}
        <div className="flex flex-col gap-2">
          <label className="text-subhead text-[var(--color-text-secondary)]">
            Stake ($)
          </label>
          <input
            type="number"
            step="0.50"
            min="0"
            placeholder="10.00"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            className="h-[44px] w-full rounded-[var(--radius-button)] bg-white/10 px-4 text-body text-white placeholder:text-[var(--color-text-tertiary)] border border-[var(--color-border-subtle)] focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        {/* Potential payout */}
        {odds && stake && (
          <div className="rounded-[var(--radius-badge)] bg-white/10 px-4 py-3">
            <div className="flex justify-between">
              <span className="text-caption text-[var(--color-text-tertiary)]">
                Potential Payout
              </span>
              <span className="text-body font-semibold text-[var(--color-teal)]">
                ${(parseFloat(odds) * parseFloat(stake)).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-caption text-[var(--color-text-tertiary)]">
                Potential Profit
              </span>
              <span className="text-caption text-[var(--color-text-secondary)]">
                ${((parseFloat(odds) - 1) * parseFloat(stake)).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-caption text-[var(--color-red)]" role="alert">
            {error}
          </p>
        )}

        <Button onClick={handleSave} className="w-full" size="lg">
          Save to Portfolio
        </Button>
      </div>
    </Sheet>
  );
}
