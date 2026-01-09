// components/home/WhyUs.tsx
import { BadgeCheck, Fingerprint, ShieldCheck, Zap } from "lucide-react";

const WHY_US_ITEMS = [
  {
    title: "13+ yıllık kredi deneyimi",
    description:
      "İhtiyaç, konut, taşıt ve ticari kredilerde binlerce dosya analizi. Düşük puan, red geçmişi ve yüksek limit taleplerine odaklı gerçek saha tecrübesi.",
    meta: "Binlerce dosya • Çoklu kredi türü",
    icon: BadgeCheck,
  },
  {
    title: "Kişiye özel kredi stratejisi",
    description:
      "Gelir, mevcut borçlar, kredi notu ve banka davranış skoruna göre en uygun banka ve ürün kombinasyonunu belirliyoruz. Hazır şablon değil, size özel yol haritası.",
    meta: "Şablon değil • Kişisel yol haritası",
    icon: Fingerprint,
  },
  {
    title: "Ön ödeme yok, tam şeffaflık",
    description:
      "Ön analiz ve yol haritası tamamen ücretsizdir. Peşin ücret, gizli masraf veya sürpriz komisyon yoktur; süreci baştan sona açık şekilde paylaşıyoruz.",
    meta: "Ücretsiz ön analiz • Gizli masraf yok",
    icon: ShieldCheck,
  },
  {
    title: "Hızlı ön analiz ve süreç takibi",
    description:
      "Form sonrası aynı gün içinde ön değerlendirme yaparak geri dönüş sağlıyoruz. Banka başvurusu öncesi ve sonrası adımları birlikte takip ediyoruz.",
    meta: "Aynı gün dönüş • Adım adım takip",
    icon: Zap,
  },
] as const;

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      {/* soft background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/25 blur-3xl" />
        <div className="absolute -bottom-28 -right-15 h-80 w-80 rounded-full bg-sky-200/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 lg:px-0">
        <div className="mb-8 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.7rem]">
              Neden <span className="text-cyan-600">Ulaş Kredi</span> ile
              çalışmalısınız?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Bankalar dosyanıza sadece birkaç saniye içinde puan, gelir ve
              kullanım davranışlarınıza göre karar veriyor. Biz bu mekanizmayı
              yakından bildiğimiz için, başvuru öncesinde dosyanızı bu bakış
              açısıyla hazırlıyoruz.
            </p>
          </div>

          {/* optional micro-proof strip */}
          <div className="md:col-span-5">
            <div className="rounded-3xl border border-slate-100 bg-white/70 p-4 shadow-sm shadow-slate-100 backdrop-blur">
              <p className="text-xs font-semibold text-slate-900">
                Dosya hazırlığı = doğru başvuru zamanı + doğru banka seçimi
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                Hedef: gereksiz red riskini azaltmak, limit ihtiyacına uygun
                stratejiyle ilerlemek.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {WHY_US_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/60 p-5 shadow-sm shadow-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md hover:shadow-cyan-50"
              >
                {/* hover shine */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                >
                  <div className="absolute -left-24 top-0 h-full w-56 -skew-x-12 bg-linear-to-r from-transparent via-white/35 to-transparent" />
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm shadow-slate-100">
                    <Icon className="h-4.5 w-4.5 text-cyan-700" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                      {item.description}
                    </p>

                    <div className="mt-3">
                      <span className="inline-flex items-center rounded-full border border-cyan-100 bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-800">
                        {item.meta}
                      </span>
                    </div>
                  </div>
                </div>

                {/* subtle bottom accent */}
                <div
                  aria-hidden
                  className="mt-5 h-px w-full bg-linear-to-r from-transparent via-slate-200 to-transparent"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
