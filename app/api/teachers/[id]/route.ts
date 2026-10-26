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

// PATCH { name?, username?, password?, categories? } → edit a teacher login (admin).
export async function PATCH(
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

  const patch: Record<string, unknown> = {};
  if (typeof body.name === "string") patch.name = body.name.trim();
  if (typeof body.username === "string") patch.username = body.username.trim().toLowerCase();
  if (typeof body.password === "string" && body.password) patch.password = body.password;
  if (Array.isArray(body.categories)) patch.categories = body.categories.map((c) => String(c));
  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "nothing to update" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("teachers")
    .update(patch)
    .eq("id", params.id)
    .select("id,name,username,password,categories")
    .single();
  if (error) {
    const msg = error.code === "23505" ? "that username already exists in this apartment" : error.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  return NextResponse.json({ teacher: data });
}

// DELETE → remove a teacher login (admin). Their daily logs cascade-delete.
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });
  if (!adminOk(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { error } = await supabase.from("teachers").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
