"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus, Building2, User, ChevronRight, KeyRound } from "lucide-react";
import { TeacherGate, useTeacher } from "@/components/TeacherGate";
import { getAdminKey, setAdminKey } from "@/lib/newsletter-submissions";
import {
  adminListApartments,
  adminCreateApartment,
  adminCreateTeacher,
  type AdminApartment,
} from "@/lib/apartments";
import { isFullAdmin } from "@/lib/teacher-state";
import type { TeacherCategory } from "@/lib/teacher-state";

const CATEGORIES: TeacherCategory[] = ["art", "language", "stem", "chess", "music"];

export default function AdminApartmentsPage() {
  return (
    <TeacherGate>
      <Content />
    </TeacherGate>
  );
}

function Content() {
  const { teacher } = useTeacher();
  const isAdmin = isFullAdmin(teacher);

  const [apartments, setApartments] = useState<AdminApartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);
  const [keyInput, setKeyInput] = useState("");

  // new-apartment form
  const [aptName, setAptName] = useState("");
  const [aptUser, setAptUser] = useState("");
  const [aptPass, setAptPass] = useState("");
  const [creating, setCreating] = useState(false);

  // new-teacher-login form (pick an existing apartment from the dropdown)
  const [tAptId, setTAptId] = useState("");
  const [tName, setTName] = useState("");
  const [tUser, setTUser] = useState("");
  const [tPass, setTPass] = useState("");
  const [tCats, setTCats] = useState<TeacherCategory[]>([]);
  const [addingTeacher, setAddingTeacher] = useState(false);
  const [teacherMsg, setTeacherMsg] = useState<string | null>(null);
  const [teacherErr, setTeacherErr] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await adminListApartments();
      setApartments(list);
      setNeedsKey(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "could not load";
      if (msg.toLowerCase().includes("unauthorized")) setNeedsKey(true);
      else setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) refresh();
  }, [isAdmin, refresh]);

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <p className="text-[13px] font-semibold text-ink-muted">this page is for admins only.</p>
      </div>
    );
  }

  const createApartment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      await adminCreateApartment(aptName.trim(), aptUser.trim(), aptPass);
      setAptName("");
      setAptUser("");
      setAptPass("");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "could not create apartment");
    } finally {
      setCreating(false);
    }
  };

  const toggleCat = (c: TeacherCategory) =>
    setTCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const createTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingTeacher(true);
    setTeacherErr(null);
    setTeacherMsg(null);
    try {
      const apt = apartments.find((a) => a.id === tAptId);
      await adminCreateTeacher(tAptId, {
        name: tName.trim(),
        username: tUser.trim(),
        password: tPass,
        categories: tCats,
      });
      setTeacherMsg(`added “${tName.trim()}” to ${apt?.name ?? "the apartment"}.`);
      setTName("");
      setTUser("");
      setTPass("");
      setTCats([]);
      await refresh();
    } catch (e) {
      setTeacherErr(e instanceof Error ? e.message : "could not add teacher login");
    } finally {
      setAddingTeacher(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-5 pb-28">
      <Link href="/" className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-muted transition hover:text-ink">
        <ChevronLeft className="h-4 w-4" /> back
      </Link>
      <div className="mb-4 mt-2">
        <h1 className="text-[20px] font-extrabold lowercase text-ink">apartments &amp; teachers</h1>
        <p className="mt-0.5 text-[12px] text-ink-muted">
          create apartments, add teacher logins to them, and open an apartment to see everyone&apos;s daily logs.
        </p>
      </div>

      {needsKey && (
        <div className="mb-4 rounded-card bg-brand-white p-4 shadow-card">
          <p className="text-[12px] font-semibold text-ink">enter the admin key to manage apartments.</p>
          <div className="mt-2 flex gap-2">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="admin key"
              className="flex-1 rounded-lg border border-ink/10 bg-bg/40 px-3 py-2 text-[13px] focus:border-brand-orange focus:outline-none"
            />
            <button
              onClick={() => {
                setAdminKey(keyInput.trim());
                refresh();
              }}
              className="rounded-lg bg-brand-orange px-4 py-2 text-[13px] font-bold text-white"
            >
              unlock
            </button>
          </div>
        </div>
      )}

      {error && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">{error}</p>}

      {/* 1 · Add an apartment */}
      <form onSubmit={createApartment} className="mb-5 rounded-card bg-brand-white p-5 shadow-card">
        <p className="mb-3 flex items-center gap-1.5 text-[13px] font-extrabold lowercase text-ink">
          <Building2 className="h-4 w-4 text-brand-orange" /> add an apartment
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <Field label="apartment name" value={aptName} onChange={setAptName} placeholder="e.g. raheja vihar" />
          <Field label="login id" value={aptUser} onChange={setAptUser} placeholder="e.g. raheja-vihar" />
          <Field label="password" value={aptPass} onChange={setAptPass} placeholder="shared password" type="password" />
        </div>
        <button
          type="submit"
          disabled={creating || !aptName.trim() || !aptUser.trim() || !aptPass}
          className="mt-3 inline-flex items-center gap-1.5 rounded-card bg-brand-orange px-4 py-2 text-[13px] font-bold text-white disabled:opacity-40"
        >
          <Plus className="h-4 w-4" /> {creating ? "creating…" : "add apartment"}
        </button>
      </form>

      {/* 2 · Add a teacher login (pick the apartment from the dropdown) */}
      <form onSubmit={createTeacher} className="mb-6 rounded-card bg-brand-white p-5 shadow-card">
        <p className="mb-3 flex items-center gap-1.5 text-[13px] font-extrabold lowercase text-ink">
          <KeyRound className="h-4 w-4 text-brand-orange" /> add a teacher login
        </p>
        <label className="block">
          <span className="text-[11px] font-bold text-ink-muted">apartment</span>
          <select
            value={tAptId}
            onChange={(e) => setTAptId(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-ink/10 bg-brand-white px-3 py-2 text-[13px] focus:border-brand-orange focus:outline-none"
          >
            <option value="">select an apartment…</option>
            {apartments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          {apartments.length === 0 && !loading && (
            <span className="mt-1 block text-[11px] text-ink-subtle">add an apartment above first.</span>
          )}
        </label>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <Field label="teacher name" value={tName} onChange={setTName} placeholder="e.g. riya" />
          <Field label="login id" value={tUser} onChange={setTUser} placeholder="e.g. riya" />
          <Field label="password" value={tPass} onChange={setTPass} placeholder="password" type="password" />
        </div>
        <div className="mt-3">
          <p className="text-[11px] font-bold text-ink-muted">subjects they teach</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCat(c)}
                className={
                  "rounded-chip px-2.5 py-1 text-[12px] font-semibold transition " +
                  (tCats.includes(c)
                    ? "bg-brand-orange text-white"
                    : "bg-bg/60 text-ink-muted ring-1 ring-ink/10 hover:text-ink")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {teacherErr && <p className="mt-2 text-[12px] font-medium text-red-700">{teacherErr}</p>}
        {teacherMsg && <p className="mt-2 text-[12px] font-medium text-segment-green">{teacherMsg}</p>}
        <button
          type="submit"
          disabled={addingTeacher || !tAptId || !tName.trim() || !tUser.trim() || !tPass}
          className="mt-3 inline-flex items-center gap-1.5 rounded-card bg-brand-orange px-4 py-2 text-[13px] font-bold text-white disabled:opacity-40"
        >
          <Plus className="h-4 w-4" /> {addingTeacher ? "adding…" : "add login"}
        </button>
      </form>

      {/* Apartments + their teacher logins */}
      <h2 className="mb-2 text-[14px] font-extrabold lowercase text-ink">apartments</h2>
      {loading ? (
        <p className="text-[12px] text-ink-subtle">loading…</p>
      ) : apartments.length === 0 && !needsKey ? (
        <p className="rounded-lg bg-brand-cream px-3 py-3 text-[12px] font-medium text-ink-muted">
          no apartments yet — add one above.
        </p>
      ) : (
        <div className="space-y-3">
          {apartments.map((apt) => (
            <div key={apt.id} className="rounded-card bg-brand-white p-4 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange/12 text-brand-orange">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[15px] font-extrabold lowercase text-ink">{apt.name}</p>
                    <p className="text-[11px] text-ink-subtle">
                      login: {apt.loginUsername} · {apt.teachers.length} teacher{apt.teachers.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/admin/apartments/${apt.id}`}
                  className="inline-flex items-center gap-1 rounded-chip bg-brand-cream px-3 py-1.5 text-[12px] font-bold text-ink-muted transition hover:text-ink"
                >
                  daily logs <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {apt.teachers.length === 0 ? (
                  <span className="text-[12px] text-ink-subtle">no teacher logins yet.</span>
                ) : (
                  apt.teachers.map((t) => (
                    <span
                      key={t.id}
                      className="inline-flex items-center gap-1.5 rounded-chip bg-bg/60 px-2.5 py-1 text-[12px] font-semibold text-ink"
                    >
                      <User className="h-3 w-3 text-brand-orange" /> {t.name}
                      <span className="text-ink-subtle">· {apt.name}</span>
                      {t.categories.length > 0 && (
                        <span className="text-ink-subtle">· {t.categories.join(" · ")}</span>
                      )}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold text-ink-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-lg border border-ink/10 bg-brand-white px-3 py-2 text-[13px] focus:border-brand-orange focus:outline-none"
      />
    </label>
  );
}
