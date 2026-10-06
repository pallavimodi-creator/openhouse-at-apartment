"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { setTeacher, getTeacher, type TeacherState } from "@/lib/teacher-state";
import { apartmentLogin } from "@/lib/apartments";

/**
 * LAYER 2 — the shared APARTMENT login.
 * Reached after the generic login (layer 1), from the "set up your daily
 * dashboard" prompt. On success we KEEP the existing session (so the generic
 * category / content access is preserved) and add the apartment to it, then
 * send the teacher on to /teacher (layer 3) to pick their own name.
 */
export default function ApartmentLoginPage() {
  const router = useRouter();
  const [session, setSession] = useState<TeacherState | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const t = getTeacher();
    if (!t) {
      // Apartment login comes AFTER the generic login.
      router.replace("/login");
      return;
    }
    if (t.role === "admin" || t.programmeSlug === "*") {
      router.replace("/");
      return;
    }
    if (t.teacherId) {
      // Already a full teacher — nothing to do here.
      router.replace("/dashboard");
      return;
    }
    setSession(t);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    setError(null);
    setSubmitting(true);
    try {
      const { apartmentId, apartmentName } = await apartmentLogin(username.trim(), password);
      // Keep the generic session (category / programmeSlug / username stay as
      // the content fallback) and add the apartment.
      setTeacher({
        ...session,
        role: "teacher",
        apartmentId,
        apartmentName,
        building: apartmentName,
      });
      router.push("/teacher");
    } catch (err) {
      setError(err instanceof Error ? err.message : "sign in failed");
      setSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[12px] font-medium text-ink-subtle">loading…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-60px)] w-full max-w-md flex-col px-4 pt-6 pb-8 md:pt-10">
      <button
        type="button"
        onClick={() => router.push("/")}
        className="mb-4 inline-flex items-center gap-1 self-start text-[12px] font-semibold text-ink-muted transition hover:text-ink"
      >
        <ChevronLeft className="h-4 w-4" /> back to content
      </button>

      <div className="rounded-card bg-brand-white p-6 shadow-float md:p-8">
        <p className="text-[11px] font-bold text-brand-orange">step 2 of 2 · daily dashboard</p>
        <h1 className="mt-1 text-[22px] font-extrabold leading-tight text-ink md:text-[26px]">
          apartment sign in
        </h1>
        <p className="mt-1 text-[13px] font-medium text-ink-muted">
          enter your apartment&apos;s shared login. you&apos;ll pick your own name next.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-[11px] font-bold text-ink-muted">apartment login id</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="e.g. raheja-vihar"
              className="mt-1 block w-full rounded-lg border border-ink/10 bg-bg/40 px-3 py-2.5 text-[14px] focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-ink-muted">password</label>
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
            {submitting ? "signing in…" : "continue"}
          </button>
        </form>

        <p className="mt-4 text-center text-[10px] text-ink-subtle">
          ask your admin for your apartment login and your own name + password.
        </p>
      </div>
    </div>
  );
}
