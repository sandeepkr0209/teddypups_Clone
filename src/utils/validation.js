// Client-side validation shared by the enquiry and contact forms.
// The same rules are re-checked server-side in api/enquiry.js.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// International phone: optional +, 7–15 digits, allowing spaces, dashes, dots and brackets.
export const isPhone = (v) => /^\+?[\d\s\-().]{7,22}$/.test(v.trim()) && v.replace(/\D/g, '').length >= 7 && v.replace(/\D/g, '').length <= 15

export function validateEnquiry({ name = '', phone = '', email = '' }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Please tell us your name.'
  if (!phone.trim()) errors.phone = 'We need a phone or WhatsApp number to reach you.'
  else if (!isPhone(phone)) errors.phone = 'Please enter a valid number with country code, e.g. +971 50 123 4567.'
  if (email.trim() && !EMAIL_RE.test(email.trim())) errors.email = 'That email address doesn’t look right.'
  return errors
}
