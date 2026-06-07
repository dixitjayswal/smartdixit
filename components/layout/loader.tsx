"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";

/**
 * Initial-load curtain. Shows once per browser session for up to ~1.4s, then
 * lifts away. Skipped entirely for reduced-motion users.
 */
export function Loader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("dj-loaded");
    if (reduced || seen) return;

    // Show the curtain on first paint, then lift it after a beat.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("dj-loaded", "1");
      document.body.style.overflow = "";
    }, 1400);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl tracking-tight text-foreground"
          >
            {site.name}
            <span className="text-accent">.</span>
          </motion.span>

          <div className="mt-6 h-px w-40 overflow-hidden bg-border">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full bg-gradient-to-r from-accent to-violet"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
