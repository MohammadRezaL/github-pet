import type { RenderWidgetInput } from "@github-pet/core";
import { renderBackground } from "./components/background.component";
import { renderPet } from "./components/pet.component";
import { renderSpeechBubble } from "./components/speech-bubble.component";
import { renderStatsPanel } from "./components/stats-panel.component";
import { renderSignature } from "./components/signature.component";
import { renderVisitorCounter } from "./components/visitor-counter.component";
import { getWidgetLayoutBox } from "./widget-layout";

function resolveBootstrapMessage(username: string): string {
  if (username.toLowerCase() === "octocat") {
    return "Hi Octocat! I'm waking up.";
  }

  return "Feed me with commits!";
}

export function renderWidget(input: RenderWidgetInput): string {
  const box = getWidgetLayoutBox();
  const message = resolveBootstrapMessage(input.options.username);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${box.width}"
  height="${box.height}"
  viewBox="${box.viewBox}"
  role="img"
  aria-label="Animated GitHub Pet widget for ${input.options.username}"
>
  <title>GitHub Pet for ${input.options.username}</title>
  <desc>An animated pixel-art pet widget generated from GitHub activity.</desc>
  ${renderBackground()}
  ${renderPet()}
  ${renderSpeechBubble(message)}
  ${input.options.hideStats ? "" : renderStatsPanel(input.options.username)}
  ${renderVisitorCounter()}
  ${renderSignature()}
</svg>`;
}
