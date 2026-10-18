const descriptions = {
  support: "A customer question connected to an AI-assisted response, illustrated as conversation panels",
  scheduling: "An appointment calendar connected to a confirmation card",
  leads: "Three initial conversations organized into a structured lead profile",
  workflow: "A sequence connecting a business trigger, an AI-assisted task, and a next step",
  network: "A central intelligence node connecting people and communication channels",
  contact: "Two message panels connected by a flowing communication path",
};

/** Original, resolution-independent illustrations; no external assets or implied live data. */
export default function CommunicationVisual({ variant = "network", className = "" }) {
  const conversation = variant === "support" || variant === "contact";
  return (
    <figure className={`communication-visual ${className}`}>
      <svg viewBox="0 0 440 240" role="img" aria-label={descriptions[variant] || descriptions.network}>
        <title>{descriptions[variant] || descriptions.network}</title>
        <circle className="visual-aura" cx="220" cy="120" r="104" />
        <circle className="visual-orbit" cx="220" cy="120" r="86" />
        {conversation && <>
          <path className="visual-connection" d="M140 112 C150 175 290 62 304 125" />
          <g className="visual-panel"><rect x="38" y="46" width="167" height="102" rx="17" /><path d="M63 147 L63 161 L84 148" /></g>
          <circle className="visual-accent" cx="64" cy="70" r="6" />
          <path className="visual-line" d="M82 70 H174 M62 93 H180 M62 112 H144" />
          <g className="visual-purple-panel"><rect x="230" y="103" width="166" height="96" rx="17" /><path d="M370 198 L370 212 L350 199" /></g>
          <path className="visual-white-line" d="M252 136 H372 M252 157 H340 M252 177 H356" />
          <circle className="visual-node" cx="214" cy="169" r="7" />
        </>}
        {variant === "scheduling" && <>
          <rect className="visual-panel" x="52" y="33" width="188" height="174" rx="20" />
          <path className="visual-line" d="M53 77 H239 M92 24 V47 M198 24 V47" />
          {[0, 1, 2].map(row => [0, 1, 2, 3].map(col => <rect key={`${row}-${col}`} className={row === 1 && col === 2 ? "visual-accent" : "visual-cell"} x={77 + col * 36} y={97 + row * 31} width="19" height="18" rx="5" />))}
          <path className="visual-connection" d="M241 125 H286" />
          <rect className="visual-purple-panel" x="286" y="78" width="105" height="105" rx="22" />
          <path className="visual-white-line" d="M313 132 L329 148 L364 111" />
        </>}
        {variant === "leads" && <>
          {[0, 1, 2].map(i => <g key={i}><path className="visual-connection" d={`M124 ${53 + i * 67} C192 ${53 + i * 67} 175 120 243 120`} /><rect className="visual-panel" x="38" y={31 + i * 67} width="89" height="45" rx="12" /><circle className="visual-accent" cx="58" cy={53 + i * 67} r="7" /><path className="visual-line" d={`M75 ${49 + i * 67} H111 M75 ${59 + i * 67} H99`} /></g>)}
          <rect className="visual-panel" x="244" y="49" width="152" height="146" rx="22" />
          <circle className="visual-accent" cx="319" cy="85" r="17" /><path className="visual-line" d="M284 122 H354 M276 144 H363 M289 164 H348" />
        </>}
        {variant === "workflow" && <>
          <path className="visual-connection" d="M74 121 H366" />
          {[74, 220, 366].map((x, i) => <g key={x}><rect className={i === 1 ? "visual-purple-panel" : "visual-panel"} x={x - 41} y="78" width="82" height="86" rx="21" /><circle className={i === 1 ? "visual-white-dot" : "visual-accent"} cx={x} cy="120" r="12" /></g>)}
          <path className="visual-line" d="M123 115 L132 121 L123 127 M275 115 L284 121 L275 127" />
          <path className="visual-orbit" d="M365 166 V192 H74 V167" />
        </>}
        {variant === "network" && <>
          {[[70, 72], [110, 185], [360, 65], [343, 183], [221, 30]].map(([x, y], i) => <g key={x}><path className="visual-connection" d={`M220 120 Q${220 + (i % 2 ? 40 : -40)} ${y} ${x} ${y}`} /><circle className="visual-panel" cx={x} cy={y} r="20" /><circle className="visual-accent" cx={x} cy={y} r="5" /></g>)}
          <circle className="visual-purple-panel" cx="220" cy="120" r="45" />
          <path className="visual-white-line" d="M191 121 H198 L204 105 L211 140 L219 97 L227 132 L233 111 L239 121 H249" />
        </>}
      </svg>
    </figure>
  );
}
