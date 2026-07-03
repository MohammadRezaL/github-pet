import type { CacheStore } from "./cache.interface";

export interface CachedResult<T> {
  value: T;
  cacheStatus: "hit" | "miss";
}

export async function getOrSetCached<T>(
  cache: CacheStore,
  key: string,
  ttlSeconds: number,
  factory: () => Promise<T>,
): Promise<CachedResult<T>> {
  const cached = await cache.get<T>(key);

  if (cached) {
    return {
      value: cached.value,
      cacheStatus: "hit",
    };
  }

  const value = await factory();

  await cache.set(key, value, ttlSeconds);

  return {
    value,
    cacheStatus: "miss",
  };
}
