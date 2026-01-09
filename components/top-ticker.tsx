"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles, ShieldCheck, TrendingUp, BookOpen, PhoneCall } from "lucide-react";

type Item = {
  label: string;
  text: string;
  Icon: any;
  accent: "sky" | "emerald" | "amber" | "rose" | "slate";
};

const ITEMS: Item[] = [
  { label: "Kampanya", text: "Güncel bankacılık ipuçları ve limit artırma stratejileri Rehber’de.", Icon: Sparkles, accent: "sky" },
  { label: "Güven", text: "Ön ödemesiz süreç • Şeffaf bilgilendirme • Kontrollü ilerleme.", Icon: ShieldCheck, accent: "emerald" },
  { label: "Limit", text: "Kredi puanı ve gelir/borç oranı ile limitinizi doğru planlayın.", Icon: TrendingUp, accent: "amber" },
  { label: "Rehber", text: "Başvuru öncesi evrak, gelir ve skor hazırlığı: adım adım yol haritası.", Icon: BookOpen, accent: "slate" },
  { label: "İletişim", text: "Ücretsiz ön analiz için WhatsApp’tan yazın, hızlı dönüş alın.", Icon: PhoneCall, accent: "rose" },
];

function accent(a: Item["accent"]) {
  switch (a) {
    case "sky":
      return "bg-sky-500/10 text-sky-800 ring-sky-500/20";
    case "emerald":
      return "bg-emerald-500/10 text-emerald-800 ring-emerald-500/20";
    case "amber":
      return "bg-amber-500/10 text-amber-900 ring-amber-500/20";
    case "rose":
      return "bg-rose-500/10 text-rose-800 ring-rose-500/20";
    default:
      return "bg-slate-900/5 text-slate-800 ring-slate-900/10";
  }
}

export default function TopTicker({ intervalMs = 6500 }: { intervalMs?: number }) {
  const items = useMemo(() => ITEMS, []);
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (items.length <= 1) return;

    const OUT_MS = 280;

    const id = setInterval(() => {
      setPhase("out");
      const t = setTimeout(() => {
        setI((p) => (p + 1) % items.length);
        setPhase("in");
      }, OUT_MS);
      return () => clearTimeout(t);
    }, intervalMs);

    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  const it = items[i];
  const Icon = it.Icon;

  return (
    <div className="w-full border-b bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <div className="relative overflow-hidden rounded-2xl border bg-white/70">
          <div className="flex h-9 items-center">
            <div className="hidden sm:flex h-full items-center gap-2 border-r bg-white/60 px-3">
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                BUGÜN
              </span>
              <span className="text-[10px] text-slate-500">15+ yıl deneyim</span>
            </div>

            <div className="min-w-0 flex-1 px-3">
              <div
                className={[
                  "flex min-w-0 items-center gap-2 whitespace-nowrap",
                  phase === "in" ? "top-ticker-in" : "top-ticker-out",
                ].join(" ")}
              >
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ring-1 ${accent(
                    it.accent
                  )}`}
                >
                  <Icon className="h-3 w-3" />
                  {it.label}
                </span>

                <span className="min-w-0 truncate text-[12px] text-slate-800">
                  {it.text}
                </span>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-white/90 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-white/90 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
