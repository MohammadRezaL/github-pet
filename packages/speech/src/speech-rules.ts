import type { WidgetSpeech } from "@github-pet/core";
import type { SpeechRule } from "./speech.types";

function speech(text: string, priority: number, tone: WidgetSpeech["tone"]): WidgetSpeech {
  return {
    text,
    priority,
    tone,
  };
}

export const SPEECH_RULES: SpeechRule[] = [
  {
    name: "milestone",
    priority: 100,
    matches: (input) => Boolean(input.milestoneLabel),
    create: (input) => speech(`Milestone reached: ${input.milestoneLabel}!`, 100, "positive"),
  },
  {
    name: "critical_inactivity",
    priority: 90,
    matches: (input) => input.matchedRule === "critical_inactivity",
    create: () => speech("I miss my human...", 90, "sad"),
  },
  {
    name: "high_inactivity",
    priority: 80,
    matches: (input) => input.matchedRule === "high_inactivity",
    create: () => speech("I'm getting lonely...", 80, "sad"),
  },
  {
    name: "no_recent_commits",
    priority: 70,
    matches: (input) => input.matchedRule === "no_recent_commits",
    create: () => speech("Feed me with commits!", 70, "urgent"),
  },
  {
    name: "very_active",
    priority: 60,
    matches: (input) => input.matchedRule === "very_active",
    create: () => speech("So many commits! I'm excited!", 60, "positive"),
  },
  {
    name: "strong_streak",
    priority: 55,
    matches: (input) => input.matchedRule === "strong_streak",
    create: () => speech("Your streak keeps me playful!", 55, "playful"),
  },
];
