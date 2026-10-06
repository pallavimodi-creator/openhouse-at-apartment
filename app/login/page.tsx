"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setTeacher, getTeacher } from "@/lib/teacher-state";
import { validateCredentials } from "@/lib/credentials";

/**
 * LAYER 1 — the generic (shared) login.
 * A subject login (e.g. artteacher) or the admin login. A generic login
 * reaches programme CONTENT ONLY. To log the daily form + see the shared
 * apartment dashboard, a teacher continues to the apartment login (/apartment,
 * layer 2) and their own teacher login (/teacher, layer 3).
 */
export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already signed in, route past the login page.
  useEffect(() => {
    const existing = getTeacher();
    if (!existing) return;
    const admin = existing.role === "admin" || existing.programmeSlug === "*";
    if (admin) {
      router.replace("/");
      return;
    }
    // Mid-way through the apartment → teacher flow: resume where they left off.
    if (existing.apartmentId && !existing.teacherId) {
      router.replace("/teacher");
      return;
    }
    // Generic login (content) or a completed teacher login — both land home.
    if (existing.teacherId || existing.category || existing.programmeSlug) {
      router.replace("/");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const cred = validateCredentials(username, password);
    if (!cred) {
      setError("incorrect username or password");
      setSubmitting(false);
      return;
    }
    setTeacher({
      teacherName: cred.displayName,
      programmeSlug: cred.programmeSlug,
      username: cred.username,
      role: cred.role,
      category: cred.category,
    });
    router.push("/");
  };

  return (
    <div className="flex min-h-[calc(100dvh-60px)] flex-col items-center px-4 pt-6 pb-8 md:px-8 md:pt-10">
      {/* Hero */}
      <div className="mb-8 w-full max-w-md text-center">
        <h1 className="text-[32px] font-extrabold leading-[1.05] tracking-tight text-ink md:text-[40px]">
          openhouse at apartment
        </h1>
        <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
          your favourite play-based learning programmes for children — now at your apartment.
        </p>
      </div>

      {/* Sign-in card */}
      <div className="w-full max-w-md rounded-card bg-brand-white p-6 shadow-float md:p-8">
        <h1 className="text-[22px] font-extrabold leading-tight text-ink md:text-[26px]">
          educator sign in
        </h1>
        <p className="mt-1 text-[13px] font-medium text-ink-muted">
          enter the login id and password you were given.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-[11px] font-bold text-ink-muted">
              login id
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="e.g. artteacher"
              className="mt-1 block w-full rounded-lg border border-ink/10 bg-bg/40 px-3 py-2.5 text-[14px] focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-ink-muted">
              password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="mt-1 block w-full rounded-lg border border-ink/10 bg-bg/40 px-3 py-2.5 text-[14px] focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !username.trim() || !password}
            className="w-full rounded-card bg-brand-orange py-3 text-[14px] font-extrabold text-white transition hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "signing in…" : "sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-[10px] text-ink-subtle">
          this stores your session on this device. no account creation.
        </p>
      </div>
    </div>
  );
}
