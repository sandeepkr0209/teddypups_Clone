// Unit tests for the enquiry API and the shared client validation. Run: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import handler, { validate } from '../api/enquiry.js'
import { validateEnquiry, isPhone } from '../src/utils/validation.js'

function mockRes() {
  return {
    statusCode: 200, headers: {}, body: undefined,
    status(c) { this.statusCode = c; return this },
    setHeader(k, v) { this.headers[k] = v },
    json(b) { this.body = b; return this },
  }
}
const good = { name: 'Aisha Khan', phone: '+971 50 123 4567', email: 'aisha@example.com', area: 'Dubai Marina', puppy: 'Max (Maltipoo, boy)', message: 'Hi!' }

test('client validation: required fields and formats', () => {
  assert.deepEqual(validateEnquiry(good), {})
  const e = validateEnquiry({ name: 'A', phone: '12', email: 'nope' })
  assert.ok(e.name && e.phone && e.email)
  assert.ok(validateEnquiry({ name: 'Bo', phone: '' }).phone)
  assert.equal(isPhone('+971 (50) 123-4567'), true)
  assert.equal(isPhone('call me maybe'), false)
  assert.equal(isPhone('+1234567890123456'), false) // 16 digits
})

test('server validation mirrors client rules and strips control chars', () => {
  const { data, fieldErrors } = validate({ ...good, name: 'Aisha\u0007 Khan' })
  assert.deepEqual(fieldErrors, {})
  assert.equal(data.name, 'Aisha  Khan')
  assert.ok(validate({ name: '', phone: 'abc' }).fieldErrors.phone)
})

test('rejects non-POST', async () => {
  const res = mockRes()
  await handler({ method: 'GET' }, res)
  assert.equal(res.statusCode, 405)
})

test('invalid input returns 422 with field errors', async () => {
  const res = mockRes()
  await handler({ method: 'POST', body: { name: 'x', phone: '1' } }, res)
  assert.equal(res.statusCode, 422)
  assert.ok(res.body.fieldErrors.name)
})

test('honeypot submissions are swallowed', async () => {
  const res = mockRes()
  await handler({ method: 'POST', body: { ...good, website: 'http://spam' } }, res)
  assert.equal(res.statusCode, 200)
})

test('without mail credentials it reports not_configured (never fake success)', async () => {
  delete process.env.RESEND_API_KEY
  const res = mockRes()
  await handler({ method: 'POST', body: good }, res)
  assert.equal(res.statusCode, 503)
  assert.equal(res.body.error, 'not_configured')
  assert.equal(res.body.ok, false)
})

test('with credentials it calls Resend and reports delivery', async () => {
  process.env.RESEND_API_KEY = 'test_key'
  process.env.ENQUIRY_TO_EMAIL = 'owner@example.com'
  const calls = []
  const realFetch = globalThis.fetch
  globalThis.fetch = async (url, opts) => { calls.push({ url, body: JSON.parse(opts.body) }); return { ok: true, text: async () => '' } }
  try {
    const res = mockRes()
    await handler({ method: 'POST', body: JSON.stringify(good) }, res)
    assert.equal(res.statusCode, 200)
    assert.equal(calls[0].url, 'https://api.resend.com/emails')
    assert.deepEqual(calls[0].body.to, ['owner@example.com'])
    assert.match(calls[0].body.subject, /Aisha Khan/)
    globalThis.fetch = async () => ({ ok: false, status: 500, text: async () => 'boom' })
    const res2 = mockRes()
    await handler({ method: 'POST', body: good }, res2)
    assert.equal(res2.statusCode, 502)
  } finally {
    globalThis.fetch = realFetch
    delete process.env.RESEND_API_KEY
    delete process.env.ENQUIRY_TO_EMAIL
  }
})
