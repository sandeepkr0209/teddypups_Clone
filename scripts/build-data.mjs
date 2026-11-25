// One-off generator: turns the raw reconnaissance extraction (scripts/raw-puppies.json)
// into the clean data module the app imports (src/data/puppies.generated.json).
// Run: node scripts/build-data.mjs
import { readFileSync, writeFileSync } from 'node:fs'

const raw = JSON.parse(readFileSync(new URL('./raw-puppies.json', import.meta.url)))

const toObj = (r, status) => {
  const [slug, name, breed, sex, age, colour, where] = r
  const imgs = (status === 'available' ? r[8] : r[7]).split(',')
  return { slug, name, breed, sex, age, colour, where, status, hasVideo: status === 'available' ? r[7] : false, images: imgs }
}

const available = raw.available.map((r) => toObj(r, 'available'))
const gone = raw.gone.map((r) => toObj(r, 'gone'))
const all = [...available, ...gone]

// Detail pages on the reference also render prev/next thumbnails; strip any image
// that is another puppy's cover so each gallery only holds that puppy's own photos.
const covers = new Map(all.map((p) => [p.images[0], p.slug]))
for (const p of all) {
  p.images = [...new Set(p.images)].filter((img, i) => i === 0 || !covers.has(img) || covers.get(img) === p.slug)
}

writeFileSync(new URL('../src/data/puppies.generated.json', import.meta.url), JSON.stringify({ available, gone }, null, 1))
console.log(`available=${available.length} gone=${gone.length} images=${all.reduce((n, p) => n + p.images.length, 0)}`)
