"use client";

/**
 * /tracker — the teacher-facing robotics monthly progress tracker.
 *
 * Embeds the self-contained /rtracker.html. When the signed-in teacher has an
 * apartment identity (apartmentId + teacherId), it is passed through on the
 * iframe URL so the tracker saves each monthly note to the apartment's SHARED
 * backend (every teacher in the apartment sees the whole class on the
 * dashboard). Without an apartment identity the tracker falls back to its own
 * per-device storage, so it still works for a plain login.
 */

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { TeacherGate, useTeacher } from "@/components/TeacherGate";

export default function TrackerPage() {
  return (
    <TeacherGate>
      <Content />
    </TeacherGate>
  );
}

function Content() {
  const { teacher, loading } = useTeacher();
  if (loading) return null;

  const params = new URLSearchParams();
  if (teacher?.apartmentId) params.set("apartmentId", teacher.apartmentId);
  if (teacher?.teacherId) params.set("teacherId", teacher.teacherId);
  if (teacher?.teacherName) params.set("teacherName", teacher.teacherName);
  const qs = params.toString();
  const src = qs ? `/rtracker.html?${qs}` : "/rtracker.html";
  const connected = !!teacher?.apartmentId;

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
          robotics · progress tracker
        </h1>
        <p className="mt-0.5 text-[12px] text-ink-muted">
          {connected
            ? "fill a child's monthly note — it saves to your apartment's shared class dashboard, so every teacher here sees the class."
            : "fill a child's monthly note. sign in with your apartment login to share notes across the whole class."}
        </p>
      </div>
      <iframe
        src={src}
        title="robotics progress tracker"
        className="w-full rounded-2xl border border-ink/10 bg-brand-white"
        style={{ height: "1600px" }}
      />
    </div>
  );
}
