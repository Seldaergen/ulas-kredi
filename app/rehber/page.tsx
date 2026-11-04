// app/rehber/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kredi Rehberi",
  description:
    "Kredi notu, banka iç skoru, kredi maliyeti ve yapılandırma hakkında kaynaklı rehberler. Başvuru öncesi sorularınızı ve toplam geri ödemeyi netleştirin.",
  alternates: {
    canonical: "https://ulaskredi.com.tr/rehber",
  },
  openGraph: {
    images: [{ url: "https://ulaskredi.com.tr/electric-finance-og.png", width: 1200, height: 630 }],
    title: "Kredi Rehberi | Ulaş Kredi",
    description:
      "Kredi notu, banka iç skoru, toplam kredi maliyeti ve yapılandırma hakkında kaynaklı açıklamalar.",
    url: "https://ulaskredi.com.tr/rehber",
    type: "website",
  },
  twitter: {
    images: ["https://ulaskredi.com.tr/electric-finance-og.png"],
    card: "summary_large_image",
    title: "Kredi Rehberi | Ulaş Kredi",
    description:
      "Kredi notu ve başvuru süreci hakkında rehber içerikler.",
  },
};


import RehberClient from "./rehber-client";

export default async function RehberPage({ searchParams }: { searchParams: Promise<{ q?: string | string[]; topic?: string | string[] }> }) {
  const params = await searchParams;
  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <RehberClient query={typeof params.q === "string" ? params.q : ""} topic={typeof params.topic === "string" ? params.topic : null} />
    </main>
  );
}
