// lib/videos/types.ts
import type { TopicId } from "@/lib/topics/topics";

export type VideoTag =
  | "Kredi Notu"
  | "Limit"
  | "Yapılandırma"
  | "Kredi Kartı"
  | "Borç"
  | "Başvuru"
  | "Banka"
  | "Genel";

export type VideoItem = {
  id: string;            // YouTube videoId
  title: string;

  // ✅ UI filtreleme etiketi (mevcut sistem bozulmaz)
  tag: VideoTag;

  // ✅ V2 omurga: içerikleri birbirine bağlayan konu kimliği
  // Video ↔ Rehber ↔ Soru-Cevap bağlantıları bunu kullanacak.
  topicId?: TopicId;

  href?: string;         // API gelince kendisi üretilecek, şimdilik opsiyonel
  thumb?: string;        // API gelince kendisi üretilecek, şimdilik opsiyonel
  duration?: string;
  isShort?: boolean;
  publishedAt?: string;  // ISO "2025-12-01"
};
