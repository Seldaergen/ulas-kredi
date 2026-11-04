// app/iletisim/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kredi Danışmanlığı İletişim: Telefon ve WhatsApp",
  description:
    "Kredi notu, başvuru hazırlığı ve borç planlaması sorularınızı Ulaş Kredi ile görüşün. Telefon: 0 541 606 13 56. WhatsApp üzerinden de iletişime geçebilirsiniz.",
  alternates: {
    canonical: "https://ulaskredi.com.tr/iletisim",
  },
  openGraph: {
    images: [{ url: "https://ulaskredi.com.tr/electric-finance-og.png", width: 1200, height: 630 }],
    title: "İletişim | Ulaş Kredi",
    description:
      "Kredi danışmanlığı için telefon ve WhatsApp üzerinden bizimle görüşün.",
    url: "https://ulaskredi.com.tr/iletisim",
    type: "website",
  },
  twitter: {
    images: ["https://ulaskredi.com.tr/electric-finance-og.png"],
    card: "summary_large_image",
    title: "İletişim | Ulaş Kredi",
    description:
      "Kredi danışmanlığı hakkında telefon ve WhatsApp üzerinden iletişime geçin.",
  },
};
import { Contact } from "@/components/contact";

export default function IletisimPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <Contact />
    </main>
  );
}
