# TeddyPups U.A.E.: website clone

A complete, responsive, multi-page React clone of **https://puppy.instabizweb.com/**, a story-driven site for a Dubai teacup-puppy boutique. Built as the *Complete Website Clone* assignment for the Full-Stack AI Engineer role at **Blutec AI**.

| | |
|---|---|
| **Live site** | _DEPLOY_URL_ |
| **Repository** | _REPO_URL_ |
| **Reference** | https://puppy.instabizweb.com/ |

---

## What's implemented

**Pages (all reference routes):**
- `/`, the 8-scene homepage that moves from morning to night;
- `/puppies`, with filters;
- `/puppies/:slug`, 42 detail pages: 15 available and 27 already gone home;
- `/gone-home`;
- `/happy-families`, with 64 photos;
- `/how-it-works`, with tabs and anchors;
- `/faq`, with search and accordion;
- `/contact`, a fill-in-the-blanks letter form;
- a 404 "LOST" poster.

**Features:**

- **Design system** taken from the reference's own CSS custom properties: toffee/honey/cocoa/milk palette, Fraunces + Figtree + Shantell Sans, pill buttons with a hard offset shadow, paw-print texture, and a custom paw cursor.
- **Homepage scenes**:
  - hero with arched puppy windows and an auto-cycling breed tag;
  - a pinned horizontal "Meet the pups" walk whose 15 doors open as you scroll;
  - signpost "Two ways" with an animated flight path;
  - WhatsApp-style phone that reacts to the step you're reading;
  - "puppy passport" stamps at dusk;
  - hanging polaroids on a wood wall;
  - starry FAQ;
  - "welcome home" house.
- **Puppy listing** with filters that live in the URL:
  - `?origin=imported|korean-teacup|local`, `?breed=`, `?sex=`;
  - a live count, "Clear filters", the reference's own empty state, and a "gone home" strip.
- **Puppy detail pages**:
  - swipe/keyboard gallery with an `n / N` counter, plus video where the reference has a recoverable video URL;
  - facts card and per-puppy WhatsApp message;
  - "what comes with" checklist, import steps, enquiry form, and previous/next pup.
- **Forms with honest delivery**:
  - client and server validation (required name, phone with country code, optional email format) and a honeypot;
  - a serverless `/api/enquiry` that emails via Resend **only when configured**;
  - otherwise the UI says *"Your enquiry was not sent"* and offers a one-tap WhatsApp message prefilled with everything the visitor typed. It never fakes a success.
- **Global**: sticky scalloped header with an active-paw indicator, full-screen mobile menu (*where to, friend?*), fixed mobile WhatsApp/Call bar, starry footer, skip link, focus styles and `prefers-reduced-motion` support.
- **Responsive** from 360px to 1680px+. On phones the pinned scroll becomes a swipeable door row.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 19 + Vite 8 | Fast builds; the assignment's requested stack |
| Styling | Tailwind CSS v4 (`@theme` tokens) | Design tokens live in one place (`src/styles/index.css`) |
| Routing | React Router 7 (data router, lazy routes) | Secondary pages are code-split |
| Motion | Framer Motion | Scroll-linked transforms (`useScroll`), layout animations, presence |
| Icons | Lucide React | Already requested; tree-shaken |
| Fonts | `@fontsource-variable/*` | Self-hosted, no third-party font requests |
| Backend | One Vercel serverless function (`api/enquiry.js`) | Only real backend need is form delivery |
| QA | `node:test`, Playwright (`playwright-core` + system Chrome) | Unit tests for the API; route, viewport and interaction checks |

## Project structure

```
api/enquiry.js               serverless form endpoint (validation, honeypot, Resend email)
scripts/
  fetch-assets.mjs           prebuild: mirrors reference photos into public/img (WebP)
  build-data.mjs             turns the raw reconnaissance extraction into src/data JSON
  raw-puppies.json           raw extraction from the reference (slugs, facts, image paths)
  qa.mjs / qa-forms.mjs      Playwright QA: routes × viewports, links, overflow, forms
src/
  components/
    common/                  Button, Img (local→remote fallback), Pup (mascot), Gallery,
                             FilterChips, StepsRow, Eyebrow, Decor (stars, skyline, waves…)
    layout/                  Header, MobileMenu, MobileBar, Footer, Layout (scroll manager)
    sections/home/           Hero, MeetThePups, TwoWays, Journey, Passport,
                             FamiliesWall, FaqPreview, HomeCta
    cards/                   PuppyCard, DoorCard, TicketCard, Polaroid
    forms/                   EnquiryForm, FormStatus
  pages/                     one file per route
  routes/                    router definition
  hooks/                     useEnquiryForm, useMediaQuery, useDocumentTitle
  services/                  enquiry API client + WhatsApp fallback builder
  data/                      site copy, puppies (generated), media paths
  utils/                     asset keys, validation (shared with the API)
  styles/index.css           Tailwind import + design tokens + textures
tests/enquiry.test.mjs       API + validation unit tests
docs/                        master prompt, QA report
PROJECT_ANALYSIS.md · DEVELOPMENT_LOG.md · LOOM_PRESENTATION_SCRIPT.md · QA_REPORT.md
```

All repeated content is data-driven: puppies, families, FAQ, steps, trust stamps and navigation.

## Getting started

```bash
npm install
npm run dev            # http://localhost:5173
```

In development, photos load from the reference site (the `<Img>` fallback). They are only mirrored locally by the production build.

### Build

```bash
npm run build          # runs scripts/fetch-assets.mjs (prebuild), then vite build
npm run build:offline  # vite build only, skipping the photo download
npm run preview
```

### Tests and QA

```bash
npm test                                   # API + validation unit tests
npm run build && npm run preview &         # then, with Chrome installed:
BASE=http://localhost:4173 node scripts/qa.mjs        # 88 page loads × 4 viewports
BASE=http://localhost:4173 node scripts/qa-forms.mjs  # forms + interactions
```

## Environment variables

These are only needed to make the enquiry forms deliver email. All are server-side. See `.env.example`.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `ENQUIRY_TO_EMAIL` | Inbox that receives enquiries |
| `ENQUIRY_FROM_EMAIL` | Optional verified sender (defaults to `onboarding@resend.dev`) |

Without them, `/api/enquiry` returns `503 not_configured`, and the forms tell the visitor so and offer WhatsApp instead.

## Deployment (Vercel)

1. Import the GitHub repo in Vercel. The framework preset is detected as **Vite**: build command `npm run build`, output `dist`.
2. Optionally add the environment variables above.
3. `vercel.json` rewrites every non-asset path to `index.html`, so client-side routes work on direct load and refresh. It also gives mirrored images a one-year immutable cache.

## Images

The photos belong to the reference site and are used only to reproduce it for this evaluation.

During the Vercel build, `scripts/fetch-assets.mjs` downloads each photo once through the reference's own image optimiser, as WebP at the size it is displayed. The files are saved to `public/img/`, so the deployed clone serves them from its own domain instead of hotlinking.

If a download fails, `<Img>` falls back to the original URL, so no image is ever broken.

The illustrations (mascot, doors, signpost, plane, passport, house, skyline) were **redrawn from scratch as original SVG** in the reference's style, rather than copied from its markup.

## Screenshots

See `docs/screenshots/` (captured from the live deployment).

## Known limitations

- **Scroll choreography** (pinned "Meet the pups", door timing, mascot walk) is approximated, not frame-matched.
- **Videos**: only Max's and the showroom video URLs could be recovered. The other "▶ video" listings show the badge but have no playable video.
- **Videos are streamed** from the reference origin; they are too large to mirror at build time.
- **404 status**: unknown URLs render the 404 page but return HTTP 200. This is the usual SPA behaviour on a static host; the reference returns a real 404.
- **Enquiry email** needs a Resend account (see above). Until then, WhatsApp is the working channel, as it is on the reference.
- **Reference quirks reproduced exactly as found**:
  - the phone number shown is +971 50 000 0000, but WhatsApp links go to +91 98981 24987;
  - the social links point to instabizweb.com.
- **Bundle size**: the main bundle is ~177 kB gzipped (React, Router, Framer Motion and all homepage scenes). The secondary pages are split out.
