import type { Emotion, GitHubActivitySummary, WidgetSpeech } from "@github-pet/core";

export interface SpeechInput {
  username: string;
  emotion: Emotion;
  activity?: GitHubActivitySummary;
  matchedRule?: string;
  milestoneLabel?: string | null;
}

export interface SpeechRule {
  name: string;
  priority: number;
  matches(input: SpeechInput): boolean;
  create(input: SpeechInput): WidgetSpeech;
}
