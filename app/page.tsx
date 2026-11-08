// app/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Yüksek Limitli Kredi Danışmanlığı | Ulaş Kredi" },
  description:
    "Yüksek limitli kredi hedefiniz için finansal durumunuzu ve başvuru hazırlığını birlikte değerlendirin. Telefon veya WhatsApp üzerinden danışmanla görüşün.",
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
import FaqOptimized from "@/components/home/FaqOptimized";
import TrustSection from "@/components/home/TrustSection";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="cro-home">
      <HeroSection />
      <TrustSection />
      <section className="ef-wrap cro-tools-section" aria-label="Finansal planlama araçları"><details className="cro-toolbox"><summary><div><span>PLANLAMA ARAÇLARI</span><h2>Taksit ve bütçenizi hesaplayın.</h2><p>Güncel oran veya kredi teklifi içermez; kendi varsayımlarınızla hesaplayın.</p></div><span className="cro-toolbox-action">Hesaplayıcıları aç <span aria-hidden="true">+</span></span></summary><CalculatorsSection /></details></section>
      <FaqOptimized />
      <section className="ef-wrap cro-guide-link" aria-label="Kredi rehberi"><div><p>Finansal kararlarınıza bilgiyle hazırlanın.</p><small>Genel bilgilendirme; kişisel değerlendirme veya teklif değildir.</small></div><div><Link href="/rehber">Kaynaklı kredi rehberlerini inceleyin ↗</Link><Link href="/videolar">Bilgilendirici videolar ↗</Link></div></section>
      <div id="basvuru"><Contact embedded /></div>
    </main>
  );
}
