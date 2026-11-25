import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Img from './Img'
import { ORIGIN } from '../../utils/assetKey'

/**
 * Photo gallery with arrows, counter, swipe and keyboard support.
 * Slides whose image is a video poster (…f000.jpg) play the puppy's video when known.
 */
export default function Gallery({ images, video, alt }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const n = images.length
  const go = (d) => { setDir(d); setI((x) => (x + d + n) % n) }
  const current = images[i]
  const isVideo = video && /f00\d\.jpg$/.test(current)

  return (
    <div
      className="relative mb-3 mr-3"
      role="region"
      aria-roledescription="carousel"
      aria-label={`Photos of ${alt}`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1) }}
    >
      {/* stacked "paper" behind the photo */}
      <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.6rem] border-2 border-cocoa bg-milk" />
      <div aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[1.6rem] border-2 border-cocoa bg-milk" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border-2 border-cocoa bg-honey-soft">
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={i}
            className="absolute inset-0"
            custom={dir}
            initial={{ x: `${dir * 100}%` }}
            animate={{ x: 0 }}
            exit={{ x: `${dir * -100}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag={n > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1) }}
          >
            {isVideo ? (
              <video className="h-full w-full object-cover" src={`${ORIGIN}${video}`} controls playsInline preload="metadata" poster={`${ORIGIN}/_next/image?url=${encodeURIComponent(current)}&w=828&q=75`} aria-label={`Video of ${alt}`} />
            ) : (
              <Img path={current} kind="gallery" alt={`${alt} — photo ${i + 1} of ${n}`} eager={i === 0} className="h-full w-full object-cover" draggable={false} />
            )}
          </motion.div>
        </AnimatePresence>
        {video && !isVideo && (
          <button type="button" onClick={() => { const v = images.findIndex((x) => /f00\d\.jpg$/.test(x)); if (v >= 0) { setDir(1); setI(v) } }} className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cocoa/80 text-milk" aria-label="Play video">
            <Play className="h-5 w-5 fill-current" />
          </button>
        )}
      </div>
      {n > 1 && (
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cocoa bg-milk hover:bg-honey-soft"><ChevronLeft className="h-5 w-5" /></button>
          <span className="rounded-full bg-milk/90 px-3 py-1 text-xs font-semibold" aria-live="polite">{i + 1} / {n}</span>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cocoa bg-milk hover:bg-honey-soft"><ChevronRight className="h-5 w-5" /></button>
        </div>
      )}
    </div>
  )
}
