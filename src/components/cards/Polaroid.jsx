import { motion } from 'framer-motion'
import Img from '../common/Img'

const TILTS = [-4, 3, -2, 5, -5, 2, -3, 4]
const TAPES = ['bg-sky/80', 'bg-blush/90', 'bg-honey/80']

/** Taped (or pinned) instant photo with an optional handwritten caption. */
export default function Polaroid({ photo, index = 0, pin = false, className = '' }) {
  const tilt = TILTS[index % TILTS.length]
  return (
    <motion.figure
      className={`relative bg-milk p-2.5 pb-3 shadow-[0_14px_30px_-14px_rgb(42_23_14/0.55)] ${className}`}
      style={{ rotate: tilt }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      {pin ? (
        <span aria-hidden="true" className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-cocoa bg-toffee" />
      ) : (
        <span aria-hidden="true" className={`absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-3deg] ${TAPES[index % TAPES.length]}`} />
      )}
      <Img path={photo.src} kind="family" alt={photo.caption ? `${photo.caption.replace(/[^\p{L}\p{N}\s]/gu, '').trim()} — a happy TeddyPups family` : 'A happy TeddyPups family with their new puppy'} className="aspect-[9/10] w-full object-cover" />
      {photo.caption && <figcaption className="mt-2 text-center font-hand text-[14px] leading-snug text-cocoa">{photo.caption}</figcaption>}
    </motion.figure>
  )
}
