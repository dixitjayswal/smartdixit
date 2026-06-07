"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Marquee } from "./marquee";
import { skillGroups } from "@/content/skills";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

export function Skills() {
  return (
    <section id="skills" className="relative py-12 sm:py-16">
      <div className="section-padding">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Skills"
            title="The stack I reach for."
          />
        </div>
      </div>

      {/* Full-bleed marquee */}
      <div className="mt-12">
        <Marquee />
      </div>

      {/* Grouped grid */}
      <div className="section-padding mt-16">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              className="flex flex-col gap-4 bg-background p-6"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {group.category}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="text-sm text-muted-strong">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
