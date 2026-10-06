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

// GET → the apartment's teachers (id + name only, for the login picker).
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });
  const { data, error } = await supabase
    .from("teachers")
    .select("id,name,categories")
    .eq("apartment_id", params.id)
    .order("name", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ teachers: data ?? [] });
}

// POST { name, username, password, categories } → create a teacher (admin).
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });
  if (!adminOk(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: {
    name?: string;
    username?: string;
    password?: string;
    categories?: string[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const name = (body.name ?? "").toString().trim();
  const username = (body.username ?? "").toString().trim().toLowerCase();
  const password = (body.password ?? "").toString();
  const categories = Array.isArray(body.categories)
    ? body.categories.map((c) => String(c))
    : [];
  if (!name || !username || !password) {
    return NextResponse.json({ error: "name, username and password are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("teachers")
    .insert({
      apartment_id: params.id,
      name,
      username,
      password,
      categories,
    })
    .select("id,name,username,categories")
    .single();
  if (error) {
    const msg = error.code === "23505" ? "that username already exists in this apartment" : error.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  return NextResponse.json({ teacher: data });
}
