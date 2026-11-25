// Small shared decorative pieces (all original SVG).

export function Stars({ count = 18, className = '' }) {
  // Deterministic pseudo-random layout so server/client and re-renders match.
  const stars = Array.from({ length: count }, (_, i) => ({
    x: (i * 53.7) % 100,
    y: (i * 29.3 + (i % 3) * 11) % 100,
    s: 2 + (i % 3),
    d: (i % 5) * 0.5,
  }))
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {stars.map((st, i) => (
        <span
          key={i}
          className="anim-twinkle absolute rounded-full bg-honey"
          style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, animationDelay: `${st.d}s` }}
        />
      ))}
    </div>
  )
}

export function Sparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M10 0 C11 7 13 9 20 10 C13 11 11 13 10 20 C9 13 7 11 0 10 C7 9 9 7 10 0Z" fill="currentColor" />
    </svg>
  )
}

export function Moon({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M26 4a16 16 0 1 0 10 26A13 13 0 0 1 26 4z" fill="#f2be6b" />
    </svg>
  )
}

/** Wavy edge used where a dark section begins. `fill` is the colour of the section below. */
export function WaveEdge({ fill = '#24130b', className = '' }) {
  return (
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className={`block h-8 w-full md:h-12 ${className}`} aria-hidden="true">
      <path d="M0 30 C 120 6, 240 6, 360 26 S 600 48, 720 26 S 960 4, 1080 24 S 1320 46, 1440 22 V48 H0Z" fill={fill} />
    </svg>
  )
}

export function Skyline({ className = '', stroke = 'currentColor' }) {
  return (
    <svg viewBox="0 0 600 140" preserveAspectRatio="xMidYMax meet" className={className} aria-hidden="true">
      <path
        d="M0 140 V110 H30 V90 H55 V112 H80 V70 H100 V60 H112 V70 H128 V118 H150 V96 H178 V122 H200 V80 H214 V40 L222 8 L230 40 V80 H246 V104 H270 V86 H300 V120 H322 V64 H344 V54 H356 V64 H372 V114 H396 V92 H424 V124 H446 V76 H470 V100 H494 V60 H512 V100 H530 V116 H560 V94 H584 V126 H600 V140"
        fill="none" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round"
      />
    </svg>
  )
}

export function Paw({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="currentColor">
        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" />
        <ellipse cx="14.6" cy="29.2" rx="4.6" ry="6" /><ellipse cx="24.2" cy="16.6" rx="5" ry="6.8" />
        <ellipse cx="39.8" cy="16.6" rx="5" ry="6.8" /><ellipse cx="49.4" cy="29.2" rx="4.6" ry="6" />
      </g>
    </svg>
  )
}
