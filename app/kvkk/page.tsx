import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata("KVKK Aydınlatma Metni", "Kişisel veri işleme amaçları, aktarım, saklama ve haklar hakkında aydınlatma metni.", "/kvkk"),
  title: { absolute: "KVKK Aydınlatma Metni | Ulaş Kredi" },
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
            <li>Başvuru formunda ad-soyad, cep telefonu, talep konusu ve isteğe bağlı kısa not</li>
            <li>Başvuru referansı, danışmanlık takip durumu, bildirim denemeleri ve işlem tarihçesi</li>
            <li>Aydınlatma metninin sürümü ve okunduğuna ilişkin seçimin zamanı; kötüye kullanımı sınırlamak için süreli, anahtarlı özetler</li>
            <li>
              Kimlik numarası, banka şifresi, kart/hesap veya özel nitelikli veri istenmez. Not alanına bu bilgileri yazmayın.
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
            <li>Başvurunun kalıcı kaydı, yanıtlanması ve güvenli operasyonel takibi</li>
            <li>Mevzuattan doğan yükümlülüklerin yerine getirilmesi</li>
          </ul>
          <p>
            Hukuki sebepler; KVKK md. 5 kapsamında{" "}
            <em>sözleşmenin kurulması/ifası</em>, <em>meşru menfaat</em> ve{" "}
            <em>hukuki yükümlülük</em> olabilir.
          </p>
          <p>Aydınlatma metninin okunduğuna ilişkin seçim pazarlama için açık rıza değildir. Bu başvuru akışı pazarlama izni toplamaz; ayrı amaçlar ve gerekiyorsa açık rıza ayrıca değerlendirilmelidir.</p>
        </Section>

        <Section title="4) Aktarım ve Saklama">
          <p>
            Kişisel verileriniz, talebinizin karşılanması için gerekli olması
            halinde sınırlı ölçüde hizmet sağlayıcılarla (ör. barındırma/altyapı)
            paylaşılabilir.
          </p>
          <p>
            Yayıncı, kayıt hizmetini etkinleştirmeden önce veri sorumlusunu ve saklama süresini belirler; bu bilgiler gönderimden önce formda gösterilir. Kişisel alanlar şifreli saklanır. Süre dolumunda veya yetkili silme talebinde kişisel alanların ve eşleştirme özetlerinin kaldırılması için yerel yönetim işlemi çalıştırılır. Yedeklerin saklama ve imhası da veri sorumlusunun sorumluluğundadır.
          </p>
          <p>Yetkiliye gönderilen bildirim e-postası yalnız başvuru referansını taşır; ad, telefon veya not e-postaya eklenmez. WhatsApp ayrı, isteğe bağlı bir dış kanaldır; form verisi otomatik olarak WhatsApp’a aktarılmaz. Barındırma ve e-posta sağlayıcılarının yurt içi/yurt dışı aktarım koşulları üretime geçmeden değerlendirilmelidir.</p>
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
