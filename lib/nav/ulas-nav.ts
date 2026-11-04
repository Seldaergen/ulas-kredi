// lib/nav/ulas-nav.ts
import type { ComponentType } from "react";
import type { IconType } from "react-icons";
import { Home, PhoneCall, BookOpen, Route } from "lucide-react";
import { FaYoutube, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export type NavLink = { href: string; label: string };
export type RehberItem = { href: string; label: string; desc: string };

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/rehber", label: "Kredi Rehberi" },
  { href: "/hizmetler", label: "Hizmetlerimiz" },
  { href: "/videolar", label: "Videolar" },
  { href: "/iletisim", label: "İletişim" },
];

export const DESKTOP_MAIN = [
  { href: "/", label: "Ana Sayfa", type: "link" as const },
  { href: "/rehber", label: "Kredi Rehberi", type: "dropdown" as const },
  { href: "/hizmetler", label: "Hizmetlerimiz", type: "link" as const },
  { href: "/videolar", label: "Videolar", type: "link" as const },
  { href: "/iletisim", label: "İletişim", type: "link" as const },
];

export const REHBER_DROPDOWN: RehberItem[] = [
  { href: "/rehber", label: "Kredi Rehberi Ana Sayfa", desc: "Tüm konuların merkezi" },
  { href: "/rehber?topic=kredi-notu", label: "Kredi Notu", desc: "Not ve değerlendirme" },
  { href: "/rehber?topic=kredi-karti", label: "Kredi Kartları", desc: "Kart ve borç yönetimi" },
  { href: "/rehber?topic=kredi-basvurusu", label: "İhtiyaç Kredisi", desc: "Başvuru hazırlığı" },
  { href: "/hizmetler", label: "Konut Kredisi", desc: "Danışmanlık hizmetleri" },
  { href: "/hizmetler", label: "Taşıt Kredisi", desc: "Danışmanlık hizmetleri" },
  { href: "/rehber?topic=yapilandirma", label: "Yapılandırma", desc: "Borç planı ve hazırlık" },
  { href: "/rehber?topic=kirmizi-kalem", label: "Sicil / Kara Liste", desc: "Risk değerlendirmesi" },
  { href: "/rehber?topic=banka", label: "Banka Politikaları", desc: "Değerlendirme mantığı" },
  { href: "/nasil-calisir", label: "Süreç & Yol Haritası", desc: "Nasıl ilerliyoruz?" },
];

export const SOCIAL_LINKS: {
  href: string;
  label: string;
  icon: IconType;
}[] = [
  {
    href: "https://www.youtube.com/@danismanerdiergen",
    label: "YouTube",
    icon: FaYoutube,
  },
  {
    href: "https://www.tiktok.com/@erdiergen2",
    label: "TikTok",
    icon: FaTiktok,
  },
  {
    href: "https://www.instagram.com/ulaskredidanismanlik",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://wa.me/905416061356",
    label: "WhatsApp",
    icon: FaWhatsapp,
  },
];

// ✅ Mobile bottom bar (4 item) — QA ertelendiği için kaldırıldı
export const MOBILE_BOTTOM_ITEMS: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { href: "/", label: "Ana Sayfa", icon: Home },
  { href: "/rehber", label: "Rehber", icon: BookOpen },
  { href: "/nasil-calisir", label: "Süreç", icon: Route },
  { href: "/iletisim", label: "Başvuru", icon: PhoneCall },
];
