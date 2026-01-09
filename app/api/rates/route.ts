import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 300; // 5 dk (server tarafı cache)

type RateData = {
  name: string;
  value: string;
  change: number;
  symbol: string;
};

function withTimeout(ms: number) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  return { ctrl, done: () => clearTimeout(t) };
}

// "42.1234" -> number
function parseDotNumber(s: string | null | undefined): number | null {
  const x = (s || "").trim();
  if (!x) return null;
  const n = Number(x);
  return Number.isFinite(n) ? n : null;
}

// "6.168.189,09" -> 6168189.09
function parseTrNumber(s: string | null | undefined): number | null {
  const x = (s || "").trim();
  if (!x) return null;
  const normalized = x.replace(/\./g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function fmtDot(n: number | null, digits = 2): string {
  if (n == null) return "—";
  return n.toFixed(digits);
}

/**
 * TCMB today.xml içinden USD/EUR kurunu alır.
 * Öncelik: ForexSelling; yoksa ForexBuying
 */
function extractTcmbFx(xml: string, code: "USD" | "EUR"): number | null {
  const block = xml.match(
    new RegExp(`<Currency[^>]*CurrencyCode="${code}"[\\s\\S]*?<\\/Currency>`, "i")
  )?.[0];
  if (!block) return null;

  const selling = block.match(/<ForexSelling>([^<]*)<\/ForexSelling>/i)?.[1];
  const buying = block.match(/<ForexBuying>([^<]*)<\/ForexBuying>/i)?.[1];

  return parseDotNumber((selling || "").trim()) ?? parseDotNumber((buying || "").trim());
}

/**
 * BIST "Metal Fiyatları" sayfasından "Metal Fiyatı(TRY/KG)" satırındaki
 * ilk TR sayı değerini (Altın TRY/KG) alır.
 */
function extractBistGoldTryKg(html: string): number | null {
  const idx = html.indexOf("Metal Fiyatı(TRY/KG)");
  if (idx < 0) return null;

  const slice = html.slice(idx, idx + 1800);
  const nums = slice.match(/\d{1,3}(?:\.\d{3})*(?:,\d{2})/g) || [];
  if (!nums.length) return null;

  return parseTrNumber(nums[0]);
}

async function fetchText(url: string, timeoutMs = 6500) {
  const { ctrl, done } = withTimeout(timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      next: { revalidate },
      headers: {
        "User-Agent": "ulas-kredi/1.0 (+server)",
        Accept: "text/html,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    const text = await res.text();
    return { ok: res.ok, text };
  } finally {
    done();
  }
}

const FALLBACK: RateData[] = [
  { name: "USD/TRY", value: "34.52", change: 0, symbol: "₺" },
  { name: "EUR/TRY", value: "36.18", change: 0, symbol: "₺" },
  { name: "ALTIN", value: "2350.00", change: 0, symbol: "₺" },
];

export async function GET() {
  try {
    const [tcmb, bist] = await Promise.all([
      fetchText("https://www.tcmb.gov.tr/kurlar/today.xml"),
      fetchText(
        "https://www.borsaistanbul.com/veriler/kiymetli-madenler-ve-kiymetli-taslar-piyasasi/metal-fiyatlari"
      ),
    ]);

    if (!tcmb.ok && !bist.ok) {
      return NextResponse.json({ ok: true, rates: FALLBACK }, { headers: { "Cache-Control": "no-store" } });
    }

    const usd = tcmb.ok ? extractTcmbFx(tcmb.text, "USD") : null;
    const eur = tcmb.ok ? extractTcmbFx(tcmb.text, "EUR") : null;

    // BIST: Altın TRY/KG -> TRY/GRAM
    const goldTryKg = bist.ok ? extractBistGoldTryKg(bist.text) : null;
    const goldTryGram = goldTryKg != null ? goldTryKg / 1000 : null;

    const rates: RateData[] = [
      {
        name: "USD/TRY",
        value: fmtDot(usd, 4), // daha düzgün görünür
        change: 0,
        symbol: "₺",
      },
      {
        name: "EUR/TRY",
        value: fmtDot(eur, 4),
        change: 0,
        symbol: "₺",
      },
      {
        name: "ALTIN",
        value: fmtDot(goldTryGram, 2), // gram bazına çevirdik
        change: 0,
        symbol: "₺",
      },
    ];

    // Eğer bir alan null kaldıysa fallback değeriyle doldur
    const finalRates = rates.map((r, i) => (r.value === "—" ? FALLBACK[i] : r));

    return NextResponse.json(
      { ok: true, rates: finalRates, ts: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch {
    return NextResponse.json({ ok: true, rates: FALLBACK }, { headers: { "Cache-Control": "no-store" } });
  }
}
