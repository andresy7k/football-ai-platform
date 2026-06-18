import type { MatchAnalysisInput } from "@/lib/ai/types";

export const SYSTEM_PROMPT = `You are an elite football analyst with decades of experience in match analysis, betting markets, and statistical modeling. Your task is to analyze football matches and provide structured predictions.

You MUST consider:
1. Recent form (last 5 matches) for both teams
2. Head-to-head historical record
3. Injury reports and player availability
4. Current market odds and their movement
5. League context (rivalry, league position, stakes)
6. Home/away advantage

Return ONLY valid JSON. No markdown, no explanation, no code blocks.`;

export function buildPrompt(match: MatchAnalysisInput): string {
  const injuryLines = match.injuries
    .map((i) => `  - ${i.player} (${i.team === "home" ? match.homeTeam : match.awayTeam}): ${i.status}`)
    .join("\n");

  return `Analyze this match and return a JSON object with your prediction.

MATCH:
- Home Team: ${match.homeTeam}
- Away Team: ${match.awayTeam}
- Competition: ${match.competition}
- Kickoff: ${match.kickoff}

RECENT FORM:
- ${match.homeTeam}: ${match.homeForm.split("").join("-")}
- ${match.awayTeam}: ${match.awayForm.split("").join("-")}

HEAD TO HEAD (${match.h2hPlayed} meetings):
- ${match.homeTeam} wins: ${match.h2hHomeWins}
- ${match.awayTeam} wins: ${match.h2hAwayWins}
- Draws: ${match.h2hDraws}

INJURIES:
${injuryLines || "  None reported"}

CURRENT ODDS:
- Home: ${match.homeOdds.toFixed(2)}
- Draw: ${match.drawOdds.toFixed(2)}
- Away: ${match.awayOdds.toFixed(2)}
- Over 2.5: ${match.overOdds.toFixed(2)}
- Under 2.5: ${match.underOdds.toFixed(2)}

Return JSON with this exact structure:
{
  "confidence": <0-100>,
  "predicted_winner": "<home|away|draw>",
  "recommended_bet": "<description of best bet>",
  "risk_score": <0-100>,
  "quick_analysis": "<2-3 sentence analysis>",
  "deep_analysis": {
    "form": { "home": "${match.homeForm}", "away": "${match.awayForm}" },
    "h2h": { "played": ${match.h2hPlayed}, "home_wins": ${match.h2hHomeWins}, "away_wins": ${match.h2hAwayWins}, "draws": ${match.h2hDraws} },
    "injuries": [<array of injury objects>],
    "odds_movement": [<array of odds objects>],
    "ai_narrative": "<full analysis paragraph>"
  }
}`;
}
