"use client";

import { marqueeSkills } from "@/content/skills";

/**
 * Auto-scrolling, infinitely-looping marquee of tech. Pauses on hover; each
 * chip reveals its experience (years) on hover. The list is duplicated so the
 * -50% translate creates a seamless loop.
 */
export function Marquee() {
  const items = [...marqueeSkills, ...marqueeSkills];

  return (
    <div className="marquee-track relative flex overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul
        className="animate-marquee flex shrink-0 items-center gap-4 pr-4"
        style={{ ["--marquee-duration" as string]: "45s" }}
      >
        {items.map((skill, i) => (
          <li
            key={`${skill.name}-${i}`}
            className="group/chip flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 transition-colors hover:border-accent"
            aria-hidden={i >= marqueeSkills.length}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="whitespace-nowrap text-sm text-muted-strong transition-colors group-hover/chip:text-foreground">
              {skill.name}
            </span>
            {skill.years != null && (
              <span className="overflow-hidden whitespace-nowrap font-mono text-xs text-accent max-w-0 opacity-0 transition-all duration-300 group-hover/chip:max-w-20 group-hover/chip:opacity-100">
                {skill.years}y
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
