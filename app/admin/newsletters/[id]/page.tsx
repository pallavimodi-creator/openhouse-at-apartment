"use client";

/**
 * /admin/newsletters/[id] — admin review of one submission. The admin can
 * READ it, EDIT it (same fill-in panel the educator used) before
 * approving, then APPROVE (which unlocks download).
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Download, Check, Clock, CheckCircle2, Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTeacher, TeacherGate } from "@/components/TeacherGate";
import { NewsletterDocument } from "@/components/NewsletterDocument";
import { NewsletterEditor, type Draft } from "@/components/NewsletterEditor";
import { getNewsletterProgramme } from "@/lib/newsletter-data";
import {
  getSubmission,
  approveSubmission,
  updateSubmission,
  getAdminKey,
  type NewsletterSubmission,
} from "@/lib/newsletter-submissions";

export default function AdminNewsletterViewPage() {
  return (
    <TeacherGate>
      <ViewContent />
    </TeacherGate>
  );
}

/** The submission's stored draft → the editor's Draft shape. */
function toDraft(s: NewsletterSubmission): Draft {
  const d = s.draft;
  return {
    selected: d.selected ?? [],
    nextSelected: d.nextSelected ?? [],
    building: d.building ?? s.building ?? "",
    photos: d.photos ?? [],
    customArtworks: d.customArtworks ?? [],
    from: d.from ?? s.from,
    to: d.to ?? s.to,
    note: d.note ?? "",
  };
}

function ViewContent() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { teacher } = useTeacher();
  const [sub, setSub] = useState<NewsletterSubmission | null | undefined>(undefined);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const isAdmin = !!teacher && (teacher.role === "admin" || teacher.programmeSlug === "*");

  useEffect(() => {
    if (teacher && !isAdmin) router.replace("/");
  }, [teacher, isAdmin, router]);

  useEffect(() => {
    let alive = true;
    getSubmission(params.id, getAdminKey()).then((s) => {
      if (!alive) return;
      setSub(s ?? null);
      if (s) setDraft(toDraft(s));
    });
    return () => { alive = false; };
  }, [params.id]);

  const programme = useMemo(
    () => (sub ? getNewsletterProgramme(sub.programmeSlug) : undefined),
    [sub]
  );
  const selectedSet = useMemo(() => new Set(draft?.selected ?? []), [draft?.selected]);
  const nextSet = useMemo(() => new Set(draft?.nextSelected ?? []), [draft?.nextSelected]);

  // public speaking is continuous — done + coming-up aren't exclusive.
  const continuous = !!sub && sub.programmeSlug.startsWith("public-speaking");

  function toggle(id: string) {
    setDraft((d) => {
      if (!d) return d;
      const next = new Set(d.selected);
      const nextUp = new Set(d.nextSelected);
      if (next.has(id)) next.delete(id);
      else { next.add(id); if (!continuous) nextUp.delete(id); }
      return { ...d, selected: Array.from(next), nextSelected: Array.from(nextUp) };
    });
  }
  function toggleNext(id: string) {
    setDraft((d) => {
      if (!d) return d;
      const nextUp = new Set(d.nextSelected);
      const next = new Set(d.selected);
      if (nextUp.has(id)) nextUp.delete(id);
      else { nextUp.add(id); if (!continuous) next.delete(id); }
      return { ...d, nextSelected: Array.from(nextUp), selected: Array.from(next) };
    });
  }

  async function save() {
    if (!sub || !draft || saving) return;
    setSaving(true);
    try {
      await updateSubmission(sub.id, draft, getAdminKey());
      const fresh = await getSubmission(sub.id, getAdminKey());
      if (fresh) { setSub(fresh); setDraft(toDraft(fresh)); }
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  async function approve() {
    if (!sub) return;
    await approveSubmission(sub.id, getAdminKey());
    const fresh = await getSubmission(sub.id, getAdminKey());
    if (fresh) { setSub(fresh); setDraft(toDraft(fresh)); }
  }

  if (!teacher) {
    return <div className="flex min-h-[60vh] items-center justify-center text-[12px] text-ink-muted">loading…</div>;
  }
  if (!isAdmin) return null;
  if (sub === undefined) {
    return <div className="flex min-h-[60vh] items-center justify-center text-[12px] text-ink-muted">loading…</div>;
  }
  if (sub === null || !draft) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center px-6 text-center">
        <p className="text-[13px] text-ink-muted">this newsletter couldn&apos;t be found.</p>
        <Link href="/admin/newsletters" className="mt-3 text-[12px] font-semibold text-brand-orange underline underline-offset-2">back to newsletters</Link>
      </div>
    );
  }

  const btn = "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-bold shadow-card active:scale-[0.99]";

  return (
    <div className={cn("mx-auto w-full px-3 pb-24 md:px-6 print:p-0 print:m-0 print:max-w-none", editing ? "max-w-6xl" : "max-w-4xl")}>
      <div className="flex flex-wrap items-center gap-3 py-3 print:hidden">
        <Link href="/admin/newsletters" className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-muted hover:text-ink">
          <ChevronLeft className="h-3.5 w-3.5" /> all newsletters
        </Link>
        {sub.status === "approved" ? (
          <span className="inline-flex items-center gap-1 rounded-chip bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800">
            <CheckCircle2 className="h-3 w-3" /> approved
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-chip bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
            <Clock className="h-3 w-3" /> {editing ? "editing" : "pending — review below"}
          </span>
        )}
        <span className="flex-1" />

        {editing ? (
          <>
            <button type="button" onClick={() => { setDraft(toDraft(sub)); setEditing(false); }}
              className={cn(btn, "bg-ink/5 text-ink-muted hover:bg-ink/10")}>
              <X className="h-3.5 w-3.5" /> cancel
            </button>
            <button type="button" onClick={save} disabled={saving}
              className={cn(btn, "bg-brand-orange text-white disabled:opacity-60")}>
              <Check className="h-3.5 w-3.5" /> {saving ? "saving…" : "save changes"}
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => setEditing(true)}
              className={cn(btn, "bg-ink text-white")}>
              <Pencil className="h-3.5 w-3.5" /> edit
            </button>
            {sub.status === "pending" ? (
              <button type="button" onClick={approve}
                className={cn(btn, "bg-brand-orange text-white")}>
                <Check className="h-3.5 w-3.5" /> approve to share
              </button>
            ) : (
              <button type="button" onClick={() => window.print()}
                className={cn(btn, "bg-brand-orange text-white")}>
                <Download className="h-3.5 w-3.5" /> download as pdf
              </button>
            )}
          </>
        )}
      </div>

      {editing && programme ? (
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="space-y-4">
            {/* free-text note — optional; appears near the top of the doc */}
            <div className="rounded-card bg-brand-white p-4 shadow-card ring-1 ring-ink/5 md:p-5">
              <p className="text-[10px] font-bold tracking-normal text-brand-orange">a note to parents</p>
              <p className="mt-0.5 text-[11px] italic text-ink-muted">
                optional — a free-text message from openhouse. leave it blank to show nothing.
              </p>
              <textarea
                value={draft.note ?? ""}
                onChange={(e) => setDraft((d) => (d ? { ...d, note: e.target.value } : d))}
                rows={3}
                placeholder="e.g. thank you for a wonderful month — our showcase is on the 15th, do join us!"
                className="mt-2 w-full resize-y rounded-md border border-ink/15 bg-brand-cream px-3 py-2 text-[12.5px] leading-relaxed outline-none focus:border-brand-orange"
              />
            </div>
            <NewsletterEditor
              programme={programme}
              draft={draft}
              selectedSet={selectedSet}
              nextSet={nextSet}
              onToggle={toggle}
              onToggleNext={toggleNext}
              onDraftChange={(u) => setDraft((d) => (d ? u(d) : d))}
              allowBoth={continuous}
            />
          </div>
          <NewsletterDocument
            programmeSlug={sub.programmeSlug}
            building={draft.building}
            from={draft.from}
            to={draft.to}
            selected={draft.selected}
            nextSelected={draft.nextSelected}
            photos={draft.photos}
            customArtworks={draft.customArtworks}
            note={draft.note}
          />
        </div>
      ) : (
        <NewsletterDocument
          programmeSlug={sub.programmeSlug}
          building={draft.building}
          from={draft.from}
          to={draft.to}
          selected={draft.selected}
          nextSelected={draft.nextSelected}
          photos={draft.photos}
          customArtworks={draft.customArtworks}
          note={draft.note}
        />
      )}

      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
