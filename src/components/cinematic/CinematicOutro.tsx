"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { useCinematic } from "@/components/providers/CinematicProvider";
import { sfx } from "@/utils/audio";
import { RotateCcw, FileDown, Send, ArrowUp, Film, Sparkles } from "lucide-react";

export default function CinematicOutro() {
  const { setIsIntroActive, setLetterboxOpen } = useCinematic();

  const handleReplayIntro = () => {
    sfx.playWhoosh();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setIsIntroActive(true);
      setLetterboxOpen(true);
    }, 400);
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      sfx.select();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    sfx.select();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative py-28 bg-[#03050a] text-white border-t border-cyan/20 overflow-hidden">
      {/* Background Volumetric Glow (Noisy grain removed) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-electric-blue/10 via-cyan/15 to-violet/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-14">
        {/* Anamorphic Header Streak */}
        <div className="relative w-full max-w-xl mx-auto flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent shadow-[0_0_20px_#22d3ee]" />
          <div className="absolute px-4 py-1 rounded-full bg-deep-navy border border-cyan/40 text-[10px] font-mono tracking-[0.3em] text-cyan uppercase flex items-center gap-2">
            <Film className="w-3 h-3 text-cyan" />
            <span>EXECUTIVE CREDITS // THE FINALE</span>
          </div>
        </div>

        {/* Big Cinematic "THE END" Title */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-robotic font-black text-5xl sm:text-7xl md:text-8xl tracking-widest text-white drop-shadow-[0_0_50px_rgba(34,211,238,0.25)]"
          >
            THE END.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs sm:text-sm font-mono tracking-[0.25em] text-slate-400 uppercase max-w-xl mx-auto"
          >
            END OF TRANSMISSION // THANK YOU FOR VIEWING
          </motion.p>
        </div>

        {/* Film Production Credits Grid (Movie Trailer Style) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto p-8 rounded-2xl glass-panel border border-cyan/20 bg-deep-navy/40 backdrop-blur-xl"
        >
          {/* Credit Column 1 */}
          <div className="space-y-2 text-left border-b md:border-b-0 md:border-r border-glass-border pb-4 md:pb-0 md:pr-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan font-bold">
              {"//"} LEAD ENGINEER &amp; ARCHITECT
            </div>
            <div className="font-robotic font-bold text-lg text-white">
              {siteConfig.fullName}
            </div>
            <div className="text-xs font-mono text-slate-400">
              {siteConfig.role}
            </div>
            <div className="text-[11px] font-mono text-muted">
              {siteConfig.education.qualification} ({siteConfig.education.institution})
            </div>
          </div>

          {/* Credit Column 2 */}
          <div className="space-y-2 text-left border-b md:border-b-0 md:border-r border-glass-border pb-4 md:pb-0 md:pr-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan font-bold">
              {"//"} CORE CAPABILITIES
            </div>
            <div className="text-xs font-mono text-slate-300 space-y-1">
              <div>• Autonomous GenAI &amp; RAG Multi-Agent Systems</div>
              <div>• Production Data Extraction &amp; BigQuery Pipelines</div>
              <div>• Machine Learning Churn &amp; NLP Models</div>
              <div>• Real-time WebGL 3D Visualization</div>
            </div>
          </div>

          {/* Credit Column 3 */}
          <div className="space-y-2 text-left">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan font-bold">
              {"//"} PRODUCTION SPECS
            </div>
            <div className="text-xs font-mono text-slate-300 space-y-1">
              <div>Format: 2.39:1 Anamorphic Cinema</div>
              <div>Audio: Synthesized Web Audio API</div>
              <div>Framerate: 60 - 144 FPS Fluid</div>
              <div>Status: Available for Deployment</div>
            </div>
          </div>
        </motion.div>

        {/* Action Controls: Replay Intro, Download, Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          {/* Replay Cinematic Intro */}
          <button
            onClick={handleReplayIntro}
            className="px-6 py-3 rounded-xl bg-cyan/15 hover:bg-cyan/25 border border-cyan/40 hover:border-cyan text-cyan hover:text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105"
            data-cursor-text="Replay"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Cinematic Intro</span>
          </button>

          {/* Contact Me */}
          <button
            onClick={scrollToContact}
            className="px-6 py-3 rounded-xl bg-electric-blue hover:bg-blue-600 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2 shadow-glow hover:scale-105"
            data-cursor-text="Contact"
          >
            <Send className="w-4 h-4" />
            <span>Transmit Message</span>
          </button>

          {/* Download Complete Resume */}
          <a
            href={siteConfig.resumeUrl}
            download="Akshay_Rathod_Resume.pdf"
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-glass-border hover:border-cyan/40 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105"
            data-cursor-text="Resume"
          >
            <FileDown className="w-4 h-4 text-cyan" />
            <span>Download Resume (PDF)</span>
          </a>

          {/* Return to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-glass-border hover:border-cyan/40 text-slate-400 hover:text-white transition-all duration-300"
            title="Return to Orbit [Top]"
            aria-label="Return to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Final Sign-off metadata */}
        <div className="pt-6 border-t border-glass-border text-center text-xs font-mono text-muted space-y-1">
          <p>© {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</p>
          <p className="text-[11px] text-slate-500">
            Engineered with Next.js 14, React Three Fiber, Three.js, GSAP &amp; Tailwind CSS.
          </p>
        </div>
      </div>
    </section>
  );
}
