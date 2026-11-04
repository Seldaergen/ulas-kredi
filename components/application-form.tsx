"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { APPLICATION_PRIVACY_VERSION, applicationInput, TOPICS } from "@/lib/applications/validation";
import { ApplicationContactFallback } from "@/components/application-contact-fallback";

export function ApplicationForm({ channel }: { channel: "HERO_FORM" | "CONTACT_FORM" }) {
  const prefix = useId();
  const [form, setForm] = useState({ name: "", phone: "", topic: "", note: "", website: "" });
  const [acknowledged, setAcknowledged] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<string[]>([]);
  const [policy, setPolicy] = useState<{ retentionDays: number; controllerLabel: string; testEnvironment: boolean } | null>(null);
  const [policyChecked, setPolicyChecked] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/application-policy", { signal: controller.signal, cache: "no-store" }).then(response => response.ok ? response.json() : null).then(value => {
      if (!controller.signal.aborted && value?.enabled === true && value?.privacyVersion === APPLICATION_PRIVACY_VERSION &&
          Number.isInteger(value.retentionDays) && value.retentionDays > 0 && value.retentionDays <= 365 && typeof value.controllerLabel === "string") setPolicy({ ...value, testEnvironment: value.testEnvironment === true });
    }).catch(() => {}).finally(() => { if (!controller.signal.aborted) setPolicyChecked(true); });
    return () => controller.abort();
  }, []);
  const request = useRef<{ payload: string; key: string } | null>(null);
  const inFlight = useRef(false);
  const parsed = applicationInput.safeParse({ ...form, channel, privacyAcknowledged: acknowledged, privacyVersion: APPLICATION_PRIVACY_VERSION });
  const canSubmit = parsed.success && !!policy && !busy && !reference;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!parsed.success || !policy || inFlight.current || reference) return;
    if (typeof globalThis.crypto?.randomUUID !== "function") { setError("Gönderim için güvenli bağlantı ve güncel bir tarayıcı gerekir."); return; }
    const payload = JSON.stringify(parsed.data);
    if (!request.current || request.current.payload !== payload) request.current = { payload, key: crypto.randomUUID() };
    inFlight.current = true; setBusy(true); setError("");
    try {
      const response = await fetch("/api/applications", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": request.current.key }, body: payload, signal: AbortSignal.timeout(15000) });
      const data = await response.json().catch(() => null);
      if (!response.ok || data?.ok !== true || !/^UK-[A-F0-9]{32}$/.test(data?.reference ?? "")) {
        setError(data?.code === "RATE_LIMITED" ? "Çok sık gönderim yapıldı. Daha sonra tekrar deneyin." : "Başvurunuzun kaydı doğrulanamadı. Alanları kontrol edip aynı gönderimi tekrar deneyin.");
        return;
      }
      setReference(data.reference);
      request.current = null;
      setForm({ name: "", phone: "", topic: "", note: "", website: "" }); setAcknowledged(false);
    } catch { setError("Kayıt sonucu doğrulanamadı. Bağlantıyı kontrol edip tekrar deneyin; aynı gönderim anahtarı korunur."); }
    finally { inFlight.current = false; setBusy(false); }
  }

  const messages: Record<string, string> = { name: "Ad soyadınızı 2–80 karakterle girin.", phone: "05 ile başlayan geçerli bir cep telefonu girin.", topic: "Talep konunuzu seçin.", note: "Not en çok 400 karakter olmalı; kimlik, kart veya şifre içermemeli.", privacyAcknowledged: "Göndermeden önce aydınlatma metnini okuyup seçimi işaretleyin." };
  const invalidFields = reference || parsed.success ? [] : [...new Set(parsed.error.issues.map(issue => String(issue.path[0])))].filter(name => touched.includes(name) && messages[name]);
  return <form onSubmit={submit} onBlurCapture={event => { const name = event.target.getAttribute("name"); if (name) setTouched(current => current.includes(name) ? current : [...current, name]); }} aria-label="Danışmanlık başvurusu" className="space-y-5">
    {!policy && <ApplicationContactFallback checking={!policyChecked} />}
    <fieldset hidden={!policy} disabled={!policy || busy || !!reference} className="space-y-5">
    {policy?.testEnvironment && <p className="ef-test-notice" role="note"><strong>İZOLE TEST ORTAMI</strong> Gerçek müşteri başvurusu göndermeyin. Aşağıdaki veri sorumlusu ve saklama bilgileri test yapılandırmasıdır; üretim yayınına hazır değildir.</p>}
    <div hidden aria-hidden="true"><label htmlFor={`${prefix}-website`}>Website</label><input id={`${prefix}-website`} name="website" value={form.website} onChange={event => setForm({ ...form, website: event.target.value })} tabIndex={-1} autoComplete="off" /></div>
    <div><Label htmlFor={`${prefix}-name`}>Ad Soyad</Label><Input id={`${prefix}-name`} name="name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} minLength={2} maxLength={80} autoComplete="name" required disabled={busy || !!reference} /></div>
    <div><Label htmlFor={`${prefix}-phone`}>Cep Telefonu</Label><Input id={`${prefix}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="05xx xxx xx xx" value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} maxLength={30} required disabled={busy || !!reference} /></div>
    <div><Label htmlFor={`${prefix}-topic`}>Talep konusu</Label><select id={`${prefix}-topic`} name="topic" className="h-11 w-full rounded-md border bg-white px-3 text-base" value={form.topic} onChange={event => setForm({ ...form, topic: event.target.value })} required disabled={busy || !!reference}>
      <option value="">Konu seçin</option>{Object.entries(TOPICS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
    </select></div>
    <div><Label htmlFor={`${prefix}-note`}>Kısa not (opsiyonel)</Label><Textarea id={`${prefix}-note`} name="note" value={form.note} onChange={event => setForm({ ...form, note: event.target.value })} rows={3} maxLength={400} placeholder="Yalnızca talebinizin konusunu kısaca belirtin." disabled={busy || !!reference} />
      <p className="mt-2 text-xs text-muted-foreground">Kimlik numarası, kart/hesap bilgisi, banka şifresi veya sağlık bilgisi paylaşmayın.</p>
    </div>
    {policy ? <p className="text-xs text-muted-foreground">Veri sorumlusu: {policy.controllerLabel}. Başvuruya ait kişisel bilgiler için saklama süresi: {policy.retentionDays} gün. Yayıncının süreli silme işlemiyle kişisel alanlar kaldırılır; sınırlı işlem tarihçesi korunur.</p> : <p role="status" className="text-xs text-muted-foreground">{policyChecked ? "Başvuru hizmeti yayına hazır değil. Veri sorumlusu ve kayıt yapılandırması doğrulanmadan gönderim açılamaz." : "Başvuru kayıt hizmeti ve saklama bilgileri doğrulanıyor. Hizmet hazır olmadan gönderim yapılamaz."}</p>}
    <label className="flex items-start gap-3 text-sm"><input name="privacyAcknowledged" type="checkbox" checked={acknowledged} onChange={event => setAcknowledged(event.target.checked)} required disabled={busy || !!reference || !policy} className="mt-1" /><span><Link href="/kvkk" target="_blank" className="underline">KVKK Aydınlatma Metni</Link>’ni okudum ve bu başvurum hakkında iletişim kurulmasını talep ediyorum. Bu seçim pazarlama izni değildir.</span></label>
    <Button type="submit" disabled={!canSubmit} className="h-12 w-full" aria-busy={busy}>{busy ? "Kaydediliyor…" : "Başvuruyu Kaydet"}</Button>
    {invalidFields.length > 0 && <ul aria-live="polite" className="ef-form-errors">{invalidFields.map(name => <li key={name}>{messages[name]}</li>)}</ul>}
    <p className="text-xs text-muted-foreground">Başvuru kaydı banka veya kredi onayı değildir. Bildirim gecikse bile kaydedilen başvuru referansınız korunur.</p>
    </fieldset>
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    {reference && <div role="status" aria-live="polite" className="rounded-xl border p-4"><p>Başvurunuz kaydedildi.</p><p>Başvuru numaranız: <strong className="break-all">{reference}</strong></p><p>Takip için bu numarayı saklayın. Kredi onayı garanti edilmez.</p><Button type="button" variant="outline" onClick={() => { setReference(""); request.current = null; }}>Yeni başvuru</Button></div>}
  </form>;
}
