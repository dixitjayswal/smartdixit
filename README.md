# Dixit Jayswal — Portfolio

Personal portfolio for a Senior Software Engineer specializing in backend
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
| **Resume PDF** | Lives in `public/` — `resumePath` in `content/site.ts` points to `public/Dixit_Jayswal_Senior_Software_Engineer.pdf`. Replace the file (keep the name) or update the path to swap it. |
| **GitHub URL** | `content/site.ts` → `socials.github`. |
| **Live domain** | Set `NEXT_PUBLIC_SITE_URL` in Vercel (see `.env.example`), and update the fallback in `content/site.ts`. |
| **Testimonials** | `content/testimonials.ts` — set each `quote` (and name/title). The section stays hidden until at least one quote is filled in. |
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
## Contact form

The "Get in touch" form POSTs to a server route ([app/api/contact/route.ts](app/api/contact/route.ts))
that emails the enquiry to your inbox via [Resend](https://resend.com), then
shows a thank-you message. To enable it:

1. Sign up at [resend.com](https://resend.com) with the inbox you want enquiries
   to reach (e.g. `djayswal012@gmail.com`).
2. Create an API key and set `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`
   / `CONTACT_FROM_EMAIL`) — see `.env.example`. Add the same vars in Vercel.
3. Until you verify your own domain in Resend, the default sender
   `onboarding@resend.dev` delivers to your Resend account email. After verifying
   a domain, set `CONTACT_FROM_EMAIL` to an address on it.

Enquiries arrive with the subject **"Website Enquiry — {name}"** and the
sender's address set as reply-to, so you can reply directly. Without
`RESEND_API_KEY` set, the form returns a friendly error pointing visitors to
your email address.

Built with Next.js + [claude.ai/code](https://claude.ai/code).
