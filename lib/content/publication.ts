import type { Post } from "./posts";

// Source checks are not a human editorial approval or a promise of loan eligibility.
export const SOURCE_CHECK_DATE = "2026-10-31";
export const CONTENT_SOURCES = {
  findeks: { title: "Findeks — Kredi Notu ve değerlendirme", url: "https://www.findeks.com/urunler/findeks-kredi-notu" },
  applications: { title: "Findeks — Başvuru ve kredi notu ilişkisi", url: "https://www.findeks.com/findeksakademi/kredi-basvurusu-yapmak-kredi-notunu-dusurur-mu" },
  riskReport: { title: "e-Devlet — TBB Risk Merkezi Raporu Başvurusu", url: "https://www.turkiye.gov.tr/turkiye-bankalar-birligi-risk-merkezi-raporu-basvurusu" },
  bankReport: { title: "Garanti BBVA — Risk raporu ile kredi notu ayrımı", url: "https://www.garantibbva.com.tr/krediler/kredi-notu-risk-raporu" },
  consumer: { title: "Ticaret Bakanlığı — Tüketici kredisi sözleşmeleri hakkında bilgilendirme", url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/tuketici-kredisi-sozlesmeleri-hakkinda-bilgilendirme" },
  restructuring: { title: "BDDK — Kredi kartı ve ihtiyaç kredisi düzenlemeleri", url: "https://www.bddk.gov.tr/Mevzuat/Liste/56" },
} as const;
type SourceId = keyof typeof CONTENT_SOURCES;
const reviewed: Record<string, { sources: SourceId[]; modified?: string }> = {
  "puanım-dusuk-kredi-cekmek-istiyorum": { sources: ["findeks", "applications"], modified: SOURCE_CHECK_DATE },
  "banka-ic-skor-nedir": { sources: ["findeks"], modified: SOURCE_CHECK_DATE },
  "e-devlet-kredi-notu-dogru-mu": { sources: ["riskReport", "bankReport", "findeks"], modified: SOURCE_CHECK_DATE },
  "kredi-notu-sorgulama-sikligi-zararli-mi": { sources: ["findeks", "applications"], modified: SOURCE_CHECK_DATE },
  "yapilandirma-oncesi-ne-hazirlanmali": { sources: ["consumer", "restructuring"] },
  "kredi-yapilandirma-ne-zaman-mantik": { sources: ["consumer", "restructuring"] },
  "kredi-yapilandirma-nedir": { sources: ["consumer", "restructuring"], modified: SOURCE_CHECK_DATE },
  "kredi-maliyeti-toplam-geri-odeme-nasil-bakilir": { sources: ["consumer"], modified: SOURCE_CHECK_DATE },
};

export function publication(post: Post) {
  const review = reviewed[post.slug];
  return {
    status: review ? "published" as const : "review-required" as const,
    sources: review?.sources.map(id => CONTENT_SOURCES[id]) ?? [],
    sourceCheckedAt: review ? SOURCE_CHECK_DATE : null,
    modified: review?.modified ?? post.date,
    updateResponsibility: "Ulaş Kredi yayıncısı; sorumlu editör ataması bekleniyor",
    reason: review ? null : "Sayısal eşikler, süreler, banka uygulamaları veya mevzuat açıklamaları için kaynak ve editoryal kontrol tamamlanmadı.",
  };
}
