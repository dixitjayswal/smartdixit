"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Download, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { FloatingInput } from "@/components/ui/floating-input";
import { AnimatedLink } from "@/components/ui/animated-link";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // Posts to /api/contact, which emails the message straight to Dixit's inbox.
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
    };

    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Something went wrong.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
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

        {/* Right: form (or thank-you state) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex min-h-[20rem] flex-col items-start justify-center gap-4"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                <Check size={22} />
              </span>
              <h3 className="font-serif text-3xl text-foreground">
                Thank you — message sent.
              </h3>
              <p className="max-w-sm text-muted-strong">
                Thanks for reaching out. It&apos;s landed in my inbox and I&apos;ll
                get back to you at the email you provided.
              </p>
              <Button
                variant="outline"
                onClick={() => setStatus("idle")}
                className="mt-2"
              >
                Send another
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <FloatingInput label="Your name" name="name" type="text" required />
              <FloatingInput label="Email" name="email" type="email" required />
              <FloatingInput
                label="Message"
                name="message"
                as="textarea"
                required
              />

              {status === "error" && error && (
                <p role="alert" className="text-sm text-red-400">
                  {error} You can also email me directly at{" "}
                  <a href={site.socials.email} className="underline">
                    {site.email}
                  </a>
                  .
                </p>
              )}

              <Magnetic className="self-start">
                <div className="group/send relative">
                  <Button type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight size={16} />
                      </>
                    )}
                  </Button>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-background-elevated px-3 py-1.5 font-mono text-[11px] text-muted opacity-0 shadow-lg transition-opacity duration-200 group-hover/send:opacity-100"
                  >
                    Goes straight to my inbox
                  </span>
                </div>
              </Magnetic>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
