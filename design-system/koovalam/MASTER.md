# KOOVALAM — Master Design System Specification
<!-- Generated with UI/UX Pro Max Intelligence & 21st.dev Component Strategy -->

> **BRAND IDENTITY:** KOOVALAM  
> **MEANING:** Inspired by the sacred Bilva tree (*Aegle marmelos*), associated with Lord Shiva, devotion, purity, nature, and spirituality.  
> **BRAND TAGLINE:** Rooted in Nature. Connected to Soul.  
> **RETREAT TAGLINE:** Pause. Breathe. Reconnect.  
> **PILLARS:** BODY (Vitality & Movement) · MIND (Peace & Awareness) · SOUL (Spiritual Connection & Inner Growth)  

---

## 1. Global Color Tokens

| Role | Hex | CSS Variable | Usage |
|:---|:---|:---|:---|
| **Deep Forest Green** | `#173D2D` | `--deep-forest` | Major headings, footer, high-contrast dark accents |
| **Primary Forest Green** | `#244C39` | `--primary-forest` | Brand badges, primary CTA button backgrounds |
| **Botanical Green** | `#526F54` | `--botanical-green` | Secondary foliage accents, subtle icons |
| **Warm Cream** | `#F5F0E5` | `--warm-cream` | Default page background, primary light warmth |
| **Ivory** | `#FAF8F1` | `--ivory` | Alternating section backgrounds, card containers |
| **Muted Antique Gold** | `#B69A61` | `--antique-gold` | Eyebrow rules, border accents, highlights |
| **Antique Gold Soft** | `#D5C299` | `--antique-gold-soft` | Text accents on dark forest backgrounds |
| **Earth Brown** | `#806B50` | `--earth-brown` | Sub-labels, botanical captions, secondary rules |
| **Main Text (Warm Ink)**| `#27342B` | `--main-text` | Primary reading typography (high contrast, warm ink) |
| **Secondary Text** | `#77766D` | `--secondary-text` | Body descriptions, lede paragraphs, disclaimers |
| **Hairline Divider** | `rgba(182, 154, 97, 0.22)` | `--line` | Refined hairline borders and dividers |

---

## 2. Typography Hierarchy

- **Display Headings:** `Cormorant Garamond` (Weights: 300, 400, 500, 600, 700 with italic ligatures for emphasis).
- **Body & Microcopy:** `DM Sans` (Weights: 300, 400, 500, 600, 700).

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

:root {
  --font-head: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Scale:
- `h1` (Hero): `clamp(2.8rem, 7.5vw, 5.4rem)` — line-height `1.05`, tracking `-0.015em`
- `h2` (Section Titles): `clamp(2.2rem, 5vw, 3.4rem)` — line-height `1.12`
- `h3` (Card Titles): `clamp(1.4rem, 3vw, 1.85rem)` — line-height `1.25`
- Eyebrow / Overline: `0.76rem` uppercase, letter-spacing `0.22em`, semibold
- Body text: `1rem` / `1.75` line-height, text color `#27342B`

---

## 3. Layout, Radii & Geometry

- **Philosophy:** Architectural, poised, minimal (UI/UX Pro Max Style #42 Organic Biophilic + Style #66 Editorial Grid).
- **Corner Radii:**
  - Buttons / Inputs: `--radius-xs: 2px` (crisp, architectural)
  - Cards: `--radius-sm: 4px` (refined, subtle)
  - Pill badges: `--radius-pill: 9999px`
- **Borders:** Thin hairline borders (`1px solid rgba(182, 154, 97, 0.22)`).
- **Avoid:** Bubbly 16px–24px rounded SaaS cards, neon glow pulses, and 3D tilt effects.

---

## 4. Motion & Transitions

- **Transitions:** `150ms–300ms cubic-bezier(0.22, 1, 0.36, 1)`.
- **Parallax:** Subtle `requestAnimationFrame` damping (`translate3d(0, scroll * 0.18px, 0)`), capped and hardware-accelerated.
- **Reveals:** Native `IntersectionObserver` fade-up (`translateY(20px)` to `0`).
- **Reduced Motion:** Full `@media (prefers-reduced-motion: reduce)` override disabling transforms and setting instant transition durations.

---

## 5. Anti-Patterns (Strictly Prohibited)

- ❌ **No generic SaaS-style cards** with thick drop shadows and bubbly 16px/20px border radius.
- ❌ **No excessive gradients, neon glows, or heavy glassmorphism** (no aurora blobs).
- ❌ **No 3D tilt mouse tracking with synthetic glare.**
- ❌ **No generic tourism transit styling** (no train tickets, bus-stop numbering, or dotted route lines).
- ❌ **No fabricated claims** (no unverified venues, fake facilitator names, or invent testimonials).
- ❌ **No emojis used as UI icons** (use vector SVG marks like the sacred Bilva leaf mark).

---

## 6. Pre-Delivery Checklist

- [x] Exact 9-color master palette configured in `tokens.css`.
- [x] Google Fonts `Cormorant Garamond` + `DM Sans` preconnected and imported in `index.html`.
- [x] Zero extraneous npm packages required.
- [x] All clickable elements have accessible focus rings and `cursor: pointer`.
- [x] Text contrast meets WCAG 2.1 AA (4.5:1 minimum on all backgrounds).
- [x] Full mobile responsiveness verified across 360px, 768px, 1024px, and 1440px.
- [x] Native `IntersectionObserver` and `prefers-reduced-motion` compliance.
- [x] Honeypot spam defense + WhatsApp fallback operational.
