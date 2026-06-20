import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Keep-alive endpoint hit by a daily Vercel Cron job. Performs a single trivial
// Redis write so the Upstash database registers activity and is never archived
// for inactivity (which would take down result permalinks and rate limiting).
//
// Secured with CRON_SECRET: Vercel sends `Authorization: Bearer <CRON_SECRET>`
// on cron invocations when that env var is set, preventing public abuse of the
// endpoint (which would otherwise consume Redis command quota).

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  // Require the secret to be configured — fail closed rather than expose an
  // unauthenticated endpoint that touches Redis.
  if (!cronSecret) {
    return NextResponse.json(
      { error: "Keep-alive is not configured." },
      { status: 500 }
    );
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    // A write counts as activity and resets Upstash's inactivity timer.
    await redis.set("keepalive:last-ping", new Date().toISOString());
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Keep-alive error:", message);
    return NextResponse.json(
      { error: "Keep-alive ping failed.", detail: message },
      { status: 500 }
    );
  }
}
