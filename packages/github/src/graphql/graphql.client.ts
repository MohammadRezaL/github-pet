import type { GitHubGraphQLContributionResponse, GitHubServiceConfig } from "../github.types";
import { CONTRIBUTION_QUERY } from "./contribution.query";

export class GitHubGraphQLError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GitHubGraphQLError";
  }
}

export async function githubGraphQLRequest<T>(
  config: GitHubServiceConfig,
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  if (!config.token) {
    throw new GitHubGraphQLError("GitHub GraphQL requires a token.");
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.token}`,
      "User-Agent": config.userAgent ?? "github-pet",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new GitHubGraphQLError(`GitHub GraphQL request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function isoDaysAgo(days: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString();
}

export async function fetchContributionCalendar(
  config: GitHubServiceConfig,
  username: string,
): Promise<GitHubGraphQLContributionResponse | null> {
  if (!config.token) {
    return null;
  }

  return githubGraphQLRequest<GitHubGraphQLContributionResponse>(config, CONTRIBUTION_QUERY, {
    login: username,
    from: isoDaysAgo(365),
    to: new Date().toISOString(),
  });
}
