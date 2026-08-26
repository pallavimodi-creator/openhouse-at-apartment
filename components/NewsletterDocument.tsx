"use client";

/**
 * NewsletterDocument — the parent-facing newsletter (2 A4 pages).
 *
 * Pure render from primitives, so both the teacher's live preview and
 * the admin's download page render the identical document.
 *
 * Design language (openhouse): lowercase throughout, coral + cream, the
 * category accent used sparingly (thin rules, soft icon chips — never big
 * colour fills), one consistent line-icon system, and the handwritten
 * Caveat reserved for the two personal moments — the greeting and the
 * sign-off. Everything else earns hierarchy through type + whitespace.
 *
 * Content rules baked in (per operator):
 *  - addressed to the BUILDING ("dear parents at raheja")
 *  - concept-grouped for robotics; segment-grouped for public speaking;
 *    image-first artworks grid for art
 *  - selections are named explicitly and simply — what was ticked shows
 *  - signed "the openhouse team" — no educator name
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
import {
  ArrowUpRight, Camera, Compass, Palette, Drama, Sprout, Wrench,
  FlaskConical, Dices, Mic, Sun, Waves, PenTool, Scale, ArrowUpDown,
  Cog, Disc3, Sparkles, type LucideIcon,
} from "lucide-react";

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
  /** optional free-text note (added by an admin) shown near the top */
  note?: string;
}

const CORAL = "#F25E35";
const INK = "#2C2B28";
const HAIRLINE = "rgba(44,43,40,0.10)";
const CREAM = "#FBF6EE";

/** one artwork tile in the "what we made" grid — image optional. */
type ArtworkTile = { label: string; image?: string };

/** category → mascot image (the operator-supplied openhouse mascots). */
const MASCOT: Record<string, string> = {
  stem: "/newsletter/mascot-robotics.png",
  art: "/newsletter/mascot-art.png",
  language: "/newsletter/mascot-ps.png",
};

/**
 * Which programmes have a ready experience book. When true, the block
 * flips from "coming soon" to "now ready" and shows a standard,
 * category-colour-coded cover (rendered inline — no external image that
 * could be wrong or fail to load). robotics + art are ready; public
 * speaking has no book yet → coming soon.
 */
function hasExperienceBook(slug: string): boolean {
  return slug.startsWith("robotics") || slug.startsWith("art-design");
}

/** category → what a good photo shows (empty-slot hints, never faces). */
const PHOTO_HINTS: Record<string, string[]> = {
  stem: ["a model", "a build", "a project"],
  art: ["an artwork", "a creation", "the making"],
  language: ["on stage", "a prop", "the setup"],
};

/* one consistent line-icon system ------------------------------------ */
const MECHANISM_ICON: Record<Mechanism, LucideIcon> = {
  lever: Scale, pulley: ArrowUpDown, gear: Cog, "wheel-axle": Disc3,
};
const SEGMENT_ICON: Record<string, LucideIcon> = {
  "roll-call": Sun, playground: Dices, showtime: Mic, "sign-off": Waves,
  "art-gym": PenTool, "art-games": Dices,
};
const TYPE_ICON: Record<ItemCategory, LucideIcon> = {
  models: Wrench, experiments: FlaskConical, artworks: Palette, games: Dices,
};

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
  const bookReady = hasExperienceBook(programme.slug);
  const photoHints = PHOTO_HINTS[category] ?? PHOTO_HINTS.stem;

  const conceptGroups = isRobotics ? groupByMechanism(pickedItems) : null;
  const segmentGroups = isPublicSpeaking || isArt ? groupBySegment(pickedItems) : null;
  // Artworks carry their reference image (the artiverse unit) where we have
  // one; educator-typed custom artworks are label-only.
  const listedArtworks: ArtworkTile[] = isArt
    ? pickedItems
        .filter((i) => i.category === "artworks")
        .map((i) => ({ label: i.parentLabel, image: i.heroImageUrl ?? getActivityImage(i.id) }))
    : [];
  const customArtworks: ArtworkTile[] = (props.customArtworks ?? [])
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .map((label) => ({ label }));
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
      <article className="page flex flex-col bg-brand-white text-ink shadow-card ring-1 ring-ink/5 print:!shadow-none print:!ring-0"
        style={{ overflow: "hidden" }}>
        <Masthead accent={accent} />

        {/* greeting */}
        <div className="flex items-start justify-between gap-4 px-11 pt-7">
          <div className="min-w-0 flex-1">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-ink-subtle">
              newsletter · {programme.title} · {programme.ageLabel}
            </p>
            <h1 className="mt-2.5 font-hand text-[36px] font-bold leading-[1.04] text-ink">
              dear parents at {building},
            </h1>
            <div className="mt-2.5 h-[3px] w-10 rounded-full" style={{ background: accent }} />
            <p className="mt-3 max-w-[46ch] text-[12.5px] leading-relaxed text-ink-muted">
              {rangeLabel ? `${rangeLabel} — ` : ""}here&apos;s a look at what the children explored this month, and what&apos;s coming next.
            </p>
          </div>
          {mascot && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={mascot} alt="" className="h-[88px] w-[88px] shrink-0 object-contain"
              style={{ filter: "drop-shadow(0 6px 10px rgba(44,43,40,.10))" }} />
          )}
        </div>

        {/* optional free-text note from the team (added by an admin) */}
        {props.note && props.note.trim() && (
          <section className="mt-5 px-11">
            <div className="rounded-xl px-4 py-3.5" style={{ background: CREAM, borderLeft: `3px solid ${accent}` }}>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: CORAL }}>a note from us</p>
              <p className="mt-1.5 whitespace-pre-line text-[12.5px] leading-relaxed text-ink">{props.note.trim()}</p>
            </div>
          </section>
        )}

        {/* photo feature — models / projects only, adapts to how many there are */}
        <PhotoFeature images={heroImages} hints={photoHints} />

        {/* ROBOTICS — concept groups, with the actual experiments named simply */}
        {conceptGroups && conceptGroups.length > 0 && (
          <section className="mt-7 px-11">
            <SectionHead icon={Compass} eyebrow="hands-on" title="what we explored" accent={accent} />
            <div className="space-y-2.5">
              {conceptGroups.map(({ mechanism, builds, experiments }) => {
                const s = MECHANISM_STORY[mechanism];
                return (
                  <div key={mechanism} className="rounded-xl bg-white p-4 ring-1 ring-ink/[0.09]"
                    style={{ boxShadow: "0 1px 2px rgba(44,43,40,0.04)" }}>
                    <div className="flex items-center gap-2.5">
                      <IconChip icon={MECHANISM_ICON[mechanism] ?? Cog} accent={accent} size={32} />
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink-subtle">the concept</p>
                        <p className="text-[16px] font-extrabold leading-none text-ink">{s.label}</p>
                      </div>
                    </div>
                    <p className="mt-2.5 text-[12px] leading-relaxed text-ink-muted">{s.what}</p>
                    {builds.length > 0 && (
                      <p className="mt-3 flex items-start gap-2 text-[12px] leading-snug text-ink">
                        <Wrench className="mt-[3px] h-3.5 w-3.5 shrink-0 text-ink-muted" strokeWidth={2.2} />
                        <span><span className="font-bold">models we built</span> — {joinNice(builds.map((b) => b.parentLabel))}.</span>
                      </p>
                    )}
                    {experiments.length > 0 && (
                      <div className="mt-2 flex items-start gap-2">
                        <FlaskConical className="mt-[3px] h-3.5 w-3.5 shrink-0 text-ink-muted" strokeWidth={2.2} />
                        <div className="min-w-0">
                          <p className="text-[12px] font-bold text-ink">experiments we ran</p>
                          <ul className="mt-1 space-y-1">
                            {experiments.map((e) => (
                              <li key={e.id} className="flex items-start gap-2 text-[11.5px] leading-snug text-ink-muted">
                                <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />
                                <span>{e.parentLabel}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
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
          <section className="mt-7 px-11">
            <SectionHead icon={Palette} eyebrow="the studio" title="what we made" accent={accent} />
            <div className="grid grid-cols-3 gap-2.5">
              {pickedArtworks.slice(0, 9).map((art, i) => (
                <div key={`${art.label}-${i}`} className="overflow-hidden rounded-xl bg-white ring-1 ring-ink/[0.09]">
                  <div className="flex aspect-square items-center justify-center overflow-hidden" style={{ background: `${accent}22` }}>
                    {art.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={art.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <Palette className="h-6 w-6" strokeWidth={1.7} style={{ color: INK, opacity: 0.65 }} />
                    )}
                  </div>
                  <p className="px-2 py-1.5 text-center text-[10.5px] font-bold leading-tight text-ink">{art.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GAMES BY SEGMENT — public speaking + art games */}
        {segmentGroups && segmentGroups.length > 0 && (
          <section className="mt-7 px-11">
            <SectionHead icon={Drama} eyebrow="in the room" title="what we did in class" accent={accent} />
            <div className="space-y-2.5">
              {segmentGroups.map(({ segment, segmentName, items }) => {
                const phrasing = SEGMENT_PHRASING[segment] ?? { icon: "", lead: "we did" };
                return (
                  <div key={segment} className="flex items-start gap-3 rounded-xl bg-white p-3.5 ring-1 ring-ink/[0.09]">
                    <IconChip icon={SEGMENT_ICON[segment] ?? Sparkles} accent={accent} size={30} />
                    <div className="min-w-0">
                      <p className="text-[14px] font-extrabold leading-none text-ink">{segmentName.toLowerCase()}</p>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted">
                        {phrasing.lead} <span className="font-semibold text-ink">{joinNice(items.map((i) => i.parentLabel))}</span>.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {!hasContent && (
          <p className="mx-11 mt-7 rounded-xl bg-ink/[0.03] p-6 text-center text-[13px] italic text-ink-muted ring-1 ring-ink/[0.06]">
            tick what the children did — it appears here.
          </p>
        )}

        <PageFooter building={building} pageIndex={1} />
      </article>

      {/* ─── PAGE 2 ─── */}
      <article className="page flex flex-col bg-brand-white text-ink shadow-card ring-1 ring-ink/5 print:!shadow-none print:!ring-0 print:break-before-page"
        style={{ overflow: "hidden" }}>
        <Masthead accent={accent} />

        {/* skills — numbered, each with its own plain meaning */}
        {skillsBuilt.length > 0 && (
          <section className="px-11 pt-7">
            <SectionHead icon={Sprout} eyebrow="growth" title="what the children got better at" accent={accent} />
            <div className="divide-y divide-ink/[0.08]">
              {skillsBuilt.map(({ skill }, idx) => {
                const copy = parentSkillCopy(skill.id, category);
                return (
                  <div key={skill.id} className="flex items-start gap-3 py-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold"
                      style={{ background: `${accent}2e`, color: INK }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-extrabold leading-tight text-ink">{copy.label}</p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">{copy.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* engineering / craft foundation — one line, quiet accent rule */}
        {engineering && (
          <section className="mx-11 mt-7">
            <div className="rounded-xl px-4 py-3.5" style={{ background: CREAM, borderLeft: `3px solid ${accent}` }}>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: CORAL }}>{engineering.headline}</p>
              <p className="mt-1.5 text-[13px] font-bold leading-snug text-ink">
                {isRobotics
                  ? "mechanics — levers, pulleys, gears, wheels — are the simple machines every bigger machine is built from. this is where engineering begins."
                  : engineering.body.split(". ")[0] + "."}
              </p>
            </div>
          </section>
        )}

        {/* coming up — grouped by type (models / experiments / games / artworks) */}
        {nextItems.length > 0 && (
          <section className="mt-7 px-11">
            <SectionHead icon={ArrowUpRight} eyebrow="next classes" title="coming up next" accent={accent} />
            <div className="space-y-3.5">
              {groupByCategory(nextItems).map(({ category: cat, label, items }) => {
                const Icon = TYPE_ICON[cat] ?? ArrowUpRight;
                return (
                  <div key={cat}>
                    <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink">
                      <Icon className="h-3.5 w-3.5 text-ink-muted" strokeWidth={2.2} /> {label}
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {items.map((i) => (
                        <li key={i.id} className="flex items-start gap-2 text-[12.5px] text-ink-muted">
                          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />
                          <span className="font-semibold text-ink">{i.parentLabel}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* experience book — a standard, category-colour-coded cover when
            the book is ready (robotics + art); "coming soon" outline graphic
            otherwise. No external cover image (avoids wrong/broken photos). */}
        <section className="mt-7 px-11">
          <div className="flex items-center gap-4 rounded-xl p-4 ring-1 ring-ink/[0.09]" style={{ background: CREAM }}>
            <div className="flex h-24 w-[68px] shrink-0 items-center justify-center" aria-hidden>
              {bookReady ? (
                <BookCover accent={accent} />
              ) : (
                <BookGraphic accent={accent} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: CORAL }}>{bookReady ? "now ready" : "coming soon"}</p>
                <span className="rounded-chip bg-brand-orange/12 px-2 py-0.5 text-[9px] font-extrabold text-brand-orange">the experience book</span>
              </div>
              <p className="mt-1.5 text-[16px] font-extrabold leading-tight text-ink">{bookReady ? "a book of their own — now in their hands." : "a book of their own — on its way."}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
                a book that travels home and back, holding everything the children draw, build, and discover.
              </p>
            </div>
          </div>
        </section>

        {/* sign-off — the openhouse team, no name */}
        <section className="mt-8 px-11">
          <div className="h-px w-full" style={{ background: HAIRLINE }} />
          <p className="mt-5 max-w-[52ch] text-[12.5px] leading-relaxed text-ink-muted">
            ask the children to show you one thing they built or figured out this month — in their own words. that&apos;s the best review of all.
          </p>
          <p className="mt-4 font-hand text-[26px] leading-none text-ink">with love,</p>
          <p className="mt-1 font-hand text-[26px] leading-none" style={{ color: CORAL }}>the openhouse team</p>
        </section>

        <PageFooter building={building} pageIndex={2} />
      </article>

      <style jsx>{`
        .page { position: relative; }
        @media print {
          /* Force A4 so the 297mm pages map exactly to the sheet. Without
             this, a Letter-default printer spills each A4 page onto a second
             sheet (the 2->4 blank-pages bug). Belt-and-braces with the
             per-page @page rule the download views also set. */
          @page { size: A4 portrait; margin: 0; }
          .parent-doc { gap: 0 !important; margin: 0 !important; }
          /* Exactly ONE A4 sheet per page. Must be 297mm — NOT 1123px, which
             is 297.13mm and spills a ~0.5px sliver onto a blank extra sheet
             (that was the "4 pages / blank pages" bug). overflow:hidden caps
             each page to its sheet. The single page break lives only on
             page 2 (print:break-before-page); there is no page-break-after,
             so pages never double-break or leave a trailing blank sheet. */
          .page {
            height: 297mm;
            box-sizing: border-box;
            overflow: hidden;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ─── building blocks ──────────────────────────────────────── */

/** A soft accent circle holding one line icon — the whole doc's icon language. */
function IconChip({ icon: Icon, accent, size = 30 }: { icon: LucideIcon; accent: string; size?: number }) {
  const inner = Math.round(size * 0.48);
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: `${accent}2e` }}>
      <Icon style={{ width: inner, height: inner, color: INK }} strokeWidth={2.1} />
    </span>
  );
}

/** Section header: icon chip + eyebrow + title, closed by a hairline rule. */
function SectionHead({ icon, eyebrow, title, accent }: { icon: LucideIcon; eyebrow?: string; title: string; accent: string }) {
  return (
    <div className="mb-3.5">
      <div className="flex items-center gap-2.5">
        <IconChip icon={icon} accent={accent} size={30} />
        <div className="min-w-0">
          {eyebrow && <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-subtle">{eyebrow}</p>}
          <h2 className="text-[18px] font-extrabold leading-tight text-ink">{title}</h2>
        </div>
      </div>
      <div className="mt-2.5 h-px w-full" style={{ background: HAIRLINE }} />
    </div>
  );
}

/** Photo feature that adapts to 0/1/2/3+ images — no lone lopsided tile. */
function PhotoFeature({ images, hints }: { images: string[]; hints: string[] }) {
  const cells: (string | null)[] = images.length > 0 ? images : [null, null, null];
  const n = cells.length;
  const cols = n <= 1 ? "grid-cols-1" : n === 2 ? "grid-cols-2" : "grid-cols-3";
  const aspect = images.length === 1 ? "16 / 9" : "4 / 3";
  return (
    <figure className="mt-6 px-11">
      <div className={`grid ${cols} gap-2.5`}>
        {cells.map((src, i) => (
          <div key={i} className="flex items-center justify-center overflow-hidden rounded-xl ring-1 ring-ink/[0.10]"
            style={{ aspectRatio: aspect, background: "#F7F0E4" }}>
            {src ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={src} alt="" className="h-full w-full object-contain" />
            ) : (
              <span className="flex flex-col items-center gap-1.5 px-2 text-[10.5px] font-semibold leading-tight" style={{ color: "#8a8177" }}>
                <Camera className="h-4 w-4" strokeWidth={2} style={{ opacity: 0.5 }} />
                {hints[i] ?? "a photo"}
              </span>
            )}
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-[11px] italic text-ink-subtle">a peek at what the children made this month.</figcaption>
    </figure>
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
  models: "models to build",
  experiments: "experiments to run",
  artworks: "artworks to make",
  games: "games to play",
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

/** Refined masthead — coral nameplate closed by a thin category-accent rule. */
function Masthead({ accent }: { accent: string }) {
  return (
    <header>
      <div className="flex items-center justify-between px-11" style={{ background: CORAL, height: 50 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/newsletter/logo-white.png" alt="openhouse" className="h-[19px] w-auto object-contain" />
        <p className="text-[11px] font-semibold tracking-wide text-white/95">raising curious humans, together.</p>
      </div>
      <div style={{ height: 3, background: accent }} />
    </header>
  );
}

/** A simple closed-book graphic (no faces) for the coming-soon block. */
function BookGraphic({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 56 72" className="h-[92%] w-auto" aria-hidden>
      <rect x="6" y="4" width="44" height="64" rx="4" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x="6" y="4" width="12" height="64" rx="4" fill={accent} stroke={INK} strokeWidth="2.5" />
      <line x1="26" y1="18" x2="44" y2="18" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="28" x2="44" y2="28" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="38" x2="38" y2="38" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <path d="M34 4 v16 l4 -4 l4 4 V4 Z" fill={CORAL} stroke={INK} strokeWidth="1.5" />
    </svg>
  );
}

/**
 * The standard "ready" cover — a solid, category-colour-coded book with a
 * cream title band. Rendered inline (no photo), so it is always correct and
 * never fails to load. The colour alone tells the parent which programme it is.
 */
function BookCover({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 56 72" className="h-[96%] w-auto drop-shadow-[0_3px_5px_rgba(44,43,40,0.18)]" aria-hidden>
      {/* cover */}
      <rect x="7" y="3" width="45" height="66" rx="4.5" fill={accent} stroke={INK} strokeWidth="2.5" />
      {/* spine */}
      <rect x="7" y="3" width="8" height="66" rx="4.5" fill="rgba(44,43,40,0.16)" stroke={INK} strokeWidth="2.5" />
      {/* openhouse mark */}
      <circle cx="34" cy="15" r="3.4" fill={CREAM} stroke={INK} strokeWidth="1.2" />
      {/* title band */}
      <rect x="20" y="30" width="27" height="17" rx="2.5" fill={CREAM} stroke={INK} strokeWidth="1.2" />
      <line x1="24" y1="36" x2="43" y2="36" stroke={INK} strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
      <line x1="24" y1="41" x2="37" y2="41" stroke={INK} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      {/* bookmark ribbon */}
      <path d="M40 3 v15 l3 -3 l3 3 V3 Z" fill={CORAL} stroke={INK} strokeWidth="1.3" />
    </svg>
  );
}

function PageFooter({ building, pageIndex }: { building: string; pageIndex: number }) {
  return (
    <footer className="mt-auto px-11 pb-5 pt-8">
      <div className="h-px w-full" style={{ background: HAIRLINE }} />
      <div className="mt-3 flex items-end justify-between text-[10px] tracking-wide text-ink-subtle">
        <span className="font-extrabold" style={{ color: CORAL }}>openhouse · at-apartment</span>
        <span>{building} · page {pageIndex} of 2</span>
      </div>
    </footer>
  );
}
