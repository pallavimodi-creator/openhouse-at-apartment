"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { listCurriculumProgrammes, getCurriculumProgramme } from "@/lib/content";
import { HeroBanner } from "@/components/HeroBanner";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { getTeacher, type TeacherState } from "@/lib/teacher-state";

export default function HomePage() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<TeacherState | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = getTeacher();
    if (!t) {
      router.replace("/login");
      return;
    }
    setTeacher(t);
    setLoaded(true);
  }, [router]);

  if (!loaded || !teacher) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[12px] font-medium text-ink-subtle">loading...</p>
      </div>
    );
  }

  const isAdmin = teacher.programmeSlug === "*" || teacher.role === "admin";
  // Show every programme on the homepage. ProgrammeCard renders a
  // "coming soon" tag for any programme whose totalSessions === 0
  // (e.g. language through storytelling 3-5 while content is still
  // being authored), so previously hiding them by filter is no longer
  // necessary — teachers see what's coming next.
  const programmes = isAdmin
    ? listCurriculumProgrammes()
    : teacher.category
      ? listCurriculumProgrammes().filter(
          (p) => p.category === teacher.category,
        )
      : (() => {
          const p = getCurriculumProgramme(teacher.programmeSlug);
          return p ? [p] : [];
        })();

  const headingLabel = isAdmin
    ? "admin · all programmes"
    : teacher.category
      ? "your programmes"
      : "welcome back";
  const sectionLabel = isAdmin
    ? "all programmes"
    : teacher.category
      ? "your programmes"
      : "your programme";

  return (
    <div className="flex flex-col">
      <HeroBanner />

      {/* Welcome + programme */}
      <section className="px-4 pt-6 pb-8 md:px-8 md:pt-10 md:pb-12">
        <div>
          <h2 className="text-[22px] font-extrabold leading-tight text-ink md:text-[28px]">
            hello, {teacher.teacherName}.
          </h2>
        </div>

        <p className="mt-4 text-[13px] font-medium text-ink-muted md:text-[14px]">
          {sectionLabel}
        </p>

        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {programmes.map((p) => (
            <ProgrammeCard key={p.id} programme={p} desktop />
          ))}
        </div>
      </section>
    </div>
  );
}
