"use client";

import { TeacherGate } from "@/components/TeacherGate";
import { BookOpen } from "lucide-react";

export default function BookSelectorPage() {
  return (
    <TeacherGate>
      <BookSelectorContent />
    </TeacherGate>
  );
}

function BookSelectorContent() {
  return (
    <div className="flex flex-col px-4 pt-4 pb-6 md:px-8">
      <h1 className="text-[24px] font-extrabold text-ink md:text-[32px]">
        experience books
      </h1>

      <div className="mt-8 flex flex-col items-center justify-center rounded-card bg-brand-white px-6 py-16 text-center shadow-card ring-1 ring-ink/5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
          <BookOpen className="h-8 w-8" strokeWidth={1.6} />
        </div>
        <h2 className="mt-4 text-[20px] font-extrabold text-ink">
          coming soon
        </h2>
        <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-ink-muted">
          experience books are being redesigned. the new version will be up here shortly.
        </p>
      </div>
    </div>
  );
}
