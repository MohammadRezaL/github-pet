export const EMOTIONS = [
  "happy",
  "excited",
  "sleeping",
  "waiting",
  "sad",
  "lonely",
  "hungry",
  "angry",
  "crying",
  "waving",
  "eating",
  "playing"
] as const;

export type Emotion = (typeof EMOTIONS)[number];

export function isEmotion(value: string): value is Emotion {
  return EMOTIONS.includes(value as Emotion);
}
