"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCinematic } from "@/components/providers/CinematicProvider";

export default function AnamorphicFlare() {
  const { reducedMotion, tier } = useCinematic();
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Relative offset from window center (-1 to 1)
      const nx = (e.clientX / window.innerWidth - 0.5) * 60;
      const ny = (e.clientY / window.innerHeight - 0.5) * 35;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted || reducedMotion || tier === "performance") return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="relative w-full max-w-5xl flex items-center justify-center opacity-80"
      >
        {/* Primary Anamorphic Horizontal Streak */}
        <div
          className="absolute w-full h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.05) 15%, rgba(34, 211, 238, 0.6) 45%, rgba(255, 255, 255, 0.95) 50%, rgba(34, 211, 238, 0.6) 55%, rgba(59, 130, 246, 0.05) 85%, transparent 100%)",
            boxShadow: "0 0 16px rgba(34, 211, 238, 0.8), 0 0 32px rgba(59, 130, 246, 0.4)",
          }}
        />

        {/* Diffuse secondary horizontal glow ribbon */}
        <div
          className="absolute w-3/4 h-[8px] blur-sm opacity-60"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.2) 30%, rgba(56, 189, 248, 0.8) 50%, rgba(34, 211, 238, 0.2) 70%, transparent 100%)",
          }}
        />

        {/* Central Core Hotspot */}
        <div className="absolute w-12 h-12 rounded-full bg-white/40 blur-md pointer-events-none" />
        <div className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#ffffff] pointer-events-none" />

        {/* Ghost Flare Orbs (film lens internal reflection) */}
        <motion.div
          style={{
            x: smoothX,
          }}
          className="absolute -left-20 w-8 h-8 rounded-full border border-cyan/20 bg-cyan/5 blur-[1px] pointer-events-none"
        />
        <motion.div
          style={{
            x: smoothX,
          }}
          className="absolute -right-24 w-12 h-12 rounded-full border border-violet/20 bg-violet/5 blur-[1px] pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
