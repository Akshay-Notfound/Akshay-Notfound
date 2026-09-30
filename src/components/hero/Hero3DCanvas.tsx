"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useCinematic } from "@/components/providers/CinematicProvider";
import { LIQUID_PRESETS, MORPH_SCROLL_MAP } from "@/config/liquid";
import type { LiquidTier } from "@/config/liquid";
import dynamic from "next/dynamic";
import CinematicCameraRig from "@/components/cinematic/CinematicCameraRig";

// Lazy-load heavy shader component
const LiquidChromeMorph = dynamic(
  () => import("./LiquidChromeMorph"),
  { ssr: false, loading: () => null }
);
const LiquidFallback = dynamic(
  () => import("./LiquidFallback"),
  { ssr: false, loading: () => null }
);

// ── Scroll → morph mapping ────────────────────────────────────────────────────
function scrollToMorphT(scrollProgress: number): number {
  // 0.0 → 0.0 (RAW), 0.22 → 1.0 (CLEAN), 0.46 → 2.0 (PIPELINE), 0.72+ → 3.0 (INTEL)
  const { raw, clean, pipeline } = MORPH_SCROLL_MAP;
  if (scrollProgress <= raw.end) {
    return (scrollProgress / raw.end) * 0;       // Stay at 0
  } else if (scrollProgress <= clean.end) {
    return ((scrollProgress - clean.start) / (clean.end - clean.start));
  } else if (scrollProgress <= pipeline.end) {
    return 1.0 + ((scrollProgress - pipeline.start) / (pipeline.end - pipeline.start));
  } else {
    return 2.0 + Math.min(((scrollProgress - pipeline.end) / (1.0 - pipeline.end)), 1.0);
  }
}

// ── WebGL fallback placeholder ─────────────────────────────────────────────────
function NoWebGLFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-[2px] animate-pulse"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.4), rgba(139,92,246,0.3), rgba(34,211,238,0.4))",
          boxShadow: "0 0 80px rgba(59,130,246,0.25)",
        }}
      >
        <div className="w-full h-full rounded-full bg-[#10182b]/80 backdrop-blur-2xl flex items-center justify-center border border-white/10 relative overflow-hidden">
          <div className="absolute inset-4 rounded-full border border-cyan/20 animate-spin" style={{ animationDuration: "20s" }} />
          <div className="w-24 h-24 rounded-full blur-xl" style={{ background: "linear-gradient(135deg, #22d3ee, #3b82f6)", opacity: 0.8 }} />
          <div className="absolute font-mono text-xs tracking-widest text-cyan uppercase font-semibold">LIQUID_CORE</div>
        </div>
      </div>
    </div>
  );
}

// ── Main Canvas ───────────────────────────────────────────────────────────────
export default function Hero3DCanvas() {
  const { reducedMotion } = useSmoothScroll();
  const { config } = useCinematic();

  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [tier, setTier] = useState<LiquidTier>("cinematic");
  const [morphT, setMorphT] = useState(0);
  const morphTRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) setTier("balanced");

    // WebGL check
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch { setHasWebGL(false); }

    // Pause when hero off-screen
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    const heroEl = document.getElementById("hero-section");
    if (heroEl) observer.observe(heroEl);

    // Scroll → morphT
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(window.scrollY / totalHeight, 1);
      const newMorphT = scrollToMorphT(progress);
      if (Math.abs(newMorphT - morphTRef.current) > 0.005) {
        morphTRef.current = newMorphT;
        setMorphT(newMorphT);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!mounted) return <NoWebGLFallback />;
  if (!hasWebGL) return <NoWebGLFallback />;

  const dprRange: [number, number] = isMobile ? [1, 1.25] : [1, 1.75];
  const cfg = LIQUID_PRESETS[tier];
  const useFallback = cfg.useFallback || reducedMotion;

  return (
    <div className="w-full h-full min-h-[350px] sm:min-h-[450px] lg:min-h-[550px] relative bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: config.camera.fov }}
        dpr={dprRange}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: 4, // ACESFilmic
          toneMappingExposure: 1.1,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ background: "transparent" }}
        frameloop={isInView && !reducedMotion ? "always" : "demand"}
      >
        {/* Auto-degrade quality tier on low FPS (gradual) */}
        <PerformanceMonitor
          iterations={8}
          flipflops={4}
          threshold={0.65}
          onDecline={() => setTier(prev => prev === "cinematic" ? "balanced" : "performance")}
        />

        <Suspense fallback={null}>
          <CinematicCameraRig reducedMotion={reducedMotion} />

          {useFallback ? (
            <LiquidFallback morphT={morphT} tier={tier} reducedMotion={reducedMotion} />
          ) : (
            <LiquidChromeMorph morphT={morphT} tier={tier} reducedMotion={reducedMotion} />
          )}
        </Suspense>
      </Canvas>

      {/* Morph state label HUD (very subtle, bottom-left) */}
      {!reducedMotion && (
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <div className="text-[9px] font-mono tracking-widest uppercase opacity-30 text-cyan">
            {morphT < 1 ? "STATE_00 // RAW"
             : morphT < 2 ? "STATE_01 // CLEAN"
             : morphT < 3 ? "STATE_02 // PIPELINE"
             : "STATE_03 // INTELLIGENCE"}
          </div>
        </div>
      )}
    </div>
  );
}
