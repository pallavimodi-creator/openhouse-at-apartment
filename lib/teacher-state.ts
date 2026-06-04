"use client";

// Simple in-browser teacher state.
// - Session identity lives in sessionStorage so it clears when the browser/tab
//   closes — every fresh visit lands on /login, then /building.
// - The selected building lives in sessionStorage so the same teacher signing
//   in on a different day (or different device) re-picks where they're
//   teaching today, without accidentally logging progress against the wrong
//   building. The list of "known buildings" they've used before lives in
//   localStorage keyed by username, so the picker shows quick-pick options.
// - Completed-days progress lives in localStorage so it persists across
//   visits, scoped per (building, programme) so a teacher who runs art-5-8
//   at Building A and Building B has separate done-logs for each.

const TEACHER_KEY = "oh-teacher";
const COMPLETED_PREFIX = "oh-completed-";
const KNOWN_BUILDINGS_PREFIX = "oh-buildings-";
// Older builds wrote `oh-completed-<programmeSlug>`. New builds write
// `oh-completed-<building>-<programmeSlug>`. We migrate the legacy keys
// under a synthetic "(default)" building so teachers don't lose progress.
export const LEGACY_BUILDING = "(default)";

/**
 * A teacher can be scoped in one of three ways:
 * - admin: sees all programmes (programmeSlug === "*" or role === "admin")
 * - category teacher: sees all programmes in their category (both age groups)
 * - single-programme teacher: locked to one programme slug
 *
 * We keep programmeSlug for backwards compatibility with single-programme
 * logins and URL redirects. `category`, when set, broadens access.
 *
 * `building` is the building / centre the teacher is currently working at,
 * picked after sign-in. All done-log progress is scoped per building so a
 * teacher who teaches the same programme at two centres can track each
 * centre's class independently.
 */
export type TeacherCategory = "art" | "language" | "stem";

export interface TeacherState {
  programmeSlug: string; // "*" for admin, or a single programme slug, or the default slug when category is set
  teacherName: string;
  username?: string;
  role?: "teacher" | "admin";
  category?: TeacherCategory; // if set, teacher sees every programme in this category
  building?: string; // current building / centre — set after the /building picker
}

export function isAdmin(state: TeacherState | null): boolean {
  return state?.role === "admin" || state?.programmeSlug === "*";
}

/**
 * Returns true if the teacher is allowed to access the given programme slug.
 * - admins: always
 * - category teachers: any programme whose slug starts with their category's prefix
 * - single-programme teachers: exact slug match
 */
export function canAccessProgramme(
  state: TeacherState | null,
  programmeSlug: string,
  programmeCategory?: TeacherCategory,
): boolean {
  if (!state) return false;
  if (isAdmin(state)) return true;
  if (state.category && programmeCategory) {
    return state.category === programmeCategory;
  }
  return state.programmeSlug === programmeSlug;
}

export function getTeacher(): TeacherState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(TEACHER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TeacherState;
  } catch {
    return null;
  }
}

export function setTeacher(state: TeacherState): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(TEACHER_KEY, JSON.stringify(state));
}

export function clearTeacher(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TEACHER_KEY);
  // Also clear any older localStorage entry from previous builds so users on
  // a revisit don't get auto-signed-in from stale data.
  try {
    localStorage.removeItem(TEACHER_KEY);
  } catch {
    /* ignore */
  }
}

// ─── Building (centre) selection ───────────────────────────

/** Returns the building the teacher picked this session, or null. */
export function getBuilding(): string | null {
  const t = getTeacher();
  return t?.building ?? null;
}

/**
 * Set the active building for the current session. Updates the teacher
 * state in sessionStorage and also appends to the localStorage list of
 * known buildings for this teacher's username so the picker remembers it.
 */
export function setBuilding(building: string): void {
  if (typeof window === "undefined") return;
  const trimmed = building.trim();
  if (!trimmed) return;
  const t = getTeacher();
  if (!t) return;
  setTeacher({ ...t, building: trimmed });
  if (t.username) {
    const known = getKnownBuildings(t.username);
    if (!known.includes(trimmed)) {
      const next = [trimmed, ...known].slice(0, 12); // cap to 12 most-recent
      localStorage.setItem(KNOWN_BUILDINGS_PREFIX + t.username, JSON.stringify(next));
    }
  }
}

/** Clear the current building (without signing out the teacher). */
export function clearBuilding(): void {
  if (typeof window === "undefined") return;
  const t = getTeacher();
  if (!t) return;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { building: _building, ...rest } = t;
  setTeacher(rest);
}

/** List of buildings this teacher has previously selected (newest first). */
export function getKnownBuildings(username: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KNOWN_BUILDINGS_PREFIX + username);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

// ─── Completed days per (building, programme) ──────────────

function completedKey(building: string | null, programmeSlug: string): string {
  // When no building is set we fall back to LEGACY_BUILDING so existing
  // local progress (from builds that pre-date the multi-building feature)
  // remains accessible. Admins working without a building also land here.
  const b = building && building.trim() ? building.trim() : LEGACY_BUILDING;
  return `${COMPLETED_PREFIX}${b}::${programmeSlug}`;
}

/**
 * Read completed days for the (current building, programme) pair.
 * If no building-scoped record exists, transparently fall back to the
 * legacy unscoped record (`oh-completed-<programmeSlug>`) so older state
 * is preserved on first run after upgrading.
 */
export function getCompletedDays(programmeSlug: string): number[] {
  if (typeof window === "undefined") return [];
  const building = getBuilding();
  try {
    // 1) Try the building-scoped key first.
    const scopedRaw = localStorage.getItem(completedKey(building, programmeSlug));
    if (scopedRaw) return JSON.parse(scopedRaw) as number[];
    // 2) Fall through to the legacy unscoped key.
    const legacyRaw = localStorage.getItem(COMPLETED_PREFIX + programmeSlug);
    if (legacyRaw) return JSON.parse(legacyRaw) as number[];
    return [];
  } catch {
    return [];
  }
}

export function markDayCompleted(programmeSlug: string, day: number): number[] {
  if (typeof window === "undefined") return [];
  const building = getBuilding();
  const current = getCompletedDays(programmeSlug);
  if (current.includes(day)) return current;
  const next = [...current, day].sort((a, b) => a - b);
  localStorage.setItem(completedKey(building, programmeSlug), JSON.stringify(next));
  return next;
}

export function unmarkDayCompleted(programmeSlug: string, day: number): number[] {
  if (typeof window === "undefined") return [];
  const building = getBuilding();
  const next = getCompletedDays(programmeSlug).filter((d) => d !== day);
  localStorage.setItem(completedKey(building, programmeSlug), JSON.stringify(next));
  return next;
}

/**
 * Given the set of completed days and the programme's total sessions,
 * return the first day that hasn't been completed yet.
 * Includes trial session (day 0) if the programme has one.
 */
export function getNextDay(
  completed: number[],
  totalSessions: number,
  hasTrialSession: boolean
): number {
  const start = hasTrialSession ? 0 : 1;
  for (let d = start; d <= totalSessions; d++) {
    if (!completed.includes(d)) return d;
  }
  // All days completed — return the last one
  return totalSessions;
}
