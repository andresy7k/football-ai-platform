import { z } from "zod";

export const betCreateSchema = z.object({
  matchId: z.string().uuid(),
  market: z.enum(["home", "draw", "away", "over", "under", "btts"]),
  odds: z.number().positive().min(1.01),
  stake: z.number().positive().max(100000),
  notes: z.string().max(500).optional(),
});

export const betUpdateSchema = z.object({
  status: z.enum(["win", "loss", "push"]),
});

export const preferencesUpdateSchema = z.object({
  oddsFormat: z.enum(["decimal", "fractional", "american"]).optional(),
  theme: z.enum(["dark", "light", "system"]).optional(),
  notifyDaily: z.boolean().optional(),
  notifySettlement: z.boolean().optional(),
  timezone: z.string().optional(),
});

export const savedCreateSchema = z.object({
  matchId: z.string().uuid(),
});
