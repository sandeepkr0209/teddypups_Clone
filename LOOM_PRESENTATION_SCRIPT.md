# Loom presentation script (about 7 minutes)

**Before you hit record:**

- Open these tabs:
  1. the live site
  2. the reference (https://puppy.instabizweb.com)
  3. the GitHub repo
  4. VS Code with the project open
  5. `docs/MASTER_PROMPT.md`
- Set the browser to about 1280px wide.
- Have the mobile emulator (DevTools → 375×812) ready.

Times are cumulative. Lines in quotes are the spoken script; *[brackets]* are on-screen actions.

---

### 0:00 – Project overview (30s)

*[Live site homepage, at the top]*

> "Hi, I'm ___. This is my submission for Blutec AI's Full-Stack AI Engineer assignment: a complete clone of TeddyPups U.A.E., a puppy boutique site. It's a React and Vite app deployed on Vercel. It covers every page of the original: the homepage, puppy listings with filters, 42 puppy detail pages, happy families, how it works, the FAQ and contact. The forms work too."

### 0:30 – Reference and requirements (40s)

*[Switch to the reference and scroll it quickly]*

> "The reference is unusual. It isn't a template: the homepage is one illustrated story that goes from morning to night as you scroll. There's a pinned section where doors open onto real puppies, a WhatsApp phone that reacts as you read, a passport with stamps, and a house at night. The brief asked for visual fidelity, full functionality, responsiveness, and honesty about what's real. That shaped every decision."

### 1:10 – Stack and why (40s)

*[README tech-stack table]*

> "React 19 with Vite for speed, and Tailwind v4 because its theme block let me put the reference's exact design tokens in one place. I read those tokens directly from its stylesheet: toffee `#c2622b`, cocoa, honey, Fraunces for headings, Figtree, and Shantell Sans for the handwriting. React Router for routing, Framer Motion for the scroll-linked animation, Lucide for icons. The only backend is a single Vercel function for the enquiry form, because that's the only thing that needs a server."

### 1:50 – Architecture (50s)

*[VS Code, folder tree]*

> "`components` is split into common (buttons, the image component, the mascot, gallery), layout (header, footer, mobile menu), home sections (one file per scene), and cards. `pages` has one file per route. Everything repeated is data-driven: `src/data` holds the puppies, families, FAQs and steps. The puppy data was extracted from the live site by a script and generated into JSON, so there's no hand-typing."

*[Open `PuppyCard.jsx` or `DoorCard.jsx`]*

> "For example, the door card takes a puppy and an optional scroll-driven motion value. On desktop the scroll opens the door; on mobile hover or tap does."

### 2:40 – Routing (30s)

*[`src/routes/index.jsx`, then `vercel.json`]*

> "It's a data router. The homepage is in the main bundle and the other pages are lazy-loaded. Filters live in the URL, so `/puppies?breed=poodle` is shareable. That's how the original links work too. On Vercel, a rewrite sends every non-asset path to `index.html`, so deep links and refreshes work."

### 3:10 – Responsive design (40s)

*[Live site in DevTools at 375px]*

> "On mobile the nav becomes this menu, *where to, friend?*, and a fixed WhatsApp and Call bar appears, both like the original. The pinned horizontal scroll would feel bad on a phone, so it becomes a swipeable row. I tested 375, 768, 1280 and 1680 automatically, checking for horizontal overflow on every page."

### 3:50 – Key functionality (60s)

*[Puppies page: click Shih Tzu, then Clear; open Max; swipe the gallery; click "Ask about Max on WhatsApp" to show the prefilled message; scroll to the form and submit it empty, then filled]*

> "The filters update the count live and include the original's empty state. Each puppy has a gallery with keyboard and swipe support, and a WhatsApp link whose message names that puppy.
>
> The form validates the name, a phone number with country code, and an optional email, on both the client and the server, with a honeypot for bots. One thing I insisted on: it never pretends. If no mail service is configured, it says 'your enquiry was not sent' and offers to send exactly what you typed through WhatsApp in one tap. If you add a Resend key in Vercel, it emails for real."

### 4:50 – Challenges (60s)

> "Three challenges.
>
> First, my build environment couldn't download anything from the reference domain. So I did the inspection in a real browser, extracting styles, data and image paths with in-page scripts. The photos are mirrored at build time on Vercel, through the reference's own image optimiser, and the image component falls back to the original URL if one ever fails. So there are never broken images.
>
> Second, the original's illustrations are its own artwork. Instead of copying its SVG, the mascot and all the scenery were redrawn as original SVG in the same style.
>
> Third, the scroll choreography. Each door gets its own slice of the scroll progress, so it swings open as it passes. QA also caught a real bug: a hidden button was overriding its `hidden` class on mobile and pushing the layout to 452 pixels. I fixed it, and the check now runs on every page."

### 5:50 – AI tools and prompts (50s)

*[Open `docs/MASTER_PROMPT.md`, then `DEVELOPMENT_LOG.md`]*

> "I used Claude by Anthropic as an autonomous agent with a browser, a shell and file access. This is the exact prompt I gave it, unedited. To be transparent: Claude did the reconnaissance, wrote the code and tests, and ran the QA. My role was the brief, the accounts for GitHub and Vercel, and review. The development log records every phase, every problem and fix, and what was AI-generated."

> *Add a sentence here about anything you changed or would change yourself.*

### 6:40 – Testing and deployment (30s)

*[Terminal: `npm test` and `node scripts/qa-forms.mjs`, or show `QA_REPORT.md`]*

> "There are unit tests for the API, Playwright checks across 88 page loads and four viewports, a crawl of all internal links, and 12 interaction tests. Deployment is GitHub to Vercel: push, and it builds and mirrors the images."

### 7:10 – Live demo wrap-up (30s)

*[Live site: scroll the homepage top to bottom, open the footer's "Delivery & collection" link (it jumps to the anchor), then show the 404 page]*

> "That's the full site, from morning to 'home, at last'. Thanks for watching. The repo and live link are in the description."

---

**Recording tips:**

- Use Loom's "Screen + Cam" mode with your camera in a corner.
- Close the notifications panel.
- Zoom the browser to 110% so text is readable.
- If you go over 8 minutes, cut the Architecture section to just the folder tree.
