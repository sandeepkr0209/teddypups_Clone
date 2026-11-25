import Button from '../../common/Button'
import Pup from '../../common/Pup'
import { Sparkle, Stars } from '../../common/Decor'
import { faqs } from '../../../data/site'

export default function FaqPreview() {
  return (
    <section aria-labelledby="faq-preview-title" className="relative overflow-hidden bg-gradient-to-b from-[#4a2614] to-night py-20 text-milk">
      <Stars count={22} />
      <div className="container-tp relative grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 id="faq-preview-title" className="h-section">Questions, <br />answered</h2>
          <Button to="/faq" variant="light" className="mt-8">Read all questions</Button>
          <div className="relative mt-10 hidden w-28 md:block">
            <span aria-hidden="true" className="absolute -right-6 -top-6 font-display text-3xl font-extrabold text-honey">?</span>
            <Pup variant="sit" />
          </div>
        </div>
        <dl className="space-y-9">
          {faqs.slice(0, 3).map((f) => (
            <div key={f.q} className="flex gap-4">
              <Sparkle className="mt-1 h-4 w-4 shrink-0 text-honey" />
              <div>
                <dt className="font-display text-xl font-extrabold">{f.q}</dt>
                <dd className="mt-2 max-w-xl text-[15px] leading-relaxed text-milk/80">{f.a}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
