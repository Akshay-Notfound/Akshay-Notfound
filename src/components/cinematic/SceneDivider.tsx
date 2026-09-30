"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SceneDividerProps {
  label?: string;
}

export default function SceneDivider({ label }: SceneDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30% 0px -30% 0px" });

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "3px", margin: "0" }}
      aria-hidden="true"
    >
      {/* Main scan line — draws left-to-right when in view */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.35) 15%, rgba(34,211,238,0.9) 45%, #ffffff 50%, rgba(34,211,238,0.9) 55%, rgba(34,211,238,0.35) 85%, transparent 100%)",
          boxShadow: "0 0 20px 2px rgba(34,211,238,0.3)",
          transformOrigin: "left center",
          scaleX: 0,
        }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Floating label — centered, appears after the beam draws */}
      {label && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="px-4 py-0.5 rounded-full text-[9px] font-mono tracking-[0.35em] uppercase whitespace-nowrap"
            style={{
              background: "#080b14",
              border: "1px solid rgba(34,211,238,0.3)",
              color: "rgba(34,211,238,0.7)",
              boxShadow: "0 0 14px rgba(34,211,238,0.15)",
            }}
          >
            {label}
          </div>
        </motion.div>
      )}
    </div>
  );
}
