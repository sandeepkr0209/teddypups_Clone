import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../components/common/Button'
import Eyebrow from '../components/common/Eyebrow'
import FilterChips from '../components/common/FilterChips'
import Img from '../components/common/Img'
import Pup from '../components/common/Pup'
import PuppyCard from '../components/cards/PuppyCard'
import { FILTERS, availablePuppies, filterPuppies, goneHomePuppies, titleOf, altOf } from '../data/puppies'
import { waLink } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function Puppies() {
  useDocumentTitle('Available puppies', 'Every listing shows real photos of the actual puppy. Ask us about them on WhatsApp.')
  const [params, setParams] = useSearchParams()
  const filters = { origin: params.get('origin') ?? '', breed: params.get('breed') ?? '', sex: params.get('sex') ?? '' }
  const anyFilter = Object.values(filters).some(Boolean)
  const results = filterPuppies(availablePuppies, filters)

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <section className="paw-bg relative overflow-hidden pb-10 pt-12 md:pt-16">
        <div className="container-tp grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>from Teddy's sketchbook</Eyebrow>
            <h1 className="h-hero relative mt-3 inline-block">
              Available <br />puppies
              <svg aria-hidden="true" viewBox="0 0 400 20" preserveAspectRatio="none" className="absolute -bottom-3 left-0 h-4 w-[115%] text-toffee">
                <path d="M2 12 C 100 2, 250 18, 398 6" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </h1>
            <p className="mt-8 max-w-lg text-[16px] leading-relaxed text-cocoa-soft">Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.</p>
          </div>
          <figure className="hidden flex-col items-center md:flex">
            <div className="flex h-48 w-48 items-center justify-center rounded-full border-[3px] border-cocoa bg-honey-soft">
              <Pup variant="sit" className="w-36" />
            </div>
            <figcaption className="mt-2 font-hand text-sm">self-portrait</figcaption>
          </figure>
        </div>

        <div className="container-tp mt-10">
          <div className="paper relative space-y-4 p-5 md:p-7">
            <span aria-hidden="true" className="absolute -top-3 left-8 h-6 w-24 -rotate-6 bg-honey/80" />
            <FilterChips label="where" options={FILTERS.origin} value={filters.origin} onChange={(v) => setFilter('origin', v)} />
            <FilterChips label="breed" options={FILTERS.breed} value={filters.breed} onChange={(v) => setFilter('breed', v)} />
            <FilterChips label="boy or girl" options={FILTERS.sex} value={filters.sex} onChange={(v) => setFilter('sex', v)} />
            {anyFilter && (
              <button type="button" onClick={() => setParams({}, { replace: true, preventScrollReset: true })} className="text-sm font-semibold text-toffee-deep underline underline-offset-4">
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      <section aria-live="polite" className="container-tp pb-20">
        <p className="font-hand text-lg">
          {anyFilter ? `${results.length} ${results.length === 1 ? 'puppy matches' : 'puppies match'}` : `${results.length} puppies looking for a home`}
        </p>

        {results.length ? (
          <motion.ul layout className="mt-10 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 md:gap-x-10">
            <AnimatePresence mode="popLayout">
              {results.map((p, i) => (
                <motion.li key={p.slug} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <PuppyCard puppy={p} index={i} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <div className="paper mx-auto mt-10 flex max-w-xl flex-col items-center p-8 text-center">
            <Pup variant="sit" className="w-28" />
            <p className="mt-4 font-display text-2xl font-extrabold">No puppies match just now.</p>
            <p className="mt-2 text-[15px] text-cocoa-soft">Tell us what you're hoping for and we'll let you know what's in our showroom or what we can bring in for you.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={waLink("Hi TeddyPups! I'm looking for a puppy — can you tell me what's available?")} variant="whatsapp">Ask on WhatsApp</Button>
              <Button variant="outline" onClick={() => setParams({}, { replace: true })}>Show all puppies</Button>
            </div>
          </div>
        )}
      </section>

      <section aria-labelledby="gone-strip" className="bg-honey-soft py-16">
        <div className="container-tp grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="gone-strip" className="font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[0.95]">Already <br />gone home</h2>
            <p className="mt-3 text-[15px] text-cocoa-soft">These puppies have found their families.</p>
            <Button to="/gone-home" className="mt-6">See the puppies who've gone home</Button>
          </div>
          <ul className="grid grid-cols-3 gap-6 sm:grid-cols-5">
            {goneHomePuppies.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link to={`/puppies/${p.slug}`} className="group block text-center">
                  <div className="relative mx-auto aspect-square overflow-hidden rounded-full border-2 border-cocoa">
                    <Img path={p.images[0]} kind="card" alt={altOf(p)} className="h-full w-full object-cover grayscale-[30%] transition group-hover:grayscale-0" />
                  </div>
                  <span className="mt-1 block font-hand text-[11px] text-toffee-ink">gone home ♥</span>
                  <span className="block font-display text-[15px] font-extrabold">{titleOf(p)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
