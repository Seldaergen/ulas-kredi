import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHeader, ConversionPanel } from "@/components/inner-page";
export const metadata = pageMetadata("Süreç & Yol Haritamız", "Ücretsiz ön analizden başvuru takibine kadar süreci şeffaf şekilde öğrenin. Nihai kredi kararı ilgili finans kuruluşuna aittir.", "/nasil-calisir");
const steps=[
 ["Bizimle iletişime geçin","Telefon veya WhatsApp üzerinden talep konunuzu konuşalım. Kimlik, kart, hesap veya banka şifresi paylaşmayın."],
 ["Durumunuzu konuşalım","Gelir yapınızı, mevcut yükümlülüklerinizi ve başvuru amacınızı birlikte ele alalım. Sadece değerlendirme için gerekli bilgileri konuşalım."],
 ["Yol haritasını oluşturalım","Başvuru hazırlığını ve izlenecek adımları değerlendirelim. Banka koşulları ve kararları ilgili kuruluşun değerlendirmesine bağlıdır."],
 ["Süreci takip edelim","Danışmanla görüştüğünüz adımları takip edin. Telefon ve WhatsApp görüşmeleri sitede otomatik kayıt veya takip numarası oluşturmaz."]
];
export default function NasilCalisirPage(){return <main className="ef-inner ef-process-page"><div className="ef-wrap"><PageHeader eyebrow="SÜREÇ VE YOL HARİTASI" title="Belirsizliği azaltan, anlaşılır adımlar." description="Danışmanlık talebinden süreç takibine kadar ne olacağını bilin. Başvuru kaydı kredi onayı değildir." steps={["Telefon veya WhatsApp üzerinden görüşelim.","Birlikte hazırlık ve yol haritasını değerlendirin.","Danışmanlık adımlarını birlikte takip edin."]}/>
 <section className="ef-timeline" aria-label="Danışmanlık adımları">{steps.map(([title,description],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><div><h2>{title}</h2><p>{description}</p></div></article>)}</section>
 <div className="ef-boundary-grid"><section><p className="ef-eyebrow">ŞEFFAF BEKLENTİ</p><h2>Rehberlik sunarız.</h2><p>Finansal tablonuzu anlamlandırma, başvuru hazırlığı ve süreç hakkında bilgilendirme danışmanlığın kapsamındadır.</p><Link className="ef-text-link" href="/hizmetler">Hizmetleri inceleyin →</Link></section><section><p className="ef-eyebrow">KARAR BANKANINDIR</p><h2>Sonuç garantisi vermeyiz.</h2><p>Belirli bir kredi limiti, faiz oranı, skor artışı veya kredi onayı vaat edilmez. İlk formda belge veya kimlik numarası istenmez.</p><Link className="ef-text-link" href="/kvkk">Veri kullanımını öğrenin →</Link></section></div>
 <ConversionPanel title="İlk adımı birlikte atalım." description="Telefon veya WhatsApp üzerinden danışmanla görüşün; çevrimiçi kayıt durumunu iletişim sayfasında görebilirsiniz."/>
 <p className="ef-channel-note">Alternatif iletişim: <a href="tel:+905416061356">0 541 606 13 56</a> · <a href="mailto:info@ulaskredi.com.tr">info@ulaskredi.com.tr</a> · <a href="https://wa.me/905416061356" target="_blank" rel="noreferrer">WhatsApp</a>. Bu kanallar sitede başvuru kaydı oluşturmaz.</p>
 </div></main>;}
