"use client";

import { useState } from "react";
import { useMatches } from "@/hooks/use-matches";
import { MatchCard } from "@/app/(dashboard)/today/_components/MatchCard";
import { MatchCardSkeleton } from "@/app/(dashboard)/today/_components/MatchCardSkeleton";
import { QuickAnalysisSheet } from "@/app/(dashboard)/today/_components/QuickAnalysisSheet";
import { DeepAnalysisSheet } from "@/app/(dashboard)/today/_components/DeepAnalysisSheet";
import { SaveBetSheet } from "@/app/(dashboard)/today/_components/SaveBetSheet";
import { formatDate } from "@/utils/date";
import type { MatchWithDetails } from "@/services/match.service";

export default function TodayPage() {
  const { data: matches, isLoading, error, refetch } = useMatches();
  const [quickMatch, setQuickMatch] = useState<MatchWithDetails | null>(null);
  const [deepMatch, setDeepMatch] = useState<MatchWithDetails | null>(null);
  const [portfolioMatch, setPortfolioMatch] = useState<MatchWithDetails | null>(null);

  return (
    <div className="flex flex-col gap-6 px-5 pt-8 pb-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-display text-white">Today</h1>
        <div className="flex items-center gap-2">
          <p className="text-body text-[var(--color-text-secondary)]">
            {formatDate(new Date())}
          </p>
          {matches && matches.length > 0 && (
            <span className="rounded-full bg-[var(--color-teal)]/20 px-2.5 py-0.5 text-caption font-medium text-[var(--color-teal)]">
              AI Predictions Ready
            </span>
          )}
        </div>
      </div>

      {/* Match List */}
      <div className="flex flex-col gap-3">
        {isLoading && (
          <>
            <MatchCardSkeleton />
            <MatchCardSkeleton />
            <MatchCardSkeleton />
            <MatchCardSkeleton />
            <MatchCardSkeleton />
          </>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] glass p-8 text-center">
            <p className="text-body text-[var(--color-red)]">
              Failed to load matches
            </p>
            <button
              onClick={() => refetch()}
              className="rounded-[var(--radius-button)] bg-white/10 px-5 py-2 text-body-small font-medium text-white hover:bg-white/20 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && matches && matches.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] glass p-8 text-center">
            <p className="text-body text-[var(--color-text-secondary)]">
              No matches available today
            </p>
            <p className="text-caption text-[var(--color-text-tertiary)]">
              Check back tomorrow for new predictions
            </p>
          </div>
        )}

        {!isLoading && !error && matches?.map((matchData) => (
          <MatchCard
            key={matchData.match.id}
            matchData={matchData}
            onQuickAnalysis={setQuickMatch}
            onDeepAnalysis={setDeepMatch}
            onAddToPortfolio={setPortfolioMatch}
          />
        ))}
      </div>

      {/* Sheets */}
      <QuickAnalysisSheet
        match={quickMatch}
        open={!!quickMatch}
        onClose={() => setQuickMatch(null)}
      />
      <DeepAnalysisSheet
        match={deepMatch}
        open={!!deepMatch}
        onClose={() => setDeepMatch(null)}
      />
      <SaveBetSheet
        match={portfolioMatch}
        open={!!portfolioMatch}
        onClose={() => setPortfolioMatch(null)}
      />
    </div>
  );
}
