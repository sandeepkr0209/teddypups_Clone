// Form behaviour checks (validation, honest failure, success) against a running build.
// Usage: BASE=http://localhost:4173 node scripts/qa-forms.mjs
import { chromium } from 'playwright-core'
import assert from 'node:assert/strict'

const BASE = process.env.BASE ?? 'http://localhost:4173'
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/usr/bin/google-chrome', args: ['--no-sandbox'] })
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage()
const results = []
const check = async (name, fn) => { try { await fn(); results.push(['PASS', name]) } catch (e) { results.push(['FAIL', name, e.message.split('\n')[0]]) } }

// 1. Puppy enquiry form
await page.goto(`${BASE}/puppies/maltipoo-max-male`, { waitUntil: 'networkidle' })
await check('empty submit shows required errors and does not post', async () => {
  let posted = false
  page.on('request', (r) => r.url().includes('/api/enquiry') && (posted = true))
  await page.click('button[type=submit]')
  assert.ok(await page.locator('#f-name-err').isVisible())
  assert.ok(await page.locator('#f-phone-err').isVisible())
  assert.equal(posted, false)
})
await check('bad phone / email formats rejected', async () => {
  await page.fill('#f-name', 'Aisha')
  await page.fill('#f-phone', '12ab')
  await page.fill('#f-email', 'aisha@')
  await page.click('button[type=submit]')
  assert.match(await page.locator('#f-phone-err').innerText(), /valid number/)
  assert.match(await page.locator('#f-email-err').innerText(), /email/)
})
await check('backend not configured → honest "not sent" + WhatsApp fallback', async () => {
  await page.route('**/api/enquiry', (r) => r.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false,"error":"not_configured"}' }))
  await page.fill('#f-phone', '+971 50 123 4567')
  await page.fill('#f-email', 'aisha@example.com')
  await page.click('button[type=submit]')
  await page.getByText('Your enquiry was not sent.').waitFor({ timeout: 5000 })
  const href = await page.getByRole('link', { name: 'Send on WhatsApp instead' }).getAttribute('href')
  assert.match(href, /^https:\/\/wa\.me\/919898124987\?text=/)
  assert.match(decodeURIComponent(href), /Aisha[\s\S]*Max \(Maltipoo, boy\)[\s\S]*\+971 50 123 4567/)
  await page.unroute('**/api/enquiry')
})
await check('confirmed delivery → success message, button disabled', async () => {
  await page.route('**/api/enquiry', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }))
  await page.click('button[type=submit]')
  await page.getByText('Your enquiry has been sent.').waitFor({ timeout: 5000 })
  assert.equal(await page.locator('button[type=submit]').isDisabled(), true)
})

// 2. Contact letter form
await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle' })
await check('letter form validates and lists errors', async () => {
  await page.click('button[type=submit]')
  assert.ok(await page.getByRole('alert').first().isVisible())
})
await check('letter form submits selected puppy', async () => {
  let payload
  await page.route('**/api/enquiry', (r) => { payload = JSON.parse(r.request().postData()); r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }) })
  await page.fill('#f-name', 'Omar Ali')
  await page.fill('#f-phone', '+971501234567')
  await page.selectOption('#f-puppy', { index: 2 })
  await page.click('button[type=submit]')
  await page.getByText('Your enquiry has been sent.').waitFor({ timeout: 5000 })
  assert.equal(payload.source, 'contact-letter')
  assert.match(payload.puppy, /Korean Teacup Maltipoo/)
})

// 3. Interactions
await page.goto(`${BASE}/faq`, { waitUntil: 'networkidle' })
await check('FAQ accordion toggles and search filters', async () => {
  const second = page.getByRole('button', { name: 'Can I meet a puppy before I decide?' })
  await second.click()
  assert.equal(await second.getAttribute('aria-expanded'), 'true')
  await page.fill('#faq-search', 'deliver')
  await page.waitForTimeout(300)
  assert.match(await page.getByText(/notes? on the board/).innerText(), /^[1-3] note/)
})
await page.goto(`${BASE}/puppies`, { waitUntil: 'networkidle' })
await check('puppy filters update URL and results', async () => {
  await page.getByRole('button', { name: 'Shih Tzu' }).click()
  await page.waitForTimeout(500)
  assert.match(page.url(), /breed=shih-tzu/)
  assert.match(await page.getByText(/puppies match/).innerText(), /^2 puppies match/)
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await page.waitForTimeout(300)
  assert.match(await page.getByText(/looking for a home/).innerText(), /^15 puppies/)
})
await check('local filter shows empty state with actions', async () => {
  await page.goto(`${BASE}/puppies?origin=local`, { waitUntil: 'networkidle' })
  assert.ok(await page.getByText('No puppies match just now.').isVisible())
  await page.getByRole('button', { name: 'Show all puppies' }).click()
  await page.waitForTimeout(300)
  assert.equal(new URL(page.url()).search, '')
})
await page.goto(`${BASE}/puppies/korean-teacup-maltipoo-female`, { waitUntil: 'networkidle' })
await check('gallery arrows + counter', async () => {
  assert.equal(await page.getByText('1 / 11').count(), 1)
  await page.getByRole('button', { name: 'Next photo' }).click()
  await page.getByText('2 / 11').waitFor()
  await page.getByRole('button', { name: 'Previous photo' }).click()
  await page.getByRole('button', { name: 'Previous photo' }).click()
  await page.getByText('11 / 11').waitFor()
})
await page.goto(`${BASE}/how-it-works`, { waitUntil: 'networkidle' })
await check('how-it-works tabs switch content', async () => {
  await page.getByRole('tab', { name: /Imported/ }).click()
  await page.getByRole('heading', { name: 'Order upon request' }).waitFor()
})
const m = await (await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true })).newPage()
await m.goto(`${BASE}/`, { waitUntil: 'networkidle' })
await check('mobile menu opens, navigates and closes', async () => {
  await m.getByRole('button', { name: 'Menu' }).click()
  await m.getByText('where to, friend?').waitFor()
  await m.getByRole('dialog').getByRole('link', { name: 'FAQ' }).click()
  await m.waitForURL(/\/faq$/)
  await m.getByRole('dialog').waitFor({ state: 'detached', timeout: 3000 })
})
await browser.close()
for (const r of results) console.log(r.join(' | '))
process.exit(results.some((r) => r[0] === 'FAIL') ? 1 : 0)
