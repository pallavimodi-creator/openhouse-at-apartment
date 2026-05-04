"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, BookOpen, LayoutGrid, LogOut, Notebook, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { listCurriculumProgrammes } from "@/lib/content";
import { clearTeacher } from "@/lib/teacher-state";

const PROGRAMME_TO_BOOK: Record<string, string> = {
  "art-design-5-8": "art-5-8",
  "art-design-8-12": "art-8-12",
  "public-speaking-5-8": "speaking-5-8",
  "public-speaking-8-12": "speaking-8-12",
};

export function FooterNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide the footer on the login page only
  if (pathname === "/login") {
    return null;
  }

  // Detect if we're inside a programme page
  const programmes = listCurriculumProgrammes();
  const programmeMatch = programmes.find(
    (p) => pathname === `/${p.slug}` || pathname.startsWith(`/${p.slug}/`)
  );

  const items: { href: string; label: string; icon: typeof Home }[] = [
    { href: "/", label: "home", icon: Home },
  ];

  if (programmeMatch && programmeMatch.totalSessions > 0) {
    // Surface the teacher journey in the order it should run:
    //   1. overview — the why
    //   2. plans    — the daily run sheet
    //   3. library  — reference (already added below)
    items.push({
      href: `/${programmeMatch.slug}/overview`,
      label: "overview",
      icon: LayoutGrid,
    });
    items.push({
      href: `/${programmeMatch.slug}`,
      label: "plans",
      icon: CalendarDays,
    });
    const bookSlug = PROGRAMME_TO_BOOK[programmeMatch.slug];
    if (bookSlug) {
      items.push({
        href: `/book/${bookSlug}`,
        label: "experience book",
        icon: Notebook,
      });
    }
  }

  items.push({ href: "/library", label: "library", icon: BookOpen });

  const handleSignOut = () => {
    clearTeacher();
    router.push("/login");
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-brand-white"
      style={{
        borderTop: "1.5px solid rgba(44,43,40,0.12)",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.08)",
        paddingBottom: "max(env(safe-area-inset-bottom), 12px)",
      }}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-around lg:max-w-7xl">
        {items.map((item) => {
          // Active-state matching:
          //   home — only when pathname is exactly "/"
          //   plans (e.g. /art-design-3-5) — only when pathname is
          //     exactly the programme slug (no sub-path) so we don't
          //     also light up plans when overview / library is active
          //   everything else — exact path or sub-path
          const isPlans =
            !!programmeMatch && item.href === `/${programmeMatch.slug}`;
          const active =
            item.href === "/"
              ? pathname === "/"
              : isPlans
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-2.5 text-center transition",
                active ? "text-brand-orange" : "text-ink-muted"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              <span className="text-[10px] font-bold leading-tight">{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={handleSignOut}
          className="flex flex-col items-center gap-0.5 px-2 py-2.5 text-center text-ink-muted transition hover:text-brand-orange"
        >
          <LogOut className="h-5 w-5" strokeWidth={2} />
          <span className="text-[10px] font-bold leading-tight">sign out</span>
        </button>
      </div>
    </nav>
  );
}
