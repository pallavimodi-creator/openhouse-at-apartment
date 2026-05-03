"use client";

import Link from "next/link";
import { TeacherGate } from "@/components/TeacherGate";

const books = [
  {
    slug: "art-5-8",
    title: "my art experience book",
    subtitle: "art & design · ages 5–8",
    color: "bg-segment-yellow",
    tagline: "every mark you made. every colour you mixed.",
    coverImageUrl: "/book-covers/art-5-8.png",
  },
  {
    slug: "art-8-12",
    title: "my art experience book",
    subtitle: "art & design · ages 8–12",
    color: "bg-segment-yellow",
    tagline: "every observation you drew. every idea you pushed past the obvious.",
    coverImageUrl: "/book-covers/art-8-12.png",
  },
  {
    slug: "speaking-5-8",
    title: "my public speaking experience book",
    subtitle: "public speaking · ages 5–8",
    color: "bg-category-language/40",
    tagline: "every story you told. every idea you shared.",
    coverImageUrl: "/book-covers/speaking-5-8.png",
  },
  {
    slug: "speaking-8-12",
    title: "my public speaking experience book",
    subtitle: "public speaking · ages 8–12",
    color: "bg-category-language/40",
    tagline: "every argument you built. every idea you pushed past the obvious.",
    coverImageUrl: "/book-covers/speaking-8-12.png",
  },
  {
    slug: "robotics-5-8",
    title: "my robotics experience book",
    subtitle: "robotics · ages 5–8",
    color: "bg-[#EDE6D3]",
    tagline: "every model you built. every experiment you ran. every time you figured out why.",
  },
  {
    slug: "robotics-8-12",
    title: "my robotics experience book",
    subtitle: "robotics · ages 8–12",
    color: "bg-[#EDE6D3]",
    tagline: "every model you built. every prediction you tested. every time you explained the cause.",
  },
];

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
      <p className="mt-1 text-[13px] font-medium text-ink-muted">
        select a book to view or fill in
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {books.map((book) => (
          <Link
            key={book.slug}
            href={`/book/${book.slug}`}
            className="group flex flex-col overflow-hidden rounded-card bg-brand-white shadow-card transition hover:shadow-float active:scale-[0.99]"
          >
            <div className={`${book.color} flex flex-col items-center px-5 py-6`}>
              {book.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.coverImageUrl}
                  alt={`${book.title} cover`}
                  className="mb-3 block h-40 w-auto rounded-md bg-white/40 object-contain shadow-sm ring-1 ring-ink/5"
                />
              ) : null}
              <div className="w-full">
                <p className="text-[10px] font-bold text-ink/60">oh.</p>
                <h2 className="mt-1 text-[18px] font-extrabold leading-tight text-ink">
                  {book.title}
                </h2>
                <p className="mt-1 text-[11px] font-medium text-ink/70">
                  {book.subtitle}
                </p>
              </div>
            </div>
            <div className="flex-1 px-5 py-4">
              <p className="text-[12px] italic text-ink-muted">{book.tagline}</p>
              <p className="mt-3 text-[12px] font-bold text-brand-orange group-hover:underline">
                open book →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
