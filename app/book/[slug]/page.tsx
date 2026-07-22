"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { TeacherGate } from "@/components/TeacherGate";

/**
 * Experience-book viewer — placeholder while the books are being
 * redesigned. The old flipbook + PDF download flow has been removed;
 * this page now shows a "coming soon" state so anyone deep-linked
 * to a specific book (e.g. /book/art-5-8) still lands somewhere
 * sensible.
 */

export default function BookPage() {
  return (
    <TeacherGate>
      <BookPageContent />
    </TeacherGate>
  );
}

function BookPageContent() {
  return (
    <div className="flex flex-col px-4 pt-4 pb-6 md:px-8">
      <Link
        href="/book"
        className="inline-flex items-center gap-1 self-start text-[12px] font-semibold text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        all experience books
      </Link>

      <div className="mt-8 flex flex-col items-center justify-center rounded-card bg-brand-white px-6 py-16 text-center shadow-card ring-1 ring-ink/5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
          <BookOpen className="h-8 w-8" strokeWidth={1.6} />
        </div>
        <h2 className="mt-4 text-[20px] font-extrabold text-ink">
          experience books — coming soon
        </h2>
        <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-ink-muted">
          this book is being redesigned. the new version will be up here shortly.
        </p>
      </div>
    </div>
  );
}
