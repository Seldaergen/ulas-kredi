"use client";

import type React from "react";
import { useMemo, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                              CONTACT CONSTANTS                             */
/* -------------------------------------------------------------------------- */

const PHONE_E164 = "905416061356"; // ✅ tek kaynak
const PHONE_DISPLAY = "0 541 606 13 56";
const EMAIL = "ulaskredidanisman@gmail.com";

const WHATSAPP_BASE = `https://wa.me/${PHONE_E164}`;
const TEL_HREF = `tel:+${PHONE_E164}`;
const MAIL_HREF = `mailto:${EMAIL}`;

function openExternal(url: string) {
  // Popup engeli olursa aynı sekmede aç
  const w = window.open(url, "_blank", "noopener,noreferrer");
  if (!w) window.location.href = url;
}

function normalizePhone(input: string) {
  // Kullanıcı ne yazarsa yazsın basit normalize: sadece rakamlar
  const digits = (input || "").replace(/\D/g, "");
  // 0 ile başlıyorsa kırp (TR mobil)
  if (digits.startsWith("0")) return digits.slice(1);
  // 90 ile başlıyorsa kırp (bazı kullanıcılar 905xx yazabilir)
  if (digits.startsWith("90")) return digits.slice(2);
  return digits;
}

function safeText(s: string) {
  return (s || "").trim().replace(/\s+/g, " ");
}

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export function Contact() {
  const [busy, setBusy] = useState(false);

  const [topic, setTopic] = useState<
    "Kredi Notu" | "Limit" | "Red Analizi" | "Yapılandırma" | "Diğer"
  >("Kredi Notu");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const canSubmit = useMemo(() => {
    const nameOk = safeText(form.name).length >= 2;
    const phoneOk = normalizePhone(form.phone).length >= 10; // 5xx... 10 hane
    const msgOk = safeText(form.message).length >= 10;
    return nameOk && phoneOk && msgOk && !busy;
  }, [form.name, form.phone, form.message, busy]);

  function buildWhatsappUrl() {
    const name = safeText(form.name);
    const phoneRaw = safeText(form.phone);
    const msg = safeText(form.message);

    const text =
      `Merhaba, ben ${name}.\n` +
      `Konu: ${topic}\n` +
      `Telefon: ${phoneRaw}\n\n` +
      `Mesaj:\n${msg}`;

    return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setBusy(true);
    openExternal(buildWhatsappUrl());
    // Kullanıcı WhatsApp’a geçerken buton spam’i engelle
    window.setTimeout(() => setBusy(false), 700);
  }

  return (
    <section id="iletisim" className="relative overflow-hidden py-16 sm:py-20 md:py-28">
      {/* Soft gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.10),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-1 text-sm font-medium text-sky-700">
            <Sparkles className="h-4 w-4" />
            Ücretsiz Ön Analiz
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Kredi Durumunuzu Birlikte Netleştirelim
          </h1>

          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            Kredi notu, limit, red analizi ve yapılandırma için WhatsApp’tan hızlıca yazın.
            Kısa ön değerlendirme ile size uygun yol haritasını çıkaralım.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {(["Kredi Notu", "Limit", "Red Analizi", "Yapılandırma", "Diğer"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition",
                  "ring-1 ring-black/10 bg-white/75 backdrop-blur hover:bg-white",
                  topic === t && "bg-cyan-50 ring-cyan-200/70 text-slate-900"
                )}
                aria-pressed={topic === t}
              >
                <CheckCircle2 className={cn("h-4 w-4", topic === t ? "text-cyan-700" : "text-slate-400")} />
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* LEFT – INFO */}
          <div className="space-y-6">
            <Card className="border-sky-500/30 shadow-md">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15">
                  <MapPin className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Merkez</h3>
                  <p className="text-slate-800">İstanbul</p>
                  <p className="text-sm text-muted-foreground">
                    Türkiye geneli online danışmanlık
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="transition hover:shadow-lg">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
                  <Phone className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Telefon</h3>
                  <a
                    href={TEL_HREF}
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Hafta içi 09:00 – 18:00
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="transition hover:shadow-lg">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15">
                  <Mail className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">E-posta</h3>
                  <a
                    href={MAIL_HREF}
                    className="underline-offset-4 hover:underline"
                  >
                    {EMAIL}
                  </a>
                  <p className="text-sm text-muted-foreground">24 saat içinde dönüş</p>
                </div>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="w-full gap-2 bg-linear-to-r from-emerald-500 to-sky-500 text-white shadow-lg hover:shadow-xl"
              onClick={() => openExternal(WHATSAPP_BASE)}
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp’tan Direkt Yaz
            </Button>

            <div className="flex items-start gap-2 rounded-xl border bg-white/60 px-4 py-3 text-sm text-muted-foreground backdrop-blur">
              <ShieldCheck className="mt-0.5 h-4 w-4" />
              <span>
                Mesajlarınız kaydedilmez; form gönderimi sizi doğrudan WhatsApp’a yönlendirir.
              </span>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <Card className="shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Ad Soyad</Label>
                  <Input
                    id="name"
                    placeholder="Adınız Soyadınız"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="05xx xxx xx xx"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    autoComplete="tel"
                    required
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Yalnızca sizinle iletişim kurmak için kullanılır.
                  </p>
                </div>

                <div>
                  <Label htmlFor="message">Mesajınız</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Örn: Gelir, mevcut borçlar, hedef kredi tutarı, daha önce red aldıysanız hangi bankadan…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Ne kadar net yazarsanız, ön analizi o kadar hızlı yaparız.
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={!canSubmit}
                  className={cn(
                    "w-full gap-2 text-white",
                    "bg-linear-to-r from-sky-600 to-emerald-600",
                    !canSubmit && "opacity-70"
                  )}
                >
                  <MessageCircle className="h-4 w-4" />
                  {busy ? "Açılıyor…" : "WhatsApp’tan Gönder"}
                </Button>

                <p className="text-xs text-muted-foreground">
                  Not: Kredi onayı ve nihai karar bankaya aittir. Bu sayfa danışmanlık/bilgilendirme amaçlıdır.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
