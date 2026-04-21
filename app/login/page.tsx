"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setTeacher, getTeacher } from "@/lib/teacher-state";
import { validateCredentials } from "@/lib/credentials";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already signed in, go straight through
  useEffect(() => {
    const existing = getTeacher();
    if (existing) {
      // Admins and category-scoped teachers land on the home grid so they can
      // pick an age group. Single-programme teachers jump straight into their
      // programme.
      const toHome = existing.programmeSlug === "*" || !!existing.category;
      router.replace(toHome ? "/" : `/${existing.programmeSlug}`);
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
    const toHome = cred.role === "admin" || !!cred.category;
    router.push(toHome ? "/" : `/${cred.programmeSlug}`);
  };

  return (
    <div className="flex min-h-[calc(100dvh-60px)] flex-col items-center px-4 pt-6 pb-8 md:px-8 md:pt-10">
      {/* Hero */}
      <div className="mb-8 w-full max-w-md text-center">
        <h1
          className="text-[32px] font-extrabold leading-[1.05] tracking-tight text-ink md:text-[40px]"
          style={{
            fontFamily:
              '"Avenir Next Rounded Std", "Avenir Next", "Nunito", system-ui, sans-serif',
          }}
        >
          openhouse at apartment
        </h1>
        <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
          your favourite play-based learning programmes for children — now at your apartment.
        </p>
      </div>

      {/* Sign-in card */}
      <div className="w-full max-w-md rounded-card bg-brand-white p-6 shadow-float md:p-8">
        <h1 className="text-[22px] font-extrabold leading-tight text-ink md:text-[26px]">
          teacher sign in
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
              placeholder="e.g. art58-01"
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
