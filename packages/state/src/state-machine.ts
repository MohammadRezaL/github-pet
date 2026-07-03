import type { Emotion, GitHubActivitySummary } from "@github-pet/core";
import { calculateActivityScore, type ActivityScore } from "./activity-score";
import { resolveEmotion } from "./emotion-resolver";
import { detectInactivity, type InactivityResult } from "./inactivity-detector";
import { detectMilestone, type MilestoneResult } from "./milestone-detector";

export interface PetState {
  emotion: Emotion;
  matchedRule: string;
  activityScore: ActivityScore;
  inactivity: InactivityResult;
  milestone: MilestoneResult;
}

export function resolvePetState(
  activity: GitHubActivitySummary,
  now: Date = new Date(),
): PetState {
  const activityScore = calculateActivityScore(activity);
  const inactivity = detectInactivity(activity, now);
  const milestone = detectMilestone(activity);

  const resolution = resolveEmotion({
    activity,
    score: activityScore,
    inactivity,
    milestone,
  });

  return {
    emotion: resolution.emotion,
    matchedRule: resolution.matchedRule,
    activityScore,
    inactivity,
    milestone,
  };
}
