/**
 * /api/keep-alive
 *
 * Pinged once a day by a Vercel Cron (see vercel.json) so the free-tier
 * Supabase project never sits idle long enough to auto-pause (~7 days).
 * A single tiny read counts as project activity and resets that timer.
 *
 * The query is a HEAD-style exact count — it returns no rows, just the
 * number, so it's about as cheap as a database call gets.
 */

import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // If CRON_SECRET is configured, require it (Vercel sends it automatically
  // on cron invocations). When it's unset, the endpoint is open — it's a
  // harmless, read-only ping that returns only a row count.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    if (req.headers.get("authorization") !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, configured: false });
  }

  const { count, error } = await supabase
    .from("newsletter_submissions")
    .select("id", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
  }
  return NextResponse.json({ ok: true, count: count ?? 0, at: new Date().toISOString() });
}
