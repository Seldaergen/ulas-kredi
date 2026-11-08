import Link from "next/link";
const faqs = [
 {q:"Ulaş Kredi’den doğrudan kredi kullanabilir miyim?",a:"Hayır. Ulaş Kredi bir banka veya kredi veren kuruluş değildir. Finansal durum değerlendirmesi, finansman seçeneklerinin incelenmesi, başvuru hazırlığı ve süreç danışmanlığı sunar. Kredi başvurusu ve kararı ilgili finans kuruluşunun kendi sürecine tabidir."},
 {q:"Yüksek limit veya kredi onayı garanti ediliyor mu?",a:"Hayır. Belirli bir limit, faiz, işlem süresi veya sonuç garanti edilmez. Geliriniz, borçlarınız ve finans kuruluşunun değerlendirme koşulları sonucu etkiler."},
 {q:"Ücretsiz ön görüşme neleri kapsıyor?",a:"İhtiyacınızı, sorularınızı ve danışmanlık kapsamını konuşmayı kapsar. Detaylı dosya analizi, banka işlemi veya kredi başvurusu bu aşamaya dahil değildir. İlave hizmetlerin kapsamı ve varsa ücreti başlamadan önce ayrıca açıklanır."},
 {q:"İlk görüşmede hangi bilgileri paylaşmalıyım?",a:"Öncelikle danışmanlık konunuzu ve sorularınızı belirtin. Kimlik belgesi, kart bilgisi, hesap veya banka şifresi paylaşmayın. Hesaplayıcıya girdiğiniz tutarlar bize veya WhatsApp’a otomatik aktarılmaz."},
 {q:"Web sitesinden çevrimiçi başvuru yapabilir miyim?",a:"Çevrimiçi başvuru kaydı şu anda kapalıdır. Telefon veya WhatsApp üzerinden iletişime geçebilirsiniz. Bu bağlantılar sitede başvuru kaydı veya takip numarası oluşturmaz. WhatsApp isteğe bağlı bir dış hizmettir."},
];
export default function FaqOptimized(){
 const schema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))};
 return <section id="danismanlik-sorulari" className="cro-faq ef-wrap" aria-labelledby="cro-faq-title"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/><div><p className="cro-kicker">AKLINIZDA SORU KALMASIN</p><h2 id="cro-faq-title">Karar vermeden önce<br />bilmeniz gerekenler.</h2><p>Danışmanlığın kapsamı, ücretlendirme ve iletişim hakkında açık cevaplar.</p><Link href="/soru-cevap">Diğer soruları inceleyin ↗</Link></div><div className="cro-faq-list">{faqs.map((f,i)=><details key={f.q} open={i===0}><summary>{f.q}<span aria-hidden="true">+</span></summary><p>{f.a}</p></details>)}</div></section>;
}
