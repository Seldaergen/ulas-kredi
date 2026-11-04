import { ArrowUpRight } from "lucide-react";

export default function TrustSection() {
  return <>
    <section className="ef-wrap cro-trust" aria-labelledby="cro-trust-title">
      <div className="cro-section-heading"><p className="cro-kicker">NET KAPSAM. DOĞRU BEKLENTİ.</p><h2 id="cro-trust-title">Hedef büyük.<br /><span>Hazırlık net olmalı.</span></h2><p>Danışmanlık, finans kuruluşunun kararının yerini almaz. Bizim odağımız, başvuru öncesi tabloyu anlamanıza ve hazırlık adımlarını planlamanıza yardımcı olmaktır.</p></div>
      <div className="cro-principles">
        <article><span>01 / KAPSAM</span><h3>Ücretsiz ön görüşme</h3><p>Talep konunuzu ve danışmanlık kapsamını netleştiririz. Bu aşama detaylı dosya analizi, banka işlemi veya kredi başvurusu içermez. Sonraki hizmetlerin kapsamı ve varsa ücreti, başlamadan önce ayrıca açıklanır.</p></article>
        <article><span>02 / GİZLİLİK</span><h3>Kontrol sizde kalır</h3><p>İlk görüşmede hedefinizi ve sorularınızı konuşuruz. Kimlik belgesi, kart bilgisi ve banka şifresi istemiyoruz. Hesaplayıcıya girdiğiniz tutarlar otomatik olarak bize veya WhatsApp’a aktarılmaz.</p></article>
        <article><span>03 / KARAR YETKİSİ</span><h3>Vaat değil, hazırlık</h3><p>Bir banka veya kredi veren kuruluş değiliz. Kredi onayı, limit artışı, belirli bir tutar ya da işlem süresi taahhüt etmiyoruz. Karar ve koşullar ilgili finans kuruluşunun değerlendirmesine bağlıdır.</p></article>
      </div>
    </section>
    <section id="danismanlik-sureci" className="cro-process">
      <div className="ef-wrap"><div className="cro-process-heading"><div><p className="cro-kicker">DANIŞMANLIK SÜRECİ</p><h2>Bir sonraki adımınız<br />belirsiz kalmasın.</h2></div><a href="https://wa.me/905416061356" target="_blank" rel="noopener noreferrer" className="cro-primary">WhatsApp’tan görüşün <ArrowUpRight size={18} aria-hidden="true" /></a></div>
        <ol className="cro-process-grid"><li><span>01</span><h3>Hedefinizi konuşalım</h3><p>Telefon veya WhatsApp üzerinden talep konunuzu ve yanıtını aradığınız soruları belirtin.</p></li><li><span>02</span><h3>Kapsamı netleştirelim</h3><p>Gelir, borç ve bütçe başlıklarının hazırlık sürecindeki yerini ve danışmanlık kapsamını konuşalım.</p></li><li><span>03</span><h3>Hazırlığı planlayalım</h3><p>Birlikte ilerlemeyi seçerseniz, başvuru öncesi ele alınabilecek belgeleri ve adımları belirleyelim.</p></li></ol>
        <p className="cro-process-note">Görüşme, sitede başvuru kaydı veya kredi başvurusu oluşturmaz. WhatsApp isteğe bağlı bir dış iletişim hizmetidir.</p>
      </div>
    </section>
  </>;
}
