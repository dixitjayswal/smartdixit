"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Reveals a string character-by-character with a staggered spring.
 * Each word is kept intact (no mid-word line breaks). Accessible: the full
 * text is exposed via aria-label while the animated spans are decorative.
 */
export function NameReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span aria-label={text} className={cn("inline-block", className)}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char) => {
            const i = charIndex++;
            return (
              <motion.span
                key={i}
                aria-hidden
                className="inline-block"
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                  delay: delay + i * 0.04,
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
