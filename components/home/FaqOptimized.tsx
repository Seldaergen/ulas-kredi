"use client";

import { useMemo, useState } from "react";
import { ChevronDown, MessageCircle, Shield, Clock, BadgeCheck, ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/90XXXXXXXXXX"; // TODO: kendi numaranı yaz (örn: https://wa.me/905416061356)

const FAQS = [
  {
    q: "Ücretsiz ön analiz gerçekten ücretsiz mi?",
    a: "Evet. Ön analiz aşamasında ücret alınmaz. Durumunu değerlendirip en doğru yol haritasını çıkarırız.",
    icon: BadgeCheck,
  },
  {
    q: "Kredi notum düşükse yine de başvurmalı mıyım?",
    a: "Rastgele başvuru çoğu zaman puanı daha da düşürebilir. Önce neden düşük olduğunu analiz edip doğru adımlarla başvuru stratejisi belirlemek daha sağlıklı olur.",
    icon: Shield,
  },
  {
    q: "Daha önce red aldıysam tekrar başvuru işe yarar mı?",
    a: "Red nedenini anlamadan tekrar başvuru genellikle aynı sonuca gider. Red analizi yapıp başvuru zamanlaması ve banka/ürün seçimini doğru kurmak gerekir.",
    icon: Shield,
  },
  {
    q: "Ne kadar sürede dönüş alırım?",
    a: "Genellikle aynı gün içinde ön değerlendirme yapılır. Durumun karmaşıklığına göre 24–48 saat içinde net aksiyon planı çıkar.",
    icon: Clock,
  },
  {
    q: "Banka çalışanı mısınız?",
    a: "Hayır. Banka değiliz. Sizin tarafınızdayız ve amacımız gereksiz başvuruları azaltıp doğru stratejiyle ilerlemenizi sağlamak.",
    icon: Shield,
  },
  {
    q: "WhatsApp’tan yazarsam ne isteyeceksiniz?",
    a: "Sadece temel bilgiler: talebin (ihtiyaç/konut/taşıt), gelir durumu ve varsa mevcut borç/taksit bilgisi. İstersen kredi notu aralığını da paylaşabilirsin.",
    icon: MessageCircle,
  },
];

function buildFaqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: x.a,
      },
    })),
  };
}

export default function FaqOptimized() {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = useMemo(() => JSON.stringify(buildFaqJsonLd(FAQS)), []);

  return (
    <section id="sss" className="relative mx-auto max-w-6xl px-4 py-14">
      {/* ✅ SEO: FAQ schema */}
      <script type="application/ld+json" suppressHydrationWarning>
        {jsonLd}
      </script>

      <div className="mx-auto mb-8 max-w-3xl text-center">
        <p className="text-sm font-semibold tracking-wide text-primary/90">SIK SORULAN SORULAR</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Kafandaki soruları bitirelim
        </h2>
        <p className="mt-3 text-slate-600">
          En sık gelen soruları net cevapladık. Hâlâ emin değilsen ücretsiz ön analiz al.
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-3">
        {FAQS.map((item, idx) => {
          const Icon = item.icon;
          const isOpen = open === idx;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm transition hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-${idx}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={18} />
                  </div>
                  <div className="text-sm font-semibold text-slate-900 md:text-base">
                    {item.q}
                  </div>
                </div>

                <ChevronDown
                  className={`shrink-0 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`}
                  size={18}
                />
              </button>

              {isOpen ? (
                <div id={`faq-${idx}`} className="px-5 pb-5">
                  <p className="text-sm leading-relaxed text-slate-600">{item.a}</p>

                  {/* ✅ Daha sade CTA: 1 ana + 1 ikincil link */}
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href="#iletisim"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
                    >
                      Ücretsiz ön analiz al <ArrowRight size={16} />
                    </a>

                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
                    >
                      WhatsApp’tan yaz <MessageCircle size={16} />
                    </a>
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    Not: Son karar bankaya aittir. Biz doğru stratejiyi kurmana yardımcı oluruz.
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
