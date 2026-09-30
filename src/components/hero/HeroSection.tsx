"use client";

import React from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/data/site";
import { ArrowDown, Sparkles, Terminal, MapPin, Database } from "lucide-react";
import { motion } from "framer-motion";
import AnamorphicFlare from "@/components/cinematic/AnamorphicFlare";

// Lazy-load 3D Canvas with ssr: false
const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full border border-cyan/20 animate-pulse bg-deep-navy/40" />
    </div>
  ),
});

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.35,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle ambient lighting orbs in background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-violet/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ambient-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            {/* Eyebrow badge with robotic / hacker tag */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-deep-navy/80 border border-cyan/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
                </span>
                <span className="text-xs font-hacker font-medium tracking-widest text-cyan uppercase flex items-center gap-1.5">
                  <span className="text-muted">[</span>
                  <span>{siteConfig.status}</span>
                  <span className="text-muted">]</span>
                </span>
              </div>
            </motion.div>

            {/* Oversized Robotic Cyber Name */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="font-robotic font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white cyber-glitch-text">
                AKSHAY
                <span className="block text-gradient-cyan-blue">
                  RATHOD
                </span>
              </h1>
              <div className="flex items-center gap-3 pt-3">
                <span className="h-[2px] w-8 bg-cyan rounded-full shadow-[0_0_8px_#22d3ee]" />
                <h2 className="font-hacker text-base sm:text-xl md:text-2xl text-cyan font-bold tracking-wider flex items-center gap-1.5">
                  <span className="text-muted">&gt;</span>
                  <span>{siteConfig.role}</span>
                  <span className="inline-block w-2 h-4 bg-cyan animate-pulse" />
                </h2>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-300 font-body max-w-xl leading-relaxed"
            >
              {siteConfig.tagline}
            </motion.p>

            {/* Telemetry HUD stats banner */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-6 py-2 w-full max-w-lg"
            >
              <div className="p-3.5 rounded-xl bg-deep-navy/70 border border-cyan/20 shadow-glass">
                <div className="text-lg sm:text-2xl font-robotic font-bold text-white tracking-wider">
                  98%
                </div>
                <div className="text-[11px] font-hacker text-cyan uppercase tracking-wider">
                  {"//"} RAG.PRECISION
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-deep-navy/70 border border-cyan/20 shadow-glass">
                <div className="text-lg sm:text-2xl font-robotic font-bold text-cyan tracking-wider">
                  24+
                </div>
                <div className="text-[11px] font-hacker text-cyan uppercase tracking-wider">
                  {"//"} REPOS.DEPLOYED
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-deep-navy/70 border border-violet/30 shadow-glass">
                <div className="text-lg sm:text-2xl font-robotic font-bold text-violet tracking-wider">
                  1st
                </div>
                <div className="text-[11px] font-hacker text-violet uppercase tracking-wider">
                  {"//"} HARD.100D.RANK
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-electric-blue via-blue-600 to-violet text-white font-heading font-semibold text-sm tracking-wide shadow-glow hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center"
                data-cursor-text="Explore"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-heading font-semibold text-sm tracking-wide border border-glass-border hover:border-cyan/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center"
                data-cursor-text="Connect"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Location tag */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-xs font-mono text-muted pt-2"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan" />
              <span>{siteConfig.location}</span>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Refractive Data Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="lg:col-span-5 relative w-full flex items-center justify-center"
          >
            <div className="w-full max-w-[480px] lg:max-w-none aspect-square relative flex items-center justify-center">
              {/* Radial backdrop */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan/10 via-electric-blue/10 to-violet/10 blur-2xl pointer-events-none" />
              <AnamorphicFlare />
              <Hero3DCanvas />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex justify-center mt-8">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-xs font-mono tracking-widest text-muted hover:text-cyan transition-colors"
            aria-label="Scroll to about section"
          >
            <span className="uppercase text-[10px]">Scroll Down</span>
            <div className="w-5 h-9 rounded-full border border-glass-border flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-cyan"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
