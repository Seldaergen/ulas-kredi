"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";

import { SOCIAL_LINKS, REHBER_DROPDOWN, DESKTOP_MAIN } from "@/lib/nav/ulas-nav";

function isActivePath(pathname: string, href: string) {
  const base = href.split("#")[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(base + "/");
}

export function Navbar() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<null | "rehber">(null);
  const dropdownCloseTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const desktopLinks = useMemo(() => {
    return DESKTOP_MAIN.map((item) => {
      // dropdown: sadece rehber
      if (item.type === "dropdown") {
        const active = isActivePath(pathname, item.href);
        const isRehberOpen = openDropdown === "rehber";

        const open = () => {
          if (dropdownCloseTimer.current) window.clearTimeout(dropdownCloseTimer.current);
          setOpenDropdown("rehber");
        };

        const closeWithDelay = () => {
          if (dropdownCloseTimer.current) window.clearTimeout(dropdownCloseTimer.current);
          dropdownCloseTimer.current = window.setTimeout(() => setOpenDropdown(null), 120);
        };

        return (
          <div
            key={item.href}
            className="relative"
            onMouseEnter={open}
            onMouseLeave={closeWithDelay}
          >
            <button
              type="button"
              onClick={() => setOpenDropdown((v) => (v === "rehber" ? null : "rehber"))}
              aria-haspopup="menu"
              aria-expanded={isRehberOpen}
              className={cn(
                "group relative inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition",
                "text-slate-700 hover:text-slate-900 hover:bg-white/70",
                active && "text-slate-900 bg-white ring-1 ring-black/10 shadow-sm"
              )}
            >
              <span className="relative z-10">{item.label}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition",
                  isRehberOpen
                    ? "rotate-180 text-slate-900"
                    : "text-slate-500 group-hover:text-slate-900"
                )}
              />
              <span
                className={cn(
                  "pointer-events-none absolute inset-x-3 bottom-1 h-0.5 rounded-full opacity-0 transition",
                  "bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.95),transparent)]",
                  active ? "opacity-100" : "group-hover:opacity-70"
                )}
              />
            </button>

            {isRehberOpen && (
              <div
                role="menu"
                aria-label="Kredi Rehberi"
                className={cn(
                  "absolute left-0 top-[calc(100%+10px)] w-110 overflow-hidden rounded-2xl",
                  "bg-white shadow-[0_28px_70px_rgba(15,23,42,0.18)]",
                  "ring-1 ring-black/10"
                )}
              >
                <div className="p-2">
                  <div className="px-3 pt-3 pb-2 border-b border-black/5">
                    <div className="text-[12px] font-extrabold tracking-wide text-slate-900">
                      Kredi Rehberi
                    </div>
                    <div className="text-[11px] font-medium text-slate-500">
                      Konu seç • Oku • Hesapla • Doğru adım at
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-1">
                    {REHBER_DROPDOWN.map((it) => {
                      const active2 = isActivePath(pathname, it.href);
                      return (
                        <Link
                          key={it.href}
                          href={it.href}
                          role="menuitem"
                          className={cn(
                            "rounded-xl px-3 py-2.5 transition",
                            "hover:bg-slate-50",
                            active2 && "bg-cyan-50/60 ring-1 ring-cyan-200/70"
                          )}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-[13px] font-bold text-slate-900">
                                {it.label}
                              </div>
                              {it.desc ? (
                                <div className="mt-0.5 text-[12px] font-medium text-slate-500">
                                  {it.desc}
                                </div>
                              ) : null}
                            </div>
                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-black/5">
                    <div className="text-[12px] font-semibold text-slate-700">
                      Hızlı destek:
                      <span className="ml-1 text-slate-500 font-medium">WhatsApp</span>
                    </div>
                    <a
                      href="https://wa.me/905416061356"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button
                        size="sm"
                        className={cn(
                          "h-8 rounded-xl gap-2 font-semibold",
                          "bg-[linear-gradient(135deg,rgba(34,211,238,0.95),rgba(59,130,246,0.92))]",
                          "text-white shadow-[0_10px_22px_rgba(34,211,238,0.22)]"
                        )}
                      >
                        <FaWhatsapp className="h-4 w-4" />
                        Yaz
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }

      // normal link
      const active = isActivePath(pathname, item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "group relative rounded-xl px-3 py-2 text-sm font-semibold transition",
            "text-slate-700 hover:text-slate-900",
            "hover:bg-white/70",
            active && "text-slate-900 bg-white ring-1 ring-black/10 shadow-sm"
          )}
        >
          <span className="relative z-10">{item.label}</span>
          <span
            className={cn(
              "pointer-events-none absolute inset-x-3 bottom-1 h-0.5 rounded-full opacity-0 transition",
              "bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.95),transparent)]",
              active ? "opacity-100" : "group-hover:opacity-70"
            )}
          />
        </Link>
      );
    });
  }, [pathname, openDropdown]);

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          "border-b border-black/5 backdrop-blur-xl transition",
          isScrolled
            ? "bg-[linear-gradient(90deg,rgba(240,253,250,0.92),rgba(239,246,255,0.94),rgba(236,254,255,0.90))] shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            : "bg-[linear-gradient(90deg,rgba(240,253,250,0.86),rgba(239,246,255,0.88),rgba(236,254,255,0.84))] shadow-[0_8px_22px_rgba(15,23,42,0.05)]"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
          <div className={cn("flex items-center justify-between gap-3 transition-all duration-300", isScrolled ? "h-14" : "h-16")}>
            {/* Logo */}
            <div className="shrink-0 min-w-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-9 w-9 overflow-hidden rounded-xl ring-1 ring-black/5 bg-white/80">
                  <Image
                    src="/logo1.png"
                    alt="Ulaş Kredi Danışmanlık"
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain p-1"
                    priority
                  />
                  <div className="pointer-events-none absolute -right-6 -top-6 h-14 w-14 rounded-full bg-cyan-300/25 blur-2xl" />
                </div>

                <div className="min-w-0">
                  <div className="truncate text-[15px] font-extrabold text-slate-900">
                    Ulaş Kredi <span className="hidden sm:inline">Danışmanlık</span>
                  </div>
                  <div className="hidden sm:block text-[11px] font-medium text-slate-500">
                    Ücretsiz ön analiz • Hızlı süreç
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop links (XL+) */}
            <div className="hidden xl:flex xl:items-center xl:gap-1">
              {desktopLinks}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Social icons (XL+) */}
              <div className="hidden xl:flex items-center gap-1.5 mr-1">
                {SOCIAL_LINKS.slice(0, 3).map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl transition",
                        "text-slate-600 hover:text-slate-900",
                        "hover:bg-white/70 ring-1 ring-transparent hover:ring-black/10"
                      )}
                    >
                      <Icon className="h-3.75 w-3.75" />
                    </a>
                  );
                })}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/905416061356"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex"
              >
                <Button
                  size="sm"
                  className={cn(
                    "gap-2 rounded-xl font-semibold",
                    "bg-[linear-gradient(135deg,rgba(34,211,238,0.95),rgba(59,130,246,0.92))]",
                    "text-white shadow-[0_14px_28px_rgba(34,211,238,0.25)]",
                    "hover:shadow-[0_18px_36px_rgba(34,211,238,0.30)]"
                  )}
                >
                  <FaWhatsapp className="h-4 w-4" />
                  <span>WhatsApp</span>
                  <ChevronRight className="hidden xl:inline h-4 w-4 opacity-90" />
                </Button>
              </a>

              {/* Menu button (XL altı) */}
              <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
                className={cn(
                  "xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl",
                  "ring-1 ring-black/10",
                  "bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(236,254,255,0.86))]",
                  "shadow-[0_10px_24px_rgba(15,23,42,0.10)]",
                  "hover:shadow-[0_14px_32px_rgba(15,23,42,0.14)]",
                  "active:scale-[0.98] transition"
                )}
              >
                {isOpen ? <X className="h-5 w-5 text-slate-900" /> : <Menu className="h-5 w-5 text-slate-900" />}
                <span className="sr-only">Menü</span>
              </button>
            </div>
          </div>

          {/* Tablet sosyal şerit (lg..xl) */}
          <div className="hidden lg:flex xl:hidden items-center justify-between gap-3 pb-3">
            <div className="text-[12px] font-semibold text-slate-600">
              Bizi takip edin
              <span className="mx-2 text-slate-300">•</span>
              <span className="font-medium text-slate-500">Güncel videolar & ipuçları</span>
            </div>

            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-semibold transition",
                      "bg-white hover:bg-white ring-1 ring-black/10 shadow-sm",
                      "text-slate-700 hover:text-slate-900"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet panel */}
          {isOpen && (
            <div id="mobile-nav" className="xl:hidden pb-4">
              <div
                className={cn(
                  "mt-2 rounded-2xl p-2",
                  "bg-white",
                  "ring-1 ring-black/10 shadow-[0_18px_40px_rgba(15,23,42,0.14)]"
                )}
              >
                {/* MENÜ */}
                <div className="px-2 pt-2 pb-1">
                  <div className="text-[11px] font-extrabold tracking-wide text-slate-500">MENÜ</div>
                </div>

                <div className="space-y-1">
                  {[
                    { href: "/", label: "Ana Sayfa" },
                    { href: "/hizmetler", label: "Hizmetlerimiz" },
                    { href: "/iletisim", label: "İletişim" },
                  ].map((link) => {
                    const active = isActivePath(pathname, link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-semibold transition",
                          active
                            ? "bg-cyan-50/70 text-slate-900 ring-1 ring-cyan-200/70"
                            : "text-slate-800 hover:bg-slate-50"
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className={cn("h-4 w-4", active ? "text-cyan-600" : "text-slate-400")} />
                      </Link>
                    );
                  })}
                </div>

                <div className="my-3 h-px w-full bg-slate-200/70" />

                {/* KREDİ REHBERİ */}
                <div className="px-2 pb-1">
                  <div className="text-[11px] font-extrabold tracking-wide text-slate-500">KREDİ REHBERİ</div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenDropdown((v) => (v === "rehber" ? null : "rehber"))}
                  className={cn(
                    "w-full flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-semibold transition",
                    isActivePath(pathname, "/rehber")
                      ? "bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(59,130,246,0.12))] text-slate-900 ring-1 ring-cyan-200/70"
                      : "text-slate-900 hover:bg-slate-50 ring-1 ring-black/5"
                  )}
                >
                  <span>Kredi Rehberi</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition",
                      openDropdown === "rehber" ? "rotate-180 text-cyan-700" : "text-slate-400"
                    )}
                  />
                </button>

                {openDropdown === "rehber" && (
                  <div className="mt-2 space-y-1">
                    {REHBER_DROPDOWN.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        onClick={() => {
                          setIsOpen(false);
                          setOpenDropdown(null);
                        }}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-semibold transition",
                          "bg-slate-50 hover:bg-slate-100 ring-1 ring-black/5",
                          "text-slate-800"
                        )}
                      >
                        <span className="truncate">{it.label}</span>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </Link>
                    ))}
                  </div>
                )}

                <div className="my-3 h-px w-full bg-slate-200/70" />

                {/* SOSYAL */}
                <div className="grid grid-cols-2 gap-2">
                  {SOCIAL_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                          "bg-white hover:bg-slate-50 ring-1 ring-black/10",
                          "text-slate-800"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </a>
                    );
                  })}
                </div>

                <a
                  href="https://wa.me/905416061356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block"
                >
                  <Button
                    className={cn(
                      "w-full gap-2 rounded-xl font-semibold",
                      "bg-[linear-gradient(135deg,rgba(34,211,238,0.95),rgba(59,130,246,0.92))]",
                      "text-white shadow-[0_14px_28px_rgba(34,211,238,0.25)]"
                    )}
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    WhatsApp’tan Ücretsiz Ön Analiz
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
