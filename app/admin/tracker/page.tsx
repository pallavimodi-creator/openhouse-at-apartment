"use client";

/**
 * /admin/tracker — ADMIN-ONLY preview of the monthly progress tracker
 * (robotics). Gated behind the admin role so it can be handed to a small
 * set of testers without exposing it to every educator. The tool itself is
 * the self-contained /rtracker.html, embedded here.
 */

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { TeacherGate, useTeacher } from "@/components/TeacherGate";

export default function AdminTrackerPage() {
  return (
    <TeacherGate>
      <Content />
    </TeacherGate>
  );
}

function Content() {
  const { teacher } = useTeacher();
  const isAdmin = !!teacher && (teacher.role === "admin" || teacher.programmeSlug === "*");

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <p className="text-[13px] font-semibold text-ink-muted">
          this preview is for admins only.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-5">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-muted transition hover:text-ink"
      >
        <ChevronLeft className="h-4 w-4" /> back
      </Link>
      <div className="mb-3 mt-2">
        <h1 className="text-[18px] font-extrabold lowercase text-ink">
          progress tracker · preview
        </h1>
        <p className="mt-0.5 text-[12px] text-ink-muted">
          admin-only test build (robotics · mechanics). the teacher marks the grid; the parent note writes itself. tap cells to explore.
        </p>
      </div>
      <iframe
        src="/rtracker.html"
        title="progress tracker preview"
        className="w-full rounded-2xl border border-ink/10 bg-brand-white"
        style={{ height: "1600px" }}
      />
    </div>
  );
}
