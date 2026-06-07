import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";

/** Person structured data (JSON-LD) for rich results. */
export function PersonJsonLd() {
  const knowsAbout = Array.from(
    new Set(skillGroups.flatMap((g) => g.skills.map((s) => s.name))),
  );

  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.hero.subHeadline,
    url: site.url,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vadodara",
      addressCountry: "IN",
    },
    worksFor: {
      "@type": "Organization",
      name: "Thinkbiz Technology",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "CHARUSAT",
    },
    knowsAbout,
    sameAs: [site.socials.linkedin, site.socials.github].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      // Structured data must be raw JSON in the DOM.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
