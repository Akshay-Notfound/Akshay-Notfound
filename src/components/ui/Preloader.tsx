"use client";

import React, { useEffect, useState } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const { reducedMotion } = useSmoothScroll();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // If reduced motion or already shown in this session, skip immediately
    if (reducedMotion || sessionStorage.getItem("ar_preloader_seen")) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("ar_preloader_seen", "true");
          }, 300);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + step, 100);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  const handleSkip = () => {
    setLoading(false);
    sessionStorage.setItem("ar_preloader_seen", "true");
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 bg-midnight flex flex-col justify-between p-8 sm:p-14 select-none"
        >
          {/* Top header */}
          <div className="flex items-center justify-between text-xs font-hacker text-muted uppercase">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              <span className="text-cyan">[SYS_INIT]</span> {"//"} PROTOCOL::AKSHAY_RATHOD
            </span>
            <button
              onClick={handleSkip}
              className="text-cyan/80 hover:text-cyan transition-colors border border-cyan/30 px-3 py-1 rounded-full text-[11px] font-hacker"
            >
              [SKIP_BOOT_ESC]
            </button>
          </div>

          {/* Center Title */}
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="font-hacker text-xs text-cyan tracking-widest uppercase">
              &gt; INITIALIZING_NEURAL_SUBSYSTEMS...
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-robotic font-black text-3xl sm:text-5xl md:text-6xl tracking-widest text-white cyber-glitch-text"
            >
              AKSHAY RATHOD
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs sm:text-sm font-hacker tracking-widest text-cyan uppercase"
            >
              [ DATA_ENGINEERING // GENAI_RAG // AUTONOMOUS_AGENTS ]
            </motion.p>
          </div>

          {/* Bottom Progress Bar & Terminal Counter */}
          <div className="max-w-xl mx-auto w-full space-y-2">
            <div className="flex justify-between items-center text-xs font-hacker text-muted">
              <span className="text-slate-400">
                {progress < 40
                  ? "> ALLOCATING VECTOR SPACE (TF-IDF)..."
                  : progress < 75
                  ? "> COMILING PANDAS AST SANDBOX..."
                  : "> CALIBRATING TRANSMISSION SHADERS [OK]"}
              </span>
              <span className="text-cyan font-bold font-robotic">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-deep-navy/80 rounded-full overflow-hidden border border-cyan/20">
              <motion.div
                className="h-full bg-gradient-to-r from-electric-blue via-cyan to-emerald-400 shadow-[0_0_12px_#22d3ee]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
