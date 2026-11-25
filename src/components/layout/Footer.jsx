import { Link, useLocation } from 'react-router-dom'
import { brand, contact, footerLinks, waLink } from '../../data/site'
import { Logo } from './Header'
import Pup from '../common/Pup'
import { Moon, Stars, WaveEdge } from '../common/Decor'

function Basket({ className = '' }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <Pup variant="head" className="absolute -top-14 left-1/2 w-28 -translate-x-1/2" />
      <svg viewBox="0 0 160 70" className="relative w-full">
        <path d="M6 10 H154 L140 66 H20Z" fill="#c98a4a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" />
        {[0, 1, 2, 3].map((r) => (
          <path key={r} d={`M${10 + r * 3} ${22 + r * 12} H${150 - r * 3}`} stroke="#8e5a2b" strokeWidth="2.5" strokeDasharray="10 6" />
        ))}
        <rect x="2" y="4" width="156" height="12" rx="6" fill="#b6773a" stroke="#2a170e" strokeWidth="3" />
      </svg>
    </div>
  )
}

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { pathname } = useLocation()
  return (
    <footer className="relative text-milk">
      {/* On the homepage the night scene above is already dark, so no wave is needed. */}
      {pathname !== '/' && <WaveEdge fill="#24130b" className="-mb-px" />}
      <div className="relative overflow-hidden bg-night pb-[calc(var(--bar-h)+2rem)] md:pb-10">
        <Stars count={14} className="opacity-70" />
        <Moon className="absolute right-[8%] top-6 w-10 md:right-[14%] md:w-12" />
        <div className="container-tp relative grid gap-12 pt-12 md:grid-cols-[1.4fr_1fr_1fr] md:pt-16">
          <div>
            <p className="font-display text-[2.4rem] font-extrabold leading-none text-honey-soft">Home, at last.</p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-milk/85">{brand.about}</p>
            <Basket className="mt-20 w-44" />
          </div>
          <nav aria-label="Footer">
            <p className="font-hand text-honey">Explore</p>
            <ul className="mt-4 space-y-3 text-[15px] font-medium">
              {footerLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="transition hover:text-honey">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-hand text-honey">Say hello</p>
            <ul className="mt-4 space-y-3 text-[15px] font-medium">
              <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-honey">WhatsApp {contact.phoneDisplay}</a></li>
              <li><a href={`mailto:${contact.email}`} className="hover:text-honey">{contact.email}</a></li>
              <li className="text-milk/85">{contact.address}</li>
            </ul>
            <ul className="mt-5 flex flex-wrap gap-2">
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border-2 border-milk/60 px-4 py-1.5 text-sm font-semibold hover:border-honey hover:text-honey">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-tp relative mt-12 flex flex-col items-start justify-between gap-3 border-t border-milk/15 pt-6 text-sm text-milk/75 sm:flex-row sm:items-center">
          <span className="flex items-center gap-3"><Logo size={30} /> © {YEAR} {brand.name}</span>
          <span className="font-hand text-honey">{brand.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
