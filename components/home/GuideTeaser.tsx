"use client";

import Link from "next/link";
import { PUBLISHED_POSTS } from "@/lib/content/posts";
import { ArrowUpRight, Flame, Shield, TrendingDown, Wallet, AlertTriangle } from "lucide-react";

const POSTS = PUBLISHED_POSTS.slice(0, 6).map(post => ({
  title: post.title, excerpt: post.excerpt, tag: post.category, icon: Shield,
  href: `/rehber/${post.slug}`, hot: false,
}));

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
      {children}
    </span>
  );
}

export default function GuideTeaser() {
  return (
    <section id="rehber" className="relative mx-auto max-w-6xl px-4 py-14">
      <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center">
        <p className="text-sm font-semibold tracking-wide text-primary/90">
          FİNANS REHBERİ
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Bilmeden başvurma — 5 dakikada daha akıllı karar ver
        </h2>
        <p className="mt-3 text-slate-600">
          Kredi notu, başvuru stratejisi, limit ve red analizleri… Kısa, net ve tıklamalık içerikler.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <TagPill>Kredi Notu</TagPill>
          <TagPill>Banka Stratejisi</TagPill>
          <TagPill>Limit</TagPill>
          <TagPill>Red Analizi</TagPill>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p, i) => {
          const Icon = p.icon;
          return (
            <a
              key={i}
              href={p.href}
              className="group rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur
                         shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="inline-flex items-center gap-2">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                    <Icon size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-600">{p.tag}</span>
                    {p.hot ? (
                      <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
                        <Flame size={14} /> Trend
                      </span>
                    ) : null}
                  </div>
                </div>

                <ArrowUpRight className="mt-1 text-slate-400 transition group-hover:text-slate-700" size={18} />
              </div>

              <h3 className="text-base font-semibold leading-snug text-slate-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.excerpt}
              </p>

              <div className="mt-5 h-px w-full bg-slate-200/70" />

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Devamını oku <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/rehber"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
        >
          Tüm rehberi gör
        </Link>
      </div>
    </section>
  );
}
