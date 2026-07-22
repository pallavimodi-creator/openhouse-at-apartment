"use client";

/**
 * NewsletterDocument — the parent-facing newsletter (2 A4 pages).
 *
 * Pure render from primitives, so both the teacher's live preview and
 * the admin's download page render the identical document.
 *
 * Content rules baked in (per operator):
 *  - addressed to the BUILDING ("dear parents at raheja")
 *  - concept-grouped for robotics; segment-grouped for public speaking;
 *    image-first artworks grid for art
 *  - selections are named explicitly and simply — what was ticked shows
 *  - signed "from openhouse" — no educator name
 *  - photos are models/projects only (the upload UI enforces this); the
 *    experience-book block is a neutral graphic (no children's faces)
 */

import {
  getNewsletterProgramme,
  skillsBuiltFrom,
  type ItemCategory,
  type NewsletterItem,
  type NewsletterProgramme,
} from "@/lib/newsletter-data";
import { humanRange, CATEGORY_ACCENT, parentSkillCopy } from "@/lib/newsletter-voice";
import { getActivityImage } from "@/lib/content";
import {
  BUILD_MECHANISM,
  experimentMechanism,
  MECHANISM_STORY,
  MECHANISM_ORDER,
  PROGRAMME_ENGINEERING_STORY,
  SEGMENT_PHRASING,
  type Mechanism,
} from "@/lib/newsletter-concepts";
import { ArrowRight, Camera } from "lucide-react";

export interface NewsletterDocumentProps {
  programmeSlug: string;
  building: string;
  from: string;
  to: string;
  selected: string[];
  nextSelected: string[];
  photos: string[];
  /** art only — extra artworks the educator typed that aren't in the list */
  customArtworks?: string[];
}

/** category → mascot image (the operator-supplied openhouse mascots). */
const MASCOT: Record<string, string> = {
  stem: "/newsletter/mascot-robotics.png",
  art: "/newsletter/mascot-art.png",
  language: "/newsletter/mascot-ps.png",
};

/** category → what a good photo shows (empty-slot hints, never faces). */
const PHOTO_HINTS: Record<string, string[]> = {
  stem: ["a model", "a build", "a project"],
  art: ["an artwork", "a creation", "the making"],
  language: ["on stage", "a prop", "the setup"],
};

/** heading icon per programme section. */
const SECTION_ICON = { explored: "🔍", made: "🎨", inClass: "🎪", skills: "🌱" };

export function NewsletterDocument(props: NewsletterDocumentProps) {
  const programme = getNewsletterProgramme(props.programmeSlug);
  if (!programme) {
    return (
      <div className="mx-auto max-w-[794px] rounded-card bg-brand-white p-8 text-center text-[13px] text-ink-muted ring-1 ring-ink/5">
        this programme isn&apos;t set up for the newsletter yet.
      </div>
    );
  }

  const selectedSet = new Set(props.selected);
  const nextSet = new Set(props.nextSelected);
  const building = (props.building.trim() || "openhouse").toLowerCase();
  const rangeLabel = humanRange(props.from, props.to);
  const category = programme.categoryLabel;
  const accent = CATEGORY_ACCENT[category] ?? "#B8B5DD";
  const engineering = PROGRAMME_ENGINEERING_STORY[programme.slug];

  const allItems = programme.categories.flatMap((c) => c.items);
  const pickedItems = allItems.filter((i) => selectedSet.has(i.id));
  const nextItems = allItems.filter((i) => nextSet.has(i.id));
  const skillsBuilt = skillsBuiltFrom(programme, selectedSet);

  const isRobotics = programme.slug.startsWith("robotics");
  const isPublicSpeaking = programme.slug.startsWith("public-speaking");
  const isArt = programme.slug.startsWith("art-design");
  const mascot = MASCOT[category];
  const photoHints = PHOTO_HINTS[category] ?? PHOTO_HINTS.stem;

  const conceptGroups = isRobotics ? groupByMechanism(pickedItems) : null;
  const segmentGroups = isPublicSpeaking || isArt ? groupBySegment(pickedItems) : null;
  const listedArtworks = isArt ? pickedItems.filter((i) => i.category === "artworks").map((i) => i.parentLabel) : [];
  const customArtworks = (props.customArtworks ?? []).map((s) => s.trim().toLowerCase()).filter(Boolean);
  const pickedArtworks = [...listedArtworks, ...customArtworks];

  // photo strip (models / projects only — never faces).
  const photos = props.photos;
  // robotics: the auto-generated model-manual illustrations for the picked
  // models — these always show, and any teacher photos sit alongside them.
  const modelImages = Array.from(
    new Set(
      pickedItems
        .filter((i) => i.category === "models")
        .map((i) => getActivityImage(i.id))
        .filter((x): x is string => !!x)
    )
  );
  // other programmes: teacher photos, else any activity image as a fallback.
  const genericFallback = Array.from(
    new Set(
      pickedItems
        .map((i) => getActivityImage(i.id))
        .filter((x): x is string => !!x)
    )
  );
  const heroImages = isRobotics
    ? Array.from(new Set([...photos, ...modelImages])).slice(0, 6)
    : (photos.length > 0 ? photos : genericFallback).slice(0, 3);

  const hasContent = pickedItems.length > 0;

  return (
    <div className="parent-doc mx-auto w-full max-w-[794px] space-y-6 md:space-y-8 print:!space-y-0">
      {/* ─── PAGE 1 ─── */}
      <article className="page bg-brand-white text-ink shadow-card ring-1 ring-ink/5 print:!shadow-none print:!ring-0"
        style={{ minHeight: "1123px", overflow: "hidden" }}>
        <CoralRibbon />

        <div className="flex items-start justify-between gap-4 px-10 pt-5">
          <div className="min-w-0 flex-1">
            {rangeLabel && (
              <p className="font-hand text-[20px] leading-none" style={{ color: "#F25E35" }}>{rangeLabel}</p>
            )}
            <p className="mt-1 text-[11px] font-extrabold tracking-normal text-ink-subtle">
              newsletter · {programme.title} · {programme.ageLabel}
            </p>
            <h1 className="mt-2 font-hand text-[38px] font-bold leading-none" style={{ letterSpacing: 0 }}>
              dear parents at {building},
            </h1>
            <Squiggle color={accent} />
          </div>
          {mascot && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={mascot} alt="" className="h-24 w-24 shrink-0 object-contain"
              style={{ filter: "drop-shadow(0 6px 9px rgba(0,0,0,.10))" }} />
          )}
        </div>

        {/* photo strip — models / projects only */}
        <div className="mt-4 grid grid-cols-3 gap-2 px-10">
          {(heroImages.length > 0 ? heroImages : [null, null, null]).map((src, i) => (
            <div key={i} className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-card text-center ring-1 ring-ink/10" style={{ background: "#F9F2E8" }}>
              {src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={src} alt="" className="h-full w-full object-contain" />
              ) : (
                <span className="flex flex-col items-center gap-1 px-2 text-[10.5px] font-semibold leading-tight" style={{ color: "#8a8177" }}>
                  <Camera className="h-4 w-4" strokeWidth={2} style={{ opacity: 0.5 }} />
                  {photoHints[i] ?? "a photo"}
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-1.5 px-10 font-hand text-[16px]" style={{ color: "#6b6457" }}>
          a peek at what the children made this month ✎
        </p>

        {/* ROBOTICS — concept groups, with the actual experiments named simply */}
        {conceptGroups && conceptGroups.length > 0 && (
          <section className="mt-5 px-10">
            <h2 className="text-[19px] font-extrabold text-ink" style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 10 }}>
              <span className="mr-1.5" aria-hidden>{SECTION_ICON.explored}</span>what we explored
            </h2>
            <div className="mt-3 space-y-2.5">
              {conceptGroups.map(({ mechanism, builds, experiments }) => {
                const s = MECHANISM_STORY[mechanism];
                return (
                  <div key={mechanism} className="rounded-card p-3.5" style={{ background: `${accent}14`, border: `1px solid ${accent}55` }}>
                    <p className="text-[10px] font-extrabold tracking-normal" style={{ color: "#F25E35" }}>
                      the concept
                    </p>
                    <p className="text-[15px] font-extrabold text-ink">
                      <span className="mr-1.5" aria-hidden>{s.icon}</span>{s.label}
                    </p>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-ink-muted">{s.what}</p>
                    {builds.length > 0 && (
                      <p className="mt-2 text-[12.5px] text-ink">
                        <span className="font-bold">🛠 the models we built:</span>{" "}
                        {joinNice(builds.map((b) => b.parentLabel))}.
                      </p>
                    )}
                    {experiments.length > 0 && (
                      <div className="mt-1.5">
                        <p className="text-[12px] font-bold text-ink">🧪 the experiments we ran:</p>
                        <ul className="mt-0.5 space-y-0.5">
                          {experiments.map((e) => (
                            <li key={e.id} className="flex items-start gap-1.5 text-[12px] leading-snug text-ink-muted">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />
                              <span>{e.parentLabel}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ART — artworks (listed + educator's custom additions) */}
        {isArt && pickedArtworks.length > 0 && (
          <section className="mt-5 px-10">
            <h2 className="text-[19px] font-extrabold text-ink" style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 10 }}>
              <span className="mr-1.5" aria-hidden>{SECTION_ICON.made}</span>what we made
            </h2>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {pickedArtworks.slice(0, 9).map((label, i) => (
                <div key={`${label}-${i}`} className="overflow-hidden rounded-card ring-1 ring-ink/5" style={{ background: "#F9F2E8" }}>
                  <div className="flex aspect-square items-center justify-center text-[22px]" aria-hidden>🎨</div>
                  <p className="px-2 py-1 text-center text-[10.5px] font-bold leading-tight text-ink">{label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GAMES BY SEGMENT — public speaking + art games */}
        {segmentGroups && segmentGroups.length > 0 && (
          <section className="mt-5 px-10">
            <h2 className="text-[19px] font-extrabold text-ink" style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 10 }}>
              <span className="mr-1.5" aria-hidden>{SECTION_ICON.inClass}</span>what we did in class
            </h2>
            <div className="mt-3 space-y-2.5">
              {segmentGroups.map(({ segment, segmentName, items }) => {
                const phrasing = SEGMENT_PHRASING[segment] ?? { icon: "✨", lead: "we did" };
                return (
                  <div key={segment} className="rounded-card p-3.5" style={{ background: `${accent}14`, border: `1px solid ${accent}55` }}>
                    <p className="text-[14.5px] font-extrabold text-ink">
                      <span className="mr-1.5" aria-hidden>{phrasing.icon}</span>{segmentName.toLowerCase()}
                    </p>
                    <p className="mt-1 text-[12.5px] text-ink">
                      {phrasing.lead} <span className="font-bold">{joinNice(items.map((i) => i.parentLabel))}</span>.
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {!hasContent && (
          <p className="mx-10 mt-6 rounded-card bg-ink/[0.03] p-6 text-center text-[13px] italic text-ink-muted">
            tick what the children did — it appears here.
          </p>
        )}

        <PageFooter building={building} pageIndex={1} />
      </article>

      {/* ─── PAGE 2 ─── */}
      <article className="page bg-brand-white text-ink shadow-card ring-1 ring-ink/5 print:!shadow-none print:!ring-0 print:break-before-page"
        style={{ minHeight: "1123px", overflow: "hidden" }}>
        <CoralRibbon />

        {/* skills — each with its own plain meaning */}
        {skillsBuilt.length > 0 && (
          <section className="px-10 pt-6">
            <h2 className="text-[22px] font-extrabold text-ink"><span className="mr-1.5" aria-hidden>{SECTION_ICON.skills}</span>what the children got better at</h2>
            <Squiggle color={accent} />
            <div className="mt-3 space-y-2">
              {skillsBuilt.map(({ skill }) => {
                const copy = parentSkillCopy(skill.id, category);
                return (
                  <div key={skill.id} className="rounded-card px-3.5 py-2.5" style={{ background: `${accent}14` }}>
                    <p className="text-[13.5px] font-extrabold text-ink">
                      <span className="mr-1.5" aria-hidden>{copy.icon}</span>{copy.label}
                    </p>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-ink-muted">{copy.body}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* engineering foundation — one line */}
        {engineering && (
          <section className="mx-10 mt-6 rounded-card p-4" style={{ background: `${accent}12` }}>
            <p className="text-[11px] font-extrabold tracking-normal" style={{ color: "#F25E35" }}>{engineering.headline}</p>
            <p className="mt-1 text-[14px] font-extrabold leading-snug text-ink">
              {isRobotics
                ? "mechanics — levers, pulleys, gears, wheels — are the simple machines every bigger machine is built from. this is where engineering begins."
                : engineering.body.split(". ")[0] + "."}
            </p>
          </section>
        )}

        {/* coming up — grouped by type (models / experiments / games / artworks) */}
        {nextItems.length > 0 && (
          <section className="mt-6 px-10">
            <h3 className="font-hand text-[24px] leading-none text-ink">coming up next ✎</h3>
            <div className="mt-3 space-y-3">
              {groupByCategory(nextItems).map(({ category, label, items }) => (
                <div key={category}>
                  <p className="text-[11px] font-extrabold tracking-normal" style={{ color: "#F25E35" }}>
                    {label}
                  </p>
                  <ul className="mt-1 space-y-1">
                    {items.map((i) => (
                      <li key={i.id} className="flex items-start gap-2 text-[13px] text-ink">
                        <ArrowRight className="mt-1 h-3 w-3 shrink-0" style={{ color: accent }} />
                        <span className="font-semibold">{i.parentLabel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* experience book — coming soon, neutral graphic (no faces) */}
        <section className="mt-6 px-10">
          <div className="flex items-center gap-4 overflow-hidden rounded-card p-4 ring-1 ring-ink/10" style={{ background: `${accent}12` }}>
            <div className="flex h-24 w-[68px] shrink-0 items-center justify-center" aria-hidden>
              <BookGraphic accent={accent} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-extrabold tracking-normal" style={{ color: "#F25E35" }}>coming soon</p>
                <span className="rounded-chip bg-brand-orange/15 px-2 py-0.5 text-[9px] font-extrabold text-brand-orange">the experience book</span>
              </div>
              <p className="mt-1 font-hand text-[24px] leading-none text-ink">a book of their own — on its way!</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink">
                a book that travels home and back, holding everything the children draw, build, and discover.
              </p>
            </div>
          </div>
        </section>

        {/* sign-off — from openhouse, no name */}
        <section className="mt-8 px-10">
          <p className="text-[13px] leading-relaxed text-ink-muted">
            ask the children to show you one thing they built or figured out this month — in their own words. that&apos;s the best review of all.
          </p>
          <p className="mt-4 font-hand text-[26px] leading-none text-ink">with love,</p>
          <p className="mt-1 font-hand text-[26px] leading-none" style={{ color: "#F25E35" }}>the openhouse team</p>
        </section>

        <PageFooter building={building} pageIndex={2} />
      </article>

      <style jsx>{`
        .page { position: relative; }
        @media print {
          .parent-doc { gap: 0 !important; }
          .page { page-break-after: always; box-shadow: none !important; }
          .page:last-child { page-break-after: auto; }
        }
      `}</style>
    </div>
  );
}

/* ─── helpers ──────────────────────────────────────────────── */

function joinNice(labels: string[]): string {
  const c = labels.map((l) => l.trim()).filter(Boolean);
  if (c.length === 0) return "";
  if (c.length === 1) return c[0];
  if (c.length === 2) return `${c[0]} and ${c[1]}`;
  return `${c.slice(0, -1).join(", ")}, and ${c[c.length - 1]}`;
}

function groupByMechanism(items: NewsletterItem[]) {
  const g = new Map<Mechanism, { builds: NewsletterItem[]; experiments: NewsletterItem[] }>();
  for (const item of items) {
    if (item.category === "models") {
      for (const m of BUILD_MECHANISM[item.id] ?? []) {
        if (!g.has(m)) g.set(m, { builds: [], experiments: [] });
        g.get(m)!.builds.push(item);
      }
    } else if (item.category === "experiments") {
      const m = experimentMechanism(item.id);
      if (!m) continue;
      if (!g.has(m)) g.set(m, { builds: [], experiments: [] });
      g.get(m)!.experiments.push(item);
    }
  }
  return MECHANISM_ORDER.filter((m) => g.has(m)).map((m) => ({ mechanism: m, ...g.get(m)! }));
}

const NEXT_GROUP_LABEL: Record<ItemCategory, string> = {
  models: "🛠 models to build",
  experiments: "🧪 experiments to run",
  artworks: "🎨 artworks to make",
  games: "🎲 games to play",
};
const NEXT_GROUP_ORDER: ItemCategory[] = ["models", "experiments", "artworks", "games"];

function groupByCategory(items: NewsletterItem[]) {
  const g = new Map<ItemCategory, NewsletterItem[]>();
  for (const item of items) {
    if (!g.has(item.category)) g.set(item.category, []);
    g.get(item.category)!.push(item);
  }
  return NEXT_GROUP_ORDER.filter((c) => g.has(c)).map((c) => ({
    category: c,
    label: NEXT_GROUP_LABEL[c],
    items: g.get(c)!,
  }));
}

function groupBySegment(items: NewsletterItem[]) {
  const order = ["roll-call", "art-gym", "playground", "art-games", "showtime", "sign-off"];
  const g = new Map<string, { segmentName: string; items: NewsletterItem[] }>();
  for (const item of items) {
    if (item.category !== "games") continue;
    if (!g.has(item.segment)) g.set(item.segment, { segmentName: item.segmentName, items: [] });
    g.get(item.segment)!.items.push(item);
  }
  return order.filter((s) => g.has(s)).map((s) => ({ segment: s, ...g.get(s)! }));
}

function CoralRibbon() {
  return (
    <>
      <header className="flex items-center justify-between px-10 py-3" style={{ background: "#F25E35" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/newsletter/logo-white.png" alt="openhouse" className="h-[22px] w-auto object-contain" />
        <p className="text-[12.5px] font-semibold italic text-white">raising curious humans, together.</p>
      </header>
      <svg viewBox="0 0 800 24" preserveAspectRatio="none" className="block w-full" style={{ height: 18, marginTop: -1 }} aria-hidden>
        <path d="M0,10 C120,24 260,0 400,10 C540,20 660,0 800,10 L800,24 L0,24 Z" fill="#F9F2E8" />
      </svg>
    </>
  );
}

/** A simple closed-book graphic (no faces) for the coming-soon block. */
function BookGraphic({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 56 72" className="h-[92%] w-auto" aria-hidden>
      <rect x="6" y="4" width="44" height="64" rx="4" fill="#fff" stroke="#2C2B28" strokeWidth="2.5" />
      <rect x="6" y="4" width="12" height="64" rx="4" fill={accent} stroke="#2C2B28" strokeWidth="2.5" />
      <line x1="26" y1="18" x2="44" y2="18" stroke="#2C2B28" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="28" x2="44" y2="28" stroke="#2C2B28" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="38" x2="38" y2="38" stroke="#2C2B28" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 4 v16 l4 -4 l4 4 V4 Z" fill="#F25E35" stroke="#2C2B28" strokeWidth="1.5" />
    </svg>
  );
}
function Squiggle({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 220 10" preserveAspectRatio="none" className="mt-1" style={{ height: 8, width: 220 }} aria-hidden>
      <path d="M2,6 Q30,-2 60,6 T120,6 T180,6 T216,6" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function PageFooter({ building, pageIndex }: { building: string; pageIndex: number }) {
  return (
    <footer className="mt-10 flex items-end justify-between px-10 pb-5 pt-6 text-[10.5px] text-ink-subtle">
      <span className="font-extrabold" style={{ color: "#F25E35" }}>openhouse · at-apartment</span>
      <span>{building} · page {pageIndex} of 2</span>
    </footer>
  );
}
