"use client";

import { Modal } from "@/components/Modal";
import { PdfFlipbook } from "@/components/PdfFlipbook";

/**
 * Opens a PDF as an in-page, flip-through viewer (no download) inside the
 * standard bottom-sheet modal. Pass `pdf` to open; null closes it.
 */
export function PdfFlipbookModal({
  pdf,
  onClose,
}: {
  pdf: { url: string; title?: string } | null;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={pdf !== null} onClose={onClose}>
      {pdf?.title && (
        <p className="mb-3 text-center text-[15px] font-extrabold lowercase text-ink">
          {pdf.title}
        </p>
      )}
      {pdf && <PdfFlipbook pdfUrl={pdf.url} />}
    </Modal>
  );
}
