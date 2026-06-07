"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { GradientMesh } from "./gradient-mesh";
import { LazyHeroScene } from "./scene/lazy-scene";
import { NameReveal } from "./name-reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { SocialLinks } from "@/components/ui/social-links";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

const capabilities = [
  "Backend",
  "Distributed Systems",
  "Real-time Streaming",
];

export function Hero() {
  const { resolvedTheme } = useTheme();
  // Theme is only known after mount; keep the first client render identical to
  // the server (dark/screen blend) to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const isLight = mounted && resolvedTheme === "light";
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: content drifts up + fades, scene drifts slower.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Cursor spotlight.
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mx}% ${my}%, rgba(59,130,246,0.10), transparent 60%)`;

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      ref={ref}
      onPointerMove={handleMove}
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden pt-28 pb-16 section-padding"
    >
      <GradientMesh />

      {/* Cursor-following spotlight */}
      <motion.div
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 -z-[3] hidden lg:block"
      />

      {/* Immersive 3D distributed-network scene (desktop), screen-blended so
          only the glow shows over the background. */}
      <motion.div
        style={{ y: sceneY }}
        className={cn(
          "absolute inset-y-0 right-[-6%] -z-[5] hidden w-[68%] lg:block [mask-image:radial-gradient(70%_75%_at_62%_50%,black,transparent)]",
          // Screen-blend in dark so only the glow shows; normal blend in light
          // so the solid-colored network stays visible on the light background.
          isLight ? "mix-blend-normal opacity-90" : "mix-blend-screen",
        )}
      >
        <LazyHeroScene />
      </motion.div>

      {/* Left readability scrim over the scene */}
      <div className="pointer-events-none absolute inset-0 -z-[4] hidden bg-gradient-to-r from-background via-background/70 to-transparent lg:block" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-5xl"
      >
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-strong backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono">
            {site.role} · {site.locationNote}
          </span>
        </motion.div>

        {/* Capability tags */}
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted select-none"
        >
          {capabilities.map((cap, i) => (
            <li key={cap} className="flex items-center gap-3">
              {i > 0 && <span className="text-accent/50">/</span>}
              {cap}
            </li>
          ))}
        </motion.ul>

        {/* Name with backlight glow */}
        <div className="relative w-fit">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 bg-[radial-gradient(60%_60%_at_30%_50%,rgba(59,130,246,0.22),transparent_70%),radial-gradient(50%_60%_at_70%_60%,rgba(139,92,246,0.18),transparent_70%)] blur-2xl"
          />
          <h1 className="select-none font-serif text-[clamp(3.25rem,12vw,10rem)] leading-[0.92] tracking-[-0.02em] text-foreground">
            <NameReveal text={site.hero.headline} delay={0.25} />
          </h1>
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-balance text-lg text-muted-strong sm:text-xl"
        >
          {site.hero.subHeadline}
        </motion.p>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-xl font-mono text-sm text-muted"
        >
          {site.hero.subText}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-5"
        >
          <Magnetic>
            <Button asChild size="lg">
              <a href="#work">
                View Work
                <ArrowDown size={16} />
              </a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">
                Get in Touch
                <ArrowUpRight size={16} />
              </a>
            </Button>
          </Magnetic>
        </motion.div>

        {/* Credibility + social row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-5"
        >
          <p className="text-sm text-muted">
            Shipping production systems for{" "}
            <span className="text-shimmer font-medium">JERA</span>
            <span className="text-muted/70"> (one of Japan&apos;s largest power companies)</span>{" "}
            at Thinkbiz Technology.
          </p>
          <SocialLinks />
        </motion.div>
      </motion.div>

      {/* Scroll cue — jumps to the About section */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 text-muted transition-colors hover:text-accent"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}
