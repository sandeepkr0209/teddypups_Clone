import Button from '../components/common/Button'
import Eyebrow from '../components/common/Eyebrow'
import TicketCard from '../components/cards/TicketCard'
import { goneHomePuppies } from '../data/puppies'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function GoneHome() {
  useDocumentTitle('Gone home', 'Every puppy here has already joined a loving family.')
  return (
    <div className="paw-bg pb-24 pt-12 md:pt-16">
      <div className="container-tp">
        <h1 className="h-hero">Gone home</h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-cocoa-soft">Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match.</p>
        <Button to="/puppies" className="mt-7">See available puppies</Button>
        <Eyebrow className="mt-14 block text-lg">tickets home</Eyebrow>
        <ul className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {goneHomePuppies.map((p, i) => <li key={p.slug}><TicketCard puppy={p} index={i} /></li>)}
        </ul>
      </div>
    </div>
  )
}
