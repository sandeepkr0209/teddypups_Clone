import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { nav, waLink, contact } from '../../data/site'
import Button from '../common/Button'
import Pup from '../common/Pup'

export default function MobileMenu({ open, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="lattice fixed inset-0 z-50 flex flex-col overflow-y-auto md:hidden"
          initial={{ clipPath: 'circle(0% at 90% 4%)' }}
          animate={{ clipPath: 'circle(150% at 90% 4%)' }}
          exit={{ clipPath: 'circle(0% at 90% 4%)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <p className="eyebrow text-lg">where to, friend?</p>
            <button ref={closeRef} type="button" onClick={onClose} className="inline-flex items-center gap-1.5 rounded-full border-2 border-cocoa bg-milk px-4 py-2 font-semibold">
              <X className="h-4 w-4" /> Close
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 px-5">
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <motion.li key={item.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05 }}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) => `block font-display text-[2.4rem] font-extrabold leading-tight ${isActive ? 'text-toffee' : 'text-cocoa'}`}
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="flex items-end justify-between gap-4 px-5 pb-8 pt-6">
            <div className="flex flex-col gap-3">
              <Button href={waLink()} variant="whatsapp">WhatsApp us</Button>
              <a href={contact.phoneHref} className="font-semibold underline decoration-toffee underline-offset-4">{contact.phoneDisplay}</a>
            </div>
            <Pup className="w-28" variant="sit" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
