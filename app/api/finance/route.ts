// app/api/rates/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // stable

type RateItem = {
  name: string;
  value: string;   // UI için string
  change: number;  // yüzde/puan gibi düşün
  symbol: string;
};

function safeRateItem(x: any): RateItem | null {
  if (!x || typeof x !== "object") return null;
  const name = typeof x.name === "string" ? x.name : null;
  const value = typeof x.value === "string" ? x.value : null;
  const change =
    typeof x.change === "number"
      ? x.change
      : typeof x.change === "string"
        ? Number(x.change)
        : NaN;
  const symbol = typeof x.symbol === "string" ? x.symbol : null;

  if (!name || !value || !symbol) return null;
  if (!Number.isFinite(change)) return null;

  return { name, value, change, symbol };
}

export async function GET() {
  try {
    // ✅ Şimdilik güvenli stub: burada gerçek kaynağa bağlayacağız.
    // API bozulsa bile client tarafı fallback yapacak.
    const data: RateItem[] = [
      { name: "USD/TRY", value: "34.52", change: 0.12, symbol: "$" },
      { name: "EUR/TRY", value: "36.18", change: -0.08, symbol: "€" },
      { name: "ALTIN", value: "2.350", change: 0.20, symbol: "₺" },
      { name: "BIST 100", value: "10.120", change: -0.15, symbol: "₺" },
    ];

    // ekstra güvenlik: shape doğrulama
    const cleaned = data.map(safeRateItem).filter(Boolean) as RateItem[];

    return NextResponse.json(
      { ok: true, rates: cleaned, ts: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, rates: [], error: e?.message || "rates_failed" },
      { status: 500 }
    );
  }
}
