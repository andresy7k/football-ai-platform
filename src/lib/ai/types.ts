import { z } from "zod";

export const deepAnalysisSchema = z.object({
  form: z.object({
    home: z.string(),
    away: z.string(),
  }),
  h2h: z.object({
    played: z.number(),
    home_wins: z.number(),
    away_wins: z.number(),
    draws: z.number(),
  }),
  injuries: z.array(
    z.object({
      player: z.string(),
      team: z.enum(["home", "away"]),
      status: z.string(),
    }),
  ),
  odds_movement: z.array(
    z.object({
      date: z.string(),
      home: z.number(),
      away: z.number(),
    }),
  ),
  ai_narrative: z.string(),
});

export const aiAnalysisResponseSchema = z.object({
  confidence: z.number().min(0).max(100),
  predicted_winner: z.enum(["home", "away", "draw"]),
  recommended_bet: z.string(),
  risk_score: z.number().min(0).max(100),
  quick_analysis: z.string().min(10),
  deep_analysis: deepAnalysisSchema,
});

export type AIAnalysisResponse = z.infer<typeof aiAnalysisResponseSchema>;
export type DeepAnalysisInput = z.infer<typeof deepAnalysisSchema>;

export interface MatchAnalysisInput {
  id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  kickoff: string;
  homeForm: string;
  awayForm: string;
  h2hPlayed: number;
  h2hHomeWins: number;
  h2hAwayWins: number;
  h2hDraws: number;
  injuries: Array<{ player: string; team: string; status: string }>;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  overOdds: number;
  underOdds: number;
}
