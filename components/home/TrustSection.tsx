"use client";

import { ShieldCheck, Users, Banknote, Clock, Star, CheckCircle2, Info, ArrowRight } from "lucide-react";

const METRICS = [
  {
    title: "4.200+",
    desc: "Başarılı başvuru deneyimi",
    icon: Users,
  },
  {
    title: "Ücretsiz",
    desc: "Ön analiz & yol haritası",
    icon: ShieldCheck,
  },
  {
    title: "24–48 saat",
    desc: "Ortalama dönüş süresi",
    icon: Clock,
  },
  {
    title: "Şeffaf",
    desc: "Adım adım açıklama",
    icon: Banknote,
  },
];

const HOW_WE_WORK = [
  {
    title: "Rastgele başvuru yok",
    text: "Önce profilini okuruz, sonra en doğru stratejiyi çıkarırız.",
  },
  {
    title: "Hedef: ret riskini azaltmak",
    text: "Gereksiz başvurular kredi profilini yıpratabilir. Planla ilerleriz.",
  },
  {
    title: "Net, yazılı yol haritası",
    text: "Ne yapılacak, neden yapılacak, ne beklenmeli — hepsi açık.",
  },
];

const TESTIMONIALS = [
  {
    name: "A.K.",
    city: "İstanbul",
    text: "Defalarca red almıştım. Bu kez neyi yanlış yaptığımı anladım ve doğru adımla onay aldım.",
  },
  {
    name: "M.D.",
    city: "Ankara",
    text: "‘Başvur’ demediler; önce plan çıkardık. Zaman kazandım.",
  },
  {
    name: "S.Y.",
    city: "İzmir",
    text: "Ücretsiz ön analiz gerçekten işe yarıyor. Gereksiz başvurudan kurtuldum.",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
      <Star size={14} />
      {children}
    </span>
  );
}

export default function TrustSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm font-semibold tracking-wide text-primary/90">NEDEN ULAŞ KREDİ?</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Banka değiliz — sizin tarafınızdayız
        </h2>
        <p className="mt-3 text-slate-600">
          Amacımız “başvuruyu çoğaltmak” değil; doğru adımı seçip ret riskini azaltmak.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Pill>Ücretsiz ön analiz</Pill>
          <Pill>Şeffaf süreç</Pill>
          <Pill>Adım adım yol haritası</Pill>
        </div>
      </div>

      {/* METRICS */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-center backdrop-blur
                         shadow-sm transition hover:shadow-md"
            >
              <div className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={22} />
              </div>
              <div className="text-2xl font-bold text-slate-900">{m.title}</div>
              <p className="mt-1 text-sm text-slate-600">{m.desc}</p>
            </div>
          );
        })}
      </div>

      {/* HOW WE WORK (otorite bloğu) */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Nasıl çalışıyoruz?</h3>
            <p className="mt-1 text-sm text-slate-600">
              Kısa cevap: önce analiz, sonra strateji, en son başvuru.
            </p>
          </div>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {HOW_WE_WORK.map((x, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">{x.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{x.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 flex items-center gap-2 text-xs text-slate-600">
          <Info size={14} />
          Bilgilendirme: Son karar bankaya aittir. Biz süreçte doğru stratejiyi kurmaya yardımcı oluruz.
        </p>
      </div>

      {/* TESTIMONIALS */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur shadow-sm"
          >
            <p className="text-sm leading-relaxed text-slate-700">“{t.text}”</p>
            <div className="mt-4 text-sm font-semibold text-slate-900">
              {t.name} · <span className="font-normal text-slate-600">{t.city}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mx-auto mt-10 max-w-3xl text-center">
        <a
          href="#iletisim"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
        >
          Ücretsiz ön analiz al <ArrowRight size={16} />
        </a>
        <p className="mt-3 text-xs text-slate-600">
          Kısa bilgiyle başla — sana uygun yol haritasını birlikte çıkaralım.
        </p>
      </div>
    </section>
  );
}
