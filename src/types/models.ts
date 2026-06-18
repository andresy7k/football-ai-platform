export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  bankroll: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  user_id: string;
  odds_format: "decimal" | "fractional" | "american";
  theme: "dark" | "light" | "system";
  notify_daily: boolean;
  notify_settlement: boolean;
  timezone: string;
  updated_at: string;
}

export interface Competition {
  id: string;
  api_football_id: number;
  name: string;
  country: string | null;
  logo_url: string | null;
  tier: number;
}

export interface Team {
  id: string;
  api_football_id: number;
  name: string;
  short_name: string | null;
  logo_url: string | null;
  popularity_score: number;
}

export interface Match {
  id: string;
  api_football_id: number;
  competition_id: string;
  home_team_id: string;
  away_team_id: string;
  kickoff: string;
  status: "scheduled" | "live" | "finished" | "cancelled";
  home_score: number | null;
  away_score: number | null;
  match_date: string;
  relevance_score: number | null;
  is_curated: boolean;
  created_at: string;
  updated_at: string;
}

export interface Analysis {
  id: string;
  match_id: string;
  confidence: number;
  predicted_winner: string | null;
  recommended_bet: string | null;
  risk_score: number;
  quick_analysis: string;
  deep_analysis: DeepAnalysis | null;
  odds_snapshot: OddsSnapshot | null;
  model_version: string | null;
  generated_at: string;
  created_at: string;
}

export interface DeepAnalysis {
  form: { home: string; away: string };
  h2h: { played: number; home_wins: number; away_wins: number; draws: number };
  injuries: Array<{ player: string; team: "home" | "away"; status: string }>;
  odds_movement: Array<{ date: string; home: number; away: number }>;
  ai_narrative: string;
}

export interface OddsSnapshot {
  home: number;
  draw: number;
  away: number;
  over: number;
  under: number;
}

export interface Bet {
  id: string;
  user_id: string;
  match_id: string;
  market: string;
  odds: number;
  stake: number;
  status: "pending" | "win" | "loss" | "push";
  profit: number | null;
  settled_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface BankrollEvent {
  id: string;
  user_id: string;
  bet_id: string | null;
  amount_change: number;
  balance_after: number;
  event_type: "bet_placed" | "bet_settled" | "deposit" | "withdrawal";
  created_at: string;
}

export interface SavedPrediction {
  id: string;
  user_id: string;
  match_id: string;
  created_at: string;
}
