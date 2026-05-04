"use client";

import { useState, useEffect } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { CheckCircle2, Circle } from "lucide-react";
import { getCurriculumProgramme } from "@/lib/content";
import { ProgrammeHero } from "@/components/ProgrammeHero";
import { DaySelector } from "@/components/DaySelector";
import { DayPlan } from "@/components/DayPlan";
import { TrialSessionCard } from "@/components/TrialSessionCard";
import {
  getTeacher,
  getCompletedDays,
  markDayCompleted,
  unmarkDayCompleted,
  getNextDay,
} from "@/lib/teacher-state";

export default function ProgrammeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.programmeSlug as string;
  const programme = getCurriculumProgramme(slug);

  const hasTrialSession =
    (programme?.sessionTable.some((s) => s.sessionNumber === 0)) ?? false;

  const [selectedDay, setSelectedDay] = useState<number>(hasTrialSession ? 0 : 1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [authState, setAuthState] = useState<"loading" | "ok" | "redirect">(
    "loading"
  );
  const [isAdmin, setIsAdmin] = useState(false);

  // Auth gate + restore completed days + default to next uncompleted day
  useEffect(() => {
    if (!programme) return;
    const teacher = getTeacher();
    if (!teacher) {
      router.replace("/login");
      setAuthState("redirect");
      return;
    }
    const admin = teacher.programmeSlug === "*" || teacher.role === "admin";
    setIsAdmin(admin);
    // Access rules:
    // - admin: any programme
    // - category-scoped teacher: any programme in their category
    // - single-programme teacher: only their own slug
    const allowed =
      admin ||
      (teacher.category
        ? programme.category === teacher.category
        : teacher.programmeSlug === slug);
    if (!allowed) {
      router.replace(`/${teacher.programmeSlug}`);
      setAuthState("redirect");
      return;
    }
    const done = admin ? [] : getCompletedDays(slug);
    setCompletedDays(done);
    // Default to the next uncompleted day; admins always start at trial (or day 1)
    const next = admin
      ? hasTrialSession
        ? 0
        : 1
      : getNextDay(done, programme.totalSessions, hasTrialSession);
    setSelectedDay(next);
    setAuthState("ok");
  }, [slug, programme, hasTrialSession, router]);

  if (!programme) {
    notFound();
    return null;
  }

  if (programme.totalSessions === 0) {
    return (
      <div className="flex flex-col">
        <ProgrammeHero
          title={programme.title}
          ageLabel={programme.ageLabel}
          description={programme.description}
          category={programme.category}
        />
        <div className="px-4 py-12 text-center">
          <p className="text-[14px] text-ink-subtle">
            content for this programme is coming soon.
          </p>
        </div>
      </div>
    );
  }

  if (authState !== "ok") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[12px] font-medium text-ink-subtle">loading...</p>
      </div>
    );
  }

  const checkpointDays = programme.checkpoints.map((c) => c.afterSession);
  const currentSession = programme.sessionTable.find(
    (s) => s.sessionNumber === selectedDay
  );
  const isCompleted = completedDays.includes(selectedDay);

  const handleToggleComplete = () => {
    if (isCompleted) {
      const next = unmarkDayCompleted(slug, selectedDay);
      setCompletedDays(next);
      return;
    }
    const next = markDayCompleted(slug, selectedDay);
    setCompletedDays(next);
    // Auto-advance to the next uncompleted day
    const nextDay = getNextDay(next, programme.totalSessions, hasTrialSession);
    if (nextDay !== selectedDay) {
      setTimeout(() => setSelectedDay(nextDay), 250);
    }
  };

  return (
    <div className="flex flex-col">
      <ProgrammeHero
        title={programme.title}
        ageLabel={programme.ageLabel}
        description={programme.description}
        category={programme.category}
        badge={
          programme.slug === "art-design-3-5"
            ? `ongoing · ${programme.totalSessions} sessions ready`
            : undefined
        }
      />

      {/* Day selector */}
      <section className="mt-6 px-4">
        <h2 className="mb-2 text-[12px] font-bold text-ink-muted">
          select a session
        </h2>
        <DaySelector
          totalDays={programme.totalSessions}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          category={programme.category}
          checkpointDays={checkpointDays}
          hasTrialSession={hasTrialSession}
          completedDays={completedDays}
        />
      </section>

      {/* Daily plan */}
      <section className="mt-6 px-4 pb-4">
        {selectedDay === 0 && programme.trialSession ? (
          <TrialSessionCard trial={programme.trialSession} />
        ) : currentSession ? (
          <DayPlan programme={programme} session={currentSession} />
        ) : (
          <p className="py-8 text-center text-[13px] text-ink-subtle">
            no plan available for this session.
          </p>
        )}
      </section>

      {/* Mark as done — teacher-only; admin is in view mode */}
      {currentSession && !isAdmin && (
        <section className="px-4 pb-8">
          <button
            onClick={handleToggleComplete}
            className={
              isCompleted
                ? "flex w-full items-center justify-center gap-2 rounded-card border-2 border-category-language bg-segment-green/20 py-3.5 text-[14px] font-bold text-green-900 transition hover:bg-segment-green/30 active:scale-[0.99]"
                : "flex w-full items-center justify-center gap-2 rounded-card bg-brand-orange py-3.5 text-[14px] font-bold text-white shadow-card transition hover:opacity-95 active:scale-[0.99]"
            }
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                <span>session done · tap to undo</span>
              </>
            ) : (
              <>
                <Circle className="h-5 w-5" />
                <span>mark this session done</span>
              </>
            )}
          </button>
          <p className="mt-2 text-center text-[10px] text-ink-subtle">
            {isCompleted
              ? "saved — you'll land here next time unless there's a new one."
              : "marking done will take you to your next session."}
          </p>
        </section>
      )}
    </div>
  );
}
