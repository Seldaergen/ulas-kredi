import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "Soru & Cevap",
  description:
    "Kredi notu, limit artırma, başvuru süreci ve bankacılık değerlendirmeleri hakkında sık sorulan sorular ve net cevaplar.",
  alternates: {
    canonical: "https://ulaskredi.com.tr/soru-cevap",
  },
  openGraph: {
    title: "Soru & Cevap | Ulaş Kredi",
    description:
      "Kredi süreci hakkında sık sorulan sorular ve net cevaplar.",
    url: "https://ulaskredi.com.tr/soru-cevap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soru & Cevap | Ulaş Kredi",
    description:
      "Kredi notu, limit artırma ve başvuru süreci hakkında cevaplar.",
  },
};

export const dynamic = "force-static";

export default function QaSoon() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-semibold">Soru–Cevap yakında</h1>
      <p className="mt-3 text-neutral-600 max-w-2xl">
        Daha güvenli ve hızlı bir deneyim için bu bölümü yeniden hazırlıyoruz.
        Şimdilik Kredi Rehberi içeriklerine göz atabilirsin.
      </p>

      <div className="mt-6">
        <Link
          href="/rehber"
          className="inline-flex items-center rounded-lg px-4 py-2 border"
        >
          Kredi Rehberi’ne git →
        </Link>
      </div>
    </main>
  );
}
