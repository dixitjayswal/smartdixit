"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Section header with a monospace eyebrow, serif heading, and a mask-reveal
 * line that draws across as it enters the viewport.
 */
export function SectionHeading({
  eyebrow,
  title,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-16 origin-left bg-border-strong"
        />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-gradient max-w-3xl pb-1 font-serif text-4xl leading-tight tracking-tight sm:text-5xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
