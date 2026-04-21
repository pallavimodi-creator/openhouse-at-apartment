"use client";

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Swipe-to-dismiss on drag handle
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragStart.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (dragStart.current === null) return;
      const diff = e.changedTouches[0].clientY - dragStart.current;
      dragStart.current = null;
      if (diff > 100) onClose();
    },
    [onClose]
  );

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          "relative z-10 mx-auto w-full max-w-content",
          "animate-slide-up rounded-t-2xl bg-brand-white shadow-float",
          "flex max-h-[85vh] flex-col"
        )}
      >
        {/* Drag handle + close */}
        <div
          className="flex shrink-0 items-center justify-between px-5 pt-3 pb-2"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="mx-auto h-1 w-10 rounded-full bg-ink/15" />
          <button
            onClick={onClose}
            className="absolute right-4 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 transition hover:bg-ink/10"
            aria-label="close"
          >
            <X className="h-4 w-4 text-ink-muted" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
