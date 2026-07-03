import type { GitHubRestClient } from "./user.rest";

export interface GitHubRepoRestResponse {
  id: number;
  name: string;
  full_name: string;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
}

export async function fetchGitHubUserRepos(
  client: GitHubRestClient,
  username: string,
): Promise<GitHubRepoRestResponse[]> {
  return client.get<GitHubRepoRestResponse[]>(
    `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
  );
}
