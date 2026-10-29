"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { TeacherGate, useTeacher } from "@/components/TeacherGate";
import { DailyLogCard } from "@/components/DailyLogCard";
import {
  listDailyLogs,
  listTrackerNotes,
  listClassCompletions,
  type DailyLog,
  type TrackerNote,
  type ClassCompletion,
} from "@/lib/apartments";
import { isFullAdmin } from "@/lib/teacher-state";

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export default function AdminApartmentLogsPage() {
  return (
    <TeacherGate>
      <Content />
    </TeacherGate>
  );
}

function Content() {
  const { teacher } = useTeacher();
  const isAdmin = isFullAdmin(teacher);
  const params = useParams<{ id: string }>();
  const apartmentId = params.id;

  const [from, setFrom] = useState(daysAgo(13));
  const [to, setTo] = useState(daysAgo(0));
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [notes, setNotes] = useState<TrackerNote[]>([]);
  const [completions, setCompletions] = useState<ClassCompletion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setLogs(await listDailyLogs(apartmentId, from, to));
    } catch (e) {
      setError(e instanceof Error ? e.message : "could not load logs");
    } finally {
      setLoading(false);
    }
  }, [apartmentId, from, to]);

  useEffect(() => {
    if (isAdmin) refresh();
  }, [isAdmin, refresh]);

  // Shared progress notes + class completions (not date-ranged — load once).
  useEffect(() => {
    if (!isAdmin) return;
    listTrackerNotes(apartmentId).then(setNotes).catch(() => {});
    listClassCompletions(apartmentId).then(setCompletions).catch(() => {});
  }, [isAdmin, apartmentId]);

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <p className="text-[13px] font-semibold text-ink-muted">this page is for admins only.</p>
      </div>
    );
  }

  // group by date (newest first), then teacher within a date
  const byDate = new Map<string, DailyLog[]>();
  logs.forEach((l) => {
    (byDate.get(l.date) ?? byDate.set(l.date, []).get(l.date)!).push(l);
  });
  const dates = Array.from(byDate.keys()).sort((a, b) => (a < b ? 1 : -1));

  return (
    <div className="mx-auto max-w-3xl px-4 py-5 pb-28">
      <Link href="/admin/apartments" className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-muted transition hover:text-ink">
        <ChevronLeft className="h-4 w-4" /> all apartments
      </Link>
      <div className="mb-4 mt-2">
        <h1 className="text-[20px] font-extrabold lowercase text-ink">apartment activity</h1>
        <p className="mt-0.5 text-[12px] text-ink-muted">daily logs, monthly progress notes and classes completed for this apartment.</p>
      </div>

      <div className="mb-5 flex flex-wrap items-end gap-3 rounded-card bg-brand-white p-3 shadow-card">
        <label className="block">
          <span className="text-[11px] font-bold text-ink-muted">from</span>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1 block rounded-lg border border-ink/10 bg-bg/40 px-3 py-1.5 text-[13px]" />
        </label>
        <label className="block">
          <span className="text-[11px] font-bold text-ink-muted">to</span>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="mt-1 block rounded-lg border border-ink/10 bg-bg/40 px-3 py-1.5 text-[13px]" />
        </label>
      </div>

      {error && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">{error}</p>}

      {loading ? (
        <p className="text-[12px] text-ink-subtle">loading…</p>
      ) : logs.length === 0 ? (
        <p className="rounded-lg bg-brand-cream px-3 py-3 text-[12px] font-medium text-ink-muted">no logs in this range.</p>
      ) : (
        <div className="space-y-6">
          {dates.map((d) => (
            <div key={d}>
              <h3 className="mb-2 text-[13px] font-extrabold text-ink">{d}</h3>
              <div className="space-y-3">
                {(byDate.get(d) ?? []).map((l) => (
                  <DailyLogCard key={l.id} log={l} showTeacher showDate={false} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── monthly progress notes (shared) ── */}
      <div className="mb-3 mt-10">
        <h2 className="text-[18px] font-extrabold lowercase text-ink">progress notes</h2>
        <p className="mt-0.5 text-[12px] text-ink-muted">every monthly tracker note filled for this apartment.</p>
      </div>
      {notes.length === 0 ? (
        <p className="rounded-lg bg-brand-cream px-3 py-3 text-[12px] font-medium text-ink-muted">no progress notes yet.</p>
      ) : (
        <div className="space-y-2">
          {notes.map((n) => (
            <div key={n.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-card bg-brand-white px-3 py-2.5 shadow-card">
              <span className="text-[14px] font-extrabold text-ink">{n.childName}</span>
              <span className="text-[11px] font-semibold text-ink-muted">
                {n.subject} · {n.level} · ages {n.ageBand} · {n.month}
              </span>
              {n.ready && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
                  ready for assessment
                </span>
              )}
              <span className="ml-auto text-[11px] text-ink-subtle">{n.teacherName}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── classes completed (shared) ── */}
      <div className="mb-3 mt-10">
        <h2 className="text-[18px] font-extrabold lowercase text-ink">classes completed</h2>
        <p className="mt-0.5 text-[12px] text-ink-muted">how many session days each teacher has marked done, per programme.</p>
      </div>
      {completions.length === 0 ? (
        <p className="rounded-lg bg-brand-cream px-3 py-3 text-[12px] font-medium text-ink-muted">no completed classes recorded yet.</p>
      ) : (
        <div className="space-y-2">
          {completions.map((c) => (
            <div key={c.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-card bg-brand-white px-3 py-2.5 shadow-card">
              <span className="text-[14px] font-extrabold text-ink">{c.teacherName}</span>
              <span className="text-[11px] font-semibold text-ink-muted">{c.programmeTitle}</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
                {c.completedDays.length} classes done
              </span>
              <span className="ml-auto text-[11px] text-ink-subtle">
                {c.completedDays.length ? `up to day ${Math.max(...c.completedDays)}` : "—"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
