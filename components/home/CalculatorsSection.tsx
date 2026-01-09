"use client";

import type React from "react";
import { useMemo, useState } from "react";
import { Calculator, BadgeCheck, ArrowRight, Info, AlertTriangle } from "lucide-react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function toNumber(v: string, fallback = 0) {
  const t = (v ?? "").trim();
  if (!t) return fallback;
  const n = Number(t);
  return Number.isFinite(n) ? n : fallback;
}

function formatTRY(n: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

function formatPct01(x: number) {
  return `${Math.round(clamp(x, 0, 1) * 100)}%`;
}

type Tone = "good" | "warn" | "risk";

function toneStyles(tone: Tone) {
  // Kurumsal, okunur, abartısız
  if (tone === "good")
    return {
      badge: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
      bar: "bg-emerald-600",
      icon: "text-emerald-700",
      box: "border-emerald-200 bg-emerald-50/60",
    };
  if (tone === "warn")
    return {
      badge: "bg-amber-50 text-amber-900 ring-1 ring-amber-200",
      bar: "bg-amber-600",
      icon: "text-amber-800",
      box: "border-amber-200 bg-amber-50/60",
    };
  return {
    badge: "bg-rose-50 text-rose-900 ring-1 ring-rose-200",
    bar: "bg-rose-600",
    icon: "text-rose-800",
    box: "border-rose-200 bg-rose-50/60",
  };
}

function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold transition",
        active
          ? "bg-slate-900 text-white shadow-sm"
          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-end justify-between gap-3">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

function NumberField({
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => {
          const next = toNumber(e.target.value, 0);
          const clamped =
            typeof min === "number" && typeof max === "number"
              ? clamp(next, min, max)
              : typeof min === "number"
              ? Math.max(min, next)
              : typeof max === "number"
              ? Math.min(max, next)
              : next;
          onChange(clamped);
        }}
        min={min}
        max={max}
        step={step}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none focus:ring-2 focus:ring-primary/30"
      />
      {suffix ? (
        <span className="shrink-0 rounded-lg bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}

function Range({
  value,
  onChange,
  min,
  max,
  step,
}: {
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(clamp(toNumber(e.target.value, min), min, max))}
      className="h-2 w-full cursor-pointer accent-slate-900"
    />
  );
}

function ResultCard({
  title,
  badge,
  tone,
  bigLabel,
  bigValue,
  message,
  warning,
  note,
  ctaText,
}: {
  title: string;
  badge: string;
  tone: Tone;
  bigLabel: string;
  bigValue: string;
  message: string;
  warning?: string;
  note: string;
  ctaText: string;
}) {
  const s = toneStyles(tone);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-xs text-slate-600">{bigLabel}</p>
        </div>

        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${s.badge}`}>
          {badge}
        </span>
      </div>

      {/* Big Value */}
      <div className="mt-4">
        <div className="text-3xl font-extrabold tracking-tight text-slate-900">{bigValue}</div>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{message}</p>

        {/* Warning */}
        {warning ? (
          <div className={`mt-3 flex items-start gap-2 rounded-xl border p-3 ${s.box}`}>
            <AlertTriangle size={16} className={`mt-0.5 shrink-0 ${s.icon}`} />
            <p className="text-xs text-slate-800">{warning}</p>
          </div>
        ) : null}

        {/* Note */}
        <p className="mt-3 flex items-center gap-2 text-xs text-slate-600">
          <Info size={14} />
          {note}
        </p>

        {/* CTA */}
        <a
          href="#iletisim"
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
        >
          {ctaText} <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}

export default function CalculatorsSection() {
  // Profil
  const [netIncome, setNetIncome] = useState<number>(35000);
  const [monthlyDebt, setMonthlyDebt] = useState<number>(3000);
  const [scoreBand, setScoreBand] = useState<"low" | "mid" | "high">("mid");

  // Taksit
  const [loanAmount, setLoanAmount] = useState<number>(200000);
  const [months, setMonths] = useState<number>(24);
  const [monthlyRate, setMonthlyRate] = useState<number>(3.49);

  const profile = useMemo(() => {
    const income = Math.max(0, netIncome);
    const debt = Math.max(0, monthlyDebt);

    const disposable = Math.max(0, income - debt);
    const debtRatio = income > 0 ? debt / income : 1; // 0-1

    // Skor bandına göre “tahmini” limit çarpanı (sadece ön fikir)
    const factor = scoreBand === "high" ? 14 : scoreBand === "mid" ? 12 : 10;
    const approxLimit = clamp(disposable * factor, 0, 1_500_000);

    // Ton: borç oranı + skor bandı
    const baseTone: Tone = debtRatio <= 0.30 ? "good" : debtRatio <= 0.45 ? "warn" : "risk";
    const tone: Tone = scoreBand === "low" ? (baseTone === "good" ? "warn" : "risk") : baseTone;

    const badge =
      tone === "good" ? "Daha uygun profil" : tone === "warn" ? "Sınırda / dikkat" : "Riskli / önce plan";

    const message =
      tone === "good"
        ? "Gelir–borç dengesi daha sağlıklı görünüyor. Doğru ürün seçimiyle başvuru ihtimali artabilir."
        : tone === "warn"
        ? "Profil sınırda. Vade/limit ayarı veya borç oranını biraz düşürmek sonucu belirgin etkileyebilir."
        : "Bu profilde direkt başvuru çoğu zaman ret riskini artırır. Önce kısa bir plan çıkarmak daha mantıklı.";

    const warning =
      tone === "risk"
        ? "Öneri: önce borç/taksit yükünü azaltma veya yapılandırma seçeneklerini değerlendirip sonra başvuruya geç."
        : undefined;

    return {
      disposable,
      debtRatio,
      tone,
      badge,
      approxLimit,
      message,
      warning,
      note:
        "Bu sonuçlar bilgilendirme amaçlıdır. Banka kriterleri, gelir belgesi ve ürün tipi sonucu değiştirebilir.",
      smallLine: `Kullanılabilir gelir: ${formatTRY(disposable)} • Borç/Gelir: ${formatPct01(debtRatio)}`,
    };
  }, [netIncome, monthlyDebt, scoreBand]);

  const installment = useMemo(() => {
    const P = Math.max(0, loanAmount);
    const r = Math.max(0, monthlyRate) / 100;
    const n = Math.max(1, months);

    if (r === 0) {
      const pay = P / n;
      return { pay, total: pay * n };
    }

    const pow = Math.pow(1 + r, n);
    const pay = (P * r * pow) / (pow - 1);
    const total = pay * n;

    return { pay, total };
  }, [loanAmount, months, monthlyRate]);

  const taksit = useMemo(() => {
    const income = Math.max(0, netIncome);
    const debt = Math.max(0, monthlyDebt);
    const pay = Math.max(0, installment.pay);

    const totalRatio = income > 0 ? (debt + pay) / income : 1;

    const tone: Tone = totalRatio <= 0.35 ? "good" : totalRatio <= 0.50 ? "warn" : "risk";
    const badge = tone === "good" ? "Genel olarak makul" : tone === "warn" ? "Sınırda" : "Yüksek";

    const message =
      tone === "good"
        ? "Bu taksit, mevcut profilinle daha makul görünüyor."
        : tone === "warn"
        ? "Bu taksit sınırda. Tutarı azaltmak veya vadeyi artırmak daha sağlıklı olabilir."
        : "Bu taksit yüksek görünüyor. Başvuru öncesi borç oranını düşürmek daha mantıklı olabilir.";

    const warning =
      tone === "risk"
        ? "Uyarı: yüksek taksit oranı, başvurularda ret riskini artırabilir."
        : undefined;

    return {
      tone,
      badge,
      message,
      warning,
      note: "Sonuçlar bilgilendirme amaçlıdır; faiz ve masraflar ürüne göre değişebilir.",
      smallLine: `Toplam borç oranı (mevcut + yeni): ${formatPct01(totalRatio)} • Toplam geri ödeme: ${formatTRY(
        installment.total
      )}`,
    };
  }, [netIncome, monthlyDebt, installment.pay, installment.total]);

  return (
    <section id="hesaplama" className="relative mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm font-semibold tracking-wide text-primary/90">HIZLI TEST</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Profilini gör, sonraki adımı seç
        </h2>
        <p className="mt-3 text-slate-600">
          Rastgele başvuru yerine, önce tabloyu gör — sonra ücretsiz ön analizle netleştir.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* PROFIL TEST */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BadgeCheck size={22} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Kredi Profili</h3>
              <p className="text-sm text-slate-600">Gelir–borç dengesine göre hızlı ön fikir.</p>
            </div>
          </div>

          <div className="grid gap-4">
            <Field label="Aylık Net Gelir" hint="₺">
              <NumberField value={netIncome} onChange={setNetIncome} min={0} max={300000} step={100} />
              <Range value={netIncome} onChange={setNetIncome} min={0} max={200000} step={250} />
              <div className="flex flex-wrap gap-2">
                {[25000, 35000, 50000, 75000].map((v) => (
                  <Chip key={v} active={netIncome === v} onClick={() => setNetIncome(v)}>
                    {formatTRY(v)}
                  </Chip>
                ))}
              </div>
            </Field>

            <Field label="Aylık Toplam Borç/Taksit" hint="₺">
              <NumberField value={monthlyDebt} onChange={setMonthlyDebt} min={0} max={200000} step={100} />
              <Range value={monthlyDebt} onChange={setMonthlyDebt} min={0} max={60000} step={250} />
              <div className="flex flex-wrap gap-2">
                {[0, 3000, 8000, 15000].map((v) => (
                  <Chip key={v} active={monthlyDebt === v} onClick={() => setMonthlyDebt(v)}>
                    {formatTRY(v)}
                  </Chip>
                ))}
              </div>
            </Field>

            <Field label="Kredi Notu Aralığı">
              <div className="grid grid-cols-3 gap-2">
                <Chip active={scoreBand === "low"} onClick={() => setScoreBand("low")}>
                  Düşük
                </Chip>
                <Chip active={scoreBand === "mid"} onClick={() => setScoreBand("mid")}>
                  Orta
                </Chip>
                <Chip active={scoreBand === "high"} onClick={() => setScoreBand("high")}>
                  İyi
                </Chip>
              </div>
              <p className="text-xs text-slate-500">
                Seçim temsili bir aralıktır; bankaya/ürüne göre değişir.
              </p>
            </Field>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Hızlı özet</p>
              <p className="mt-1 text-xs text-slate-600">{profile.smallLine}</p>
            </div>

            <ResultCard
              title="Tahmini Kredi Limiti (yaklaşık)"
              badge={profile.badge}
              tone={profile.tone}
              bigLabel="Bu sadece ön fikir verir"
              bigValue={formatTRY(profile.approxLimit)}
              message={profile.message}
              warning={profile.warning}
              note={profile.note}
              ctaText="Ücretsiz ön analiz al"
            />
          </div>
        </div>

        {/* TAKSIT */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Calculator size={22} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Taksit Hesabı</h3>
              <p className="text-sm text-slate-600">Aylık taksit ve toplam geri ödemeyi gör.</p>
            </div>
          </div>

          <div className="grid gap-4">
            <Field label="Kredi Tutarı" hint="₺">
              <NumberField value={loanAmount} onChange={setLoanAmount} min={0} max={2_000_000} step={1000} />
              <Range value={loanAmount} onChange={setLoanAmount} min={0} max={1_000_000} step={5000} />
              <div className="flex flex-wrap gap-2">
                {[100000, 200000, 300000, 500000].map((v) => (
                  <Chip key={v} active={loanAmount === v} onClick={() => setLoanAmount(v)}>
                    {formatTRY(v)}
                  </Chip>
                ))}
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Vade" hint="ay">
                <NumberField value={months} onChange={setMonths} min={1} max={120} step={1} />
                <Range value={months} onChange={setMonths} min={1} max={120} step={1} />
                <div className="flex flex-wrap gap-2">
                  {[12, 24, 36, 48].map((v) => (
                    <Chip key={v} active={months === v} onClick={() => setMonths(v)}>
                      {v} ay
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field label="Aylık Faiz" hint="%">
                <NumberField value={monthlyRate} onChange={setMonthlyRate} min={0} max={20} step={0.01} />
                <Range value={monthlyRate} onChange={setMonthlyRate} min={0} max={10} step={0.01} />
                <div className="flex flex-wrap gap-2">
                  {[2.99, 3.49, 3.99, 4.49].map((v) => (
                    <Chip key={v} active={monthlyRate === v} onClick={() => setMonthlyRate(v)}>
                      {v.toFixed(2)}%
                    </Chip>
                  ))}
                </div>
              </Field>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Hızlı özet</p>
              <p className="mt-1 text-xs text-slate-600">{taksit.smallLine}</p>
            </div>

            <ResultCard
              title="Aylık Taksit (yaklaşık)"
              badge={taksit.badge}
              tone={taksit.tone}
              bigLabel="Bu sadece ön fikir verir"
              bigValue={formatTRY(installment.pay)}
              message={taksit.message}
              warning={taksit.warning}
              note={taksit.note}
              ctaText="Net planı çıkaralım"
            />
          </div>
        </div>
      </div>

      {/* TrustSection'a köprü */}
      <div className="mx-auto mt-10 max-w-3xl text-center">
        <p className="text-sm text-slate-600">
          Sonuçlar ön fikirdir — net plan için ücretsiz ön analizle ilerleyelim.
        </p>
      </div>
    </section>
  );
}
