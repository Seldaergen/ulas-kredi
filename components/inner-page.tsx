import Link from "next/link";
import { ArrowUpRight, BookOpen, ShieldCheck } from "lucide-react";
export function PageHeader({eyebrow,title,description,steps,action="Danışmanla görüşün",href="/iletisim#iletisim",headingLevel=1}:{eyebrow:string;title:string;description:string;steps?:string[];action?:string;href?:string;headingLevel?:1|2}) {
 const Heading = headingLevel === 1 ? "h1" : "h2";
 return <header className="ef-page-header"><div><p className="ef-eyebrow">{eyebrow}</p><Heading>{title}</Heading><p className="ef-page-description">{description}</p><Link data-inner-cta className="ef-button" href={href}>{action}<ArrowUpRight size={18}/></Link></div>{steps&&<aside className="ef-page-context" aria-label="Bu sayfada"><span className="ef-eyebrow">BİR SONRAKİ ADIMINIZ</span>{steps.map((step,i)=><div key={step}><b>{String(i+1).padStart(2,"0")}</b><span>{step}</span></div>)}<small><ShieldCheck size={15}/> Nihai kredi kararı bankaya aittir.</small></aside>}</header>;
}
export function ConversionPanel({title,description,action="Danışmanla görüşün",href="/iletisim#iletisim"}:{title:string;description:string;action?:string;href?:string}) {
 return <section className="ef-conversion"><div><p className="ef-eyebrow">DURUMUNUZU BİRLİKTE DEĞERLENDİRELİM</p><h2>{title}</h2><p>{description}</p></div><Link data-inner-cta className="ef-button" href={href}>{action}<ArrowUpRight size={18}/></Link></section>;
}
export function GuideArtwork({label}:{label:string}) {return <div className="ef-guide-art" aria-hidden="true"><BookOpen size={42} strokeWidth={1}/><div><span>ULAŞ / FİNANSAL REHBER</span><b>{label}</b></div><i/></div>;}
