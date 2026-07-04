import type { Emotion, WidgetSpeech } from "@github-pet/core";
import { ANGRY_MESSAGES } from "./messages/angry.messages";
import { CRYING_MESSAGES } from "./messages/crying.messages";
import { EATING_MESSAGES } from "./messages/eating.messages";
import { EXCITED_MESSAGES } from "./messages/excited.messages";
import { HAPPY_MESSAGES } from "./messages/happy.messages";
import { HUNGRY_MESSAGES } from "./messages/hungry.messages";
import { LONELY_MESSAGES } from "./messages/lonely.messages";
import { PLAYING_MESSAGES } from "./messages/playing.messages";
import { SAD_MESSAGES } from "./messages/sad.messages";
import { SLEEPING_MESSAGES } from "./messages/sleeping.messages";
import { WAITING_MESSAGES } from "./messages/waiting.messages";
import { WAVING_MESSAGES } from "./messages/waving.messages";
import { SPEECH_RULES } from "./speech-rules";
import type { SpeechInput } from "./speech.types";

const MESSAGE_BANK: Record<Emotion, readonly string[]> = {
  happy: HAPPY_MESSAGES,
  excited: EXCITED_MESSAGES,
  sleeping: SLEEPING_MESSAGES,
  waiting: WAITING_MESSAGES,
  sad: SAD_MESSAGES,
  lonely: LONELY_MESSAGES,
  hungry: HUNGRY_MESSAGES,
  angry: ANGRY_MESSAGES,
  crying: CRYING_MESSAGES,
  waving: WAVING_MESSAGES,
  eating: EATING_MESSAGES,
  playing: PLAYING_MESSAGES,
};

function hashText(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function toneForEmotion(emotion: Emotion): WidgetSpeech["tone"] {
  switch (emotion) {
    case "happy":
    case "excited":
    case "eating":
      return "positive";
    case "playing":
    case "waving":
      return "playful";
    case "sad":
    case "lonely":
    case "crying":
      return "sad";
    case "hungry":
    case "angry":
      return "urgent";
    case "sleeping":
    case "waiting":
    default:
      return "neutral";
  }
}

function fallbackSpeech(input: SpeechInput): WidgetSpeech {
  const messages = MESSAGE_BANK[input.emotion];
  const seed = hashText(`${input.username}:${input.emotion}`);
  const selected = messages[seed % messages.length] ?? "I've been waiting for you.";

  return {
    text: selected,
    priority: 10,
    tone: toneForEmotion(input.emotion),
  };
}

export function createSpeech(input: SpeechInput): WidgetSpeech {
  const matchedRule = [...SPEECH_RULES]
    .sort((a, b) => b.priority - a.priority)
    .find((rule) => rule.matches(input));

  if (matchedRule) {
    return matchedRule.create(input);
  }

  return fallbackSpeech(input);
}
