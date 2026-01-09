"use client";

import Link from "next/link";
import { Gauge, Target, FileSearch, ShieldCheck, Wallet, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TopicId } from "@/lib/topics/topics";

const solutions: Array<{
  icon: any;
  title: string;
  desc: string;
  href: string; // ✅ gerçek hedef
  accent: string;
  glow: string;
  ring: string;
}> = [
  {
    icon: Gauge,
    title: "Kredi Notu Analizi",
    desc: "Notu yükseltmek için net bir yol haritası.",
    href: "/rehber?topic=kredi-notu" satisfies string,
    accent: "bg-sky-50 text-sky-700 border-sky-100",
    glow: "group-hover:shadow-[0_18px_45px_rgba(14,165,233,0.18)]",
    ring: "group-hover:ring-sky-500/15",
  },
  {
    icon: Target,
    title: "Limit Artış Stratejisi",
    desc: "Doğru sıra, doğru zamanlama, temiz dosya.",
    href: "/rehber?topic=kredi-limiti",
    accent: "bg-emerald-50 text-emerald-700 border-emerald-100",
    glow: "group-hover:shadow-[0_18px_45px_rgba(16,185,129,0.16)]",
    ring: "group-hover:ring-emerald-500/15",
  },
  {
    icon: FileSearch,
    title: "Red / Risk Analizi",
    desc: "Red sebeplerini netleştirip plan çıkaralım.",
    href: "/rehber?topic=kredi-basvurusu",
    accent: "bg-amber-50 text-amber-700 border-amber-100",
    glow: "group-hover:shadow-[0_18px_45px_rgba(245,158,11,0.14)]",
    ring: "group-hover:ring-amber-500/15",
  },
  {
    icon: ShieldCheck,
    title: "Yapılandırma Planı",
    desc: "Borcu yönetilebilir taksite çevirme stratejisi.",
    href: "/rehber?topic=yapilandirma",
    accent: "bg-slate-100 text-slate-700 border-slate-200",
    glow: "group-hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]",
    ring: "group-hover:ring-slate-900/10",
  },
];

export default function QuickActions() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* soft background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(16,185,129,0.08),transparent_62%)]" />
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="text-lg font-semibold text-slate-900">
              Size en uygun çözümü hemen bulun
            </div>
            <div className="mt-1 text-sm text-slate-600">
              İhtiyacını seç — ilgili rehbere yönlendirelim.
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-600 backdrop-blur">
            <Wallet className="h-4 w-4" />
            Ücretsiz ön değerlendirme
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                href={s.href}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition",
                  "hover:-translate-y-0.5 hover:border-slate-300",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  "ring-1 ring-transparent",
                  s.glow,
                  s.ring
                )}
              >
                {/* micro gloss */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100
                             bg-[radial-gradient(circle_at_30%_20%,rgba(15,23,42,0.06),transparent_55%)]"
                />

                <div className="relative flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition",
                      "group-hover:scale-110",
                      s.accent
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <div className="line-clamp-2 text-[15px] font-semibold leading-5 text-slate-900">
                      {s.title}
                    </div>
                    <div className="mt-1 line-clamp-2 text-[13px] leading-5 text-slate-600">
                      {s.desc}
                    </div>

                    <div className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-slate-900">
                      Rehberi aç
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/iletisim"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 px-4 text-base font-semibold text-white shadow-sm transition hover:shadow-md"
          >
            Hemen iletişime geç →
          </Link>

          <Link
            href="/soru-cevap"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
          >
            Soru–Cevap’a bak
          </Link>
        </div>
      </div>
    </section>
  );
}
