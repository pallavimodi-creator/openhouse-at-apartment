import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE = "class_completions";

interface Row {
  id: string;
  apartment_id: string;
  teacher_id: string | null;
  teacher_name: string;
  programme_slug: string;
  programme_title: string | null;
  building: string | null;
  completed_days: number[] | null;
  updated_at: string;
}

function rowToCompletion(r: Row) {
  return {
    id: r.id,
    apartmentId: r.apartment_id,
    teacherId: r.teacher_id,
    teacherName: r.teacher_name,
    programmeSlug: r.programme_slug,
    programmeTitle: r.programme_title ?? r.programme_slug,
    building: r.building ?? "",
    completedDays: Array.isArray(r.completed_days) ? r.completed_days : [],
    updatedAt: r.updated_at,
  };
}

const COLS =
  "id,apartment_id,teacher_id,teacher_name,programme_slug,programme_title,building,completed_days,updated_at";

// GET ?apartmentId= → every teacher's completed-days for the apartment.
export async function GET(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });
  const apartmentId = new URL(req.url).searchParams.get("apartmentId");
  if (!apartmentId) return NextResponse.json({ error: "apartmentId required" }, { status: 400 });

  const { data, error } = await supabase
    .from(TABLE)
    .select(COLS)
    .eq("apartment_id", apartmentId)
    .order("updated_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ completions: (data ?? []).map((r) => rowToCompletion(r as Row)) });
}

// POST { apartmentId, teacherId, teacherName, programmeSlug, programmeTitle?, building?, completedDays }
// → upsert the caller's completed-days for (apartment, teacher, programme).
export async function POST(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });

  let b: {
    apartmentId?: string;
    teacherId?: string;
    teacherName?: string;
    programmeSlug?: string;
    programmeTitle?: string;
    building?: string;
    completedDays?: number[];
  };
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  if (!b.apartmentId || !b.teacherId || !b.teacherName || !b.programmeSlug) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  // Verify the teacher belongs to the apartment (light server-side check).
  const { data: t } = await supabase
    .from("teachers")
    .select("id")
    .eq("id", b.teacherId)
    .eq("apartment_id", b.apartmentId)
    .maybeSingle();
  if (!t) return NextResponse.json({ error: "unknown teacher" }, { status: 401 });

  const days = Array.isArray(b.completedDays)
    ? Array.from(new Set(b.completedDays.filter((n) => Number.isInteger(n)))).sort((x, y) => x - y)
    : [];

  const { data, error } = await supabase
    .from(TABLE)
    .upsert(
      {
        apartment_id: b.apartmentId,
        teacher_id: b.teacherId,
        teacher_name: b.teacherName,
        programme_slug: b.programmeSlug,
        programme_title: b.programmeTitle ?? b.programmeSlug,
        building: b.building ?? null,
        completed_days: days,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "apartment_id,teacher_id,programme_slug" }
    )
    .select(COLS)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ completion: rowToCompletion(data as Row) });
}
