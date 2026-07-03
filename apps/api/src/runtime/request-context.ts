import {
  CloudflareKVCacheStore,
  memoryCacheStore,
  type CacheStore,
} from "@github-pet/cache";
import type { CloudflareEnv } from "./cloudflare.env";

export interface RequestContext {
  requestId: string;
  startedAt: number;
  cache: CacheStore;
}

export function createRequestContext(env: CloudflareEnv): RequestContext {
  return {
    requestId: crypto.randomUUID(),
    startedAt: Date.now(),
    cache: env.GITHUB_PET_CACHE
      ? new CloudflareKVCacheStore(env.GITHUB_PET_CACHE)
      : memoryCacheStore,
  };
}
