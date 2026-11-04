import type { Metadata } from "next";

export const SITE_ORIGIN = "https://ulaskredi.com.tr";
export const INDEXABLE_PAGES = ["/", "/hizmetler", "/nasil-calisir", "/iletisim", "/rehber", "/videolar", "/kvkk", "/gizlilik", "/cerez", "/yasal-uyari"] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_ORIGIN).href;
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: { absolute: `${title} | Ulaş Kredi` }, description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title, description, url: absoluteUrl(path), type: "website", locale: "tr_TR", images: [{ url: absoluteUrl("/electric-finance-og.png"), width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/electric-finance-og.png")] },
  };
}
