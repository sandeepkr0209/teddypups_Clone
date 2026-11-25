import { CheckCircle2, AlertTriangle } from 'lucide-react'
import Button from '../common/Button'
import { enquiryToWhatsApp } from '../../services/enquiry'

export function FieldError({ id, message }) {
  if (!message) return null
  return <p id={id} className="mt-1.5 text-[13px] font-medium text-red-800">{message}</p>
}

/** Honest outcome message: success only when the server confirmed delivery. */
export default function FormStatus({ status, values }) {
  if (status.state === 'sent') {
    return (
      <div role="status" className="flex gap-3 rounded-2xl border-2 border-wa bg-wa/10 p-4 text-[15px]">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-wa" aria-hidden="true" />
        <p><strong>Thank you, {values.name.split(' ')[0]}!</strong> Your enquiry has been sent. Our team will get back to you promptly.</p>
      </div>
    )
  }
  if (status.state === 'failed') {
    const notConfigured = status.reason === 'not_configured'
    return (
      <div role="alert" className="rounded-2xl border-2 border-toffee bg-honey-soft p-4 text-[15px]">
        <p className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-toffee-deep" aria-hidden="true" />
          <span>
            <strong>Your enquiry was not sent.</strong>{' '}
            {notConfigured
              ? 'Online enquiries aren’t connected on this site yet.'
              : status.reason === 'invalid'
                ? 'Please check the highlighted fields.'
                : 'Something went wrong on our side.'}{' '}
            You can send the same details on WhatsApp in one tap instead.
          </span>
        </p>
        <Button href={enquiryToWhatsApp(values)} variant="whatsapp" size="sm" className="ml-8 mt-3">Send on WhatsApp instead</Button>
      </div>
    )
  }
  return null
}
