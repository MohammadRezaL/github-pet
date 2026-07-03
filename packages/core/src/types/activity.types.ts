export interface GitHubActivitySummary {
  username: string;
  commitsLast7Days: number;
  commitsLast30Days: number;
  currentStreakDays: number;
  followers: number;
  publicRepos: number;
  lastActiveAt: string | null;
}
