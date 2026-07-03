export function renderVisitorCounter(): string {
  return `
    <g transform="translate(402 150)">
      <circle cx="0" cy="0" r="4" fill="#3fb950">
        <animate attributeName="opacity" values="1;0.35;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <text x="10" y="4" fill="#8b949e" font-family="Verdana, Geneva, sans-serif" font-size="10">
        visitor ready
      </text>
    </g>
  `;
}
