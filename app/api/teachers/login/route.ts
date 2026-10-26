import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST { apartmentId, teacherId, password } → validate an individual teacher.
// The teacher is picked by name from the apartment's list (so we have the id);
// we check the password and confirm the teacher belongs to that apartment.
export async function POST(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });

  let body: { apartmentId?: string; teacherId?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const apartmentId = (body.apartmentId ?? "").toString();
  const teacherId = (body.teacherId ?? "").toString();
  const password = (body.password ?? "").toString();
  if (!apartmentId || !teacherId || !password) {
    return NextResponse.json({ error: "missing credentials" }, { status: 400 });
  }

  // Individual logins must be enabled for this apartment (admin-controlled).
  const { data: apt } = await supabase
    .from("apartments")
    .select("individual_login_enabled")
    .eq("id", apartmentId)
    .maybeSingle();
  if (!apt?.individual_login_enabled) {
    return NextResponse.json(
      { error: "individual logins are not enabled for this apartment yet" },
      { status: 403 }
    );
  }

  const { data, error } = await supabase
    .from("teachers")
    .select("id,name,password,categories")
    .eq("id", teacherId)
    .eq("apartment_id", apartmentId)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.password !== password) {
    return NextResponse.json({ error: "incorrect password" }, { status: 401 });
  }
  return NextResponse.json({
    teacherId: data.id,
    name: data.name,
    categories: data.categories ?? [],
  });
}
