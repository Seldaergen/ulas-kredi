import type React from "react";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { AppearanceProvider } from "@/components/theme-controls";

// Global shell bileşenleri
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MobileBottomBar } from "@/components/mobile-bottom-bar";
import { FloatingAction } from "@/components/floating-contact";

// Banner / Ticker



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
  title: {
    default: "Ulaş Kredi Danışmanlık | Türkiye Geneli Kredi Danışmanlığı",
    template: "%s | Ulaş Kredi",
  },

  description:
    "İstanbul merkezli, Türkiye genelinde kredi danışmanlığı. Kredi notu artırma, limit yükseltme ve doğru başvuru stratejisi. Ön ödemesiz hizmet.",

  metadataBase: new URL("https://ulaskredi.com.tr"),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Ulaş Kredi Danışmanlık | Türkiye Geneli Kredi Danışmanlığı",
    description:
      "İstanbul merkezli Türkiye geneli kredi danışmanlığı. Limit artırma ve doğru başvuru stratejisi.",
    url: "https://ulaskredi.com.tr",
    siteName: "Ulaş Kredi Danışmanlık",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/electric-finance-og.png",
        width: 1200,
        height: 630,
        alt: "Ulaş Kredi Danışmanlık",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ulaş Kredi Danışmanlık",
    description:
      "Türkiye geneli kredi danışmanlığı. Kredi notu ve limit artırma.",
    images: ["/electric-finance-og.png"],
  },

  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
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
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Ulaş Kredi Danışmanlık",
    url: "https://ulaskredi.com.tr",
    description:
      "İstanbul merkezli, Türkiye genelinde kredi danışmanlığı hizmetleri.",
    areaServed: {
      "@type": "Country",
      name: "Turkey",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+905416061356",
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["Turkish"],
      email: "info@ulaskredi.com.tr",
    },
    email: "info@ulaskredi.com.tr",
    telephone: "+905416061356",
  };



  return (
    <html lang="tr" suppressHydrationWarning className={manrope.variable}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <AppearanceProvider>
        {/* Analytics remains disabled until the consent flow and provider review are approved. */}

        {/* Structured Data / JSON-LD — Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessJsonLd),
          }}
        />

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


          {/* Global Navbar */}
          <Navbar />

          {/* Finance banner */}


          {/* Page content */}
          <main className="min-h-[calc(100vh-1px)]">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Mobile bottom bar */}
          <MobileBottomBar />

          {/* Floating action */}
          <FloatingAction />
        </div>
        </AppearanceProvider>
      </body>
    </html>
  );
}
