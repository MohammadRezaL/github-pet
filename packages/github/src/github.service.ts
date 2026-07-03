import type { GitHubActivitySummary } from "@github-pet/core";
import { createGitHubClient } from "./github.client";
import { fetchContributionCalendar } from "./graphql/graphql.client";
import { mapGitHubActivity } from "./github.mapper";
import type { GitHubServiceConfig } from "./github.types";
import { fetchGitHubUserEvents } from "./rest/events.rest";
import { fetchGitHubUser } from "./rest/user.rest";

export async function getGitHubActivity(
  username: string,
  config: GitHubServiceConfig = {},
): Promise<GitHubActivitySummary> {
  const client = createGitHubClient(config);

  const [user, events, contributions] = await Promise.all([
    fetchGitHubUser(client, username),
    fetchGitHubUserEvents(client, username),
    fetchContributionCalendar(config, username),
  ]);

  return mapGitHubActivity({
    user,
    events,
    contributions,
  });
}
