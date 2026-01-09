// lib/videos/source.ts
export function youtubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function youtubeThumbUrl(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
