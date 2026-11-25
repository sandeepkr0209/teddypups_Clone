# Development log

This log is a factual record of how the clone was built, including what was AI-generated.

## AI tools used: summary

| Tool | Role |
|---|---|
| **Claude (Anthropic), Opus 5.5**, run as an autonomous agent in the Claude app with a Linux workspace, shell, file tools and a browser pane | Did the reconnaissance, wrote all the code and docs, ran builds and tests, and ran the browser QA |
| Claude's built-in browser pane (driven by Claude) | Inspected the live reference site: DOM, computed styles, CSS variables, page text, image URLs, viewports |
| Playwright (`playwright-core` + system Chrome), scripted by Claude | Automated route, viewport, link, overflow and form QA on the local production build |

**Honesty note.** Claude generated essentially all of the source code, illustrations (SVG), copy wiring and documentation in this repository, working from the single master prompt below.

The candidate's part was:

- writing and supplying that prompt;
- creating the GitHub repository and the Vercel project, which need the candidate's own accounts;
- reviewing the result.

Anything the candidate later changes by hand should be added to the "Manual changes" section at the end.

## Exact prompts

1. **Master prompt.** It was given to Claude as an attached text file with no other message. It is reproduced verbatim in [`docs/MASTER_PROMPT.md`](docs/MASTER_PROMPT.md).
2. **Later prompts from the candidate.** _None yet at the time of writing. Add any follow-up instructions here verbatim._

Claude also wrote its own "prompts" to tools during the session: browser JavaScript snippets used to extract data, and shell commands. The important ones are summarised under each phase below.

---

## Phase 1: Reconnaissance (browser)

- The workspace shell could not reach `puppy.instabizweb.com`: its egress proxy returned 403. All inspection was therefore done in Claude's built-in browser pane on the candidate's machine.
- Steps:
  - Read the page text of every route.
  - Took screenshots at desktop and 375×812 mobile, scrolling scene by scene.
  - Opened the mobile menu.
  - Switched the How-it-works tab to read the "Imported" content.
  - Loaded `/puppies?origin=local` to capture the empty state, and an unknown URL to capture the 404 page.
- In-page JavaScript extracted:
  - every `<img>` with its natural and rendered size and `next/image` source path;
  - computed fonts and colours, and button and heading metrics;
  - the `--color-*`, `--font-*` and `--ease-*` custom properties from the reference stylesheets;
  - section offsets and heights for each homepage scene.
- A script fetched every puppy detail page (15 available and 27 gone home) with `fetch()` and parsed it with `DOMParser`. It recorded the facts (`<dt>/<dd>`), the gallery image paths and the video URLs. It also collected all 64 Happy-families photo paths.
- Output: `PROJECT_ANALYSIS.md` and `scripts/raw-puppies.json`.

**Decision.** The forms on the reference were *not* submitted, so that no fake enquiries were sent to a live business. Their backend is recorded as unverified.

## Phase 2: Stack and scaffolding

- `npm create vite` (React template), Tailwind v4 via `@tailwindcss/vite`, React Router 7, Framer Motion and Lucide.
- **Fonts**: the reference loads Fraunces, Figtree and Shantell Sans from Google. Google Fonts were also blocked from the workspace, so the clone **self-hosts** them through `@fontsource-variable/*`, with the Fraunces `SOFT`/`WONK` axes. This is better for privacy and performance, and keeps the same typefaces.
- `scripts/build-data.mjs` turns the raw extraction into `src/data/puppies.generated.json`.
  - **Problem**: each detail page on the reference also renders its previous and next puppy's cover, so the raw gallery lists contained neighbours' photos.
  - **Fix**: any image that is another puppy's cover is dropped from a gallery, unless it is that puppy's own cover.

## Phase 3: Design system

- The tokens were copied verbatim from the reference CSS into Tailwind `@theme`: toffee `#c2622b`, toffee-deep `#a24a1a`, honey `#f2be6b`, cocoa `#2a170e`, milk `#fffdf8`, and the pounce/silk/snap easings.
- Measured values were reused: H1 84px / 800 / −0.025em, and buttons at 17px / 650 with padding 13.6×25.6 and shadow `0 8px 0 -2.4px cocoa`.
- Textures (the paw pattern and fractal-noise grain) were rebuilt as inline SVG data URIs. The paw cursor and favicon are new SVGs.

## Phase 4: Building the pages

- **Mascot ("Teddy")**: the reference's mascot is its own inline-SVG artwork. Claude drew an original teddy-poodle in SVG (`Pup.jsx`), in three variants (sit, walk, head) with a wagging tail and a trotting animation, instead of copying the reference's markup. The same applies to the doors, signpost, plane, passport stamps, house, lamp and skyline.
- **"Meet the pups"**: a pinned section whose height is 100vh plus the track overflow. `useScroll` drives the track's `x`, and each door gets its own `useTransform` window, so it swings open as it crosses about 62% of the viewport.
  - On mobile, and with reduced motion, this becomes a native scroll-snap row whose doors open on hover or focus.
- **Journey phone**: `useInView` on each step sets a stage, and the chat stage reveals the greeting, then the breed quick-replies (real links to `/puppies?breed=`), then the showroom media.
- **Filters**: the state lives in the URL (`useSearchParams`) so filtered views can be linked, which matches the reference's `?origin=` and `?breed=` links. The breed match is a substring match, so "Toy Poodle" and "Korean Teacup Poodle" both count as Poodle.
- **Images** (`Img.jsx` and `scripts/fetch-assets.mjs`):
  - **Problem**: the workspace couldn't download the photos.
  - **Fix**: download them at build time on Vercel, through the reference's own `/_next/image` optimiser (WebP, display-sized), into `public/img/`. `<Img>` falls back to the original URL on error, so the site never shows a broken image, even if the mirror fails.
- **Forms**:
  - `useEnquiryForm` is a shared state machine: idle → submitting → sent or failed.
  - `utils/validation.js` is shared by the client and the API.
  - `api/enquiry.js` is a Vercel function with a honeypot, re-validation and control-character stripping. It emails via Resend only when the environment variables are set. Otherwise it returns `503 not_configured`, and the UI says *not sent* and offers a prefilled WhatsApp message. This follows the brief's rule: don't claim an enquiry was submitted when there is no delivery.
- **Routing**: a data router with `lazy` routes for the secondary pages, a scroll manager that handles `#hash` targets (`/how-it-works#delivery`), and `vercel.json` SPA rewrites.

## Phase 5: Problems found in QA and how they were fixed

| Problem | Cause | Fix |
|---|---|---|
| Mobile pages laid out at 452px wide | `className="hidden … md:inline-flex"` on `<Button>` lost to the component's own `inline-flex`, so the header WhatsApp button showed on mobile and pushed the Menu button off-screen | Wrapped it in a `hidden md:block` container |
| Puppy detail 7px too wide on mobile | The gallery's stacked-paper offsets (`translate-x-3`) went past the container | Added a matching right/bottom margin |
| Hero arches too small on phones | Clamp minimums were tuned for no overflow | Raised the minimums and let the row crop at the edges, as the reference does on mobile |
| Broken-image alt text visible when offline | Browser default | Alt text is made transparent once both the local and remote sources fail |
| Main bundle 602 kB | All pages in one chunk | Lazy routes, now 541 kB (177 kB gzip) |
| `oxlint` warnings | setState in an effect, impure `Date` in render, control-char regex | Removed the effect (links close the menu), moved the year to module scope, added a documented disable |
| QA: mobile menu test flaked | The exit animation keeps the dialog mounted briefly | The test waits for the dialog to detach |

## Phase 6: Testing performed

- `npm test`: 7 unit tests covering validation, 405/422/503/502/200 paths, the honeypot, and the Resend call shape. Network is mocked. **All pass.**
- `scripts/qa.mjs` (Playwright and Chrome, local production build):
  - 88 page loads: 10 key routes at 4 viewports (375, 768, 1280, 1680) and all 42 puppy pages at desktop;
  - for each: console errors, horizontal overflow, one `<h1>` per page, empty links, and screenshots;
  - plus a crawl of all 51 internal links.
  - **Result**: 0 console errors, 0 dead links, 0 overflow above 1px. A 1px sub-pixel rounding shows at 768px on `/puppies`, with no visible scroll.
- `scripts/qa-forms.mjs`: 12 interaction checks. They cover:
  - required and format validation;
  - the honest failure path and its WhatsApp link content;
  - the success path;
  - the letter form's puppy select;
  - FAQ accordion and search;
  - filters and URL;
  - the empty state;
  - gallery wraparound;
  - tabs;
  - the mobile menu.
  - **All pass.**
- **Limit**: the workspace browser can't load the reference's photos (blocked by the proxy), so local screenshots show placeholders. The visual side-by-side with the reference is done on the deployed site (see `QA_REPORT.md`).

## Phase 7: Deployment

The candidate's own accounts are required:

1. The candidate creates an empty GitHub repo. Claude pushes the code, or the candidate pushes it from the provided bundle.
2. Vercel → Add New → Project → import the repo. The Vite preset is detected automatically.
3. Claude verifies the live URL: every route on direct load, mobile and desktop, images served from `/img/`, and the forms.

_Status and URLs are recorded in `README.md` and `QA_REPORT.md` once done._

## Manual changes by the candidate

_None yet._
