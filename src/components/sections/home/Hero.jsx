import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../common/Button'
import Eyebrow from '../../common/Eyebrow'
import Img from '../../common/Img'
import Pup from '../../common/Pup'
import { brand, waLink } from '../../../data/site'
import { getPuppy, altOf } from '../../../data/puppies'

// Same seven pups, in the same order, as the reference hero; Teddy sits in the middle.
const WINDOW_SLUGS = ['korean-teacup-pomeranian', 'maltipoo-max-male', 'korean-teacup-maltipoo-female', null, 'pomeranian-female', 'toy-poodle-male-female', 'maltipoo-female-2', 'korean-teacup-pomeranian-1']
const HEIGHTS = [118, 170, 140, 0, 150, 182, 160, 120]

export default function Hero() {
  const pups = WINDOW_SLUGS.map((s) => (s ? getPuppy(s) : null))
  const [active, setActive] = useState(1)

  useEffect(() => {
    const id = setInterval(() => setActive((i) => { let n = (i + 1) % pups.length; if (!pups[n]) n = (n + 1) % pups.length; return n }), 2600)
    return () => clearInterval(id)
  }, [pups.length]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_42%,#fbe3b4_0%,rgba(251,227,180,0.35)_45%,transparent_75%)]" />
      <div className="container-tp relative flex flex-col items-center pt-10 text-center md:pt-14">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Eyebrow squiggle className="text-lg">{brand.tagline}</Eyebrow>
        </motion.div>
        <motion.h1
          id="hero-title"
          className="h-hero mt-6 max-w-[11ch] md:max-w-none"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          Premium teacup <br className="hidden md:block" />
          puppies in Dubai
        </motion.h1>
        <motion.p className="mt-5 max-w-xl text-[17px] leading-relaxed text-cocoa-soft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
        </motion.p>
        <motion.div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Button to="/puppies" className="w-full max-w-[290px] sm:w-auto">View available puppies</Button>
          <Button href={waLink()} variant="outline" className="w-full max-w-[290px] sm:w-auto">Enquire on WhatsApp</Button>
        </motion.div>
      </div>

      {/* Arched windows on the waffle ledge */}
      <div className="relative mt-12 md:mt-14">
        <div className="relative z-10 flex items-end justify-center gap-1.5 px-2 sm:gap-3">
          {pups.map((p, i) =>
            p ? (
              <Link
                key={p.slug}
                to={`/puppies/${p.slug}`}
                className="group relative shrink-0"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                style={{ width: 'clamp(52px, 11vw, 132px)' }}
              >
                <motion.span
                  className="block overflow-hidden rounded-t-full border-2 border-cocoa bg-honey-soft"
                  style={{ height: `clamp(${HEIGHTS[i] * 0.55}px, ${HEIGHTS[i] / 11}vw, ${HEIGHTS[i]}px)` }}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 160, damping: 16 }}
                >
                  <Img path={p.images[0]} kind="card" alt={altOf(p)} eager className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                </motion.span>
                <span
                  className={`pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 -rotate-6 whitespace-nowrap rounded-full border-2 border-cocoa bg-milk px-3 py-0.5 font-hand text-xs shadow-sm transition duration-300 sm:block ${active === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
                  {p.name || p.breed}
                </span>
              </Link>
            ) : (
              <div key="teddy" className="relative shrink-0" style={{ width: 'clamp(92px, 17vw, 196px)' }}>
                <Pup variant="head" className="w-full translate-y-[8%]" title="Teddy, the TeddyPups mascot" />
              </div>
            ),
          )}
        </div>
        {/* scalloped ledge */}
        <div aria-hidden="true" className="relative -mt-2">
          <div
            className="h-5"
            style={{ background: 'radial-gradient(circle at 24px 20px, #fbe6c2 19px, #2a170e 20px, #2a170e 21.5px, transparent 22px) 0 0 / 48px 20px repeat-x' }}
          />
          <div className="lattice h-16 border-t-0 md:h-20" />
        </div>
      </div>
    </section>
  )
}
