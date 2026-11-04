import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kredi Danışmanlığı: Başvuru, Kredi Notu ve Borç Planı",
  description:
    "Kredi başvurusu, kredi notu, konut ve taşıt bütçesi için danışmanlık. Hazırlık adımlarını inceleyin; telefon veya WhatsApp üzerinden görüşün.",
  alternates: {
    canonical: "https://ulaskredi.com.tr/hizmetler",
  },
  openGraph: {
    images: [{ url: "https://ulaskredi.com.tr/electric-finance-og.png", width: 1200, height: 630 }],
    title: "Hizmetlerimiz | Ulaş Kredi",
    description:
      "Kredi notu, başvuru hazırlığı ve borç planlaması için danışmanlık. Kapsamı ve sık sorulan soruları inceleyin.",
    url: "https://ulaskredi.com.tr/hizmetler",
    type: "website",
  },
  twitter: {
    images: ["https://ulaskredi.com.tr/electric-finance-og.png"],
    card: "summary_large_image",
    title: "Hizmetlerimiz | Ulaş Kredi",
    description:
      "Türkiye geneli kredi danışmanlığı hizmetleri.",
  },
};

import { Services } from "@/components/services";
import Link from "next/link";
import { ConversionPanel } from "@/components/inner-page";
import { PUBLISHED_POSTS } from "@/lib/content/posts";

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <Services />
      <section className="ef-wrap ef-service-guides">
        <p><Link href="/#hesaplama">Başvurmadan önce taksit ve bütçenizi hesaplayın</Link>.</p>
        <h2>Başvuru öncesi ilgili rehberler</h2>
        <ul className="ef-related-links">{PUBLISHED_POSTS.map(post => <li key={post.slug}><Link href={`/rehber/${post.slug}`}>{post.title}</Link></li>)}</ul>
        <p>Bilgileri durumunuzla birlikte değerlendirmek için <Link href="/iletisim#iletisim">telefon veya WhatsApp üzerinden görüşün</Link>. Nihai kredi kararı bankaya aittir.</p>
      </section>
      <div className="ef-wrap"><ConversionPanel title="Hangi hizmetle başlamalısınız?" description="Durumunuzu birlikte değerlendirmek için telefon veya WhatsApp üzerinden görüşelim." /></div>
    </main>
  );
}
