/**
 * /api/newsletters
 *
 * POST → an educator submits a newsletter for their building (no admin
 *        key needed; submitting is low-risk).
 * GET  → an admin lists all submissions (requires x-admin-key).
 *
 * When the backend isn't configured (no Supabase env), both return
 * 503 { configured: false } so the client can fall back to localStorage.
 */

import { NextResponse } from "next/server";
import { getServiceSupabase, isValidAdminKey, adminKeyConfigured } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE = "newsletter_submissions";

function rowToSubmission(r: Record<string, unknown>) {
  return {
    id: r.id,
    building: r.building,
    programmeSlug: r.programme_slug,
    programmeTitle: r.programme_title,
    ageLabel: r.age_label,
    from: r.from_date,
    to: r.to_date,
    draft: r.payload,
    status: r.status,
    submittedAt: r.submitted_at ? new Date(r.submitted_at as string).getTime() : 0,
    approvedAt: r.approved_at ? new Date(r.approved_at as string).getTime() : undefined,
  };
}

export async function POST(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  let body: {
    building?: string;
    programmeSlug?: string;
    programmeTitle?: string;
    ageLabel?: string;
    from?: string;
    to?: string;
    draft?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (!body.building || !body.programmeSlug || !body.draft) {
    return NextResponse.json({ error: "building, programme and draft are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      building: body.building,
      programme_slug: body.programmeSlug,
      programme_title: body.programmeTitle ?? body.programmeSlug,
      age_label: body.ageLabel ?? "",
      from_date: body.from ?? "",
      to_date: body.to ?? "",
      payload: body.draft,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ submission: rowToSubmission(data) });
}

export async function GET(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }
  // When a key is configured on the server it's still enforced; when it's
  // unset (the operator removed the gate), the admin list is open — the
  // dashboard is already reached only after the app admin login.
  const adminKey = req.headers.get("x-admin-key");
  if (adminKeyConfigured() && !isValidAdminKey(adminKey)) {
    return NextResponse.json({ error: "invalid admin key" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({
    submissions: (data ?? []).map((r) => rowToSubmission(r as Record<string, unknown>)),
  });
}
