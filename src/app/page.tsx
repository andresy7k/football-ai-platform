"use client";

import { useUser } from "@/hooks/use-user";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated, loading } = useUser();

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[var(--color-primary)]">
          <span className="text-display text-white font-bold">AI</span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-display text-white">Football AI Analytics</h1>
          <p className="text-body text-[var(--color-text-secondary)] max-w-sm">
            Premium AI-powered football predictions. Daily curated matches, deep
            analysis, and portfolio tracking.
          </p>
        </div>

        {!loading && (
          <Link
            href={isAuthenticated ? "/today" : "/auth/login"}
            className="mt-2 inline-flex h-[52px] items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-primary)] px-8 text-body font-semibold text-white transition-all duration-150 ease-out hover:bg-[var(--color-primary-hover)] active:scale-[0.97]"
          >
            {isAuthenticated ? "View Today's Matches" : "Get Started"}
          </Link>
        )}
      </div>
    </main>
  );
}
