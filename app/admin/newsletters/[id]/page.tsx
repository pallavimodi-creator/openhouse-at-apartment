"use client";

/**
 * /admin/newsletters/[id] — the approved newsletter, admin-only, with a
 * download button. Renders the same NewsletterDocument the educator saw.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Download } from "lucide-react";
import { useTeacher, TeacherGate } from "@/components/TeacherGate";
import { NewsletterDocument } from "@/components/NewsletterDocument";
import { getSubmission, getAdminKey, type NewsletterSubmission } from "@/lib/newsletter-submissions";

export default function AdminNewsletterViewPage() {
  return (
    <TeacherGate>
      <ViewContent />
    </TeacherGate>
  );
}

function ViewContent() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { teacher } = useTeacher();
  const [sub, setSub] = useState<NewsletterSubmission | null | undefined>(undefined);

  const isAdmin = !!teacher && (teacher.role === "admin" || teacher.programmeSlug === "*");

  useEffect(() => {
    if (teacher && !isAdmin) router.replace("/");
  }, [teacher, isAdmin, router]);

  useEffect(() => {
    let alive = true;
    getSubmission(params.id, getAdminKey()).then((s) => {
      if (alive) setSub(s ?? null);
    });
    return () => { alive = false; };
  }, [params.id]);

  if (!teacher) {
    return <div className="flex min-h-[60vh] items-center justify-center text-[12px] text-ink-muted">loading…</div>;
  }
  if (!isAdmin) return null;

  if (sub === undefined) {
    return <div className="flex min-h-[60vh] items-center justify-center text-[12px] text-ink-muted">loading…</div>;
  }
  if (sub === null) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center px-6 text-center">
        <p className="text-[13px] text-ink-muted">this newsletter couldn&apos;t be found on this device.</p>
        <Link href="/admin/newsletters" className="mt-3 text-[12px] font-semibold text-brand-orange underline underline-offset-2">back to newsletters</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-3 pb-24 md:px-6">
      <div className="flex items-center gap-3 py-3 print:hidden">
        <Link href="/admin/newsletters" className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-muted hover:text-ink">
          <ChevronLeft className="h-3.5 w-3.5" /> all newsletters
        </Link>
        <span className="flex-1" />
        <button type="button" onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-md bg-brand-orange px-3 py-1.5 text-[12px] font-bold text-white shadow-card active:scale-[0.99]">
          <Download className="h-3.5 w-3.5" /> download as pdf
        </button>
      </div>

      <NewsletterDocument
        programmeSlug={sub.programmeSlug}
        building={sub.draft.building}
        from={sub.from}
        to={sub.to}
        selected={sub.draft.selected}
        nextSelected={sub.draft.nextSelected}
        photos={sub.draft.photos}
      />

      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
