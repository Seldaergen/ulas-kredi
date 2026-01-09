import type { TopicId } from "@/lib/topics/topics";
import type { VideoTag } from "@/lib/videos/types";

export const VIDEO_TAG_TO_TOPIC: Record<VideoTag, TopicId> = {
  "Kredi Notu": "kredi-notu",
  "Limit": "kredi-limiti",
  "Yapılandırma": "yapilandirma",
  "Kredi Kartı": "kredi-karti",
  "Borç": "borc-kapatma",
  "Başvuru": "kredi-basvurusu",
  "Banka": "banka",
  "Genel": "genel",
};

export function topicIdFromTag(tag: VideoTag): TopicId {
  return VIDEO_TAG_TO_TOPIC[tag] ?? "genel";
}
