"use client";

/**
 * Fire-and-forget central logging of a session completion, tagged by the
 * signed-in educator (name + login id). localStorage stays the UI source of
 * truth — this just mirrors each mark to Supabase so the admin records
 * dashboard can aggregate by educator name. Never blocks or throws.
 */

import { getTeacher } from "@/lib/teacher-state";

export function logProgress(opts: {
  programmeSlug: string;
  programmeTitle?: string;
  day: number;
  completed: boolean;
}): void {
  if (typeof window === "undefined") return;
  const t = getTeacher();
  if (!t || t.role === "admin" || !t.username) return; // only real educators
  try {
    fetch("/api/progress", {
      method: "POST",
      headers: { "content-type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        educatorName: t.teacherName,
        username: t.username,
        category: t.category,
        ageScope: t.ageScope,
        building: t.building,
        programmeSlug: opts.programmeSlug,
        programmeTitle: opts.programmeTitle,
        day: opts.day,
        completed: opts.completed,
      }),
    }).catch(() => {
      /* offline / not configured — localStorage already has the mark */
    });
  } catch {
    /* ignore */
  }
}
