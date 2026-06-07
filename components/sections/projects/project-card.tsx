"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const accentMap = {
  blue: "from-accent/25 via-accent/5",
  violet: "from-violet/25 via-violet/5",
} as const;

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  // Pointer-driven 3D tilt.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });

  const handleMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      data-cursor="hover"
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group gradient-border relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-colors hover:border-border-strong sm:p-7"
      aria-label={`Open case study: ${project.title}`}
    >
      {/* Header visual panel */}
      <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl border border-border">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br to-transparent transition-transform duration-500 group-hover:scale-105",
            accentMap[project.accent],
          )}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute inset-0 flex items-center justify-center px-5">
          <span className="text-balance text-center font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-foreground/80 transition-transform duration-500 group-hover:scale-105">
            {project.title}
          </span>
        </div>
        {project.client && (
          <span className="absolute left-3 top-3 rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-strong backdrop-blur-sm">
            {project.client}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          {project.subtitle}
        </p>
        <h3 className="mt-2 font-serif text-xl leading-tight text-foreground sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        {/* Stack chips */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-background-elevated/60 px-2 py-0.5 font-mono text-[11px] text-muted-strong"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="rounded-md px-2 py-0.5 font-mono text-[11px] text-muted">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
          View case study
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </motion.button>
  );
}
