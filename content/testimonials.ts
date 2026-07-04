/**
 * Testimonials / recommendations.
 * TODO: Dixit will add real recommendation text from his manager / team lead.
 * Entries with `quote: null` are skipped; the whole section stays hidden
 * until at least one quote is filled in.
 */

export type Testimonial = {
  quote: string | null; // null => hidden
  name: string;
  title: string;
  relation: string;
};

export const testimonials: Testimonial[] = [
  {
    // TODO: add quote from manager
    quote: null,
    name: "—",
    title: "Engineering Manager",
    relation: "Thinkbiz Technology",
  },
  {
    // TODO: add quote from team lead
    quote: null,
    name: "—",
    title: "Team Lead",
    relation: "Thinkbiz Technology",
  },
];
