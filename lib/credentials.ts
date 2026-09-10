// ─── Teacher & admin credentials ─────────────────────────────
// One shared teacher per category + one admin. No DB — auth is
// purely against this static list.

import type { TeacherCategory } from "@/lib/teacher-state";

export interface Credential {
  username: string;
  password: string;
  programmeSlug: string; // "*" for admin, or a default programme slug for category teachers
  displayName: string;
  role: "teacher" | "admin";
  category?: TeacherCategory; // when set, teacher sees every programme in this category
}

export const CREDENTIALS: Credential[] = [
  // admin — sees every programme
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
