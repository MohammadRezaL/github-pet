export function renderBackground(): string {
  return `
    <rect x="0" y="0" width="520" height="180" rx="18" fill="#0d1117"/>
    <rect x="1" y="1" width="518" height="178" rx="17" fill="none" stroke="#30363d" stroke-width="2"/>
    <circle cx="438" cy="42" r="34" fill="#1f6feb" opacity="0.18">
      <animate attributeName="opacity" values="0.12;0.24;0.12" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="88" cy="130" r="46" fill="#f778ba" opacity="0.10">
      <animate attributeName="opacity" values="0.06;0.16;0.06" dur="5s" repeatCount="indefinite"/>
    </circle>
  `;
}
