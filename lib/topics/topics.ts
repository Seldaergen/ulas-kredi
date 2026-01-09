// lib/topics/topics.ts
export type TopicId =
  | "kredi-notu"
  | "kredi-limiti"
  | "yapilandirma"
  | "kredi-basvurusu"
  | "kirmizi-kalem"
  | "gelir-belgesi"
  | "borc-kapatma"
  // ✅ VideoTag uyumu için eklenenler
  | "kredi-karti"
  | "banka"
  | "genel";

export type Topic = {
  id: TopicId;
  slug: string; // URL'de kullanılacak
  title: string; // kullanıcı görünen ad
  summary: string; // kısa açıklama
};

export const TOPICS: Topic[] = [
  {
    id: "genel",
    slug: "genel",
    title: "Genel",
    summary: "Kredi süreciyle ilgili genel bilgilendirmeler, temel kavramlar ve pratik ipuçları.",
  },
  {
    id: "kredi-notu",
    slug: "kredi-notu",
    title: "Kredi Notu",
    summary: "Notu etkileyen faktörler, hızlı iyileştirme adımları ve doğru strateji.",
  },
  {
    id: "kredi-limiti",
    slug: "kredi-limiti",
    title: "Kredi Limiti",
    summary: "Limit artırma stratejileri, kart kullanım dengesi ve bankaların yaklaşımı.",
  },
  {
    id: "kredi-karti",
    slug: "kredi-karti",
    title: "Kredi Kartı",
    summary: "Kart kullanımı, limit yönetimi, gecikme etkisi ve notu destekleyen pratikler.",
  },
  {
    id: "borc-kapatma",
    slug: "borc-kapatma",
    title: "Borç / Borç Kapatma",
    summary: "Kapatma kredisi, transfer, borç konsolidasyonu ve planlı yaklaşım.",
  },
  {
    id: "yapilandirma",
    slug: "yapilandirma",
    title: "Kredi Yapılandırma",
    summary: "Borçları yönetilebilir taksite çevirme, doğru planlama ve risk azaltma.",
  },
  {
    id: "kredi-basvurusu",
    slug: "kredi-basvurusu",
    title: "Kredi Başvurusu",
    summary: "Ret riskini azaltan başvuru sırası, zamanlama ve dosya hazırlığı.",
  },
  {
    id: "gelir-belgesi",
    slug: "gelir-belgesi",
    title: "Gelir Belgesi",
    summary: "Gelir belgeleme yöntemleri, banka kriterleri ve dosya güçlendirme.",
  },
  {
    id: "kirmizi-kalem",
    slug: "kirmizi-kalem",
    title: "Kırmızı Kalem / Kara Liste",
    summary: "Olumsuz kayıtlar, bankaların değerlendirmesi ve gerçekçi seçenekler.",
  },
  {
    id: "banka",
    slug: "banka",
    title: "Banka",
    summary: "Banka değerlendirme mantığı, dönemsel kriterler ve dosya güçlendirme yaklaşımı.",
  },
];

export function getTopicById(id: TopicId) {
  return TOPICS.find((t) => t.id === id) ?? null;
}

export function getTopicBySlug(slug: string) {
  return TOPICS.find((t) => t.slug === slug) ?? null;
}
