import { ArrowDown, ArrowUpRight } from "lucide-react";
import { AdvisoryImage } from "./AdvisoryImage";
import { AdvisoryIcon } from "@/components/brand/advisory-icon";

export default function HeroSection() {
 return <section id="hero" className="cro-hero">
  <div className="ef-wrap cro-hero-grid">
   <div className="cro-hero-copy">
    <p className="cro-kicker"><span /> ULAŞ KREDİ / KREDİ DANIŞMANLIĞI</p>
    <h1>Yüksek limitli kredi danışmanlığında <span>yanınızdayız.</span></h1>
    <p className="cro-lead">Finansman ihtiyacınızı, gelir ve mevcut yükümlülüklerinizi değerlendirerek başvuru seçeneklerinizi ve sürecinizi birlikte planlıyoruz.</p>
    <div className="cro-actions"><a href="#iletisim" className="cro-primary">Danışmanla Görüş <ArrowUpRight size={18} aria-hidden="true" /></a><a href="tel:+905416061356" className="cro-phone"><AdvisoryIcon kind="phone" size={24} /> Hemen Ara</a></div>
    <p className="cro-hero-assurance">Finansal değerlendirme <span aria-hidden="true">·</span> Başvuru hazırlığı <span aria-hidden="true">·</span> Süreç danışmanlığı</p>
    <p className="cro-boundary">Banka veya kredi veren kuruluş değiliz. Kredi onayı, limit, faiz veya kesin sonuç garantisi verilmez. Nihai karar ilgili finans kuruluşuna aittir.</p>
    <a href="#finansman-ihtiyaci" className="cro-explore">Danışmanlık kapsamını keşfedin <ArrowDown size={15} aria-hidden="true" /></a>
   </div>
   <figure className="cro-finance-art cro-advisory-hero">
    <div className="cro-photo-stage"><div className="cro-photo-layer" aria-hidden="true" /><AdvisoryImage name="hero-advisory" alt="Finansman planının birlikte incelenmesini betimleyen temsili danışmanlık sahnesi" sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1100px) 44vw, 560px" priority /></div>
   </figure>
  </div>
 </section>;
}
