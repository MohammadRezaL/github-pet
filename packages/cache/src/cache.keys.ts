export function githubActivityCacheKey(username: string): string {
  return `github:activity:${username.toLowerCase()}`;
}
