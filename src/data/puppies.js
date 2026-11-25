import data from './puppies.generated.json'
import { videos } from './media'

const withVideo = (p) => ({ ...p, video: videos[p.slug] ?? null })

export const availablePuppies = data.available.map(withVideo)
export const goneHomePuppies = data.gone.map(withVideo)
export const allPuppies = [...availablePuppies, ...goneHomePuppies]

export const getPuppy = (slug) => allPuppies.find((p) => p.slug === slug)

/** Card title: the puppy's name if it has one, otherwise its breed (as on the reference). */
export const titleOf = (p) => p.name || p.breed
export const sexWord = (p) => p.sex.toLowerCase()
export const isLocal = (p) => p.where === 'In Dubai'

/** "Maltipoo · boy · 3 months" for named pups, "girl · 2 months" otherwise. */
export const metaLine = (p, sep = ' · ') => [p.name ? p.breed : null, sexWord(p), p.age].filter(Boolean).join(sep)

export const altOf = (p) => {
  const sex = p.sex === 'Boy' ? 'Male ' : p.sex === 'Girl' ? 'Female ' : ''
  return p.name ? `${p.name}, ${sex.toLowerCase()}${p.breed} puppy` : `${sex}${p.breed} puppy`
}

export const enquiryText = (p) =>
  `Hi TeddyPups! I'm interested in ${p.name ? `${p.name} (${p.breed})` : `the ${p.breed} (${sexWord(p)})`}. Could you share more details?`

export const contactLabel = (p) => (p.name ? `${p.name} (${p.breed}, ${sexWord(p)})` : `${p.breed} (${sexWord(p)})`)

// ---- Filters (/puppies?origin=&breed=&sex=) ----
export const FILTERS = {
  origin: [
    { value: '', label: 'Everywhere' },
    { value: 'imported', label: 'Imported' },
    { value: 'korean-teacup', label: 'Korean Teacup' },
  ],
  breed: [
    { value: 'maltipoo', label: 'Maltipoo' },
    { value: 'pomeranian', label: 'Pomeranian' },
    { value: 'poodle', label: 'Poodle' },
    { value: 'cavapoo', label: 'Cavapoo' },
    { value: 'shih-tzu', label: 'Shih Tzu' },
  ],
  sex: [
    { value: 'boy', label: 'Boys' },
    { value: 'girl', label: 'Girls' },
  ],
}

export function filterPuppies(list, { origin, breed, sex }) {
  return list.filter((p) => {
    if (origin === 'local' && !isLocal(p)) return false
    if (origin === 'imported' && isLocal(p)) return false
    if (origin === 'korean-teacup' && !p.breed.includes('Korean Teacup')) return false
    if (breed && !p.breed.toLowerCase().includes(breed.replace('-', ' '))) return false
    if (sex && !p.sex.toLowerCase().includes(sex)) return false
    return true
  })
}
