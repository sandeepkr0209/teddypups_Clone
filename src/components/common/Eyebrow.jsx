export function Squiggle({ className = '' }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M2 7 C 20 1, 30 11, 50 6 S 80 1, 100 6 S 130 11, 150 6 S 180 1, 198 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

/** Handwritten kicker above a heading, optionally underlined with a squiggle. */
export default function Eyebrow({ children, squiggle = false, className = '' }) {
  return (
    <p className={`eyebrow relative inline-block ${className}`}>
      {children}
      {squiggle && <Squiggle className="absolute -bottom-2.5 left-0 h-2.5 w-full text-toffee" />}
    </p>
  )
}
