// ─── Teacher & admin credentials ─────────────────────────────
// Educator-based logins. Each subject category has 5 generic educator
// logins (educator 01–05). On first sign-in the educator enters their
// real name (see /building), which is stored per device and used as the
// identity everywhere — including the admin records dashboard.
//
// ageScope narrows a category login to an age span:
//   - "older" → the 5–8 and 8–12 programmes of that category
//   - "3-5"   → only the 3–5 programme of that category (kept separate)
//   - undefined → admin (all)
// No DB for auth — validation is against this static list.

import type { TeacherCategory, AgeScope } from "@/lib/teacher-state";

export interface Credential {
  username: string;
  password: string;
  programmeSlug: string; // "*" for admin, or a default programme slug for category teachers
  displayName: string;
  role: "teacher" | "admin";
  category?: TeacherCategory; // when set, teacher sees every programme in this category (within ageScope)
  ageScope?: AgeScope; // narrows a category login to an age span
}

export const CREDENTIALS: Credential[] = [
  // admin — sees every programme + the records dashboard
  {
    username: "admin",
    password: "openhouselxd",
    programmeSlug: "*",
    displayName: "admin",
    role: "admin",
  },
  // ── educator logins · 5 per category × {5–8 & 8–12, 3–5} ──
  { username: "art-01", password: "kt3chxtq", category: "art", ageScope: "older", programmeSlug: "art-design-5-8", displayName: "educator 01", role: "teacher" },
  { username: "art-02", password: "hpvt8jeu", category: "art", ageScope: "older", programmeSlug: "art-design-5-8", displayName: "educator 02", role: "teacher" },
  { username: "art-03", password: "p2fmpk76", category: "art", ageScope: "older", programmeSlug: "art-design-5-8", displayName: "educator 03", role: "teacher" },
  { username: "art-04", password: "wjcruwzt", category: "art", ageScope: "older", programmeSlug: "art-design-5-8", displayName: "educator 04", role: "teacher" },
  { username: "art-05", password: "njvhfsa4", category: "art", ageScope: "older", programmeSlug: "art-design-5-8", displayName: "educator 05", role: "teacher" },
  { username: "lang-01", password: "vtx7z5nr", category: "language", ageScope: "older", programmeSlug: "public-speaking-5-8", displayName: "educator 01", role: "teacher" },
  { username: "lang-02", password: "83tckjk4", category: "language", ageScope: "older", programmeSlug: "public-speaking-5-8", displayName: "educator 02", role: "teacher" },
  { username: "lang-03", password: "hnr22w7f", category: "language", ageScope: "older", programmeSlug: "public-speaking-5-8", displayName: "educator 03", role: "teacher" },
  { username: "lang-04", password: "8nuej924", category: "language", ageScope: "older", programmeSlug: "public-speaking-5-8", displayName: "educator 04", role: "teacher" },
  { username: "lang-05", password: "kjdeara7", category: "language", ageScope: "older", programmeSlug: "public-speaking-5-8", displayName: "educator 05", role: "teacher" },
  { username: "stem-01", password: "ng24jpn8", category: "stem", ageScope: "older", programmeSlug: "robotics-5-8", displayName: "educator 01", role: "teacher" },
  { username: "stem-02", password: "kr9qwmwc", category: "stem", ageScope: "older", programmeSlug: "robotics-5-8", displayName: "educator 02", role: "teacher" },
  { username: "stem-03", password: "3e9ppp7a", category: "stem", ageScope: "older", programmeSlug: "robotics-5-8", displayName: "educator 03", role: "teacher" },
  { username: "stem-04", password: "fkbh3hut", category: "stem", ageScope: "older", programmeSlug: "robotics-5-8", displayName: "educator 04", role: "teacher" },
  { username: "stem-05", password: "jsf9y6fm", category: "stem", ageScope: "older", programmeSlug: "robotics-5-8", displayName: "educator 05", role: "teacher" },
  { username: "art35-01", password: "mgyyz2sc", category: "art", ageScope: "3-5", programmeSlug: "art-design-3-5", displayName: "educator 01", role: "teacher" },
  { username: "art35-02", password: "zbgar52p", category: "art", ageScope: "3-5", programmeSlug: "art-design-3-5", displayName: "educator 02", role: "teacher" },
  { username: "art35-03", password: "sprzf4x8", category: "art", ageScope: "3-5", programmeSlug: "art-design-3-5", displayName: "educator 03", role: "teacher" },
  { username: "art35-04", password: "qttqxtnd", category: "art", ageScope: "3-5", programmeSlug: "art-design-3-5", displayName: "educator 04", role: "teacher" },
  { username: "art35-05", password: "uvgkxakv", category: "art", ageScope: "3-5", programmeSlug: "art-design-3-5", displayName: "educator 05", role: "teacher" },
  { username: "lang35-01", password: "vgy3823q", category: "language", ageScope: "3-5", programmeSlug: "language-storytelling-3-5", displayName: "educator 01", role: "teacher" },
  { username: "lang35-02", password: "d4vsz4sy", category: "language", ageScope: "3-5", programmeSlug: "language-storytelling-3-5", displayName: "educator 02", role: "teacher" },
  { username: "lang35-03", password: "eny6444m", category: "language", ageScope: "3-5", programmeSlug: "language-storytelling-3-5", displayName: "educator 03", role: "teacher" },
  { username: "lang35-04", password: "eu6hj3nf", category: "language", ageScope: "3-5", programmeSlug: "language-storytelling-3-5", displayName: "educator 04", role: "teacher" },
  { username: "lang35-05", password: "dx594y79", category: "language", ageScope: "3-5", programmeSlug: "language-storytelling-3-5", displayName: "educator 05", role: "teacher" },
  { username: "stem35-01", password: "9nzewp6v", category: "stem", ageScope: "3-5", programmeSlug: "stem-3-5", displayName: "educator 01", role: "teacher" },
  { username: "stem35-02", password: "6hfb9tka", category: "stem", ageScope: "3-5", programmeSlug: "stem-3-5", displayName: "educator 02", role: "teacher" },
  { username: "stem35-03", password: "5dc8vxfj", category: "stem", ageScope: "3-5", programmeSlug: "stem-3-5", displayName: "educator 03", role: "teacher" },
  { username: "stem35-04", password: "gjxv85us", category: "stem", ageScope: "3-5", programmeSlug: "stem-3-5", displayName: "educator 04", role: "teacher" },
  { username: "stem35-05", password: "pzbvhqk4", category: "stem", ageScope: "3-5", programmeSlug: "stem-3-5", displayName: "educator 05", role: "teacher" },
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
