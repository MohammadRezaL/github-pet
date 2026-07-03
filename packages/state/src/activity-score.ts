import type { GitHubActivitySummary } from "@github-pet/core";

export interface ActivityScore {
  total: number;
  commitScore: number;
  streakScore: number;
  followerScore: number;
  repoScore: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function calculateActivityScore(activity: GitHubActivitySummary): ActivityScore {
  const commitScore = clamp(activity.commitsLast7Days * 8, 0, 40);
  const streakScore = clamp(activity.currentStreakDays * 4, 0, 30);
  const followerScore = clamp(Math.floor(activity.followers / 10), 0, 15);
  const repoScore = clamp(activity.publicRepos * 2, 0, 15);

  return {
    total: commitScore + streakScore + followerScore + repoScore,
    commitScore,
    streakScore,
    followerScore,
    repoScore,
  };
}
