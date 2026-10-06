import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST { username, password } → validate a shared apartment login.
export async function POST(req: Request) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const username = (body.username ?? "").toString().trim().toLowerCase();
  const password = (body.password ?? "").toString();
  if (!username || !password) {
    return NextResponse.json({ error: "missing credentials" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("apartments")
    .select("id,name,login_password")
    .eq("login_username", username)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.login_password !== password) {
    return NextResponse.json({ error: "incorrect apartment login" }, { status: 401 });
  }
  return NextResponse.json({ apartmentId: data.id, apartmentName: data.name });
}
