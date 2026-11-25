import { Link, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import Button from '../components/common/Button'
import Gallery from '../components/common/Gallery'
import Img from '../components/common/Img'
import Pup from '../components/common/Pup'
import StepsRow from '../components/common/StepsRow'
import EnquiryForm from '../components/forms/EnquiryForm'
import NotFound from './NotFound'
import { availablePuppies, goneHomePuppies, getPuppy, titleOf, altOf, enquiryText, isLocal, contactLabel } from '../data/puppies'
import { importSteps, localSteps, puppyPromise, waLink } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'

function Chapter({ n, children }) {
  return (
    <p className="flex items-center gap-3 font-hand text-[17px] text-toffee-ink">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-cocoa font-display text-sm font-extrabold text-cocoa">{n}</span>
      {children}
    </p>
  )
}

function Facts({ p }) {
  const rows = [['Breed', p.breed], ['Boy or girl', p.sex], ['Age', p.age], ...(p.colour ? [['Colour', p.colour]] : []), ['Where', p.where]]
  return (
    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt className="font-hand text-[13px] text-toffee-ink">{k}</dt>
          <dd className="text-[15px] font-semibold">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function Neighbour({ p, dir }) {
  const next = dir === 'next'
  return (
    <Link to={`/puppies/${p.slug}`} className={`paper group flex items-center gap-4 p-4 transition hover:-translate-y-1 ${next ? 'flex-row-reverse text-right' : ''}`}>
      <span className="h-16 w-14 shrink-0 overflow-hidden rounded-t-full border-2 border-cocoa">
        <Img path={p.images[0]} kind="thumb" alt="" className="h-full w-full object-cover" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-cocoa-soft">{next ? 'Next pup' : 'Previous pup'}</span>
        <span className="block truncate font-display text-lg font-extrabold group-hover:text-toffee-deep">{titleOf(p)}</span>
      </span>
    </Link>
  )
}

export default function PuppyDetail() {
  const { slug } = useParams()
  const p = getPuppy(slug)
  useDocumentTitle(p ? `${p.name ? `${p.name}, ` : ''}${p.breed} puppy` : 'Page not found')
  if (!p) return <NotFound />

  const gone = p.status === 'gone'
  const list = gone ? goneHomePuppies : availablePuppies
  const idx = list.indexOf(p)
  const prev = list[(idx - 1 + list.length) % list.length]
  const next = list[(idx + 1) % list.length]
  const callName = p.name || 'this puppy'
  const wa = waLink(enquiryText(p))

  return (
    <article className="relative pb-20 pt-8">
      <span aria-hidden="true" className="absolute bottom-40 left-3 top-6 hidden w-2.5 rounded-full bg-toffee-deep lg:block" />
      <div className="container-tp">
        <nav aria-label="Breadcrumb" className="text-sm">
          <Link to={gone ? '/gone-home' : '/puppies'} className="font-semibold text-toffee-deep underline underline-offset-4">{gone ? 'Gone home' : 'Available puppies'}</Link>
          <span className="text-cocoa-soft"> / {titleOf(p)}</span>
        </nav>

        <section className="mt-5">
          <Chapter n={1}>hello, it's me</Chapter>
          <div className="mt-6 grid items-start gap-10 md:grid-cols-[1.25fr_1fr] lg:gap-14">
            <Gallery images={p.images} video={p.video} alt={altOf(p)} />
            <div className="paper relative p-6 md:mt-10 md:p-8">
              <Pup variant="head" className="absolute -top-12 right-6 w-20" />
              {gone ? (
                <span className="inline-block rounded-full bg-toffee-deep px-3 py-1 font-hand text-sm text-milk">gone home ♥</span>
              ) : (
                <span className="inline-block rounded-full border-2 border-cocoa bg-honey-soft px-3 py-1 font-hand text-sm">Available</span>
              )}
              <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.4rem)] font-extrabold leading-[0.95]">{titleOf(p)}</h1>
              {p.name && <p className="mt-1 text-toffee-ink">{p.breed}</p>}
              <Facts p={p} />
              {!gone && (
                <div className="mt-7 flex flex-col gap-3">
                  <Button href={wa} variant="whatsapp">Ask about {callName} on WhatsApp</Button>
                  <Button href="#enquire" variant="outline">Send an enquiry</Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 md:grid-cols-[1fr_1fr]">
          <div>
            <Chapter n={2}>what comes with {callName}</Chapter>
          </div>
          <div className="paper p-6 md:p-8">
            <h2 className="font-display text-2xl font-extrabold">Every Teddy Pup comes</h2>
            <ul className="mt-4 space-y-3">
              {puppyPromise.map((item) => (
                <li key={item} className="flex gap-3 text-[15px]"><Check className="mt-0.5 h-5 w-5 shrink-0 text-wa" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {gone ? (
          <section className="paper mt-20 flex flex-col items-center gap-5 p-8 text-center md:flex-row md:text-left">
            <Pup variant="sit" className="w-24 shrink-0" />
            <div className="flex-1">
              <h2 className="font-display text-3xl font-extrabold">Looking for a puppy like this?</h2>
              <p className="mt-2 text-[15px] text-cocoa-soft">{callName === 'this puppy' ? 'This puppy has' : `${callName} has`} already joined a loving family. Tell us what you're hoping for and we'll help you find your match.</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button href={waLink(`Hi TeddyPups! I'm looking for a puppy like ${p.name || `the ${p.breed}`} (${p.breed}).`)} variant="whatsapp">Ask on WhatsApp</Button>
              <Button to="/puppies" variant="outline">See available puppies</Button>
            </div>
          </section>
        ) : (
          <>
            <section className="mt-20">
              <Chapter n={3}>the way home</Chapter>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold">{isLocal(p) ? 'Coming home in Dubai' : 'Coming home from abroad'}</h2>
              <div className="mt-8"><StepsRow steps={isLocal(p) ? localSteps : importSteps} /></div>
            </section>

            <section id="enquire" className="mt-20 scroll-mt-28">
              <Chapter n={4}>dear TeddyPups…</Chapter>
              <div className="paper mt-6 grid gap-8 p-6 md:grid-cols-[0.7fr_1.3fr] md:p-10">
                <div>
                  <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[0.95]">Ask about {callName}</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-cocoa-soft">Leave your details and our team will get back to you promptly — or message us on WhatsApp for the quickest reply.</p>
                </div>
                <EnquiryForm key={p.slug} puppyLabel={contactLabel(p)} defaultMessage={`Hi! I'd love to know more about ${p.name ? `${p.name} (${p.breed})` : `this ${p.breed}`}.`} />
              </div>
            </section>
          </>
        )}

        <nav aria-label="More puppies" className="mt-16 grid gap-4 sm:grid-cols-2">
          <Neighbour p={prev} dir="prev" />
          <Neighbour p={next} dir="next" />
        </nav>
      </div>
    </article>
  )
}
