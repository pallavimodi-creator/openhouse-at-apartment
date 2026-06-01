"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getTeacher, type TeacherState } from "@/lib/teacher-state";

/**
 * Wrap protected pages with this component. It redirects to /login if the
 * teacher is not signed in, to /building if they're signed in but haven't
 * picked a building this session, and to their own programme if they try
 * to access a different programme.
 *
 * If `requiredSlug` is passed, the teacher must be logged into that exact
 * programme. Otherwise any logged-in teacher is allowed.
 */
export function TeacherGate({
  children,
  requiredSlug,
}: {
  children: React.ReactNode;
  requiredSlug?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<"loading" | "ok" | "redirect">("loading");

  useEffect(() => {
    const teacher = getTeacher();
    if (!teacher) {
      router.replace("/login");
      setState("redirect");
      return;
    }
    const isAdmin = teacher.programmeSlug === "*" || teacher.role === "admin";
    // Building picker is itself a protected page (you must be signed in
    // to use it), but it's exempt from the building-required check
    // since that's literally where the teacher picks one.
    // Admins don't run classes — they review the platform — so they
    // never need to pick a building.
    if (!isAdmin && !teacher.building && pathname !== "/building") {
      router.replace("/building");
      setState("redirect");
      return;
    }
    // Admin (programmeSlug = "*") can access anything
    if (!isAdmin && requiredSlug && teacher.programmeSlug !== requiredSlug) {
      // Wrong programme — send the teacher to their own
      router.replace(`/${teacher.programmeSlug}`);
      setState("redirect");
      return;
    }
    setState("ok");
  }, [router, pathname, requiredSlug]);

  if (state !== "ok") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[12px] font-medium text-ink-subtle">loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Lightweight hook for client components to read the current teacher.
 */
export function useTeacher(): { teacher: TeacherState | null; loading: boolean } {
  const [teacher, setTeacherState] = useState<TeacherState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTeacherState(getTeacher());
    setLoading(false);
  }, []);

  return { teacher, loading };
}
