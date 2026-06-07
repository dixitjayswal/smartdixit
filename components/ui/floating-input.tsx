"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  className?: string;
};

/**
 * Floating-label input with a focus glow. Supports single-line and textarea
 * via the `as` prop. The label floats up when the field is focused or filled
 * (driven by the `peer` + `placeholder-shown` pattern, no JS state needed).
 */
export function FloatingInput({
  label,
  className,
  as = "input",
  ...props
}: BaseProps &
  (
    | ({ as?: "input" } & React.InputHTMLAttributes<HTMLInputElement>)
    | ({ as: "textarea" } & React.TextareaHTMLAttributes<HTMLTextAreaElement>)
  )) {
  const id = useId();
  const sharedClass = cn(
    "peer w-full rounded-xl border border-border bg-card px-4 pb-2.5 pt-6 text-sm text-foreground outline-none transition-all duration-200",
    "placeholder-transparent focus:border-accent focus:shadow-[0_0_0_3px_rgba(59,130,246,0.18)]",
    className,
  );

  return (
    <div className="relative">
      {as === "textarea" ? (
        <textarea
          id={id}
          placeholder={label}
          rows={4}
          className={cn(sharedClass, "resize-none")}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          placeholder={label}
          className={sharedClass}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 top-2 font-mono text-[11px] uppercase tracking-wider text-muted transition-all duration-200",
          "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-muted",
          "peer-focus:top-2 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-accent",
        )}
      >
        {label}
      </label>
    </div>
  );
}
