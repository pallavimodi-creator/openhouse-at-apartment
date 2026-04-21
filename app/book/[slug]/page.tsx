"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { getBookConfig, type BookConfig } from "@/content/books";
import { getManualConfig, type ManualConfig } from "@/content/books/manuals";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* ─── Cloud wave SVG divider ───────────────────────────────── */

function CloudWave({ from, to }: { from: string; to: string }) {
  const fill = to === "white" ? "#FFFFFF" : "#F9F2E8";
  return (
    <div className={`relative -mb-px ${from}`}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ─── Page wrapper ─────────────────────────────────────────── */

function BookPage({
  book,
  pageNumber,
  children,
  className = "",
}: {
  book: BookConfig;
  pageNumber: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative px-5 py-8 md:px-8 md:py-10 ${className}`}
    >
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 text-right text-[10px] font-bold text-ink/30">
          {pageNumber}
        </p>
        {children}
      </div>
    </section>
  );
}

/* ─── Divider between pages ────────────────────────────────── */

function PageDivider() {
  return (
    <div className="mx-auto my-2 flex max-w-2xl items-center gap-3 px-5">
      <div className="h-px flex-1 bg-ink/5" />
      <span className="text-[10px] text-ink/20">·</span>
      <div className="h-px flex-1 bg-ink/5" />
    </div>
  );
}

/* ─── Draw box placeholder ─────────────────────────────────── */

function DrawBox({ label }: { label: string }) {
  return (
    <div className="mt-4 flex h-40 items-center justify-center rounded-2xl border-2 border-dashed border-ink/10 bg-white/60">
      <p className="text-[11px] italic text-ink/30">{label}</p>
    </div>
  );
}

/* ─── Form field ──────────────────────────────────────────── */

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="mt-3">
      <p className="text-[10px] font-bold text-ink/50">{label}</p>
      <div className="mt-1 border-b border-dashed border-ink/15 pb-1">
        <p className="text-[12px] italic text-ink/25">{placeholder}</p>
      </div>
    </div>
  );
}

/* ─── Skill tracker levels ─────────────────────────────────── */

function SkillTrackerRow({
  skill,
  levels,
}: {
  skill: string;
  levels: string[];
}) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <p className="w-28 shrink-0 text-[10px] font-bold text-ink/60">
        {skill}
      </p>
      <div className="flex flex-1 gap-1">
        {levels.map((level) => (
          <div
            key={level}
            className="flex flex-1 items-center justify-center rounded-full border border-ink/10 bg-white/60 py-1"
          >
            <span className="text-[8px] text-ink/40">{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Cover Section ────────────────────────────────────────── */

function CoverSection({ book }: { book: BookConfig }) {
  return (
    <>
      <section className={`${book.coverColor} px-5 pb-2 pt-8 md:px-8`}>
        <div className="mx-auto max-w-2xl">
          {book.coverImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.coverImageUrl}
              alt={`${book.title} cover`}
              className="mx-auto mb-6 block max-h-[60vh] w-auto rounded-xl bg-white/40 shadow-card ring-1 ring-ink/5"
            />
          )}
          <p className="text-[12px] font-extrabold text-ink/50">oh.</p>
          <h1 className="mt-2 text-[28px] font-extrabold leading-tight text-ink md:text-[36px]">
            {book.title}
          </h1>
          <p className="mt-2 text-[13px] font-semibold text-ink/60">
            {book.subtitle}
          </p>
          <p className="mt-4 max-w-md text-[12px] italic leading-relaxed text-ink/70">
            {book.tagline}
          </p>

          <div className="mt-6 space-y-3">
            {book.nameFields.map((f) => (
              <Field key={f.label} label={f.label} placeholder={f.placeholder} />
            ))}
          </div>

          <p className="mt-8 pb-4 text-[10px] font-bold tracking-wide text-ink/30">
            oh. · choose to be better.
          </p>
        </div>
      </section>
      <CloudWave from={book.coverColor} to="white" />
    </>
  );
}

/* ─── All About Me — Page 2 ────────────────────────────────── */

function ThisIsMePage({ book }: { book: BookConfig }) {
  return (
    <BookPage book={book} pageNumber={2} className="bg-white">
      <h2 className="text-[20px] font-extrabold text-ink">this is me</h2>
      <p className="mt-1 text-[12px] text-ink/60">
        draw a picture of yourself below.
      </p>
      <DrawBox label="draw yourself here" />
    </BookPage>
  );
}

/* ─── All About Me — Page 3 ────────────────────────────────── */

function AboutMePage({ book }: { book: BookConfig }) {
  return (
    <BookPage book={book} pageNumber={3} className="bg-white">
      <h2 className="text-[20px] font-extrabold text-ink">all about me</h2>

      <div className="mt-4">
        <p className="text-[11px] font-bold text-ink/60">
          doodle your name in your own style:
        </p>
        <div className="mt-2 h-16 rounded-xl border-2 border-dashed border-ink/10 bg-white/60" />
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-bold text-ink/60">
          draw your favourite colour as a flower:
        </p>
        <div className="mt-2 h-24 rounded-xl border-2 border-dashed border-ink/10 bg-white/60" />
      </div>

      <div className="mt-5">
        <p className="mb-2 text-[11px] font-bold text-ink/60">
          tick the ones that are true for you:
        </p>
        {book.preferences.map((p) => (
          <div key={p} className="mt-2 flex items-start gap-2">
            <div className="mt-0.5 h-4 w-4 shrink-0 rounded border border-ink/15 bg-white/60" />
            <p className="text-[11px] text-ink/70">{p}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-bold text-ink/60">
          my goal for the year:
        </p>
        <div className="mt-1 border-b border-dashed border-ink/15 pb-4">
          <p className="text-[11px] italic text-ink/25">write your goal here</p>
        </div>
      </div>
    </BookPage>
  );
}

/* ─── What We Do ───────────────────────────────────────────── */

function WhatWeDoPage({ book }: { book: BookConfig }) {
  return (
    <BookPage book={book} pageNumber={4} className="bg-white">
      <h2 className="text-[20px] font-extrabold text-ink">what we do</h2>
      <p className="mt-1 text-[12px] text-ink/60">
        every session has these parts:
      </p>

      <div className="mt-5 space-y-4">
        {book.segments.map((seg) => (
          <div key={seg.name} className="flex gap-3">
            <span className="text-[24px]">{seg.icon}</span>
            <div className="flex-1">
              <p className="text-[13px] font-extrabold text-ink">{seg.name}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-ink/60">
                {seg.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {book.lanyardExplanation && (
        <div className="mt-6 rounded-2xl bg-bg-subtle/50 p-4">
          <p className="text-[11px] font-bold text-ink/60">
            🎗️ the lanyard
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/book-assets/lanyards.png"
            alt="lanyards — one per ability"
            className="mt-3 w-full rounded-lg bg-white object-contain"
          />
          <p className="mt-3 text-[11px] leading-relaxed text-ink/50">
            {book.lanyardExplanation}
          </p>
        </div>
      )}
    </BookPage>
  );
}

/* ─── Skills Map ───────────────────────────────────────────── */

function SkillsMapPage({ book }: { book: BookConfig }) {
  return (
    <BookPage book={book} pageNumber={5} className="bg-white">
      <h2 className="text-[20px] font-extrabold text-ink">skills map</h2>
      <p className="mt-1 text-[12px] text-ink/60">
        these are the skills you are building this year.
      </p>

      <div className="mt-5 space-y-5">
        {book.skills.map((skill) => (
          <div key={skill.tag} className="rounded-2xl bg-bg/60 p-4">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: skill.color }}
              />
              <p className="text-[13px] font-extrabold text-ink">
                {skill.name}
              </p>
            </div>
            <p className="mt-0.5 text-[10px] text-ink/50">{skill.desc}</p>
            <div className="mt-2 space-y-1">
              {skill.abilities.map((a) => (
                <p key={a} className="text-[10px] leading-relaxed text-ink/60">
                  {a}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BookPage>
  );
}

/* ─── Daily Log Template — Page 1 ──────────────────────────── */

function DailyLogFieldsPage({ book }: { book: BookConfig }) {
  return (
    <BookPage book={book} pageNumber={6} className="bg-white">
      <h2 className="text-[20px] font-extrabold text-ink">
        things we did today
      </h2>
      <p className="mt-1 text-[12px] text-ink/60">
        fill this in at the end of every session.
      </p>

      <div className="mt-4">
        <p className="text-[10px] font-bold text-ink/50">date</p>
        <div className="mt-1 border-b border-dashed border-ink/15 pb-1">
          <p className="text-[12px] italic text-ink/25">dd / mm / yyyy</p>
        </div>
      </div>

      {book.dailyLogFields.map((f) => (
        <Field key={f.label} label={f.label} placeholder={f.placeholder} />
      ))}

      <DrawBox label="draw or stick something from today" />
    </BookPage>
  );
}

/* ─── Daily Log Template — Page 2 ──────────────────────────── */

function DailyLogTrackerPage({ book }: { book: BookConfig }) {
  return (
    <BookPage book={book} pageNumber={7} className="bg-white">
      <h2 className="text-[20px] font-extrabold text-ink">
        {book.dailyLogTracker.label}
      </h2>
      <p className="mt-1 text-[12px] text-ink/60">
        circle or colour in how you felt about each skill area today.
      </p>

      <div className="mt-4 space-y-1">
        {book.skills.map((skill) => (
          <SkillTrackerRow
            key={skill.tag}
            skill={skill.name}
            levels={book.dailyLogTracker.levels}
          />
        ))}
      </div>

      <div className="mt-6">
        <p className="text-[10px] font-bold text-ink/50">
          one thing i want to try next time:
        </p>
        <div className="mt-1 border-b border-dashed border-ink/15 pb-4">
          <p className="text-[11px] italic text-ink/25">write here</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[10px] font-bold text-ink/50">
          teacher&apos;s note:
        </p>
        <div className="mt-1 border-b border-dashed border-ink/15 pb-4">
          <p className="text-[11px] italic text-ink/25">teacher writes here</p>
        </div>
      </div>
    </BookPage>
  );
}

/* ─── Journey Section ──────────────────────────────────────── */

function JourneySection({
  book,
  journey,
  basePageNumber,
}: {
  book: BookConfig;
  journey: BookConfig["journeys"][number];
  basePageNumber: number;
}) {
  return (
    <>
      {/* Journey intro + favourite piece */}
      <BookPage
        book={book}
        pageNumber={basePageNumber}
        className={`${book.coverColor}/30`}
      >
        <p className="text-[10px] font-bold tracking-widest text-ink/40">
          {book.journeyLabel} {journey.number}
        </p>
        <h2 className="mt-1 text-[20px] font-extrabold text-ink">
          {journey.sessionRange}
        </h2>

        <div className="mt-4 rounded-2xl bg-white/70 p-4">
          <p className="text-[10px] font-bold text-ink/50">dear family,</p>
          <p className="mt-1 text-[11px] leading-relaxed text-ink/60">
            {journey.monthIntro}
          </p>
        </div>

        <div className="mt-5">
          <p className="text-[11px] font-bold text-ink/60">
            {book.type === "art"
              ? "one piece we loved from this period:"
              : book.type === "robotics"
                ? "one moment we loved from this period:"
                : "one moment we loved from this period:"}
          </p>
          <DrawBox
            label={
              book.type === "art"
                ? "stick or draw the artwork here"
                : book.type === "robotics"
                  ? "describe or draw the build moment here"
                  : "describe or draw the moment here"
            }
          />
        </div>

        <div className="mt-5">
          <p className="text-[11px] font-bold text-ink/60">
            how they are growing:
          </p>
          <div className="mt-1 space-y-2">
            {book.skills.map((skill) => (
              <div key={skill.tag} className="flex items-center gap-2">
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: skill.color }}
                />
                <p className="text-[10px] text-ink/50">{skill.name}</p>
                <div className="flex-1 border-b border-dashed border-ink/10" />
              </div>
            ))}
          </div>
        </div>
      </BookPage>

      <PageDivider />

      {/* At home section */}
      <BookPage
        book={book}
        pageNumber={basePageNumber + 1}
        className="bg-white"
      >
        <div className="rounded-2xl bg-bg/60 p-5">
          <p className="text-[10px] font-bold tracking-widest text-ink/40">
            at home
          </p>
          <h3 className="mt-1 text-[16px] font-extrabold text-ink">
            {journey.atHomeTitle}
          </h3>

          <div className="mt-3 space-y-2">
            {journey.atHomeTips.map((tip, i) => (
              <div key={i} className="flex gap-2">
                <span className="mt-0.5 text-[10px] text-ink/30">•</span>
                <p className="text-[11px] leading-relaxed text-ink/60">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </BookPage>
    </>
  );
}

/* ─── Back Cover ───────────────────────────────────────────── */

function BackCover({ book }: { book: BookConfig }) {
  return (
    <>
      <CloudWave from="bg-white" to="cream" />
      <section className={`${book.coverColor}/40 px-5 py-8 md:px-8`}>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-[24px] font-extrabold text-ink">
            look how far you&apos;ve come.
          </h2>

          <DrawBox label="draw yourself at the end of the year" />

          <div className="mt-6 space-y-3">
            {book.backCoverPrompts.map((prompt) => (
              <div key={prompt}>
                <p className="text-[11px] font-bold text-ink/60">{prompt}</p>
                <div className="mt-1 border-b border-dashed border-ink/15 pb-3" />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-[20px] font-extrabold text-ink/80">
              keep{" "}
              {book.type === "art"
                ? "making."
                : book.type === "robotics"
                  ? "building."
                  : "speaking."}
            </p>
            <p className="mt-2 text-[10px] font-bold tracking-wide text-ink/30">
              oh. · choose to be better.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Teacher Manual Section ───────────────────────────────── */

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((block, i) => (
        <p key={i} className="text-[12px] leading-relaxed text-ink/70">
          {block}
        </p>
      ))}
    </>
  );
}

function TeacherManualSection({ manual }: { manual: ManualConfig }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto my-8 w-full max-w-2xl px-5">
      <div className="overflow-hidden rounded-2xl bg-ink text-white shadow-card">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-white/[0.04] active:scale-[0.995]"
        >
          <span className="text-[28px]">📘</span>
          <div className="flex-1">
            <p className="text-[10px] font-bold tracking-widest text-white/50">
              for teachers only
            </p>
            <p className="mt-0.5 text-[15px] font-extrabold">teacher manual</p>
            <p className="mt-0.5 text-[11px] text-white/60">{manual.subtitle}</p>
          </div>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-white/70 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="border-t border-white/10 bg-white px-5 py-6 text-ink md:px-8 md:py-8">
            {/* Intro */}
            <div className="rounded-2xl bg-brand-orange/5 p-4">
              <Paragraphs text={manual.intro} />
            </div>

            {/* Contents nav */}
            <nav className="mt-6">
              <p className="text-[10px] font-bold tracking-widest text-ink/40">
                contents
              </p>
              <ol className="mt-2 space-y-1">
                {manual.sections.map((section, i) => (
                  <li key={i} className="flex items-baseline gap-2 text-[12px] text-ink/60">
                    <span className="font-mono text-[10px] text-ink/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Sections */}
            <div className="mt-8 space-y-8">
              {manual.sections.map((section, i) => (
                <div key={i}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] font-bold text-brand-orange/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[16px] font-extrabold text-brand-orange">
                      {section.title}
                    </h3>
                  </div>
                  <div className="mt-2 space-y-2 pl-7">
                    <Paragraphs text={section.content} />
                  </div>
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="mt-4 space-y-4 pl-7">
                      {section.subsections.map((sub, j) => (
                        <div key={j}>
                          <h4 className="text-[13px] font-extrabold text-ink">
                            {sub.title}
                          </h4>
                          <div className="mt-1 space-y-1">
                            <Paragraphs text={sub.content} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {i < manual.sections.length - 1 && (
                    <div className="mt-8 border-t border-ink/5" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-brand-orange/5 p-4 text-center">
              <p className="text-[11px] font-medium text-ink/50">
                end of teacher manual
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Main Page ────────────────────────────────────────────── */

export default function ExperienceBookPage() {
  const params = useParams();
  const slug = params.slug as string;
  const book = getBookConfig(slug);
  const manual = getManualConfig(slug);
  const [showAll, setShowAll] = useState(false);

  if (!book) {
    notFound();
    return null;
  }

  // Journey pages start after the daily log tracker (page 7)
  const journeyBaseStart = 8;

  return (
    <div className="flex flex-col">
      {/* Back link */}
      <div className="px-4 pt-3">
        <Link
          href="/book"
          className="text-[12px] font-bold text-brand-orange hover:underline"
        >
          ← all books
        </Link>
      </div>

      {/* Cover */}
      <CoverSection book={book} />

      {/* All About Me */}
      <ThisIsMePage book={book} />
      <PageDivider />
      <AboutMePage book={book} />
      <PageDivider />

      {/* What We Do */}
      <WhatWeDoPage book={book} />
      <PageDivider />

      {/* Skills Map */}
      <SkillsMapPage book={book} />
      <PageDivider />

      {/* Daily Log Template */}
      <DailyLogFieldsPage book={book} />
      <PageDivider />
      <DailyLogTrackerPage book={book} />

      {/* Journeys — show/hide toggle for length */}
      <div className="mx-auto mt-6 w-full max-w-2xl px-5">
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full rounded-2xl bg-bg-subtle py-3 text-center text-[12px] font-bold text-ink/60 transition hover:bg-bg active:scale-[0.99]"
        >
          {showAll
            ? `hide ${book.journeyLabel}s ▲`
            : `show all 6 ${book.journeyLabel}s ▼`}
        </button>
      </div>

      {showAll && (
        <>
          {book.journeys.map((journey, i) => (
            <div key={journey.number}>
              <PageDivider />
              <JourneySection
                book={book}
                journey={journey}
                basePageNumber={journeyBaseStart + i * 2}
              />
            </div>
          ))}
        </>
      )}

      {/* Back Cover */}
      <PageDivider />
      <BackCover book={book} />

      {/* Teacher Manual — expandable in-page section */}
      {manual && <TeacherManualSection manual={manual} />}
    </div>
  );
}
