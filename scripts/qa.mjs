// Automated QA pass: visits every route at mobile / tablet / desktop / large widths,
// records console errors, horizontal overflow and broken internal links, and saves screenshots.
// Usage: BASE=http://localhost:4173 CHROME=/usr/bin/google-chrome node scripts/qa.mjs
import { chromium } from 'playwright-core'
import { mkdir, writeFile } from 'node:fs/promises'
import { readFileSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://localhost:4173'
const OUT = process.env.OUT ?? 'qa'
const data = JSON.parse(readFileSync(new URL('../src/data/puppies.generated.json', import.meta.url)))
const routes = ['/', '/puppies', '/puppies?breed=poodle', '/puppies?origin=local', '/gone-home', '/happy-families', '/how-it-works', '/faq', '/contact', '/this-page-does-not-exist',
  ...[...data.available, ...data.gone].map((p) => `/puppies/${p.slug}`)]
const viewports = { mobile: [375, 812], tablet: [768, 1024], desktop: [1280, 800], large: [1680, 1000] }
const shotRoutes = new Set(['/', '/puppies', '/puppies/maltipoo-max-male', '/puppies/pomeranian-ace-boy', '/gone-home', '/happy-families', '/how-it-works', '/faq', '/contact', '/this-page-does-not-exist'])

// Requests to the reference origin / external hosts are blocked in some sandboxes; ignore those failures.
const ignorable = (t) => /ERR_|net::|Failed to load resource|instabizweb|status of 40[34]/.test(t)

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/usr/bin/google-chrome', args: ['--no-sandbox'] })
const report = []
const links = new Set()

for (const [vpName, [w, h]] of Object.entries(viewports)) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: w < 768 })
  for (const route of routes) {
    if (vpName !== 'desktop' && route.startsWith('/puppies/') && !shotRoutes.has(route)) continue
    const page = await ctx.newPage()
    const errors = []
    page.on('console', (m) => m.type() === 'error' && !ignorable(m.text()) && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
    await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 30000 }).catch((e) => errors.push(`goto: ${e.message}`))
    await page.waitForTimeout(400)
    const info = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      title: document.title,
      h1: document.querySelectorAll('h1').length,
      links: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
      emptyButtons: [...document.querySelectorAll('a:not([href]),a[href=""],a[href="#"]')].length,
    }))
    info.links.forEach((l) => links.add(l.split('#')[0]))
    if (shotRoutes.has(route)) {
      const name = `${vpName}${route.replace(/[/?=]/g, '_') || '_home'}`
      await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: route !== '/' || vpName === 'mobile' }).catch(() => {})
    }
    report.push({ viewport: vpName, route, overflowPx: info.overflow, title: info.title, h1Count: info.h1, emptyLinks: info.emptyButtons, errors })
    await page.close()
  }
  await ctx.close()
}

// Every internal link must resolve to a real page (the SPA renders NotFound for unknown paths).
const ctx = await browser.newContext()
const page = await ctx.newPage()
const deadLinks = []
for (const l of links) {
  await page.goto(BASE + l, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(150)
  if (await page.locator('text=THIS PAGE HAS WANDERED OFF').count()) if (!l.includes('does-not-exist')) deadLinks.push(l)
}
await browser.close()

const problems = report.filter((r) => r.overflowPx > 1 || r.errors.length || r.h1Count !== 1 || r.emptyLinks)
await writeFile(`${OUT}/report.json`, JSON.stringify({ base: BASE, checked: report.length, internalLinks: links.size, deadLinks, problems, report }, null, 1))
console.log(`checked ${report.length} page loads, ${links.size} internal links; dead=${deadLinks.length}; problems=${problems.length}`)
for (const p of problems) console.log(JSON.stringify(p))
if (deadLinks.length) console.log('dead:', deadLinks)
