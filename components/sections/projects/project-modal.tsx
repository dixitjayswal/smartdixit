"use client";

import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";
import type { Project } from "@/content/projects";
import { TypewriterCode } from "./typewriter-code";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // Lenis is a virtual scroll, so Radix's body lock alone doesn't stop the
  // background from scrolling — pause Lenis while the modal is open.
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (project) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [project, lenis]);

  return (
    <Dialog.Root open={!!project} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {project && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              onOpenAutoFocus={(e) => e.preventDefault()}
              aria-describedby={`${project.id}-desc`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="fixed left-1/2 top-1/2 z-[90] max-h-[88vh] w-[min(960px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border-strong bg-background-elevated shadow-2xl"
              >
                {/* Close */}
                <Dialog.Close
                  className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/60 text-muted-strong backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                  aria-label="Close"
                >
                  <X size={16} />
                </Dialog.Close>

                <div className="grid gap-0 md:grid-cols-2">
                  {/* Details */}
                  <div className="flex flex-col gap-5 p-7 sm:p-9">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-accent">
                        {project.subtitle}
                      </p>
                      <Dialog.Title className="mt-2 font-serif text-4xl text-foreground">
                        {project.title}
                      </Dialog.Title>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      {project.client && (
                        <span className="text-muted">
                          Client{" "}
                          <span className="text-muted-strong">
                            {project.client}
                          </span>
                        </span>
                      )}
                      <span className="text-muted">
                        Year{" "}
                        <span className="text-muted-strong">{project.year}</span>
                      </span>
                    </div>

                    {project.role && (
                      <p className="text-sm text-muted-strong">
                        <span className="text-muted">Role · </span>
                        {project.role}
                      </p>
                    )}

                    <Dialog.Description
                      id={`${project.id}-desc`}
                      className="rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground"
                    >
                      {project.outcome}
                    </Dialog.Description>

                    <ul className="flex flex-col gap-2.5">
                      {project.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted-strong"
                        >
                          <Check
                            size={16}
                            className="mt-0.5 shrink-0 text-accent"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-background/40 px-2 py-0.5 font-mono text-[11px] text-muted-strong"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code */}
                  <div className="flex items-center bg-background/40 p-7 sm:p-9">
                    <div className="w-full">
                      <TypewriterCode
                        code={project.codeSnippet.code}
                        filename={project.codeSnippet.filename}
                        language={project.codeSnippet.language}
                        active={!!project}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
