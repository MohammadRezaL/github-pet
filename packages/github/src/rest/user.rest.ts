import type { GitHubUserRestResponse } from "../github.types";

export interface GitHubRestClient {
  get<T>(path: string): Promise<T>;
}

export async function fetchGitHubUser(
  client: GitHubRestClient,
  username: string,
): Promise<GitHubUserRestResponse> {
  return client.get<GitHubUserRestResponse>(`/users/${encodeURIComponent(username)}`);
}
