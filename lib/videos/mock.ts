import type { VideoItem, VideoTag } from "./types";

export const VIDEO_TAGS: VideoTag[] = [
  "Genel",
  "Kredi Notu",
  "Limit",
  "Yapılandırma",
  "Kredi Kartı",
  "Borç",
  "Başvuru",
  "Banka",
];

export const MOCK_VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Kredi notu 1200–1300 aralığındaysa ne yapmalısınız?",
    tag: "Kredi Notu",
    duration: "0:59",
    isShort: true,
    publishedAt: "2025-12-01",
  },
  {
    id: "v2",
    title: "Kredi yapılandırma nedir? Kimler için mantıklı?",
    tag: "Yapılandırma",
    duration: "6:12",
    isShort: false,
    publishedAt: "2025-11-20",
  },
  {
    id: "v3",
    title: "Limitin düşükse bankaya doğru başvuru planı nasıl yapılır?",
    tag: "Limit",
    duration: "4:08",
    isShort: false,
    publishedAt: "2025-11-10",
  },
];
