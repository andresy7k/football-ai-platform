import { callDeepSeek } from "@/lib/ai/client";
import { SYSTEM_PROMPT, buildPrompt } from "@/lib/ai/prompts";
import {
  aiAnalysisResponseSchema,
  type MatchAnalysisInput,
  type AIAnalysisResponse,
} from "@/lib/ai/types";
import { createServiceClient } from "@/lib/db/client";

interface StoredAnalysis {
  match_id: string;
  confidence: number;
  predicted_winner: string;
  recommended_bet: string;
  risk_score: number;
  quick_analysis: string;
  deep_analysis: Record<string, unknown>;
  odds_snapshot: Record<string, unknown> | null;
  model_version: string;
}

function buildMatchInput(match: Record<string, unknown>): MatchAnalysisInput {
  const homeTeam = match.homeTeam as { name: string; short_name?: string };
  const awayTeam = match.awayTeam as { name: string; short_name?: string };
  const competition = match.competition as { name: string };
  const m = match.match as {
    id: string;
    kickoff: string;
  };

  return {
    id: m.id,
    homeTeam: homeTeam.name,
    awayTeam: awayTeam.name,
    competition: competition.name,
    kickoff: new Date(m.kickoff).toLocaleString("en-GB"),
    homeForm: "W-W-D-W-L",
    awayForm: "D-W-L-W-D",
    h2hPlayed: 10,
    h2hHomeWins: 4,
    h2hAwayWins: 3,
    h2hDraws: 3,
    injuries: [],
    homeOdds: 2.0,
    drawOdds: 3.4,
    awayOdds: 3.8,
    overOdds: 1.9,
    underOdds: 1.95,
  };
}

export async function generateAnalysis(
  match: Record<string, unknown>,
  oddsSnapshot?: Record<string, unknown>,
): Promise<StoredAnalysis> {
  const matchInput = buildMatchInput(match);
  const userPrompt = buildPrompt(matchInput);

  const { content, tokensUsed } = await callDeepSeek(SYSTEM_PROMPT, userPrompt);

  let parsed: AIAnalysisResponse;
  try {
    const raw = JSON.parse(content);
    parsed = aiAnalysisResponseSchema.parse(raw);
  } catch (err) {
    throw new Error(
      `Failed to parse AI response for ${matchInput.homeTeam} vs ${matchInput.awayTeam}: ${err instanceof Error ? err.message : "Invalid JSON"}`,
    );
  }

  console.log(
    `[AI Service] Generated analysis for ${matchInput.homeTeam} vs ${matchInput.awayTeam} (${tokensUsed} tokens)`,
  );

  return {
    match_id: matchInput.id,
    confidence: parsed.confidence,
    predicted_winner: parsed.predicted_winner,
    recommended_bet: parsed.recommended_bet,
    risk_score: parsed.risk_score,
    quick_analysis: parsed.quick_analysis,
    deep_analysis: parsed.deep_analysis as unknown as Record<string, unknown>,
    odds_snapshot: oddsSnapshot ?? null,
    model_version: "deepseek-chat-v1",
  };
}

export async function generateAllAnalyses(
  matches: Array<Record<string, unknown>>,
): Promise<StoredAnalysis[]> {
  const results: StoredAnalysis[] = [];

  for (const match of matches) {
    try {
      const analysis = await generateAnalysis(match);
      results.push(analysis);
    } catch (err) {
      console.error(
        `[AI Service] Failed to generate analysis for match: ${err instanceof Error ? err.message : err}`,
      );
    }
  }

  return results;
}

export async function storeAnalysis(
  analysis: StoredAnalysis,
): Promise<{ stored: boolean; method: string }> {
  try {
    const supabase = createServiceClient();

    const { error } = await supabase.from("analyses").upsert(
      {
        match_id: analysis.match_id,
        confidence: analysis.confidence,
        predicted_winner: analysis.predicted_winner,
        recommended_bet: analysis.recommended_bet,
        risk_score: analysis.risk_score,
        quick_analysis: analysis.quick_analysis,
        deep_analysis: analysis.deep_analysis,
        odds_snapshot: analysis.odds_snapshot,
        model_version: analysis.model_version,
        generated_at: new Date().toISOString(),
      },
      { onConflict: "match_id" },
    );

    if (error) {
      console.warn(
        `[AI Service] Supabase store failed (table may not exist): ${error.message}`,
      );
      return { stored: false, method: "supabase_error" };
    }

    console.log(
      `[AI Service] Stored analysis for match ${analysis.match_id} in Supabase`,
    );
    return { stored: true, method: "supabase" };
  } catch (err) {
    console.warn(
      `[AI Service] Supabase unavailable, analysis kept in memory: ${err instanceof Error ? err.message : err}`,
    );
    return { stored: false, method: "memory" };
  }
}

export async function runDailyPipeline(
  matches: Array<Record<string, unknown>>,
): Promise<{
  total: number;
  succeeded: number;
  stored: number;
  analyses: StoredAnalysis[];
}> {
  console.log(`[AI Pipeline] Starting daily generation for ${matches.length} matches`);

  const analyses = await generateAllAnalyses(matches);

  let stored = 0;
  for (const analysis of analyses) {
    const result = await storeAnalysis(analysis);
    if (result.stored) stored++;
  }

  console.log(
    `[AI Pipeline] Complete: ${analyses.length}/${matches.length} succeeded, ${stored} stored in DB`,
  );

  return {
    total: matches.length,
    succeeded: analyses.length,
    stored,
    analyses,
  };
}

export type { StoredAnalysis };
