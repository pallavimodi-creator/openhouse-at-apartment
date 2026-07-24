"use client";

/**
 * /admin/newsletters — admin review of educator-submitted newsletters,
 * grouped by building. Admin enters the newsletter admin key once, then
 * approves + downloads. Only admins reach this route.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check, Trash2, Clock, CheckCircle2, KeyRound } from "lucide-react";
import { useTeacher, TeacherGate } from "@/components/TeacherGate";
import { humanRange } from "@/lib/newsletter-voice";
import {
  listSubmissions,
  approveSubmission,
  deleteSubmission,
  groupByBuilding,
  getAdminKey,
  setAdminKey,
  type NewsletterSubmission,
} from "@/lib/newsletter-submissions";

export default function AdminNewslettersPage() {
  return (
    <TeacherGate>
      <AdminNewslettersContent />
    </TeacherGate>
  );
}

function AdminNewslettersContent() {
  const router = useRouter();
  const { teacher } = useTeacher();
  const [subs, setSubs] = useState<NewsletterSubmission[]>([]);
  const [configured, setConfigured] = useState(true);
  const [needsKey, setNeedsKey] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [loading, setLoading] = useState(true);

  const isAdmin = !!teacher && (teacher.role === "admin" || teacher.programmeSlug === "*");

  const refresh = useCallback(async () => {
    setLoading(true);
    const key = getAdminKey();
    const { submissions, configured, authError } = await listSubmissions(key);
    setConfigured(configured);
    // Only prompt for a key if the server actually rejects the request
    // (i.e. a key is still configured). With the gate removed, the list is
    // open and this never fires.
    setNeedsKey(configured && authError);
    setSubs(submissions);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => {
    if (teacher && !isAdmin) router.replace("/");
  }, [teacher, isAdmin, router]);

  const grouped = useMemo(() => groupByBuilding(subs), [subs]);

  async function saveKey() {
    if (!keyInput.trim()) return;
    setAdminKey(keyInput.trim());
    setKeyInput("");
    await refresh();
  }

  if (!teacher) {
    return <div className="flex min-h-[60vh] items-center justify-center text-[12px] text-ink-muted">loading…</div>;
  }
  if (!isAdmin) return null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-24 md:px-6">
      <div className="flex items-center gap-3 py-3">
        <Link href="/" className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-muted hover:text-ink">
          <ChevronLeft className="h-3.5 w-3.5" /> home
        </Link>
      </div>

      <h1 className="text-[24px] font-extrabold text-ink">newsletters · for review</h1>
      <p className="mt-1 text-[13px] text-ink-muted">
        newsletters submitted by educators, grouped by building. approve one to unlock its download.
      </p>

      {/* admin key gate */}
      {needsKey && (
        <div className="mt-5 rounded-card bg-brand-white p-4 shadow-card ring-1 ring-ink/5">
          <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-normal text-brand-orange">
            <KeyRound className="h-3 w-3" /> admin key needed
          </p>
          <p className="mt-1 text-[12px] text-ink-muted">
            enter the newsletter admin key to review submissions. (set once by openhouse — ask if you don&apos;t have it.)
          </p>
          <div className="mt-2 flex gap-2">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveKey()}
              placeholder="admin key"
              className="flex-1 rounded-md border border-ink/15 bg-brand-cream px-3 py-2 text-[13px] outline-none focus:border-brand-orange"
            />
            <button type="button" onClick={saveKey}
              className="rounded-md bg-brand-orange px-3 py-2 text-[12px] font-bold text-white active:scale-[0.99]">
              unlock
            </button>
          </div>
        </div>
      )}

      {!configured && (
        <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-[12px] text-amber-800 ring-1 ring-amber-200/60">
          the newsletter backend isn&apos;t configured yet — showing submissions saved on this device only. once the backend is set up (see TRACKER/NEWSLETTER setup), submissions sync across devices.
        </p>
      )}

      {loading ? (
        <p className="mt-8 text-center text-[13px] text-ink-muted">loading…</p>
      ) : grouped.length === 0 && !needsKey ? (
        <div className="mt-8 rounded-card bg-brand-white p-8 text-center text-[13px] italic text-ink-muted shadow-card ring-1 ring-ink/5">
          no newsletters have been submitted yet.
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {grouped.map(({ building, items }) => (
            <section key={building}>
              <h2 className="text-[15px] font-extrabold text-ink">{building}</h2>
              <ul className="mt-2 space-y-2">
                {items.map((s) => (
                  <li key={s.id} className="flex items-center gap-3 rounded-card bg-brand-white p-3 shadow-card ring-1 ring-ink/5">
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-bold text-ink">{s.programmeTitle} · {s.ageLabel}</p>
                      <p className="text-[11px] text-ink-muted">{humanRange(s.from, s.to)}</p>
                    </div>
                    {s.status === "approved" ? (
                      <span className="inline-flex items-center gap-1 rounded-chip bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800">
                        <CheckCircle2 className="h-3 w-3" /> approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-chip bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                        <Clock className="h-3 w-3" /> pending
                      </span>
                    )}
                    {/* review the actual newsletter first — works for
                        pending and approved (download unlocks on approval). */}
                    <Link href={`/admin/newsletters/${s.id}`}
                      className="inline-flex items-center gap-1 rounded-md bg-ink px-2.5 py-1.5 text-[11px] font-bold text-white active:scale-[0.99]">
                      {s.status === "pending" ? "review" : "open + download"}
                    </Link>
                    {s.status === "pending" && (
                      <button type="button" onClick={async () => { await approveSubmission(s.id, getAdminKey()); refresh(); }}
                        className="inline-flex items-center gap-1 rounded-md bg-brand-orange px-2.5 py-1.5 text-[11px] font-bold text-white active:scale-[0.99]">
                        <Check className="h-3 w-3" /> approve
                      </button>
                    )}
                    <button type="button" onClick={async () => { if (confirm("delete this submission?")) { await deleteSubmission(s.id, getAdminKey()); refresh(); } }}
                      className="rounded-md p-1.5 text-ink-muted transition hover:bg-red-50 hover:text-red-600" aria-label="delete">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
