"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCinematic } from "@/components/providers/CinematicProvider";

/**
 * CinematicLetterbox
 * Shows the 2.39:1 anamorphic letterbox bars AFTER the intro completes.
 * While isIntroActive, we skip this — the intro itself handles its own bars.
 * After the intro, we keep a subtle top/bottom black bar for the "in film" feel
 * as the user scrolls through the site, then retract them at the bottom.
 */
export default function CinematicLetterbox() {
  const { letterboxOpen, isIntroActive, config, reducedMotion } = useCinematic();

  if (reducedMotion) return null;

  // Only render after intro is done (intro manages its own bars)
  const shouldShow = letterboxOpen && !isIntroActive;
  const barHeight = `${config.intro.letterboxHeightPercent}%`;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[200] overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {shouldShow && (
          <>
            {/* Top 2.39:1 Letterbox Bar */}
            <motion.div
              key="lb-top"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              style={{ height: barHeight }}
              className="absolute top-0 inset-x-0 bg-[#030509]"
            >
              {/* Glowing bottom edge */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.25) 25%, rgba(34,211,238,0.6) 50%, rgba(34,211,238,0.25) 75%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-2 left-5 text-[9px] font-mono tracking-[0.3em] text-slate-700 uppercase select-none">
                2.39:1 // ANAMORPHIC WIDESCREEN
              </div>
            </motion.div>

            {/* Bottom 2.39:1 Letterbox Bar */}
            <motion.div
              key="lb-bottom"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              style={{ height: barHeight }}
              className="absolute bottom-0 inset-x-0 bg-[#030509]"
            >
              {/* Glowing top edge */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.25) 25%, rgba(34,211,238,0.6) 50%, rgba(34,211,238,0.25) 75%, transparent 100%)",
                }}
              />
              <div className="absolute top-2 right-5 text-[9px] font-mono tracking-[0.3em] text-slate-700 uppercase select-none">
                SCENE CAPTURE // 24 FPS
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
