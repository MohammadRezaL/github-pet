export const CACHE_TTL = {
  githubActivitySeconds: 30 * 60,
  githubActivityStaleSeconds: 24 * 60 * 60,
  widgetSvgSeconds: 5 * 60,
} as const;

export function parseCacheTtlSeconds(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}
