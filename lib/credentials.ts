// ─── Teacher & admin credentials ─────────────────────────────
// One shared teacher per category + one admin. No DB — auth is
// purely against this static list.

import type { TeacherCategory } from "@/lib/teacher-state";

export interface Credential {
  username: string;
  password: string;
  programmeSlug: string; // "*" for admin, or a default programme slug for category teachers
  displayName: string;
  role: "teacher" | "admin" | "guest";
  category?: TeacherCategory; // when set, teacher sees every programme in this category
}

// LAYER 1 — the shared "generic" logins. One per subject category + admin.
// These are kept for the transition: a generic login reaches programme
// CONTENT ONLY (plans / books / library). To log the daily form and see the
// shared apartment dashboard a teacher continues through the apartment login
// (layer 2) and their own teacher login (layer 3), which live in the database.
// These generic logins are to be phased out once every teacher has an
// apartment + personal login.
export const CREDENTIALS: Credential[] = [
  // admin — sees every apartment, every programme; manages apartments/teachers
  {
    username: "admin",
    password: "openhouselxd",
    programmeSlug: "*",
    displayName: "admin",
    role: "admin",
  },
  // public speaking teacher — sees both PS programmes (5-8 and 8-12)
  {
    username: "psteacher",
    password: "publicspeaking123",
    programmeSlug: "public-speaking-5-8",
    displayName: "public speaking teacher",
    role: "teacher",
    category: "language",
  },
  // art & design teacher — sees both art programmes (5-8 and 8-12)
  {
    username: "artteacher",
    password: "artteacher123",
    programmeSlug: "art-design-5-8",
    displayName: "art & design teacher",
    role: "teacher",
    category: "art",
  },
  // robotics teacher — sees both robotics programmes (5-8 and 8-12)
  {
    username: "roboticsteacher",
    password: "roboticsteacher123",
    programmeSlug: "robotics-5-8",
    displayName: "robotics teacher",
    role: "teacher",
    category: "stem",
  },
  // chess teacher — sees both chess programmes (5-8 and 8-12)
  {
    username: "chessteacher",
    password: "chessteacher123",
    programmeSlug: "chess-5-8",
    displayName: "chess teacher",
    role: "teacher",
    category: "chess",
  },
  // music teacher — sees every music level (l1, l2, l3)
  {
    username: "musicteacher",
    password: "musicteacher123",
    programmeSlug: "music-l1",
    displayName: "music teacher",
    role: "teacher",
    category: "music",
  },
  // guest — a read-only tour login. Sees everything the admin sees for
  // CONTENT (all programmes, library) but NOT the operational dashboards
  // (apartments / tracker / daily) and with NO edit access anywhere.
  // programmeSlug "*" gives it the all-programmes view; role "guest" keeps
  // it out of every full-admin gate (see isFullAdmin in teacher-state).
  {
    username: "guest",
    password: "openhouseguest",
    programmeSlug: "*",
    displayName: "guest",
    role: "guest",
  },
];

export function validateCredentials(
  username: string,
  password: string
): Credential | null {
  const u = username.trim().toLowerCase();
  const found = CREDENTIALS.find(
    (c) => c.username.toLowerCase() === u && c.password === password
  );
  return found ?? null;
}
