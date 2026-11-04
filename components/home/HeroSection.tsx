import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Wallet, Layers3, ScanLine, ListChecks, FileCheck2, MessagesSquare, ArrowDown } from "lucide-react";
import { ApplicationForm } from "@/components/application-form";

function AssessmentScene() {
  return <div className="ef-assessment-scene" role="img" aria-label="Temsili danışmanlık süreci: gelir ve yükümlülükler, finansal durum değerlendirmesi, başvuru planı">
    <div className="ef-scene-caption"><span>DANIŞMANLIK HARİTASI</span><span>TEMSİLİ SÜREÇ</span></div>
    <div className="ef-scene-inputs">
      <div className="ef-scene-tile"><span className="ef-scene-icon"><Wallet size={21}/></span><div><b>Gelir yapınız</b><span>Düzenli gelir ve bütçe</span></div><span className="ef-signal" aria-hidden="true"/></div>
      <div className="ef-scene-tile"><span className="ef-scene-icon"><Layers3 size={21}/></span><div><b>Yükümlülükleriniz</b><span>Mevcut ödemeler ve ihtiyaçlar</span></div><span className="ef-signal" aria-hidden="true"/></div>
    </div>
    <div className="ef-scene-bridge" aria-hidden="true"><i/><i/><span/></div>
    <div className="ef-assessment-core"><span className="ef-core-icon"><ScanLine size={28}/></span><div><small>BİRLİKTE ANLAMLANDIRIYORUZ</small><strong>Finansal durum<br/>değerlendirmesi</strong></div><MessagesSquare className="ef-core-chat" size={25}/></div>
    <div className="ef-scene-down" aria-hidden="true"><ArrowDown size={18}/><span/></div>
    <div className="ef-scene-plan"><div className="ef-plan-title"><ListChecks size={21}/><b>Başvuru yol haritanız</b><span>Size özel yaklaşım</span></div><div className="ef-plan-steps"><span><FileCheck2 size={15}/> Hazırlık</span><span><ListChecks size={15}/> Planlama</span><span><MessagesSquare size={15}/> Danışman takibi</span></div></div>
    <p className="ef-scene-disclaimer">Temsili süreç şemasıdır. Skor, limit veya kredi onayı tahmini üretmez.</p>
  </div>;
}
export default function HeroSection() {
  return <section id="hero" className="ef-hero ef-hero-v41"><div className="ef-wrap">
    <div className="ef-intro-grid">
      <div className="ef-hero-copy">
        <p className="ef-eyebrow"><span className="ef-dot"/> KREDİ DANIŞMANLIĞI</p>
        <h1>Kredi kararınıza<br/><span>net bir yol haritası.</span></h1>
        <p className="ef-lead">Kredi notunuzu, mevcut borçlarınızı ve hedef taksitinizi birlikte ele alalım. Bankaya başvurmadan önce belge hazırlığını ve soracağınız soruları netleştirelim.</p>
        <div className="ef-actions"><a className="ef-button" href="#basvuru">Danışmanla görüşün <ArrowUpRight size={20}/></a><Link className="ef-text-link ef-hero-explore" href="/nasil-calisir">Süreci keşfedin <ArrowUpRight size={16}/></Link></div>
        <div className="ef-assurances"><span><ShieldCheck size={17}/> Ön ödemesiz süreç</span><Link href="/rehber" className="ef-text-link">Rehberi incele <ArrowUpRight size={15}/></Link></div>
      </div>
      <AssessmentScene/>
    </div>
    <div className="ef-hero-application-grid">
      <div className="ef-application-intro"><p className="ef-eyebrow">BİRLİKTE, ADIM ADIM</p><h2>Önce sizi anlayalım.<br/><span>Sonra yolu planlayalım.</span></h2><p>Gelir, mevcut borçlar ve başvuru amacınız bir bütün. Danışmanlık sürecinde bu tabloyu ele alır, başvuru hazırlığını ve izlenecek adımları birlikte değerlendiririz.</p><ul><li><span>01</span> Finansal durumunuzu konuşalım.</li><li><span>02</span> Hazırlık ve başvuru adımlarını planlayalım.</li><li><span>03</span> Danışmanlık sürecini birlikte izleyelim.</li></ul><p className="ef-application-caveat">Danışmanlık bir banka kararı değildir. Kredi onayı, skor artışı veya belirli bir limit garanti edilmez.</p><a href="#hesaplama" className="ef-text-link">Bütçenizi önce hesaplayın <ArrowUpRight size={16}/></a></div>
      <div id="basvuru" className="ef-application"><p className="ef-eyebrow">İLK ADIMI ATIN</p><h2>Birlikte değerlendirelim.</h2><p className="ef-form-intro">Telefon veya WhatsApp üzerinden görüşelim. Çevrimiçi kayıt hizmetinin durumu aşağıda gösterilir.</p><ApplicationForm channel="HERO_FORM"/></div>
    </div>
  </div></section>;
}
