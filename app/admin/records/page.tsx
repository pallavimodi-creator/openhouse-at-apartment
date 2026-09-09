"use client";

/**
 * /admin/records — ADMIN-ONLY dashboard of teacher class records.
 *
 * Reads the central teacher_progress log (Supabase) and shows results by
 * educator name: how many sessions each has marked complete, across which
 * programmes and buildings, plus a full downloadable CSV. Reuses the same
 * admin key as the newsletter admin (stored in localStorage, prompted once).
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Download, RefreshCw } from "lucide-react";
import { TeacherGate, useTeacher } from "@/components/TeacherGate";

const ADMIN_KEY_STORE = "oh-newsletter-admin-key";

interface Record {
  id: string;
  educator_name: string;
  username: string;
  category: string | null;
  age_scope: string | null;
  building: string | null;
  programme_slug: string;
  programme_title: string | null;
  day: number;
  completed: boolean;
  updated_at: string;
}

export default function AdminRecordsPage() {
  return (
    <TeacherGate>
      <Content />
    </TeacherGate>
  );
}

function Content() {
  const { teacher } = useTeacher();
  const isAdmin = !!teacher && (teacher.role === "admin" || teacher.programmeSlug === "*");

  const [rows, setRows] = useState<Record[] | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "need-key" | "error" | "unconfigured">("idle");
  const [keyInput, setKeyInput] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async (key: string) => {
    setStatus("loading");
    setErr(null);
    try {
      const res = await fetch("/api/progress", { headers: { "x-admin-key": key } });
      if (res.status === 401) {
        setStatus("need-key");
        setErr("wrong admin key.");
        return;
      }
      if (res.status === 503) {
        setStatus("unconfigured");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setErr("could not load records.");
        return;
      }
      const json = await res.json();
      try { localStorage.setItem(ADMIN_KEY_STORE, key); } catch { /* ignore */ }
      setRows((json.rows as Record[]) ?? []);
      setStatus("idle");
    } catch {
      setStatus("error");
      setErr("could not load records.");
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    let stored = "";
    try { stored = localStorage.getItem(ADMIN_KEY_STORE) || ""; } catch { /* ignore */ }
    if (stored) load(stored);
    else setStatus("need-key");
  }, [isAdmin, load]);

  // ── aggregate by educator ──
  const completed = useMemo(() => (rows ?? []).filter((r) => r.completed), [rows]);
  const byEducator = useMemo(() => {
    const map = new Map<string, { name: string; total: number; buildings: Set<string>; programmes: Set<string>; last: string }>();
    for (const r of completed) {
      const k = r.educator_name || r.username;
      const e = map.get(k) ?? { name: k, total: 0, buildings: new Set(), programmes: new Set(), last: r.updated_at };
      e.total += 1;
      if (r.building) e.buildings.add(r.building);
      e.programmes.add(r.programme_title || r.programme_slug);
      if (r.updated_at > e.last) e.last = r.updated_at;
      map.set(k, e);
    }
    return [...map.values()].sort((a, b) => b.total - a.total);
  }, [completed]);

  const downloadCsv = () => {
    const cols = ["educator", "login id", "category", "age", "building", "programme", "day", "completed", "updated"];
    const lines = [cols.join(",")];
    for (const r of rows ?? []) {
      const vals = [r.educator_name, r.username, r.category ?? "", r.age_scope ?? "", r.building ?? "", r.programme_title || r.programme_slug, String(r.day), r.completed ? "yes" : "no", r.updated_at];
      lines.push(vals.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
    }
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(lines.join("\n"));
    a.download = "openhouse-teacher-records.csv";
    a.click();
  };

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <p className="text-[13px] font-semibold text-ink-muted">this dashboard is for admins only.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-5">
      <Link href="/" className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-muted transition hover:text-ink">
        <ChevronLeft className="h-4 w-4" /> back
      </Link>
      <div className="mb-4 mt-2 flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-[18px] font-extrabold lowercase text-ink">teacher records</h1>
          <p className="mt-0.5 text-[12px] text-ink-muted">
            every session an educator has marked complete, by name. going-forward data — logged centrally as teachers work.
          </p>
        </div>
        {rows && (
          <div className="flex items-center gap-2">
            <button onClick={downloadCsv} className="inline-flex items-center gap-1.5 rounded-lg border border-brand-orange px-3 py-2 text-[12px] font-bold text-brand-orange transition hover:bg-brand-orange/10">
              <Download className="h-3.5 w-3.5" /> download csv
            </button>
            <button onClick={() => { let s=""; try{s=localStorage.getItem(ADMIN_KEY_STORE)||"";}catch{} load(s); }} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange px-3 py-2 text-[12px] font-bold text-white transition hover:opacity-95">
              <RefreshCw className="h-3.5 w-3.5" /> refresh
            </button>
          </div>
        )}
      </div>

      {status === "loading" && <p className="text-[12px] text-ink-muted">loading…</p>}

      {status === "unconfigured" && (
        <div className="rounded-card bg-brand-white p-5 ring-1 ring-ink/5">
          <p className="text-[13px] font-semibold text-ink">records backend not configured yet.</p>
          <p className="mt-1 text-[12px] text-ink-muted">
            create the <code>teacher_progress</code> table in Supabase (see <code>supabase/teacher-progress.sql</code>) and ensure the Supabase env vars are set. records start logging once teachers mark sessions.
          </p>
        </div>
      )}

      {status === "need-key" && (
        <form
          onSubmit={(e) => { e.preventDefault(); if (keyInput.trim()) load(keyInput.trim()); }}
          className="max-w-sm rounded-card bg-brand-white p-5 ring-1 ring-ink/5"
        >
          <p className="text-[13px] font-semibold text-ink">enter the admin key</p>
          <p className="mt-1 text-[11px] text-ink-muted">the same key used for the newsletter admin.</p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            autoFocus
            className="mt-3 block w-full rounded-lg border border-ink/10 bg-bg/40 px-3 py-2.5 text-[14px] focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
          />
          {err && <p className="mt-2 text-[12px] font-medium text-red-600">{err}</p>}
          <button type="submit" disabled={!keyInput.trim()} className="mt-3 w-full rounded-card bg-brand-orange py-2.5 text-[13px] font-extrabold text-white transition hover:opacity-95 disabled:opacity-40">
            view records
          </button>
        </form>
      )}

      {status === "error" && <p className="text-[12px] font-medium text-red-600">{err}</p>}

      {rows && status === "idle" && (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat n={byEducator.length} label="educators active" />
            <Stat n={completed.length} label="sessions completed" />
            <Stat n={new Set(completed.map((r) => r.building).filter(Boolean)).size} label="buildings" />
            <Stat n={new Set(completed.map((r) => r.programme_title || r.programme_slug)).size} label="programmes" />
          </div>

          <h2 className="mb-2 text-[13px] font-extrabold lowercase text-ink">by educator</h2>
          <div className="overflow-x-auto rounded-card ring-1 ring-ink/10 bg-brand-white">
            <table className="w-full min-w-[640px] text-[12.5px]">
              <thead>
                <tr className="bg-bg/60 text-left text-[11px] font-bold text-ink-muted">
                  <th className="px-3 py-2.5">educator</th>
                  <th className="px-3 py-2.5">sessions done</th>
                  <th className="px-3 py-2.5">programmes</th>
                  <th className="px-3 py-2.5">buildings</th>
                  <th className="px-3 py-2.5">last activity</th>
                </tr>
              </thead>
              <tbody>
                {byEducator.length === 0 && (
                  <tr><td colSpan={5} className="px-3 py-8 text-center text-ink-muted">no records yet — they appear as teachers mark sessions.</td></tr>
                )}
                {byEducator.map((e) => (
                  <tr key={e.name} className="border-t border-ink/5">
                    <td className="px-3 py-2.5 font-semibold text-ink">{e.name}</td>
                    <td className="px-3 py-2.5 font-bold text-brand-orange">{e.total}</td>
                    <td className="px-3 py-2.5 text-ink-muted">{[...e.programmes].join(", ")}</td>
                    <td className="px-3 py-2.5 text-ink-muted">{[...e.buildings].join(", ") || "—"}</td>
                    <td className="px-3 py-2.5 text-ink-muted">{new Date(e.last).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-card bg-brand-white p-3.5 ring-1 ring-ink/5">
      <div className="text-[24px] font-extrabold leading-none text-brand-orange">{n}</div>
      <div className="mt-1 text-[11px] font-semibold text-ink-muted">{label}</div>
    </div>
  );
}
