"use client";

// The old "building picker" step is retired: the apartment chosen at the
// shared apartment login now *is* the centre. This page just forwards.
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTeacher } from "@/lib/teacher-state";

export default function RetiredBuildingPage() {
  const router = useRouter();
  useEffect(() => {
    const t = getTeacher();
    if (!t) router.replace("/login");
    else if (t.role === "admin" || t.programmeSlug === "*") router.replace("/");
    else if (t.apartmentId && !t.teacherId) router.replace("/teacher");
    else router.replace("/");
  }, [router]);
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="text-[12px] font-medium text-ink-subtle">loading…</p>
    </div>
  );
}
