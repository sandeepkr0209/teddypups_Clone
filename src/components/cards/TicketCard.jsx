import { Link } from 'react-router-dom'
import Img from '../common/Img'
import { altOf, isLocal, titleOf } from '../../data/puppies'

/** "one ticket home" stub for a puppy that has found its family. */
export default function TicketCard({ puppy, index = 0 }) {
  const sub = puppy.name ? `${puppy.breed}, ${puppy.sex.toLowerCase()}` : puppy.sex
  return (
    <Link
      to={`/puppies/${puppy.slug}`}
      className="group relative flex overflow-hidden rounded-2xl border-2 border-cocoa bg-milk shadow-[var(--shadow-paper)] transition duration-300 hover:-translate-y-1 hover:rotate-0"
      style={{ rotate: `${[-1.5, 1, -0.5, 1.5][index % 4]}deg` }}
    >
      <div className="relative w-[38%] shrink-0 border-r-2 border-dashed border-cocoa/50">
        <Img path={puppy.images[0]} kind="card" alt={altOf(puppy)} className="h-full min-h-[150px] w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="font-hand text-xs uppercase tracking-wider text-toffee-ink">one ticket home</p>
          <h3 className="mt-1 font-display text-2xl font-extrabold leading-none group-hover:text-toffee-deep">{titleOf(puppy)}</h3>
          <p className="mt-1 text-[13px] text-cocoa-soft">{sub}</p>
        </div>
        <div className="mt-4 flex items-end justify-between text-[12px]">
          <span className="font-semibold">{isLocal(puppy) ? 'Dubai showroom' : 'TeddyPups'}<br /><span className="font-hand text-toffee-deep">home ♥</span></span>
          <span className="-rotate-12 rounded border-2 border-toffee px-1.5 py-0.5 font-hand text-[11px] uppercase text-toffee">admit one</span>
        </div>
      </div>
      {/* ticket notches */}
      <span aria-hidden="true" className="absolute left-[38%] top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cocoa bg-milk" />
      <span aria-hidden="true" className="absolute bottom-0 left-[38%] h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-cocoa bg-milk" />
    </Link>
  )
}
