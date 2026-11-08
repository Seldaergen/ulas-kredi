"use client";

import { PageHeader } from "@/components/inner-page";
import { ApplicationForm } from "@/components/application-form";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* -------------------------------------------------------------------------- */
/*                              CONTACT CONSTANTS                             */
/* -------------------------------------------------------------------------- */

const PHONE_E164 = "905416061356"; // ✅ tek kaynak
const PHONE_DISPLAY = "0 541 606 13 56";
const EMAIL = "info@ulaskredi.com.tr";

const WHATSAPP_BASE = `https://wa.me/${PHONE_E164}`;
const TEL_HREF = `tel:+${PHONE_E164}`;
const MAIL_HREF = `mailto:${EMAIL}`;


/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export function Contact({ embedded = false }: { embedded?: boolean }) {
  if (embedded) return <section id="iletisim" className="cro-contact-band"><div className="ef-wrap cro-contact-layout"><div><p className="cro-kicker">İLK ADIM İLETİŞİM</p><h2>Yüksek limitli kredi hedefinizi<br />birlikte planlayalım.</h2><p>Ücretsiz ön görüşmede ihtiyacınızı ve size uygun danışmanlık kapsamını netleştirelim.</p><ol className="cro-first-call"><li><strong>İhtiyacınızı konuşalım.</strong><span>Hedefiniz, geliriniz ve mevcut ödemeleriniz hakkında genel bilgilerle başlayalım.</span></li><li><strong>Telefon veya WhatsApp ile ulaşın.</strong><span>Arayabilir veya görüşmek istediğiniz konuyu mesajla iletebilirsiniz. Kimlik, kart ya da banka şifresi paylaşmayın.</span></li><li><strong>Sonraki adımı birlikte belirleyelim.</strong><span>Devam etmek isterseniz değerlendirme ve başvuru hazırlığının kapsamı, varsa ücreti ile birlikte açıklanır. Ön görüşme kredi başvurusu veya onay değildir.</span></li></ol><a href="/hizmetler">Hizmet kapsamını inceleyin ↗</a></div><div className="cro-contact-panel"><ApplicationForm channel="CONTACT_FORM" /></div></div></section>;

  return (
    <section id="iletisim" className="ef-inner ef-contact-page">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader headingLevel={embedded ? 2 : 1} eyebrow="İLETİŞİM" title="İlk adım: sizi anlayalım." description="Kredi notu, başvuru hazırlığı veya borç planlaması: görüşmede destek istediğiniz konuyu ve sorularınızı belirtin. Telefon veya WhatsApp üzerinden iletişime geçin." action="İletişim seçeneklerine geçin" href="#iletisim-form" />
        <div className="ef-contact-grid">
          {/* LEFT – INFO */}
          <div className="ef-contact-info space-y-6">
            <Card className="border-sky-500/30 shadow-md">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15">
                  <MapPin className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Merkez</h3>
                  <p className="text-slate-800">İstanbul</p>
                  <p className="text-sm text-muted-foreground">
                    Türkiye geneli online danışmanlık
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="transition hover:shadow-lg">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
                  <Phone className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Telefon</h3>
                  <a
                    href={TEL_HREF}
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Hafta içi 09:00 – 18:00
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="transition hover:shadow-lg">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15">
                  <Mail className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">E-posta</h3>
                  <a
                    href={MAIL_HREF}
                    className="underline-offset-4 hover:underline"
                  >
                    {EMAIL}
                  </a>
                  <p className="text-sm text-muted-foreground">Dönüş süresi talebe göre değişir</p>
                </div>
              </CardContent>
            </Card>

            <Button
              asChild
              size="lg"
              className="w-full gap-2 bg-linear-to-r from-emerald-500 to-sky-500 text-white shadow-lg hover:shadow-xl"
            >
              <a href={WHATSAPP_BASE} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-5 w-5" />
              WhatsApp’tan Direkt Yaz</a>
            </Button>

            <div className="flex items-start gap-2 rounded-xl border bg-white/60 px-4 py-3 text-sm text-muted-foreground backdrop-blur">
              <ShieldCheck className="mt-0.5 h-4 w-4" />
              <span>
                Telefon ve WhatsApp bağlantıları sitede başvuru kaydı oluşturmaz. WhatsApp ayrı ve isteğe bağlı bir dış iletişim kanalıdır.
              </span>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <Card id="iletisim-form" className="ef-contact-form shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <h2 className="ef-form-heading">Danışmanlık talebiniz</h2>
              <ApplicationForm channel="CONTACT_FORM" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
