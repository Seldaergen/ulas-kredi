import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Ulaş Kredi Danışmanlık",
  description:
    "Gizlilik politikası: veri işleme, güvenlik, üçüncü taraf bağlantılar ve iletişim.",
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

export default function PrivacyPage() {
  const EMAIL = "info@ulaskredi.com.tr";

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-wide text-slate-500">
          YASAL
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Gizlilik Politikası
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Bu politika, sitemizi kullanırken paylaştığınız bilgilerin nasıl
          işlendiğini ve korunduğunu açıklar.
        </p>
      </div>

      <div className="grid gap-5">
        <Box title="1) Toplanan Bilgiler">
          <ul className="list-disc pl-5">
            <li>İletişim bilgileri (ad, telefon, e-posta)</li>
            <li>Mesaj içeriği (sizin paylaştığınız bilgiler)</li>
            <li>Teknik günlükler (hata/performans verileri — kişisel olmayan)</li>
          </ul>
        </Box>

        <Box title="2) Kullanım Amaçları">
          <ul className="list-disc pl-5">
            <li>Danışmanlık sürecinin yürütülmesi ve taleplerin yanıtlanması</li>
            <li>İletişim kurulması ve bilgilendirme yapılması</li>
            <li>Site güvenliği ve performansının iyileştirilmesi</li>
          </ul>
        </Box>

        <Box title="3) Güvenlik">
          <p>
            Bilgileri korumak için makul teknik ve idari önlemler uygularız.
            Ancak internet üzerinden iletimde %100 güvenlik garanti edilemez.
          </p>
          <p className="text-xs text-slate-500">
            Öneri: Mesajlarınızda banka şifresi/kart bilgisi gibi hassas veriler
            paylaşmayın.
          </p>
        </Box>

        <Box title="4) Üçüncü Taraf Bağlantılar">
          <p>
            Sitede YouTube/Instagram/TikTok gibi platformlara bağlantılar
            bulunabilir. Bu platformların gizlilik uygulamaları kendi
            politikalarına tabidir.
          </p>
        </Box>

        <Box title="5) İletişim">
          <p>
            Gizlilikle ilgili talepler için:{" "}
            <a className="underline underline-offset-4" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
        </Box>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="underline underline-offset-4" href="/kvkk">
            KVKK Aydınlatma Metni
          </Link>
          <Link className="underline underline-offset-4" href="/cerez">
            Çerez Politikası
          </Link>
          <Link className="underline underline-offset-4" href="/yasal-uyari">
            Yasal Uyarı
          </Link>
        </div>
      </div>
    </main>
  );
}
