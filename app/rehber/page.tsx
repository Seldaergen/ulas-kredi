// app/rehber/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kredi Rehberi",
  description:
    "Kredi notu, limit artırma, başvuru reddi ve yapılandırma hakkında kapsamlı rehberler. Bankacılık sistemini anlayarak daha doğru adım atın.",
  alternates: {
    canonical: "https://ulaskredi.com.tr/rehber",
  },
  openGraph: {
    title: "Kredi Rehberi | Ulaş Kredi",
    description:
      "Kredi notu, limit artırma, başvuru reddi ve yapılandırma hakkında kapsamlı rehberler.",
    url: "https://ulaskredi.com.tr/rehber",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kredi Rehberi | Ulaş Kredi",
    description:
      "Kredi notu ve başvuru süreci hakkında rehber içerikler.",
  },
};


import { Suspense } from "react";
import RehberClient from "./rehber-client";

export default function RehberPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <Suspense
        fallback={
          <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-12">
            <div className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur">
              <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-28 animate-pulse rounded-xl bg-slate-200/70"
                  />
                ))}
              </div>
            </div>
          </section>
        }
      >
        <RehberClient />
      </Suspense>
    </main>
  );
}
