"use client";

import { ArrowUpRight, Flame, Shield, TrendingDown, Wallet, AlertTriangle } from "lucide-react";

const POSTS = [
  {
    title: "Kredi notu düşük olanların yaptığı 7 büyük hata",
    excerpt: "Başvuru yapmadan önce bu hataları düzeltmek kredi onay ihtimalini ciddi artırır.",
    tag: "Kredi Notu",
    icon: TrendingDown,
    href: "/rehber/kredi-notu-hatalar",
    hot: true,
  },
  {
    title: "Bankaların sana söylemediği kredi gerçeği",
    excerpt: "Aynı gelirle biri onay alırken diğeri neden red alıyor? Sistem nasıl çalışıyor?",
    tag: "Banka Stratejisi",
    icon: Shield,
    href: "/rehber/bankalarin-soylemedigi",
    hot: true,
  },
  {
    title: "Kredi başvurusu yapmadan önce 5 dakikalık kontrol listesi",
    excerpt: "Bu mini kontrol listesiyle gereksiz başvuruları ve puan düşüşünü önle.",
    tag: "Check-List",
    icon: AlertTriangle,
    href: "/rehber/basvuru-oncesi-kontrol",
  },
  {
    title: "Kredi kartı limitin kredi notunu nasıl etkiler?",
    excerpt: "Limit mi önemli, kullanım oranı mı? Basit ama çoğu kişinin yanlış bildiği konu.",
    tag: "Kredi Kartı",
    icon: Wallet,
    href: "/rehber/kredi-karti-limit-etkisi",
  },
  {
    title: "Red aldıysan hemen pes etme: red analiziyle doğru yol",
    excerpt: "Red nedenini anlamadan tekrar başvurmak aynı sonucu getirir. Doğru stratejiyi kur.",
    tag: "Red Analizi",
    icon: Shield,
    href: "/rehber/red-analizi",
  },
  {
    title: "Kredi notu nasıl hızlı toparlanır? (Gerçekçi senaryo)",
    excerpt: "Bir gecede mucize yok; ama 30–60 günde toparlayan doğru hamleler var.",
    tag: "İyileştirme",
    icon: Flame,
    href: "/rehber/kredi-notu-toparlanma",
  },
];

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
      {children}
    </span>
  );
}

export default function GuideTeaser() {
  return (
    <section id="rehber" className="relative mx-auto max-w-6xl px-4 py-14">
      <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center">
        <p className="text-sm font-semibold tracking-wide text-primary/90">
          FİNANS REHBERİ
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Bilmeden başvurma — 5 dakikada daha akıllı karar ver
        </h2>
        <p className="mt-3 text-slate-600">
          Kredi notu, başvuru stratejisi, limit ve red analizleri… Kısa, net ve tıklamalık içerikler.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <TagPill>Kredi Notu</TagPill>
          <TagPill>Banka Stratejisi</TagPill>
          <TagPill>Limit</TagPill>
          <TagPill>Red Analizi</TagPill>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p, i) => {
          const Icon = p.icon;
          return (
            <a
              key={i}
              href={p.href}
              className="group rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur
                         shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="inline-flex items-center gap-2">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                    <Icon size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-600">{p.tag}</span>
                    {p.hot ? (
                      <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
                        <Flame size={14} /> Trend
                      </span>
                    ) : null}
                  </div>
                </div>

                <ArrowUpRight className="mt-1 text-slate-400 transition group-hover:text-slate-700" size={18} />
              </div>

              <h3 className="text-base font-semibold leading-snug text-slate-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.excerpt}
              </p>

              <div className="mt-5 h-px w-full bg-slate-200/70" />

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Devamını oku <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="/rehber"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
        >
          Tüm rehberi gör
        </a>
      </div>
    </section>
  );
}
