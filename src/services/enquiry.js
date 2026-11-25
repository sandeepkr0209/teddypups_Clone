import { waLink } from '../data/site'

/**
 * Sends an enquiry to the serverless endpoint.
 * Resolves { ok: true } only when the server confirms delivery.
 * Otherwise resolves { ok: false, reason } — the UI never claims success it didn't get.
 */
export async function sendEnquiry(payload) {
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data.ok) return { ok: true }
    return { ok: false, reason: data.error ?? `http_${res.status}`, fieldErrors: data.fieldErrors }
  } catch {
    return { ok: false, reason: 'network' }
  }
}

/** Builds a WhatsApp link carrying the enquiry, used as the fallback channel. */
export function enquiryToWhatsApp({ name, phone, email, area, puppy, message }) {
  const lines = [
    `Hi TeddyPups! My name is ${name}.`,
    puppy ? `I'm interested in ${puppy}.` : null,
    message || null,
    `Phone/WhatsApp: ${phone}`,
    email ? `Email: ${email}` : null,
    area ? `Area: ${area}` : null,
  ].filter(Boolean)
  return waLink(lines.join('\n'))
}
