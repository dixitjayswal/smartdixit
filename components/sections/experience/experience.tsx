"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { timeline, type TimelineEntry } from "@/content/experience";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Ascending: oldest first, most recent at the bottom.
const ordered = [...timeline].reverse();

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 75%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Each marker's position along the timeline (0 = top, 1 = bottom). The dot
  // lights up when the progress line reaches it, so the highlight tracks the
  // scroll and stays lit once passed.
  const [thresholds, setThresholds] = useState<number[]>([]);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const measure = () => {
      const c = ref.current;
      if (!c) return;
      const h = c.clientHeight || 1;
      const items = Array.from(c.querySelectorAll<HTMLLIElement>("li[data-entry]"));
      setThresholds(items.map((li) => (li.offsetTop + 12) / h));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let count = 0;
    for (const t of thresholds) if (v >= t) count++;
    setReached(count);
  });

  return (
    <section id="experience" className="relative py-12 section-padding sm:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Experience" title="Where I've been building." />

        <div ref={ref} className="relative mt-14 max-w-2xl pl-8">
          {/* Track */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-border" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[7px] top-2 h-full w-px origin-top bg-gradient-to-b from-accent to-violet"
          />

          <ol className="flex flex-col gap-12">
            {ordered.map((entry, i) => (
              <TimelineItem
                key={`${entry.org}-${i}`}
                entry={entry}
                active={i < reached}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  entry,
  active,
}: {
  entry: TimelineEntry;
  active: boolean;
}) {
  const Icon = entry.kind === "work" ? Briefcase : GraduationCap;

  return (
    <motion.li
      data-entry
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative"
    >
      {/* Marker */}
      <span
        className={cn(
          "absolute -left-8 top-1 grid h-4 w-4 place-items-center rounded-full border bg-background transition-all duration-300",
          active
            ? "scale-125 border-accent shadow-[0_0_0_4px_rgba(59,130,246,0.18)]"
            : "border-border-strong",
        )}
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full transition-colors duration-300",
            active ? "bg-accent" : "bg-muted",
          )}
        />
      </span>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3
          className={cn(
            "text-lg font-medium transition-colors duration-300",
            active ? "text-foreground" : "text-muted-strong",
          )}
        >
          {entry.role}
        </h3>
        {entry.current && (
          <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-soft">
            Current
          </span>
        )}
      </div>

      <div className="mt-1 flex items-center gap-2 text-sm text-muted-strong">
        <Icon size={14} className="text-accent" />
        <span>{entry.org}</span>
        <span className="text-muted">·</span>
        <span className="font-mono text-xs text-muted">{entry.period}</span>
      </div>

      {entry.detail && (
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          {entry.detail}
        </p>
      )}
    </motion.li>
  );
}
