import { NextResponse } from "next/server";
import { runDailyPipeline } from "@/services/ai.service";
import { getTodaysMatches } from "@/services/match.service";

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  const expectedToken = `Bearer ${process.env.CRON_SECRET}`;

  if (!expectedToken || expectedToken === "Bearer placeholder-cron-secret") {
    // In development, allow without auth
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Invalid or missing CRON_SECRET" } },
        { status: 401 },
      );
    }
  } else if (authHeader !== expectedToken) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Invalid CRON_SECRET" } },
      { status: 401 },
    );
  }

  try {
    // Fetch today's curated matches
    const matches = await getTodaysMatches();

    if (!matches || matches.length === 0) {
      return NextResponse.json({
        status: "skipped",
        message: "No matches available for today",
        total: 0,
      });
    }

    // Run the AI pipeline
    const result = await runDailyPipeline(
      matches as unknown as Array<Record<string, unknown>>,
    );

    return NextResponse.json({
      status: "completed",
      message: `Generated ${result.succeeded}/${result.total} analyses, ${result.stored} stored in DB`,
      total: result.total,
      succeeded: result.succeeded,
      stored: result.stored,
    });
  } catch (err) {
    console.error("[Cron] Daily analysis generation failed:", err);
    return NextResponse.json(
      {
        status: "failed",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
