"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTeacher, type TeacherState } from "@/lib/teacher-state";

/**
 * Wrap protected pages with this component. It redirects to /login if the
 * teacher is not signed in, and to their own programme if they try to access
 * a different programme.
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
  const [state, setState] = useState<"loading" | "ok" | "redirect">("loading");

  useEffect(() => {
    const teacher = getTeacher();
    if (!teacher) {
      router.replace("/login");
      setState("redirect");
      return;
    }
    // Admin (programmeSlug = "*") can access anything
    const isAdmin = teacher.programmeSlug === "*" || teacher.role === "admin";
    if (!isAdmin && requiredSlug && teacher.programmeSlug !== requiredSlug) {
      // Wrong programme — send the teacher to their own
      router.replace(`/${teacher.programmeSlug}`);
      setState("redirect");
      return;
    }
    setState("ok");
  }, [router, requiredSlug]);

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
