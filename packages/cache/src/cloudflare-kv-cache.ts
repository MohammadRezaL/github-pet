import type { CacheEntry, CacheStore } from "./cache.interface";

export interface CloudflareKVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

export class CloudflareKVCacheStore implements CacheStore {
  constructor(private readonly kv: CloudflareKVNamespace) {}

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    const payload = await this.kv.get(key);

    if (!payload) {
      return null;
    }

    return JSON.parse(payload) as CacheEntry<T>;
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + ttlSeconds * 1000);

    const entry: CacheEntry<T> = {
      value,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    await this.kv.put(key, JSON.stringify(entry), {
      expirationTtl: ttlSeconds,
    });
  }

  async delete(key: string): Promise<void> {
    await this.kv.delete(key);
  }
}
