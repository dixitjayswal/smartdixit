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
  // Drop your resume PDF in /public and keep this path in sync.
  resumePath: "/dixit-jayswal-resume.pdf",
  // Reads NEXT_PUBLIC_SITE_URL in production (set it in Vercel), else falls
  // back to the placeholder below. TODO: update the fallback once live.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dixitjayswal.dev",
  socials: {
    linkedin: "https://linkedin.com/in/dixit-jayswal",
    // TODO: add GitHub URL once the profile is created.
    github: "https://github.com/", // TODO: replace placeholder
    email: "mailto:djayswal023@gmail.com",
  },
} as const;

export type Site = typeof site;
