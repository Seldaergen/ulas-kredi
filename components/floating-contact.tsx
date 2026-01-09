"use client";

import * as React from "react";
import { ChevronUp, Phone, Mail, MessageCircle, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ✅ Canonical component:
 * - Projede "ana isim" FloatingAction kalsın (Home kullanıyor).
 * - FloatingContact ise alias olarak export edilecek (Soru–Cevap kullanıyor).
 */
export function FloatingAction() {
  const [open, setOpen] = React.useState(false);
  const [showTop, setShowTop] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);

  // ✅ Ulaş Kredi mevcut bilgiler
  const whatsappNumber = "905416061356";
  const phoneDisplay = "0 541 606 13 56";
  const phoneHref = "tel:+905416061356";
  const mailHref = "mailto:ulaskredidanisman@gmail.com";

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ dışarı tıkla + ESC ile kapat
  React.useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!open) return;
      const el = wrapRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // ✅ MobileBottomBar üstünde + safe-area uyumlu
  const bottomOffset =
    "bottom-[calc(env(safe-area-inset-bottom)+96px)] sm:bottom-6";

  return (
    <div
      ref={wrapRef}
      className={cn(
        "fixed right-4 z-80 flex flex-col items-end gap-2.5 translate-z-0",
        bottomOffset
      )}
    >
      {/* Scroll-to-top */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Başa dön"
          className={cn(
            "group relative flex h-11 items-center gap-2 rounded-full px-3.5",
            "bg-white/90 backdrop-blur-md",
            "ring-1 ring-sky-200/80",
            "shadow-[0_14px_34px_rgba(2,6,23,0.18)]",
            "transition hover:-translate-y-px hover:bg-white"
          )}
        >
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              "bg-linear-to-br from-cyan-500 to-sky-600 text-white",
              "shadow-[0_10px_22px_rgba(6,182,212,0.35)]"
            )}
          >
            <ChevronUp size={16} />
          </span>

          <span className="hidden text-sm font-semibold text-slate-800 sm:inline">
            Başa dön
          </span>
          <span className="text-sm font-semibold text-slate-800 sm:hidden">
            Yukarı
          </span>

          <span
            className="pointer-events-none absolute -inset-2 rounded-full opacity-0 transition-opacity group-hover:opacity-100
                       bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.22),transparent_60%)]"
            aria-hidden="true"
          />
        </button>
      )}

      {/* Actions */}
      {open && (
        <div className="flex flex-col items-end gap-2">
          <ActionChip
            href={`https://wa.me/${whatsappNumber}`}
            targetBlank
            icon={<MessageCircle size={16} />}
            label="WhatsApp"
            tone="emerald"
          />

          <ActionChip
            href={phoneHref}
            icon={<Phone size={16} />}
            labelMobile="Ara"
            labelDesktop={phoneDisplay}
            tone="cyan"
          />

          <ActionChip
            href={mailHref}
            icon={<Mail size={16} />}
            label="Mail gönder"
            tone="light"
          />
        </div>
      )}

      {/* Main FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Menüyü kapat" : "İletişim menüsü"}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-full",
          "bg-linear-to-br from-cyan-500/85 via-sky-500/75 to-cyan-600/85",
          "backdrop-blur-md",
          "ring-1 ring-white/30",
          "shadow-[0_18px_44px_rgba(2,6,23,0.30)]",
          "before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.65),transparent_55%)] before:opacity-60",
          "transition-transform duration-200 hover:scale-105 active:scale-95"
        )}
      >
        {open ? (
          <X
            className="relative z-10 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
            size={24}
          />
        ) : (
          <Plus
            className="relative z-10 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
            size={26}
          />
        )}
      </button>

      <div className="hidden pr-1 text-[11px] font-medium text-slate-500 sm:block">
        İletişim
      </div>
    </div>
  );
}

/** ✅ Alias export: bazı sayfalarda FloatingContact adıyla kullanılacak */
export const FloatingContact = FloatingAction;

const chipBase =
  "group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 backdrop-blur-md";

const iconWrapBase =
  "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/12 ring-1 ring-white/20";

function ActionChip(props: {
  href: string;
  icon: React.ReactNode;
  label?: string;
  labelMobile?: string;
  labelDesktop?: string;
  tone: "emerald" | "cyan" | "light";
  targetBlank?: boolean;
}) {
  const { href, icon, label, labelMobile, labelDesktop, tone, targetBlank } =
    props;

  const toneClass =
    tone === "emerald"
      ? "text-white bg-emerald-500/92 hover:bg-emerald-500 ring-1 ring-emerald-300/40 shadow-[0_14px_34px_rgba(16,185,129,0.28)]"
      : tone === "cyan"
      ? "text-white bg-gradient-to-r from-cyan-600/95 to-sky-600/95 hover:from-cyan-600 hover:to-sky-600 ring-1 ring-white/20 shadow-[0_14px_34px_rgba(6,182,212,0.28)]"
      : "text-slate-900 bg-white/90 hover:bg-white ring-1 ring-slate-200 shadow-[0_12px_30px_rgba(2,6,23,0.18)]";

  return (
    <a
      href={href}
      target={targetBlank ? "_blank" : undefined}
      rel={targetBlank ? "noreferrer" : undefined}
      className={cn(chipBase, toneClass)}
    >
      <span
        className={cn(
          iconWrapBase,
          tone === "light" ? "bg-slate-900/90 text-white ring-0" : ""
        )}
      >
        {icon}
      </span>

      {label ? (
        <span>{label}</span>
      ) : (
        <>
          <span className="hidden sm:inline">{labelDesktop}</span>
          <span className="sm:hidden">{labelMobile}</span>
        </>
      )}
    </a>
  );
}
