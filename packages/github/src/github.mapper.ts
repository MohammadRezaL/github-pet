import type {
  GitHubActivitySummary,
  GitHubEventRestResponse,
  GitHubGraphQLContributionResponse,
  GitHubRawActivity,
} from "./github.types";

function countPushCommits(events: GitHubEventRestResponse[], days: number): number {
  const now = Date.now();
  const windowMs = days * 24 * 60 * 60 * 1000;

  return events.reduce((total, event) => {
    if (event.type !== "PushEvent") {
      return total;
    }

    const createdAt = new Date(event.created_at).getTime();

    if (Number.isNaN(createdAt) || now - createdAt > windowMs) {
      return total;
    }

    return total + (event.payload?.commits?.length ?? 0);
  }, 0);
}

function findLastActiveAt(events: GitHubEventRestResponse[]): string | null {
  const timestamps = events
    .map((event) => new Date(event.created_at).getTime())
    .filter((timestamp) => !Number.isNaN(timestamp))
    .sort((a, b) => b - a);

  if (timestamps.length === 0 || timestamps[0] === undefined) {
    return null;
  }

  return new Date(timestamps[0]).toISOString();
}

function flattenContributionDays(response: GitHubGraphQLContributionResponse | null) {
  return (
    response?.data?.user?.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays,
    ) ?? []
  );
}

function calculateCurrentStreakDays(response: GitHubGraphQLContributionResponse | null): number {
  const days = flattenContributionDays(response).sort((a, b) => b.date.localeCompare(a.date));

  let streak = 0;

  for (const day of days) {
    if (day.contributionCount > 0) {
      streak += 1;
      continue;
    }

    if (streak === 0) {
      continue;
    }

    break;
  }

  return streak;
}

export function mapGitHubActivity(raw: GitHubRawActivity): GitHubActivitySummary {
  return {
    username: raw.user.login,
    commitsLast7Days: countPushCommits(raw.events, 7),
    commitsLast30Days: countPushCommits(raw.events, 30),
    currentStreakDays: calculateCurrentStreakDays(raw.contributions),
    followers: raw.user.followers,
    publicRepos: raw.user.public_repos,
    lastActiveAt: findLastActiveAt(raw.events),
  };
}
