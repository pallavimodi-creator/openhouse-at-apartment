"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setTeacher, getTeacher } from "@/lib/teacher-state";
import { validateCredentials } from "@/lib/credentials";
import { apartmentLogin } from "@/lib/apartments";

/**
 * Step 1 of the two-step sign-in: the shared APARTMENT login.
 * On success the teacher goes to /teacher to pick their own name + password.
 * A secondary "admin" mode signs the platform admin in directly.
 */
export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"apartment" | "admin">("apartment");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const existing = getTeacher();
    if (!existing) return;
    const admin = existing.role === "admin" || existing.programmeSlug === "*";
    if (admin) {
      router.replace("/");
    } else if (existing.apartmentId && !existing.teacherId) {
      router.replace("/teacher");
    } else if (existing.teacherId) {
      router.replace("/");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "admin") {
        const cred = validateCredentials(username, password);
        if (!cred) {
          setError("incorrect admin login");
          setSubmitting(false);
          return;
        }
        setTeacher({
          teacherName: cred.displayName,
          programmeSlug: cred.programmeSlug,
          username: cred.username,
          role: cred.role,
        });
        router.push("/");
        return;
      }
      const { apartmentId, apartmentName } = await apartmentLogin(username.trim(), password);
      // partial session: apartment known, teacher not yet picked.
      setTeacher({
        programmeSlug: "",
        teacherName: "",
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

  const isAdmin = mode === "admin";

  return (
    <div className="flex min-h-[calc(100dvh-60px)] flex-col items-center px-4 pt-6 pb-8 md:px-8 md:pt-10">
      <div className="mb-8 w-full max-w-md text-center">
        <h1 className="text-[32px] font-extrabold leading-[1.05] tracking-tight text-ink md:text-[40px]">
          openhouse at apartment
        </h1>
        <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
          your favourite play-based learning programmes for children — now at your apartment.
        </p>
      </div>

      <div className="w-full max-w-md rounded-card bg-brand-white p-6 shadow-float md:p-8">
        <h1 className="text-[22px] font-extrabold leading-tight text-ink md:text-[26px]">
          {isAdmin ? "admin sign in" : "apartment sign in"}
        </h1>
        <p className="mt-1 text-[13px] font-medium text-ink-muted">
          {isAdmin
            ? "sign in with the admin login."
            : "enter your apartment's shared login. you'll pick your own name next."}
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-[11px] font-bold text-ink-muted">
              {isAdmin ? "admin login" : "apartment login id"}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder={isAdmin ? "admin" : "e.g. raheja-vihar"}
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

        <button
          type="button"
          onClick={() => {
            setMode(isAdmin ? "apartment" : "admin");
            setError(null);
            setUsername("");
            setPassword("");
          }}
          className="mt-4 w-full text-center text-[11px] font-semibold text-ink-muted underline-offset-2 hover:text-ink hover:underline"
        >
          {isAdmin ? "← apartment sign in" : "admin sign in →"}
        </button>

        <p className="mt-4 text-center text-[10px] text-ink-subtle">
          this stores your session on this device. no account creation.
        </p>
      </div>
    </div>
  );
}
