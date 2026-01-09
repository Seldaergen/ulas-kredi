"use client";

import {
  Banknote,
  RefreshCcw,
  ShieldCheck,
  LineChart,
  FileSearch,
  BadgeCheck,
} from "lucide-react";

const ITEMS = [
  {
    title: "Kredi Yapılandırma",
    desc: "Mevcut borçlarını daha yönetilebilir taksite çevirme planı.",
    icon: RefreshCcw,
  },
  {
    title: "Borç Birleştirme",
    desc: "Birden fazla ödeme kalemini tek plan altında toparlama.",
    icon: Banknote,
  },
  {
    title: "Kredi Notu Yükseltme",
    desc: "Notu etkileyen kritik noktaları analiz edip aksiyon planı çıkarma.",
    icon: LineChart,
  },
  {
    title: "Red Analizi",
    desc: "Banka reddinin olası nedenlerini tespit edip doğru başvuru stratejisi kurma.",
    icon: FileSearch,
  },
  {
    title: "Konut / Taşıt Ön Değerlendirme",
    desc: "Gelir–gider dengesine göre uygun limit & taksit senaryoları.",
    icon: ShieldCheck,
  },
  {
    title: "Finansal Yol Haritası",
    desc: "Sadece kredi değil; sürdürülebilir finans yönetimi için net plan.",
    icon: BadgeCheck,
  },
];

export default function ServicesShowcase() {
  return (
    <section id="hizmetler" className="relative mx-auto max-w-6xl px-4 py-14">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm font-semibold tracking-wide text-primary/90">
          SADECE KREDİ DEĞİL
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Finansal çözüm yol haritanı birlikte çıkarıyoruz
        </h2>
        <p className="mt-3 text-slate-600">
          Başvuru göndermeden önce en doğru yolu seçmen için analiz eder, sana uygun
          planı netleştiririz.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((it, i) => {
          const Icon = it.icon;
          return (
            <div
              key={i}
              className="group rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur
                         shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                <Icon size={22} />
              </div>

              <h3 className="text-base font-semibold text-slate-900">
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {it.desc}
              </p>

              <div className="mt-4 h-px w-full bg-slate-200/70" />

              <a
                href="#iletisim"
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Ücretsiz ön analiz al →
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
