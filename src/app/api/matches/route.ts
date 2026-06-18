import { NextResponse } from "next/server";
import { getTodaysMatches } from "@/services/match.service";

export async function GET() {
  try {
    const matches = await getTodaysMatches();
    return NextResponse.json({ data: matches });
  } catch {
    return NextResponse.json(
      { error: { code: "FETCH_ERROR", message: "Failed to fetch matches" } },
      { status: 500 },
    );
  }
}
