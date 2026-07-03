import { escapeSvgText } from "../svg-safe";

export function renderSpeechBubble(message: string): string {
  const safeMessage = escapeSvgText(message);

  return `
    <g transform="translate(160 34)">
      <rect x="0" y="0" width="320" height="58" rx="14" fill="#161b22" stroke="#30363d" stroke-width="2"/>
      <path d="M22 58 L42 58 L28 74 Z" fill="#161b22" stroke="#30363d" stroke-width="2"/>
      <text x="22" y="35" fill="#f0f6fc" font-family="Verdana, Geneva, sans-serif" font-size="16" font-weight="700">
        ${safeMessage}
      </text>
    </g>
  `;
}
