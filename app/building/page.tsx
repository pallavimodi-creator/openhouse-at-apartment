"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Plus, ChevronRight } from "lucide-react";
import {
  getTeacher,
  setBuilding,
  getKnownBuildings,
} from "@/lib/teacher-state";

/**
 * Second-step login: after a teacher signs in with their credentials,
 * they pick which building / centre they're teaching at right now.
 *
 * - The done-log (completed days) is scoped per (building, programme),
 *   so the same teacher teaching art-5-8 at two centres tracks each
 *   centre's class independently.
 * - Buildings the teacher has used before are listed for quick-pick.
 * - A free-text input lets them add a new one.
 */
export default function BuildingPickerPage() {
  const router = useRouter();
  const [teacherName, setTeacherName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [knownBuildings, setKnownBuildings] = useState<string[]>([]);
  const [newBuilding, setNewBuilding] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = getTeacher();
    if (!t) {
      router.replace("/login");
      return;
    }
    // Admins don't run classes — they review the platform — so the
    // building picker doesn't apply to them. Bounce them home.
    if (t.role === "admin" || t.programmeSlug === "*") {
      router.replace("/");
      return;
    }
    setTeacherName(t.teacherName);
    setUsername(t.username ?? null);
    setKnownBuildings(t.username ? getKnownBuildings(t.username) : []);
    setLoading(false);
  }, [router]);

  const handlePick = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setBuilding(trimmed);
    const t = getTeacher();
    if (!t) {
      router.replace("/login");
      return;
    }
    // Admin / category teachers land on /; single-programme teachers
    // go straight to their programme. Same routing logic as login.
    const toHome = t.role === "admin" || !!t.category;
    router.push(toHome ? "/" : `/${t.programmeSlug}`);
  };

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    handlePick(newBuilding);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[12px] font-medium text-ink-subtle">loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100dvh-60px)] flex-col items-center px-4 pt-6 pb-8 md:px-8 md:pt-10">
      {/* Hero */}
      <div className="mb-6 w-full max-w-md text-center">
        <p className="text-[12px] font-bold tracking-widest text-brand-orange">
          hi {teacherName?.toLowerCase() ?? "teacher"}
        </p>
        <h1 className="mt-2 text-[26px] font-extrabold leading-[1.05] tracking-tight text-ink md:text-[32px]">
          which building are you at today?
        </h1>
        <p className="mt-3 max-w-sm text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
          your class progress (completed sessions, next day to teach) is tracked
          per building. pick the one you're teaching at right now — you can
          switch any time without signing out.
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        {/* Quick-pick from previously-used buildings */}
        {knownBuildings.length > 0 && (
          <div className="rounded-card bg-brand-white p-4 shadow-card ring-1 ring-ink/5 md:p-5">
            <p className="text-[10px] font-bold tracking-widest text-ink-muted">
              recently used
            </p>
            <ul className="mt-2 space-y-1.5">
              {knownBuildings.map((b) => (
                <li key={b}>
                  <button
                    type="button"
                    onClick={() => handlePick(b)}
                    className="group flex w-full items-center justify-between gap-3 rounded-lg bg-bg/60 px-3 py-2.5 text-left transition hover:bg-brand-orange/10"
                  >
                    <span className="flex items-center gap-2">
                      <Building2
                        className="h-4 w-4 text-brand-orange"
                        strokeWidth={2.2}
                      />
                      <span className="text-[13px] font-semibold text-ink">
                        {b.toLowerCase()}
                      </span>
                    </span>
                    <ChevronRight
                      className="h-4 w-4 text-ink-subtle transition group-hover:text-brand-orange"
                      strokeWidth={2.4}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Add a new building */}
        <form
          onSubmit={handleSubmitNew}
          className="rounded-card bg-brand-white p-4 shadow-card ring-1 ring-ink/5 md:p-5"
        >
          <label
            htmlFor="new-building"
            className="text-[10px] font-bold tracking-widest text-ink-muted"
          >
            {knownBuildings.length > 0 ? "or add a new one" : "enter your building"}
          </label>
          <div className="mt-2 flex items-center gap-2">
            <input
              id="new-building"
              type="text"
              value={newBuilding}
              onChange={(e) => setNewBuilding(e.target.value)}
              autoFocus={knownBuildings.length === 0}
              placeholder="e.g. raheja vihar, hiranandani powai"
              className="flex-1 rounded-lg border border-ink/10 bg-bg/40 px-3 py-2.5 text-[14px] focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            />
            <button
              type="submit"
              disabled={!newBuilding.trim()}
              className="inline-flex items-center gap-1 rounded-lg bg-brand-orange px-3 py-2.5 text-[13px] font-extrabold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
              add
            </button>
          </div>
          <p className="mt-2 text-[10px] text-ink-subtle">
            we save the name on this device only so it appears in your quick-pick
            next time.
          </p>
        </form>
      </div>

      {/* Hidden username so we can see it during debug; not visible to user */}
      <span className="sr-only">{username}</span>
    </div>
  );
}
