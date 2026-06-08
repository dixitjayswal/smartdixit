/**
 * Global site configuration. Edit values here to update the whole site:
 * name, role, headline copy, social links, location, and resume path.
 */

export const site = {
  name: "Dixit Jayswal",
  role: "Senior Full Stack Developer",
  // Used in <title>, OG image, and JSON-LD.
  tagline: "Backend Engineer building event-driven systems",
  hero: {
    headline: "Dixit Jayswal",
    subHeadline:
      "Backend Engineer building event-driven systems that don't fall over when things get loud.",
    subText:
      "Currently architecting AWS pipelines processing 2.5M+ events/day at Thinkbiz Technology.",
  },
  location: "Vadodara, India",
  locationNote: "Open to relocation",
  email: "djayswal023@gmail.com",
  // Resume PDF in /public. Keep this path in sync with the filename.
  resumePath: "/Dixit_Jayswal_Full_Stack_Developer.pdf",
  // Canonical site URL. Reads NEXT_PUBLIC_SITE_URL in production (set it in
  // Vercel); the fallback is the live domain. No trailing slash.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://smartdixit.online",
  socials: {
    linkedin: "https://www.linkedin.com/in/dixit-jayswal/",
    github: "https://github.com/dixitjayswal",
    email: "mailto:djayswal023@gmail.com",
  },
} as const;

export type Site = typeof site;
