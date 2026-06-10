# Atlas Albany — Project Reference

## Overview
Bilingual (AR/EN) static website for Atlas Albany, a company offering visa, tourism, study residence, and residence permit services in Albania. Primary audience: Arabic-speaking clients.

## Tech Stack
- **Framework**: Next.js 14, App Router, `output: 'export'` (production only)
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion + Lenis (smooth scroll)
- **i18n**: next-intl — `/ar/` (default, RTL) and `/en/` (LTR)
- **Forms**: Netlify Forms (zero-backend)
- **SEO**: next-sitemap
- **Deploy**: Netlify — `netlify.toml` handles redirects and form detection

## Running Locally
```bash
npm run dev          # dev server
npm run build        # static export → out/
npx serve out        # preview production build (NOT npm start)
```
> `npm start` doesn't work with `output: 'export'` — always use `npx serve out`.

## Brand
| Token | Value |
|---|---|
| `brand-red` | `#C8102E` (Albania flag red) |
| `brand-black` | `#0A0A0A` |
| `brand-dark` | `#1A1A1A` |

**Theme**: Heroes, Navbar, Footer, CallToAction → dark. Content sections → light (`bg-white` / `bg-gray-50`).

## Images (`public/images/`)
| File | Used in |
|---|---|
| `logo.png` | Navbar, Hero (desktop + mobile) |
| `pc-home-hero.jpg` | Homepage Hero (desktop) |
| `mobile-home-hero.jpg` | Homepage Hero (mobile) |
| `pc-about-hero.jpg` | About Hero (desktop) |
| `mobile-about-hero.jpg` | About Hero (mobile) |
| `contact-us-banner.jpg` | Contact Hero |

## i18n Routing
```
/             → redirects to /ar/
/ar/          → Arabic homepage (RTL)
/en/          → English homepage (LTR)
```
Content lives in `messages/ar.json` and `messages/en.json`.

## Animation Rules — Critical
**Never use `transition-all` on elements that Framer Motion animates directly.**
It causes CSS transitions to conflict with Framer Motion's JS-based opacity/transform animations, producing a flash/pop effect instead of smooth animation.

✅ Use `transition-[border-color,box-shadow]` for hover effects on animated cards.

### Stagger pattern (WhyUs, ServicesOverview, WhyAtlas)
```tsx
// Parent: plain <div ref={ref}> — NOT a motion.div
// Children: staggerChildren via useInView

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const ref = useRef<HTMLDivElement>(null)
const isInView = useInView(ref, { once: true, amount: 0.15 })

<motion.div ref={ref} variants={container} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
  {items.map((item, i) => <motion.div key={i} variants={item}>...</motion.div>)}
</motion.div>
```

### AnimatedSection component
Reusable scroll-reveal wrapper (`src/components/ui/AnimatedSection.tsx`). Supports `direction` prop: `'up'` (default) | `'left'` | `'right'` | `'none'`. Used only on headings/titles, never wrapping stagger containers.

## Hero Layout (Homepage)
Two-column desktop layout — logo and text swap sides based on locale:
- **EN (LTR)**: logo left, text right
- **AR (RTL)**: logo right, text left

This is automatic — `flex-row` + `dir="rtl"` on `<html>` handles the flip. No conditional CSS needed.

Background overlay: `bg-black/20` base + directional gradient darker behind text side.

## Contact Info
- Phone / WhatsApp: `+355 68 946 1403`
- Email: `Khaled.sh@atlas-albany.com`
- Address: `Rruga Don Bosko, Tiranë 1000`
- Facebook: `https://www.facebook.com/people/Atlas-Albany/61587833050969/`
