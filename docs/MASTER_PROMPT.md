# Master prompt given to the AI agent (verbatim)

This is the exact prompt the candidate gave to Claude (Anthropic) to start this project. It is reproduced unchanged.

```text
MASTER PROMPT: AUTONOMOUS FULL-STACK WEBSITE CLONING AGENT

ROLE

Act as a Senior Full-Stack Engineer, UI/UX Designer, Frontend Architect, QA Engineer, and Autonomous Development Agent.

Your task is to independently analyze, develop, test, and deploy a production-quality clone of the following reference website.

Reference Website: https://puppy.instabizweb.com/

Assignment: Complete Website Clone
Company: Blutec AI
Position: Full-Stack AI Engineer

You are responsible for taking this project from initial inspection to final deployment.

Do not simply generate a homepage or a visual mockup. Build a complete, responsive, functional, multi-page website that closely reproduces the reference website.

Work autonomously. Make reasonable engineering decisions without repeatedly asking me for approval.

---

1. PRIMARY OBJECTIVE

Recreate the reference website as accurately as reasonably possible.

The implementation must reproduce:

- Overall design language and branding.
- Layout and section structure.
- Typography and font hierarchy.
- Colors and backgrounds.
- Images and image positioning.
- Spacing, padding, and margins.
- Navigation and menus.
- Buttons, links, and interactions.
- Forms and validation.
- Responsive behavior.
- Footer and secondary pages.
- Animations and transitions where present.

The final website should look and behave like the original website, not like a generic AI-generated template.

Visual fidelity is a major priority.

2. PHASE ONE: COMPLETE WEBSITE RECONNAISSANCE

Before writing code, thoroughly inspect the reference website.

Use your browser automation capabilities to examine every accessible page.

Do not limit your inspection to the homepage.

Tasks:

1. Open the reference website.
2. Identify every navigation item.
3. Visit every accessible internal page.
4. Inspect all homepage sections from top to bottom.
5. Identify reusable page components.
6. Inspect desktop, tablet, and mobile layouts.
7. Test navigation menus and dropdowns.
8. Test all CTA buttons and interactive elements.
9. Inspect puppy listing cards and their details.
10. Inspect forms, FAQ accordions, galleries, and contact sections.
11. Identify WhatsApp links and other external integrations.
12. Record image dimensions, aspect ratios, and visual placement.
13. Identify typography, colors, borders, shadows, and spacing.
14. Document the page hierarchy and routing structure.

Create a file named:

"PROJECT_ANALYSIS.md"

It must contain:

- All identified pages and routes.
- Section-by-section breakdown.
- Component inventory.
- Design system observations.
- Functional requirements.
- Responsive behavior.
- Image and asset inventory.
- Uncertainties or inaccessible reference features.

If a page is inaccessible, investigate available navigation and links before deciding how to handle it. Never invent reference functionality and claim it was verified.

3. PHASE TWO: TECHNOLOGY STACK

Use the following stack unless there is a strong technical reason to change it.

Frontend:

- React
- Vite
- JavaScript or TypeScript
- Tailwind CSS
- React Router DOM
- Lucide React
- Framer Motion where appropriate

Backend:

- Node.js and Express only where actual backend functionality is needed.
- Use appropriate APIs and secure environment variables.
- Avoid unnecessary backend complexity.

Other tools:

- Git and GitHub
- Browser automation
- Vercel for deployment
- Appropriate image optimization tools

Keep the architecture simple, maintainable, and production-ready.

Do not introduce unnecessary libraries.

4. PHASE THREE: DESIGN SYSTEM

Build a consistent design system based on the original website.

Extract and implement:

- Primary and secondary colors.
- Background colors.
- Typography scale.
- Font weights.
- Heading hierarchy.
- Button styles.
- Border radius.
- Shadows.
- Container widths.
- Section spacing.
- Grid layouts.
- Image aspect ratios.
- Responsive breakpoints.

Use CSS variables or Tailwind configuration for shared design tokens.

Do not arbitrarily change the reference design to make it look more modern.

Preserve the original visual identity.

5. PHASE FOUR: COMPLETE WEBSITE DEVELOPMENT

Build all identified pages.

The implementation should include the following wherever present in the reference website:

A. GLOBAL COMPONENTS

- Responsive navigation bar.
- Logo and branding.
- Desktop navigation.
- Mobile navigation menu.
- Reusable buttons.
- Footer.
- WhatsApp floating button.
- Consistent page containers.

B. HOMEPAGE

- Hero section.
- Main headline and supporting text.
- Hero images.
- Primary and secondary CTAs.
- Featured puppies.
- Available puppy sections.
- Purchase process.
- Trust and credibility sections.
- Testimonials.
- Happy family gallery.
- FAQ preview.
- Contact CTA.
- Footer.

C. PUPPY LISTING

- Puppy listing cards.
- Puppy images.
- Breed and other relevant information.
- Availability indicators.
- Filters or sorting if present.
- Individual puppy detail pages if present.
- Enquiry buttons.

D. OTHER PAGES

Reproduce all additional pages discovered during reconnaissance, including any relevant:

- Puppies.
- Happy Families.
- How It Works.
- FAQ.
- Visit and Contact.
- Other accessible internal pages.

Important: The list above is an inspection checklist, not permission to invent pages. Follow the actual reference website.

6. PHASE FIVE: FUNCTIONALITY

Every visible interactive element must work.

Implement and test:

- Internal page navigation.
- Mobile navigation.
- Dropdowns.
- FAQ accordions.
- Image galleries.
- CTA buttons.
- Contact forms.
- Form validation.
- WhatsApp enquiry links.
- Email and telephone links.
- Puppy detail navigation.
- Smooth scrolling where appropriate.
- Loading and error states where necessary.

For contact forms:

- Validate required fields.
- Validate email and telephone formats appropriately.
- Display clear success and error messages.
- Do not falsely claim an enquiry was submitted if no backend or delivery integration exists.

If actual submission functionality is required, implement a suitable backend or supported form service.

Do not leave buttons that look functional but do nothing.

7. PHASE SIX: IMAGE AND ASSET MANAGEMENT

Images are extremely important for this assignment.

Inspect the reference website and identify suitable assets.

Prioritize:

1. Original publicly accessible images where permitted.
2. Original assets provided by the website.
3. Appropriate replacement images if original assets cannot be used.
4. Optimized locally stored images.

Maintain the correct:

- Subject.
- Image ratio.
- Crop.
- Placement.
- Visual composition.
- Image quality.

Do not use unrelated placeholder images.

Do not use broken image URLs.

Do not use random images that make the clone visually inconsistent.

Avoid hotlinking unreliable third-party image URLs.

8. PHASE SEVEN: RESPONSIVE DEVELOPMENT

The website must work correctly on:

- Mobile: 360px–430px.
- Tablet: 768px–1024px.
- Desktop: 1280px–1440px.
- Large desktop: 1600px and above.

Test:

- Navigation behavior.
- Typography.
- Image scaling.
- Grid layouts.
- Buttons.
- Section spacing.
- Overflow.
- Forms.
- Footer.

There must be no horizontal scrolling, broken layouts, overlapping content, or unreadable text.

Use responsive CSS rather than simply shrinking the desktop layout.

9. PHASE EIGHT: CODE QUALITY

Maintain a professional project structure.

Suggested structure:

src/
assets/
components/
common/
layout/
sections/
cards/
pages/
routes/
hooks/
services/
data/
styles/
utils/
App.jsx
main.jsx

public/

PROJECT_ANALYSIS.md
README.md
.env.example

Requirements:

- Reusable components.
- Clear naming conventions.
- Separation of concerns.
- Maintainable styling.
- No unnecessary duplication.
- No hardcoded secrets.
- No console errors.
- No unused dependencies.
- No dead links.
- No placeholder sections.
- No unnecessary code complexity.

Use data-driven components for repeated puppy cards, testimonials, and similar content.

10. PHASE NINE: TESTING AND QUALITY ASSURANCE

Do not assume that a successful build means the project is complete.

Run:

- Dependency installation checks.
- Production build.
- Browser console inspection.
- Route testing.
- Link testing.
- Form validation testing.
- Responsive testing.
- Image loading checks.
- Interaction testing.
- Deployment testing.

Use browser automation to compare the original website and the clone.

Capture screenshots of both at equivalent viewport dimensions.

Compare:

- Hero layout.
- Section heights.
- Typography.
- Image placement.
- Spacing.
- Colors.
- Cards.
- Footer.
- Mobile layouts.

Fix major visual discrepancies before deployment.

Target a high level of visual similarity rather than accepting the first implementation.

11. PHASE TEN: DEPLOYMENT

Deploy the completed project to Vercel.

Requirements:

1. Ensure the production build succeeds.
2. Configure environment variables if required.
3. Configure client-side routing correctly.
4. Verify the production URL.
5. Test all internal routes directly.
6. Test mobile and desktop layouts.
7. Verify that assets load correctly.
8. Confirm that the deployed website works independently of the development environment.

Create and configure the GitHub repository.

Push the complete source code.

Do not commit API keys, passwords, or other secrets.

12. PHASE ELEVEN: DOCUMENTATION

Create a professional README.md containing:

- Project overview.
- Reference website.
- Technologies used.
- Features implemented.
- Project structure.
- Installation instructions.
- Local development instructions.
- Environment variable documentation.
- Build instructions.
- Deployment URL.
- Screenshots.
- Known limitations, if any.

Also create:

"DEVELOPMENT_LOG.md"

Record:

- Development phases.
- Important implementation decisions.
- Problems encountered.
- Solutions implemented.
- Testing performed.
- Deployment process.
- AI tools used.
- Exact prompts used with AI tools.

Be truthful about which parts were generated by AI and which were modified or implemented manually.

13. PHASE TWELVE: LOOM VIDEO PREPARATION

Prepare a structured Loom presentation lasting approximately 5–8 minutes.

The video must explain:

1. Project overview.
2. Reference website and requirements.
3. Technology stack and reasons for choosing it.
4. Project architecture and folder structure.
5. Reusable React components.
6. Routing implementation.
7. Responsive design.
8. Important functionality.
9. Challenges and solutions.
10. AI tools used and actual prompts provided.
11. Testing approach.
12. Deployment process.
13. Live website demonstration.

Create a file named:

"LOOM_PRESENTATION_SCRIPT.md"

Include a natural speaking script and demonstration sequence.

Do not fabricate AI prompts or development history. Use the actual development log.

If you cannot directly record or publish a Loom video, prepare the complete recording script and instructions for me to record it.

14. EXECUTION RULES

Follow these rules throughout the assignment:

1. Work autonomously and complete the entire project.
2. Do not stop after creating a homepage.
3. Inspect the reference before implementing.
4. Prioritize visual fidelity and functional completeness.
5. Do not invent website content or functionality.
6. Do not use generic templates that differ substantially from the original.
7. Do not leave placeholder content.
8. Do not leave non-functional buttons.
9. Do not claim testing or deployment was completed without actually performing it.
10. Fix errors before moving to the next phase.
11. Keep the development log updated.
12. Make sensible engineering decisions independently.
13. Do not send emails or submit the assignment on my behalf without my explicit approval.
14. Preserve the ability to explain every important implementation decision.

15. FINAL DELIVERABLES

At completion, provide:

1. Live deployed website URL.
2. GitHub repository URL.
3. Complete source code.
4. Project analysis document.
5. Development log with actual AI prompts.
6. README.md.
7. Loom presentation script.
8. Testing and QA report.
9. List of known limitations, if any.

Also provide a final summary containing:

- Pages implemented.
- Features completed.
- Responsive testing results.
- Build status.
- Deployment status.
- GitHub push status.
- Outstanding issues.

Use this checklist:

[ ] All reference pages inspected.
[ ] Complete website implemented.
[ ] Desktop layout tested.
[ ] Mobile layout tested.
[ ] All navigation tested.
[ ] All visible buttons tested.
[ ] Forms tested.
[ ] Images verified.
[ ] No critical console errors.
[ ] Production build successful.
[ ] Live deployment verified.
[ ] GitHub repository updated.
[ ] README completed.
[ ] Development log completed.
[ ] Actual AI prompts documented.
[ ] Loom script prepared.

FINAL INSTRUCTION

Begin by inspecting the reference website thoroughly.

Then create the project analysis document and proceed through the implementation phases.

Do not merely provide instructions, code snippets, or a development plan.

Actually build the complete project, run it, test it, fix issues, deploy it, and provide the final deliverables.

The expected result is a professional, production-quality website clone suitable for evaluation in a Full-Stack AI Engineer technical interview.

Your work is not finished until the deployed website has been tested and the GitHub repository contains the complete source code.```
