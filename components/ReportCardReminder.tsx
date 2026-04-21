"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

const INITIAL_DELAY = 5 * 60 * 1000; // 5 minutes
const INTERVALS = [15 * 60 * 1000, 30 * 60 * 1000]; // 15 min, then 30 min

export function ReportCardReminder() {
  const [visible, setVisible] = useState(false);

  const scheduleReminder = useCallback((delay: number) => {
    const timer = setTimeout(() => setVisible(true), delay);
    return timer;
  }, []);

  useEffect(() => {
    // Check sessionStorage for dismiss history
    const stored = sessionStorage.getItem("oh-reminder");
    const state = stored ? JSON.parse(stored) : { dismissCount: 0 };

    let delay: number;
    if (state.dismissCount === 0) {
      delay = INITIAL_DELAY;
    } else if (state.dismissCount <= INTERVALS.length) {
      delay = INTERVALS[state.dismissCount - 1];
    } else {
      delay = INTERVALS[INTERVALS.length - 1];
    }

    const timer = scheduleReminder(delay);
    return () => clearTimeout(timer);
  }, [scheduleReminder]);

  const dismiss = () => {
    setVisible(false);
    const stored = sessionStorage.getItem("oh-reminder");
    const state = stored ? JSON.parse(stored) : { dismissCount: 0 };
    state.dismissCount += 1;
    state.lastShownAt = Date.now();
    sessionStorage.setItem("oh-reminder", JSON.stringify(state));

    // Schedule next appearance
    const nextDelay =
      state.dismissCount <= INTERVALS.length
        ? INTERVALS[state.dismissCount - 1]
        : INTERVALS[INTERVALS.length - 1];
    setTimeout(() => setVisible(true), nextDelay);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-6">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative flex items-start gap-3 rounded-card border-2 border-brand-orange bg-brand-white p-5 shadow-float animate-slide-up max-w-[340px]">
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-ink">
            report card reminder
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
            after every month of classes (sessions 8, 16, 24, 32, 40, 48), a
            report card is due. please share it with the child's parent.
          </p>
        </div>
        <button
          onClick={dismiss}
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/5 transition hover:bg-ink/10"
          aria-label="dismiss reminder"
        >
          <X className="h-3.5 w-3.5 text-ink-muted" />
        </button>
      </div>
    </div>
  );
}
