"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { about } from "@/content/about";
import { site } from "@/content/site";

export function About() {
  return (
    <section id="about" className="relative py-12 section-padding sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow={about.eyebrow} title={about.heading} />

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6"
          >
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-pretty text-base leading-relaxed text-muted-strong sm:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Aside: at-a-glance card */}
        <motion.aside
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="h-fit lg:sticky lg:top-28"
        >
          <div className="glass rounded-2xl p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Currently
            </p>
            <p className="mt-3 text-foreground">{site.role}</p>
            <p className="text-sm text-muted">Thinkbiz Technology</p>

            <div className="my-5 h-px w-full bg-border" />

            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Focus</dt>
                <dd className="text-right text-muted-strong">
                  Event-driven systems
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Scale</dt>
                <dd className="text-right text-muted-strong">2.5M+ events/day</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Stack</dt>
                <dd className="text-right text-muted-strong">
                  Node · TS · AWS · Kafka
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center gap-2 text-sm text-muted-strong">
              <MapPin size={15} className="text-accent" />
              <span>
                {site.location} · {site.locationNote}
              </span>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
