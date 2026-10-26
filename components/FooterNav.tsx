"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  LayoutGrid,
  LogOut,
  Notebook,
  CalendarDays,
  Building2,
  Newspaper,
  ClipboardCheck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { listCurriculumProgrammes } from "@/lib/content";
import { clearTeacher, getTeacher, isFullAdmin, teacherCategories } from "@/lib/teacher-state";

export function FooterNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [apartment, setApartment] = useState<string | null>(null);
  const [teacherName, setTeacherName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [teacherProgrammeSlug, setTeacherProgrammeSlug] = useState<string | null>(null);
  const [hasCategories, setHasCategories] = useState(false);

  useEffect(() => {
    const t = getTeacher();
    const admin = !!t && (t.role === "admin" || t.programmeSlug === "*");
    setIsAdmin(admin);
    setIsFull(isFullAdmin(t)); // full admin only — excludes the read-only guest
    setIsTeacher(!!t?.teacherId);
    setApartment(t?.apartmentName ?? null);
    setTeacherName(t?.teacherName ?? null);
    setTeacherProgrammeSlug(
      t && t.programmeSlug && t.programmeSlug !== "*" ? t.programmeSlug : null
    );
    setHasCategories(teacherCategories(t).length > 0);
  }, [pathname]);

  // Hide the footer on the sign-in pages (generic login → apartment → teacher).
  if (
    pathname === "/login" ||
    pathname === "/building" ||
    pathname === "/apartment" ||
    pathname === "/teacher"
  ) {
    return null;
  }

  const programmes = listCurriculumProgrammes();
  const programmeMatch = programmes.find(
    (p) => pathname === `/${p.slug}` || pathname.startsWith(`/${p.slug}/`)
  );
  const targetProgramme =
    programmeMatch ??
    (teacherProgrammeSlug
      ? programmes.find((p) => p.slug === teacherProgrammeSlug) ?? null
      : null);

  const items: { href: string; label: string; icon: typeof Home }[] = [
    { href: "/", label: "home", icon: Home },
  ];

  if (targetProgramme && targetProgramme.totalSessions > 0) {
    items.push({ href: `/${targetProgramme.slug}`, label: "plans", icon: CalendarDays });
  }

  // The new daily form + shared apartment dashboard (signed-in teachers only).
  if (isTeacher && !isAdmin) {
    items.push({ href: "/daily", label: "daily", icon: Notebook });
    items.push({ href: "/dashboard", label: "dashboard", icon: Users });
  }

  items.push({ href: "/library", label: "library", icon: BookOpen });

  const newsletterEligible =
    isAdmin ||
    hasCategories ||
    (teacherProgrammeSlug != null && !teacherProgrammeSlug.endsWith("-3-5"));
  if (newsletterEligible) {
    items.push({
      href: isAdmin ? "/admin/newsletters" : "/newsletter",
      label: "newsletter",
      icon: Newspaper,
    });
  }

  // admin-only tools — the operational dashboards. Full admins only; the
  // read-only guest does not see these.
  if (isFull) {
    items.push({ href: "/admin/apartments", label: "apartments", icon: Building2 });
    items.push({ href: "/admin/tracker", label: "tracker", icon: ClipboardCheck });
  }

  const handleSignOut = () => {
    clearTeacher();
    router.push("/login");
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-brand-white print:hidden"
      style={{
        borderTop: "1.5px solid rgba(44,43,40,0.12)",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.08)",
        paddingBottom: "max(env(safe-area-inset-bottom), 12px)",
      }}
    >
      {/* Apartment + teacher identity chip (teachers only). */}
      {apartment && !isAdmin && (
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center gap-1.5 border-b border-ink/5 px-3 py-1 text-[10px] font-bold text-ink-muted lg:max-w-7xl">
          <Building2 className="h-3 w-3 text-brand-orange" strokeWidth={2.4} />
          <span>apartment:</span>
          <span className="text-ink">{apartment.toLowerCase()}</span>
          {teacherName && <span className="text-ink-subtle">· {teacherName.toLowerCase()}</span>}
        </div>
      )}
      <div className="mx-auto flex max-w-4xl items-center justify-around lg:max-w-7xl">
        {items.map((item) => {
          const isPlans = !!programmeMatch && item.href === `/${programmeMatch.slug}`;
          const active =
            item.href === "/"
              ? pathname === "/"
              : isPlans
                ? pathname === item.href
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
