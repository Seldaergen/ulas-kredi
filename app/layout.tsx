import type React from "react";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Global shell bileşenleri
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MobileBottomBar } from "@/components/mobile-bottom-bar";
import { FloatingAction } from "@/components/floating-contact";

// Banner / Ticker
import TopTicker from "@/components/top-ticker";
import FinanceBanner from "@/components/finance-banner";

/* -------------------------------------------------------------------------- */
/*                                FONT SETUP                                  */
/* -------------------------------------------------------------------------- */

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

/* -------------------------------------------------------------------------- */
/*                                  META                                      */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Ulaş Kredi Danışmanlık | Kredi Notu ve Yüksek Limit Danışmanlığı",
  description:
    "15+ yıl deneyim, 25+ banka ağı ve ön ödemesiz danışmanlık ile kredi limitinizi ve finansal profilinizi güçlendiriyoruz.",
};

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
};

/* -------------------------------------------------------------------------- */
/*                                ROOT LAYOUT                                 */
/* -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning className={manrope.variable}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <div className="relative min-h-screen overflow-x-hidden">
          {/* Ultra-soft global background */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10
              bg-[radial-gradient(circle_at_20%_12%,rgba(2,132,199,0.07),transparent_62%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10
              bg-[radial-gradient(circle_at_80%_40%,rgba(16,185,129,0.05),transparent_60%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10
              bg-[linear-gradient(to_bottom,rgba(255,255,255,0.75),transparent,rgba(255,255,255,0.65))]"
          />

          {/* Top ticker */}
          <TopTicker />

          {/* Global Navbar */}
          <Navbar />

          {/* Finance banner */}
          <FinanceBanner />

          {/* Page content */}
          <main className="min-h-[calc(100vh-1px)]">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Mobile bottom bar */}
          <MobileBottomBar />

          {/* ✅ GLOBAL Floating Action (Scroll-to-top dahil) */}
          <FloatingAction />

          {/* Analytics */}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
