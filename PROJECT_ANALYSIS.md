# Project analysis: TeddyPups U.A.E. reference site

Reference: https://puppy.instabizweb.com/
Inspected on 25 Nov 2026 in a real browser (Claude's built-in browser pane), at desktop (~1024–1280px wide) and mobile (375×812) viewports. Page text, DOM structure, computed styles, image URLs and stylesheet custom properties were read straight from the live pages. Details of the method are in `DEVELOPMENT_LOG.md`.

The reference is a Next.js (App Router, Turbopack) site. It uses `next/image` and serves media from `/media/<id>/<hash>/<file>`.

---

## 1. Pages and routes

| Route | Title | Notes |
|---|---|---|
| `/` | TeddyPups U.A.E. — Premium teacup puppies in Dubai | A long scene-by-scene story page that moves from day to dusk to night (8 scenes) |
| `/puppies` | Available puppies | Has filter chips (`?origin=`, `?breed=`), a grid of 15 puppies, an empty state, and a "gone home" strip |
| `/puppies/:slug` (15 available) | `<Name>, <Breed> puppy` | Photo gallery, facts card, WhatsApp CTA, "what comes with", "the way home" (4 import steps), enquiry form, prev/next pup |
| `/puppies/:slug` (27 gone home) | same | Same gallery and facts, then "Looking for a puppy like this?" in place of the steps and form |
| `/gone-home` | Gone home | 27 "one ticket home" cards |
| `/happy-families` | Happy families | Testimonial note and a wall of 64 taped polaroids |
| `/how-it-works` | How it works | Anchor chips (1–4), a "Two ways home" tab switcher (In Dubai / Imported), puppy promise, Delivery & collection (`#delivery`), Why choose us |
| `/faq` | Questions & answers | Search box, a cork board of 9 accordion notes, "Ask your own question" |
| `/contact` | Visit & contact | Fill-in-the-blanks letter form, WhatsApp, call, email, a "Visit us" showroom card, Google Maps link |
| any other path | Page not found (HTTP 404) | A "LOST: this page has wandered off" poster with tear-off link tabs |

Query parameters seen in links: `/puppies?origin=local|imported` and `/puppies?breed=maltipoo|pomeranian|poodle|cavapoo|shih-tzu`. `?origin=local` currently returns **0 puppies**, because all 15 are "Imported for you". The reference then shows: "0 puppies match / No puppies match just now." with *Ask on WhatsApp* and *Show all puppies*.

## 2. Global components

- **Header**: a cream bar with a scalloped bottom edge. It holds the round logo (48px), centred nav links (the active one gets toffee text and a small paw under it), and a green pill "WhatsApp us". On mobile it shows the logo, the word "TeddyPups" and a "Menu" pill with a paw icon. The menu opens a full-screen overlay titled *where to, friend?*.
- **Mobile bottom bar** (fixed, `--bar-h: 4rem + safe area`): a green pill "WhatsApp us" and an outline pill "Call" (`tel:`).
- **Footer**: very dark cocoa `#24130b`, a starry sky with a crescent moon and a wavy top edge. It contains:
  - "Home, at last." with the about text and a mascot in a basket;
  - **Explore** (7 links);
  - **Say hello** (WhatsApp, email, address, and Instagram / TikTok / Facebook pills);
  - a bottom row with "© 2026 TeddyPups U.A.E." and *every puppy is family*.
- **Mascot**: an apricot teddy-poodle drawn in inline SVG. It appears all over the site: walking along the bottom of scenes, beside headings, and on the loading screen. It is the reference's own artwork (`pup-buddy` SVGs).
- **Loading screen**: the mascot trots across a cream lattice background above *every puppy is family*. It shows on hard loads.
- **Custom cursor**: a paw (`/cursor/paw.svg`), with a "pressed" variant shown on click.
- **WhatsApp chat widget**: built into the home "journey" scene.

## 3. Homepage, section by section (desktop heights ≈ 1024px viewport)

1. **Hero** (`tp-hero`, ~690px): the eyebrow *every puppy is family* in Shantell Sans with a hand-drawn squiggle. H1 "Premium teacup puppies in Dubai" (Fraunces 800, 84px, −2.1px tracking). Sub-copy. Toffee pill "View available puppies" (solid cocoa drop shadow 0 8px 0 −2.4px) and an outline pill "Enquire on WhatsApp". A row of arched photo "windows" of 7 puppies stands on a waffle-patterned scalloped ledge, with the mascot's head in the middle. Hovering a window shows a breed tag.
2. **Meet the pups** (`tp-meet`, ~3190px; pinned horizontal scroll): "Meet the pups" and "See all available puppies". 15 arched doors sit on a wooden floor. Each door has a name, a description and an "Available" tag, and swings open to show the puppy photo as the mascot walks past. Ends with "Meet them all".
3. **Two ways to meet your puppy** (`tp-paths`, ~940px): a wooden signpost reading *Puppies in Dubai* / *Imported for you*.
   - Left: a shop with a striped awning framing the showroom photo ("In our showroom"), a city skyline, and "Meet local puppies".
   - Right: a plane flying a dotted path from Korea to Dubai, and "See imported puppies".
4. **Your puppy journey** (`tp-chat`, ~1470px, sticky phone): three numbered steps, each highlighted as you scroll. A WhatsApp-style phone shows "TeddyPups U.A.E. online/typing…", a greeting bubble, breed quick-reply chips, puppy photos and a video, and a "Say hello on WhatsApp" composer. Ends with an outline "How it works" button.
5. **Why families trust TeddyPups** (`tp-passport`, ~800px): an open "puppy passport" book with 4 ink stamps, on an orange dusk background with a skyline and a setting sun.
6. **Happy families & puppies** (`tp-dusk`, ~1360px): a toffee header band, a wood-panel wall with hanging polaroids (8 captions), a testimonial, a lamp post, a door and "See every happy family".
7. **Questions, answered** (`tp-night`, ~560px): a dark brown starry night with 3 Q&As marked by sparkle bullets, "Read all questions", and the mascot with a "?".
8. **Ready to meet your new best friend?** (`tp-home`, ~860px): a house front at night with an arched door, a "welcome home" mat, potted shrubs and a wall lamp. Buttons "Enquire on WhatsApp" (green) and "Visit & contact" (outline, light).

## 4. Component inventory (implemented as reusable React components)

`Header`, `MobileMenu`, `MobileBar`, `Footer`, `Button` (toffee / outline / green / ghost-light), `Img` (local→remote fallback), `Pup` (mascot), `Eyebrow`, `Squiggle`, `PuppyCard` (sketched circle frame), `DoorCard`, `TicketCard`, `Polaroid`, `FilterChips`, `Gallery` (prev/next and counter), `FactsCard`, `StepsRow`, `Accordion` (FAQ note), `EnquiryForm`, `LetterForm`, `PageHero`, `WaveEdge`, `Stars`, `Skyline`.

## 5. Design system (taken from the reference's CSS custom properties)

| Token | Value |
|---|---|
| toffee | `#c2622b` |
| toffee-deep (primary buttons) | `#a24a1a` |
| toffee-ink | `#8e3f15` |
| honey | `#f2be6b` |
| honey-soft | `#fbe3b4` |
| cocoa (text) | `#2a170e` |
| cocoa-soft | `#5a3a28` |
| milk (page bg) | `#fffdf8` |
| footer bg | `#24130b` |
| sky / sky-deep | `#bfddf5` / `#2f6e9e` |
| blush | `#f9cdbf` |
| WhatsApp green (measured from buttons) | ≈ `#1f7a4c` |

- **Fonts**: Fraunces (display, 800, soft/wonky axes), Figtree (body/UI, 400–700), Shantell Sans (handwritten eyebrows and captions).
- **Type scale (desktop)**: H1 ≈ 84px / 0.92 line-height / −0.025em; H2 ≈ 64px / 0.92; H3 ≈ 22–28px; body 16–17px; buttons 17px / 650.
- **Buttons**: pill (`999px`), padding 13.6×25.6px, solid offset shadow `0 8px 0 -2.4px cocoa` that compresses on press.
- **Radii**: cards 1–1.5rem with 2px cocoa outlines; "paper" cards cast a hard offset shadow.
- **Easing**: pounce `cubic-bezier(.34,1.56,.64,1)`, silk `cubic-bezier(.22,1,.36,1)`, snap `cubic-bezier(.7,0,.2,1)`.
- **Containers**: max-width ≈ 80rem (7xl), side padding 2rem desktop / 1.25rem mobile.
- **Textures**: a faint paw-print pattern (toffee at 9% opacity), fractal noise grain, lattice/waffle patterns.
- **Breakpoint**: Tailwind defaults. The nav collapses below `md` (768px).

## 6. Functional requirements observed

- Every enquiry route goes to WhatsApp `https://wa.me/919898124987?text=…` with a prefilled message. Per-puppy messages name the puppy.
- The puppy filters update the URL query string. There is a "Clear filters" link and a live count ("15 puppies looking for a home" / "0 puppies match").
- Gallery: arrows, an "n / N" counter and a video badge.
- Enquiry form (detail page):
  - Fields: Your name\*, Phone or WhatsApp\* (hint: *With country code*), Email (optional), Your area (optional), Message (optional, prefilled).
  - Also a hidden honeypot "Website" field, and "Send enquiry".
- Letter form (contact): fill-in-the-blank inputs inside prose, a puppy `<select>` listing all 15, a message, and "Post my letter".
- FAQ: accordion notes and a filter-as-you-type search ("sniff out a question").
- How it works: the tabs switch between the local and imported journeys, and the chips jump to the anchors.
- `tel:`, `mailto:` and the Google Maps links.
- I did **not** submit the reference's forms, so as not to send fake enquiries to a real business. Where they deliver is therefore unverified.

## 7. Responsive behaviour

- At 375px the hero stacks, the buttons go full-width, and the arch row is cropped at the edges. The nav becomes a Menu pill and overlay, and the bottom WhatsApp/Call bar appears (the footer gets extra bottom padding).
- Grids: puppy cards go 3 columns on desktop, 2 on tablet and 1–2 on mobile; families go 3 / 2 / 1. The facts card and gallery stack on mobile.

## 8. Asset inventory

- **Logo**: `/brand/logo.png` (round, 64px source).
- **Puppy photos**:
  - 15 available puppies have 2–11 photos each (55 in total);
  - 27 gone-home puppies have 1–6 photos each (75 in total).
  - Covers are portrait. Cards crop them to circles or arches; galleries are ~4:5.
- **Family photos**: 64, mostly portrait phone shots (~0.9 aspect on cards).
- **Showroom**: 4 stills (`…f000–f003.jpg`) and 1 video (`…-720p.mp4`).
- **Videos**: Max's video, and the showroom video in the chat widget. The other listings with videos load their sources client-side, and their URLs could not be resolved from the HTML.
- **Illustrations**: all inline SVG (mascot, doors, signpost, plane, skyline, passport, house). These are the reference's own artwork. **The clone redraws them as original SVG in the same style** rather than copying the reference's SVG markup.

## 9. Uncertainties and inaccessible features

- **Phone number mismatch**: the reference shows +971 50 000 0000, but its WhatsApp links go to +91 98981 24987. The clone reproduces both exactly as found.
- **Social links** all point to instabizweb.com, the template author. They are reproduced as found.
- **Email** is Cloudflare-obfuscated in the HTML; it decodes to info@instabizweb.com.
- **Form delivery backend**: unknown and not tested (see §6). The clone uses its own `/api/enquiry` function, which needs mail credentials to deliver. Without them it says so honestly and offers WhatsApp.
- **Exact scroll choreography**: the timing of the pinned scenes, the door-opening timing and the mascot walk cycle are approximated, not frame-matched.
- **Per-listing videos**: only Max's and the showroom video URLs were recoverable.
- **Photo rights**: the photos belong to the reference site. They are used only to reproduce it for this evaluation exercise.
