"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { listHomeProgrammes, getCurriculumProgramme } from "@/lib/content";
import { HeroBanner } from "@/components/HeroBanner";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { getTeacher, type TeacherState } from "@/lib/teacher-state";

// Three-step guide tile — consistent layout for the "how to go
// through the website" sequence. The emoji floats gently and wobbles
// on hover to draw the eye along the steps without distracting.
function GuideStep({
  step,
  emoji,
  tone,
  title,
  body,
}: {
  step: number;
  emoji: string;
  tone: "yellow" | "green" | "blue";
  title: string;
  body: ReactNode;
}) {
  const toneBg =
    tone === "yellow"
      ? "bg-segment-yellow/15 ring-segment-yellow/40"
      : tone === "green"
        ? "bg-segment-green/15 ring-segment-green/40"
        : "bg-segment-blue/15 ring-segment-blue/40";
  return (
    <li
      className={`group/step relative rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/[0.05] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lift hover:ring-ink/[0.08] md:p-5`}
    >
      {/* Floating emoji badge sitting partly outside the card */}
      <div className="relative mb-3 flex items-center gap-2">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full text-[22px] ring-1 ${toneBg} animate-float-soft group-hover/step:[animation-play-state:paused] group-hover/step:animate-wobble`}
          aria-hidden
        >
          {emoji}
        </span>
        <span className="ml-auto rounded-chip bg-brand-cream px-2 py-0.5 text-[10px] font-bold text-ink-muted">
          step {step}
        </span>
      </div>
      <p className="text-[13.5px] font-extrabold lowercase leading-tight text-ink md:text-[14.5px]">
        {title}
      </p>
      <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted md:text-[12.5px]">
        {body}
      </p>
    </li>
  );
}

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
    // Non-admin teachers need to have picked a building this session
    // before they can land on home. Admins skip this — they're reviewing,
    // not running a class.
    const admin = t.role === "admin" || t.programmeSlug === "*";
    if (!admin && !t.building) {
      router.replace("/building");
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
  // listHomeProgrammes() shows only level 1 of a multi-level track — later
  // levels (e.g. robotics level 2, electronics) are reached from inside the
  // programme via the level switcher, so the grid stays one card per name.
  const programmes = isAdmin
    ? listHomeProgrammes()
    : teacher.category
      ? listHomeProgrammes().filter((p) => p.category === teacher.category)
      : (() => {
          const p = getCurriculumProgramme(teacher.programmeSlug);
          return p ? [p] : [];
        })();

  const sectionLabel = isAdmin
    ? "all programmes"
    : teacher.category
      ? "your programmes"
      : "your programme";

  // Group programmes by category. Each category gets a heading
  // ("art & design", "language through storytelling and public
  // speaking", "stem & robotics") and the programmes inside that
  // category render as panels underneath.
  const categoryOrder: Array<{ key: string; label: string }> = [
    { key: "art", label: "art & design" },
    { key: "language", label: "language through storytelling and public speaking" },
    { key: "stem", label: "stem & robotics" },
    { key: "music", label: "music" },
  ];
  const programmesByCategory = categoryOrder
    .map((c) => ({
      ...c,
      items: programmes.filter((p) => p.category === c.key),
    }))
    .filter((c) => c.items.length > 0);

  const showCategoryIntro = isAdmin || !teacher.category;

  return (
    <div className="flex flex-col">
      <HeroBanner />

      {/* Welcome */}
      <section className="px-4 pt-6 pb-2 md:px-8 md:pt-10">
        <h2 className="text-[22px] font-extrabold leading-tight text-ink md:text-[28px]">
          hello, {teacher.teacherName}.
        </h2>
      </section>

      {/* How to go through the website — three-step sequence with
          hand-drawn doodle squiggles connecting the steps. The emoji
          icons float gently and wobble on hover so the eye is drawn
          along the sequence. */}
      <section className="px-4 pt-6 md:px-8 md:pt-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand-white p-5 shadow-card ring-1 ring-ink/[0.05] md:p-7">
          {/* Decorative doodles — subtle, low contrast, behind content */}
          <svg
            aria-hidden
            className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 text-brand-orange/15 md:h-20 md:w-20"
            viewBox="0 0 80 80"
            fill="none"
          >
            <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="2" strokeDasharray="3 5" />
            <path d="M14 14 Q22 6 30 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <svg
            aria-hidden
            className="pointer-events-none absolute -bottom-2 -left-3 h-14 w-14 text-brand-orange/15 md:h-16 md:w-16"
            viewBox="0 0 80 80"
            fill="none"
          >
            <path d="M8 50 Q18 38 28 50 T48 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M58 14 L60 4 L66 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="relative">
            <p className="text-[11px] font-bold tracking-normal text-brand-orange">
              how to go through the website
            </p>
            <p className="mt-1 text-[15px] font-extrabold lowercase leading-tight text-ink md:text-[18px]">
              three steps · in this order
            </p>

            <ol className="relative mt-5 grid gap-3 md:mt-7 md:grid-cols-3 md:gap-4">
              {/* Connecting squiggle on desktop only */}
              <svg
                aria-hidden
                className="pointer-events-none absolute left-[16%] right-[16%] top-[34px] hidden h-6 text-brand-orange/30 md:block"
                viewBox="0 0 600 24"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M2 12 Q60 -8 120 12 T240 12 T360 12 T480 12 Q540 -4 598 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4 6"
                  className="animate-squiggle"
                />
              </svg>

              <GuideStep
                step={1}
                emoji="📖"
                tone="yellow"
                title="read the overview"
                body={
                  <>
                    <span className="font-semibold text-brand-orange">Get a gist of the programme</span> — what&apos;s taught, how the class flows, and how each segment works.
                  </>
                }
              />
              <GuideStep
                step={2}
                emoji="🗓️"
                tone="green"
                title="pick a plan, run the class"
                body={
                  <>
                    <span className="font-semibold text-brand-orange">Open today&apos;s plan</span>, teach the session, then{" "}
                    <span className="font-semibold text-brand-orange">mark it done</span> so you land on the next one tomorrow.
                  </>
                }
              />
              <GuideStep
                step={3}
                emoji="📚"
                tone="blue"
                title="search the library"
                body={
                  <>
                    Want a particular game or resource?{" "}
                    <Link href="/library" className="text-ink-muted underline-offset-2 hover:underline">
                      Open the library
                    </Link>{" "}
                    and{" "}
                    <span className="font-semibold text-brand-orange">search by name, segment, or keyword</span>.
                  </>
                }
              />
            </ol>
          </div>
        </div>
      </section>

      {/* Programme categories */}
      <section className="px-4 pt-6 pb-8 md:px-8 md:pt-8 md:pb-12">
        {showCategoryIntro && (
          <h3 className="mb-4 text-[16px] font-extrabold leading-snug text-ink md:text-[18px]">
            programme categories
          </h3>
        )}

        <div className="space-y-6">
          {programmesByCategory.map((c) => (
            <div key={c.key}>
              <h4 className="mb-2 text-[13px] font-extrabold lowercase text-ink">
                {c.label}
              </h4>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {c.items.map((p) => (
                  <ProgrammeCard key={p.id} programme={p} desktop />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
