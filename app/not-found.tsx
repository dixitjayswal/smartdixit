import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 — Page not found",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* On-brand backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(59,130,246,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(60%_50%_at_50%_40%,black,transparent)]" />

      <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
        Error 404
      </p>
      <h1 className="mt-6 font-serif text-7xl tracking-tight text-foreground sm:text-8xl">
        Lost the thread.
      </h1>
      <p className="mt-5 max-w-md text-muted-strong">
        This route dropped off the queue. The page you&apos;re looking for
        doesn&apos;t exist — or never made it to production.
      </p>

      <div className="mt-9">
        <Button asChild size="lg">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
