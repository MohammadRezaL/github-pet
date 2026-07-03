import type { GitHubActivitySummary } from "@github-pet/core";

export type MilestoneType =
  | "none"
  | "streak_7"
  | "streak_30"
  | "followers_100"
  | "followers_1000"
  | "repos_10"
  | "repos_50";

export interface MilestoneResult {
  type: MilestoneType;
  label: string | null;
}

export function detectMilestone(activity: GitHubActivitySummary): MilestoneResult {
  if (activity.followers >= 1000) {
    return {
      type: "followers_1000",
      label: "1K followers",
    };
  }

  if (activity.followers >= 100) {
    return {
      type: "followers_100",
      label: "100 followers",
    };
  }

  if (activity.currentStreakDays >= 30) {
    return {
      type: "streak_30",
      label: "30 day streak",
    };
  }

  if (activity.currentStreakDays >= 7) {
    return {
      type: "streak_7",
      label: "7 day streak",
    };
  }

  if (activity.publicRepos >= 50) {
    return {
      type: "repos_50",
      label: "50 repositories",
    };
  }

  if (activity.publicRepos >= 10) {
    return {
      type: "repos_10",
      label: "10 repositories",
    };
  }

  return {
    type: "none",
    label: null,
  };
}
