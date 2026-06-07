"use client";

import { motion } from "framer-motion";

/**
 * Slowly drifting gradient-mesh background built from blurred color orbs.
 * Pure transform animation (GPU-friendly). Sits behind hero content.
 */
export function GradientMesh() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base radial wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(59,130,246,0.12),transparent_55%)]" />

      <Orb
        className="bg-accent/30 left-[8%] top-[12%] h-[42vw] w-[42vw]"
        x={[0, 60, -30, 0]}
        y={[0, -40, 30, 0]}
        duration={22}
      />
      <Orb
        className="bg-violet/25 right-[6%] top-[20%] h-[38vw] w-[38vw]"
        x={[0, -50, 40, 0]}
        y={[0, 30, -50, 0]}
        duration={26}
      />
      <Orb
        className="bg-accent/15 left-[30%] bottom-[-10%] h-[46vw] w-[46vw]"
        x={[0, 40, -20, 0]}
        y={[0, -20, 20, 0]}
        duration={30}
      />

      {/* Faint grid + bottom fade into page background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(100%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}

function Orb({
  className,
  x,
  y,
  duration,
}: {
  className: string;
  x: number[];
  y: number[];
  duration: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[90px] will-change-transform ${className}`}
      animate={{ x, y }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
