// app/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Yüksek Limitli Kredi Danışmanlığı | Ulaş Kredi" },
  description:
    "Yüksek limitli kredi hedefiniz için gelir, borç ve finansal profilinizi birlikte değerlendirin. Başvuru hazırlığı için telefon veya WhatsApp ile görüşün.",
  alternates: {
    canonical: "https://ulaskredi.com.tr",
  },
  openGraph: {
    images: [{ url: "https://ulaskredi.com.tr/electric-finance-og.png", width: 1200, height: 630 }],
    title: "Yüksek Limitli Kredi Danışmanlığı | Ulaş Kredi",
    description:
      "Yüksek limitli kredi hedefiniz için finansal profil ve başvuru hazırlığı danışmanlığı. Nihai karar finans kuruluşuna aittir.",
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
import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import CalculatorsSection from "@/components/home/CalculatorsSection";
import TrustSection from "@/components/home/TrustSection";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="cro-home">
      <HeroSection />
      <TrustSection />
      <div id="basvuru"><Contact embedded /></div>
      <CalculatorsSection />
      <section className="ef-wrap cro-guide-link" aria-label="Kredi rehberi"><p>Karar öncesi bilgiye yer açın.</p><Link href="/rehber">Kaynaklı kredi rehberlerini inceleyin ↗</Link></section>
    </main>
  );
}
