// app/iletisim/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Ücretsiz ön analiz için bizimle iletişime geçin. WhatsApp veya iletişim kanalları üzerinden hızlı dönüş alın.",
  alternates: {
    canonical: "https://ulaskredi.com.tr/iletisim",
  },
  openGraph: {
    title: "İletişim | Ulaş Kredi",
    description:
      "Ücretsiz ön analiz için WhatsApp üzerinden hızlıca iletişime geçin.",
    url: "https://ulaskredi.com.tr/iletisim",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim | Ulaş Kredi",
    description:
      "WhatsApp ve iletişim kanalları üzerinden hızlı dönüş alın.",
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
