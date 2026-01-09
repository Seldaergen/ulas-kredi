import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Çerez Politikası | Ulaş Kredi Danışmanlık",
  description:
    "Çerez politikası: kullanılan çerez türleri ve tercihler hakkında bilgilendirme.",
};

function Box({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  );
}

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-wide text-slate-500">
          YASAL
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Çerez Politikası
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Çerezler, site deneyimini iyileştirmek ve temel işlevleri sağlamak için
          kullanılabilir.
        </p>
      </div>

      <div className="grid gap-5">
        <Box title="1) Çerez Nedir?">
          <p>
            Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza
            kaydedilen küçük metin dosyalarıdır.
          </p>
        </Box>

        <Box title="2) Kullanım Amaçları">
          <ul className="list-disc pl-5">
            <li>Zorunlu çerezler (siteyi çalışır tutar)</li>
            <li>Performans/analitik (siteyi iyileştirmeye yardımcı olur)</li>
          </ul>
          <p className="text-xs text-slate-500">
            Analitik kullanımınız varsa (örn. Vercel Analytics), bu başlık
            yeterlidir. İleride daha ayrıntılı yönetim paneli eklenebilir.
          </p>
        </Box>

        <Box title="3) Çerezleri Yönetme">
          <p>
            Çerez tercihlerini tarayıcı ayarlarından kontrol edebilir,
            engelleyebilir veya silebilirsiniz.
          </p>
        </Box>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="underline underline-offset-4" href="/kvkk">
            KVKK Aydınlatma Metni
          </Link>
          <Link className="underline underline-offset-4" href="/gizlilik">
            Gizlilik Politikası
          </Link>
          <Link className="underline underline-offset-4" href="/yasal-uyari">
            Yasal Uyarı
          </Link>
        </div>
      </div>
    </main>
  );
}
