// lib/videos/server.ts
import "server-only";
import type { VideoItem, VideoTag } from "./types";
import type { TopicId } from "@/lib/topics/topics";
import { youtubeThumbUrl, youtubeWatchUrl } from "./source";

export async function getVideos(limit = 30): Promise<VideoItem[]> {
  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!key || !channelId) return [];

  const safeLimit = Math.min(Math.max(limit, 1), 50);

  const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
  searchUrl.searchParams.set("key", key);
  searchUrl.searchParams.set("channelId", channelId);
  searchUrl.searchParams.set("part", "snippet");
  searchUrl.searchParams.set("order", "date");
  searchUrl.searchParams.set("maxResults", String(safeLimit));
  searchUrl.searchParams.set("type", "video");

  const searchRes = await fetch(searchUrl.toString(), { next: { revalidate: 1800 } });
  if (!searchRes.ok) return [];

  const searchJson = await searchRes.json();
  const searchItems: any[] = Array.isArray(searchJson.items) ? searchJson.items : [];
  const ids: string[] = searchItems
    .map((it) => it?.id?.videoId as string | undefined)
    .filter(Boolean) as string[];

  if (!ids.length) return [];

  const videosUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
  videosUrl.searchParams.set("key", key);
  videosUrl.searchParams.set("part", "snippet,contentDetails");
  videosUrl.searchParams.set("id", ids.join(","));

  const videosRes = await fetch(videosUrl.toString(), { next: { revalidate: 1800 } });

  // duration fail olsa bile UI kırılmasın
  if (!videosRes.ok) {
    return ids.map((id) => ({
      id,
      title: "",
      tag: "Genel",
      href: youtubeWatchUrl(id),
      thumb: youtubeThumbUrl(id),
    }));
  }

  const videosJson = await videosRes.json();
  const vItems: any[] = Array.isArray(videosJson.items) ? videosJson.items : [];

  const byId = new Map<string, any>(vItems.map((v) => [String(v?.id), v]));
  const ordered = ids.map((id) => byId.get(id)).filter(Boolean);

  return ordered.map((v: any) => {
    const id = String(v?.id || "");
    const title = String(v?.snippet?.title || "");
    const publishedAt = String(v?.snippet?.publishedAt || "");
    const thumb =
      v?.snippet?.thumbnails?.maxres?.url ||
      v?.snippet?.thumbnails?.standard?.url ||
      v?.snippet?.thumbnails?.high?.url ||
      v?.snippet?.thumbnails?.medium?.url ||
      v?.snippet?.thumbnails?.default?.url ||
      youtubeThumbUrl(id);

    const durationIso = String(v?.contentDetails?.duration || "");
    const duration = isoToMMSS(durationIso);

    const tag = inferTagFromTitle(title);
    const topicId = topicIdFromVideoTag(tag);

    const isShort = isShortByDuration(duration);

    const item: VideoItem = {
      id,
      title,
      tag,
      topicId: topicId ?? undefined,
      href: youtubeWatchUrl(id),
      thumb,
      duration: duration || undefined,
      isShort,
      publishedAt: publishedAt || undefined,
    };

    return item;
  });
}

function isoToMMSS(iso: string) {
  if (!iso) return "";
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "";
  const h = parseInt(m[1] || "0", 10);
  const mm = parseInt(m[2] || "0", 10);
  const ss = parseInt(m[3] || "0", 10);
  const total = h * 3600 + mm * 60 + ss;
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function isShortByDuration(mmss: string | undefined) {
  if (!mmss) return false;
  const [mStr, sStr] = mmss.split(":");
  const m = parseInt(mStr || "0", 10);
  const s = parseInt(sStr || "0", 10);
  if (Number.isNaN(m) || Number.isNaN(s)) return false;
  return m === 0 && s <= 60;
}

function normalizeTR(s: string) {
  return (s || "").toLocaleLowerCase("tr-TR");
}
function hasAny(hay: string, needles: string[]) {
  return needles.some((n) => hay.includes(normalizeTR(n)));
}

function inferTagFromTitle(title: string): VideoTag {
  const t = normalizeTR(title);
  if (hasAny(t, ["yapılandır", "taksit", "yeniden yapılandır"])) return "Yapılandırma";
  if (hasAny(t, ["kredi notu", "findeks", "puan", "skor"])) return "Kredi Notu";
  if (hasAny(t, ["limit", "limit artır", "kredi limiti"])) return "Limit";
  if (hasAny(t, ["kredi kart", "ekstre", "asgari"])) return "Kredi Kartı";
  if (hasAny(t, ["başvur", "onay", "ret", "redded"])) return "Başvuru";
  if (hasAny(t, ["banka", "şube", "kriter"])) return "Banka";
  if (hasAny(t, ["borç", "kapat", "transfer"])) return "Borç";
  return "Genel";
}

function topicIdFromVideoTag(tag: VideoTag): TopicId | null {
  switch (tag) {
    case "Kredi Notu":
      return "kredi-notu";
    case "Limit":
      return "kredi-limiti";
    case "Yapılandırma":
      return "yapilandirma";
    case "Başvuru":
      return "kredi-basvurusu";
    case "Borç":
      return "borc-kapatma";
    default:
      return null;
  }
}
