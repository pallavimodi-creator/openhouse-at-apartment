"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Zap,
  Gamepad2,
  Star,
  Notebook,
  Dumbbell,
  Palette,
  Shapes,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Brain,
  Mic,
  Eye,
  Ear,
  Shuffle,
  Stethoscope,
  FlaskConical,
  Wrench,
  RotateCcw,
  Newspaper,
  Megaphone,
  Users,
  Box,
  BookOpen,
  Sparkles,
  BookText,
  Footprints,
  Hand,
  HelpCircle,
  Target,
  Timer,
  Scale,
  Radio,
  Clock,
  Shield,
  Lightbulb,
  Flame,
  type LucideIcon,
} from "lucide-react";
import {
  getCurriculumProgramme,
  listCurriculumProgrammes,
  SEGMENT_COLORS,
  getActivityImage,
  GYM_BOOK_IMAGES,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import type {
  CurriculumActivity,
  ArtiverseUnit,
  CurriculumProgramme,
} from "@/content/types";
import { Modal } from "@/components/Modal";
import { ActivityPopup } from "@/components/ActivityPopup";
import { SegmentInfoPopup, type SegmentInfo } from "@/components/SegmentInfoPopup";
import { getTeacher } from "@/lib/teacher-state";
import { segmentPalette } from "@/components/segmentPalette";

// Unique per-activity icons for digital-only games (no physical material).
const DIGITAL_ONLY_ICONS: Record<string, LucideIcon> = {
  brain: Brain,
  voice: Mic,
  eyes: Eye,
  ears: Ear,
  shuffle: Shuffle,
  psychiatrist: Stethoscope,
  "reverse-gear": RotateCcw,
  "whacky-news": Newspaper,
  "mad-ad": Megaphone,
  "experience-share": Users,
  "story-spine": BookOpen,
  "superhero-sales": Sparkles,
  "tell-the-story": BookText,
  "step-inside": Footprints,
  "show-and-tell": Hand,
  "ask-me": HelpCircle,
  "pitch-perfect": Target,
  extempore: Timer,
  "point-of-view": Scale,
  "news-report": Radio,
  "story-in-a-minute": Clock,
  defence: Shield,
  "what-if": Lightbulb,
  "rapid-fire": Flame,
};

const SEGMENT_THUMB_BG: Record<string, string> = {
  "roll-call": "linear-gradient(135deg, #F8B074 0%, #F25E35 100%)",
  playground: "linear-gradient(135deg, #A3C996 0%, #6DA35A 100%)",
  showtime: "linear-gradient(135deg, #F3C520 0%, #E89A4E 100%)",
  "log-book": "linear-gradient(135deg, #FFE1B8 0%, #F8B074 100%)",
  "art-gym": "linear-gradient(135deg, #FFD69A 0%, #E89A4E 100%)",
  "art-games": "linear-gradient(135deg, #F3C520 0%, #F25E35 100%)",
  artiverse: "linear-gradient(135deg, #F8B074 0%, #C44017 100%)",
  experiment: "linear-gradient(135deg, #FFD69A 0%, #E89A4E 100%)",
  build: "linear-gradient(135deg, #A3C996 0%, #6DA35A 100%)",
  "experience-book": "linear-gradient(135deg, #FFE1B8 0%, #F8B074 100%)",
};

function SegmentThumbIcon({ segment }: { segment: string }) {
  const common = "h-7 w-7 text-white";
  switch (segment) {
    case "roll-call":
      return <Zap className={common} strokeWidth={1.8} />;
    case "playground":
      return <Gamepad2 className={common} strokeWidth={1.8} />;
    case "showtime":
      return <Star className={common} strokeWidth={1.8} />;
    case "log-book":
      return <Notebook className={common} strokeWidth={1.8} />;
    case "art-gym":
      return <Dumbbell className={common} strokeWidth={1.8} />;
    case "art-games":
      return <Shapes className={common} strokeWidth={1.8} />;
    case "artiverse":
      return <Palette className={common} strokeWidth={1.8} />;
    case "experiment":
      return <FlaskConical className={common} strokeWidth={1.8} />;
    case "build":
      return <Wrench className={common} strokeWidth={1.8} />;
    case "experience-book":
      return <Notebook className={common} strokeWidth={1.8} />;
    default:
      return <Star className={common} strokeWidth={1.8} />;
  }
}

const ALL_FILTERS: { id: string; label: string }[] = [
  { id: "all", label: "all" },
  { id: "roll-call", label: "roll call" },
  { id: "playground", label: "playground" },
  { id: "showtime", label: "showtime" },
  { id: "art-gym", label: "art gym" },
  { id: "art-games", label: "art games" },
  { id: "artiverse", label: "artiverse" },
  { id: "experiment", label: "experiment" },
  { id: "build", label: "build" },
  { id: "experience-book", label: "experience book" },
  { id: "log-book", label: "experience book" },
];

type LibraryItem = (
  | { kind: "activity"; item: CurriculumActivity }
  | { kind: "artiverse"; item: ArtiverseUnit }
  | {
      kind: "primer";
      title: string;
      description: string;
      info: SegmentInfo;
      thumbImageUrl?: string;
    }
) & {
  id: string;
  segment: string;
  programmeSlug: string;
  programmeLabel: string; // e.g. "art & design · 5–8"
};

// Book covers per programme slug — used as the primer thumbnail for the
// "experience book" entry in the library.
const BOOK_COVER_BY_PROGRAMME: Record<string, string> = {
  "art-design-5-8": "/book-covers/art-5-8.png",
  "art-design-8-12": "/book-covers/art-8-12.png",
  "public-speaking-5-8": "/book-covers/speaking-5-8.png",
  "public-speaking-8-12": "/book-covers/speaking-8-12.png",
};

function programmeShortLabel(p: CurriculumProgramme): string {
  return `${p.title} · ${p.ageLabel}`;
}

function buildItemsFor(prog: CurriculumProgramme): LibraryItem[] {
  const bookMap: Record<string, string> = {
    "public-speaking-5-8": "speaking-5-8",
    "public-speaking-8-12": "speaking-8-12",
    "art-design-5-8": "art-5-8",
    "art-design-8-12": "art-8-12",
  };
  const programmeLabel = programmeShortLabel(prog);
  const programmeSlug = prog.slug;
  const items: LibraryItem[] = [];

  Object.values(prog.activities).forEach((a) => {
    items.push({
      kind: "activity",
      id: `${programmeSlug}/${a.id}`,
      segment: a.segment,
      item: a,
      programmeSlug,
      programmeLabel,
    });
  });

  prog.artiverseUnits?.forEach((u) => {
    items.push({
      kind: "artiverse",
      id: `${programmeSlug}/${u.id}`,
      segment: "artiverse",
      item: u,
      programmeSlug,
      programmeLabel,
    });
  });

  if (prog.segmentDefinitions.some((s) => s.id === "art-gym")) {
    const is35 = prog.ageGroup === "3-5";
    const gymThumb =
      prog.ageGroup === "8-12"
        ? GYM_BOOK_IMAGES[5]
        : prog.ageGroup === "3-5"
          ? GYM_BOOK_IMAGES[3] // reusing book 3 thumbnail until 3-5 cover ships
          : GYM_BOOK_IMAGES[3];
    items.push({
      kind: "primer",
      id: `${programmeSlug}/art-gym-overview`,
      segment: "art-gym",
      title: is35 ? "art gym — daily warm-up" : "art gym — 4-session cycle",
      description: is35
        ? "a daily 15-minute warm-up that rotates between two resources on alternate days — the laminated art gym book and the scribble book. children do 1–2 pages each session. art gym book 1 runs for the first ~30 sessions; once finished, the class moves to book 2. no cue cards, no extensions at this age."
        : "a structured opening segment using books, cue cards, and their extensions. each session builds directly on the previous one. books are laminated — children mark them with resources of choice (thread, clay, sequins, erasable markers). every book day children do 1–3 pages, then replicate what they drew in their sketchbook freely with materials of choice.",
      info: {
        segmentId: "art-gym",
        segmentName: "Art Gym",
        title: is35 ? "art gym — daily warm-up" : "art gym — 4-session cycle",
        description: is35
          ? "art gym is a daily 15-minute warm-up that builds fine motor control and creative expression through short, focused mark-making. art gym book and scribble book rotate on alternate days. children do 1–2 pages each session. art gym book 1 runs for the first ~30 sessions — once it is finished, the class moves to book 2. the scribble book is an a4 spiral-bound book with illustrated pages and one prompt per page. children choose their material from the table before starting — erasable markers, play-doh, thread, or sequins. no cue cards or extensions at this age. the teacher does not teach or correct during art gym — they circulate and name what they see."
          : "a self-paced warm-up. the cycle runs: book → extension (book) → cue card → extension (cue card). each extension day belongs to the day before it — the book session and its extension are one unit, and the cue card session and its extension are one unit. an extension day is never independent. art gym books are laminated — children mark them with resources of choice: thread, clay, sequins, or erasable markers. every book day children do 1–3 pages and then replicate what they drew in their sketchbook freely with materials of choice (crayons, colour pencils, brush pens, yarn + glue, etc.). on extension days children apply the same lines onto simple daily objects or shapes — progression goes shape → simple object → imaginary object → scene.",
        heroImageUrl: gymThumb,
      },
      thumbImageUrl: gymThumb,
      programmeSlug,
      programmeLabel,
    });
  }

  // Artiverse + Artistotle books — only for the 3-5 art programme.
  if (prog.slug === "art-design-3-5") {
    const artistotleCover = "/artistotle-book/01-cover.png";
    const artiverseCover = "/artiverse-book/01-accordion.png";
    items.push({
      kind: "primer",
      id: `${programmeSlug}/artiverse-book`,
      segment: "artiverse",
      title: "the artiverse book",
      description:
        "a structured making programme across three material families: colourful papers, crayons, and watercolour. each project runs over two sessions; children choose what to make and take their work home.",
      info: {
        segmentId: "artiverse",
        segmentName: "Artiverse Book",
        title: "the artiverse book",
        description:
          "a structured making programme across three material families: colourful papers, crayons, and watercolour. each project runs over two sessions, with children choosing what to make and taking their work home. the focus is on exploring materials deeply while building control, colour understanding, and creative expression.",
        heroImageUrl: artiverseCover,
        externalLink: { href: "/artiverse-book", label: "open the artiverse book" },
      },
      thumbImageUrl: artiverseCover,
      programmeSlug,
      programmeLabel,
    });
    items.push({
      kind: "primer",
      id: `${programmeSlug}/artistotle-book`,
      segment: "artiverse",
      title: "the artistotle book",
      description:
        "a digital flipbook of the printed artistotle book — eric carle, lois ehlert, taro gomi. used across the 18 artistotle sessions in the 3–5 programme.",
      info: {
        segmentId: "artiverse",
        segmentName: "Artistotle Book",
        title: "the artistotle book",
        description:
          "meet the illustrators, then make in their spirit. each illustrator gets an opening page, a technique spotlight where relevant, and 2 projects. the book runs across artistotle days; flip through to plan or to read with the children.",
        heroImageUrl: artistotleCover,
        externalLink: { href: "/artistotle-book", label: "open the artistotle book" },
      },
      thumbImageUrl: artistotleCover,
      programmeSlug,
      programmeLabel,
    });
  }

  if (prog.segmentDefinitions.some((s) => s.id === "log-book")) {
    items.push({
      kind: "primer",
      id: `${programmeSlug}/log-book-overview`,
      segment: "log-book",
      title: "experience book",
      description:
        "last 10 minutes — children fill in \"what happened in class today\" with the teacher. after children leave, the teacher fills the skill-assessment part privately.",
      info: {
        segmentId: "log-book",
        segmentName: "Experience Book",
        title: "experience book",
        description:
          "in the last 10 minutes of every session, children fill in the \"what happened in class today\" part of the experience book together with the teacher. the teacher opens a short discussion — what was your favourite part today? what did you enjoy? what did you not enjoy so much? what game or activity would you like to do again? — encouraging every child to speak. after children leave, the teacher fills in the skill-assessment part of the book privately. these daily notes compile into the child's monthly report card that goes home every month.",
        bookLinkSlug: bookMap[programmeSlug],
        heroImageUrl: BOOK_COVER_BY_PROGRAMME[programmeSlug],
      },
      thumbImageUrl: BOOK_COVER_BY_PROGRAMME[programmeSlug],
      programmeSlug,
      programmeLabel,
    });
  }

  return items;
}

export default function LibraryPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState<CurriculumActivity | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<SegmentInfo | null>(null);
  const [teacherSlug, setTeacherSlug] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // admin-only: which programme to filter by ("all" = every programme)
  const [selectedProgSlug, setSelectedProgSlug] = useState<string>("all");
  const progPickerRef = useRef<HTMLDivElement | null>(null);

  const scrollPicker = (dir: "left" | "right") => {
    const el = progPickerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -180 : 180, behavior: "smooth" });
  };
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const t = getTeacher();
    if (!t) {
      router.replace("/login");
      return;
    }
    const admin = t.programmeSlug === "*" || t.role === "admin";
    setIsAdmin(admin);
    setTeacherSlug(t.programmeSlug);
    setSelectedProgSlug(admin ? "all" : t.programmeSlug);
    setAuthReady(true);
  }, [router]);

  const { allItems, availableSegments } = useMemo(() => {
    const programmes = listCurriculumProgrammes().filter((p) => p.totalSessions > 0);

    let progsToShow: CurriculumProgramme[] = [];
    if (isAdmin) {
      progsToShow =
        selectedProgSlug === "all"
          ? programmes
          : programmes.filter((p) => p.slug === selectedProgSlug);
    } else if (teacherSlug) {
      const p = getCurriculumProgramme(teacherSlug);
      progsToShow = p ? [p] : [];
    }

    const items = progsToShow.flatMap(buildItemsFor);
    const segments = new Set(items.map((i) => i.segment));
    return { allItems: items, availableSegments: segments };
  }, [isAdmin, teacherSlug, selectedProgSlug]);

  const adminProgrammes = useMemo(
    () => listCurriculumProgrammes().filter((p) => p.totalSessions > 0),
    []
  );

  // Only show filter chips for segments this programme actually has
  const filters = useMemo(() => {
    return ALL_FILTERS.filter(
      (f) => f.id === "all" || availableSegments.has(f.id)
    );
  }, [availableSegments]);

  const filtered = useMemo(() => {
    let result = allItems;
    if (segmentFilter !== "all") {
      // Treat experience-book and log-book as the same segment for filtering.
      const wanted = new Set([segmentFilter]);
      if (segmentFilter === "experience-book") wanted.add("log-book");
      if (segmentFilter === "log-book") wanted.add("experience-book");
      result = result.filter((i) => wanted.has(i.segment));
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((i) => {
        if (i.kind === "activity") {
          const a = i.item;
          return [
            a.title,
            a.cardName ?? "",
            a.setupLine,
            a.howToPlay,
            ...(a.materials ?? []),
          ]
            .join(" ")
            .toLowerCase()
            .includes(q);
        }
        if (i.kind === "artiverse") {
          const u = i.item;
          return [
            u.whatChildrenMake,
            u.medium,
            u.technique,
            ...u.topicOptions,
          ]
            .join(" ")
            .toLowerCase()
            .includes(q);
        }
        return (i.title + " " + i.description).toLowerCase().includes(q);
      });
    }
    return result;
  }, [allItems, segmentFilter, query]);

  // Group filtered items by programme → segment in conduction order.
  // Programme order follows listCurriculumProgrammes(). Within each
  // programme, segments follow the order of programme.segmentDefinitions.
  const grouped = useMemo(() => {
    const allProgs = listCurriculumProgrammes().filter(
      (p) => p.totalSessions > 0
    );

    type Section = {
      segmentId: string;
      label: string;
      items: LibraryItem[];
    };
    type ProgrammeGroup = {
      slug: string;
      title: string;
      ageLabel: string;
      sections: Section[];
    };

    return allProgs.flatMap<ProgrammeGroup>((prog) => {
      // Items belonging to this programme, preserving their existing order.
      const itemsForProg = filtered.filter(
        (i) => i.programmeSlug === prog.slug
      );
      if (itemsForProg.length === 0) return [];

      // Build segment rank from segmentDefinitions order. log-book and
      // experience-book share a rank — whichever the programme uses sits
      // in its definitions list, the other slot still resolves.
      const segmentRank: Record<string, number> = {};
      prog.segmentDefinitions.forEach((s, i) => {
        segmentRank[s.id] = i;
        if (s.id === "log-book") segmentRank["experience-book"] = i;
        if (s.id === "experience-book") segmentRank["log-book"] = i;
      });
      const rankFor = (segId: string) =>
        segmentRank[segId] ?? Number.POSITIVE_INFINITY;

      // Bucket items by segment id (using a normalised id so log-book and
      // experience-book group together).
      const buckets = new Map<string, LibraryItem[]>();
      itemsForProg.forEach((it) => {
        const segId =
          it.segment === "log-book" ? "experience-book" : it.segment;
        const bucket = buckets.get(segId) ?? [];
        bucket.push(it);
        buckets.set(segId, bucket);
      });

      // Convert buckets to sections in segment order.
      const sections: Section[] = Array.from(buckets.entries())
        .map(([segId, items]) => {
          // 3-5 art's "artiverse" segment is rendered as Artiverse / Artistotle.
          const label =
            segId === "artiverse" && prog.slug === "art-design-3-5"
              ? "artiverse · artistotle"
              : segId === "experience-book" || segId === "log-book"
                ? "experience book"
                : segId.replace(/-/g, " ");
          return { segmentId: segId, label, items };
        })
        .sort((a, b) => rankFor(a.segmentId) - rankFor(b.segmentId));

      return [
        {
          slug: prog.slug,
          title: prog.title,
          ageLabel: prog.ageLabel,
          sections,
        },
      ];
    });
  }, [filtered]);

  if (!authReady) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[12px] font-medium text-ink-subtle">loading...</p>
      </div>
    );
  }

  const openItem = (it: LibraryItem) => {
    if (it.kind === "activity") {
      setSelectedActivity(it.item);
    } else if (it.kind === "artiverse") {
      const u = it.item;
      // Artistotle projects share the artiverseUnits collection but are
      // numbered as projects 1-6, not units 13-18. Detect by id prefix.
      const isArtistotle = u.id.startsWith("atl");
      const projectNumber = isArtistotle
        ? u.unitNumber - 12 // unitNumber 13 → project 1, 14 → 2, …
        : u.unitNumber;
      const subText = isArtistotle
        ? `project ${projectNumber} of 6 · ${u.whatChildrenMake.toLowerCase()}`
        : `unit ${u.unitNumber} · reference: ${u.whatChildrenMake.toLowerCase()}`;
      const description = isArtistotle
        ? "an illustrator-led project. children meet the work, learn the technique, then make in the same spirit — not a copy of the original. each project runs over 3 sessions."
        : "the main making session. children work on a3 paper using the medium of this unit. each unit runs over several sessions so technique can deepen. the reference topic below is inspiration only — the actual topic is the child's choice.";
      setSelectedInfo({
        segmentId: "artiverse",
        segmentName: isArtistotle ? "Artistotle" : "Artiverse",
        title: u.medium,
        subText,
        description,
        artiverseUnit: {
          medium: u.medium,
          technique: u.technique,
          whatChildrenMake: u.whatChildrenMake,
          days: u.days,
          topicOptions: u.topicOptions,
          heroImageUrl: u.heroImageUrl,
        },
      });
    } else {
      setSelectedInfo(it.info);
    }
  };

  return (
    <div className="flex flex-col px-4 pt-4 pb-6">
      <h1 className="text-[22px] font-bold text-ink">library</h1>
      <p className="mt-1 text-[13px] text-ink-muted">
        {isAdmin
          ? "every activity across every programme"
          : "every activity in your programme"}
      </p>

      {/* Admin-only programme picker */}
      {isAdmin && (
        <div className="mt-4">
          <p className="text-[10px] font-semibold tracking-wider text-ink-subtle">
            programme
          </p>
          <div className="relative mt-2 flex items-center gap-1.5">
            <button
              type="button"
              aria-label="scroll programmes left"
              onClick={() => scrollPicker("left")}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink-muted transition hover:bg-ink/10 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div
              ref={progPickerRef}
              className="no-scrollbar flex flex-1 gap-2 overflow-x-auto scroll-smooth"
            >
              <button
                onClick={() => setSelectedProgSlug("all")}
                className={cn(
                  "shrink-0 rounded-chip px-3 py-1.5 text-[11px] font-semibold transition",
                  selectedProgSlug === "all"
                    ? "bg-brand-orange text-white"
                    : "bg-ink/5 text-ink-muted hover:bg-ink/10"
                )}
              >
                all programmes
              </button>
              {adminProgrammes.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => setSelectedProgSlug(p.slug)}
                  className={cn(
                    "shrink-0 rounded-chip px-3 py-1.5 text-[11px] font-semibold transition",
                    selectedProgSlug === p.slug
                      ? "bg-brand-orange text-white"
                      : "bg-ink/5 text-ink-muted hover:bg-ink/10"
                  )}
                >
                  {p.title} · {p.ageLabel}
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="scroll programmes right"
              onClick={() => scrollPicker("right")}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink-muted transition hover:bg-ink/10 active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search by name, keyword, materials..."
          className="w-full rounded-card border border-ink/10 bg-brand-white py-2.5 pl-9 pr-4 text-[13px] text-ink placeholder:text-ink-subtle focus:border-brand-orange/40 focus:outline-none focus:ring-2 focus:ring-brand-orange/10"
        />
      </div>

      {/* Filter chips */}
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setSegmentFilter(f.id)}
            className={cn(
              "shrink-0 rounded-chip px-3 py-1.5 text-[11px] font-semibold transition",
              segmentFilter === f.id
                ? "bg-brand-charcoal text-white"
                : "bg-ink/5 text-ink-muted hover:bg-ink/10"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="mt-4 text-[11px] font-medium text-ink-subtle">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        {query.trim() ? ` for "${query.trim()}"` : ""}
      </p>

      {/* Results — grouped programme → segment in conduction order */}
      <div className="mt-4 space-y-8">
        {grouped.map((prog) => {
          const showProgrammeHeader =
            isAdmin && selectedProgSlug === "all" && grouped.length > 1;
          return (
            <section key={prog.slug} className="space-y-4">
              {showProgrammeHeader && (
                <header className="flex items-baseline justify-between gap-3 border-b border-ink/10 pb-2">
                  <h2 className="text-[16px] font-extrabold lowercase text-ink">
                    {prog.title} · {prog.ageLabel}
                  </h2>
                  <span className="rounded-chip bg-ink/5 px-2 py-0.5 text-[10px] font-semibold text-ink-muted">
                    {prog.sections.reduce((n, s) => n + s.items.length, 0)} entries
                  </span>
                </header>
              )}

              <div className="space-y-6">
                {prog.sections.map((section) => {
                  const palette = segmentPalette(section.segmentId);
                  return (
                    <div key={section.segmentId} className="space-y-2">
                      {/* Segment header band */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              "h-6 w-6 flex-none rounded-md",
                              palette.fill
                            )}
                            aria-hidden="true"
                          />
                          <h3 className="text-[13px] font-extrabold lowercase text-ink">
                            {section.label}
                          </h3>
                        </div>
                        <span className="rounded-chip bg-ink/5 px-2 py-0.5 text-[10px] font-semibold text-ink-muted">
                          {section.items.length}
                        </span>
                      </div>

                      {/* Section cards */}
                      <ul className="space-y-2">
                        {section.items.map((it) => {
                          const itemPalette = segmentPalette(it.segment);
                          const title =
                            it.kind === "activity"
                              ? it.item.title
                              : it.kind === "artiverse"
                                ? it.item.id.startsWith("atl")
                                  ? `project ${it.item.unitNumber - 12} · ${it.item.medium.toLowerCase()}`
                                  : `unit ${it.item.unitNumber} · ${it.item.medium.toLowerCase()}`
                                : it.title;
                          const subline =
                            it.kind === "activity"
                              ? it.item.setupLine
                              : it.kind === "artiverse"
                                ? `reference: ${it.item.whatChildrenMake.toLowerCase()}`
                                : it.description;
                          const cardName =
                            it.kind === "activity" ? it.item.cardName : undefined;
                          const thumbImg =
                            it.kind === "artiverse"
                              ? it.item.heroImageUrl
                              : it.kind === "activity"
                                ? getActivityImage(it.item.id) ?? null
                                : it.kind === "primer"
                                  ? it.thumbImageUrl ?? null
                                  : null;
                          return (
                            <li key={it.id}>
                              <button
                                onClick={() => openItem(it)}
                                className="flex w-full overflow-hidden rounded-card bg-brand-white text-left shadow-card ring-1 ring-ink/5 transition hover:shadow-float active:scale-[0.99]"
                              >
                                {/* Segment-coloured left edge bar */}
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    "w-1 flex-none",
                                    itemPalette.fill
                                  )}
                                />

                                <div className="flex flex-1 items-start gap-3 p-3">
                                  {/* Thumbnail */}
                                  {thumbImg ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={thumbImg}
                                      alt=""
                                      className="h-16 w-16 shrink-0 rounded-lg bg-ink/[0.03] object-contain"
                                    />
                                  ) : (
                                    <div
                                      className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg"
                                      style={{
                                        background:
                                          SEGMENT_THUMB_BG[it.segment] ??
                                          "linear-gradient(135deg, #F8B074 0%, #F25E35 100%)",
                                      }}
                                    >
                                      {(() => {
                                        if (it.kind === "activity") {
                                          const UniqueIcon = DIGITAL_ONLY_ICONS[it.item.id];
                                          if (UniqueIcon) {
                                            return (
                                              <UniqueIcon
                                                className="h-7 w-7 text-white"
                                                strokeWidth={1.8}
                                              />
                                            );
                                          }
                                        }
                                        return <SegmentThumbIcon segment={it.segment} />;
                                      })()}
                                      {it.kind === "activity" && (
                                        <span
                                          className="absolute bottom-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/90 shadow-sm"
                                          title="no physical material — digital / facilitated game"
                                        >
                                          <Smartphone className="h-2.5 w-2.5 text-ink-muted" strokeWidth={2.2} />
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      {it.kind === "activity" && !thumbImg && (
                                        <span className="inline-flex items-center gap-1 rounded-chip bg-ink/5 px-2 py-0.5 text-[9px] font-semibold text-ink-muted">
                                          <Smartphone className="h-2.5 w-2.5" strokeWidth={2.2} />
                                          digital only
                                        </span>
                                      )}
                                      {cardName && (
                                        <span className="text-[10px] font-medium text-ink-subtle">
                                          {cardName}
                                        </span>
                                      )}
                                    </div>
                                    <h4 className="mt-0.5 text-[14px] font-semibold leading-tight text-ink">
                                      {title}
                                    </h4>
                                    <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-ink-muted">
                                      {subline}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-[14px] text-ink-subtle">
              no entries match your search
            </p>
          </div>
        )}
      </div>

      {/* Activity modal */}
      <Modal
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
      >
        {selectedActivity && <ActivityPopup activity={selectedActivity} />}
      </Modal>

      {/* Segment / artiverse / primer modal */}
      <Modal isOpen={!!selectedInfo} onClose={() => setSelectedInfo(null)}>
        {selectedInfo && <SegmentInfoPopup info={selectedInfo} />}
      </Modal>
    </div>
  );
}
