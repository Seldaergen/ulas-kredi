"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MOBILE_BOTTOM_ITEMS } from "@/lib/nav/ulas-nav";

export function MobileBottomBar() {
  const pathname = usePathname() || "/";
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const update = () => setHash(window.location.hash || "");
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  const isActive = (href: string) => {
    const [base, h] = href.split("#");

    if (href === "/") return pathname === "/" && !hash;

    if (base === "/" && h === "videolar") {
      return pathname === "/" && hash === "#videolar";
    }

    if (href === "/soru-cevap") {
      return pathname === "/soru-cevap" || pathname.startsWith("/soru-cevap/");
    }

    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="lg:hidden">
      <nav
        aria-label="Alt Menü"
        className={cn(
          "fixed bottom-0 left-0 right-0 z-70", // ✅ FIX
          "bg-linear-to-r from-cyan-500/85 via-sky-500/80 to-cyan-600/85",
          "backdrop-blur-xl",
          "border-t border-white/20",
          "shadow-[0_-10px_30px_rgba(6,182,212,0.35)]"
        )}
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 6px)" }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent"
          aria-hidden="true"
        />

        <div className="mx-auto grid grid-cols-4 px-2 py-1.5">
          {MOBILE_BOTTOM_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1.5 transition",
                  active ? "bg-white/15" : "hover:bg-white/10"
                )}
                scroll
              >
                {active && (
                  <span
                    className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-xl
                               bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.45),transparent_60%)]"
                    aria-hidden="true"
                  />
                )}

                <div
                  className={cn(
                    "relative flex h-9 w-9 items-center justify-center rounded-lg transition",
                    active
                      ? "bg-white text-cyan-600 shadow-[0_6px_18px_rgba(255,255,255,0.45)]"
                      : "bg-white/20 text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <span
                  className={cn(
                    "text-[10.5px] leading-none",
                    active ? "text-white font-semibold" : "text-white/85"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
