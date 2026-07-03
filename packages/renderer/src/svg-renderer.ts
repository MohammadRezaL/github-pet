import type { Emotion, RenderWidgetInput } from "@github-pet/core";
import { renderBackground } from "./components/background.component";
import { renderPet } from "./components/pet.component";
import { renderSpeechBubble } from "./components/speech-bubble.component";
import { renderStatsPanel } from "./components/stats-panel.component";
import { renderSignature } from "./components/signature.component";
import { renderVisitorCounter } from "./components/visitor-counter.component";
import { escapeSvgAttribute } from "./svg-safe";
import { getWidgetLayoutBox } from "./widget-layout";

function messageForEmotion(emotion: Emotion): string {
  switch (emotion) {
    case "crying":
      return "I miss my human...";
    case "lonely":
      return "I'm getting lonely...";
    case "sad":
      return "You haven't been here in a while.";
    case "hungry":
      return "Feed me with commits!";
    case "excited":
      return "So many commits! I'm excited!";
    case "playing":
      return "Your streak keeps me playful!";
    case "happy":
      return "Thanks for feeding me!";
    case "sleeping":
      return "Zzz... waiting for activity.";
    case "angry":
      return "Hey! Don't abandon me!";
    case "waving":
      return "Hi visitor! Welcome!";
    case "eating":
      return "Nom nom... fresh commits!";
    case "waiting":
    default:
      return "I've been waiting for you.";
  }
}

function resolveWidgetEmotion(input: RenderWidgetInput): Emotion {
  return input.options.emotion ?? "waiting";
}

export function renderWidget(input: RenderWidgetInput): string {
  const box = getWidgetLayoutBox();
  const emotion = resolveWidgetEmotion(input);
  const message = messageForEmotion(emotion);
  const safeUsername = escapeSvgAttribute(input.options.username);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${box.width}"
  height="${box.height}"
  viewBox="${box.viewBox}"
  role="img"
  aria-label="Animated GitHub Pet widget for ${safeUsername}"
>
  <title>GitHub Pet for ${safeUsername}</title>
  <desc>An animated pixel-art pet widget generated from GitHub activity.</desc>
  ${renderBackground()}
  ${renderPet()}
  ${renderSpeechBubble(message)}
  ${input.options.hideStats ? "" : renderStatsPanel(input.options.username, input.activity)}
  ${renderVisitorCounter()}
  ${renderSignature()}
</svg>`;
}
