import { useId, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import Button from '../components/common/Button'
import Pup from '../components/common/Pup'
import { faqs, waLink } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'

const PINS = ['bg-honey', 'bg-sky-deep', 'bg-toffee', 'bg-blush']

function Note({ item, index, open, onToggle }) {
  const id = useId()
  return (
    <li className="relative" style={{ rotate: `${[-0.6, 0.8, -0.3, 0.5][index % 4]}deg`, marginLeft: index % 2 ? '1.25rem' : 0 }}>
      <span aria-hidden="true" className={`absolute -top-2 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-cocoa ${PINS[index % PINS.length]}`} />
      <div className="rounded-md bg-[#fdf6e7] shadow-[3px_4px_0_rgb(42_23_14/0.35)]">
        <h2>
          <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className="flex w-full items-center justify-between gap-4 p-4 text-left font-display text-[17px] font-extrabold leading-snug md:p-5">
            {item.q}
            <ChevronDown className={`h-5 w-5 shrink-0 text-toffee-deep transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </h2>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div id={id} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
              <p className="px-4 pb-5 text-[15px] leading-relaxed text-cocoa-soft md:px-5">{item.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  )
}

export default function Faq() {
  useDocumentTitle('Questions & answers', 'Answers to common questions about TeddyPups puppies, imports, health checks and delivery.')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(0)
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? faqs.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q)) : faqs
  }, [query])

  return (
    <div className="bg-gradient-to-b from-toffee-ink to-[#5c2c12] pb-24 pt-12 text-milk md:pt-16">
      <div className="container-tp">
        <h1 className="h-hero">Questions & answers</h1>
        <p className="mt-5 max-w-md text-[16px] leading-relaxed text-milk/85">Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.</p>
      </div>
      <div className="container-tp mt-12 grid items-start gap-10 md:grid-cols-[0.7fr_1.3fr]">
        <aside className="md:sticky md:top-28">
          <label htmlFor="faq-search" className="font-hand text-honey">sniff out a question</label>
          <div className="relative mt-3">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa-soft" aria-hidden="true" />
            <input id="faq-search" type="search" value={query} onChange={(e) => { setQuery(e.target.value); setOpen(0) }} placeholder="delivery, Korea, vaccinated…" className="w-full rounded-full border-2 border-cocoa bg-milk py-3 pl-11 pr-4 text-[15px] text-cocoa outline-none placeholder:text-cocoa-soft/60 focus:ring-4 focus:ring-honey/60" />
          </div>
          <p className="mt-3 text-sm text-milk/80" aria-live="polite">{results.length} {results.length === 1 ? 'note' : 'notes'} on the board</p>
          <div className="relative mt-10 hidden w-32 md:block">
            <span aria-hidden="true" className="absolute -right-4 -top-8 flex h-9 w-9 items-center justify-center rounded-full border-2 border-cocoa bg-milk font-display font-extrabold text-cocoa">?</span>
            <Pup variant="sit" />
          </div>
          <Button href={waLink('Hi TeddyPups! I have a question:')} variant="whatsapp" className="mt-6">Ask your own question</Button>
        </aside>

        <div className="rounded-2xl border-[6px] border-[#5a3320] bg-[#b98552] p-5 shadow-[inset_0_0_40px_rgb(0_0_0/0.25)] md:p-8" style={{ backgroundImage: 'radial-gradient(rgb(0 0 0 / .12) 1px, transparent 1.5px)', backgroundSize: '9px 9px' }}>
          {results.length ? (
            <ul className="space-y-6 text-cocoa">
              {results.map((f, i) => <Note key={f.q} item={f} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
            </ul>
          ) : (
            <div className="rounded-md bg-[#fdf6e7] p-6 text-center text-cocoa">
              <p className="font-display text-xl font-extrabold">No notes match “{query}”.</p>
              <p className="mt-2 text-[15px] text-cocoa-soft">Ask us directly — we reply on WhatsApp around the clock.</p>
              <Button href={waLink(`Hi TeddyPups! I have a question about ${query}.`)} variant="whatsapp" size="sm" className="mt-4">Ask on WhatsApp</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
