"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Shield, TrendingUp, Target, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ----------------------------- CONTENT DATA ----------------------------- */

const ROTATING_PHRASES = [
  "KREDİ NOTUNU YÜKSELTİYORUZ",
  "LİMİT ARTIRMA STRATEJİSİ KURUYORUZ",
  "REDLERİ AVANTAJA ÇEVİRİYORUZ",
  "BANKA MANTIĞIYLA YOL ÇİZİYORUZ",
];

const badges = [
  { icon: Shield, text: "Ön ödemesiz süreç" },
  { icon: TrendingUp, text: "Kredi notu & limit analizi" },
  { icon: Target, text: "Yüksek limit odaklı strateji" },
];

const trust = ["Ücretsiz ön analiz", "Hızlı geri dönüş", "Gizlilik & KVKK hassasiyeti"];

/* ----------------------------- CONFIG ----------------------------- */

const WHATSAPP_NUMBER = "905416061356";

/* ----------------------------- HELPERS ----------------------------- */

function StatPill({
  value,
  label,
  tone = "text-slate-900",
}: {
  value: string;
  label: string;
  tone?: string;
}) {
  return (
    <div className="text-center min-w-0">
      <div className={cn("font-bold tracking-tight", tone, "text-xl sm:text-2xl md:text-3xl")}>
        {value}
      </div>
      <div className="mt-1 text-[11px] sm:text-xs md:text-sm text-slate-600 leading-snug">
        {label}
      </div>
    </div>
  );
}

/** TR phone mask: 05XX XXX XX XX */
function formatTRPhone(input: string) {
  const digits = input.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";

  let d = digits;
  if (d.length >= 1 && d[0] !== "0") d = ("0" + d).slice(0, 11);

  const p1 = d.slice(0, 4);
  const p2 = d.slice(4, 7);
  const p3 = d.slice(7, 9);
  const p4 = d.slice(9, 11);

  let out = p1;
  if (p2) out += " " + p2;
  if (p3) out += " " + p3;
  if (p4) out += " " + p4;
  return out;
}

function normalizePhone(raw: string) {
  return raw.replace(/\D/g, "").replace(/^0/, "");
}

function safeText(raw: string) {
  return raw.replace(/\s+/g, " ").trim().slice(0, 800);
}

function openExternal(url: string) {
  const w = window.open(url, "_blank", "noopener,noreferrer");
  if (!w) window.location.href = url;
}

/* ----------------------------- HERO ----------------------------- */

export default function HeroSections() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    creditType: "",
    note: "",
  });

  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [busy, setBusy] = useState(false);

  const [phraseIndex, setPhraseIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 420px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const phrases = useMemo(() => ROTATING_PHRASES, []);
  const currentPhrase = phrases[phraseIndex % phrases.length];

  useEffect(() => {
    const t = setInterval(() => setPhraseIndex((i) => i + 1), 2600);
    return () => clearInterval(t);
  }, []);

  const canSubmit = useMemo(() => {
    const nameOk = safeText(formData.name).length >= 2;
    const phoneOk = normalizePhone(formData.phone).length >= 10; // 10 hane (5xx...)
    const typeOk = safeText(formData.creditType).length > 0;
    // note opsiyonel ama varsa çok kısa olmasın:
    const noteOk = formData.note ? safeText(formData.note).length >= 0 : true;
    return nameOk && phoneOk && typeOk && noteOk && kvkkAccepted && !busy;
  }, [formData, kvkkAccepted, busy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (busy) return;

    setBusy(true);

    const name = safeText(formData.name);
    const phone = normalizePhone(formData.phone);
    const creditType = safeText(formData.creditType);
    const note = safeText(formData.note);

    const typeLabel =
      creditType === "ihtiyac"
        ? "İhtiyaç Kredisi"
        : creditType === "konut"
        ? "Konut Kredisi"
        : creditType === "tasit"
        ? "Taşıt Kredisi"
        : creditType === "esnaf"
        ? "Esnaf / KOBİ Kredisi"
        : creditType === "diger"
        ? "Diğer"
        : creditType;

    const text =
      `Merhaba, ücretsiz ön analiz için bilgi bırakıyorum.\n\n` +
      `Ad Soyad: ${name}\n` +
      `Telefon: 0${phone}\n` +
      `Kredi Türü: ${typeLabel}\n` +
      (note ? `Not: ${note}\n` : "") +
      `\nKVKK okudum ve kabul ediyorum.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    openExternal(url);
    setTimeout(() => setBusy(false), 700);
  };

  return (
    <section
      id="hero"
      className={cn(
        "relative overflow-x-clip",
        "pt-3 pb-8 sm:pt-10 sm:pb-12 md:py-20",
        "scroll-mt-32"
      )}
    >
      {/* BG */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-white" />
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(56,189,248,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_22%,rgba(16,185,129,0.10),transparent_62%)]" />
        <div className="absolute inset-x-0 top-0 h-24 sm:h-28 bg-linear-to-b from-white to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-linear-to-t from-white to-transparent" />
      </div>

      {/* bottom transition */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/80 to-white" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-200/70 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 sm:gap-9 lg:grid-cols-12 lg:gap-14">
          {/* LEFT */}
          <div className="lg:col-span-7 flex flex-col min-w-0">
            <h1 className="mt-1 font-extrabold tracking-tight text-slate-900 leading-[1.05]">
              <span className="block text-[clamp(28px,7vw,56px)] text-balance">
                Kredi Limitinizi{" "}
                <span className="bg-linear-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  Banka Mantığıyla
                </span>{" "}
                Güçlendiren Net Bir Yol Haritası
              </span>
            </h1>

            <p className="mt-3 text-[15px] sm:text-base md:text-lg text-slate-600 leading-relaxed">
              Kredi notu, limit, başvuru sırası ve risk kalemlerini birlikte analiz ediyor;{" "}
              <span className="font-semibold text-slate-800">doğru adımlarla</span>{" "}
              onay ihtimalinizi artırmaya odaklanıyoruz.
            </p>

            {/* BUGÜN */}
            <div className="mt-4 sm:mt-5 min-w-0">
              <div
                className={cn(
                  "w-full rounded-2xl border border-slate-200 bg-white/95",
                  "backdrop-blur shadow-[0_14px_40px_rgba(15,23,42,0.08)]",
                  "min-h-14 sm:min-h-15"
                )}
              >
                <div className="w-full px-3 sm:px-4 py-3 flex items-start gap-2 min-w-0">
                  <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-600 shrink-0 leading-5">
                    BUGÜN:
                  </span>

                  <span
                    key={phraseIndex}
                    className={cn(
                      "min-w-0 flex-1",
                      "whitespace-normal wrap-break-word",
                      "text-[13px] sm:text-base md:text-lg",
                      "font-extrabold leading-snug",
                      "tracking-[0.01em] sm:tracking-[0.08em]",
                      "bg-linear-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent",
                      "animate-[flipInStable_0.45s_ease-out]"
                    )}
                  >
                    {currentPhrase}
                  </span>
                </div>
              </div>

              <p className="mt-2 sm:mt-3 text-[15px] sm:text-base md:text-lg text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">15+ yıl deneyim</span> ve 25+ banka ağıyla, ön ödemesiz
                şekilde süreci planlıyor ve yönetiyoruz.
              </p>
            </div>

            {/* badges */}
            <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 min-w-0">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-slate-200 bg-white/90",
                    "px-4 py-2.5 text-[15px] text-slate-700 backdrop-blur",
                    "min-w-0"
                  )}
                >
                  <b.icon className="h-5 w-5 shrink-0" />
                  <span className="font-semibold wrap-break-word">{b.text}</span>
                </div>
              ))}
            </div>

            {/* stats */}
            <div className="mt-6 sm:mt-7 rounded-3xl border border-slate-200/80 bg-white/90 p-5 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur">
              <div className="flex items-start sm:items-center justify-between gap-3">
                <div className="text-[15px] sm:text-base font-semibold text-slate-900 leading-snug">
                  Son 12 ayda öne çıkan veriler
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-sm text-slate-600 backdrop-blur shrink-0">
                  <Wallet className="h-4 w-4" />
                  Ücretsiz ön görüşme
                </div>
              </div>

              <div className="mt-4 sm:mt-5 grid grid-cols-3 gap-3 sm:gap-4">
                <StatPill value="12K+" label="Başvuru Analizi" />
                <StatPill value="Yüksek" label="Doğru Planlama Etkisi*" tone="text-emerald-600" />
                <StatPill value="15+" label="Yıllık Deneyim" tone="text-sky-600" />
              </div>

              <div className="mt-4 sm:mt-5 rounded-2xl border border-slate-200/70 bg-white/90 p-4 text-left">
                <div className="text-sm font-semibold text-slate-700">Örnek senaryo</div>
                <div className="mt-1 text-sm leading-relaxed text-slate-600">
                  Not/limit profili iyileştirme, doğru başvuru sırası ve temiz geçmiş ile onay ihtimali belirgin şekilde
                  artabilir.
                </div>
              </div>

              <div className="mt-3 text-[11px] text-slate-400">
                *Nihai kredi kararı bankaların değerlendirmesine bağlıdır.
              </div>
            </div>

            {/* trust */}
            <div className="mt-6 sm:mt-7 grid gap-2 sm:grid-cols-3 text-[15px] sm:text-base text-slate-600 min-w-0">
              {trust.map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 backdrop-blur min-w-0"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span className="font-semibold wrap-break-word">{t}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6 sm:mt-7 flex flex-wrap gap-3">
              <a
                href="/iletisim"
                className={cn(
                  "group inline-flex h-12 items-center justify-center rounded-xl px-6 text-base font-semibold text-white",
                  "bg-slate-900 shadow-sm transition-all duration-200",
                  "hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm",
                  "relative overflow-hidden"
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                    bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.30),transparent_55%)]"
                />
                <span className="relative">Ücretsiz ön analiz al →</span>
              </a>

              <a
                href="/rehber"
                className={cn(
                  "group inline-flex h-12 items-center justify-center rounded-xl px-6 text-base font-semibold",
                  "border border-slate-200 bg-white/90 text-slate-900 backdrop-blur shadow-sm transition-all duration-200",
                  "hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm",
                  "relative overflow-hidden"
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                    bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.18),transparent_55%)]"
                />
                <span className="relative">Rehberi incele</span>
              </a>
            </div>

            {/* legal mini band */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-xs text-slate-600">
              Kredi onayı/şartlar ilgili finans kuruluşlarına aittir. Bu alan danışmanlık & bilgilendirme kapsamındadır.
              <span className="mx-2 text-slate-300">•</span>
              <Link href="/kvkk" className="underline underline-offset-2 hover:text-slate-800">
                KVKK
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-24 min-w-0">
            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="relative aspect-16/10">
                <Image
                  src="/ulas-hero-analiz.jpg"
                  alt="Kredi analizi ve danışmanlık"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/0 to-white/10" />
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <div className="rounded-2xl border border-white/40 bg-white/85 px-4 py-3 shadow-lg shadow-slate-900/10 backdrop-blur">
                  <div className="text-xs font-medium text-slate-600">Örnek analiz özeti</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    3 banka, 5 farklı oran, tek rapor.
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Toplam maliyet, dosya masrafı ve sigorta kalemleri ayrı ayrı gösterilir.
                  </div>
                </div>
              </div>
            </div>

            {/* FORM */}
            <Card className="border-slate-200/80 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-slate-900">Hızlı Ön Başvuru</CardTitle>
                <p className="text-sm text-slate-600">
                  Bilgilerinizi bırakın, size en kısa sürede WhatsApp’tan dönüş yapalım.
                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-xs text-slate-600 backdrop-blur">
                  <Shield className="h-4 w-4" />
                  Bilgiler yalnızca ön analiz için kullanılır.
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm">
                      Ad Soyad
                    </Label>
                    <Input
                      id="name"
                      placeholder="Adınız ve soyadınız"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-white h-11 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm">
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="05XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: formatTRPhone(e.target.value) })
                      }
                      required
                      className="bg-white h-11 text-base"
                    />
                    <p className="text-[12px] text-slate-500">Örn: 0532 123 45 67</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="creditType" className="text-sm">
                      Kredi Türü
                    </Label>

                    <Select
                      value={formData.creditType}
                      onValueChange={(value) => setFormData({ ...formData, creditType: value })}
                    >
                      <SelectTrigger
                        id="creditType"
                        className={cn(
                          "h-11 text-base",
                          "bg-white",
                          "focus:ring-2 focus:ring-sky-300/60 focus:ring-offset-0"
                        )}
                      >
                        <SelectValue placeholder="Kredi türü seçin" />
                      </SelectTrigger>

                      <SelectContent
                        position="popper"
                        className={cn(
                          "z-80",
                          "bg-white",
                          "backdrop-blur-none",
                          "border border-slate-200",
                          "shadow-[0_20px_60px_rgba(15,23,42,0.20)]"
                        )}
                      >
                        <SelectItem value="ihtiyac">İhtiyaç Kredisi</SelectItem>
                        <SelectItem value="konut">Konut Kredisi</SelectItem>
                        <SelectItem value="tasit">Taşıt Kredisi</SelectItem>
                        <SelectItem value="esnaf">Esnaf / KOBİ Kredisi</SelectItem>
                        <SelectItem value="diger">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="note" className="text-sm">
                      Kısa Not (Opsiyonel)
                    </Label>
                    <Textarea
                      id="note"
                      placeholder="Kısaca durumunuzu yazabilirsiniz..."
                      rows={3}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="bg-white text-base"
                    />
                  </div>

                  {/* KVKK CONSENT */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <label className="flex items-start gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={kvkkAccepted}
                        onChange={(e) => setKvkkAccepted(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                        required
                      />
                      <span className="leading-relaxed">
                        <Link href="/kvkk" target="_blank" className="font-semibold underline underline-offset-4">
                          KVKK Aydınlatma Metni
                        </Link>
                        ’ni okudum, anladım ve kişisel verilerimin danışmanlık süreci kapsamında işlenmesini kabul ediyorum.
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className={cn(
                      "w-full h-12 rounded-xl text-base font-semibold",
                      "bg-slate-900 text-white hover:bg-slate-800",
                      !canSubmit && "opacity-60 cursor-not-allowed"
                    )}
                    size="lg"
                  >
                    {busy ? "Açılıyor…" : "Ücretsiz Ön Analiz Talep Et"}
                  </Button>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[12px] text-slate-500">
                    <span className="leading-relaxed">
                      Göndererek iletişime geçilmesini kabul etmiş olursunuz.
                    </span>
                    <Link href="/kvkk" className="underline underline-offset-2 hover:text-slate-700">
                      KVKK
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => openExternal(`https://wa.me/${WHATSAPP_NUMBER}`)}
                    className="flex items-center justify-center gap-2 text-base text-slate-600 transition-colors hover:text-slate-900"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    ya da WhatsApp ile yazın
                  </button>
                </form>
              </CardContent>
            </Card>

            {/* tiny note */}
            <div className="text-[11px] text-slate-500 px-1">
              Not: Kredi onayı ve şartlar finans kuruluşlarının değerlendirmesine bağlıdır. Bu form danışmanlık amaçlıdır.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
