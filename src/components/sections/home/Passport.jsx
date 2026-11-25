import { motion } from 'framer-motion'
import { HeartPulse, Plane, MessageCircleMore, Globe2 } from 'lucide-react'
import Eyebrow from '../../common/Eyebrow'
import Pup from '../../common/Pup'
import { Skyline } from '../../common/Decor'
import { trustPoints } from '../../../data/site'

const ICONS = [HeartPulse, Plane, MessageCircleMore, Globe2]
const STAMP_STYLE = {
  circle: 'rounded-full border-toffee text-toffee-deep w-32 h-32 -rotate-6',
  square: 'rounded-lg border-wa text-wa w-32 h-28 rotate-3',
  oval: 'rounded-[50%] border-cocoa-soft text-cocoa-soft w-36 h-24 rotate-2',
  scallop: 'rounded-full border-dashed border-toffee text-toffee-deep w-32 h-32 -rotate-3',
}

export function Stamp({ point, index }) {
  const Icon = ICONS[index]
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, scale: 1.6, rotate: -14 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: index * 0.12 }}
    >
      <div className={`flex flex-col items-center justify-center gap-1 border-[3px] px-3 mix-blend-multiply ${STAMP_STYLE[point.shape]}`} style={{ outline: '2px solid currentColor', outlineOffset: 3 }}>
        <Icon className="h-5 w-5" aria-hidden="true" />
        <span className="font-display text-[14px] font-extrabold leading-tight">{point.stamp}</span>
      </div>
      <p className="mt-4 max-w-[15rem] text-[14px] leading-relaxed text-cocoa-soft">{point.body}</p>
    </motion.div>
  )
}

export default function Passport() {
  return (
    <section aria-labelledby="trust-title" className="relative overflow-hidden bg-gradient-to-b from-honey/60 via-[#e9a256] to-[#c96a2e] pb-36 pt-14">
      <div className="container-tp relative z-10">
        <div className="relative grid rounded-[1.6rem] border-[3px] border-cocoa bg-[#9a4d20] p-3 shadow-[0_20px_0_-6px_rgb(42_23_14/0.45)] md:grid-cols-2">
          <div className="paw-bg relative rounded-l-2xl rounded-r-2xl bg-[#fbf2df] p-8 md:rounded-r-none md:border-r-2 md:border-cocoa/20 md:p-10">
            <Eyebrow>puppy passport</Eyebrow>
            <h2 id="trust-title" className="mt-2 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[0.95]">Why families <br />trust TeddyPups</h2>
            <Pup variant="sit" className="absolute bottom-4 right-4 hidden w-24 md:block" />
          </div>
          <div className="paw-bg mt-2 grid grid-cols-1 gap-10 rounded-2xl bg-[#fbf2df] p-8 sm:grid-cols-2 md:mt-0 md:rounded-l-none md:p-10">
            {trustPoints.map((p, i) => <Stamp key={p.stamp} point={p} index={i} />)}
          </div>
        </div>
      </div>
      {/* dusk skyline with setting sun */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40">
        <div className="absolute bottom-6 left-[68%] h-28 w-28 rounded-full bg-[#ffd27a] shadow-[0_0_80px_30px_rgb(255_200_110/0.5)]" />
        <Skyline className="absolute bottom-0 left-0 h-36 w-full text-[#7a3815]" stroke="#7a3815" />
        <div className="absolute inset-x-0 bottom-0 h-4 bg-[#7a3815]" />
      </div>
    </section>
  )
}
