import Button from '../../common/Button'
import Pup from '../../common/Pup'
import Polaroid from '../../cards/Polaroid'
import { homeFamilyPhotos } from '../../../data/media'
import { testimonial } from '../../../data/site'

function Lamp({ className = '' }) {
  return (
    <div aria-hidden="true" className={`flex flex-col items-center ${className}`}>
      <div className="relative h-9 w-9 rounded-t-xl border-[3px] border-cocoa bg-[#ffd98a] shadow-[0_0_60px_25px_rgb(255_200_110/0.45)]" />
      <div className="h-36 w-2 bg-cocoa" />
      <div className="h-2 w-8 rounded-sm bg-cocoa" />
    </div>
  )
}

export default function FamiliesWall() {
  return (
    <section aria-labelledby="families-title" className="relative">
      <div className="bg-toffee-deep py-12 text-milk">
        <div className="container-tp grid items-end gap-8 md:grid-cols-[1fr_1.1fr]">
          <h2 id="families-title" className="h-section">Happy families <br />& puppies</h2>
          <blockquote className="rotate-1 rounded-md bg-milk p-5 text-cocoa shadow-[var(--shadow-paper)]">
            <p className="font-display text-[16px] font-semibold leading-relaxed">“{testimonial.quote}”</p>
            <footer className="mt-3 font-hand text-sm text-toffee-ink">{testimonial.author}</footer>
          </blockquote>
        </div>
      </div>

      <div className="relative overflow-hidden bg-[#7b4222] pb-0 pt-14" style={{ backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 46px, rgb(0 0 0 / .16) 46px 48px)' }}>
        {/* bunting string the photos hang from */}
        <svg aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute inset-x-0 top-10 h-8 w-full">
          <path d="M0 6 Q 360 40 720 10 T 1440 8" fill="none" stroke="#f2be6b" strokeWidth="2" opacity=".7" />
        </svg>
        <ul className="container-tp relative grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {homeFamilyPhotos.map((p, i) => (
            <li key={p.src} className={i % 2 ? 'lg:mt-10' : ''}>
              <Polaroid photo={p} index={i} pin />
            </li>
          ))}
        </ul>

        <div className="relative mt-16 h-56">
          <Lamp className="absolute bottom-10 left-[8%]" />
          <div aria-hidden="true" className="absolute bottom-10 left-1/2 h-36 w-24 -translate-x-1/2 rounded-t-full border-[3px] border-cocoa bg-toffee">
            <span className="absolute inset-y-3 left-1/2 w-0.5 bg-cocoa/40" />
            <span className="absolute right-3 top-1/2 h-2.5 w-2.5 rounded-full bg-honey" />
          </div>
          <Pup variant="walk" className="anim-trot absolute bottom-8 left-[calc(50%+3.5rem)] w-16" />
          <div className="absolute bottom-16 right-[6%]">
            <Button to="/happy-families">See every happy family</Button>
          </div>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-10 border-t-[3px] border-cocoa bg-[#4a2614]" />
        </div>
      </div>
    </section>
  )
}
