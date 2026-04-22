"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { getBookConfig } from "@/content/books";
import { getManualConfig } from "@/content/books/manuals";
import { TeacherGate } from "@/components/TeacherGate";

/* ── helpers ─────────────────────────────────────────────── */

/** Split content on double newlines and render as paragraphs */
function Paragraphs({ text, className }: { text: string; className?: string }) {
  const blocks = text.split("\n\n");
  return (
    <>
      {blocks.map((block, i) => (
        <p
          key={i}
          className={
            className ??
            "text-[13px] leading-relaxed text-ink/70"
          }
        >
          {block}
        </p>
      ))}
    </>
  );
}

/** Check if text looks like a table (lines with " — " separators) */
function isTable(text: string): boolean {
  const lines = text.trim().split("\n").filter(Boolean);
  return lines.length > 3 && lines.every((l) => l.includes(" — "));
}

/** Render table-style content as a formatted table */
function TableContent({ text }: { text: string }) {
  const lines = text.trim().split("\n").filter(Boolean);

  // Check if first line is a header (has more " — " than others or is clearly a header)
  const firstLine = lines[0];
  const isHeader =
    firstLine.includes("Code") ||
    firstLine.includes("Ability") ||
    firstLine.includes("Typical");

  const headerLine = isHeader ? lines[0] : null;
  const dataLines = isHeader ? lines.slice(1) : lines;
  const headerCells = headerLine?.split(" — ").map((c) => c.trim()) ?? [];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px] text-ink/70">
        {headerLine && (
          <thead>
            <tr className="border-b border-ink/10">
              {headerCells.map((cell, i) => (
                <th
                  key={i}
                  className="pb-2 pr-4 text-left text-[11px] font-bold text-ink/50"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {dataLines.map((line, i) => {
            // Handle blank lines between header and data
            if (!line.trim()) return null;
            const cells = line.split(" — ").map((c) => c.trim());
            return (
              <tr key={i} className="border-b border-ink/5">
                {cells.map((cell, j) => (
                  <td
                    key={j}
                    className={`py-2 pr-4 ${
                      j === 0
                        ? "font-mono text-[11px] font-bold text-brand-orange"
                        : j === 1
                          ? "font-medium text-ink/80"
                          : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Render content that may contain a table or regular paragraphs */
function ContentBlock({ text }: { text: string }) {
  if (isTable(text)) {
    // Split into pre-table text and table
    const lines = text.split("\n");
    const tableStartIdx = lines.findIndex((l) => l.includes(" — "));
    const preText = lines.slice(0, tableStartIdx).join("\n").trim();
    const tableText = lines.slice(tableStartIdx).join("\n").trim();

    // Find post-table text (lines after table that don't have " — ")
    const tableLines = tableText.split("\n");
    const lastTableLineIdx = tableLines.length - 1;
    let postTableStart = tableLines.length;
    for (let i = tableLines.length - 1; i >= 0; i--) {
      if (tableLines[i].includes(" — ")) {
        postTableStart = i + 1;
        break;
      }
    }
    const pureTable = tableLines.slice(0, postTableStart).join("\n");
    const postText = tableLines.slice(postTableStart).join("\n").trim();

    return (
      <>
        {preText && (
          <Paragraphs text={preText} />
        )}
        <div className="mt-3">
          <TableContent text={pureTable} />
        </div>
        {postText && (
          <div className="mt-3">
            <Paragraphs text={postText} />
          </div>
        )}
      </>
    );
  }

  return <Paragraphs text={text} />;
}

/* ── page ────────────────────────────────────────────────── */

export default function TeacherManualPage() {
  return (
    <TeacherGate>
      <TeacherManualContent />
    </TeacherGate>
  );
}

function TeacherManualContent() {
  const params = useParams();
  const slug = params.slug as string;
  const book = getBookConfig(slug);
  const manual = getManualConfig(slug);

  if (!book || !manual) {
    notFound();
    return null;
  }

  return (
    <div className="flex flex-col px-4 pt-4 pb-10 md:px-8">
      {/* Back link */}
      <Link
        href={`/book/${slug}`}
        className="text-[12px] font-bold text-brand-orange hover:underline"
      >
        ← back to book
      </Link>

      <div className="mx-auto mt-6 w-full max-w-2xl">
        <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
          {/* Header */}
          <p className="text-[10px] font-bold tracking-widest text-ink/40">
            teacher manual
          </p>
          <h1 className="mt-2 text-[24px] font-extrabold text-ink">
            {book.title}
          </h1>
          <p className="mt-1 text-[13px] font-medium text-ink/60">
            {manual.subtitle}
          </p>

          {/* Intro */}
          <div className="mt-6 rounded-2xl bg-brand-orange/5 p-5">
            <Paragraphs
              text={manual.intro}
              className="text-[13px] leading-relaxed text-ink/70"
            />
          </div>

          {/* Table of contents */}
          <nav className="mt-8">
            <p className="text-[11px] font-bold tracking-widest text-ink/40">
              contents
            </p>
            <ol className="mt-3 space-y-1">
              {manual.sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="flex items-baseline gap-2 rounded-lg px-2 py-1 text-[13px] text-ink/60 transition-colors hover:bg-brand-orange/5 hover:text-brand-orange"
                  >
                    <span className="font-mono text-[11px] text-ink/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="mt-10 space-y-10">
            {manual.sections.map((section, i) => (
              <section key={i} id={`section-${i}`} className="scroll-mt-8">
                {/* Section header */}
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[12px] font-bold text-brand-orange/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-[18px] font-extrabold text-brand-orange">
                    {section.title}
                  </h2>
                </div>

                {/* Section content */}
                <div className="mt-3 space-y-3 pl-8">
                  <ContentBlock text={section.content} />
                </div>

                {/* Subsections */}
                {section.subsections && section.subsections.length > 0 && (
                  <div className="mt-5 space-y-5 pl-8">
                    {section.subsections.map((sub, j) => (
                      <div key={j}>
                        <h3 className="text-[14px] font-extrabold text-ink">
                          {sub.title}
                        </h3>
                        <div className="mt-2 space-y-2">
                          <ContentBlock text={sub.content} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Divider (except last) */}
                {i < manual.sections.length - 1 && (
                  <div className="mt-10 border-t border-ink/5" />
                )}
              </section>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 rounded-2xl bg-brand-orange/5 p-5 text-center">
            <p className="text-[12px] font-medium text-ink/50">
              end of teacher manual · {book.title} · {book.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
