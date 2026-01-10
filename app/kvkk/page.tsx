import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Ulaş Kredi Danışmanlık",
  description:
    "KVKK kapsamında aydınlatma metni. Kişisel veri işleme amaçları, aktarım, saklama ve haklar.",
};

function Section({
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

export default function KvkkPage() {
  const SITE = "Ulaş Kredi Danışmanlık";
  const EMAIL = "info@ulaskredi.com.tr";

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-wide text-slate-500">
          YASAL
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          KVKK Aydınlatma Metni
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”)
          kapsamında bilgilendirme amaçlıdır.
        </p>
      </div>

      <div className="grid gap-5">
        <Section title="1) Veri Sorumlusu">
          <p>
            Veri sorumlusu: <strong>{SITE}</strong>.
          </p>
          <p>
            İletişim:{" "}
            <a className="underline underline-offset-4" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
        </Section>

        <Section title="2) İşlenen Kişisel Veriler">
          <ul className="list-disc pl-5">
            <li>İletişim bilgileri (ad-soyad, telefon, e-posta)</li>
            <li>
              Mesaj içeriği (kredi talebinize ilişkin sizin paylaştığınız bilgiler)
            </li>
            <li>
              İletişim kayıtları (talebinizin takibi için görüşme/mesajlaşma
              bilgileri)
            </li>
          </ul>
          <p className="text-xs text-slate-500">
            Not: Banka hesap bilgisi/şifre gibi hassas verileri talep etmeyiz.
          </p>
        </Section>

        <Section title="3) Amaç ve Hukuki Sebep">
          <ul className="list-disc pl-5">
            <li>Ön analiz ve danışmanlık hizmeti sunulması</li>
            <li>Taleplerin yanıtlanması ve süreç bilgilendirmesi</li>
            <li>Hizmet kalitesinin geliştirilmesi</li>
            <li>Mevzuattan doğan yükümlülüklerin yerine getirilmesi</li>
          </ul>
          <p>
            Hukuki sebepler; KVKK md. 5 kapsamında{" "}
            <em>sözleşmenin kurulması/ifası</em>, <em>meşru menfaat</em> ve{" "}
            <em>hukuki yükümlülük</em> olabilir.
          </p>
        </Section>

        <Section title="4) Aktarım ve Saklama">
          <p>
            Kişisel verileriniz, talebinizin karşılanması için gerekli olması
            halinde sınırlı ölçüde hizmet sağlayıcılarla (ör. barındırma/altyapı)
            paylaşılabilir.
          </p>
          <p>
            Veriler, amaç için gerekli süreyle saklanır; mevzuat veya olası
            uyuşmazlık süreleri kapsamında daha uzun saklama gerekebilir.
          </p>
        </Section>

        <Section title="5) KVKK Kapsamındaki Haklarınız">
          <p>
            KVKK md. 11 kapsamında; bilgi talep etme, düzeltme, silme,
            işlenmeye itiraz gibi haklarınız bulunur. Taleplerinizi{" "}
            <a className="underline underline-offset-4" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>{" "}
            üzerinden iletebilirsiniz.
          </p>
        </Section>

        <div className="rounded-2xl border bg-slate-50 p-4 text-xs text-slate-600">
          Bu metin bilgilendirme amaçlıdır. Kurumsal süreçleriniz/altyapınız
          geliştikçe metin güncellenebilir.
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="underline underline-offset-4" href="/gizlilik">
            Gizlilik Politikası
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
