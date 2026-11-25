import { useState } from 'react'
import { validateEnquiry } from '../utils/validation'
import { sendEnquiry } from '../services/enquiry'

/** Shared state machine for the enquiry forms: idle → submitting → sent | failed. */
export default function useEnquiryForm(initial) {
  const [values, setValues] = useState({ name: '', phone: '', email: '', area: '', puppy: '', message: '', website: '', ...initial })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle' })

  const field = (name) => ({
    name,
    id: `f-${name}`,
    value: values[name],
    onChange: (e) => {
      setValues((v) => ({ ...v, [name]: e.target.value }))
      if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
    },
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `f-${name}-err` : undefined,
  })

  const submit = async (e, source) => {
    e.preventDefault()
    const found = validateEnquiry(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setStatus({ state: 'submitting' })
    const result = await sendEnquiry({ ...values, source })
    if (result.ok) setStatus({ state: 'sent' })
    else {
      if (result.fieldErrors) setErrors(result.fieldErrors)
      setStatus({ state: 'failed', reason: result.reason })
    }
  }

  return { values, errors, status, field, submit, reset: () => setStatus({ state: 'idle' }) }
}
