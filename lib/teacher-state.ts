"use client";

// Simple localStorage-backed teacher state.
// No backend — lives entirely in the browser for now.

const TEACHER_KEY = "oh-teacher";
const COMPLETED_PREFIX = "oh-completed-";

/**
 * A teacher can be scoped in one of three ways:
 * - admin: sees all programmes (programmeSlug === "*" or role === "admin")
 * - category teacher: sees all programmes in their category (both age groups)
 * - single-programme teacher: locked to one programme slug
 *
 * We keep programmeSlug for backwards compatibility with single-programme
 * logins and URL redirects. `category`, when set, broadens access.
 */
export type TeacherCategory = "art" | "language" | "stem";

export interface TeacherState {
  programmeSlug: string; // "*" for admin, or a single programme slug, or the default slug when category is set
  teacherName: string;
  username?: string;
  role?: "teacher" | "admin";
  category?: TeacherCategory; // if set, teacher sees every programme in this category
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
    const raw = localStorage.getItem(TEACHER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TeacherState;
  } catch {
    return null;
  }
}

export function setTeacher(state: TeacherState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TEACHER_KEY, JSON.stringify(state));
}

export function clearTeacher(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TEACHER_KEY);
}

// ─── Completed days per programme ──────────────

export function getCompletedDays(programmeSlug: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMPLETED_PREFIX + programmeSlug);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

export function markDayCompleted(programmeSlug: string, day: number): number[] {
  if (typeof window === "undefined") return [];
  const current = getCompletedDays(programmeSlug);
  if (current.includes(day)) return current;
  const next = [...current, day].sort((a, b) => a - b);
  localStorage.setItem(COMPLETED_PREFIX + programmeSlug, JSON.stringify(next));
  return next;
}

export function unmarkDayCompleted(programmeSlug: string, day: number): number[] {
  if (typeof window === "undefined") return [];
  const next = getCompletedDays(programmeSlug).filter((d) => d !== day);
  localStorage.setItem(COMPLETED_PREFIX + programmeSlug, JSON.stringify(next));
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
