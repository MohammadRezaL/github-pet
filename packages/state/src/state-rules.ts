import type { Emotion, GitHubActivitySummary } from "@github-pet/core";
import type { ActivityScore } from "./activity-score";
import type { InactivityResult } from "./inactivity-detector";
import type { MilestoneResult } from "./milestone-detector";

export interface StateRuleInput {
  activity: GitHubActivitySummary;
  score: ActivityScore;
  inactivity: InactivityResult;
  milestone: MilestoneResult;
}

export interface StateRule {
  name: string;
  priority: number;
  emotion: Emotion;
  matches(input: StateRuleInput): boolean;
}

export const STATE_RULES: StateRule[] = [
  {
    name: "critical_inactivity",
    priority: 100,
    emotion: "crying",
    matches: ({ inactivity }) => inactivity.level === "critical",
  },
  {
    name: "high_inactivity",
    priority: 90,
    emotion: "lonely",
    matches: ({ inactivity }) => inactivity.level === "high",
  },
  {
    name: "medium_inactivity",
    priority: 80,
    emotion: "sad",
    matches: ({ inactivity }) => inactivity.level === "medium",
  },
  {
    name: "no_recent_commits",
    priority: 70,
    emotion: "hungry",
    matches: ({ activity }) => activity.commitsLast7Days === 0,
  },
  {
    name: "major_milestone",
    priority: 65,
    emotion: "excited",
    matches: ({ milestone }) =>
      milestone.type === "followers_1000" ||
      milestone.type === "followers_100" ||
      milestone.type === "streak_30",
  },
  {
    name: "strong_streak",
    priority: 60,
    emotion: "playing",
    matches: ({ activity }) => activity.currentStreakDays >= 7,
  },
  {
    name: "very_active",
    priority: 55,
    emotion: "excited",
    matches: ({ activity }) => activity.commitsLast7Days >= 10,
  },
  {
    name: "active",
    priority: 50,
    emotion: "happy",
    matches: ({ score }) => score.total >= 25,
  },
  {
    name: "new_or_quiet_profile",
    priority: 20,
    emotion: "waiting",
    matches: ({ score }) => score.total < 25,
  },
];
