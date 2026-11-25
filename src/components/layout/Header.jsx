import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, waLink, brand } from '../../data/site'
import Button from '../common/Button'
import Img from '../common/Img'
import { Paw } from '../common/Decor'
import MobileMenu from './MobileMenu'

export function Logo({ size = 48 }) {
  return (
    <span className="relative inline-block overflow-hidden rounded-full border-2 border-cocoa/10 bg-honey-soft" style={{ width: size, height: size }}>
      <Img path="/brand/logo.png" kind={128} alt="" className="h-full w-full object-cover" eager />
    </span>
  )
}

/** Row of semicircles that hangs under the header, like a scalloped awning. */
function Scallops() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-full h-3.5"
      style={{
        background: 'radial-gradient(circle at 14px 0, var(--color-milk) 13px, transparent 14px) 0 0 / 28px 14px repeat-x',
        filter: 'drop-shadow(0 2px 0 rgb(42 23 14 / 0.08))',
      }}
    />
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-milk">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-milk">
        Skip to content
      </a>
      <div className="container-tp flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3" aria-label={`${brand.name} home`}>
          <Logo />
          <span className="font-display text-xl font-extrabold md:hidden">{brand.short}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-3">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `relative block px-2 py-2 text-[15px] font-medium transition-colors hover:text-toffee ${isActive ? 'text-toffee' : 'text-cocoa'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && <Paw className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 text-toffee" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Button href={waLink()} variant="whatsapp" size="sm" className="!px-5 !py-2.5 !text-[15px]">
            WhatsApp us
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="inline-flex items-center gap-2 rounded-full border-2 border-cocoa bg-milk px-4 py-2 text-[15px] font-semibold md:hidden"
        >
          <Paw className="h-4 w-4" /> Menu
        </button>
      </div>
      <Scallops />
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
