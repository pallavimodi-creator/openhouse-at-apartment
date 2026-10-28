import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE = "tracker_notes";

interface Row {
  id: string;
  apartment_id: string;
  teacher_id: string | null;
  teacher_name: string;
  child_name: string;
  subject: string;
  level: string;
  age_band: string;
  note_month: string;
  skills: unknown;
  experiments: unknown;
  ready: boolean;
  updated_at: string;
}

function rowToNote(r: Row) {
  return {
    id: r.id,
    apartmentId: r.apartment_id,
    teacherId: r.teacher_id,
    teacherName: r.teacher_name,
    childName: r.child_name,
    subject: r.subject,
    level: r.level,
    ageBand: r.age_band,
    month: r.note_month,
    skills: (r.skills && typeof r.skills === "object") ? r.skills : {},
    experiments: (r.experiments && typeof r.experiments === "object") ? r.experiments : {},
    ready: !!r.ready,
    updatedAt: r.updated_at,
  };
}

const COLS =
  "id,apartment_id,teacher_id,teacher_name,child_name,subject,level,age_band,note_month,skills,experiments,ready,updated_at";

// GET ?apartmentId=&subject= → every note for the apartment (the shared class dashboard).
export async function GET(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });
  const url = new URL(req.url);
  const apartmentId = url.searchParams.get("apartmentId");
  const subject = url.searchParams.get("subject");
  if (!apartmentId) return NextResponse.json({ error: "apartmentId required" }, { status: 400 });

  let q = supabase
    .from(TABLE)
    .select(COLS)
    .eq("apartment_id", apartmentId)
    .order("updated_at", { ascending: false });
  if (subject) q = q.eq("subject", subject);
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ notes: (data ?? []).map((r) => rowToNote(r as Row)) });
}

// POST { apartmentId, teacherId?, teacherName, childName, subject, level, ageBand, month, skills, experiments, ready }
// → upsert the note for (apartment, subject, child, level, month). Shared per apartment.
export async function POST(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });

  let b: {
    apartmentId?: string;
    teacherId?: string;
    teacherName?: string;
    childName?: string;
    subject?: string;
    level?: string;
    ageBand?: string;
    month?: string;
    skills?: unknown;
    experiments?: unknown;
    ready?: boolean;
  };
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  if (!b.apartmentId || !b.teacherName || !b.childName || !b.level || !b.month) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  // If a teacherId is supplied, verify it belongs to the apartment (light check).
  if (b.teacherId) {
    const { data: t } = await supabase
      .from("teachers")
      .select("id")
      .eq("id", b.teacherId)
      .eq("apartment_id", b.apartmentId)
      .maybeSingle();
    if (!t) return NextResponse.json({ error: "unknown teacher" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from(TABLE)
    .upsert(
      {
        apartment_id: b.apartmentId,
        teacher_id: b.teacherId ?? null,
        teacher_name: b.teacherName,
        child_name: b.childName,
        subject: b.subject || "robotics",
        level: b.level,
        age_band: b.ageBand ?? "",
        note_month: b.month,
        skills: b.skills ?? {},
        experiments: b.experiments ?? {},
        ready: !!b.ready,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "apartment_id,subject,child_name,level,note_month" }
    )
    .select(COLS)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ note: rowToNote(data as Row) });
}

// DELETE ?id=&apartmentId= → remove one note (owner apartment only).
export async function DELETE(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const apartmentId = url.searchParams.get("apartmentId");
  if (!id || !apartmentId) return NextResponse.json({ error: "id and apartmentId required" }, { status: 400 });
  const { error } = await supabase.from(TABLE).delete().eq("id", id).eq("apartment_id", apartmentId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
