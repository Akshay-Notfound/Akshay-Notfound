"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCinematic } from "@/components/providers/CinematicProvider";
import { sfx } from "@/utils/audio";

// ─── Constants ────────────────────────────────────────────────────────────────

const FIRST_NAME = "AKSHAY".split("");
const LAST_NAME  = "RATHOD".split("");
const ROLE_TEXT = "DATA & AI ENGINEER";

// Cinematic easing curves — hand-tuned for film feel
const FILM_EASE = [0.16, 1, 0.3, 1] as const;   // swift-out: fast then settle
const EPIC_EASE = [0.25, 0.46, 0.45, 0.94] as const; // natural deceleration

export default function CinematicIntro() {
  const { isIntroActive, setIsIntroActive, setLetterboxOpen, reducedMotion, tier } = useCinematic();
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [phase, setPhase] = useState(0);
  // Keep track of timers to clear them on unmount
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimer = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  const completeIntro = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    sfx.playWhoosh();

    // Exit after outro animation finishes (1.4s)
    const id = setTimeout(() => {
      setIsIntroActive(false);
      setLetterboxOpen(false);
      try { sessionStorage.setItem("ar_cinema_intro_seen", "true"); } catch { /* noop */ }
    }, 1400);
    timersRef.current.push(id);
  }, [exiting, setIsIntroActive, setLetterboxOpen]);

  useEffect(() => {
    if (reducedMotion || tier === "performance") {
      setIsIntroActive(false);
      setLetterboxOpen(false);
      return;
    }
    setMounted(true);
    setLetterboxOpen(true);

    // ── Phase timeline ──────────────────────────────────────────────────
    // 0ms   → Absolute black (mount)
    // 200ms → Letterbox bars slide in (Phase 1)
    // 800ms → Anamorphic streak ignites (Phase 2)
    // 1600ms→ Name reveals letter by letter (Phase 3)
    // 2800ms→ Subtitle & badge fade in (Phase 4)
    // 4000ms→ "Enter" prompt pulses in (Phase 5)
    // 5800ms→ Auto-exit if not clicked
    addTimer(() => { setPhase(1); }, 200);
    addTimer(() => { setPhase(2); sfx.playRiser(1.8); }, 800);
    addTimer(() => { setPhase(3); sfx.playImpact(); }, 1600);
    addTimer(() => { setPhase(4); }, 2800);
    addTimer(() => { setPhase(5); }, 4000);
    addTimer(() => { completeIntro(); }, 5800);

    const onKey = (e: KeyboardEvent) => {
      if (["Escape", " ", "Enter"].includes(e.key)) completeIntro();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      window.removeEventListener("keydown", onKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, tier]);

  if (!isIntroActive || !mounted) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="cinematic-intro-shell"
          className="fixed inset-0 z-[9999] flex flex-col select-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.4, ease: FILM_EASE } }}
          style={{ background: "#030509" }}
        >
          {/* ── Background volumetric light ──────────────────────────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          >
            {/* Deep teal core glow */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 45% at 50% 48%, rgba(34,211,238,0.09) 0%, transparent 70%), " +
                  "radial-gradient(ellipse 50% 30% at 30% 60%, rgba(59,130,246,0.07) 0%, transparent 60%), " +
                  "radial-gradient(ellipse 40% 35% at 72% 35%, rgba(139,92,246,0.06) 0%, transparent 60%)",
              }}
            />
          </motion.div>

          {/* ── CINEMATIC LETTERBOX BARS ─────────────────────────────── */}
          {/* Top bar */}
          <motion.div
            className="relative z-20 w-full flex-shrink-0"
            style={{ height: "11vh", background: "#000" }}
            initial={{ y: "-100%" }}
            animate={{ y: phase >= 1 ? "0%" : "-100%" }}
            transition={{ duration: 0.7, ease: FILM_EASE }}
          >
            {/* Scan-line accent on bottom edge of top bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.6) 30%, rgba(34,211,238,1) 50%, rgba(34,211,238,0.6) 70%, transparent 100%)" }}
            />
            {/* Top bar content: production info */}
            <div className="h-full flex items-center justify-between px-6 sm:px-10">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: phase >= 1 ? 0.7 : 0, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] text-slate-300 uppercase flex items-center gap-2"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#22d3ee", boxShadow: "0 0 6px #22d3ee" }}
                />
                <span>AKSHAY RATHOD // CINEMATIC PORTFOLIO</span>
              </motion.div>
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: phase >= 1 ? 1 : 0, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                onClick={completeIntro}
                className="px-3.5 py-1 rounded-full border text-[10px] font-mono tracking-widest uppercase transition-all duration-300"
                style={{
                  borderColor: "rgba(34,211,238,0.35)",
                  color: "rgba(148,163,184,0.9)",
                  background: "rgba(255,255,255,0.03)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.8)";
                  (e.currentTarget as HTMLElement).style.color = "#22d3ee";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.35)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.9)";
                }}
              >
                SKIP [ESC]
              </motion.button>
            </div>
          </motion.div>

          {/* ── CENTER STAGE ─────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">

            {/* ── ANAMORPHIC HORIZONTAL STREAK ─── (Phase 2) */}
            <AnimatePresence>
              {phase >= 2 && phase < 3 && (
                <motion.div
                  key="anam-streak"
                  className="absolute w-full flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Main beam */}
                  <motion.div
                    className="w-full max-w-4xl h-[2px]"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.4) 10%, #22d3ee 40%, #ffffff 50%, #22d3ee 60%, rgba(34,211,238,0.4) 90%, transparent 100%)",
                      boxShadow: "0 0 40px 4px rgba(34,211,238,0.5), 0 0 80px 8px rgba(34,211,238,0.2)",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* Center flare burst */}
                  <motion.div
                    className="absolute w-6 h-6 rounded-full"
                    style={{ background: "white", filter: "blur(3px)", boxShadow: "0 0 60px 20px rgba(34,211,238,0.8)" }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── MASTER TITLE BLOCK ─── (Phase 3+) */}
            <AnimatePresence>
              {phase >= 3 && (
                <motion.div
                  key="title-block"
                  className="text-center space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Eyebrow: year label */}
                  <motion.div
                    initial={{ opacity: 0, letterSpacing: "0.15em" }}
                    animate={{ opacity: 0.65, letterSpacing: "0.4em" }}
                    transition={{ duration: 1.2, ease: EPIC_EASE }}
                    className="text-[10px] sm:text-[11px] font-mono text-cyan uppercase"
                  >
                    PORTFOLIO // 2026
                  </motion.div>

                  {/* ── NAME — two rows, each nowrap, letter-by-letter blur-to-sharp */}
                  <h1
                    className="font-robotic font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide text-white"
                    style={{ lineHeight: 1.05 }}
                  >
                    {/* Row 1: AKSHAY */}
                    <div className="flex justify-center items-center flex-nowrap">
                      {FIRST_NAME.map((char, i) => (
                        <motion.span
                          key={`fn-${i}`}
                          className="inline-block"
                          initial={{ opacity: 0, filter: "blur(20px)", y: 12 }}
                          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                          transition={{
                            duration: 0.65,
                            delay: i * 0.05,
                            ease: FILM_EASE,
                          }}
                          style={{
                            textShadow: "0 0 60px rgba(34,211,238,0.18), 0 0 120px rgba(59,130,246,0.12)",
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                    {/* Row 2: RATHOD */}
                    <div className="flex justify-center items-center flex-nowrap">
                      {LAST_NAME.map((char, i) => (
                        <motion.span
                          key={`ln-${i}`}
                          className="inline-block"
                          initial={{ opacity: 0, filter: "blur(20px)", y: 12 }}
                          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                          transition={{
                            duration: 0.65,
                            delay: FIRST_NAME.length * 0.05 + i * 0.05,
                            ease: FILM_EASE,
                          }}
                          style={{
                            textShadow: "0 0 60px rgba(34,211,238,0.18), 0 0 120px rgba(59,130,246,0.12)",
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  </h1>

                  {/* ── Subtitle row — Phase 4+ */}
                  <AnimatePresence>
                    {phase >= 4 && (
                      <motion.div
                        key="subtitle"
                        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: FILM_EASE }}
                        className="flex items-center justify-center gap-4 pt-1"
                      >
                        <span
                          className="h-[1px] w-10 sm:w-16"
                          style={{ background: "linear-gradient(90deg, transparent, #22d3ee)" }}
                        />
                        <span
                          className="text-sm sm:text-base md:text-lg font-hacker font-bold tracking-[0.25em] uppercase"
                          style={{ color: "#22d3ee" }}
                        >
                          {ROLE_TEXT}
                        </span>
                        <span
                          className="h-[1px] w-10 sm:w-16"
                          style={{ background: "linear-gradient(270deg, transparent, #22d3ee)" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Tagline micro-text — Phase 4+ */}
                  <AnimatePresence>
                    {phase >= 4 && (
                      <motion.p
                        key="tagline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.55 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-[11px] font-mono tracking-widest text-slate-400 uppercase"
                      >
                        AUTONOMOUS RAG AGENTS · REAL-TIME PIPELINES · ADVANCED ML
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* ── Enter CTA — Phase 5+ */}
                  <AnimatePresence>
                    {phase >= 5 && (
                      <motion.div
                        key="enter-cta"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: FILM_EASE }}
                        className="pt-4"
                      >
                        <button
                          onClick={completeIntro}
                          className="group relative px-7 py-3 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300"
                          style={{
                            background: "linear-gradient(135deg, rgba(34,211,238,0.12), rgba(59,130,246,0.15), rgba(139,92,246,0.12))",
                            border: "1px solid rgba(34,211,238,0.45)",
                            color: "white",
                            boxShadow: "0 0 24px rgba(34,211,238,0.2)",
                          }}
                        >
                          <span className="relative z-10 flex items-center gap-2.5">
                            <span
                              className="w-2 h-2 rounded-full animate-pulse"
                              style={{ background: "#22d3ee", boxShadow: "0 0 8px #22d3ee" }}
                            />
                            ENTER THE EXPERIENCE
                          </span>
                          {/* Shimmer sweep on hover */}
                          <motion.span
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: "linear-gradient(135deg, rgba(34,211,238,0.08), rgba(59,130,246,0.12), rgba(139,92,246,0.08))",
                            }}
                          />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── BOTTOM LETTERBOX BAR ─────────────────────────────────── */}
          <motion.div
            className="relative z-20 w-full flex-shrink-0"
            style={{ height: "11vh", background: "#000" }}
            initial={{ y: "100%" }}
            animate={{ y: phase >= 1 ? "0%" : "100%" }}
            transition={{ duration: 0.7, ease: FILM_EASE }}
          >
            {/* Scan-line accent on top edge of bottom bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.6) 30%, rgba(34,211,238,1) 50%, rgba(34,211,238,0.6) 70%, transparent 100%)" }}
            />
            <div className="h-full flex items-center justify-between px-6 sm:px-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 2 ? 0.5 : 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase"
              >
                4K · 2.39:1 ANAMORPHIC
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 3 ? 0.7 : 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-[10px] font-mono tracking-widest text-slate-400 flex items-center gap-2"
              >
                <span className="text-cyan">SYSTEMS ONLINE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" style={{ boxShadow: "0 0 6px #22d3ee" }} />
              </motion.div>
            </div>
          </motion.div>

          {/* ── EXIT WIPE OVERLAY (slides in from left when exiting) ── */}
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none"
            style={{ background: "#03050a", transformOrigin: "left center" }}
            initial={{ scaleX: 0 }}
            animate={exiting ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
