"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a small dot that trails the pointer and expands into a ring
 * over interactive elements ([data-cursor="hover"], links, buttons).
 * Hidden on touch / coarse pointers and when reduced motion is preferred.
 */
export function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 900, damping: 40 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    // Enable only on fine pointers without reduced-motion (client feature check).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHovering(
        Boolean(
          el.closest(
            'a, button, [data-cursor="hover"], input, textarea, [role="button"]',
          ),
        ),
      );
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-0 top-0"
        animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.5 : 0.35 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-accent" />
      </motion.div>
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="absolute left-0 top-0"
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent" />
      </motion.div>
    </div>
  );
}
