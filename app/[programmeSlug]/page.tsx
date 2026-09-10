"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

  // Plans-page summary — a one-paragraph consolidation of the overview
  // content. Per programme. Falls back to the data-file description for
  // programmes without a dedicated summary.
  const planSummary: Record<string, string> = {
    "art-design-3-5":
      "Building fine motor control and creative expression through a class that runs like an atelier. Each 90-minute session moves through art gym, art games, artiverse / artistotle making, experience book, and art care.",
    "language-storytelling-3-5":
      "An emergent-literacy programme that builds listening, speaking, reading, and early writing through stories, songs, games, and playful practice. Each session moves through roll & rhyme, book'o'clock + wordsmiths, play-writes, and playground games.",
  };
  const heroDescription =
    planSummary[programme.slug] ?? programme.description;

  return (
    <div className="flex flex-col">
      <ProgrammeHero
        title={programme.title}
        ageLabel={programme.ageLabel}
        description={heroDescription}
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
        {/* Music — this band's pacing (5–8 take ~20% more classes than 8–12
            to reach the same level). Each age band is its own plan. */}
        {programme.category === "music" && (
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-brand-cream px-3 py-2 text-[11.5px] text-ink-muted ring-1 ring-ink/5">
            <span className="font-semibold text-ink">{programme.ageLabel}</span>
            <span>
              ~<span className="font-bold text-ink">{programme.totalSessions}</span>{" "}
              classes to complete this level
            </span>
            <span className="text-ink-subtle">children move up at their own pace</span>
          </div>
        )}
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

      {/* Daily plan — wrapped in a "planner page" frame: a small
          spiral-binding strip across the top + a soft cream page so
          the day plan reads like a daily planner rather than a list
          of cards on the background canvas. */}
      <section className="mt-6 px-4 pb-4">
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-brand-cream shadow-card ring-1 ring-ink/5">
          {/* Spiral binding band — colour driven by the programme's
              category so the band visually matches the hero band
              above (yellow for art, green for language, blue for
              stem/robotics). */}
          {(() => {
            // Language storytelling skips the spiral-binding band —
            // the storytelling arc reads better without the workbook
            // metaphor on top.
            if (programme.category === "language") return null;
            const bandTone =
              programme.category === "stem"
                ? "bg-segment-blue/70"
                : "bg-segment-yellow/70";
            return (
              <div className={`flex items-center justify-around px-3 py-2 ${bandTone}`}>
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="h-2.5 w-2.5 rounded-full bg-brand-white shadow-[inset_0_1px_2px_rgba(44,43,40,0.25)] ring-1 ring-ink/15"
                  />
                ))}
              </div>
            );
          })()}
          <div className="px-4 pb-5 pt-4 md:px-6">
            {selectedDay === 0 && programme.trialSession ? (
              <TrialSessionCard trial={programme.trialSession} />
            ) : currentSession ? (
              <DayPlan programme={programme} session={currentSession} />
            ) : (
              <p className="py-8 text-center text-[13px] text-ink-subtle">
                no plan available for this session.
              </p>
            )}
          </div>
        </div>
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
