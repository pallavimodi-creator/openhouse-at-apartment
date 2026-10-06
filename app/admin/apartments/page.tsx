"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus, Building2, User, ChevronRight } from "lucide-react";
import { TeacherGate, useTeacher } from "@/components/TeacherGate";
import { getAdminKey, setAdminKey } from "@/lib/newsletter-submissions";
import {
  adminListApartments,
  adminCreateApartment,
  adminCreateTeacher,
  type AdminApartment,
} from "@/lib/apartments";
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
  const isAdmin = !!teacher && (teacher.role === "admin" || teacher.programmeSlug === "*");

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

  return (
    <div className="mx-auto max-w-3xl px-4 py-5 pb-28">
      <Link href="/" className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-muted transition hover:text-ink">
        <ChevronLeft className="h-4 w-4" /> back
      </Link>
      <div className="mb-4 mt-2">
        <h1 className="text-[20px] font-extrabold lowercase text-ink">apartments &amp; teachers</h1>
        <p className="mt-0.5 text-[12px] text-ink-muted">
          create apartments, add teacher logins, and open an apartment to see everyone&apos;s daily logs.
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

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">{error}</p>
      )}

      {/* Add apartment */}
      <form onSubmit={createApartment} className="mb-6 rounded-card bg-brand-white p-5 shadow-card">
        <p className="mb-3 text-[13px] font-extrabold lowercase text-ink">add an apartment</p>
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

      {/* Apartments */}
      {loading ? (
        <p className="text-[12px] text-ink-subtle">loading…</p>
      ) : apartments.length === 0 && !needsKey ? (
        <p className="rounded-lg bg-brand-cream px-3 py-3 text-[12px] font-medium text-ink-muted">
          no apartments yet — add one above.
        </p>
      ) : (
        <div className="space-y-4">
          {apartments.map((apt) => (
            <ApartmentCard key={apt.id} apt={apt} onChanged={refresh} />
          ))}
        </div>
      )}
    </div>
  );
}

function ApartmentCard({ apt, onChanged }: { apt: AdminApartment; onChanged: () => void }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cats, setCats] = useState<TeacherCategory[]>([]);
  const [adding, setAdding] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const toggle = (c: TeacherCategory) =>
    setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const addTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setErr(null);
    try {
      await adminCreateTeacher(apt.id, {
        name: name.trim(),
        username: username.trim(),
        password,
        categories: cats,
      });
      setName("");
      setUsername("");
      setPassword("");
      setCats([]);
      onChanged();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "could not add teacher");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="rounded-card bg-brand-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange/12 text-brand-orange">
            <Building2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[15px] font-extrabold lowercase text-ink">{apt.name}</p>
            <p className="text-[11px] text-ink-subtle">login: {apt.loginUsername}</p>
          </div>
        </div>
        <Link
          href={`/admin/apartments/${apt.id}`}
          className="inline-flex items-center gap-1 rounded-chip bg-brand-cream px-3 py-1.5 text-[12px] font-bold text-ink-muted transition hover:text-ink"
        >
          daily logs <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Teacher list */}
      <div className="mt-3 flex flex-wrap gap-2">
        {apt.teachers.length === 0 ? (
          <span className="text-[12px] text-ink-subtle">no teachers yet.</span>
        ) : (
          apt.teachers.map((t) => (
            <span
              key={t.id}
              className="inline-flex items-center gap-1.5 rounded-chip bg-bg/60 px-2.5 py-1 text-[12px] font-semibold text-ink"
              title={t.categories.join(", ")}
            >
              <User className="h-3 w-3 text-brand-orange" /> {t.name}
              {t.categories.length > 0 && (
                <span className="text-ink-subtle">· {t.categories.join(" · ")}</span>
              )}
            </span>
          ))
        )}
      </div>

      {/* Add teacher */}
      <form onSubmit={addTeacher} className="mt-4 rounded-xl bg-bg/40 p-3">
        <p className="mb-2 text-[12px] font-bold text-ink-muted">add a teacher</p>
        <div className="grid gap-2 md:grid-cols-3">
          <Field label="name" value={name} onChange={setName} placeholder="e.g. riya" small />
          <Field label="login id" value={username} onChange={setUsername} placeholder="e.g. riya" small />
          <Field label="password" value={password} onChange={setPassword} placeholder="password" type="password" small />
        </div>
        <div className="mt-2">
          <p className="text-[11px] font-bold text-ink-muted">subjects they teach</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggle(c)}
                className={
                  "rounded-chip px-2.5 py-1 text-[12px] font-semibold transition " +
                  (cats.includes(c)
                    ? "bg-brand-orange text-white"
                    : "bg-brand-white text-ink-muted ring-1 ring-ink/10 hover:text-ink")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {err && <p className="mt-2 text-[12px] font-medium text-red-700">{err}</p>}
        <button
          type="submit"
          disabled={adding || !name.trim() || !username.trim() || !password}
          className="mt-3 inline-flex items-center gap-1.5 rounded-card bg-brand-orange px-3 py-1.5 text-[12px] font-bold text-white disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" /> {adding ? "adding…" : "add teacher"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  small,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  small?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold text-ink-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={
          "mt-1 block w-full rounded-lg border border-ink/10 bg-brand-white px-3 text-[13px] focus:border-brand-orange focus:outline-none " +
          (small ? "py-1.5" : "py-2")
        }
      />
    </label>
  );
}
