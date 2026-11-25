import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Store, Truck, PlaneLanding, Globe2, Ship, Headset, ShieldCheck, Sparkles, Users, Eye, PackageCheck } from 'lucide-react'
import Button from '../components/common/Button'
import Eyebrow from '../components/common/Eyebrow'
import Pup from '../components/common/Pup'
import StepsRow from '../components/common/StepsRow'
import { Skyline } from '../components/common/Decor'
import { localSteps, waLink } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'

const importStepsLong = [
  { title: 'Reserve your puppy', body: 'Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences.' },
  { title: 'Personalized consultation', body: "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey." },
  { title: 'Import and arrival', body: 'We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family.' },
  { title: 'Welcome home', body: 'Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home.' },
]

const TABS = {
  local: {
    label: 'In Dubai', sub: 'meet in person', heading: 'Meet your puppy in person', place: 'Downtown Dubai',
    body: ["Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks."],
    steps: localSteps,
  },
  imported: {
    label: 'Imported', sub: 'order upon request', heading: 'Order upon request', place: 'Europe · Korea → Dubai',
    body: [
      "Looking for a truly exceptional companion? Our Order Upon Request service gives you access to some of the world's most sought-after teacup breeds — ethically sourced from the most reputable, certified breeders across Europe, Korea, and beyond.",
      "From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring the world's finest puppies to Dubai, just for you.",
    ],
    steps: importStepsLong,
  },
}

const promise = [
  { icon: Users, title: 'Hand-selected breeders', body: 'We work only with breeders who uphold the highest ethical and health standards.' },
  { icon: Eye, title: 'Full transparency', body: 'Photos, videos, and health certificates are shared before your puppy travels.' },
  { icon: PackageCheck, title: 'Safe, stress-free delivery', body: 'We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you.' },
]

const delivery = [
  { icon: Store, title: 'Take your puppy home the same day', body: 'Local puppies are available immediately — visit, fall in love, and go home together.' },
  { icon: Truck, title: 'Delivery within Dubai', body: 'Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.' },
  { icon: PlaneLanding, title: 'Safe international cargo', body: 'We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.' },
  { icon: Globe2, title: 'Worldwide delivery', body: 'We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.' },
]

const why = [
  { icon: Ship, title: 'International cargo', body: 'We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.' },
  { icon: Headset, title: 'Support 24/7', body: "Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we're just a message away." },
  { icon: ShieldCheck, title: 'Health guarantee', body: 'All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.' },
  { icon: Sparkles, title: 'Unique and high quality puppies', body: "When you choose TeddyPups, you can trust that you're getting a puppy of the highest quality. We also provide guidance and support to new pet owners, offering advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend." },
]

const anchors = [['two-ways', 'Two ways home'], ['promise', 'Our premium puppy promise'], ['delivery', 'Delivery & collection'], ['why', 'Why choose us']]

function Postcard({ tab }) {
  return (
    <div className="paper relative aspect-[5/4] overflow-hidden bg-[linear-gradient(180deg,#fbe3b4,#fdf3e1)]">
      <p className="absolute left-5 top-4 font-hand text-[15px]">{tab.place}</p>
      {tab === TABS.local ? (
        <>
          <span aria-hidden="true" className="absolute right-[22%] top-[22%] h-16 w-16 rounded-full bg-honey" />
          <Skyline className="absolute bottom-0 left-0 w-full text-cocoa/70" />
        </>
      ) : (
        <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M40 150 C 100 40, 210 40, 260 130" fill="none" stroke="#a24a1a" strokeWidth="2.5" strokeDasharray="3 8" strokeLinecap="round" />
          <circle cx="40" cy="150" r="6" fill="#a24a1a" /><circle cx="260" cy="130" r="6" fill="#a24a1a" />
          <text x="22" y="178" className="fill-cocoa font-hand text-[13px]">Europe · Korea</text>
          <text x="240" y="158" className="fill-cocoa font-hand text-[13px]">Dubai</text>
          <path d="M140 66 l18 -6 l-4 6 l4 6z" fill="#2a170e" />
        </svg>
      )}
    </div>
  )
}

function Tile({ item }) {
  const Icon = item.icon
  return (
    <div className="paper p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-honey-soft"><Icon className="h-5 w-5 text-toffee-deep" aria-hidden="true" /></span>
      <h3 className="mt-4 font-display text-xl font-extrabold leading-tight">{item.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-cocoa-soft">{item.body}</p>
    </div>
  )
}

export default function HowItWorks() {
  useDocumentTitle('How it works', 'Visit us locally or order a premium breed from overseas — how TeddyPups works.')
  const [tabKey, setTabKey] = useState('local')
  const tab = TABS[tabKey]

  return (
    <div className="pb-24">
      <section className="bg-gradient-to-b from-cream to-milk pb-10 pt-12 md:pt-16">
        <div className="container-tp grid items-end gap-6 md:grid-cols-[1.3fr_1fr]">
          <h1 className="h-hero">How it works</h1>
          <p className="max-w-md text-[16px] leading-relaxed text-cocoa-soft">Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.</p>
        </div>
        <nav aria-label="On this page" className="container-tp mt-8">
          <ol className="flex flex-wrap gap-2">
            {anchors.map(([id, label], i) => (
              <li key={id}><a href={`#${id}`} className="inline-flex rounded-full border-2 border-cocoa bg-milk px-4 py-1.5 text-[13px] font-semibold hover:bg-honey-soft"><span className="mr-1.5 text-toffee-deep">{i + 1}</span>{label}</a></li>
            ))}
          </ol>
        </nav>
      </section>

      <section id="two-ways" className="container-tp scroll-mt-28 pt-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div><Eyebrow>choose your way</Eyebrow><h2 className="mt-1 font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold">Two ways home</h2></div>
          <div className="flex items-end gap-4">
            <div role="tablist" aria-label="Two ways home" className="flex rounded-full border-2 border-cocoa bg-milk p-1.5">
              {Object.entries(TABS).map(([key, t]) => (
                <button
                  key={key} role="tab" type="button" id={`tab-${key}`} aria-selected={tabKey === key} aria-controls="tab-panel"
                  onClick={() => setTabKey(key)}
                  className={`rounded-full px-6 py-2 text-center leading-tight transition md:px-10 ${tabKey === key ? 'bg-toffee-deep text-milk' : 'hover:bg-honey-soft'}`}
                >
                  <span className="block font-display text-lg font-extrabold">{t.label}</span>
                  <span className="block text-xs">{t.sub}</span>
                </button>
              ))}
            </div>
            <Pup variant="sit" className="hidden w-24 sm:block" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tabKey} id="tab-panel" role="tabpanel" aria-labelledby={`tab-${tabKey}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
              <div>
                <h3 className="font-display text-[clamp(1.8rem,3.4vw,2.4rem)] font-extrabold leading-tight">{tab.heading}</h3>
                {tab.body.map((t) => <p key={t} className="mt-4 text-[16px] leading-relaxed text-cocoa-soft">{t}</p>)}
              </div>
              <Postcard tab={tab} />
            </div>
            <div className="mt-12"><StepsRow steps={tab.steps} label={(i) => `Step ${i + 1}`} /></div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section id="promise" className="container-tp mt-24 scroll-mt-28">
        <Eyebrow>puppy passport</Eyebrow>
        <h2 className="mt-1 font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold">Our premium puppy promise</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">{promise.map((p) => <Tile key={p.title} item={p} />)}</div>
      </section>

      <section id="delivery" className="mt-24 scroll-mt-28 bg-honey-soft/60 py-20">
        <div className="container-tp">
          <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold">Delivery & collection</h2>
          <p className="mt-3 max-w-xl text-[16px] text-cocoa-soft">From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{delivery.map((d) => <Tile key={d.title} item={d} />)}</div>
          <p aria-hidden="true" className="mt-10 flex items-center justify-center gap-3 font-hand text-toffee-ink">Korea <span className="h-0 w-40 border-t-2 border-dashed border-toffee" /> ✈ <span className="h-0 w-10 border-t-2 border-dashed border-toffee" /> Dubai</p>
        </div>
      </section>

      <section id="why" className="container-tp mt-24 scroll-mt-28">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold">Why choose us</h2>
          <p className="text-[16px] leading-relaxed text-cocoa-soft">We're here to help you find a new family member. From the moment you visit our site to the joyful day your puppy arrives at your door, we're with you every step of the way. Our mission is to make the entire adoption process smooth, transparent, and full of love.</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">{why.map((w) => <Tile key={w.title} item={w} />)}</div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href={waLink()} variant="whatsapp">Ask us on WhatsApp</Button>
          <Button to="/puppies" variant="outline">See available puppies</Button>
        </div>
      </section>
    </div>
  )
}
