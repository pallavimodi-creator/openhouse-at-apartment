"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, User, ChevronRight } from "lucide-react";
import {
  getTeacher,
  setTeacher,
  clearTeacher,
  type TeacherCategory,
} from "@/lib/teacher-state";
import {
  listApartmentTeachers,
  teacherLogin,
  type ApartmentTeacher,
} from "@/lib/apartments";
import { listHomeProgrammes } from "@/lib/content";

// A nominal default programme slug (first programme of the teacher's first
// category) so the footer's quick "overview / plans" links have a target.
function defaultSlug(categories: TeacherCategory[]): string {
  const progs = listHomeProgrammes();
  for (const c of categories) {
    const p = progs.find((pr) => pr.category === c);
    if (p) return p.slug;
  }
  return "";
}

export default function TeacherPickPage() {
  const router = useRouter();
  const [apartmentId, setApartmentId] = useState("");
  const [apartmentName, setApartmentName] = useState("");
  const [teachers, setTeachers] = useState<ApartmentTeacher[]>([]);
  const [selected, setSelected] = useState<ApartmentTeacher | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const t = getTeacher();
    if (!t) {
      router.replace("/login");
      return;
    }
    if (t.role === "admin" || t.programmeSlug === "*") {
      router.replace("/");
      return;
    }
    if (!t.apartmentId) {
      router.replace("/login");
      return;
    }
    if (t.teacherId) {
      router.replace("/");
      return;
    }
    setApartmentId(t.apartmentId);
    setApartmentName(t.apartmentName ?? "");
    listApartmentTeachers(t.apartmentId)
      .then(setTeachers)
      .catch((e) => setError(e instanceof Error ? e.message : "could not load teachers"))
      .finally(() => setLoading(false));
  }, [router]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setError(null);
    setSubmitting(true);
    try {
      const r = await teacherLogin(apartmentId, selected.id, password);
      setTeacher({
        role: "teacher",
        apartmentId,
        apartmentName,
        building: apartmentName,
        teacherId: r.teacherId,
        teacherName: r.name,
        categories: r.categories,
        programmeSlug: defaultSlug(r.categories),
      });
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "incorrect password");
      setSubmitting(false);
    }
  };

  const switchApartment = () => {
    clearTeacher();
    router.push("/login");
  };

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-60px)] w-full max-w-md flex-col px-4 pt-6 pb-8 md:pt-10">
      <button
        type="button"
        onClick={switchApartment}
        className="mb-4 inline-flex items-center gap-1 self-start text-[12px] font-semibold text-ink-muted transition hover:text-ink"
      >
        <ChevronLeft className="h-4 w-4" /> switch apartment
      </button>

      <div className="rounded-card bg-brand-white p-6 shadow-float md:p-8">
        <p className="text-[11px] font-bold text-brand-orange">
          {apartmentName ? `apartment · ${apartmentName}` : "apartment"}
        </p>
        <h1 className="mt-1 text-[22px] font-extrabold leading-tight text-ink md:text-[26px]">
          who are you?
        </h1>

        {!selected ? (
          <>
            <p className="mt-1 text-[13px] font-medium text-ink-muted">
              pick your name to sign in to your dashboard.
            </p>
            {loading ? (
              <p className="mt-6 text-[12px] text-ink-subtle">loading teachers…</p>
            ) : error ? (
              <p className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">
                {error}
              </p>
            ) : teachers.length === 0 ? (
              <p className="mt-6 rounded-lg bg-brand-cream px-3 py-3 text-[12px] font-medium text-ink-muted">
                no teachers have been added to this apartment yet. ask your admin to create
                your login.
              </p>
            ) : (
              <ul className="mt-5 space-y-2">
                {teachers.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(t);
                        setError(null);
                        setPassword("");
                      }}
                      className="flex w-full items-center gap-3 rounded-xl border border-ink/10 bg-bg/40 px-4 py-3 text-left transition hover:border-brand-orange hover:bg-brand-cream"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/12 text-brand-orange">
                        <User className="h-4 w-4" />
                      </span>
                      <span className="flex-1 text-[14px] font-bold lowercase text-ink">
                        {t.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-ink-subtle" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <form onSubmit={signIn} className="mt-5 space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-brand-cream px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/12 text-brand-orange">
                <User className="h-4 w-4" />
              </span>
              <span className="flex-1 text-[14px] font-bold lowercase text-ink">
                {selected.name}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setPassword("");
                  setError(null);
                }}
                className="text-[11px] font-semibold text-ink-muted underline-offset-2 hover:text-ink hover:underline"
              >
                change
              </button>
            </div>
            <div>
              <label className="text-[11px] font-bold text-ink-muted">your password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
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
              disabled={submitting || !password}
              className="w-full rounded-card bg-brand-orange py-3 text-[14px] font-extrabold text-white transition hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "signing in…" : "sign in"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
