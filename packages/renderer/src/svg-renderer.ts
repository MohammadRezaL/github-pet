import type { RenderWidgetInput } from "@github-pet/core";
import { renderBackground } from "./components/background.component";
import { renderPet } from "./components/pet.component";
import { renderSpeechBubble } from "./components/speech-bubble.component";
import { renderStatsPanel } from "./components/stats-panel.component";
import { renderSignature } from "./components/signature.component";
import { renderVisitorCounter } from "./components/visitor-counter.component";
import { escapeSvgAttribute } from "./svg-safe";
import { getWidgetLayoutBox } from "./widget-layout";

function resolveBootstrapMessage(input: RenderWidgetInput): string {
  const activity = input.activity;

  if (!activity) {
    return "Feed me with commits!";
  }

  if (activity.commitsLast7Days >= 10) {
    return "So many commits! I'm excited!";
  }

  if (activity.currentStreakDays >= 7) {
    return "Your streak keeps me happy!";
  }

  if (activity.commitsLast7Days === 0) {
    return "I miss your commits...";
  }

  return "Thanks for feeding me!";
}

export function renderWidget(input: RenderWidgetInput): string {
  const box = getWidgetLayoutBox();
  const message = resolveBootstrapMessage(input);
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
