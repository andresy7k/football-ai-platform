import type { Analysis, Competition, Match, Team } from "@/types/models";

interface MatchWithDetails {
  match: Match;
  competition: Competition;
  homeTeam: Team;
  awayTeam: Team;
  analysis: Analysis | null;
}

const MOCK_MATCHES: MatchWithDetails[] = [
  {
    match: {
      id: "m1",
      api_football_id: 1,
      competition_id: "c1",
      home_team_id: "t1",
      away_team_id: "t2",
      kickoff: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      status: "scheduled",
      home_score: null,
      away_score: null,
      match_date: new Date().toISOString().split("T")[0],
      relevance_score: 94.5,
      is_curated: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    competition: {
      id: "c1",
      api_football_id: 39,
      name: "Premier League",
      country: "England",
      logo_url: null,
      tier: 90,
    },
    homeTeam: {
      id: "t1",
      api_football_id: 50,
      name: "Manchester City",
      short_name: "MCI",
      logo_url: null,
      popularity_score: 95,
    },
    awayTeam: {
      id: "t2",
      api_football_id: 541,
      name: "Real Madrid",
      short_name: "RMA",
      logo_url: null,
      popularity_score: 98,
    },
    analysis: {
      id: "a1",
      match_id: "m1",
      confidence: 82,
      predicted_winner: "home",
      recommended_bet: "Home Win",
      quick_analysis:
        "Manchester City are in exceptional form at home, winning 8 of their last 10. Real Madrid's away form has been inconsistent. City's pressing game should overwhelm Madrid's midfield.",
      deep_analysis: {
        form: { home: "W-W-W-D-W", away: "D-W-L-W-D" },
        h2h: { played: 12, home_wins: 5, away_wins: 4, draws: 3 },
        injuries: [
          { player: "Kevin De Bruyne", team: "home", status: "fit" },
          { player: "Thibaut Courtois", team: "away", status: "doubtful" },
        ],
        odds_movement: [
          { date: "2026-06-16", home: 1.85, away: 4.2 },
          { date: "2026-06-17", home: 1.8, away: 4.5 },
        ],
        ai_narrative:
          "Manchester City's home dominance combined with Real Madrid's vulnerability on the counter makes this a compelling case for a home win. The market has shifted in City's favor over the past 48 hours, suggesting smart money is backing the home side. Key battle will be in midfield where City's press can force turnovers.",
      },
      odds_snapshot: { home: 1.8, draw: 3.8, away: 4.5, over: 1.9, under: 1.95 },
      model_version: "deepseek-v3",
      generated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  },
  {
    match: {
      id: "m2",
      api_football_id: 2,
      competition_id: "c2",
      home_team_id: "t3",
      away_team_id: "t4",
      kickoff: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      status: "scheduled",
      home_score: null,
      away_score: null,
      match_date: new Date().toISOString().split("T")[0],
      relevance_score: 88.2,
      is_curated: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    competition: {
      id: "c2",
      api_football_id: 140,
      name: "La Liga",
      country: "Spain",
      logo_url: null,
      tier: 85,
    },
    homeTeam: {
      id: "t3",
      api_football_id: 529,
      name: "Barcelona",
      short_name: "FCB",
      logo_url: null,
      popularity_score: 92,
    },
    awayTeam: {
      id: "t4",
      api_football_id: 530,
      name: "Atletico Madrid",
      short_name: "ATM",
      logo_url: null,
      popularity_score: 78,
    },
    analysis: {
      id: "a2",
      match_id: "m2",
      confidence: 65,
      predicted_winner: "home",
      recommended_bet: "Home Win",
      quick_analysis:
        "Barcelona have been strong at Camp Nou but Atletico's defense is the best in the league. This could be a tight affair.",
      deep_analysis: {
        form: { home: "W-D-W-W-L", away: "W-W-D-W-D" },
        h2h: { played: 20, home_wins: 9, away_wins: 5, draws: 6 },
        injuries: [
          { player: "Pedri", team: "home", status: "fit" },
          { player: "Jose Gimenez", team: "away", status: "fit" },
        ],
        odds_movement: [
          { date: "2026-06-16", home: 2.1, away: 3.8 },
          { date: "2026-06-17", home: 2.0, away: 4.0 },
        ],
        ai_narrative:
          "Camp Nou remains a fortress, but Simeone's Atletico are masters of the low block. Barcelona's recent dip in form is concerning, though their attacking trio should have enough quality to break down Atletico's defense. The under 2.5 goals market also offers value given Atletico's defensive record.",
      },
      odds_snapshot: { home: 2.0, draw: 3.3, away: 4.0, over: 2.0, under: 1.85 },
      model_version: "deepseek-v3",
      generated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  },
  {
    match: {
      id: "m3",
      api_football_id: 3,
      competition_id: "c3",
      home_team_id: "t5",
      away_team_id: "t6",
      kickoff: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      status: "scheduled",
      home_score: null,
      away_score: null,
      match_date: new Date().toISOString().split("T")[0],
      relevance_score: 76.0,
      is_curated: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    competition: {
      id: "c3",
      api_football_id: 78,
      name: "Bundesliga",
      country: "Germany",
      logo_url: null,
      tier: 80,
    },
    homeTeam: {
      id: "t5",
      api_football_id: 157,
      name: "Bayern Munich",
      short_name: "BAY",
      logo_url: null,
      popularity_score: 88,
    },
    awayTeam: {
      id: "t6",
      api_football_id: 165,
      name: "Borussia Dortmund",
      short_name: "BVB",
      logo_url: null,
      popularity_score: 82,
    },
    analysis: {
      id: "a3",
      match_id: "m3",
      confidence: 71,
      predicted_winner: "home",
      recommended_bet: "Over 2.5 Goals",
      quick_analysis:
        "Der Klassiker. Bayern at home are favorites but Dortmund have the pace to counter. Expect goals.",
      deep_analysis: {
        form: { home: "W-W-W-W-W", away: "W-L-W-W-D" },
        h2h: { played: 30, home_wins: 18, away_wins: 6, draws: 6 },
        injuries: [
          { player: "Harry Kane", team: "home", status: "fit" },
          { player: "Julian Brandt", team: "away", status: "doubtful" },
        ],
        odds_movement: [
          { date: "2026-06-16", home: 1.6, away: 5.5 },
          { date: "2026-06-17", home: 1.55, away: 5.8 },
        ],
        ai_narrative:
          "Der Klassiker rarely disappoints. Bayern's relentless form at the Allianz Arena makes them heavy favorites, but Dortmund's transitional speed can trouble any defense. The head-to-head record suggests goals at both ends — over 2.5 has landed in 8 of the last 10 meetings.",
      },
      odds_snapshot: { home: 1.55, draw: 4.5, away: 5.8, over: 1.75, under: 2.1 },
      model_version: "deepseek-v3",
      generated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  },
  {
    match: {
      id: "m4",
      api_football_id: 4,
      competition_id: "c4",
      home_team_id: "t7",
      away_team_id: "t8",
      kickoff: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(),
      status: "scheduled",
      home_score: null,
      away_score: null,
      match_date: new Date().toISOString().split("T")[0],
      relevance_score: 72.5,
      is_curated: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    competition: {
      id: "c4",
      api_football_id: 135,
      name: "Serie A",
      country: "Italy",
      logo_url: null,
      tier: 78,
    },
    homeTeam: {
      id: "t7",
      api_football_id: 496,
      name: "AC Milan",
      short_name: "ACM",
      logo_url: null,
      popularity_score: 76,
    },
    awayTeam: {
      id: "t8",
      api_football_id: 505,
      name: "Inter Milan",
      short_name: "INT",
      logo_url: null,
      popularity_score: 80,
    },
    analysis: {
      id: "a4",
      match_id: "m4",
      confidence: 58,
      predicted_winner: "draw",
      recommended_bet: "Draw",
      quick_analysis:
        "The Milan derby is always unpredictable. Both sides are evenly matched this season.",
      deep_analysis: {
        form: { home: "W-D-L-W-D", away: "W-W-D-W-L" },
        h2h: { played: 25, home_wins: 8, away_wins: 9, draws: 8 },
        injuries: [
          { player: "Rafael Leao", team: "home", status: "fit" },
          { player: "Lautaro Martinez", team: "away", status: "fit" },
        ],
        odds_movement: [
          { date: "2026-06-16", home: 2.8, away: 2.7 },
          { date: "2026-06-17", home: 2.9, away: 2.6 },
        ],
        ai_narrative:
          "The Derby della Madonnina is notoriously difficult to call. Both sides have shown similar form and the head-to-head record is remarkably balanced. The draw has been a frequent result in recent meetings and offers the best value given the tight odds.",
      },
      odds_snapshot: { home: 2.9, draw: 3.2, away: 2.6, over: 2.1, under: 1.8 },
      model_version: "deepseek-v3",
      generated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  },
  {
    match: {
      id: "m5",
      api_football_id: 5,
      competition_id: "c5",
      home_team_id: "t9",
      away_team_id: "t10",
      kickoff: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      status: "scheduled",
      home_score: null,
      away_score: null,
      match_date: new Date().toISOString().split("T")[0],
      relevance_score: 68.3,
      is_curated: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    competition: {
      id: "c5",
      api_football_id: 61,
      name: "Ligue 1",
      country: "France",
      logo_url: null,
      tier: 75,
    },
    homeTeam: {
      id: "t9",
      api_football_id: 85,
      name: "Paris Saint-Germain",
      short_name: "PSG",
      logo_url: null,
      popularity_score: 85,
    },
    awayTeam: {
      id: "t10",
      api_football_id: 91,
      name: "Olympique Marseille",
      short_name: "MAR",
      logo_url: null,
      popularity_score: 65,
    },
    analysis: {
      id: "a5",
      match_id: "m5",
      confidence: 78,
      predicted_winner: "home",
      recommended_bet: "Home Win",
      quick_analysis:
        "PSG's firepower at home is too much for Marseille. Le Classique tends to favor the home side.",
      deep_analysis: {
        form: { home: "W-W-W-L-W", away: "L-W-D-W-L" },
        h2h: { played: 22, home_wins: 12, away_wins: 5, draws: 5 },
        injuries: [
          { player: "Ousmane Dembele", team: "home", status: "doubtful" },
        ],
        odds_movement: [
          { date: "2026-06-16", home: 1.5, away: 6.0 },
          { date: "2026-06-17", home: 1.45, away: 6.5 },
        ],
        ai_narrative:
          "PSG's home record in Le Classique is formidable. Despite Marseille's improvement under their new manager, the Parc des Princes remains a daunting venue. PSG's attacking depth should prove decisive, though Marseille's counter-attacking threat means both teams to score is a live possibility.",
      },
      odds_snapshot: { home: 1.45, draw: 4.8, away: 6.5, over: 1.85, under: 2.0 },
      model_version: "deepseek-v3",
      generated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  },
];

export async function getTodaysMatches(): Promise<MatchWithDetails[]> {
  return MOCK_MATCHES;
}

export type { MatchWithDetails };
