import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Img from '../common/Img'
import { altOf, metaLine, titleOf } from '../../data/puppies'

/** Hand-drawn circle around the photo; it "draws itself" when it scrolls into view. */
function SketchRing() {
  return (
    <svg viewBox="0 0 200 200" className="pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]" aria-hidden="true">
      <motion.path
        d="M100 8 C 158 6, 194 46, 192 102 C 190 160, 148 194, 96 192 C 42 190, 6 152, 8 98 C 10 52, 44 14, 108 12"
        fill="none" stroke="#2a170e" strokeWidth="2.4" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}

export default function PuppyCard({ puppy, index = 0 }) {
  const offset = ['', 'md:mt-10', 'md:mt-4'][index % 3]
  return (
    <Link to={`/puppies/${puppy.slug}`} className={`group block text-center ${offset}`}>
      <div className="relative mx-auto aspect-square w-[78%]">
        <SketchRing />
        <div className="h-full w-full overflow-hidden rounded-full bg-honey-soft">
          <Img path={puppy.images[0]} kind="card" alt={altOf(puppy)} className="h-full w-full object-cover transition duration-700 ease-[var(--ease-silk)] group-hover:scale-110" />
        </div>
        {puppy.status === 'available' ? (
          <span className="absolute right-0 top-2 rotate-6 rounded-full border-2 border-cocoa bg-milk px-2.5 py-0.5 font-hand text-xs shadow-[2px_2px_0_#2a170e]">Available</span>
        ) : (
          <span className="absolute right-0 top-2 rotate-6 rounded-full bg-toffee-deep px-2.5 py-0.5 font-hand text-xs text-milk">gone home ♥</span>
        )}
        {puppy.hasVideo && (
          <span className="absolute bottom-3 left-1 inline-flex items-center gap-1 rounded-full bg-cocoa px-2 py-0.5 text-[11px] font-semibold text-milk">
            <Play className="h-3 w-3 fill-current" aria-hidden="true" /> video
          </span>
        )}
      </div>
      <h3 className="mt-6 font-display text-[19px] font-extrabold leading-tight transition-colors group-hover:text-toffee-deep">{titleOf(puppy)}</h3>
      <p className="mt-1 text-[13px] text-cocoa-soft">{metaLine(puppy)}</p>
    </Link>
  )
}
