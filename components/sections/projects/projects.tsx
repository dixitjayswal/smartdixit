"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";
import { projects, type Project } from "@/content/projects";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Keep GSAP ScrollTrigger in sync with Lenis' virtual scroll.
  useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      // Horizontal pin-and-scroll on desktop only.
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;

        const getDistance = () => track.scrollWidth - pin.clientWidth;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative py-12 sm:py-16">
      {/* Mobile / tablet heading */}
      <div className="section-padding lg:hidden">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Projects"
            title="Five systems built to stay up under load."
          />
        </div>
      </div>

      {/* Desktop: pinned column — heading stays put while the cards scroll
          horizontally beneath it. */}
      <div
        ref={pinRef}
        className="relative hidden h-screen flex-col justify-center overflow-hidden lg:flex"
      >
        <div className="section-padding">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="Projects"
              title="Five systems built to stay up under load."
            />
          </div>
        </div>

        <div className="relative mt-12 flex items-stretch">
          <div
            ref={trackRef}
            className="flex gap-8 px-[max(1.25rem,calc((100vw-64rem)/2+1.25rem))] will-change-transform"
          >
            {projects.map((project) => (
              <div key={project.id} className="w-[420px] shrink-0">
                <ProjectCard project={project} onOpen={() => setActive(project)} />
              </div>
            ))}
            {/* Trailing spacer so the last card clears the edge */}
            <div className="w-[8vw] shrink-0" aria-hidden />
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Scroll to explore →
        </p>
      </div>

      {/* Mobile / tablet: vertical grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 section-padding md:grid-cols-2 lg:hidden">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={() => setActive(project)}
          />
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
