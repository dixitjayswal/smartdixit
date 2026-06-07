"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Download } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { FloatingInput } from "@/components/ui/floating-input";
import { AnimatedLink } from "@/components/ui/animated-link";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { site } from "@/content/site";

export function Contact() {
  const [sent, setSent] = useState(false);

  // No backend: compose a mailto so the message lands in Dixit's inbox.
  // TODO: swap for a form endpoint (Resend / Formspree) if you want inbound
  // submissions without opening the user's mail client.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="relative py-20 section-padding sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left: pitch + direct links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col"
        >
          <SectionHeading
            eyebrow="Contact"
            title="Building something that needs to scale? Let's talk."
          />

          <div className="mt-9 flex flex-col gap-5">
            <div className="group flex items-center gap-3 text-lg text-foreground">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-border text-accent transition-colors group-hover:border-accent">
                <Mail size={18} />
              </span>
              <AnimatedLink href={site.socials.email} data-cursor="hover">
                {site.email}
              </AnimatedLink>
            </div>

            <div className="flex items-center gap-3 text-muted-strong">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-border text-accent">
                <MapPin size={18} />
              </span>
              <span>
                {site.location} · {site.locationNote}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button asChild variant="outline">
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinIcon size={16} />
                  LinkedIn
                  <ArrowUpRight size={14} />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline">
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon size={16} />
                  GitHub
                  <ArrowUpRight size={14} />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild>
                <a href={site.resumePath} download>
                  <Download size={16} />
                  Resume
                </a>
              </Button>
            </Magnetic>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <FloatingInput label="Your name" name="name" type="text" required />
          <FloatingInput label="Email" name="email" type="email" required />
          <FloatingInput label="Message" name="message" as="textarea" required />
          <Magnetic className="self-start">
            <div className="group/send relative">
              <Button type="submit">
                {sent ? "Opening your mail app…" : "Send message"}
                <ArrowUpRight size={16} />
              </Button>
              <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-background-elevated px-3 py-1.5 font-mono text-[11px] text-muted opacity-0 shadow-lg transition-opacity duration-200 group-hover/send:opacity-100"
              >
                Opens your mail client, addressed to {site.email}
              </span>
            </div>
          </Magnetic>
        </motion.form>
      </div>
    </section>
  );
}
