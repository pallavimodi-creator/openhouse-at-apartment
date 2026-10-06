import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE = "daily_logs";

interface Row {
  id: string;
  apartment_id: string;
  teacher_id: string;
  teacher_name: string;
  log_date: string;
  programme_slug: string;
  programme_title: string | null;
  entries: unknown;
  free_note: string | null;
  updated_at: string;
}
function rowToLog(r: Row) {
  return {
    id: r.id,
    apartmentId: r.apartment_id,
    teacherId: r.teacher_id,
    teacherName: r.teacher_name,
    date: r.log_date,
    programmeSlug: r.programme_slug,
    programmeTitle: r.programme_title ?? r.programme_slug,
    entries: Array.isArray(r.entries) ? r.entries : [],
    freeNote: r.free_note ?? "",
    updatedAt: r.updated_at,
  };
}

// GET ?apartmentId=&from=&to= → all logs for the apartment (the shared dashboard).
export async function GET(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });
  const url = new URL(req.url);
  const apartmentId = url.searchParams.get("apartmentId");
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  if (!apartmentId) return NextResponse.json({ error: "apartmentId required" }, { status: 400 });

  let q = supabase
    .from(TABLE)
    .select("id,apartment_id,teacher_id,teacher_name,log_date,programme_slug,programme_title,entries,free_note,updated_at")
    .eq("apartment_id", apartmentId)
    .order("log_date", { ascending: false })
    .order("teacher_name", { ascending: true });
  if (from) q = q.gte("log_date", from);
  if (to) q = q.lte("log_date", to);
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ logs: (data ?? []).map((r) => rowToLog(r as Row)) });
}

// POST { apartmentId, teacherId, teacherName, date, programmeSlug, programmeTitle, entries, freeNote }
// → upsert the caller's own log for (teacher, date, programme). Owner-only by key.
export async function POST(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });

  let b: {
    apartmentId?: string;
    teacherId?: string;
    teacherName?: string;
    date?: string;
    programmeSlug?: string;
    programmeTitle?: string;
    entries?: unknown;
    freeNote?: string;
  };
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  if (!b.apartmentId || !b.teacherId || !b.teacherName || !b.programmeSlug) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  // Verify the teacher really belongs to that apartment (light server-side check).
  const { data: t } = await supabase
    .from("teachers")
    .select("id")
    .eq("id", b.teacherId)
    .eq("apartment_id", b.apartmentId)
    .maybeSingle();
  if (!t) return NextResponse.json({ error: "unknown teacher" }, { status: 401 });

  const date = b.date || new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from(TABLE)
    .upsert(
      {
        apartment_id: b.apartmentId,
        teacher_id: b.teacherId,
        teacher_name: b.teacherName,
        log_date: date,
        programme_slug: b.programmeSlug,
        programme_title: b.programmeTitle ?? b.programmeSlug,
        entries: b.entries ?? [],
        free_note: b.freeNote ?? "",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "teacher_id,log_date,programme_slug" }
    )
    .select("id,apartment_id,teacher_id,teacher_name,log_date,programme_slug,programme_title,entries,free_note,updated_at")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ log: rowToLog(data as Row) });
}
