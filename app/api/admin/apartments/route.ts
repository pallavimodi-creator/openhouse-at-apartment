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
    .select("id,name,login_username,created_at")
    .order("name", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: teachers } = await supabase
    .from("teachers")
    .select("id,name,username,categories,apartment_id")
    .order("name", { ascending: true });

  const byApt: Record<string, unknown[]> = {};
  (teachers ?? []).forEach((t) => {
    (byApt[t.apartment_id] ||= []).push({
      id: t.id,
      name: t.name,
      username: t.username,
      categories: t.categories ?? [],
    });
  });
  const apartments = (apts ?? []).map((a) => ({
    id: a.id,
    name: a.name,
    loginUsername: a.login_username,
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
