import type { Analysis, Bet, Competition, Match, Team } from "./models";

export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    total?: number;
    generatedAt?: string;
  };
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface MatchWithAnalysis {
  match: Match;
  competition?: Competition;
  homeTeam?: Team;
  awayTeam?: Team;
  analysis?: Analysis;
}

export interface BetWithMatch extends Bet {
  match?: Match;
  competition?: Competition;
}

export interface ROISummary {
  roi: number;
  netProfit: number;
  winRate: number;
  totalBets: number;
  bankroll: number;
  wins: number;
  losses: number;
  pushes: number;
}

export interface BankrollPoint {
  date: string;
  bankroll: number;
}
