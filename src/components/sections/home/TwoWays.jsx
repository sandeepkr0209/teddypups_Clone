import { motion } from 'framer-motion'
import Button from '../../common/Button'
import Img from '../../common/Img'
import Pup from '../../common/Pup'
import { Skyline } from '../../common/Decor'
import { siteImages } from '../../../data/media'

function SignArrow({ children, dir }) {
  const left = dir === 'left'
  return (
    <div
      className={`relative z-10 flex h-12 items-center border-[2.5px] border-cocoa bg-[#e0a05c] px-5 font-display text-[15px] font-extrabold sm:text-lg md:h-14 md:px-7 ${left ? 'pl-8 md:pl-10' : 'pr-8 md:pr-10'}`}
      style={{ clipPath: left ? 'polygon(14% 0,100% 0,100% 100%,14% 100%,0 50%)' : 'polygon(0 0,86% 0,100% 50%,86% 100%,0 100%)', boxShadow: 'inset 0 -4px 0 rgb(0 0 0 / .12)' }}
    >
      {children}
    </div>
  )
}

function Shop() {
  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <Skyline className="absolute -bottom-1 left-1/2 w-[190%] -translate-x-1/2 text-cocoa/35" />
      <div className="relative mx-auto w-[62%]">
        <div aria-hidden="true" className="h-7 rounded-t-md border-[2.5px] border-cocoa" style={{ background: 'repeating-linear-gradient(90deg,#a24a1a 0 14px,#fffdf8 14px 28px)' }} />
        <figure className="border-x-[2.5px] border-b-[2.5px] border-cocoa bg-milk p-2">
          <Img path={siteImages.showroom} kind="feature" alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom" className="aspect-[5/6] w-full object-cover" />
          <figcaption className="mt-1 text-center font-hand text-[13px]">In our showroom</figcaption>
        </figure>
      </div>
    </div>
  )
}

function Flight() {
  return (
    <div className="relative mx-auto h-[220px] w-full max-w-[320px]" aria-hidden="true">
      <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full">
        <path id="route" d="M30 150 C 90 40, 220 30, 290 120" fill="none" stroke="#a24a1a" strokeWidth="2.5" strokeDasharray="3 8" strokeLinecap="round" />
        <circle cx="30" cy="150" r="5" fill="#a24a1a" /><circle cx="290" cy="120" r="5" fill="#a24a1a" />
        <text x="18" y="176" className="fill-cocoa-soft font-hand text-[13px]">Korea</text>
        <text x="270" y="146" className="fill-cocoa-soft font-hand text-[13px]">Dubai</text>
      </svg>
      <motion.div
        className="absolute left-0 top-0"
        style={{ offsetPath: 'path("M30 150 C 90 40, 220 30, 290 120")', offsetRotate: 'auto' }}
        initial={{ offsetDistance: '0%' }}
        whileInView={{ offsetDistance: '62%' }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 90 40" className="-ml-11 -mt-5 w-24">
          <path d="M8 20 Q8 12 20 12 H70 Q86 14 86 20 Q86 26 70 28 H20 Q8 28 8 20Z" fill="#fffdf8" stroke="#2a170e" strokeWidth="2.5" />
          <path d="M40 13 L28 0 H38 L56 13Z M40 27 L28 40 H38 L56 27Z" fill="#c2622b" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M14 13 L6 4 H12 L22 13Z" fill="#c2622b" stroke="#2a170e" strokeWidth="2" />
          <circle cx="66" cy="20" r="6" fill="#f2be6b" stroke="#2a170e" strokeWidth="2" />
        </svg>
      </motion.div>
    </div>
  )
}

export default function TwoWays() {
  return (
    <section aria-labelledby="ways-title" className="relative overflow-hidden bg-gradient-to-b from-honey-soft/70 to-honey/60 pb-24 pt-20">
      <h2 id="ways-title" className="h-section text-center">Two ways to <br />meet your puppy</h2>

      <div className="container-tp relative mt-10">
        {/* signpost */}
        <div aria-hidden="true" className="absolute bottom-[-6rem] left-1/2 top-0 hidden w-4 -translate-x-1/2 rounded-t-md border-[2.5px] border-cocoa bg-[#b46a34] md:block" />
        <div className="relative flex justify-center" aria-hidden="true">
          <div className="flex -rotate-2 gap-1"><SignArrow dir="left">Puppies in Dubai</SignArrow><SignArrow dir="right">Imported for you</SignArrow></div>
        </div>

        <div className="mt-10 grid gap-16 md:grid-cols-2 md:gap-24">
          <article className="flex flex-col items-center text-center md:items-end md:text-right">
            <h3 className="sr-only">Puppies in Dubai</h3>
            <Shop />
            <p className="mt-8 max-w-sm text-[16px] leading-relaxed text-cocoa-soft">See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
            <Button to="/puppies?origin=local" className="mt-6">Meet local puppies</Button>
          </article>
          <article className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="sr-only">Imported for you</h3>
            <Flight />
            <p className="mt-8 max-w-sm text-[16px] leading-relaxed text-cocoa-soft">Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.</p>
            <Button to="/puppies?origin=imported" className="mt-6">See imported puppies</Button>
          </article>
        </div>
      </div>
      <Pup variant="walk" className="anim-trot absolute bottom-2 left-1/2 hidden w-24 -translate-x-1/2 md:block" />
    </section>
  )
}
