import { NextResponse } from "next/server";
import { generateAnalysis, storeAnalysis } from "@/services/ai.service";
import { getTodaysMatches } from "@/services/match.service";
import type { MatchWithDetails } from "@/services/match.service";

export async function GET() {
  try {
    const matches = await getTodaysMatches();

    if (!matches || matches.length === 0) {
      return NextResponse.json({
        status: "skipped",
        message: "No matches available",
      });
    }

    const firstMatch: MatchWithDetails = matches[0];
    const matchData = firstMatch as unknown as Record<string, unknown>;

    const analysis = await generateAnalysis(matchData);
    const storeResult = await storeAnalysis(analysis);

    const narrative = analysis.deep_analysis?.ai_narrative;
    const summary =
      typeof narrative === "string" && narrative.length > 0
        ? narrative.slice(0, 200) + "..."
        : "N/A";

    return NextResponse.json({
      status: "success",
      match: `${firstMatch.homeTeam.name} vs ${firstMatch.awayTeam.name}`,
      analysis: {
        confidence: analysis.confidence,
        predicted_winner: analysis.predicted_winner,
        recommended_bet: analysis.recommended_bet,
        risk_score: analysis.risk_score,
        quick_analysis: analysis.quick_analysis,
        deep_analysis_summary: summary,
        model_version: analysis.model_version,
      },
      storage: storeResult,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Test AI] Error:", message);

    return NextResponse.json(
      {
        status: "error",
        error: message,
        hint: "Ensure DEEPSEEK_API_KEY is set in .env.local",
      },
      { status: 500 },
    );
  }
}
