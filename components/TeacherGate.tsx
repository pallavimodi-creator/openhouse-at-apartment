"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getTeacher, teacherCategories, type TeacherState } from "@/lib/teacher-state";

/**
 * Wrap CONTENT pages with this component. It redirects to /login if the
 * teacher is not signed in, and to their own programme if they try to access
 * a different one.
 *
 * A generic (layer-1) login reaches content, so the only requirement for a
 * non-admin is a content session — a category or a programme slug. The daily
 * form + shared dashboard are gated separately (they require a full apartment
 * + teacher login); those pages do their own stronger check.
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
    // Content access only needs a signed-in session with a subject (a generic
    // login sets `category`/`programmeSlug`; a full teacher login sets
    // `categories`). Anything less and we send them back to the generic login.
    if (!isAdmin) {
      const hasContent =
        teacherCategories(teacher).length > 0 ||
        (!!teacher.programmeSlug && teacher.programmeSlug !== "");
      if (!hasContent) {
        router.replace("/login");
        setState("redirect");
        return;
      }
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
