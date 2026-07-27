"use client";

/**
 * NewsletterEditor — the "what happened" fill-in panel, shared by the
 * educator's /newsletter page and the admin review page (so an admin can
 * edit a submission before approving). Pure controlled component: it holds
 * no state, it renders `draft` and calls the handlers.
 */

import { useRef } from "react";
import {
  Camera, X, Plus,
  Wrench, FlaskConical, Palette, Dices, Sun, Mic, Waves, PenTool, Circle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NewsletterItem, NewsletterProgramme } from "@/lib/newsletter-data";

/** The full newsletter draft an educator (or admin) is editing. */
export interface Draft {
  selected: string[];
  nextSelected: string[];
  building: string;
  photos: string[];
  customArtworks: string[];
  from: string;
  to: string;
}

/** Downscale + compress an image file to a JPEG data-URL so submissions
 *  stay small. Longest edge capped at maxEdge px. */
export function downscaleImage(file: File, maxEdge: number, quality: number): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) { resolve(String(reader.result)); return; }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => resolve(String(reader.result));
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

/* ─── display helpers ──────────────────────────────────────── */

/** icon per activity type — the same line-icon language as the doc. */
const TYPE_ICONS: Record<string, LucideIcon> = {
  models: Wrench, experiments: FlaskConical, artworks: Palette, games: Dices,
};
/** icon per class segment. */
const SEG_ICONS: Record<string, LucideIcon> = {
  "roll-call": Sun, playground: Dices, showtime: Mic, "sign-off": Waves,
  "art-gym": PenTool, "art-games": Dices,
};
function SmallIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="h-3.5 w-3.5 shrink-0 text-ink-muted" strokeWidth={2.2} />;
}
/** category → what a photo should show (never faces). */
const PHOTO_NOUN: Record<string, string> = {
  stem: "the models & builds",
  art: "the artworks",
  language: "props & the stage",
};
/** stable day-order for grouping games by segment of the class. */
const SEGMENT_ORDER = [
  "roll-call", "roll-rhyme", "art-gym", "playground",
  "art-games", "wordsmiths", "showtime", "sign-off",
];
function segmentGroupsOf(items: NewsletterItem[]) {
  const g = new Map<string, { name: string; items: NewsletterItem[] }>();
  for (const it of items) {
    if (!g.has(it.segment)) g.set(it.segment, { name: it.segmentName, items: [] });
    g.get(it.segment)!.items.push(it);
  }
  const known = SEGMENT_ORDER.filter((s) => g.has(s));
  const rest = [...g.keys()].filter((s) => !SEGMENT_ORDER.includes(s));
  return [...known, ...rest].map((s) => ({ segment: s, name: g.get(s)!.name, items: g.get(s)!.items }));
}

export function NewsletterEditor({
  programme, draft, selectedSet, nextSet, onToggle, onToggleNext, onDraftChange,
}: {
  programme: NewsletterProgramme;
  draft: Draft;
  selectedSet: Set<string>;
  nextSet: Set<string>;
  onToggle: (id: string) => void;
  onToggleNext: (id: string) => void;
  onDraftChange: (u: (d: Draft) => Draft) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  function pickPhotos(files: FileList | null) {
    if (!files) return;
    const remaining = Math.max(0, 3 - draft.photos.length);
    Array.from(files).slice(0, remaining).forEach((file) => {
      downscaleImage(file, 1000, 0.8).then((dataUrl) => {
        onDraftChange((d) => ({ ...d, photos: [...d.photos, dataUrl].slice(0, 3) }));
      });
    });
  }

  // one shared row renderer for the "done" list …
  const doneList = (items: NewsletterItem[]) => (
    <ul className="mt-1.5 divide-y divide-ink/5 rounded-card bg-ink/[0.03]">
      {items.map((item) => {
        const checked = selectedSet.has(item.id);
        const lockedByNext = nextSet.has(item.id);
        return (
          <li key={item.id}>
            <label className={cn("flex items-start gap-2.5 px-3 py-2 text-[12.5px] leading-snug",
              lockedByNext ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-ink/[0.03]")}>
              <input type="checkbox" checked={checked} disabled={lockedByNext}
                onChange={() => onToggle(item.id)} className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange" />
              <span className="min-w-0 flex-1">
                <span className={cn("font-semibold text-ink", !checked && "opacity-90")}>{item.label}</span>
                {item.subtitle && <span className="ml-1.5 text-[11.5px] text-ink-muted">— {item.subtitle}</span>}
                {lockedByNext && <span className="ml-1 text-[10px] font-bold text-brand-orange">(in coming up)</span>}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );

  // … and the tighter "coming up" list.
  const nextList = (items: NewsletterItem[]) => (
    <ul className="mt-1 divide-y divide-ink/5 rounded-md bg-brand-white ring-1 ring-ink/5">
      {items.map((item) => {
        const checked = nextSet.has(item.id);
        const lockedByDone = selectedSet.has(item.id);
        return (
          <li key={item.id}>
            <label className={cn("flex items-start gap-2.5 px-3 py-1.5 text-[12px] leading-snug",
              lockedByDone ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-ink/[0.03]")}>
              <input type="checkbox" checked={checked} disabled={lockedByDone}
                onChange={() => onToggleNext(item.id)} className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange" />
              <span className="min-w-0 flex-1 font-semibold text-ink">
                {item.label}
                {lockedByDone && <span className="ml-1 text-[10px] font-bold text-brand-orange">(done)</span>}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );

  // games get split by segment of the class (roll call / playground / …);
  // every other category is a single flat list.
  const renderCategory = (
    cat: NewsletterProgramme["categories"][number],
    render: (items: NewsletterItem[]) => React.ReactNode,
  ) => {
    const groups = cat.id === "games" ? segmentGroupsOf(cat.items) : null;
    if (groups && groups.length > 1) {
      return (
        <div className="mt-1.5 space-y-2.5">
          {groups.map((grp) => (
            <div key={grp.segment}>
              <p className="mb-1 flex items-center gap-1.5 text-[10.5px] font-bold tracking-normal text-ink-muted">
                <SmallIcon icon={SEG_ICONS[grp.segment] ?? Circle} />
                {grp.name.toLowerCase()}
              </p>
              {render(grp.items)}
            </div>
          ))}
        </div>
      );
    }
    return render(cat.items);
  };

  return (
    <div className="rounded-card bg-brand-white p-4 shadow-card ring-1 ring-ink/5 md:p-6">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">fill in</p>
      <h2 className="mt-1 text-[20px] font-extrabold leading-tight text-ink">what happened in the classes?</h2>
      <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
        tick what the children did — the newsletter writes itself. each item is either <b>done</b> or <b>coming up</b>.
      </p>

      {/* building */}
      <div className="mt-4">
        <label className="text-[11px] font-bold tracking-normal text-ink-subtle">building</label>
        <input type="text" value={draft.building}
          onChange={(e) => onDraftChange((d) => ({ ...d, building: e.target.value }))}
          placeholder="e.g. raheja vihar"
          className="mt-1 w-full rounded-md border border-ink/15 bg-brand-cream px-3 py-2 text-[13px] outline-none focus:border-brand-orange" />
        <p className="mt-0.5 text-[10.5px] italic text-ink-muted">this is what parents see — &quot;dear parents at {draft.building.trim().toLowerCase() || "your building"}&quot;.</p>
      </div>

      {/* photos */}
      <div className="mt-5">
        <p className="flex items-center gap-1.5 text-[11.5px] font-bold tracking-normal text-ink-subtle">
          <SmallIcon icon={Camera} /> photos (up to 3)
        </p>
        <p className="mt-0.5 text-[11px] font-semibold text-brand-orange">
          photos of {PHOTO_NOUN[programme.categoryLabel] ?? "the work"} only — please, no children&apos;s faces.
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {draft.photos.map((src, i) => (
            <div key={i} className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-brand-cream ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-contain" />
              <button type="button" onClick={() => onDraftChange((d) => ({ ...d, photos: d.photos.filter((_, j) => j !== i) }))}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white" aria-label="remove"><X className="h-3 w-3" /></button>
            </div>
          ))}
          {draft.photos.length < 3 && (
            <button type="button" onClick={() => fileRef.current?.click()}
              className="flex aspect-square items-center justify-center rounded-md border-2 border-dashed border-ink/20 text-[11px] font-semibold text-ink-muted hover:border-brand-orange hover:text-brand-orange">
              <Camera className="mr-1 h-3.5 w-3.5" /> add
            </button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden
          onChange={(e) => { pickPhotos(e.target.files); e.target.value = ""; }} />
      </div>

      {/* what happened */}
      {programme.categories.map((cat) => (
        <div key={cat.id} className="mt-5">
          <p className="flex items-center gap-1.5 text-[11.5px] font-bold tracking-normal text-ink-subtle">
            <SmallIcon icon={TYPE_ICONS[cat.id] ?? Circle} />{cat.label}
          </p>
          {renderCategory(cat, doneList)}
        </div>
      ))}

      {/* art only — add your own artworks not in the list */}
      {programme.slug.startsWith("art-design") && (
        <div className="mt-5">
          <p className="text-[11.5px] font-bold tracking-normal text-ink-subtle">
            add your own artworks
          </p>
          <p className="mt-0.5 text-[11px] italic text-ink-muted">
            made something not on the list? add it here — as many as you like.
          </p>
          <div className="mt-1.5 space-y-1.5">
            {draft.customArtworks.map((val, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={val}
                  onChange={(e) =>
                    onDraftChange((d) => ({
                      ...d,
                      customArtworks: d.customArtworks.map((v, j) => (j === i ? e.target.value : v)),
                    }))
                  }
                  placeholder="e.g. clay diya, leaf print"
                  className="flex-1 rounded-md border border-ink/15 bg-brand-cream px-3 py-1.5 text-[12.5px] outline-none focus:border-brand-orange"
                />
                <button type="button"
                  onClick={() => onDraftChange((d) => ({ ...d, customArtworks: d.customArtworks.filter((_, j) => j !== i) }))}
                  className="rounded-md p-1.5 text-ink-muted hover:bg-red-50 hover:text-red-600" aria-label="remove">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button type="button"
              onClick={() => onDraftChange((d) => ({ ...d, customArtworks: [...d.customArtworks, ""] }))}
              className="flex items-center gap-1 rounded-md border-2 border-dashed border-ink/20 px-3 py-1.5 text-[12px] font-semibold text-ink-muted hover:border-brand-orange hover:text-brand-orange">
              <Plus className="h-3.5 w-3.5" /> add an artwork
            </button>
          </div>
        </div>
      )}

      {/* coming up */}
      <div className="mt-6 rounded-card bg-brand-orange/5 p-4 ring-1 ring-brand-orange/15">
        <p className="text-[11.5px] font-bold tracking-normal text-brand-orange">coming up next</p>
        <p className="mt-0.5 text-[11px] italic text-ink-muted">the next things you&apos;ll do in the coming classes.</p>
        {programme.categories.map((cat) => (
          <div key={cat.id} className="mt-3">
            <p className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-normal text-ink-subtle">
              <SmallIcon icon={TYPE_ICONS[cat.id] ?? Circle} />next · {cat.label}
            </p>
            {renderCategory(cat, nextList)}
          </div>
        ))}
      </div>
    </div>
  );
}
