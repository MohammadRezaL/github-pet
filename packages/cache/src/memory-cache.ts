import type { CacheEntry, CacheStore } from "./cache.interface";

interface MemoryRecord {
  payload: string;
  expiresAtMs: number;
}

export class MemoryCacheStore implements CacheStore {
  private readonly records = new Map<string, MemoryRecord>();

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    const record = this.records.get(key);

    if (!record) {
      return null;
    }

    if (Date.now() > record.expiresAtMs) {
      this.records.delete(key);
      return null;
    }

    return JSON.parse(record.payload) as CacheEntry<T>;
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + ttlSeconds * 1000);

    const entry: CacheEntry<T> = {
      value,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    this.records.set(key, {
      payload: JSON.stringify(entry),
      expiresAtMs: expiresAt.getTime(),
    });
  }

  async delete(key: string): Promise<void> {
    this.records.delete(key);
  }
}

export const memoryCacheStore = new MemoryCacheStore();
