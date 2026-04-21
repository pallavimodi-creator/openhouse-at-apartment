import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="px-4 py-4 md:px-8 md:py-5">
      <Link href="/" aria-label="openhouse home" className="inline-block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/openhouse-logo.png"
          alt="openhouse"
          width={800}
          height={231}
          className="h-[44px] w-auto md:h-[56px]"
          style={{ mixBlendMode: "multiply" }}
        />
      </Link>
    </header>
  );
}
