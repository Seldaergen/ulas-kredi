"use client";

import Image from "next/image";
import Link from "next/link";
import type React from "react";
import {
  Banknote,
  Home,
  Car,
  TrendingUp,
  Rocket,
  ShieldCheck,
  BadgeCheck,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  MessageCircle,
  ClipboardCheck,
  Timer,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* -------------------------------------------------------------------------- */
/*                              CONTACT CONSTANTS                             */
/* -------------------------------------------------------------------------- */

const PHONE_E164 = "905416061356"; // ✅ tek kaynak
const PHONE_DISPLAY = "0 541 606 13 56";

const WHATSAPP = `https://wa.me/${PHONE_E164}`;
const PHONE = `tel:+${PHONE_E164}`;

/* -------------------------------------------------------------------------- */
/*                                   UI                                       */
/* -------------------------------------------------------------------------- */

type Tone = "cyan" | "emerald" | "amber" | "indigo" | "rose";

function toneStyles(tone: Tone) {
  switch (tone) {
    case "cyan":
      return {
        chip: "bg-sky-50 text-sky-700 ring-sky-200/70",
        icon: "bg-linear-to-br from-cyan-500 to-sky-600 text-white",
        glow: "bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.22),transparent_60%)]",
      };
    case "emerald":
      return {
        chip: "bg-emerald-50 text-emerald-700 ring-emerald-200/70",
        icon: "bg-linear-to-br from-emerald-500 to-teal-600 text-white",
        glow: "bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.18),transparent_60%)]",
      };
    case "amber":
      return {
        chip: "bg-amber-50 text-amber-700 ring-amber-200/70",
        icon: "bg-linear-to-br from-amber-500 to-orange-600 text-white",
        glow: "bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.18),transparent_60%)]",
      };
    case "indigo":
      return {
        chip: "bg-indigo-50 text-indigo-700 ring-indigo-200/70",
        icon: "bg-linear-to-br from-indigo-500 to-sky-600 text-white",
        glow: "bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.16),transparent_60%)]",
      };
    case "rose":
      return {
        chip: "bg-rose-50 text-rose-700 ring-rose-200/70",
        icon: "bg-linear-to-br from-rose-500 to-pink-600 text-white",
        glow: "bg-[radial-gradient(circle_at_30%_20%,rgba(244,63,94,0.14),transparent_60%)]",
      };
  }
}

function SectionTitle(props: {
  eyebrow?: string;
  title: string;
  desc?: string;
  center?: boolean;
}) {
  const { eyebrow, title, desc, center } = props;
  return (
    <div className={cn("flex flex-col gap-2", center && "text-center items-center")}>
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-wide text-primary/90">
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          "text-2xl font-bold tracking-tight text-foreground sm:text-3xl",
          center && "max-w-3xl"
        )}
      >
        {title}
      </h2>

      {desc ? (
        <p
          className={cn(
            "mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base",
            center && "max-w-3xl"
          )}
        >
          {desc}
        </p>
      ) : null}

      <div className={cn("mt-3 h-0.5 w-12 rounded bg-slate-300", center && "mx-auto")} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const services = [
  {
    tone: "cyan" as const,
    icon: Banknote,
    tag: "İhtiyaç",
    title: "İhtiyaç Kredisi Danışmanlığı",
    description:
      "Hedef tutar/vade planı, başvuru stratejisi ve evrak hazırlığı konusunda rehberlik sunarız.",
    bullets: ["Hedef belirleme", "Başvuru sırası", "Evrak/checklist"],
    imageSrc: "/illustrations/ihtiyac.webp",
  },
  {
    tone: "indigo" as const,
    icon: Home,
    tag: "Konut",
    title: "Konut Kredisi Danışmanlığı",
    description:
      "Uygun hedef planı, başvuru adımları ve süreç rehberliği ile daha kontrollü ilerlersiniz.",
    bullets: ["Vade-tutar planı", "Süreç rehberliği", "Hata azaltma"],
    imageSrc: "/illustrations/konut.webp",
  },
  {
    tone: "amber" as const,
    icon: Car,
    tag: "Araç",
    title: "Araç Kredisi Danışmanlığı",
    description:
      "Araç alımlarında doğru hedef ve doğru zamanlama ile başvuru planınızı kurarız.",
    bullets: ["Doğru hedef", "Doğru zaman", "Doğru başvuru"],
    imageSrc: "/illustrations/arac.webp",
  },
  {
    tone: "emerald" as const,
    icon: TrendingUp,
    tag: "Not & Limit",
    title: "Kredi Notu & Limit İyileştirme Planı",
    description:
      "Etkileyen faktörleri analiz eder, 30/60/90 günlük uygulanabilir bir plan hazırlarız.",
    bullets: ["Analiz", "Plan", "Takip"],
    imageSrc: "/illustrations/not-limit.webp",
  },
  {
    tone: "rose" as const,
    icon: Rocket,
    tag: "Yüksek Limit",
    title: "Yüksek Limit Danışmanlığı",
    description:
      "Dosya hazırlığı, hedef planlama ve başvuru stratejisi ile riskli adımları azaltırız.",
    bullets: ["Dosya hazırlığı", "Strateji", "Süreç rehberliği"],
    imageSrc: "/illustrations/yuksek-limit.webp",
  },
] as const;

const trust = [
  {
    icon: BadgeCheck,
    title: "15+ Yıl Tecrübe",
    desc: "Gerçekçi hedef, uygulanabilir strateji, sahaya dayalı yaklaşım.",
    color: "text-sky-700 bg-sky-100",
  },
  {
    icon: ShieldCheck,
    title: "Şeffaf & Güvenli Süreç",
    desc: "Danışmanlık çerçevesinde net bilgilendirme ve doğru beklenti yönetimi.",
    color: "text-emerald-700 bg-emerald-100",
  },
  {
    icon: ClipboardCheck,
    title: "Planlı Başvuru Yaklaşımı",
    desc: "Gereksiz ret riskini azaltan, adım adım ilerleyen başvuru planı.",
    color: "text-indigo-700 bg-indigo-100",
  },
  {
    icon: Timer,
    title: "Hızlı Ön Analiz",
    desc: "İlk görüşmede durumunuzu netleştirir, yol haritasını çıkarırız.",
    color: "text-amber-700 bg-amber-100",
  },
] as const;

const faqs = [
  {
    q: "Siz bankada işlem yapıyor musunuz?",
    a: "Hayır. Banka işlemlerini sizin adınıza yürütmeyiz. Analiz, strateji, evrak hazırlığı ve süreç rehberliği sunarız.",
  },
  {
    q: "Kesin onay / garanti veriyor musunuz?",
    a: "Hayır. Kredi kararı bankaya aittir. Amacımız, daha doğru planlama ile hatalı adımları azaltmaktır.",
  },
  {
    q: "Hangi bilgiler gerekli?",
    a: "Minimum bilgiyle ilerleriz. Hangi verilerin gerekli olduğunu ilk görüşmede birlikte netleştiririz.",
  },
  {
    q: "Kimler daha çok fayda görür?",
    a: "Kredi notu/limit belirsizliği yaşayanlar, doğru bankayı seçemeyenler ve temiz bir başvuru planı kurmak isteyenler.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                              SEO: FAQ JSON-LD                              */
/* -------------------------------------------------------------------------- */

function FAQJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function SmallStat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <p className="text-lg font-bold text-slate-900">{k}</p>
      <p className="text-sm text-slate-600">{v}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export function Services() {
  return (
    <section className="py-10 sm:py-14">
      <FAQJsonLd />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur sm:p-10">
          <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.10),transparent_55%)]" />

          <p className="text-xs font-semibold tracking-wide text-primary/90">
            KREDİ DANIŞMANLIĞI HİZMETLERİ
          </p>

          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Kurumsal, güvenli ve planlı kredi danışmanlığı.
          </h1>

          <p className="mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Ulaş Kredi; kredi notu, limit ve başvuru sürecinizi anlaşılır hale getirir.
            Kredi kararı bankaya aittir; biz analiz ve rehberlik ile hatalı adımları
            azaltmaya odaklanırız.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={PHONE}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95"
            >
              <PhoneCall className="h-4 w-4" />
              Hemen Ara
            </a>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp’tan Yaz
            </a>

            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/60 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-white"
            >
              Ücretsiz Ön Analiz <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["15+ yıl tecrübe", "Şeffaf yaklaşım", "Analiz + rehberlik"].map((t) => (
              <div
                key={t}
                className="flex items-center gap-2 rounded-2xl border bg-white/70 px-4 py-3 text-sm font-medium text-slate-700"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {t}
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            Not: Kredi onayı ve nihai karar bankaya aittir. Bu sayfa danışmanlık/bilgilendirme amaçlıdır.
          </p>
        </div>

        {/* SERVICES */}
        <div className="mt-12">
          <SectionTitle
            eyebrow="HİZMETLER"
            title="Konuya göre uzman destek"
            desc="Her hizmet için ayrı yaklaşım: analiz + plan + süreç rehberliği."
          />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              const st = toneStyles(s.tone);

              return (
                <Card
                  key={s.title}
                  className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                      st.glow
                    )}
                  />

                  <div className="relative h-36 w-full overflow-hidden">
                    <Image
                      src={s.imageSrc}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/0 to-black/0" />
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm",
                            st.icon
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>

                        <div>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1",
                              st.chip
                            )}
                          >
                            {s.tag}
                          </span>

                          <CardTitle className="mt-2 text-lg">{s.title}</CardTitle>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
                        <Sparkles className="h-3.5 w-3.5" />
                        Planlı
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex gap-2">
                      <Link
                        href="/iletisim"
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95"
                      >
                        Ücretsiz ön analiz
                      </Link>
                      <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:shadow-md"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Not: Kredi onayı ve nihai karar bankaya aittir. Sunulan hizmet danışmanlık/bilgilendirme kapsamındadır.
          </p>
        </div>

        {/* TRUST */}
        <div className="mt-12">
          <SectionTitle
            eyebrow="GÜVEN"
            title="Neden Ulaş Kredi?"
            desc="Kurumsal dil, doğru beklenti yönetimi ve planlı süreç yaklaşımı."
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SmallStat k="15+ yıl" v="Saha tecrübesi" />
            <SmallStat k="Net plan" v="Adım adım yol haritası" />
            <SmallStat k="Şeffaf süreç" v="Doğru beklenti yönetimi" />
            <SmallStat k="Hızlı ön analiz" v="Kısa sürede netleşme" />
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ring-black/5",
                        "transition-transform group-hover:scale-[1.03]",
                        item.color
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* persuasion band */}
          <div className="mt-8 overflow-hidden rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-primary/90">
                  NEDEN ULAŞ KREDİ?
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                  Kredi sürecini anlaşılır hale getirip, hatalı adımları azaltmaya odaklanırız.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Banka kararı bankaya aittir. Biz; hedef belirleme, evrak hazırlığı ve
                  başvuru stratejisiyle daha kontrollü bir süreç yürütmenize yardımcı oluruz.
                </p>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {[
                    "Kısa ön değerlendirme",
                    "Uygulanabilir başvuru planı",
                    "Şeffaf bilgilendirme",
                    "Danışmanlık çerçevesinde süreç rehberliği",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-xs text-slate-500">
                  Not: Kredi onayı ve nihai karar bankaya aittir. Bu içerik danışmanlık/bilgilendirme amaçlıdır.
                </p>
              </div>

              <div className="w-full rounded-2xl border bg-slate-50 p-5 sm:w-90">
                <p className="text-sm font-bold text-slate-900">Ücretsiz Ön Analiz</p>
                <p className="mt-1 text-sm text-slate-600">
                  10 dakikada durumunu netleştirelim. Sonra sana uygun yol haritasını çıkaralım.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95"
                  >
                    Formu doldur
                  </Link>

                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
                  >
                    WhatsApp’tan yaz
                  </a>

                  <a
                    href={PHONE}
                    className="inline-flex items-center justify-center rounded-full border bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
                  >
                    Hemen ara: {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-12">
          <SectionTitle
            eyebrow="SÜREÇ"
            title="Nasıl çalışıyoruz?"
            desc="Hızlı ön analiz → net yol haritası → kontrollü başvuru planı."
          />

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {[
              {
                t: "1) Ön değerlendirme",
                d: "Hedefinizi, mevcut durumunuzu ve riskleri hızlıca netleştiririz.",
              },
              {
                t: "2) Strateji & hazırlık",
                d: "Evrak/checklist ve başvuru sırası planını birlikte oluştururuz.",
              },
              {
                t: "3) Süreç rehberliği",
                d: "Başvuru adımlarında bilgilendirerek hatalı adımları azaltırız.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <SectionTitle
            eyebrow="SSS"
            title="Sık sorulan sorular"
            desc="Net cevap, doğru beklenti. Güvenin temelini bu oluşturur."
          />

          <div className="mt-6 grid gap-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-3xl border bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-slate-900">{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-12 overflow-hidden rounded-3xl border bg-slate-900 p-7 text-white shadow-sm sm:p-10">
          <p className="text-xs font-semibold tracking-wide text-white/80">ÜCRETSİZ ÖN ANALİZ</p>
          <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
            10 dakikada yol haritası: doğru hedef, doğru sıra, doğru adım.
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
            Kısa bir ön değerlendirme ile durumunuzu netleştirelim. Sonra size uygun stratejiyi adım adım çıkaralım.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:opacity-95"
            >
              Ücretsiz ön analiz formu
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/15"
            >
              WhatsApp’tan yaz
            </a>
            <a
              href={PHONE}
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/15"
            >
              Hemen ara
            </a>
          </div>

          <p className="mt-5 text-xs text-white/60">
            Not: Kredi kararı bankaya aittir. Bu sayfadaki içerikler danışmanlık/bilgilendirme amaçlıdır.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Services;
