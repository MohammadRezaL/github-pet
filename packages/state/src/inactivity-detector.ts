import type { GitHubActivitySummary } from "@github-pet/core";

export type InactivityLevel = "none" | "low" | "medium" | "high" | "critical";

export interface InactivityResult {
  level: InactivityLevel;
  inactiveDays: number | null;
}

export function detectInactivity(
  activity: GitHubActivitySummary,
  now: Date = new Date(),
): InactivityResult {
  if (!activity.lastActiveAt) {
    return {
      level: "critical",
      inactiveDays: null,
    };
  }

  const lastActiveTime = new Date(activity.lastActiveAt).getTime();

  if (Number.isNaN(lastActiveTime)) {
    return {
      level: "critical",
      inactiveDays: null,
    };
  }

  const diffMs = now.getTime() - lastActiveTime;
  const inactiveDays = Math.max(0, Math.floor(diffMs / (24 * 60 * 60 * 1000)));

  if (inactiveDays >= 30) {
    return { level: "critical", inactiveDays };
  }

  if (inactiveDays >= 14) {
    return { level: "high", inactiveDays };
  }

  if (inactiveDays >= 7) {
    return { level: "medium", inactiveDays };
  }

  if (inactiveDays >= 3) {
    return { level: "low", inactiveDays };
  }

  return { level: "none", inactiveDays };
}
