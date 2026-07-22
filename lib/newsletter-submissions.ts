"use client";

/**
 * Newsletter submissions store.
 *
 * A teacher fills a newsletter for their building and SUBMITS it. It
 * lands here (status "pending"). The admin sees all submissions grouped
 * by building, approves one, and only then can download it. Teachers
 * cannot download — they can only submit.
 *
 * NOTE ON STORAGE: this uses localStorage, so submissions live on the
 * device/browser they were made on. On a single shared device the full
 * teacher→admin flow works. True cross-device sharing needs a backend
 * (deferred). The API here is deliberately small so it can be swapped
 * for a server store later without touching the UI.
 */

const KEY = "oh-newsletter-submissions";

export interface NewsletterDraftSnapshot {
  selected: string[];
  nextSelected: string[];
  photos: string[];
  building: string;
  from: string;
  to: string;
}

export type SubmissionStatus = "pending" | "approved";

export interface NewsletterSubmission {
  id: string;
  building: string;
  programmeSlug: string;
  programmeTitle: string;
  ageLabel: string;
  from: string;
  to: string;
  draft: NewsletterDraftSnapshot;
  status: SubmissionStatus;
  submittedAt: number;
  approvedAt?: number;
}

function readAll(): NewsletterSubmission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as NewsletterSubmission[]) : [];
  } catch {
    return [];
  }
}

function writeAll(list: NewsletterSubmission[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}

/** Cheap unique id without Date.now/random dependence in server code. */
function makeId(): string {
  const t = Date.now().toString(36);
  const r = Math.floor(Math.random() * 1e6).toString(36);
  return `nl-${t}-${r}`;
}

export function listSubmissions(): NewsletterSubmission[] {
  return readAll().sort((a, b) => b.submittedAt - a.submittedAt);
}

export function getSubmission(id: string): NewsletterSubmission | undefined {
  return readAll().find((s) => s.id === id);
}

export function submitNewsletter(
  input: Omit<NewsletterSubmission, "id" | "status" | "submittedAt" | "approvedAt">
): NewsletterSubmission {
  const list = readAll();
  const submission: NewsletterSubmission = {
    ...input,
    id: makeId(),
    status: "pending",
    submittedAt: Date.now(),
  };
  list.push(submission);
  writeAll(list);
  return submission;
}

export function approveSubmission(id: string): void {
  const list = readAll();
  const idx = list.findIndex((s) => s.id === id);
  if (idx === -1) return;
  list[idx] = { ...list[idx], status: "approved", approvedAt: Date.now() };
  writeAll(list);
}

export function deleteSubmission(id: string): void {
  writeAll(readAll().filter((s) => s.id !== id));
}

/** Group submissions by building for the admin dashboard. */
export function groupByBuilding(
  submissions: NewsletterSubmission[]
): { building: string; items: NewsletterSubmission[] }[] {
  const map = new Map<string, NewsletterSubmission[]>();
  for (const s of submissions) {
    const b = s.building || "unnamed building";
    if (!map.has(b)) map.set(b, []);
    map.get(b)!.push(s);
  }
  return Array.from(map.entries())
    .map(([building, items]) => ({ building, items }))
    .sort((a, b) => a.building.localeCompare(b.building));
}
