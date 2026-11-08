"use client";
import Link from "next/link";
import { useState, useId, useEffect } from "react";
import { ArrowUpRight, Calculator } from "lucide-react";
import { loanPayment, monthlyBudget } from "@/lib/calculators";
const money=(value:number)=>new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY",maximumFractionDigits:2}).format(value);
const parse=(value:string)=>value.trim()===""?NaN:Number(value.replace(",","."));
export default function CalculatorsSection() {
 const prefix=useId();
 useEffect(()=>{
  const reveal=()=>{if(window.location.hash==="#hesaplama")document.getElementById("hesaplama")?.closest("details")?.setAttribute("open", "");};
  reveal();window.addEventListener("hashchange",reveal);return()=>window.removeEventListener("hashchange",reveal);
 },[]);
 const [amount,setAmount]=useState("200000"),[rate,setRate]=useState("3.49"),[months,setMonths]=useState("24"),[income,setIncome]=useState("35000"),[debt,setDebt]=useState("3000");
 const result=loanPayment(parse(amount),parse(rate),parse(months));
 const budget=monthlyBudget(parse(income),parse(debt));
 function field(name:string,label:string,value:string,setter:(value:string)=>void,min:number,max:number,step:string="any") {
  return <div className="ef-field"><label htmlFor={prefix+name}>{label}</label><input id={prefix+name} name={name} type="number" inputMode={step==="1"?"numeric":"decimal"} min={min} max={max} step={step} value={value} onChange={event=>setter(event.target.value)} aria-invalid={value===""||!Number.isFinite(parse(value))||parse(value)<min||parse(value)>max||(step==="1"&&!Number.isInteger(parse(value)))} aria-describedby={prefix+name+"-hint"}/><small id={prefix+name+"-hint"}>{min.toLocaleString("tr-TR")} – {max.toLocaleString("tr-TR")}{step==="1"?" · tam sayı":""}</small></div>;
 }
 return <section id="hesaplama" className="ef-calculators ef-wrap"><div className="ef-section-heading"><div><p className="ef-eyebrow">ÖNCE TABLOYU GÖRÜN</p><h2>Kredi taksitinizi ve aylık bütçenizi hesaplayın.</h2><p>Karar vermeden önce bütçenizi ve varsayımsal taksitinizi hesaplayın.</p></div><Calculator size={32}/></div><div className="ef-calc-grid">
 <div className="ef-calc"><span className="ef-eyebrow">01 / TAKSİT HESABI</span><h3>Planınıza ne kadar uyuyor?</h3><div className="ef-calc-fields">{field("principal","Kredi tutarı (₺)",amount,setAmount,1,10000000)}{field("rate","Varsayımsal aylık faiz (%)",rate,setRate,0,20)}{field("months","Vade (ay)",months,setMonths,1,360,"1")}</div>
 <div className="ef-calc-result" aria-live="polite">{result?<><span>Aylık taksit · yaklaşık</span><strong data-testid="monthly-payment">{money(result.monthly)}</strong><div><span>Toplam ödeme</span><b>{money(result.total)}</b></div><div><span>Faiz toplamı</span><b>{money(result.interest)}</b></div></>:<p role="alert">Tutar, faiz ve vadeyi belirtilen aralıklarda eksiksiz girin.</p>}</div><p className="ef-calc-note">Oran kullanıcı varsayımıdır; güncel piyasa oranı veya banka teklifi değildir. Sabit faizli eşit taksit hesabıdır. Vergi, sigorta ve ücretler dahil değildir; gerçek teklif farklılaşır.</p><a data-inner-cta href="#iletisim" className="ef-text-link">Sonucu danışmanla değerlendirin <ArrowUpRight size={18}/></a></div>
 <div className="ef-calc"><span className="ef-eyebrow">02 / BÜTÇE GÖRÜNÜMÜ</span><h3>Aylık alanınızı keşfedin.</h3><div className="ef-calc-fields">{field("income","Aylık net gelir (₺)",income,setIncome,1,10000000)}{field("debt","Mevcut aylık borç ödemesi (₺)",debt,setDebt,0,10000000)}</div><div className="ef-calc-result" aria-live="polite">{budget?<><span>Borç ödemelerinden sonra kalan</span><strong data-testid="remaining-budget">{money(budget.remaining)}</strong><div><span>Borç / gelir oranı</span><b>%{budget.ratio.toLocaleString("tr-TR",{maximumFractionDigits:1})}</b></div>{budget.remaining<0&&<p>Mevcut ödemeler gelirinizin üzerinde.</p>}</>:<p role="alert">Gelir ve borç tutarını belirtilen aralıklarda eksiksiz girin.</p>}</div><p className="ef-calc-note">Yaşam giderleri bu hesaba dahil değildir. Sonuç kredi limiti, ödeme gücü kararı veya kredi onayı değildir. Bilgiler bu araçlardan sunucuya gönderilmez.</p><a data-inner-cta href="#iletisim" className="ef-text-link">Bütçenizi danışmanla değerlendirin <ArrowUpRight size={18}/></a></div></div><p className="ef-calc-note">Sonuçları yorumlamak için <Link className="ef-text-link" href="/rehber/kredi-maliyeti-toplam-geri-odeme-nasil-bakilir">kredinin toplam geri ödeme maliyeti rehberini</Link> inceleyin. Görüşmede hangi hesabı değerlendirmek istediğinizi belirtin; hesaplayıcı verileri otomatik aktarılmaz.</p></section>;
}
