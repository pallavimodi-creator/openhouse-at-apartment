/**
 * /api/newsletters/[id]
 *
 * GET    → admin fetches one submission (for the download view).
 * PATCH  → admin approves the submission ({ action: "approve" }).
 * DELETE → admin deletes the submission.
 *
 * All require x-admin-key. 503 { configured:false } when unconfigured.
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

function guard(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) {
    return { error: NextResponse.json({ configured: false }, { status: 503 }) };
  }
  if (adminKeyConfigured() && !isValidAdminKey(req.headers.get("x-admin-key"))) {
    return { error: NextResponse.json({ error: "invalid admin key" }, { status: 401 }) };
  }
  return { supabase };
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const g = guard(req);
  if ("error" in g) return g.error;
  const { data, error } = await g.supabase.from(TABLE).select("*").eq("id", params.id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ submission: rowToSubmission(data as Record<string, unknown>) });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const g = guard(req);
  if ("error" in g) return g.error;
  let body: { action?: string; draft?: unknown; building?: string };
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  // "update" — an admin saved edits to the submission's content before
  // approving. Overwrites the payload (and mirrors the building column).
  if (body.action === "update") {
    if (!body.draft) {
      return NextResponse.json({ error: "draft is required" }, { status: 400 });
    }
    const patch: Record<string, unknown> = { payload: body.draft };
    if (typeof body.building === "string" && body.building.trim()) {
      patch.building = body.building.trim();
    }
    const { error } = await g.supabase.from(TABLE).update(patch).eq("id", params.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "approve") {
    const { error } = await g.supabase
      .from(TABLE)
      .update({ status: "approved", approved_at: new Date().toISOString() })
      .eq("id", params.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unsupported action" }, { status: 400 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const g = guard(req);
  if ("error" in g) return g.error;
  const { error } = await g.supabase.from(TABLE).delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
