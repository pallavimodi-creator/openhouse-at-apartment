"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, CheckCircle2 } from "lucide-react";
import { getTeacher, teacherCategories, type TeacherState } from "@/lib/teacher-state";
import { listHomeProgrammes } from "@/lib/content";
import {
  partsForCategory,
  REASONS,
  listDailyLogs,
  upsertDailyLog,
  type DailyEntry,
} from "@/lib/apartments";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [teacher, setTeacher] = useState<TeacherState | null>(null);
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState(today());
  const [entries, setEntries] = useState<Record<string, DailyEntry>>({});
  const [freeNote, setFreeNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = getTeacher();
    if (!t) return void router.replace("/login");
    if (t.role === "admin" || t.programmeSlug === "*") return void router.replace("/");
    // The daily form needs the full apartment + teacher login (layer 2 + 3).
    if (!t.apartmentId) return void router.replace("/apartment");
    if (!t.teacherId) return void router.replace("/teacher");
    setTeacher(t);
    setReady(true);
  }, [router]);

  const myProgrammes = useMemo(() => {
    const cats = teacherCategories(teacher);
    return listHomeProgrammes().filter((p) => cats.includes(p.category as (typeof cats)[number]));
  }, [teacher]);

  useEffect(() => {
    if (myProgrammes.length && !slug) setSlug(myProgrammes[0].slug);
  }, [myProgrammes, slug]);

  const programme = myProgrammes.find((p) => p.slug === slug) ?? null;

  // Load today's existing entry for this class, else default every part to "done".
  useEffect(() => {
    if (!teacher?.apartmentId || !programme) return;
    const parts = partsForCategory(programme.category);
    let cancelled = false;
    (async () => {
      const base: Record<string, DailyEntry> = {};
      parts.forEach((p) => (base[p] = { part: p, done: true }));
      let note = "";
      try {
        const logs = await listDailyLogs(teacher.apartmentId!, date, date);
        const mine = logs.find((l) => l.teacherId === teacher.teacherId && l.programmeSlug === slug);
        if (mine) {
          mine.entries.forEach((e) => (base[e.part] = { part: e.part, done: e.done, reason: e.reason, note: e.note }));
          note = mine.freeNote ?? "";
        }
      } catch {
        /* offline / unconfigured — start blank */
      }
      if (cancelled) return;
      setEntries(base);
      setFreeNote(note);
      setSaved(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [teacher, programme, slug, date]);

  const parts = programme ? partsForCategory(programme.category) : [];

  const setDone = (part: string, done: boolean) =>
    setEntries((prev) => ({
      ...prev,
      [part]: done ? { part, done: true } : { ...prev[part], part, done: false },
    }));
  const patch = (part: string, p: Partial<DailyEntry>) =>
    setEntries((prev) => ({ ...prev, [part]: { ...prev[part], part, ...p } }));

  const save = async () => {
    if (!teacher || !programme) return;
    setSaving(true);
    setError(null);
    try {
      await upsertDailyLog({
        apartmentId: teacher.apartmentId!,
        teacherId: teacher.teacherId!,
        teacherName: teacher.teacherName,
        date,
        programmeSlug: slug,
        programmeTitle: programme.title,
        entries: parts.map((p) => entries[p] ?? { part: p, done: true }),
        freeNote,
      });
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "could not save");
    } finally {
      setSaving(false);
    }
  };

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[12px] font-medium text-ink-subtle">loading…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 pb-28">
      <h1 className="text-[20px] font-extrabold lowercase text-ink">today&apos;s log</h1>
      <p className="mt-0.5 text-[12px] text-ink-muted">
        mark what you ran today. for anything you didn&apos;t do, pick why.
      </p>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="block min-w-[200px] flex-1">
          <span className="text-[11px] font-bold text-ink-muted">class</span>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-ink/10 bg-brand-white px-3 py-2 text-[13px] focus:border-brand-orange focus:outline-none"
          >
            {myProgrammes.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-[11px] font-bold text-ink-muted">date</span>
          <input
            type="date"
            value={date}
            max={today()}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block rounded-lg border border-ink/10 bg-brand-white px-3 py-2 text-[13px]"
          />
        </label>
      </div>

      {myProgrammes.length === 0 ? (
        <p className="mt-6 rounded-lg bg-brand-cream px-3 py-3 text-[12px] font-medium text-ink-muted">
          no programmes assigned to you yet — ask your admin.
        </p>
      ) : (
        <>
          <div className="mt-5 space-y-3">
            {parts.map((part) => {
              const e = entries[part] ?? { part, done: true };
              return (
                <div key={part} className="rounded-card bg-brand-white p-4 shadow-card">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[14px] font-bold lowercase text-ink">{part}</span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setDone(part, true)}
                        className={
                          "inline-flex items-center gap-1 rounded-chip px-3 py-1.5 text-[12px] font-bold transition " +
                          (e.done ? "bg-segment-green/20 text-ink ring-1 ring-segment-green/50" : "bg-bg/60 text-ink-muted")
                        }
                      >
                        <Check className="h-3.5 w-3.5" /> did it
                      </button>
                      <button
                        type="button"
                        onClick={() => setDone(part, false)}
                        className={
                          "inline-flex items-center gap-1 rounded-chip px-3 py-1.5 text-[12px] font-bold transition " +
                          (!e.done ? "bg-red-100 text-red-700 ring-1 ring-red-300" : "bg-bg/60 text-ink-muted")
                        }
                      >
                        <X className="h-3.5 w-3.5" /> skipped
                      </button>
                    </div>
                  </div>
                  {!e.done && (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-[11px] font-bold text-ink-muted">why?</span>
                        <select
                          value={e.reason ?? ""}
                          onChange={(ev) => patch(part, { reason: ev.target.value })}
                          className="mt-1 block w-full rounded-lg border border-ink/10 bg-bg/40 px-3 py-2 text-[13px]"
                        >
                          <option value="">select a reason…</option>
                          {REASONS.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className="text-[11px] font-bold text-ink-muted">note (optional)</span>
                        <input
                          type="text"
                          value={e.note ?? ""}
                          onChange={(ev) => patch(part, { note: ev.target.value })}
                          placeholder="what you did instead…"
                          className="mt-1 block w-full rounded-lg border border-ink/10 bg-bg/40 px-3 py-2 text-[13px]"
                        />
                      </label>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <label className="mt-4 block">
            <span className="text-[11px] font-bold text-ink-muted">anything else about today?</span>
            <textarea
              value={freeNote}
              onChange={(e) => setFreeNote(e.target.value)}
              rows={3}
              placeholder="a highlight, a problem, something to flag…"
              className="mt-1 block w-full rounded-lg border border-ink/10 bg-brand-white px-3 py-2 text-[13px] focus:border-brand-orange focus:outline-none"
            />
          </label>

          {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">{error}</p>}

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="rounded-card bg-brand-orange px-5 py-2.5 text-[14px] font-extrabold text-white transition hover:opacity-95 disabled:opacity-40"
            >
              {saving ? "saving…" : saved ? "saved ✓" : "save today's log"}
            </button>
            {saved && (
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-segment-green">
                <CheckCircle2 className="h-4 w-4" /> saved to the apartment dashboard
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
