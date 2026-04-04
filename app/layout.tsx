import type React from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Manrope } from "next/font/google";
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
  title: {
    default: "Ulaş Kredi Danışmanlık | Türkiye Geneli Kredi Danışmanlığı",
    template: "%s | Ulaş Kredi",
  },

  description:
    "İstanbul merkezli, Türkiye genelinde kredi danışmanlığı. Kredi notu artırma, limit yükseltme ve doğru başvuru stratejisi. Ön ödemesiz hizmet.",

  metadataBase: new URL("https://ulaskredi.com.tr"),

  alternates: {
    canonical: "https://ulaskredi.com.tr",
    languages: {
      "tr-TR": "https://ulaskredi.com.tr",
    },
  },

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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Kredi notu kaç olmalı?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kredi değerlendirmesinde tek ölçüt puan değildir. Kredi notunun yanında gelir durumu, mevcut borçlar, başvuru yoğunluğu ve banka politikaları da birlikte değerlendirilir.",
        },
      },
      {
        "@type": "Question",
        name: "Kredi notu nasıl yükseltilir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kredi notunu yükseltmek için düzenli ödeme alışkanlığı, kontrollü kart kullanımı, düşük borç-limit oranı ve doğru başvuru planı önemlidir.",
        },
      },
      {
        "@type": "Question",
        name: "Kredi başvurusu neden reddedilir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kredi başvuruları; düşük finansal uygunluk, yüksek mevcut borç, yetersiz gelir uyumu, yoğun başvuru geçmişi veya banka kriterlerine uyumsuzluk nedeniyle reddedilebilir.",
        },
      },
      {
        "@type": "Question",
        name: "Kredi kartı limiti nasıl artırılır?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Limit artışı için gelir durumu, ödeme düzeni, mevcut limit kullanımı ve bankanın iç değerlendirme kriterleri birlikte etkili olur.",
        },
      },
      {
        "@type": "Question",
        name: "Borç kapatma mı yapılandırma mı daha mantıklı?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bu karar mevcut borç yüküne, aylık ödeme gücüne, toplam maliyete ve nakit akışına göre değişir. Her durum için tek bir doğru çözüm yoktur.",
        },
      },
      {
        "@type": "Question",
        name: "Kredi yapılandırma kredi notunu etkiler mi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yapılandırmanın etkisi kişinin ödeme düzenine, mevcut risk durumuna ve sonrasındaki finansal davranışına göre değişebilir.",
        },
      },
      {
        "@type": "Question",
        name: "Gelir belgesi olmadan kredi alınır mı?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kredi değerlendirmesinde gelir beyanı ve gelir doğrulaması önemli bir unsurdur. Hangi belgelerin geçerli olduğu çalışma biçimine göre değişebilir.",
        },
      },
      {
        "@type": "Question",
        name: "Aynı anda kaç bankaya başvuru yapılmalı?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kontrolsüz ve art arda yapılan çoklu başvurular olumsuz algı yaratabilir. Başvuru sürecinin planlı ve profilinize uygun yürütülmesi daha sağlıklıdır.",
        },
      },
    ],
  };

  return (
    <html lang="tr" suppressHydrationWarning className={manrope.variable}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YQNQGKTLJ8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YQNQGKTLJ8');
          `}
        </Script>

        {/* Structured Data / JSON-LD — Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessJsonLd),
          }}
        />

        {/* Structured Data / JSON-LD — FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
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
          <TopTicker />

          {/* Global Navbar */}
          <Navbar />

          {/* Finance banner */}
          <FinanceBanner />

          {/* Page content */}
          <main className="min-h-[calc(100vh-1px)]">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Mobile bottom bar */}
          <MobileBottomBar />

          {/* Floating action */}
          <FloatingAction />
        </div>
      </body>
    </html>
  );
}