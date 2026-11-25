import { Heart } from 'lucide-react'
import Eyebrow from '../components/common/Eyebrow'
import Pup from '../components/common/Pup'
import Polaroid from '../components/cards/Polaroid'
import { familyPhotos } from '../data/media'
import { testimonial } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function HappyFamilies() {
  useDocumentTitle('Happy families', 'Beautiful moments shared by TeddyPups families after welcoming their furry friends.')
  return (
    <div className="pb-24 pt-12 md:pt-16" style={{ backgroundImage: 'linear-gradient(180deg,#fdf3e1,#fffdf8 30%), repeating-linear-gradient(90deg, transparent 0 60px, rgb(194 98 43 / .05) 60px 62px)' }}>
      <div className="container-tp grid items-end gap-10 md:grid-cols-[1.1fr_1fr]">
        <div>
          <Eyebrow>our wall of happy endings</Eyebrow>
          <h1 className="h-hero mt-3">Happy <br />families <Heart className="inline h-8 w-8 -translate-y-2 text-toffee md:h-12 md:w-12" aria-hidden="true" /></h1>
          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-cocoa-soft">Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.</p>
          <p className="mt-5 font-hand text-toffee-ink">{familyPhotos.length} moments and counting</p>
        </div>
        <blockquote className="relative rotate-1 bg-milk p-6 shadow-[var(--shadow-soft)]">
          <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 bg-sky/80" />
          <p className="font-display text-[17px] font-semibold leading-relaxed">“{testimonial.quote}”</p>
          <footer className="mt-4 font-hand text-sm text-toffee-ink">{testimonial.author}</footer>
        </blockquote>
      </div>
      <ul className="container-tp mt-16 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {familyPhotos.map((p, i) => <li key={p.src}><Polaroid photo={p} index={i} /></li>)}
      </ul>
      <div className="mt-16 flex flex-col items-center">
        <Pup variant="walk" className="anim-trot w-24" />
        <p className="mt-2 font-hand text-cocoa-soft">every one of them was a Teddy Pup once</p>
      </div>
    </div>
  )
}
