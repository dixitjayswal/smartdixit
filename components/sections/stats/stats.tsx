"use client";

import { motion } from "framer-motion";
import { Counter } from "./counter";
import { stats } from "@/content/stats";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

export function Stats() {
  return (
    <section
      aria-label="Key metrics"
      className="relative border-y border-border bg-background-elevated/40 py-16 section-padding sm:py-20"
    >
      <motion.dl
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="flex flex-col gap-2"
          >
            <dd className="font-serif text-5xl tracking-tight text-foreground sm:text-6xl">
              <span className="text-gradient">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </span>
            </dd>
            <dt className="text-sm text-muted">{stat.label}</dt>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
