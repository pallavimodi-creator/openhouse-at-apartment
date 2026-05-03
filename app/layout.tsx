import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterNav } from "@/components/FooterNav";
import { ReportCardReminder } from "@/components/ReportCardReminder";

export const metadata: Metadata = {
  title: "openhouse at apartment",
  description:
    "Play-based learning programmes for children — now near you.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F9F2E8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Caveat:wght@500;600;700&family=Kalam:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="mx-auto flex min-h-dvh max-w-4xl flex-col bg-bg lg:max-w-none">
          <SiteHeader />
          <main className="flex-1 pb-40">{children}</main>
        </div>
        <FooterNav />
        <ReportCardReminder />
      </body>
    </html>
  );
}
