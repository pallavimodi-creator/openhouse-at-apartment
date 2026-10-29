import { NextResponse } from "next/server";
import {
  getServiceSupabase,
  adminKeyConfigured,
  isValidAdminKey,
} from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function adminOk(req: Request): boolean {
  return !adminKeyConfigured() || isValidAdminKey(req.headers.get("x-admin-key"));
}

// GET → all apartments, each with its teacher list (admin).
export async function GET(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });
  if (adminKeyConfigured() && !isValidAdminKey(req.headers.get("x-admin-key"))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { data: apts, error } = await supabase
    .from("apartments")
    .select("id,name,login_username,login_password,individual_login_enabled,created_at")
    .order("name", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: teachers } = await supabase
    .from("teachers")
    .select("id,name,username,password,categories,apartment_id")
    .order("name", { ascending: true });

  // Classes done per apartment = count of daily-log submissions. We fetch
  // the (apartment_id, teacher_id) of every log and tally in-memory — small
  // data, and it lets us return both the apartment total and a per-teacher
  // breakdown in one pass.
  const { data: logs } = await supabase
    .from("daily_logs")
    .select("apartment_id,teacher_id");
  const classCount: Record<string, number> = {};
  const classByTeacher: Record<string, Record<string, number>> = {};
  (logs ?? []).forEach((l) => {
    classCount[l.apartment_id] = (classCount[l.apartment_id] ?? 0) + 1;
    (classByTeacher[l.apartment_id] ||= {});
    classByTeacher[l.apartment_id][l.teacher_id] =
      (classByTeacher[l.apartment_id][l.teacher_id] ?? 0) + 1;
  });

  // Monthly progress notes per apartment (count + how many are "ready for
  // assessment"). Ignore errors so a missing tracker_notes table (operator
  // hasn't run the schema yet) just shows zeroes instead of failing the list.
  const { data: notes } = await supabase
    .from("tracker_notes")
    .select("apartment_id,ready");
  const noteCount: Record<string, number> = {};
  const readyCount: Record<string, number> = {};
  (notes ?? []).forEach((n) => {
    noteCount[n.apartment_id] = (noteCount[n.apartment_id] ?? 0) + 1;
    if (n.ready) readyCount[n.apartment_id] = (readyCount[n.apartment_id] ?? 0) + 1;
  });

  const byApt: Record<string, unknown[]> = {};
  (teachers ?? []).forEach((t) => {
    (byApt[t.apartment_id] ||= []).push({
      id: t.id,
      name: t.name,
      username: t.username,
      password: t.password,
      categories: t.categories ?? [],
      classesDone: classByTeacher[t.apartment_id]?.[t.id] ?? 0,
    });
  });
  const apartments = (apts ?? []).map((a) => ({
    id: a.id,
    name: a.name,
    loginUsername: a.login_username,
    loginPassword: a.login_password,
    individualLoginEnabled: a.individual_login_enabled ?? false,
    classesDone: classCount[a.id] ?? 0,
    notesCount: noteCount[a.id] ?? 0,
    readyCount: readyCount[a.id] ?? 0,
    teachers: byApt[a.id] ?? [],
  }));
  return NextResponse.json({ apartments });
}

// POST { name, loginUsername, loginPassword } → create an apartment (admin).
export async function POST(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });
  if (!adminOk(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: { name?: string; loginUsername?: string; loginPassword?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const name = (body.name ?? "").toString().trim();
  const loginUsername = (body.loginUsername ?? "").toString().trim().toLowerCase();
  const loginPassword = (body.loginPassword ?? "").toString();
  if (!name || !loginUsername || !loginPassword) {
    return NextResponse.json({ error: "name, login username and password are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("apartments")
    .insert({ name, login_username: loginUsername, login_password: loginPassword })
    .select("id,name,login_username")
    .single();
  if (error) {
    const msg = error.code === "23505" ? "that apartment name or login already exists" : error.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  return NextResponse.json({ apartment: { id: data.id, name: data.name, loginUsername: data.login_username, teachers: [] } });
}
