"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PUBLISHED_POSTS as POSTS } from "@/lib/content/posts";
import { getTopicById, type TopicId, TOPICS } from "@/lib/topics/topics";

import { PageHeader, ConversionPanel } from "@/components/inner-page";
import RehberCard from "@/components/rehber/RehberCard";

function safeText(x: unknown) {
  return typeof x === "string" ? x : "";
}

function isTopicId(x: string | null): x is TopicId {
  if (!x) return false;
  return (TOPICS as any[]).some((t) => t?.id === x);
}

export default function RehberClient({ query = "", topic = null }: { query?: string; topic?: string | null }) {
  const [visible, setVisible] = useState(8);
  const [previousFilter, setPreviousFilter] = useState(query+"|"+topic);
  if(previousFilter !== query+"|"+topic){setPreviousFilter(query+"|"+topic);setVisible(8);}
  const q = query.trim().toLocaleLowerCase("tr-TR");
  const topicParam = topic;
  const activeTopicId = isTopicId(topicParam) ? (topicParam as TopicId) : null;
  const activeTopic = activeTopicId ? getTopicById(activeTopicId) : null;

  const items = useMemo(() => {
    const all = Array.isArray(POSTS) ? POSTS : [];

    // 1) topic filtre
    const byTopic = activeTopicId ? all.filter((p) => p.topicId === activeTopicId) : all;

    // 2) q arama filtre
    if (!q) return byTopic;

    return byTopic.filter((p) => {
      const title = safeText((p as any).title).toLocaleLowerCase("tr-TR");
      const excerpt = safeText((p as any).excerpt).toLocaleLowerCase("tr-TR");
      return title.includes(q) || excerpt.includes(q);
    });
  }, [q, activeTopicId]);

  // ✅ UI kalkanı: duplicate slug varsa tekilleştir
  const uniqueItems = useMemo(() => {
    const seen = new Set<string>();
    const out: any[] = [];
    for (const p of items) {
      const k = String((p as any)?.slug || "");
      if (!k) continue;
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(p);
    }
    return out;
  }, [items]);



  const clearHref = "/rehber";
  const clearSearchHref = activeTopicId
    ? `/rehber?topic=${encodeURIComponent(activeTopicId)}`
    : "/rehber";

  const categories = TOPICS.filter(t => POSTS.some(post => post.topicId === t.id));
  return <section className="ef-inner ef-guide-directory"><div className="ef-wrap">
    <PageHeader eyebrow={activeTopic ? "KONU REHBERİ / " + activeTopic.title : "KREDİ REHBERİ"} title={activeTopic ? activeTopic.title + " rehberleri" : "Kredi sorularınıza açık yanıtlar."} description="Kredi notu, toplam maliyet ve başvuru hazırlığı. Konunuzu seçin, kaynaklı rehberleri keşfedin." action="Durumunuzu birlikte değerlendirelim" />
    <div className="ef-guide-tools">
      <form action="/rehber" method="get" role="search"><label htmlFor="guide-query">Rehberlerde ara</label><div><input type="search" key={query+"-"+activeTopicId} id="guide-query" name="q" defaultValue={query} placeholder="Örn. banka iç skoru" />{activeTopicId && <input type="hidden" name="topic" value={activeTopicId}/>}<button type="submit" className="ef-button">Ara</button></div></form>
      <nav aria-label="Rehber konuları"><Link href={q ? "/rehber?q="+encodeURIComponent(query) : "/rehber"} aria-current={!activeTopicId ? "page" : undefined}>Tüm rehberler</Link>{categories.map(t => <Link key={t.id} href={"/rehber?topic="+t.id+(q?"&q="+encodeURIComponent(query):"")} aria-current={activeTopicId===t.id ? "page" : undefined}>{t.title}</Link>)}</nav>
    </div>
    <div className="ef-results-heading"><h2>{activeTopic?.title ?? "Yayımdaki rehberler"}</h2><span>{uniqueItems.length} rehber{q ? " · Arama: "+q : ""}</span>{q&&<Link href={clearSearchHref}>Aramayı temizle</Link>}</div>
    <div className="ef-guide-grid">{uniqueItems.slice(0,visible).map(p=><RehberCard key={p.slug} post={p}/>)}</div>
    {uniqueItems.length>visible&&<div className="uk-load-more"><p role="status">{Math.min(visible,uniqueItems.length)} / {uniqueItems.length} rehber gösteriliyor</p><button type="button" className="ef-button" onClick={()=>setVisible(n=>n+6)}>Daha fazla rehber göster</button></div>}
    {uniqueItems.length===0&&<div className="ef-empty"><h2>Bu aramada rehber bulunamadı.</h2><p>Farklı bir kelime deneyin veya konulara göz atın.</p><Link href={clearHref} className="ef-text-link">Tüm rehberlere dön →</Link></div>}
    <ConversionPanel title="Okuduklarınızı kendi durumunuzla birleştirelim." description="Okuduğunuz rehberin konusunu ve yanıtını bulamadığınız soruyu telefon veya WhatsApp görüşmesinde belirtin. Birlikte hazırlık adımlarını değerlendirelim."/>
  </div></section>;
}
