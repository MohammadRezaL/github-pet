import type { Emotion } from "@github-pet/core";
import type { StateRuleInput } from "./state-rules";
import { STATE_RULES } from "./state-rules";

export interface EmotionResolution {
  emotion: Emotion;
  matchedRule: string;
}

export function resolveEmotion(input: StateRuleInput): EmotionResolution {
  const sortedRules = [...STATE_RULES].sort((a, b) => b.priority - a.priority);
  const matchedRule = sortedRules.find((rule) => rule.matches(input));

  if (!matchedRule) {
    return {
      emotion: "waiting",
      matchedRule: "fallback",
    };
  }

  return {
    emotion: matchedRule.emotion,
    matchedRule: matchedRule.name,
  };
}
