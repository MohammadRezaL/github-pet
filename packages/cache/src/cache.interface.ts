export interface CacheEntry<T> {
  value: T;
  createdAt: string;
  expiresAt: string;
}

export interface CacheStore {
  get<T>(key: string): Promise<CacheEntry<T> | null>;
  set<T>(key: string, value: T, ttlSeconds: number): Promise<void>;
  delete(key: string): Promise<void>;
}
