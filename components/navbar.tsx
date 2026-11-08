"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { ThemeControls } from "@/components/theme-controls";
import { DESKTOP_MAIN, REHBER_DROPDOWN } from "@/lib/nav/ulas-nav";

export function Navbar() {
 const pathname=usePathname() || "/";
 const [mobile,setMobile]=useState(false), [guide,setGuide]=useState(false);
 const root=useRef<HTMLElement>(null), trigger=useRef<HTMLButtonElement>(null), mobileTrigger=useRef<HTMLButtonElement>(null);
 const timer=useRef<ReturnType<typeof setTimeout> | null>(null);
 const active=(href:string)=>href==="/" ? pathname==="/" : !href.includes("?") && (pathname===href || pathname.startsWith(href+"/"));
 const close=()=>{setMobile(false);setGuide(false);};
 useEffect(()=>{const outside=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))close();};document.addEventListener("pointerdown",outside);return()=>{document.removeEventListener("pointerdown",outside);if(timer.current)clearTimeout(timer.current);};},[]);
 const [previousPathname,setPreviousPathname]=useState(pathname);
 if(previousPathname!==pathname){
  setPreviousPathname(pathname);
  setMobile(false);
  setGuide(false);
 }
 const openOnHover=(e:React.PointerEvent)=>{if(e.pointerType!=="mouse")return;if(timer.current)clearTimeout(timer.current);setGuide(true);};
 const leave=(e:React.PointerEvent)=>{if(e.pointerType!=="mouse" || mobile)return;timer.current=setTimeout(()=>{if(!root.current?.querySelector(".uk-guide-menu")?.contains(document.activeElement))setGuide(false);},180);};
 function keys(e:React.KeyboardEvent) {
  if(e.key==="Escape"){e.preventDefault();if(guide){setGuide(false);trigger.current?.focus();}else{setMobile(false);mobileTrigger.current?.focus();}return;}
  const items=Array.from(root.current?.querySelectorAll<HTMLAnchorElement>(".uk-guide-menu a") || []);
  if(!guide || !items.length || !["ArrowDown","ArrowUp","Home","End"].includes(e.key))return;
  e.preventDefault();const i=items.indexOf(document.activeElement as HTMLAnchorElement);
  const n=e.key==="Home"?0:e.key==="End"?items.length-1:e.key==="ArrowDown"?(i+1)%items.length:(i<=0?items.length:i)-1;
  items[n]?.focus();
 }
 const guideButton=<button ref={trigger} type="button" className="uk-nav-link uk-guide-trigger" aria-expanded={guide} aria-current={pathname.startsWith("/rehber")?"page":undefined} aria-controls="credit-guide-menu" onClick={()=>setGuide(v=>!v)} onKeyDown={e=>{if(e.key==="ArrowDown" || e.key==="ArrowUp"){e.preventDefault();setGuide(true);requestAnimationFrame(()=>{const links=root.current?.querySelectorAll<HTMLAnchorElement>(".uk-guide-menu a");links?.[e.key==="ArrowUp"?links.length-1:0]?.focus();});}}}>Kredi Rehberi <ChevronDown size={16} aria-hidden="true"/></button>;
 return <nav ref={root} className="uk-site-header uk-navigation" aria-label="Ana gezinme" onKeyDown={keys} onBlur={e=>{if(e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)){setGuide(false);}}}>
  <div className="uk-site-header-surface"><div className="ef-wrap uk-nav-row">
   <Link href="/" className="uk-nav-brand" onClick={close}><Image src="/logo1.png" alt="" width={36} height={36} priority/><span>Ulaş Kredi <b>Danışmanlık</b><small>Yüksek limitli kredi danışmanlığı</small></span></Link>
   <div className="uk-desktop-nav">{DESKTOP_MAIN.map(item=>item.type==="dropdown"?<div key={item.href} onPointerEnter={openOnHover} onPointerLeave={leave}>{!mobile&&guideButton}</div>:<Link key={item.href} className="uk-nav-link" href={item.href} aria-current={active(item.href)?"page":undefined} onClick={close}>{item.label}</Link>)}</div>
   <div className="uk-nav-actions"><ThemeControls/><a className="uk-nav-whatsapp" href="https://wa.me/905416061356" target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={16}/></a><button ref={mobileTrigger} type="button" className="uk-mobile-trigger" aria-expanded={mobile} aria-controls="mobile-nav" aria-label="Menü" onClick={()=>{setMobile(v=>!v);setGuide(false);}}>{mobile?<X size={22}/>:<Menu size={22}/>}</button></div>
  </div></div>
  {mobile&&<div id="mobile-nav" className="uk-mobile-panel ef-wrap">{DESKTOP_MAIN.map(item=>item.type==="dropdown"?<div key={item.href}>{guideButton}</div>:<Link key={item.href} className="uk-nav-link" href={item.href} aria-current={active(item.href)?"page":undefined} onClick={close}>{item.label}</Link>)}</div>}
  {guide&&<div id="credit-guide-menu" className="uk-guide-menu" aria-label="Kredi Rehberi konuları" onPointerEnter={openOnHover} onPointerLeave={leave}><div className="uk-guide-menu-title">Kredi Rehberi <span>İhtiyacınıza göre bir konu seçin</span></div><div className="uk-guide-menu-grid">{REHBER_DROPDOWN.map(item=><Link key={item.label} href={item.href} onClick={close}><strong>{item.label}</strong><span>{item.desc}</span><ArrowUpRight size={16} aria-hidden="true"/></Link>)}</div></div>}
 </nav>;
}
