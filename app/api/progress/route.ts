/**
 * /api/progress
 *
 * POST → an educator's app upserts a session-completion record (no admin
 *        key; low-risk, and localStorage stays the UI source of truth).
 * GET  → the admin records dashboard lists every record (requires the
 *        x-admin-key header — the same NEWSLETTER_ADMIN_KEY as newsletters).
 *
 * When Supabase isn't configured, both return 503 { configured: false } so
 * the client silently no-ops (progress still works locally).
 */

import { NextResponse } from "next/server";
import {
  getServiceSupabase,
  isValidAdminKey,
} from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE = "teacher_progress";

export async function POST(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  let body: {
    educatorName?: string;
    username?: string;
    category?: string;
    ageScope?: string;
    building?: string;
    programmeSlug?: string;
    programmeTitle?: string;
    day?: number;
    completed?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const { username, programmeSlug } = body;
  if (!username || !programmeSlug || typeof body.day !== "number") {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const row = {
    educator_name: (body.educatorName || "").trim() || username,
    username,
    category: body.category ?? null,
    age_scope: body.ageScope ?? null,
    building: (body.building || "").trim() || "(unspecified)",
    programme_slug: programmeSlug,
    programme_title: body.programmeTitle ?? null,
    day: body.day,
    completed: body.completed ?? true,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from(TABLE)
    .upsert(row, { onConflict: "username,building,programme_slug,day" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const key = req.headers.get("x-admin-key");
  if (!isValidAdminKey(key)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(5000);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ rows: data ?? [] });
}
