"use client";

import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Inline link with an underline that draws in from the left on hover/focus.
 */
export function AnimatedLink({
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a
      className={cn(
        "group relative inline-flex w-fit items-center text-foreground transition-colors hover:text-accent",
        className,
      )}
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
    </a>
  );
}
