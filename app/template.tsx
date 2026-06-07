"use client";

import { motion } from "framer-motion";

/**
 * App Router `template.tsx` re-mounts on every navigation, so it's the right
 * place for route-change transitions. A curtain wipes up to reveal the new
 * route. Reduced-motion users get an instant render (duration collapses via CSS).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
        className="pointer-events-none fixed inset-0 z-[95] bg-gradient-to-b from-background-elevated to-background"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {children}
      </motion.div>
    </>
  );
}
