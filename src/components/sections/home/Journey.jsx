import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { SendHorizontal } from 'lucide-react'
import Button from '../../common/Button'
import Img from '../../common/Img'
import Pup from '../../common/Pup'
import { Logo } from '../../layout/Header'
import { DEFAULT_WA_TEXT, journeySteps, waLink, brand } from '../../../data/site'
import { siteImages, videos } from '../../../data/media'
import { ORIGIN } from '../../../utils/assetKey'
import { FILTERS } from '../../../data/puppies'

function Step({ step, index, active, onActive }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => { if (inView) onActive(index) }, [inView, index, onActive])
  return (
    <li ref={ref} className={`flex gap-5 py-10 transition-opacity duration-500 md:min-h-[46vh] md:py-0 ${active ? 'opacity-100' : 'md:opacity-40'}`}>
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-display text-xl font-extrabold transition-colors ${active ? 'border-cocoa bg-milk' : 'border-cocoa/40'}`}>{index + 1}</span>
      <div>
        <h3 className="font-display text-[26px] font-extrabold leading-tight">{step.title}</h3>
        <p className="mt-2 max-w-sm text-[16px] leading-relaxed text-cocoa-soft">{step.body}</p>
      </div>
    </li>
  )
}

const bubble = { initial: { opacity: 0, y: 12, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0 }, transition: { type: 'spring', stiffness: 260, damping: 22 } }

function Phone({ stage }) {
  const media = [siteImages.showroom, siteImages.showroomClose, siteImages.showroomUp, siteImages.showroomHello]
  return (
    <div className="mx-auto w-full max-w-[330px] rotate-[2deg] rounded-[2.6rem] border-[3px] border-cocoa bg-cocoa p-2.5 shadow-[10px_12px_0_rgb(42_23_14/0.25)]">
      <div className="overflow-hidden rounded-[2rem] bg-milk">
        <div className="flex items-center gap-3 border-b-2 border-cocoa/10 bg-milk px-4 py-3">
          <Logo size={34} />
          <div className="leading-tight">
            <p className="text-[15px] font-bold">{brand.name}</p>
            <p className="text-xs text-cocoa-soft">{stage === 1 ? 'typing…' : 'online'}</p>
          </div>
        </div>
        <div className="paw-bg flex h-[400px] flex-col justify-end gap-2 bg-honey-soft/50 p-3">
          <AnimatePresence>
            <motion.p key="hi" {...bubble} className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm border-2 border-cocoa bg-honey px-3 py-2 text-[13px] leading-snug">
              {DEFAULT_WA_TEXT}
            </motion.p>
            {stage >= 1 && (
              <motion.div key="chips" {...bubble} className="flex max-w-[88%] flex-wrap gap-1.5 rounded-2xl rounded-bl-sm border-2 border-cocoa/20 bg-milk p-2">
                {FILTERS.breed.map((b) => (
                  <Link key={b.value} to={`/puppies?breed=${b.value}`} className="rounded-full border-2 border-cocoa/60 px-2.5 py-0.5 text-xs font-semibold hover:bg-honey-soft">{b.label}</Link>
                ))}
              </motion.div>
            )}
            {stage === 1 && (
              <motion.span key="typing" {...bubble} className="flex w-fit gap-1 rounded-full border-2 border-cocoa bg-milk px-3 py-2" aria-label="typing">
                {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-cocoa" style={{ animation: `typing 1s ${i * 0.15}s infinite` }} />)}
              </motion.span>
            )}
            {stage >= 2 && (
              <motion.div key="media" {...bubble} className="grid max-w-[88%] grid-cols-3 gap-1 rounded-2xl rounded-bl-sm border-2 border-cocoa/20 bg-milk p-1.5">
                {media.slice(0, 2).map((m) => <Img key={m} path={m} kind="thumb" alt="Apricot teddy bear puppy in the TeddyPups showroom" className="aspect-square w-full rounded-lg object-cover" />)}
                <video className="aspect-square w-full rounded-lg bg-cocoa object-cover" src={`${ORIGIN}${videos.showroom}`} muted loop playsInline autoPlay preload="none" aria-label="Video of the showroom puppy" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 border-t-2 border-cocoa/10 px-4 py-3 text-sm text-cocoa-soft hover:text-cocoa">
          Say hello on WhatsApp
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-wa text-milk"><SendHorizontal className="h-4 w-4" /></span>
        </a>
      </div>
    </div>
  )
}

export default function Journey() {
  const [active, setActive] = useState(0)
  return (
    <section aria-labelledby="journey-title" className="relative bg-honey/60 py-20 md:py-28">
      <div className="container-tp grid gap-12 md:grid-cols-2">
        <div>
          <h2 id="journey-title" className="h-section">Your puppy <br />journey</h2>
          <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-cocoa-soft">A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.</p>
          <ol className="mt-6">
            {journeySteps.map((s, i) => <Step key={s.title} step={s} index={i} active={active === i} onActive={setActive} />)}
          </ol>
          <Button to="/how-it-works" variant="outline">How it works</Button>
        </div>
        <div className="relative md:sticky md:top-[calc(var(--header-h)+3rem)] md:h-fit">
          <Phone stage={active} />
          <Pup variant="sit" className="absolute -bottom-6 -left-4 w-24 md:-left-20 md:w-28" />
        </div>
      </div>
    </section>
  )
}
