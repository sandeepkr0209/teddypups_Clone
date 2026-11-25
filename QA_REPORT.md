# Testing and QA report

## 1. Local production build (completed)

| Check | Tool | Result |
|---|---|---|
| Dependency install | `npm install` | ✅ clean |
| Lint | `oxlint src api scripts` | ✅ 0 warnings |
| Production build | `vite build` | ✅ built in about 0.6s. Main JS is 541 kB (177 kB gzip), CSS is 65 kB (13 kB gzip), and 7 lazy page chunks |
| Unit tests: API and validation | `npm test` (node:test) | ✅ 7/7 |
| Routes × viewports (375 / 768 / 1280 / 1680) | `scripts/qa.mjs` | ✅ 88 page loads, 0 console errors, every page has exactly one `<h1>`, no empty links |
| Horizontal overflow | `scripts/qa.mjs` | ✅ none above 1px. A 1px sub-pixel rounding at 768px on `/puppies` is invisible, and `overflow-x: clip` prevents scrolling |
| Internal link crawl | `scripts/qa.mjs` | ✅ 51 unique internal links, 0 dead |
| Forms and interactions | `scripts/qa-forms.mjs` | ✅ 12/12 (listed below) |

### Interaction checks (`scripts/qa-forms.mjs`)

1. An empty enquiry shows the *name* and *phone* errors and sends no request.
2. An invalid phone (`12ab`) and an invalid email (`aisha@`) are rejected with specific messages.
3. With the backend not configured (503), the form shows **"Your enquiry was not sent"**. Its WhatsApp link goes to `wa.me/919898124987` and contains the name, the puppy and the phone number.
4. On confirmed delivery (200 `{ok:true}`), the success message appears and the button is disabled.
5. The contact letter form validates and lists its errors.
6. The contact letter form posts the selected puppy with `source: contact-letter`.
7. The FAQ accordion toggles `aria-expanded`, and search narrows the notes.
8. The *Shih Tzu* filter changes the URL to `?breed=shih-tzu` and shows "2 puppies match". *Clear filters* brings back 15.
9. `?origin=local` shows the reference's empty state, and *Show all puppies* clears it.
10. The gallery shows a 1 / 11 counter, the next and previous arrows work, and it wraps to 11 / 11.
11. The How-it-works *Imported* tab shows "Order upon request".
12. The mobile menu opens (*where to, friend?*), navigates to `/faq` and closes.

### Accessibility basics

- Skip link and visible focus rings.
- Real `<button>` and `<a>` elements; `aria-expanded` and `aria-controls` on the accordion and menu; `role="tablist"` and `tab` on How-it-works; `aria-pressed` on the filter chips.
- `aria-live` on the result counts and the gallery counter.
- Labelled inputs, including the inline blanks in the letter.
- `prefers-reduced-motion` is respected: framer `MotionConfig reducedMotion="user"`, CSS animation kill, and the non-pinned "Meet the pups" variant.

## 2. Visual comparison with the reference

Inspected in the browser before building:

- the reference at desktop (about 1024–1280px) and at 375×812;
- every route;
- each homepage scene screenshotted separately.

The clone matches the reference on:

- the token values (colours, fonts, button metrics, easings);
- section order and copy;
- route structure and puppy data.

**Pending**: a side-by-side at equal viewports with photos loaded is done on the deployed URL, because the build workspace cannot load the reference's images. Results go in §3.

## 3. Deployed site

_To be completed after the Vercel deployment:_

- [ ] Production URL loads.
- [ ] Every route works on direct load and refresh (SPA rewrite).
- [ ] Images are served from `/img/*.webp`. Check the build log line `[assets] N images: … downloaded`.
- [ ] Mobile 375px and desktop 1280px layouts work.
- [ ] Without email env vars, `POST /api/enquiry` returns 503 `not_configured`, and the UI shows the WhatsApp fallback.
- [ ] Side-by-side screenshots against the reference.
