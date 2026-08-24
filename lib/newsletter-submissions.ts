"use client";

/**
 * Newsletter submissions client.
 *
 * Primary path: the backend API (Supabase) — works across devices, so
 * an educator can submit on their phone and an admin approve on a laptop.
 *
 * Fallback path: when the backend isn't configured (the API returns
 * 503 { configured: false }), we transparently fall back to localStorage
 * so the flow still works on a single device before the backend is set up.
 *
 * Admin actions (list / approve / delete / get-one) require the admin key,
 * passed as the x-admin-key header. The admin enters it once in the
 * dashboard; it's held in sessionStorage.
 */

const LS_KEY = "oh-newsletter-submissions";
const ADMIN_KEY_STORE = "oh-newsletter-admin-key";

export interface NewsletterDraftSnapshot {
  selected: string[];
  nextSelected: string[];
  photos: string[];
  building: string;
  from: string;
  to: string;
  /** art only — extra artworks the educator typed, not from the list */
  customArtworks?: string[];
  /** optional free-text note an admin adds to the newsletter before approving */
  note?: string;
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

/* ─── admin key helpers ────────────────────────────────────── */

export function getAdminKey(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(ADMIN_KEY_STORE) ?? "";
}
export function setAdminKey(key: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ADMIN_KEY_STORE, key);
}

/* ─── localStorage fallback ────────────────────────────────── */

function lsReadAll(): NewsletterSubmission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? (arr as NewsletterSubmission[]) : [];
  } catch {
    return [];
  }
}
function lsWriteAll(list: NewsletterSubmission[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {}
}
function makeId(): string {
  return `nl-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
}

/** True if the API replied "not configured" (503 with configured:false). */
async function isUnconfigured(res: Response): Promise<boolean> {
  if (res.status !== 503) return false;
  try {
    const j = await res.clone().json();
    return j?.configured === false;
  } catch {
    return true;
  }
}

/* ─── public API — async, backend-first ────────────────────── */

export async function submitNewsletter(
  input: Omit<NewsletterSubmission, "id" | "status" | "submittedAt" | "approvedAt">
): Promise<NewsletterSubmission> {
  let res: Response;
  try {
    res = await fetch("/api/newsletters", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch {
    // Network-level failure — the request never reached openhouse. Do NOT
    // silently save to localStorage and report success (that's how a whole
    // month of submissions once went unnoticed). Throw so the educator sees
    // it wasn't submitted and can retry.
    throw new Error("offline");
  }

  // Backend intentionally not configured (e.g. local dev before the DB is
  // wired). This is the ONLY case where the localStorage fallback is right.
  if (await isUnconfigured(res)) {
    const list = lsReadAll();
    const submission: NewsletterSubmission = {
      ...input,
      id: makeId(),
      status: "pending",
      submittedAt: Date.now(),
    };
    list.push(submission);
    lsWriteAll(list);
    return submission;
  }

  // Backend is configured but the write failed — a real error the educator
  // must see, not a silent local save that never reaches the dashboard.
  if (!res.ok) {
    let msg = "submit failed";
    try {
      msg = (await res.json())?.error ?? msg;
    } catch {}
    throw new Error(msg);
  }

  const { submission } = await res.json();
  return submission as NewsletterSubmission;
}

export async function listSubmissions(adminKey: string): Promise<{
  submissions: NewsletterSubmission[];
  configured: boolean;
  authError: boolean;
}> {
  try {
    const res = await fetch("/api/newsletters", {
      headers: { "x-admin-key": adminKey },
    });
    if (await isUnconfigured(res)) {
      return { submissions: sortSubs(lsReadAll()), configured: false, authError: false };
    }
    if (res.status === 401) {
      return { submissions: [], configured: true, authError: true };
    }
    if (!res.ok) throw new Error("list failed");
    const { submissions } = await res.json();
    return { submissions: sortSubs(submissions), configured: true, authError: false };
  } catch {
    return { submissions: sortSubs(lsReadAll()), configured: false, authError: false };
  }
}

export async function getSubmission(
  id: string,
  adminKey: string
): Promise<NewsletterSubmission | null> {
  try {
    const res = await fetch(`/api/newsletters/${id}`, {
      headers: { "x-admin-key": adminKey },
    });
    if (await isUnconfigured(res)) {
      return lsReadAll().find((s) => s.id === id) ?? null;
    }
    if (!res.ok) return null;
    const { submission } = await res.json();
    return submission as NewsletterSubmission;
  } catch {
    return lsReadAll().find((s) => s.id === id) ?? null;
  }
}

/** An admin edits a submission's content before approving it. */
export async function updateSubmission(
  id: string,
  draft: NewsletterDraftSnapshot,
  adminKey: string
): Promise<void> {
  try {
    const res = await fetch(`/api/newsletters/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ action: "update", draft, building: draft.building }),
    });
    if (await isUnconfigured(res)) throw new Error("unconfigured");
    if (!res.ok) throw new Error("update failed");
  } catch {
    const list = lsReadAll();
    const idx = list.findIndex((s) => s.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], draft, building: draft.building || list[idx].building };
      lsWriteAll(list);
    }
  }
}

export async function approveSubmission(id: string, adminKey: string): Promise<void> {
  try {
    const res = await fetch(`/api/newsletters/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ action: "approve" }),
    });
    if (await isUnconfigured(res)) throw new Error("unconfigured");
    if (!res.ok) throw new Error("approve failed");
  } catch {
    const list = lsReadAll();
    const idx = list.findIndex((s) => s.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], status: "approved", approvedAt: Date.now() };
      lsWriteAll(list);
    }
  }
}

export async function deleteSubmission(id: string, adminKey: string): Promise<void> {
  try {
    const res = await fetch(`/api/newsletters/${id}`, {
      method: "DELETE",
      headers: { "x-admin-key": adminKey },
    });
    if (await isUnconfigured(res)) throw new Error("unconfigured");
    if (!res.ok) throw new Error("delete failed");
  } catch {
    lsWriteAll(lsReadAll().filter((s) => s.id !== id));
  }
}

/* ─── shared helpers ───────────────────────────────────────── */

function sortSubs(list: NewsletterSubmission[]): NewsletterSubmission[] {
  return [...list].sort((a, b) => b.submittedAt - a.submittedAt);
}

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
