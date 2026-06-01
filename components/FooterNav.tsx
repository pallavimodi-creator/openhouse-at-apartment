"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, BookOpen, LayoutGrid, LogOut, Notebook, CalendarDays, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { listCurriculumProgrammes } from "@/lib/content";
import { clearTeacher, getBuilding, clearBuilding, getTeacher } from "@/lib/teacher-state";

const PROGRAMME_TO_BOOK: Record<string, string> = {
  "art-design-5-8": "art-5-8",
  "art-design-8-12": "art-8-12",
  "public-speaking-5-8": "speaking-5-8",
  "public-speaking-8-12": "speaking-8-12",
};

export function FooterNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [building, setBuildingState] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Read the current building + admin flag from session storage on mount
  // + whenever the route changes (so picking a new building on /building
  // updates the chip, and admin sessions never get a building chip).
  useEffect(() => {
    setBuildingState(getBuilding());
    const t = getTeacher();
    setIsAdmin(!!t && (t.role === "admin" || t.programmeSlug === "*"));
  }, [pathname]);

  // Hide the footer on the login + building-picker pages
  if (pathname === "/login" || pathname === "/building") {
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

  const handleSwitchBuilding = () => {
    clearBuilding();
    router.push("/building");
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
      {/* Current building chip — tap to switch without signing out.
          Hidden for admins (they review the platform, don't run classes). */}
      {building && !isAdmin && (
        <button
          type="button"
          onClick={handleSwitchBuilding}
          className="mx-auto flex w-full max-w-4xl items-center justify-center gap-1.5 border-b border-ink/5 px-3 py-1 text-[10px] font-bold text-ink-muted transition hover:bg-brand-orange/8 lg:max-w-7xl"
          title="tap to switch building"
        >
          <Building2 className="h-3 w-3 text-brand-orange" strokeWidth={2.4} />
          <span>building:</span>
          <span className="text-ink">{building.toLowerCase()}</span>
          <span className="ml-1 text-brand-orange">· switch</span>
        </button>
      )}
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
