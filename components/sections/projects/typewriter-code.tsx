"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Types out a code snippet character-by-character. Comment lines (// or --)
 * render dimmed. Honors reduced motion by showing the full snippet instantly.
 */
export function TypewriterCode({
  code,
  filename,
  language,
  active,
}: {
  code: string;
  filename: string;
  language: string;
  active: boolean;
}) {
  const [shown, setShown] = useState("");
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShown("");
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(code);
      return;
    }

    let i = 0;
    let last = 0;
    const step = (t: number) => {
      if (t - last > 12) {
        // Reveal a few chars per tick so longer snippets still finish quickly.
        i = Math.min(i + 2, code.length);
        setShown(code.slice(0, i));
        last = t;
      }
      if (i < code.length) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [active, code]);

  const lines = shown.split("\n");
  const done = shown.length >= code.length;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#070b15] light:bg-[#eef1f7]">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-muted">{filename}</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted/70">
          {language}
        </span>
      </div>

      {/* Code body */}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code className="grid">
          {lines.map((line, i) => {
            const trimmed = line.trimStart();
            const isComment =
              trimmed.startsWith("//") || trimmed.startsWith("--");
            return (
              <span key={i} className="grid grid-cols-[2ch_1fr] gap-4">
                <span className="select-none text-right text-muted/40">
                  {i + 1}
                </span>
                <span
                  className={cn(
                    "whitespace-pre text-muted-strong",
                    isComment && "text-muted/60 italic",
                  )}
                >
                  {line}
                  {!done && i === lines.length - 1 && (
                    <span className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse bg-accent" />
                  )}
                </span>
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
