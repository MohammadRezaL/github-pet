import type { GitHubEventRestResponse } from "../github.types";
import type { GitHubRestClient } from "./user.rest";

export async function fetchGitHubUserEvents(
  client: GitHubRestClient,
  username: string,
): Promise<GitHubEventRestResponse[]> {
  return client.get<GitHubEventRestResponse[]>(
    `/users/${encodeURIComponent(username)}/events/public?per_page=100`,
  );
}
