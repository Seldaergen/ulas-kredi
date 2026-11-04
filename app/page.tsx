// app/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Ulaş Kredi Danışmanlık | Türkiye Geneli Kredi Danışmanlığı" },
  description:
    "Kredi başvurusu öncesi kredi notu, borç ve bütçe planlaması için danışmanlık. Taksitinizi hesaplayın, rehberleri inceleyin; telefon veya WhatsApp ile görüşün.",
  alternates: {
    canonical: "https://ulaskredi.com.tr",
  },
  openGraph: {
    images: [{ url: "https://ulaskredi.com.tr/electric-finance-og.png", width: 1200, height: 630 }],
    title: "Ulaş Kredi Danışmanlık | Türkiye Geneli Kredi Danışmanlığı",
    description:
      "İstanbul merkezli, Türkiye genelinde kredi danışmanlığı hizmetleri.",
    url: "https://ulaskredi.com.tr",
    type: "website",
  },
  twitter: {
    images: ["https://ulaskredi.com.tr/electric-finance-og.png"],
    card: "summary_large_image",
    title: "Ulaş Kredi Danışmanlık",
    description:
      "Kredi notu, bütçe ve başvuru hazırlığı için danışmanlık.",
  },
};
import HeroSection from "@/components/home/HeroSection";
import QuickActions from "@/components/home/QuickActions";
import VideoSection from "@/components/home/VideoSection";
import FeaturedContent from "@/components/home/FeaturedContent";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import CalculatorsSection from "@/components/home/CalculatorsSection";
import TrustSection from "@/components/home/TrustSection";
import FaqOptimized from "@/components/home/FaqOptimized";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <HeroSection />
      <QuickActions />
      <FeaturedContent />
      <VideoSection />
      <ServicesShowcase />
      <CalculatorsSection />
      <TrustSection />
      <FaqOptimized />
      <Contact />
    </main>
  );
}
