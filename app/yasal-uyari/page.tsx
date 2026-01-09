import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Yasal Uyarı | Ulaş Kredi Danışmanlık",
  description:
    "Yasal uyarı: bilgilendirme niteliği, garanti verilmemesi ve sorumluluk sınırı.",
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

export default function LegalWarningPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-wide text-slate-500">
          YASAL
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Yasal Uyarı
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Bu sayfa, sitedeki içeriklerin kapsamını ve sorumluluk sınırını açıklar.
        </p>
      </div>

      <div className="grid gap-5">
        <Box title="1) Bilgilendirme Niteliği">
          <p>
            Sitedeki içerikler genel bilgilendirme amaçlıdır. Kredi/finansman
            koşulları bankaların politikalarına, mevzuata ve kişisel
            değerlendirmelere göre değişebilir.
          </p>
        </Box>

        <Box title="2) Garanti / Kesin Onay Yoktur">
          <p>
            Kredi onayı, limit ve şartlar ilgili finans kuruluşlarının
            değerlendirmesine tabidir. Bu sitede “kesin onay/garanti” taahhüdü
            verilmez.
          </p>
        </Box>

        <Box title="3) Danışmanlık Kapsamı">
          <p>
            Sunulan hizmet; analiz, evrak/checklist hazırlığı, başvuru stratejisi
            ve süreç rehberliği çerçevesindedir. Banka adına işlem yapılmaz.
          </p>
        </Box>

        <Box title="4) Sorumluluk Sınırı">
          <p>
            İçeriklerin kullanımından doğabilecek karar ve sonuçlar kullanıcıya
            aittir. Site, doğrudan/dolaylı zararlardan sorumlu tutulamaz.
          </p>
        </Box>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="underline underline-offset-4" href="/kvkk">
            KVKK Aydınlatma Metni
          </Link>
          <Link className="underline underline-offset-4" href="/gizlilik">
            Gizlilik Politikası
          </Link>
          <Link className="underline underline-offset-4" href="/cerez">
            Çerez Politikası
          </Link>
        </div>
      </div>
    </main>
  );
}
