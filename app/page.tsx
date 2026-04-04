// app/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ulaş Kredi Danışmanlık | Türkiye Geneli Kredi Danışmanlığı",
  description:
    "İstanbul merkezli, Türkiye genelinde kredi danışmanlığı. Kredi notu artırma, limit yükseltme ve doğru başvuru stratejisi. Ön ödemesiz hizmet.",
  alternates: {
    canonical: "https://ulaskredi.com.tr",
  },
  openGraph: {
    title: "Ulaş Kredi Danışmanlık | Türkiye Geneli Kredi Danışmanlığı",
    description:
      "İstanbul merkezli, Türkiye genelinde kredi danışmanlığı hizmetleri.",
    url: "https://ulaskredi.com.tr",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ulaş Kredi Danışmanlık",
    description:
      "Kredi notu, limit artırma ve doğru başvuru stratejisi.",
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
import { FloatingAction } from "@/components/floating-contact";

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
      <FloatingAction />
    </main>
  );
}
