// "Teddy", the site mascot: an apricot teddy-poodle, drawn from scratch for this clone
// (the reference's own SVG artwork is not copied).
const FUR = '#e9a557'
const FUR_LIGHT = '#f6c983'
const FUR_DARK = '#c9803a'
const INK = '#2a170e'

function Fluff({ cx, cy, r, fill = FUR }) {
  // A cluster of circles reads as curly poodle fur.
  const n = 9
  return (
    <g fill={fill} stroke={INK} strokeWidth="2.2">
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2
        return <circle key={i} cx={cx + Math.cos(a) * r * 0.72} cy={cy + Math.sin(a) * r * 0.72} r={r * 0.42} />
      })}
      <circle cx={cx} cy={cy} r={r * 0.78} stroke="none" />
    </g>
  )
}

function Head({ x = 0, y = 0, s = 1, wink = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* ears */}
      <Fluff cx={-27} cy={8} r={13} fill={FUR_DARK} />
      <Fluff cx={27} cy={8} r={13} fill={FUR_DARK} />
      {/* head + topknot */}
      <Fluff cx={0} cy={-26} r={12} fill={FUR_LIGHT} />
      <Fluff cx={0} cy={0} r={27} />
      {/* muzzle */}
      <ellipse cx="0" cy="9" rx="14" ry="10.5" fill={FUR_LIGHT} />
      {/* cheeks */}
      <ellipse cx="-15" cy="6" rx="5" ry="3.2" fill="#f19b86" opacity=".7" />
      <ellipse cx="15" cy="6" rx="5" ry="3.2" fill="#f19b86" opacity=".7" />
      {/* eyes */}
      {wink ? (
        <path d="M-14 -3 q4 -4 8 0" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      ) : (
        <g>
          <circle cx="-10" cy="-3" r="4.2" fill={INK} />
          <circle cx="-8.6" cy="-4.6" r="1.4" fill="#fff" />
        </g>
      )}
      <circle cx="10" cy="-3" r="4.2" fill={INK} />
      <circle cx="11.4" cy="-4.6" r="1.4" fill="#fff" />
      {/* nose + mouth */}
      <path d="M-4.5 4.5 q4.5 -3 9 0 q-1 4 -4.5 4.6 q-3.5 -0.6 -4.5 -4.6z" fill={INK} />
      <path d="M0 9 v3 M0 12 q-4 4 -7 0 M0 12 q4 4 7 0" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <path d="M-2.2 13.5 q2.2 4 4.4 0" fill="#e9707a" stroke={INK} strokeWidth="1.4" />
    </g>
  )
}

/**
 * @param {{variant?: 'sit'|'walk'|'head', className?: string, title?: string, wink?: boolean}} props
 */
export default function Pup({ variant = 'sit', className = '', title, wink = false }) {
  const labelled = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true }
  if (variant === 'head') {
    return (
      <svg viewBox="-48 -48 96 92" className={className} {...labelled}>
        <Head wink={wink} />
        <path d="M-20 34 q20 10 40 0" fill="none" stroke="#a24a1a" strokeWidth="6" strokeLinecap="round" />
      </svg>
    )
  }
  const walking = variant === 'walk'
  return (
    <svg viewBox="0 0 130 120" className={className} {...labelled}>
      <ellipse cx="66" cy="114" rx="44" ry="5" fill={INK} opacity=".12" />
      {/* tail */}
      <g className="anim-wag">
        <path d="M104 66 q10 -8 8 -20" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <path d="M104 66 q10 -8 8 -20" fill="none" stroke={FUR} strokeWidth="2.4" strokeLinecap="round" />
        <Fluff cx={112} cy={42} r={9} fill={FUR_LIGHT} />
      </g>
      {/* back legs */}
      <g className={walking ? 'anim-trot' : ''}>
        <Fluff cx={96} cy={100} r={10} fill={FUR_DARK} />
      </g>
      {/* body */}
      <Fluff cx={78} cy={78} r={24} />
      <Fluff cx={98} cy={84} r={14} />
      {/* front legs */}
      <rect x="50" y="86" width="12" height="24" rx="6" fill={FUR} stroke={INK} strokeWidth="2.2" />
      <rect x="66" y="88" width="12" height="22" rx="6" fill={FUR} stroke={INK} strokeWidth="2.2" className={walking ? 'anim-trot' : ''} />
      <Fluff cx={56} cy={109} r={7} fill={FUR_LIGHT} />
      <Fluff cx={72} cy={109} r={7} fill={FUR_LIGHT} />
      {/* collar */}
      <path d="M38 66 q20 12 40 0" fill="none" stroke="#a24a1a" strokeWidth="6" strokeLinecap="round" />
      <circle cx="58" cy="74" r="4.5" fill="#f2be6b" stroke={INK} strokeWidth="1.8" />
      <Head x={58} y={42} s={0.9} wink={wink} />
    </svg>
  )
}
