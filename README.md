# Dixit Jayswal — Portfolio

Personal portfolio for a Senior Full Stack Developer specializing in backend
engineering, distributed systems, and real-time streaming. Dark-first,
animation-heavy, built to send to recruiters.

**Stack:** Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS v4 ·
Framer Motion · GSAP (ScrollTrigger) · Lenis · React Three Fiber / Three.js ·
Radix UI · Lucide.

---

## Getting started

```bash
npm install          # install dependencies
npm run dev          # start the dev server (http://localhost:3000)
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
```

> Node 18.18+ is required (developed on Node 24). If `npm install` complains
> about peer dependencies, use `npm install --legacy-peer-deps`.

---

## Before you ship — checklist

These are the placeholders to replace (all marked with `// TODO:` in code):

| What | Where |
| --- | --- |
| **Resume PDF** | Drop your file in `public/` and set `resumePath` in `content/site.ts` (default expects `public/dixit-jayswal-resume.pdf`). |
| **GitHub URL** | `content/site.ts` → `socials.github`. |
| **Live domain** | Set `NEXT_PUBLIC_SITE_URL` in Vercel (see `.env.example`), and update the fallback in `content/site.ts`. |
| **Testimonials** | `content/testimonials.ts` — set each `quote` (and name/title) to render real cards instead of "coming soon" placeholders. |
| **Profile photo** | Optional. Add to `public/` and wire into the About aside if you want it. |
| **Favicon** | Replace `app/favicon.ico` with your own. |

---

## Editing content

All copy and data live in `/content` as typed TS files — **no component edits
needed** for routine updates.

### Add or edit a project
Edit [`content/projects.ts`](content/projects.ts). Append an object to the
`projects` array:

```ts
{
  id: "my-project",                 // unique, kebab-case
  title: "My Project",
  subtitle: "What it is",
  client: "Optional client",        // omit if none
  role: "Optional role",            // omit if none
  year: "2025",
  summary: "One-line card summary.",
  outcome: "The headline result, shown in the modal.",
  highlights: ["Bullet 1", "Bullet 2"],
  stack: ["Node.js", "AWS"],        // first 5 show on the card
  accent: "blue",                   // "blue" | "violet" — card gradient
  codeSnippet: {                    // powers the typewriter in the modal
    language: "typescript",
    filename: "example.ts",
    code: `// keep this 8–16 lines\nconsole.log("hi");`,
  },
}
```

### Update the stats / counters
Edit [`content/stats.ts`](content/stats.ts). `value` is the number the counter
animates to; use `decimals` for non-integers (e.g. `2.5` → `decimals: 1`), and
`prefix`/`suffix` to frame it.

### Skills
Edit [`content/skills.ts`](content/skills.ts) — `skillGroups` powers the grouped
grid, `marqueeSkills` powers the auto-scrolling row. `years` shows on hover.

### Experience / education
Edit [`content/experience.ts`](content/experience.ts). `kind: "work" |
"education"` switches the marker icon; `current: true` adds the "Current" badge.

### About / hero / contact copy
- Hero headline, sub-text, socials, email, location → [`content/site.ts`](content/site.ts)
- About paragraphs → [`content/about.ts`](content/about.ts)

---

## Changing the look

### Colors
All colors are CSS variables in [`app/globals.css`](app/globals.css) under
`:root` (dark, the default) and `.light`. Change them in one place:

```css
:root {
  --background: #0a0e1a;   /* deep navy */
  --foreground: #e8e8e8;   /* off-white text */
  --accent: #3b82f6;       /* electric blue */
  --violet: #8b5cf6;       /* violet glow */
}
```

The Tailwind utilities (`bg-background`, `text-accent`, `border-violet`, …) are
mapped from these in the same file's `@theme inline` block.

### Fonts
Set in [`app/layout.tsx`](app/layout.tsx) via `next/font`: Geist (sans),
Geist Mono (mono), Instrument Serif (display). Swap them there.

### Motion
Shared easing/variants live in [`lib/motion.ts`](lib/motion.ts). All animations
respect `prefers-reduced-motion` (see the media query at the bottom of
`globals.css` plus per-component guards).

---

## Project structure

```
app/                    App Router: layout, page, template (route transitions),
                        not-found, sitemap, robots, opengraph-image
components/
  layout/               Nav, Footer, Loader
  providers/            ThemeProvider, SmoothScroll (Lenis)
  sections/             One folder per page section (hero, stats, about,
                        projects, skills, experience, testimonials, contact)
  seo/                  JSON-LD Person schema
  ui/                   Button, Magnetic, CursorFollower, AnimatedLink,
                        FloatingInput, SocialLinks, brand icons, etc.
content/                Typed data files — the single source of truth
lib/                    cn() util + motion helpers
public/                 Static assets (resume PDF, favicon)
```

---

## Deploying to Vercel

1. Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
   Vercel auto-detects Next.js — no build config needed.
2. Add `NEXT_PUBLIC_SITE_URL` (your production domain) under
   **Settings → Environment Variables**.
3. Deploy. `vercel.json` adds a few security headers; everything else is default.

---

## Notes on performance & accessibility

- Three.js is **lazy-loaded** and deferred a frame after paint so it never
  blocks LCP; it renders a single static frame for reduced-motion users.
- Semantic HTML throughout, ARIA labels on icon-only controls, visible focus
  rings, keyboard-navigable modal (Radix Dialog), and a full
  `prefers-reduced-motion` story.
- The contact form opens the visitor's mail client via `mailto:` (no backend).
  To capture submissions server-side, swap `handleSubmit` in
  `components/sections/contact/contact.tsx` for a form endpoint (Resend / Formspree).

Built with Next.js + [claude.ai/code](https://claude.ai/code).
