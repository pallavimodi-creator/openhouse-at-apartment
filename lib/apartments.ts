"use client";

// Client data-access for the apartments → teachers → daily-logs feature.
// Mirrors lib/newsletter-submissions.ts: all calls hit the /api routes; the
// admin key (shared with the newsletter admin) rides in the x-admin-key header.

import type { TeacherCategory } from "@/lib/teacher-state";
import { getAdminKey } from "@/lib/newsletter-submissions";

export const REASONS = [
  "lack of resources",
  "did not understand",
  "felt too easy",
  "felt boring",
  "due to an event",
  "outdoor class",
] as const;
export type Reason = (typeof REASONS)[number];

// The daily structure (class segments) a teacher marks, per subject. These are
// the standard openhouse at-apartment class flows; refine per programme later.
export const CLASS_PARTS: Record<TeacherCategory, string[]> = {
  art: ["roll call", "art gym (warm-up)", "artiverse (the make)", "art care", "sign-off"],
  language: ["roll call", "playground", "showtime", "reflect & log"],
  stem: ["roll call", "build", "experiment", "experience book", "sign-off"],
  chess: ["tempo", "chessiverse", "rising pawns", "reflect & log"],
  music: ["warm up", "instrument rotation", "ensemble play"],
};
export function partsForCategory(category?: string): string[] {
  const subject = category ? category.split(":")[0] : undefined; // "art:3-5" → "art"
  if (subject && subject in CLASS_PARTS) return CLASS_PARTS[subject as TeacherCategory];
  return ["warm up", "main activity", "wrap up"];
}

export interface ApartmentTeacher {
  id: string;
  name: string;
  categories: string[];
}
export interface AdminTeacher {
  id: string;
  name: string;
  username: string;
  password?: string;        // visible to admins so they can share credentials
  categories: string[];
  classesDone?: number;     // daily-log submissions by this teacher
}
export interface AdminApartment {
  id: string;
  name: string;
  loginUsername: string;
  loginPassword?: string;
  individualLoginEnabled: boolean;
  classesDone: number;      // total daily-log submissions for this apartment
  teachers: AdminTeacher[];
}
export interface DailyEntry {
  part: string;
  done: boolean;
  reason?: string;
  note?: string;
}
export interface DailyLog {
  id: string;
  apartmentId: string;
  teacherId: string;
  teacherName: string;
  date: string;
  programmeSlug: string;
  programmeTitle: string;
  entries: DailyEntry[];
  freeNote: string;
  updatedAt: string;
}

function adminHeaders(): HeadersInit {
  const key = getAdminKey();
  return key ? { "content-type": "application/json", "x-admin-key": key } : { "content-type": "application/json" };
}

async function parse<T>(res: Response): Promise<T> {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((body as { error?: string }).error || `request failed (${res.status})`);
  }
  return body as T;
}

// ── auth ──────────────────────────────────────────────────────────────
export async function apartmentLogin(username: string, password: string) {
  const res = await fetch("/api/apartments/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return parse<{ apartmentId: string; apartmentName: string; individualLoginEnabled: boolean }>(res);
}

export async function listApartmentTeachers(apartmentId: string) {
  const res = await fetch(`/api/apartments/${apartmentId}/teachers`);
  return parse<{ teachers: ApartmentTeacher[] }>(res).then((b) => b.teachers);
}

export async function teacherLogin(apartmentId: string, teacherId: string, password: string) {
  const res = await fetch("/api/teachers/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ apartmentId, teacherId, password }),
  });
  return parse<{ teacherId: string; name: string; categories: string[] }>(res);
}

// ── admin ─────────────────────────────────────────────────────────────
export async function adminListApartments() {
  const res = await fetch("/api/admin/apartments", { headers: adminHeaders() });
  return parse<{ apartments: AdminApartment[] }>(res).then((b) => b.apartments);
}

export async function adminCreateApartment(name: string, loginUsername: string, loginPassword: string) {
  const res = await fetch("/api/admin/apartments", {
    method: "POST",
    headers: adminHeaders(),
    body: JSON.stringify({ name, loginUsername, loginPassword }),
  });
  return parse<{ apartment: AdminApartment }>(res).then((b) => b.apartment);
}

export async function adminCreateTeacher(
  apartmentId: string,
  t: { name: string; username: string; password: string; categories: string[] }
) {
  const res = await fetch(`/api/apartments/${apartmentId}/teachers`, {
    method: "POST",
    headers: adminHeaders(),
    body: JSON.stringify(t),
  });
  return parse<{ teacher: AdminTeacher }>(res).then((b) => b.teacher);
}

export async function adminUpdateTeacher(
  teacherId: string,
  patch: { name?: string; username?: string; password?: string; categories?: string[] }
) {
  const res = await fetch(`/api/teachers/${teacherId}`, {
    method: "PATCH",
    headers: adminHeaders(),
    body: JSON.stringify(patch),
  });
  return parse<{ teacher: AdminTeacher }>(res).then((b) => b.teacher);
}

export async function adminDeleteTeacher(teacherId: string) {
  const res = await fetch(`/api/teachers/${teacherId}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  return parse<{ ok: boolean }>(res);
}

export async function adminSetIndividualLogin(apartmentId: string, enabled: boolean) {
  const res = await fetch(`/api/admin/apartments/${apartmentId}`, {
    method: "PATCH",
    headers: adminHeaders(),
    body: JSON.stringify({ individualLoginEnabled: enabled }),
  });
  return parse<{ individualLoginEnabled: boolean }>(res).then((b) => b.individualLoginEnabled);
}

// ── daily logs ────────────────────────────────────────────────────────
export async function listDailyLogs(apartmentId: string, from?: string, to?: string) {
  const qs = new URLSearchParams({ apartmentId });
  if (from) qs.set("from", from);
  if (to) qs.set("to", to);
  const res = await fetch(`/api/daily-logs?${qs.toString()}`);
  return parse<{ logs: DailyLog[] }>(res).then((b) => b.logs);
}

export async function upsertDailyLog(input: {
  apartmentId: string;
  teacherId: string;
  teacherName: string;
  date: string;
  programmeSlug: string;
  programmeTitle: string;
  entries: DailyEntry[];
  freeNote: string;
}) {
  const res = await fetch("/api/daily-logs", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  return parse<{ log: DailyLog }>(res).then((b) => b.log);
}
