export function renderPet(): string {
  return `
    <g transform="translate(46 46) scale(2)">
      <g style="shape-rendering: crispEdges">
        <rect x="16" y="8" width="4" height="4" fill="#f2cc8f"/>
        <rect x="32" y="8" width="4" height="4" fill="#f2cc8f"/>
        <rect x="12" y="12" width="28" height="24" rx="2" fill="#f2cc8f"/>
        <rect x="16" y="16" width="4" height="4" fill="#0d1117"/>
        <rect x="32" y="16" width="4" height="4" fill="#0d1117"/>
        <rect x="24" y="22" width="4" height="4" fill="#d27d2d"/>
        <rect x="20" y="30" width="12" height="2" fill="#0d1117"/>
        <rect x="8" y="22" width="4" height="8" fill="#f2cc8f"/>
        <rect x="40" y="22" width="4" height="8" fill="#f2cc8f"/>
        <rect x="16" y="36" width="20" height="14" fill="#e9b872"/>
        <rect x="12" y="48" width="8" height="4" fill="#f2cc8f"/>
        <rect x="32" y="48" width="8" height="4" fill="#f2cc8f"/>
        <rect x="40" y="38" width="4" height="10" fill="#e9b872">
          <animate attributeName="x" values="40;42;40" dur="0.8s" repeatCount="indefinite"/>
        </rect>
      </g>

      <animateTransform
        attributeName="transform"
        type="translate"
        values="46 46;46 42;46 46"
        dur="1.4s"
        repeatCount="indefinite"
        additive="sum"
      />
    </g>
  `;
}
