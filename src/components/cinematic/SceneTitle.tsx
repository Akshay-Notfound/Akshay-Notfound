"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SceneTitleProps {
  sceneNumber: string; // e.g. "01", "02", "03"
  sceneName: string;   // e.g. "THE ARCHITECT"
  headline: string;
  highlightedText?: string;
  description?: string;
}

// Film ease — fast in, slow settle
const FILM_EASE = [0.16, 1, 0.3, 1] as const;

export default function SceneTitle({
  sceneNumber,
  sceneName,
  headline,
  highlightedText,
  description,
}: SceneTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });

  return (
    <div ref={ref} className="flex flex-col items-start space-y-4 mb-14 relative overflow-visible">

      {/* Watermark scene number behind everything */}
      <div
        className="absolute -top-8 -left-2 text-[7rem] sm:text-[9rem] md:text-[11rem] font-robotic font-black tracking-tighter select-none pointer-events-none"
        style={{ color: "rgba(255,255,255,0.022)", lineHeight: 1 }}
        aria-hidden="true"
      >
        {sceneNumber}
      </div>

      {/* ── Scene badge ── */}
      <motion.div
        initial={{ opacity: 0, x: -18, filter: "blur(4px)" }}
        animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.55, ease: FILM_EASE }}
        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full relative z-10"
        style={{
          background: "rgba(16,24,43,0.85)",
          border: "1px solid rgba(34,211,238,0.3)",
          boxShadow: "0 0 18px rgba(34,211,238,0.12)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: "#22d3ee", boxShadow: "0 0 6px #22d3ee" }}
        />
        <span className="text-[10px] sm:text-[11px] font-hacker tracking-[0.28em] uppercase font-semibold" style={{ color: "#22d3ee" }}>
          SCENE {sceneNumber} {"//"}  {sceneName}
        </span>
      </motion.div>

      {/* ── Headline with masked wipe reveal ── */}
      <div className="relative z-10 overflow-hidden">
        <motion.h2
          className="font-robotic font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight"
          initial={{ y: "105%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.72, delay: 0.1, ease: FILM_EASE }}
        >
          {headline}{" "}
          {highlightedText && (
            <span
              className="block sm:inline"
              style={{
                background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {highlightedText}
            </span>
          )}
        </motion.h2>
      </div>

      {/* ── Anamorphic accent line under headline ── */}
      <motion.div
        className="relative z-10 h-[2px] w-0"
        animate={inView ? { width: "6rem" } : { width: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: FILM_EASE }}
        style={{
          background: "linear-gradient(90deg, #22d3ee, rgba(59,130,246,0.5), transparent)",
          boxShadow: "0 0 10px rgba(34,211,238,0.4)",
        }}
      />

      {/* ── Description ── */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: FILM_EASE }}
          className="text-sm sm:text-base text-slate-300 max-w-2xl font-body leading-relaxed relative z-10"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
