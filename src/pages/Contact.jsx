import { Loader2, MapPin } from 'lucide-react'
import Button from '../components/common/Button'
import Img from '../components/common/Img'
import Pup from '../components/common/Pup'
import { Paw } from '../components/common/Decor'
import FormStatus from '../components/forms/FormStatus'
import useEnquiryForm from '../hooks/useEnquiryForm'
import { availablePuppies, contactLabel } from '../data/puppies'
import { siteImages } from '../data/media'
import { contact, waLink } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'

function LetterForm() {
  const { values, errors, status, field, submit } = useEnquiryForm({ puppy: '' })
  const blank = (n, extra = '') => `blank ${extra} ${errors[n] ? '!border-red-700' : ''}`
  const busy = status.state === 'submitting'
  const errorList = Object.entries(errors).filter(([, v]) => v)

  return (
    <form noValidate onSubmit={(e) => submit(e, 'contact-letter')} className="relative rounded-3xl border-2 border-cocoa bg-[#fffaf0] p-6 shadow-[var(--shadow-paper)] md:p-10" style={{ backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 39px, rgb(47 110 158 / .12) 39px 40px)' }}>
      <span aria-hidden="true" className="absolute right-6 top-6 flex h-16 w-14 rotate-6 items-center justify-center border-2 border-dashed border-toffee bg-honey-soft"><Paw className="h-7 w-7 text-toffee-deep" /></span>
      <p className="font-hand text-2xl text-toffee-ink">Dear TeddyPups,</p>
      <div className="mt-6 space-y-5 text-[16px] leading-[2.6]">
        <p>
          <label htmlFor="f-name">my name is</label>
          <input {...field('name')} className={blank('name')} placeholder="your name" autoComplete="name" required />, and you can reach me on
          <label htmlFor="f-phone" className="sr-only">Phone or WhatsApp</label>
          <input {...field('phone')} className={blank('phone')} type="tel" placeholder="+971 50 123 4567" autoComplete="tel" required /> or by email at
          <label htmlFor="f-email" className="sr-only">Email (optional)</label>
          <input {...field('email')} className={blank('email')} type="email" placeholder="optional" autoComplete="email" />.
        </p>
        <p>
          <label htmlFor="f-area">I live in</label>
          <input {...field('area')} className={blank('area')} placeholder="e.g. Dubai Marina" autoComplete="address-level2" />, and I'm curious about
          <label htmlFor="f-puppy" className="sr-only">Puppy you're interested in (optional)</label>
          <select {...field('puppy')} className={blank('puppy', 'max-w-full cursor-pointer')}>
            <option value="">any puppy (not sure yet)</option>
            {availablePuppies.map((p) => <option key={p.slug} value={contactLabel(p)}>{contactLabel(p)}</option>)}
          </select>.
        </p>
        <div>
          <label htmlFor="f-message" className="sr-only">Your message (optional)</label>
          <textarea {...field('message')} rows={3} placeholder="Anything else you'd like to tell us…" className="w-full resize-y border-0 bg-transparent font-hand leading-[40px] text-toffee-ink outline-none placeholder:text-cocoa-soft/45" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input {...field('website')} tabIndex={-1} autoComplete="off" />
      </div>

      {errorList.length > 0 && (
        <ul role="alert" className="mt-4 list-disc space-y-1 pl-5 text-[14px] font-medium text-red-800">
          {errorList.map(([k, v]) => <li key={k} id={`f-${k}-err`}>{v}</li>)}
        </ul>
      )}
      <p className="mt-6 font-hand text-lg">with love, a future puppy parent</p>
      <div className="mt-5 flex flex-col gap-4">
        <button type="submit" disabled={busy || status.state === 'sent'} className="inline-flex w-fit items-center gap-2 rounded-full bg-toffee-deep px-6 py-3 font-semibold text-milk shadow-[var(--shadow-hard)] transition hover:-translate-y-0.5 hover:bg-toffee-ink active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60">
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {busy ? 'Posting…' : status.state === 'sent' ? 'Letter posted' : 'Post my letter'}
        </button>
        <FormStatus status={status} values={values} />
      </div>
    </form>
  )
}

export default function Contact() {
  useDocumentTitle('Visit & contact', 'Visit the TeddyPups showroom in Downtown Dubai or get in touch by WhatsApp, phone or email.')
  return (
    <div className="bg-gradient-to-b from-cream to-honey-soft/70 pb-24 pt-12 md:pt-16">
      <div className="container-tp grid items-end gap-6 md:grid-cols-[1.2fr_1fr]">
        <h1 className="h-hero">Get in touch <br />with us</h1>
        <p className="max-w-md text-[16px] leading-relaxed text-cocoa-soft">Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!</p>
      </div>

      <div className="container-tp mt-12 grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-8">
          <Button href={waLink()} variant="whatsapp">WhatsApp {contact.phoneDisplay}</Button>
          <dl className="space-y-5">
            <div><dt className="font-hand text-sm text-cocoa-soft">call us</dt><dd><a href={contact.phoneHref} className="font-semibold underline decoration-toffee decoration-2 underline-offset-4">{contact.phoneDisplay}</a></dd></div>
            <div><dt className="font-hand text-sm text-cocoa-soft">email</dt><dd><a href={`mailto:${contact.email}`} className="font-semibold underline decoration-toffee decoration-2 underline-offset-4">{contact.email}</a></dd></div>
          </dl>

          <section aria-labelledby="visit-title" className="overflow-hidden rounded-3xl border-2 border-cocoa bg-milk shadow-[var(--shadow-paper)]">
            <div aria-hidden="true" className="h-8 border-b-2 border-cocoa" style={{ background: 'repeating-linear-gradient(90deg,#a24a1a 0 18px,#fffdf8 18px 36px)' }} />
            <div className="grid gap-5 p-6 sm:grid-cols-[1fr_auto]">
              <div>
                <h2 id="visit-title" className="font-display text-2xl font-extrabold leading-tight">Visit us in Downtown Dubai</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-cocoa-soft">Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.</p>
                <p className="mt-4 flex items-start gap-2 text-[15px] font-semibold"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-toffee-deep" aria-hidden="true" />{contact.address}</p>
                <Button href={contact.mapsUrl} variant="outline" size="sm" className="mt-5">Open in Google Maps</Button>
              </div>
              <div className="h-44 w-36 overflow-hidden rounded-t-full border-2 border-cocoa">
                <Img path={siteImages.showroomHello} kind="feature" alt="The apricot teddy bear puppy from our showroom, held up to say hello" className="h-full w-full object-cover" />
              </div>
            </div>
          </section>
        </div>

        <div className="relative">
          <LetterForm />
          <Pup variant="sit" className="absolute -bottom-16 right-4 hidden w-28 md:block" />
        </div>
      </div>
    </div>
  )
}
