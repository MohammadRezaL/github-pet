import { escapeSvgText } from "../svg-safe";

export function renderStatsPanel(username: string): string {
  const safeUsername = escapeSvgText(username);

  return `
    <g transform="translate(160 112)">
      <rect x="0" y="0" width="320" height="34" rx="10" fill="#010409" stroke="#21262d"/>
      <text x="16" y="22" fill="#8b949e" font-family="Verdana, Geneva, sans-serif" font-size="12">
        tracking GitHub activity for
      </text>
      <text x="188" y="22" fill="#58a6ff" font-family="Verdana, Geneva, sans-serif" font-size="12" font-weight="700">
        @${safeUsername}
      </text>
    </g>
  `;
}
