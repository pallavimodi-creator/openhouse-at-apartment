import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] font-medium tracking-normal text-ink-muted">
        404
      </p>
      <h1 className="mt-2 text-[22px] font-semibold text-ink">
        we couldn't find that.
      </h1>
      <p className="mt-2 text-[13px] text-ink-muted">
        the page or resource may have moved.
      </p>
      <Link
        href="/"
        className="mt-5 rounded-chip bg-brand-orange px-4 py-2 text-[12px] font-medium text-brand-white"
      >
        back to home
      </Link>
    </div>
  );
}
