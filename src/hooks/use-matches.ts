"use client";

import { useQuery } from "@tanstack/react-query";
import type { MatchWithDetails } from "@/services/match.service";

async function fetchMatches(): Promise<MatchWithDetails[]> {
  const res = await fetch("/api/matches");
  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error?.message ?? "Failed to fetch matches");
  }
  const json = await res.json();
  return json.data;
}

export function useMatches() {
  return useQuery({
    queryKey: ["matches", "today"],
    queryFn: fetchMatches,
    staleTime: 1000 * 60 * 5,
  });
}
