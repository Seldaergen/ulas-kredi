import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "Kredi notu analizi, limit artırma, başvuru stratejisi ve borç yapılandırma. İstanbul merkezli, Türkiye genelinde ön ödemesiz kredi danışmanlığı hizmetleri.",
  alternates: {
    canonical: "https://ulaskredi.com.tr/hizmetler",
  },
  openGraph: {
    title: "Hizmetlerimiz | Ulaş Kredi",
    description:
      "Kredi notu analizi, limit artırma, başvuru stratejisi ve borç yapılandırma hizmetleri.",
    url: "https://ulaskredi.com.tr/hizmetler",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hizmetlerimiz | Ulaş Kredi",
    description:
      "Türkiye geneli kredi danışmanlığı hizmetleri.",
  },
};

import { Services } from "@/components/services";

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <Services />
    </main>
  );
}
