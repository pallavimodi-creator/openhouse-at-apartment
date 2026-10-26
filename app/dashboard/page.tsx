"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Plus } from "lucide-react";
import { getTeacher, isFullAdmin, isGuest, type TeacherState } from "@/lib/teacher-state";
import { listDailyLogs, type DailyLog } from "@/lib/apartments";
import { DailyLogCard } from "@/components/DailyLogCard";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [teacher, setTeacher] = useState<TeacherState | null>(null);
  const [date, setDate] = useState(today());
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = getTeacher();
    if (!t) return void router.replace("/login");
    if (isGuest(t)) return void router.replace("/"); // guest has no dashboard
    if (isFullAdmin(t)) return void router.replace("/admin/apartments");
    // The shared dashboard needs the full apartment + teacher login (layer 2 + 3).
    if (!t.apartmentId) return void router.replace("/apartment");
    if (!t.teacherId) return void router.replace("/teacher");
    setTeacher(t);
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!teacher?.apartmentId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    listDailyLogs(teacher.apartmentId, date, date)
      .then((l) => !cancelled && setLogs(l))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : "could not load"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [teacher, date]);

  if (!ready || !teacher) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[12px] font-medium text-ink-subtle">loading…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 pb-28">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-[20px] font-extrabold lowercase text-ink">apartment dashboard</h1>
          <p className="mt-0.5 text-[12px] text-ink-muted">
            {teacher.apartmentName ? `${teacher.apartmentName} · ` : ""}what everyone ran. you can only edit your own.
          </p>
        </div>
        <Link
          href="/daily"
          className="inline-flex items-center gap-1.5 rounded-card bg-brand-orange px-3.5 py-2 text-[13px] font-bold text-white"
        >
          <Plus className="h-4 w-4" /> my log
        </Link>
      </div>

      <div className="mt-4">
        <label className="inline-block">
          <span className="text-[11px] font-bold text-ink-muted">date</span>
          <input
            type="date"
            value={date}
            max={today()}
            onChange={(e) => setDate(e.target.value)}
            className="ml-2 rounded-lg border border-ink/10 bg-brand-white px-3 py-1.5 text-[13px]"
          />
        </label>
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">{error}</p>}

      <div className="mt-5 space-y-3">
        {loading ? (
          <p className="text-[12px] text-ink-subtle">loading…</p>
        ) : logs.length === 0 ? (
          <p className="rounded-lg bg-brand-cream px-3 py-3 text-[12px] font-medium text-ink-muted">
            no logs for this day yet.
          </p>
        ) : (
          logs.map((l) => {
            const mine = l.teacherId === teacher.teacherId;
            return (
              <div key={l.id} className="relative">
                <DailyLogCard log={l} showTeacher />
                {mine && (
                  <Link
                    href="/daily"
                    className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-chip bg-brand-cream px-2 py-1 text-[11px] font-bold text-ink-muted transition hover:text-ink"
                  >
                    <Pencil className="h-3 w-3" /> edit
                  </Link>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
