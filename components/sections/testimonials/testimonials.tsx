"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/content/testimonials";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

export function Testimonials() {
  return (
    <section className="relative py-20 section-padding sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="References"
          title="What people I've worked with say."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              variants={fadeUp}
              className="relative flex flex-col gap-5 rounded-2xl border border-border bg-card p-7"
            >
              <Quote size={22} className="text-accent/60" />

              {t.quote ? (
                <blockquote className="text-pretty leading-relaxed text-muted-strong">
                  “{t.quote}”
                </blockquote>
              ) : (
                // TODO: Dixit to add recommendation text — placeholder state.
                <div className="space-y-2.5" aria-label="Recommendation coming soon">
                  <span className="block h-3 w-full rounded bg-border" />
                  <span className="block h-3 w-[92%] rounded bg-border" />
                  <span className="block h-3 w-[78%] rounded bg-border" />
                  <span className="mt-3 block font-mono text-xs text-muted">
                    Recommendation coming soon.
                  </span>
                </div>
              )}

              <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background-elevated font-mono text-sm text-muted">
                  {t.name !== "—" ? t.name.charAt(0) : "·"}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm text-foreground">{t.name}</span>
                  <span className="text-xs text-muted">
                    {t.title} · {t.relation}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
