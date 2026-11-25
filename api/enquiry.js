// Vercel serverless function: POST /api/enquiry
//
// Validates an enquiry and delivers it by email through Resend's REST API.
// Configuration (server-side env vars, never exposed to the browser):
//   RESEND_API_KEY      – Resend API key
//   ENQUIRY_TO_EMAIL    – inbox that receives enquiries
//   ENQUIRY_FROM_EMAIL  – optional verified sender (defaults to Resend's onboarding sender)
// Without them the endpoint answers 503 {error:"not_configured"} so the UI can say the
// enquiry was NOT sent and offer WhatsApp, instead of faking a success.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const digits = (v) => String(v ?? '').replace(/\D/g, '')
// eslint-disable-next-line no-control-regex -- stripping control characters is the point
const clean = (v, max = 500) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max)
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export function validate(body) {
  const data = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 30),
    email: clean(body.email, 200),
    area: clean(body.area, 100),
    puppy: clean(body.puppy, 120),
    message: clean(String(body.message ?? '').replace(/\r?\n/g, '\n'), 2000),
    source: clean(body.source, 40),
  }
  const fieldErrors = {}
  if (data.name.length < 2) fieldErrors.name = 'Please tell us your name.'
  const d = digits(data.phone)
  if (!data.phone) fieldErrors.phone = 'We need a phone or WhatsApp number to reach you.'
  else if (d.length < 7 || d.length > 15 || !/^\+?[\d\s\-().]+$/.test(data.phone)) fieldErrors.phone = 'Please enter a valid number with country code.'
  if (data.email && !EMAIL_RE.test(data.email)) fieldErrors.email = 'That email address doesn’t look right.'
  return { data, fieldErrors }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {}

  // Honeypot: bots fill the hidden "website" field. Pretend success, deliver nothing.
  if (clean(body.website)) return res.status(200).json({ ok: true })

  const { data, fieldErrors } = validate(body)
  if (Object.keys(fieldErrors).length) return res.status(422).json({ ok: false, error: 'invalid', fieldErrors })

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL) return res.status(503).json({ ok: false, error: 'not_configured' })

  const rows = [['Name', data.name], ['Phone / WhatsApp', data.phone], ['Email', data.email], ['Area', data.area], ['Puppy', data.puppy], ['Message', data.message], ['Form', data.source]]
    .filter(([, v]) => v)
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: ENQUIRY_FROM_EMAIL || 'TeddyPups website <onboarding@resend.dev>',
        to: [ENQUIRY_TO_EMAIL],
        reply_to: data.email || undefined,
        subject: `New puppy enquiry from ${data.name}${data.puppy ? ` — ${data.puppy}` : ''}`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
        html: `<table>${rows.map(([k, v]) => `<tr><th align="left" valign="top">${k}</th><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>`,
      }),
      signal: AbortSignal.timeout(10000),
    })
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text().catch(() => ''))
      return res.status(502).json({ ok: false, error: 'delivery_failed' })
    }
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error('Enquiry delivery failed', e)
    return res.status(502).json({ ok: false, error: 'delivery_failed' })
  }
}
