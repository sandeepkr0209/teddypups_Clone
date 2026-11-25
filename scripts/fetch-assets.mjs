// Build-time asset fetcher (runs as `prebuild`, i.e. on Vercel before `vite build`).
//
// Downloads the reference site's photos once, resized/compressed to WebP by the
// reference's own Next.js image endpoint, into public/img/ so the deployed clone
// serves them from its own domain instead of hotlinking.
// Failures are non-fatal: <Img> falls back to the original URL at runtime.
import { mkdir, writeFile, access } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { assetKey, ORIGIN, sizeFor } from '../src/utils/assetKey.js'

const data = JSON.parse(readFileSync(new URL('../src/data/puppies.generated.json', import.meta.url)))
const { familyPhotos, siteImages } = await import('../src/data/media.js')

const jobs = new Map()
const add = (path, w) => jobs.set(assetKey(path, w), { path, w })
for (const p of [...data.available, ...data.gone]) p.images.forEach((img, i) => { add(img, sizeFor('gallery')); if (i === 0) add(img, sizeFor('card')) })
familyPhotos.forEach((f) => add(f.src, sizeFor('family')))
Object.values(siteImages).forEach((src) => add(src, sizeFor('feature')))
add('/brand/logo.png', 128)

const outDir = new URL('../public/img/', import.meta.url)
await mkdir(outDir, { recursive: true })

let ok = 0, skipped = 0, failed = 0
const queue = [...jobs.entries()]
async function worker() {
  while (queue.length) {
    const [key, { path, w }] = queue.shift()
    const file = new URL(key, outDir)
    try { await access(file); skipped++; continue } catch {}
    const url = `${ORIGIN}/_next/image?url=${encodeURIComponent(path)}&w=${w}&q=75`
    try {
      const res = await fetch(url, { headers: { Accept: 'image/webp,image/*', 'User-Agent': 'teddypups-clone-build' }, signal: AbortSignal.timeout(20000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      await writeFile(file, Buffer.from(await res.arrayBuffer()))
      ok++
    } catch (e) {
      failed++
      console.warn(`[assets] could not fetch ${path} (w=${w}): ${e.message}`)
    }
  }
}
await Promise.all(Array.from({ length: 8 }, worker))
console.log(`[assets] ${jobs.size} images: ${ok} downloaded, ${skipped} cached, ${failed} failed (failed ones fall back to the original URL)`)
