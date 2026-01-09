// app/nasil-calisir/page.tsx
import type React from "react"
import Link from "next/link"
import WhyUs from "@/components/home/WhyUs"
import {
  BadgeCheck,
  ShieldCheck,
  ClipboardCheck,
  Timer,
  Phone,
  MessageCircle,
  Mail,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Users,
  Sparkles,
  CreditCard,
  Building2,
  Scale,
  XCircle,
} from "lucide-react"

export const metadata = {
  title: "Süreç & Yol Haritamız | Ulaş Kredi Danışmanlık",
  description:
    "Ücretsiz ön analizden başvuru takibine kadar süreci şeffaf şekilde öğrenin. Kredi notu, limit, yapılandırma ve doğru banka adımları için yol haritamız.",
}

const TRUST = [
  {
    icon: BadgeCheck,
    color: "text-cyan-600",
    title: "15+ Yıl Tecrübe",
    desc: "Gerçekçi hedef, uygulanabilir strateji, sahaya dayalı yaklaşım.",
  },
  {
    icon: ShieldCheck,
    color: "text-emerald-600",
    title: "Şeffaf & Güvenli Süreç",
    desc: "Danışmanlık çerçevesinde net bilgilendirme ve doğru beklenti yönetimi.",
  },
  {
    icon: ClipboardCheck,
    color: "text-indigo-600",
    title: "Planlı Başvuru Yaklaşımı",
    desc: "Gereksiz ret riskini azaltan, adım adım ilerleyen başvuru planı.",
  },
  {
    icon: Timer,
    color: "text-amber-600",
    title: "Hızlı Ön Analiz",
    desc: "İlk görüşmede durumunuzu netleştirir, yol haritasını çıkarırız.",
  },
]

const STEPS = [
  {
    icon: ClipboardCheck,
    color: "bg-cyan-600",
    no: "01",
    title: "Ücretsiz Ön Analiz",
    desc: "Kredi notu, limit, gelir, mevcut borç ve hedefinizi netleştiririz. Gereksiz başvuruyu engeller, doğru zemini kurarız.",
    bullets: ["Mevcut durum fotoğrafı", "Hedef & risk analizi", "Uygun senaryo önerisi"],
  },
  {
    icon: Sparkles,
    color: "bg-emerald-600",
    no: "02",
    title: "Strateji & Başvuru Planı",
    desc: "Hangi bankaya, hangi ürünle, hangi sırayla başvurulacağını planlarız. Ret riskini azaltan düzenli bir rota çıkarırız.",
    bullets: ["Banka & ürün eşleşmesi", "Sıralama & zamanlama", "Evrak hazırlık kontrolü"],
  },
  {
    icon: ShieldCheck,
    color: "bg-slate-900",
    no: "03",
    title: "Başvuru & Takip",
    desc: "Başvuruyu doğru kurgular, süreci hızlandırır ve sonucu takip ederiz. Süreç boyunca net bilgilendirme sağlarız.",
    bullets: ["Başvuru adımı yönetimi", "Süreç takibi", "Sonuç & sonraki adım planı"],
  },
]

const WHO = [
  {
    icon: Users,
    title: "Limit artırmak isteyenler",
    desc: "Kart/ek kart, ihtiyaç kredisi veya nakit akışı için limit hedefi olanlar.",
  },
  {
    icon: CreditCard,
    title: "Kredi notu düşük olanlar",
    desc: "Notu toparlama adımlarıyla doğru zamanda doğru başvuru yapmak isteyenler.",
  },
  {
    icon: Building2,
    title: "Banka ürün seçimi karışanlar",
    desc: "Hangi bankaya hangi ürünle gidileceğini netleştirmek isteyenler.",
  },
  {
    icon: Scale,
    title: "Yapılandırma düşünenler",
    desc: "Mevcut borcu daha yönetilebilir senaryoya taşımak isteyenler.",
  },
]

const DOCS = [
  "Kimlik bilgisi (T.C. kimlik)",
  "Gelir belgesi (maaş bordrosu / vergi levhası vb.)",
  "Mevcut borç/ödemeler (varsa)",
  "Hedef: limit / kredi türü / vade bilgisi (kısaca)",
]

const DO_WE = [
  "Durum analizi + hedef netleştirme",
  "Banka/ürün/sıralama planı",
  "Evrak kontrol listesi ve hazırlık",
  "Başvuru sürecinde bilgilendirme ve takip",
]

const DONT_WE = [
  "Kesin onay/garanti vaadi (etik ve gerçekçi değil)",
  "Kişisel verileri gereksiz toplama / paylaşma",
  "Tek bir bankaya kör yönlendirme",
  "Gizli ücret / sürpriz süreç",
]

export default function NasilCalisirPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      {/* HERO */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-10 md:pt-12">
        <div className="relative overflow-hidden rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur md:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Şeffaf süreç • Planlı başvuru • Doğru beklenti yönetimi
            </div>

            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Süreç & Yol Haritamız
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
              Ücretsiz ön analizle başlarız, hedefinizi netleştiririz. Sonra{" "}
              <span className="font-semibold text-slate-950">
                doğru banka + doğru ürün + doğru sıralama
              </span>{" "}
              ile riski azaltan bir başvuru planı çıkarır, süreci takip ederiz.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-4">
              {TRUST.map((t) => (
                <div key={t.title} className="rounded-2xl border bg-white/90 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl border bg-white p-2">
                      <t.icon className={`h-5 w-5 ${t.color}`} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-950">{t.title}</div>
                      <div className="mt-1 text-xs text-slate-700">{t.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/iletisim"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-900"
              >
                Ücretsiz Ön Analiz Al <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="https://wa.me/905416061356"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border bg-white/90 px-5 text-sm font-semibold text-slate-950 hover:bg-white"
              >
                <MessageCircle className="h-4 w-4 text-emerald-700" />
                WhatsApp
              </a>

              <a
                href="tel:+905416061356"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border bg-white/90 px-5 text-sm font-semibold text-slate-950 hover:bg-white"
              >
                <Phone className="h-4 w-4 text-cyan-700" />
                Ara
              </a>

              <Link
                href="/soru-cevap"
                className="inline-flex h-11 items-center justify-center rounded-xl border bg-white/90 px-5 text-sm font-semibold text-slate-950 hover:bg-white"
              >
                Soru–Cevap’a Git
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-12">
        <div className="rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-lg font-semibold tracking-tight text-slate-950 md:text-xl">
            3 Adımda Net, Planlı Süreç
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Hedefe göre değişebilir ama temel yaklaşım hep aynıdır: analiz → plan → takip.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.title} className="rounded-2xl border bg-white/90 p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.color} text-white`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold text-slate-950">
                    <span className="mr-2 text-slate-500">{s.no}</span>
                    {s.title}
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-700">{s.desc}</p>

                {/* ✅ görünür bullet list */}
                <ul className="mt-4 space-y-2 text-sm text-slate-950">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={CreditCard}
              iconColor="text-cyan-700"
              title="Kredi Notu & Limit Yönetimi"
              desc="Notu yükseltmek ve limiti büyütmek için doğru kullanım + doğru zamanlama kritiktir. Plansız başvurular gereksiz ret riskini artırabilir."
            />
            <InfoCard
              icon={Scale}
              iconColor="text-indigo-700"
              title="Yapılandırma & Borç Yönetimi"
              desc="Borcu daha yönetilebilir taksite çevirmek için uygun senaryo ve doğru banka seçimi yapılır. Amaç, nakit akışını rahatlatmaktır."
            />
          </div>
        </div>
      </section>

      {/* WHO + DOCS */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 md:pb-12">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 md:text-xl">
              Kimler İçin Uygun?
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              En çok aşağıdaki durumlarda fayda sağlar.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {WHO.map((x) => (
                <div key={x.title} className="rounded-2xl border bg-white/90 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl border bg-white p-2">
                      <x.icon className="h-5 w-5 text-cyan-700" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-950">{x.title}</div>
                      <div className="mt-1 text-xs text-slate-700">{x.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border bg-white/90 p-4 text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600" />
                <p>
                  Her başvuru senaryosu bankaya ve kişisel duruma göre değişir.
                  Bu yüzden önce analiz, sonra plan prensibiyle ilerliyoruz.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 md:text-xl">
              Ön Analiz İçin Gerekli Bilgiler
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              İlk görüşmede hızlı ilerlemek için aşağıdakiler yeterlidir.
            </p>

            {/* ✅ görünür liste */}
            <ul className="mt-5 space-y-2 text-sm text-slate-950">
              {DOCS.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <FileText className="mt-0.5 h-4 w-4 text-indigo-700" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border bg-white/90 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border bg-white p-2">
                  <Mail className="h-5 w-5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-950">İletişim</div>
                  <p className="mt-1 text-xs text-slate-700">
                    En hızlı: WhatsApp. İsterseniz telefonla da görüşebiliriz.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href="https://wa.me/905416061356"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp’tan Yaz
                    </a>

                    <a
                      href="tel:+905416061356"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border bg-white/90 px-4 text-sm font-semibold text-slate-950 hover:bg-white"
                    >
                      <Phone className="h-4 w-4 text-cyan-700" />
                      Hemen Ara
                    </a>

                    <Link
                      href="/iletisim"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border bg-white/90 px-4 text-sm font-semibold text-slate-950 hover:bg-white"
                    >
                      Formu Aç <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DO / DONT */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 md:pb-12">
        <div className="rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-lg font-semibold tracking-tight text-slate-950 md:text-xl">
            Netlik: Neleri Yapıyoruz / Yapmıyoruz
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Güvenin temeli netliktir. Bu yüzden kapsamı açık yazıyoruz.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white/90 p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <h3 className="text-sm font-semibold text-slate-950">Yaptıklarımız</h3>
              </div>

              <ul className="mt-3 space-y-2 text-sm text-slate-950">
                {DO_WE.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-white/90 p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h3 className="text-sm font-semibold text-slate-950">Yapmadıklarımız</h3>
              </div>

              <ul className="mt-3 space-y-2 text-sm text-slate-950">
                {DONT_WE.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 text-rose-600" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border bg-white/90 p-4 text-sm text-slate-700">
            <div className="flex items-start gap-2">
              <Building2 className="mt-0.5 h-4 w-4 text-cyan-700" />
              <p>
                Not: Biz bankanın yerine karar veren bir “onay merkezi” değiliz. Amacımız süreci{" "}
                <span className="font-semibold text-slate-950">doğru planlamak</span> ve gereksiz riskleri azaltmaktır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <WhyUs />

      {/* FINAL CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:pb-16">
        <div className="rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <h2 className="text-lg font-semibold tracking-tight text-slate-950">
            Hazırsanız ücretsiz ön analizle başlayalım
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Durumunuzu netleştirip en doğru adımı birlikte belirleyelim.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/iletisim"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white hover:bg-cyan-700"
            >
              Ücretsiz Ön Analiz Al
            </Link>

            <a
              href="https://wa.me/905416061356"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border bg-white/90 px-5 text-sm font-semibold text-slate-950 hover:bg-white"
            >
              <MessageCircle className="h-4 w-4 text-emerald-700" />
              WhatsApp’tan Yaz
            </a>

            <a
              href="tel:+905416061356"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border bg-white/90 px-5 text-sm font-semibold text-slate-950 hover:bg-white"
            >
              <Phone className="h-4 w-4 text-cyan-700" />
              0 541 606 13 56
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoCard({
  icon: Icon,
  iconColor,
  title,
  desc,
}: {
  icon: React.ElementType
  iconColor: string
  title: string
  desc: string
}) {
  return (
    <div className="rounded-2xl border bg-white/90 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-xl border bg-white p-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
          <p className="mt-1 text-sm text-slate-700">{desc}</p>
        </div>
      </div>
    </div>
  )
}
