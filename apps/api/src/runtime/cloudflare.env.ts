import type { CloudflareKVNamespace } from "@github-pet/cache";

export interface CloudflareEnv {
  GITHUB_TOKEN?: string;
  CACHE_TTL_SECONDS?: string;
  WIDGET_BASE_URL?: string;
  GITHUB_PET_CACHE?: CloudflareKVNamespace;
}
