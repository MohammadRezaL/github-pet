import type { GitHubActivitySummary } from "@github-pet/core";
import { escapeSvgText } from "../svg-safe";

export function renderStatsPanel(username: string, activity?: GitHubActivitySummary): string {
  const safeUsername = escapeSvgText(username);

  if (!activity) {
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

  return `
    <g transform="translate(160 112)">
      <rect x="0" y="0" width="320" height="42" rx="10" fill="#010409" stroke="#21262d"/>

      <text x="16" y="17" fill="#58a6ff" font-family="Verdana, Geneva, sans-serif" font-size="11" font-weight="700">
        @${safeUsername}
      </text>

      <text x="16" y="33" fill="#8b949e" font-family="Verdana, Geneva, sans-serif" font-size="10">
        commits 7d:
      </text>
      <text x="82" y="33" fill="#3fb950" font-family="Verdana, Geneva, sans-serif" font-size="10" font-weight="700">
        ${activity.commitsLast7Days}
      </text>

      <text x="118" y="33" fill="#8b949e" font-family="Verdana, Geneva, sans-serif" font-size="10">
        streak:
      </text>
      <text x="164" y="33" fill="#f2cc60" font-family="Verdana, Geneva, sans-serif" font-size="10" font-weight="700">
        ${activity.currentStreakDays}d
      </text>

      <text x="204" y="33" fill="#8b949e" font-family="Verdana, Geneva, sans-serif" font-size="10">
        followers:
      </text>
      <text x="264" y="33" fill="#f778ba" font-family="Verdana, Geneva, sans-serif" font-size="10" font-weight="700">
        ${activity.followers}
      </text>
    </g>
  `;
}
