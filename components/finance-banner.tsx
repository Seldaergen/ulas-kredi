"use client";

import { useEffect, useMemo, useState } from "react";

export type RateData = {
  name: string;
  value: string;
  change: number; // artık kullanılmıyor ama endpoint uyumu için kalabilir
  symbol: string;
};

const FALLBACK_RATES: RateData[] = [
  { name: "USD/TRY", value: "34.52", change: 0, symbol: "₺" },
  { name: "EUR/TRY", value: "36.18", change: 0, symbol: "₺" },
  { name: "ALTIN", value: "2350.00", change: 0, symbol: "₺" },
];

function safeRates(json: any): RateData[] | null {
  const arr = json?.rates;
  if (!Array.isArray(arr)) return null;

  const out: RateData[] = [];
  for (const it of arr) {
    if (!it || typeof it !== "object") continue;

    const name = typeof it.name === "string" ? it.name : "";
    const value = typeof it.value === "string" ? it.value : "";
    const symbol = typeof it.symbol === "string" ? it.symbol : "";

    if (!name || !value) continue;
    out.push({ name, value, symbol, change: 0 });
  }
  return out.length ? out : null;
}

async function fetchJson(url: string, ms = 5000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { cache: "no-store", signal: ctrl.signal });
    const json = await res.json().catch(() => null);
    return { ok: res.ok, json };
  } finally {
    clearTimeout(t);
  }
}

function RateChip({ r }: { r: RateData }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border bg-white/70 px-3 py-1.5 shadow-sm">
      <span className="text-[12px] font-semibold text-slate-800">
        {r.name}
      </span>
      <span className="text-[12px] text-slate-600">
        {r.symbol ? `${r.symbol} ` : ""}
        {r.value}
      </span>
    </div>
  );
}

export default function FinanceBanner({
  endpoint = "/api/rates",
  refreshMs = 120_000, // 2 dk – dev modda donmayı azaltır
  speedSeconds = 30,
}: {
  endpoint?: string;
  refreshMs?: number;
  speedSeconds?: number;
}) {
  const [rates, setRates] = useState<RateData[]>(FALLBACK_RATES);

  useEffect(() => {
    let alive = true;

    async function load() {
      const { ok, json } = await fetchJson(endpoint, 5500);
      const parsed = safeRates(json);

      if (!alive) return;

      if (ok && parsed) setRates(parsed);
      else setRates(FALLBACK_RATES);
    }

    load();
    const id = setInterval(load, refreshMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [endpoint, refreshMs]);

  const items = useMemo(() => rates, [rates]);

  return (
    <div className="w-full border-b bg-white/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <div className="relative overflow-hidden rounded-2xl border bg-white/70">
          <div className="flex h-11 items-center">
            {/* Sol sabit başlık */}
            <div className="flex h-full shrink-0 items-center gap-2 border-r bg-white/60 px-3">
              <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                PİYASA
              </span>
              <span className="hidden text-[11px] text-slate-500 sm:inline">
                Güncel veriler
              </span>
            </div>

            {/* Kayan şerit */}
            <div className="relative flex-1 overflow-hidden">
              <div
                className="finance-track flex w-max items-center whitespace-nowrap"
                style={{ ["--dur" as any]: `${speedSeconds}s` }}
              >
                <div className="flex items-center gap-2 pr-10">
                  {items.map((r) => (
                    <RateChip key={`a-${r.name}`} r={r} />
                  ))}
                </div>
                <div className="flex items-center gap-2 pr-10" aria-hidden>
                  {items.map((r) => (
                    <RateChip key={`b-${r.name}`} r={r} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Kenar fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-white/90 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-white/90 to-transparent"
          />
        </div>
      </div>

      <style jsx>{`
        .finance-track {
          animation: financeMarquee var(--dur, 30s) linear infinite;
        }
        @keyframes financeMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .finance-track {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
