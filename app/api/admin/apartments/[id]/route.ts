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

// PATCH { individualLoginEnabled } → turn individual (teacher) logins on/off
// for one apartment (admin). When off, the apartment uses its shared login
// only; when on, teachers sign in with their own name + password.
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ configured: false }, { status: 503 });
  if (!adminOk(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: { individualLoginEnabled?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  if (typeof body.individualLoginEnabled !== "boolean") {
    return NextResponse.json({ error: "individualLoginEnabled (boolean) is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("apartments")
    .update({ individual_login_enabled: body.individualLoginEnabled })
    .eq("id", params.id)
    .select("id,individual_login_enabled")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ individualLoginEnabled: data.individual_login_enabled });
}
