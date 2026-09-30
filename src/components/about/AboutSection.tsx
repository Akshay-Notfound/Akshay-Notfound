"use client";

import React from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/data/site";
import { GraduationCap, Code2, Cpu, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import OperativeStats from "./OperativeStats";

const About3DVisual = dynamic(() => import("./About3DVisual"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[340px] sm:h-[400px] rounded-2xl glass-panel flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border border-cyan/30 animate-pulse" />
    </div>
  ),
});

import SceneTitle from "@/components/cinematic/SceneTitle";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SceneTitle
          sceneNumber="02"
          sceneName="THE ENGINEER"
          headline="ENGINEERING INTELLIGENCE THROUGH"
          highlightedText="DEEP DATA ARCHITECTURE."
        />

        {/* Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Education */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-base sm:text-lg text-slate-300 font-body leading-relaxed">
              <p className="border-l-2 border-cyan pl-4 text-white font-medium">
                {siteConfig.bio}
              </p>
              <p className="text-muted text-sm sm:text-base">
                Whether deploying custom retrieval algorithms for enterprise schema understanding, structuring low-latency ETL workflows, or implementing full-stack applications with modern frameworks, I focus on building systems that are robust, explainable, and production-ready.
              </p>
            </div>

            {/* Education Card (Explicitly Dr. BATU B.Tech AIML Aug 2022 - May 2026) */}
            <div className="p-6 rounded-2xl glass-panel space-y-4 border border-glass-border relative overflow-hidden group hover:border-electric-blue/40 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-electric-blue/15 text-cyan border border-electric-blue/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted">
                    Formal Education
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    {siteConfig.education.qualification}
                  </h3>
                </div>
              </div>

              <div className="space-y-2 pt-1 border-t border-glass-border/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-1">
                  <span className="text-white font-medium">
                    {siteConfig.education.institution}
                  </span>
                  <span className="font-mono text-xs text-cyan bg-cyan/10 px-2.5 py-0.5 rounded-full w-fit">
                    {siteConfig.education.duration}
                  </span>
                </div>
                <p className="text-xs text-muted">
                  Focus: {siteConfig.education.focus}
                </p>
              </div>
            </div>

            {/* Core Competencies highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-deep-navy/40 border border-glass-border">
                <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-white font-semibold block">Production GenAI & RAG</span>
                  <span className="text-muted">TF-IDF vector matching, AST sanitization, LLM providers</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-deep-navy/40 border border-glass-border">
                <CheckCircle2 className="w-4 h-4 text-electric-blue shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-white font-semibold block">Data Ingestion & Warehousing</span>
                  <span className="text-muted">High-scale SQL pipelines, BigQuery, SQLite & schema modeling</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Visualization */}
          <div className="lg:col-span-5 space-y-4">
            <About3DVisual />
            <div className="p-4 rounded-xl glass-panel flex items-center justify-between text-xs font-hacker text-muted border border-cyan/20">
              <span className="text-slate-300">{"//"} OPERATIVE_STATUS</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5 font-hacker">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                [AVAILABLE_FOR_DEPLOYMENT]
              </span>
            </div>
          </div>
        </div>

        {/* Game Operative Stats & Perk Matrix */}
        <div className="mt-14">
          <OperativeStats />
        </div>
      </div>
    </section>
  );
}
