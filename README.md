# Koovalam — Promotional Landing Page

A single-page, static promotional site for the **4-Day Spiritual Wellness &
Mindfulness Retreat** in Kerala, framed as a tourist planner: **“The Koovalam
Route.”** A winding river-route line runs through the hero with Day 1–4 stop
pins, a trip-ticket strip summarises the journey, and the 4-Day Journey
section is a scroll-filling route map (desktop) / vertical timeline (mobile).

## Design system (v4, 2026-11-05 — UI UX Pro Max)

Analysed [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (88 styles, 192 reasoning rules, design-system generator in `scripts/design_system.py`). Applied, in order:
- **Organic Biophilic #42** (primary): forest green, earth brown, organic 16–24px curves, natural soft shadows, wellness — this is also the Brand Profile PDF palette, so it stays as the base.
- **Nature Distilled #61** (secondary accent): terracotta `#C67B5C` / sand / warm clay, used sparingly (chapter labels, drop cap).
- **Soft UI Evolution #19**: soft multi-layer shadows, 200–300ms motion, 4.5:1 contrast, visible focus, reduced-motion respected.
- **Landing pattern**: Hero-Centric + Scroll-Triggered Storytelling (chapters: Pause → Bilva → Practices → Journey → Enquiry), CTA in hero + sticky + final.
- **Typography "Wellness Calm"**: Lora headings / Raleway body (Google Fonts).
- **Bento Box Grid #39** for Practices (Yoga card spans 2 columns, hover lift −4px / scale 1.02); **Editorial Grid #66** for the Pause pull-quote with drop cap.
- **Avoided, per the skill**: the generator's top pick Liquid Glass in black+gold (wrong for this brand), neon, AI purple/pink gradients, harsh animations, dark mode.

## Design system (v5, 2026-11-05 — UI UX Pro Max, applied faithfully)

Sharika rejected v4 ("not at all good, use the UI styles mentioned in that repo"), so v5 applies the repo's named styles exactly, from `styles.csv`:
- **Editorial Grid / Magazine #66**: asymmetric grid, editorial typography, pull quotes (1.5em), drop caps (4em), print-inspired, high contrast + one brand accent.
- **Exaggerated Minimalism #47**: oversized typography (hero headline clamp 3.4–7.5rem), high contrast, negative space, loud minimal, single accent only (forest green).
- **Bento Box Grid #39**: grid 4→2→1 cols, varied spans, rounded 16px, subtle shadows, hover scale 1.02.
- **Parallax Storytelling #49**: scroll-driven, layered, cinematic, progressive disclosure.
- **Typography "Magazine Style"**: Libre Bodoni headings / Public Sans body.
Hero is now full-bleed photo with the oversized headline at the bottom — no card, no glass panel.

## Design system (v6, 2026-11-05 — glassmorphism + motion + 3D)

Sharika asked for glassmorphism, other animations and 3D, from the same repo:
- **Glassmorphism #3**: frosted header, trust pills, dates card and enquiry form — `backdrop-filter: blur(16px)`, translucent cream, 1px white border.
- **Liquid Glass #14 / Aurora UI #10**: gold, olive and terracotta aurora blobs drifting behind the hero (18s, forest/cream/gold only — no neon).
- **Kinetic Typography #48**: hero headline words rise in one by one (0 / .15 / .3s).
- **Parallax Storytelling #49**: hero photo moves at 0.22× scroll speed, scaled 1.08.
- **3D #5 / Dimensional Layering #46 / Tactile #60**: new `Tilt.jsx` — pointer-driven 3D tilt (rotateX/rotateY, max 7°) with a light glare on practice, highlight and journey cards; disabled on touch / reduced motion.
- **Motion-Driven #15 / Micro-interactions #16**: 150–300ms transform/opacity only, card hover lift, glowing CTA pulse (2.8s), floating Bilva leaf (6s, hidden on mobile).
- All motion is off under `prefers-reduced-motion`.

## Develop & build

```bash
npm install
npm run dev      # local development
npm run build    # produces dist/ — hostable anywhere static
npm run preview  # serve dist/ locally
```

## Editing copy & config

- **All placeholders live in one file:** `src/config/site.js` — contact
  email, WhatsApp number, form endpoint, dates, price, venue, socials and
  the `testimonials` array.
- **Copy lives in data files:** `src/data/retreat.js` (day schedules,
  included list, who-for), `src/data/practices.js`, `src/data/faqs.js`,
  `src/data/images.js` (alt text). Edit these without touching components.

## Swapping the logo & images

- **Logo:** `src/components/Logo.jsx` is a placeholder inline-SVG (three
  Bilva leaves above the KOOVALAM wordmark, Sacred Leaf direction). Replace
  that component with the final vector logo when supplied.
- **Images:** see `public/images/README.md`. Generate with
  `node scripts/generate-images.mjs` (needs `OPENAI_API_KEY`), or drop real
  photos with the same filenames into `public/images/`. Missing files render
  as a gradient fallback, never a broken icon.

## Connecting the form

Set `formEndpoint` in `src/config/site.js` to a Formspree or Web3Forms
endpoint. Until then, the form shows its success state and offers the
WhatsApp deep link as the follow-up. Fields: name, email, phone/WhatsApp,
interest, preferred timing, message, consent checkbox, hidden honeypot.

## Testimonials

The Testimonials component (`src/components/DatesFaq.jsx`) renders **only**
when `site.testimonials` is non-empty. It ships empty and hidden. Add real
testimonials, with the speaker's permission, to switch it on — never invent
any.

## Analytics

`src/lib/analytics.js` exports a no-op `track()` called on CTA clicks,
WhatsApp clicks and form submits. Wire GA4 or Plausible inside that one
function; nothing else changes.

## Deploying (free)

- **Netlify:** drag `dist/` onto Netlify Drop, or connect the repo with
  build command `npm run build` and publish directory `dist/`.
- **Cloudflare Pages:** same build command and output directory.
- **GitHub Pages:** build locally, publish `dist/` (this project uses a
  relative Vite `base`, so project-page subpaths work). Add a custom domain
  in your host's settings and update the canonical/OG URLs in `index.html`
  and `src/config/site.js` to match.

## Honesty notes (by design)

No fake urgency, seat counts, countdowns, discounts, prices, dates, venue,
facilitators or testimonials anywhere. Dates read “Announcing soon”, price
“Shared on enquiry”, venue “Kerala, India (to be confirmed)”. Safety copy
(voluntary participation, opt out anytime, not a replacement for
psychotherapy, no trauma-release promise, no forceful breathing, authorised
boat operator, life jackets, weather go/no-go) appears in the Gentle & Safe
Care section and FAQ.

## Replace before launch — checklist

- [ ] Final logo (replace `Logo.jsx` placeholder)
- [ ] Real photos of the confirmed venue, temple and river — replace the
      AI-generated `highlight-temple`, `highlight-nila-river`, `included-stay`
- [ ] All other photos (or generated images via the script)
- [ ] Retreat dates, price, venue, facilitators, group size
- [ ] Contact email and WhatsApp number (`src/config/site.js`)
- [ ] Social links, form endpoint, share image (crop `og-share` to 1200×630)
- [ ] Domain (canonical + OG URLs in `index.html` and `site.js`)
- [ ] Cancellation policy (FAQ answer is a placeholder)
- [ ] Real testimonials with permission (only then fill `testimonials`)
