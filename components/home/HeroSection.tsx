import Link from "next/link";
import { ArrowDown, ArrowUpRight, Phone } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="cro-hero">
      <div className="ef-wrap cro-hero-grid">
        <div className="cro-hero-copy">
          <p className="cro-kicker"><span /> YÜKSEK LİMİTLİ KREDİ DANIŞMANLIĞI</p>
          <h1>Yüksek Limitli Kredi Hedefinize <span>Stratejik Danışmanlık</span></h1>
          <p className="cro-lead">Gelir durumunuzu, mevcut borçlarınızı ve finansal profilinizi birlikte değerlendiriyoruz. Yüksek limitli kredi hedefiniz için başvuru hazırlığını ve izlenebilecek adımları planlamanıza yardımcı oluyoruz.</p>
          <div className="cro-actions">
            <a href="#iletisim" className="cro-primary">Yüksek Limit Danışmanlığı Al <ArrowUpRight size={19} aria-hidden="true" /></a>
            <a href="tel:+905416061356" className="cro-phone"><Phone size={17} aria-hidden="true" /> 0 541 606 13 56</a>
          </div>
          <p className="cro-boundary">Banka değiliz. Kredi onayı, limit artışı veya belirli bir tutar garanti edilmez. Nihai karar ilgili finans kuruluşuna aittir.</p>
          <a href="#danismanlik-sureci" className="cro-explore">Önce nasıl çalıştığımızı inceleyin <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
        <div className="cro-dossier" aria-label="Danışmanlık kapsamı: finansal profil, başvuru hazırlığı ve yol haritası">
          <div className="cro-dossier-top"><span>ULAŞ KREDİ</span><span>DANIŞMANLIK / 01</span></div>
          <div className="cro-orbit" aria-hidden="true"><div className="cro-orbit-ring" /><div className="cro-orbit-ring" /><div className="cro-orbit-core">UK<span>STRATEJİ & HAZIRLIK</span></div><i /></div>
          <div className="cro-dossier-title"><span>HEDEFİNİZE GİDEN YOL</span><strong>Önce finansal tablo.<br />Sonra başvuru planı.</strong></div>
          <ol className="cro-dossier-steps">
            <li><span>01</span><div><b>Finansal profil</b><small>Gelir, mevcut borçlar ve bütçe</small></div><ArrowUpRight size={16} aria-hidden="true" /></li>
            <li><span>02</span><div><b>Başvuru hazırlığı</b><small>Belgeler ve değerlendirme soruları</small></div><ArrowUpRight size={16} aria-hidden="true" /></li>
            <li><span>03</span><div><b>İzlenebilecek adımlar</b><small>Hedefinize göre danışmanlık kapsamı</small></div><ArrowUpRight size={16} aria-hidden="true" /></li>
          </ol>
          <p>Bir sonuç tahmini değil, danışmanlık yaklaşımımızdır.</p>
        </div>
      </div>
      <div className="ef-wrap cro-hero-foot"><span>HEDEFİNİZİ NETLEŞTİRİN.</span><Link href="/hizmetler">Danışmanlık kapsamını inceleyin <ArrowUpRight size={15} aria-hidden="true" /></Link><span>KONTROLLÜ · ŞEFFAF · ADIM ADIM</span></div>
    </section>
  );
}
