"use client";

import Link from "next/link";
import { useMemo } from "react";

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
    <PageHeader eyebrow={activeTopic ? "KONU REHBERİ / " + activeTopic.title : "KREDİ REHBERİ"} title={activeTopic ? activeTopic.title + " hakkında doğru sorular." : "Bilgiyle daha bilinçli kararlar."} description="Kredi notu, bütçe ve başvuru sürecini kaynaklarıyla birlikte anlamlandırın. Rehberler genel bilgilendirmedir; kişisel değerlendirme yerine geçmez." action="Durumunuzu birlikte değerlendirelim" />
    <div className="ef-guide-tools">
      <form action="/rehber" method="get" role="search"><label htmlFor="guide-query">Rehberlerde ara</label><div><input key={query+"-"+activeTopicId} id="guide-query" name="q" defaultValue={query} placeholder="Örn. banka iç skoru" />{activeTopicId && <input type="hidden" name="topic" value={activeTopicId}/>}<button type="submit" className="ef-button">Ara</button></div></form>
      <nav aria-label="Rehber konuları"><Link href="/rehber" aria-current={!activeTopicId ? "page" : undefined}>Tüm rehberler</Link>{categories.map(t => <Link key={t.id} href={"/rehber?topic="+t.id} aria-current={activeTopicId===t.id ? "page" : undefined}>{t.title}</Link>)}</nav>
    </div>
    <div className="ef-results-heading"><h2>{activeTopic?.title ?? "Yayımdaki rehberler"}</h2><span>{uniqueItems.length} rehber{q ? " · Arama: "+q : ""}</span>{q&&<Link href={clearSearchHref}>Aramayı temizle</Link>}</div>
    <div className="ef-guide-grid">{uniqueItems.map(p=><RehberCard key={p.slug} post={p}/>)}</div>
    {uniqueItems.length===0&&<div className="ef-empty"><h2>Bu aramada rehber bulunamadı.</h2><p>Farklı bir kelime deneyin veya konulara göz atın.</p><Link href={clearHref} className="ef-text-link">Tüm rehberlere dön →</Link></div>}
    <ConversionPanel title="Okuduklarınızı kendi durumunuzla birleştirelim." description="Okuduğunuz rehberin konusunu ve yanıtını bulamadığınız soruyu telefon veya WhatsApp görüşmesinde belirtin. Birlikte hazırlık adımlarını değerlendirelim."/>
  </div></section>;
}
