"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, BookOpen, LayoutGrid, LogOut, Notebook } from "lucide-react";
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
    items.push({
      href: `/${programmeMatch.slug}/overview`,
      label: "overview",
      icon: LayoutGrid,
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
      <div className="mx-auto flex max-w-4xl items-center justify-around">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(item.href + "/");
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
