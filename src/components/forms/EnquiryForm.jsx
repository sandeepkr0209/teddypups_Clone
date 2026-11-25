import { Loader2 } from 'lucide-react'
import useEnquiryForm from '../../hooks/useEnquiryForm'
import FormStatus, { FieldError } from './FormStatus'

function Field({ label, optional, hint, error, children, id }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-semibold">
        {label} {optional ? <span className="font-normal text-cocoa-soft">(optional)</span> : <span aria-hidden="true" className="text-toffee-deep">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-[13px] text-cocoa-soft">{hint}</p>}
      <FieldError id={`${id}-err`} message={error} />
    </div>
  )
}

/** "Ask about <puppy>" form on each available puppy's page. */
export default function EnquiryForm({ puppyLabel, defaultMessage }) {
  const { values, errors, status, field, submit } = useEnquiryForm({ puppy: puppyLabel, message: defaultMessage })
  const cls = (n) => `field ${errors[n] ? 'field-error' : ''}`
  const busy = status.state === 'submitting'

  return (
    <form noValidate onSubmit={(e) => submit(e, 'puppy-page')} className="grid gap-5 sm:grid-cols-2">
      <Field label="Your name" id="f-name" error={errors.name}>
        <input {...field('name')} className={cls('name')} autoComplete="name" required />
      </Field>
      <Field label="Phone or WhatsApp" id="f-phone" error={errors.phone} hint="With country code, e.g. +971 50 123 4567">
        <input {...field('phone')} className={cls('phone')} type="tel" autoComplete="tel" inputMode="tel" required />
      </Field>
      <Field label="Email" optional id="f-email" error={errors.email}>
        <input {...field('email')} className={cls('email')} type="email" autoComplete="email" />
      </Field>
      <Field label="Your area" optional id="f-area" hint="e.g. Dubai Marina">
        <input {...field('area')} className="field" autoComplete="address-level2" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Message" optional id="f-message">
          <textarea {...field('message')} rows={4} className="field resize-y" />
        </Field>
      </div>
      {/* honeypot: real people never see or fill this */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input {...field('website')} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={busy || status.state === 'sent'}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-toffee-deep px-6 py-3 font-semibold text-milk shadow-[var(--shadow-hard)] transition hover:-translate-y-0.5 hover:bg-toffee-ink active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {busy ? 'Sending…' : status.state === 'sent' ? 'Enquiry sent' : 'Send enquiry'}
        </button>
        <FormStatus status={status} values={values} />
      </div>
    </form>
  )
}
