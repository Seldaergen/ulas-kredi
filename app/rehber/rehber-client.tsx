"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { POSTS } from "@/lib/content/posts";
import { getTopicById, type TopicId, TOPICS } from "@/lib/topics/topics";

import TopReads from "@/components/rehber/TopReads";
import RehberCard from "@/components/rehber/RehberCard";

function safeText(x: unknown) {
  return typeof x === "string" ? x : "";
}

function isTopicId(x: string | null): x is TopicId {
  if (!x) return false;
  return (TOPICS as any[]).some((t) => t?.id === x);
}

export default function RehberClient() {
  const sp = useSearchParams();
  const q = (sp.get("q") || "").trim().toLowerCase();
  const topicParam = sp.get("topic");
  const activeTopicId = isTopicId(topicParam) ? (topicParam as TopicId) : null;
  const activeTopic = activeTopicId ? getTopicById(activeTopicId) : null;

  const items = useMemo(() => {
    const all = Array.isArray(POSTS) ? POSTS : [];

    // 1) topic filtre
    const byTopic = activeTopicId ? all.filter((p) => p.topicId === activeTopicId) : all;

    // 2) q arama filtre
    if (!q) return byTopic;

    return byTopic.filter((p) => {
      const title = safeText((p as any).title).toLowerCase();
      const excerpt = safeText((p as any).excerpt).toLowerCase();
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

  const showTopReads = !q && !activeTopicId;

  const clearHref = "/rehber";
  const clearSearchHref = activeTopicId
    ? `/rehber?topic=${encodeURIComponent(activeTopicId)}`
    : "/rehber";

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-12">
      <div className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Kredi Rehberi</h1>

          <p className="text-sm text-slate-600">
            Kredi notu, limit, başvuru stratejisi ve bankacılık süreçleri için güncel,
            sade ve güvenilir rehberler.
          </p>

          {activeTopic ? (
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-900">
                Konu: {activeTopic.title}
              </span>

              <Link href={clearHref} className="text-cyan-700 hover:underline">
                Tüm rehberler
              </Link>
            </div>
          ) : null}

          {q ? (
            <div className="mt-1 text-sm text-slate-700">
              Arama: <span className="font-medium">{q}</span>{" "}
              <Link href={clearSearchHref} className="ml-2 text-cyan-700 hover:underline">
                Temizle
              </Link>
            </div>
          ) : null}
        </div>

        {showTopReads ? <TopReads /> : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {uniqueItems.map((p: any) => (
            <RehberCard key={p.slug} post={p} />
          ))}
        </div>

        {uniqueItems.length === 0 ? (
          <div className="mt-6 rounded-xl border bg-white/70 p-4 text-sm text-slate-700">
            İçerik bulunamadı.
            {activeTopic ? (
              <>
                {" "}
                <Link href={clearHref} className="font-semibold text-cyan-700 hover:underline">
                  Tüm rehberlere dön
                </Link>
                .
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
