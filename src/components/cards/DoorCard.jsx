import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Img from '../common/Img'
import { altOf, metaLine, titleOf } from '../../data/puppies'

const DOOR_COLOURS = ['#a24a1a', '#5a3320', '#d27a35']

/**
 * Arched door with the puppy waiting behind it. `openness` is an optional MotionValue in [0,1]
 * driven by scroll; without it the door opens on hover/focus.
 */
export default function DoorCard({ puppy, index = 0, openness }) {
  const closed = useMotionValue(0)
  const rotate = useTransform(openness ?? closed, [0, 1], [0, -112])
  const colour = DOOR_COLOURS[index % DOOR_COLOURS.length]
  const meta = metaLine(puppy, ', ') + (puppy.hasVideo ? ', with video' : '')

  return (
    <Link to={`/puppies/${puppy.slug}`} className="group flex w-[150px] shrink-0 flex-col items-center text-center md:w-[172px]" aria-label={`${titleOf(puppy)} — ${meta}. Available`}>
      <h3 className="font-display text-[19px] font-extrabold leading-tight">{titleOf(puppy)}</h3>
      <p className="mt-1 line-clamp-2 min-h-[2.6em] text-[13px] leading-snug text-cocoa-soft">{meta}</p>
      <div className="relative mt-3 h-[178px] w-[124px] md:h-[200px] md:w-[140px]" style={{ perspective: 700 }}>
        {/* frame + puppy behind the door */}
        <div className="absolute inset-0 overflow-hidden rounded-t-full border-[3px] border-cocoa bg-cocoa">
          <Img path={puppy.images[0]} kind="card" alt={altOf(puppy)} className="h-full w-full object-cover" />
        </div>
        {/* the door itself */}
        <motion.div
          aria-hidden="true"
          className={`absolute inset-[3px] origin-left rounded-t-full border-2 border-cocoa/60 ${openness ? '' : 'transition-transform duration-700 ease-[var(--ease-silk)] group-hover:[transform:rotateY(-112deg)] group-focus-visible:[transform:rotateY(-112deg)]'}`}
          style={{ background: colour, ...(openness ? { rotateY: rotate } : {}), transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
        >
          <span className="absolute inset-x-[14%] top-[16%] h-[30%] rounded-t-full border-2 border-black/20" />
          <span className="absolute inset-x-[14%] bottom-[10%] h-[34%] rounded-md border-2 border-black/20" />
          <span className="absolute right-[12%] top-[56%] h-3 w-3 rounded-full border-2 border-cocoa bg-honey" />
        </motion.div>
        <span className="absolute -right-4 top-6 rotate-[8deg] rounded-full border-2 border-cocoa bg-milk px-2.5 py-0.5 font-hand text-[12px] shadow-[2px_2px_0_#2a170e]">
          Available
        </span>
      </div>
    </Link>
  )
}
