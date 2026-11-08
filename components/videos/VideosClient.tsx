"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/inner-page";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { VideoItem } from "@/lib/videos/types";
import { TOPICS } from "@/lib/topics/topics";
import { youtubeWatchUrl } from "@/lib/videos/source";

function validTopic(value:string|null){return TOPICS.some(t=>t.id===value)?value??"":"";}

export default function VideosClient({initialVideos}:{initialVideos:VideoItem[]}) {
 const params=useSearchParams();
 const [q,setQ]=useState(params.get("q")??""), [topic,setTopic]=useState(validTopic(params.get("topic"))), [format,setFormat]=useState(params.get("shorts")==="1"?"shorts":"all");
 const [previousParams,setPreviousParams]=useState(params.toString());
 if(previousParams!==params.toString()){
  setPreviousParams(params.toString());setQ(params.get("q")??"");setTopic(validTopic(params.get("topic")));setFormat(params.get("shorts")==="1"?"shorts":"all");
 }
 const [active,setActive]=useState<VideoItem|null>(null), [allowed,setAllowed]=useState(false);
 const [visible,setVisible]=useState(9);
 const opener=useRef<HTMLButtonElement|null>(null);
 function open(video:VideoItem,button:HTMLButtonElement){opener.current=button;setActive(video);setAllowed(false);}
 const videos=useMemo(()=>initialVideos.filter(v=>/^[A-Za-z0-9_-]{11}$/.test(v.id)&&v.title.trim()),[initialVideos]);
 const filtered=videos.filter(v=>(!topic||v.topicId===topic)&&(format!=="shorts"||v.isShort===true)&&(format!=="videos"||v.isShort!==true)&&(!q.trim()||v.title.toLocaleLowerCase("tr-TR").includes(q.trim().toLocaleLowerCase("tr-TR"))));
 const categories=TOPICS.filter(t=>videos.some(v=>v.topicId===t.id));
 function close(){setActive(null);setAllowed(false);}
 return <section className="ef-inner ef-videos-page ef-wrap">
  <PageHeader eyebrow="VİDEO REHBERLER" title="Kredi sürecini izleyerek keşfedin." description="Erdi Ergen’in kanalından başvuru hazırlığı ve finansal farkındalık üzerine anlatımlar. Yayın tarihindeki bilgiler genel bilgilendirmedir; güncel teklif veya sonuç garantisi değildir." action="Sorunuzu danışmana iletin"/>
  {videos.length>0?<><div className="uk-video-filters"><label>Videolarda ara<input type="search" value={q} onChange={e=>{setQ(e.target.value);setVisible(9);}} placeholder="Örn. rapor, limit"/></label><label>Video konusu<select value={topic} onChange={e=>{setTopic(e.target.value);setVisible(9);}}><option value="">Tüm konular</option>{categories.map(t=><option key={t.id} value={t.id}>{t.title}</option>)}</select></label>{videos.some(v=>v.isShort)&&<label>Video türü<select value={format} onChange={e=>{setFormat(e.target.value);setVisible(9);}}><option value="all">Tüm videolar</option><option value="videos">Videolar</option><option value="shorts">Shorts</option></select></label>}</div>
  <p className="uk-result-count" role="status">{filtered.length} video</p><div className="uk-video-grid">{filtered.slice(0,visible).map(v=><article key={v.id} className="uk-video-card"><button type="button" className="uk-video-play" onClick={e=>open(v,e.currentTarget)} aria-label={v.title+" — videoyu aç"}>{v.thumb?.startsWith("/")&&<Image src={v.thumb} width={480} height={360} alt=""/>}<span className="uk-play-icon"><Play size={24}/></span>{v.duration&&<span className="uk-video-duration">{v.duration}</span>}</button><div><p className="ef-eyebrow">{v.tag}{v.isShort?" · Shorts":""}</p><h2><button onClick={e=>open(v,e.currentTarget)}>{v.title}</button></h2>{v.publishedAt&&<time dateTime={v.publishedAt}>{new Intl.DateTimeFormat("tr-TR",{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"}).format(new Date(v.publishedAt))}</time>}<a className="ef-text-link" href={youtubeWatchUrl(v.id)} target="_blank" rel="noopener noreferrer">YouTube’da izle <ArrowUpRight size={15}/></a></div></article>)}</div>
  {filtered.length===0&&<div className="ef-empty"><h2>Bu filtrelerde video bulunamadı.</h2><button className="ef-button" onClick={()=>{setQ("");setTopic("");setFormat("all");}}>Filtreleri temizle</button></div>}
  {filtered.length>visible&&<button className="ef-button" onClick={()=>setVisible(n=>n+9)}>Daha fazla video göster</button>}</>:<div className="ef-empty"><h2>Doğrulanmış video şu anda bulunmuyor.</h2><p>Yazılı rehberleri inceleyebilir veya kanalımızı ziyaret edebilirsiniz.</p><Link className="ef-text-link" href="/rehber">Rehberleri inceleyin →</Link></div>}
  <p className="uk-video-note">Oynatıcı yalnız izninizle yüklenir. <Link href="/cerez">Çerez ve gizlilik bilgisi</Link> · <a href="https://www.youtube.com/@danismanerdiergen" target="_blank" rel="noopener noreferrer">Erdi Ergen YouTube kanalı ↗</a></p>
  <Dialog open={!!active} onOpenChange={open=>{if(!open)close();}}><DialogContent className="uk-video-dialog" onCloseAutoFocus={e=>{e.preventDefault();opener.current?.focus();}}><DialogTitle>{active?.title}</DialogTitle><DialogDescription>YouTube içeriği · {active?.tag}</DialogDescription>{active&&(allowed?<><div className="uk-video-player"><iframe src={`https://www.youtube-nocookie.com/embed/${active.id}?playsinline=1&rel=0`} title={active.title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/></div><button className="ef-text-link" onClick={()=>setAllowed(false)}>YouTube iznini geri al</button></>:<div className="uk-video-permission"><Play size={32}/><h3>Videoyu burada izleyin</h3><p>Oynatıcı yüklendiğinde YouTube’a bağlantı kurulur; IP adresiniz ve cihaz bilgileriniz iletilebilir. İzin yalnız bu video için geçerlidir ve geri alınabilir.</p><button className="ef-button" onClick={()=>setAllowed(true)}>YouTube’u yükle</button><a className="ef-text-link" href={youtubeWatchUrl(active.id)} target="_blank" rel="noopener noreferrer">YouTube’da aç ↗</a></div>)}</DialogContent></Dialog>
 </section>;
}
