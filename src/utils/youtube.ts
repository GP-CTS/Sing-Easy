/**
 * Extracts a YouTube video ID from common URL formats:
 * youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
 */
export function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/
  );
  return match ? match[1] : null;
}

export function toEmbedUrl(url: string): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?playsinline=1`;
}

export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null;
}
