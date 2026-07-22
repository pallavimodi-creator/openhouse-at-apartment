/**
 * Server-only Supabase client for the newsletter backend.
 *
 * Returns null when the env vars aren't set, so callers can fall back
 * to a local store during development / before the backend is wired.
 * Never import this in a client component — it uses the service-role
 * key, which bypasses row-level security and must stay on the server.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

export function getServiceSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    cached = null;
    return null;
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

/** Whether the newsletter admin key is configured. */
export function adminKeyConfigured(): boolean {
  return !!process.env.NEWSLETTER_ADMIN_KEY;
}

/** Constant-time-ish check of a supplied admin key. */
export function isValidAdminKey(supplied: string | null): boolean {
  const expected = process.env.NEWSLETTER_ADMIN_KEY;
  if (!expected) return false;
  if (!supplied) return false;
  return supplied === expected;
}
