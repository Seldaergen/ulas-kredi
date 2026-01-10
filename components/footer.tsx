"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import { FaYoutube, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const PHONE_E164 = "905416061356";
const PHONE_DISPLAY = "0 541 606 13 56";
const EMAIL = "info@ulaskredi.com.tr";

const WHATSAPP_HREF = `https://wa.me/${PHONE_E164}`;
const TEL_HREF = `tel:+${PHONE_E164}`;
const MAIL_HREF = `mailto:${EMAIL}`;

// ✅ Soru–Cevap ertelendi: kırık route riski olmaması için link yok
const quickLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetlerimiz" },
  { href: "/nasil-calisir", label: "Nasıl Çalışır?" },
  { href: "/rehber", label: "Kredi Rehberi" },
  { href: "/iletisim", label: "İletişim" },
];

const legalLinks = [
  { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
  { href: "/gizlilik", label: "Gizlilik Politikası" },
  { href: "/yasal-uyari", label: "Yasal Uyarı" },
  { href: "/cerez", label: "Çerez Politikası" },
];

const socialLinks = [
  {
    href: "https://www.youtube.com/@danismanerdiergen",
    label: "YouTube",
    icon: FaYoutube,
  },
  {
    href: "https://www.instagram.com/ulaskredidanismanlik?igsh=MnJkNXpjb204YTA4",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://www.tiktok.com/@erdiergen2",
    label: "TikTok",
    icon: FaTiktok,
  },
  { href: WHATSAPP_HREF, label: "WhatsApp", icon: FaWhatsapp },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      {/* subtle top glow */}
      <div className="bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.10),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.10),transparent_45%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/70 ring-1 ring-black/5">
                  <Image
                    src="/logo1.png"
                    alt="Ulaş Kredi Danışmanlık"
                    width={30}
                    height={30}
                    className="object-contain"
                    priority={false}
                  />
                </div>
                <span className="text-lg font-semibold text-foreground">
                  Ulaş Kredi{" "}
                  <span className="text-muted-foreground">Danışmanlık</span>
                </span>
              </Link>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Kredi notu, limit ve başvuru sürecinizi daha anlaşılır hâle getirmek
                için danışmanlık ve süreç rehberliği sunarız. Nihai değerlendirme ve
                onay ilgili finans kuruluşlarına aittir.
              </p>

              {/* Trust pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-foreground/80" />
                  Ön ödemesiz süreç
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-foreground/80" />
                  Gizlilik &amp; KVKK hassasiyeti
                </span>
              </div>

              {/* Social */}
              <div className="mt-6 flex items-center gap-2">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/60",
                        "text-muted-foreground transition-colors hover:text-foreground hover:bg-muted",
                        "focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:ring-offset-2"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Hızlı Linkler</h3>
              <ul className="mt-4 space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Yasal</h3>
              <ul className="mt-4 space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">İletişim</h3>

              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-foreground/70" />
                  <span>İstanbul • Türkiye geneli online danışmanlık</span>
                </li>

                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-foreground/70" />
                  <a href={TEL_HREF} className="transition-colors hover:text-foreground">
                    {PHONE_DISPLAY}
                  </a>
                </li>

                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-foreground/70" />
                  <a href={MAIL_HREF} className="transition-colors hover:text-foreground">
                    {EMAIL}
                  </a>
                </li>

                <li>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
                    aria-label="WhatsApp’tan hemen yaz"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    WhatsApp’tan Hemen Yaz
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 border-t border-border pt-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <p className="text-sm text-muted-foreground">
                © {year} Ulaş Kredi Danışmanlık. Tüm hakları saklıdır.
              </p>

              <p className="max-w-2xl text-left text-xs text-muted-foreground md:text-right">
                Bu sitedeki içerikler genel bilgilendirme ve danışmanlık kapsamındadır.
                Kredi/finansman koşulları; banka politikaları, mevzuat ve müşteri
                değerlendirmesine göre değişebilir. Nihai onay ve şartlar ilgili
                finans kuruluşları tarafından belirlenir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
