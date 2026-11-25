import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Button from '../../common/Button'
import Pup from '../../common/Pup'
import { Paw } from '../../common/Decor'
import DoorCard from '../../cards/DoorCard'
import { availablePuppies } from '../../../data/puppies'
import useMediaQuery from '../../../hooks/useMediaQuery'

function Heading() {
  return (
    <div className="container-tp flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
      <div>
        <h2 className="h-section">Meet the pups</h2>
        <p className="mt-3 text-[16px] text-cocoa-soft">Real puppies, real photos, looking for their families right now.</p>
      </div>
      <Button to="/puppies">See all available puppies</Button>
    </div>
  )
}

function Floor() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 border-t-[3px] border-cocoa/70 bg-[#d98b48] md:h-20"
      style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 158px, rgb(42 23 14 / .25) 158px 160px)' }} />
  )
}

/** Each door opens as it slides past the walking mascot. */
function ScrollDoor({ puppy, index, progress, trackWidth, viewport }) {
  const doorX = 160 + index * 212 // matches gap + card width below
  const span = Math.max(trackWidth - viewport, 1)
  const start = Math.min(Math.max((doorX - viewport * 0.62) / span, 0), 0.98)
  const openness = useTransform(progress, [start, Math.min(start + 0.05, 1)], [0, 1])
  return <DoorCard puppy={puppy} index={index} openness={openness} />
}

function PinnedTrack() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [dims, setDims] = useState({ track: 3400, view: 1280 })

  useLayoutEffect(() => {
    const measure = () => setDims({ track: trackRef.current?.scrollWidth ?? 3400, view: window.innerWidth })
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -(dims.track - dims.view)])
  const pawY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])

  return (
    <section ref={sectionRef} aria-labelledby="meet-title" className="relative bg-honey-soft/70" style={{ height: `calc(100vh + ${Math.max(dims.track - dims.view, 0)}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[var(--header-h)]">
        <motion.div aria-hidden="true" style={{ y: pawY }} className="absolute left-[14%] top-[30%] flex flex-col gap-6 text-toffee/50">
          {Array.from({ length: 8 }, (_, i) => <Paw key={i} className={`h-3 w-3 ${i % 2 ? 'translate-x-3' : ''}`} />)}
        </motion.div>
        <div id="meet-title"><Heading /></div>
        <div className="relative mt-10 h-[340px] md:h-[380px]">
          <Floor />
          <motion.ul ref={trackRef} style={{ x }} className="absolute bottom-16 left-0 flex items-end gap-10 pl-[160px] pr-[30vw] md:bottom-20">
            {availablePuppies.map((p, i) => (
              <li key={p.slug}>
                <ScrollDoor puppy={p} index={i} progress={scrollYProgress} trackWidth={dims.track} viewport={dims.view} />
              </li>
            ))}
            <li className="self-center">
              <Link to="/puppies" className="font-display text-2xl font-extrabold text-toffee-deep underline decoration-2 underline-offset-8">Meet them all →</Link>
            </li>
          </motion.ul>
          <Pup variant="walk" className="anim-trot absolute bottom-3 left-[6%] z-10 w-28 md:bottom-4 md:w-32" />
        </div>
      </div>
    </section>
  )
}

function SwipeRow() {
  return (
    <section aria-labelledby="meet-title-m" className="relative bg-honey-soft/70 py-16">
      <div id="meet-title-m"><Heading /></div>
      <div className="relative mt-10">
        <Floor />
        <ul className="relative flex snap-x snap-mandatory items-end gap-6 overflow-x-auto px-5 pb-16 [scrollbar-width:none]" tabIndex={0} aria-label="Available puppies, scroll sideways">
          {availablePuppies.map((p, i) => (
            <li key={p.slug} className="snap-center"><DoorCard puppy={p} index={i} /></li>
          ))}
          <li className="shrink-0 self-center pr-5">
            <Link to="/puppies" className="font-display text-xl font-extrabold text-toffee-deep underline underline-offset-8">Meet them all →</Link>
          </li>
        </ul>
      </div>
      <p className="mt-4 text-center font-hand text-sm text-cocoa-soft">tap a door to say hello</p>
    </section>
  )
}

export default function MeetThePups() {
  const desktop = useMediaQuery('(min-width: 768px)')
  const reduce = useReducedMotion()
  return desktop && !reduce ? <PinnedTrack /> : <SwipeRow />
}
