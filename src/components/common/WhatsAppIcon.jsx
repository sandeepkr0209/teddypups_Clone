// Simple speech-bubble glyph (lucide has no brand icons).
export default function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.4-2-1-.9.8a4 4 0 0 1-2-2l.8-.9-1-2z" fill="currentColor" stroke="none" />
    </svg>
  )
}
