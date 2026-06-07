import type { Variants, Transition } from "framer-motion";

/** Shared easing curves matched to the CSS tokens. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 18,
  mass: 0.9,
};

/** Standard reveal: fade + rise. Pair with `whileInView`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/** Container that staggers its children's reveal. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Viewport config used across sections so reveals fire once, slightly early. */
export const viewportOnce = { once: true, margin: "-80px" } as const;
