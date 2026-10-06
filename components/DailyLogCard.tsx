import { Check, X } from "lucide-react";
import type { DailyLog } from "@/lib/apartments";

/** Renders one teacher's daily log entry (done parts, skipped + reason, note). */
export function DailyLogCard({
  log,
  showTeacher = true,
  showDate = false,
}: {
  log: DailyLog;
  showTeacher?: boolean;
  showDate?: boolean;
}) {
  const done = log.entries.filter((e) => e.done);
  const skipped = log.entries.filter((e) => !e.done);
  return (
    <div className="rounded-card bg-brand-white p-4 shadow-card">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          {showTeacher && (
            <span className="text-[14px] font-extrabold lowercase text-ink">{log.teacherName}</span>
          )}
          <span className="ml-2 text-[13px] font-semibold text-ink-muted">{log.programmeTitle}</span>
        </div>
        {showDate && <span className="text-[11px] font-semibold text-ink-subtle">{log.date}</span>}
      </div>

      {done.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {done.map((e, i) => (
            <span
              key={`d${i}`}
              className="inline-flex items-center gap-1 rounded-chip bg-segment-green/15 px-2 py-0.5 text-[12px] font-semibold text-ink"
            >
              <Check className="h-3 w-3 text-segment-green" /> {e.part}
            </span>
          ))}
        </div>
      )}

      {skipped.length > 0 && (
        <div className="mt-2 space-y-1">
          {skipped.map((e, i) => (
            <div key={`s${i}`} className="flex flex-wrap items-baseline gap-1.5 text-[12px]">
              <span className="inline-flex items-center gap-1 rounded-chip bg-red-50 px-2 py-0.5 font-semibold text-red-700">
                <X className="h-3 w-3" /> {e.part}
              </span>
              {e.reason && <span className="text-ink-muted">— {e.reason}</span>}
              {e.note && <span className="text-ink-subtle">· {e.note}</span>}
            </div>
          ))}
        </div>
      )}

      {log.freeNote && (
        <p className="mt-2 rounded-lg bg-bg/50 px-3 py-2 text-[12px] text-ink-muted">{log.freeNote}</p>
      )}
    </div>
  );
}
