"use client";

import React from "react";
import CoderArcade from "./CoderArcade";
import { Gamepad2, Sparkles, Terminal, Cpu } from "lucide-react";

export default function CoderGameSection() {
  return (
    <section id="coder-arcade" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono font-semibold mb-3">
            <Gamepad2 className="w-3.5 h-3.5 text-cyan" />
            <span>INTERACTIVE EXPERIENTIAL ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-mono">
            NEURAL BUG DEFENDER <span className="text-cyan">// ARCADE</span>
          </h2>

          <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Take a hands-on break from exploring engineering credentials! Battle memory leaks, null pointers, and AI hallucinations with <b>Google BigQuery</b> blasts and <b>PySpark</b> overclocks in this real-time canvas game.
          </p>
        </div>

        {/* The Game Console */}
        <CoderArcade />

        {/* Tactical Specs Grid Below Game */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex items-start gap-3">
            <Terminal className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white mb-1">REAL-TIME CANVAS PHYSICS</h4>
              <p className="text-slate-400">Zero-dependency 120 FPS HTML5 2D canvas with procedural neon particles and collision detection.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white mb-1">DATA STACK SUPERMOVES</h4>
              <p className="text-slate-400">Deploy BigQuery full-partition wipes, PySpark multi-threaded spread lasers, and Power BI shields.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white mb-1">SYNTHESIZED WEB AUDIO</h4>
              <p className="text-slate-400">Dynamic retro sci-fi audio synthesized purely via the Web Audio API with zero external audio assets.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
