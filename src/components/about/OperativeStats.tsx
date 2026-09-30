"use client";

import React from "react";
import { Shield, Zap, Target, Award, Cpu, Terminal } from "lucide-react";

export default function OperativeStats() {
  const stats = [
    { name: "GENAI_RAG_SYSTEMS", value: 98, tier: "S-TIER", desc: "TF-IDF + Cosine Schema Compiler" },
    { name: "SQL_DATA_PIPELINES", value: 96, tier: "S-TIER", desc: "Relational Staging & ETL" },
    { name: "ALGORITHMIC_SPEED_DSA", value: 95, tier: "S-TIER", desc: "1st Rank 100 Days Hard Challenge" },
    { name: "ANALYTICS_BI_MODELING", value: 94, tier: "A-TIER", desc: "Churn Hazard & Inflection Discovery" },
    { name: "CLOUD_BIG_DATA_GCP", value: 92, tier: "A-TIER", desc: "Google Cloud Certified Data Engineer" },
    { name: "FULLSTACK_SYSTEMS", value: 90, tier: "A-TIER", desc: "FastAPI + Next.js + Reactive UI" },
  ];

  const perks = [
    { title: "AUTONOMOUS AST SANDBOX", desc: "Compiles natural-language queries into sandboxed Pandas execution safely" },
    { title: "MULTI-LLM FAILOVER", desc: "Hot-swappable inference across OpenAI GPT, Anthropic Claude & offline mocks" },
    { title: "100-DAY COMBAT VETERAN", desc: "Rank #1 conqueror of 100 consecutive algorithmic competitive challenges" },
    { title: "HIGHWAY INGESTION", desc: "Heuristic delimiter detection and robust schema drift recovery" },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-cyan/30 space-y-6 relative overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-ambient-grid opacity-30 pointer-events-none" />

      {/* Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan/20 pb-4 relative z-10">
        <div>
          <span className="text-[10px] font-hacker text-cyan uppercase tracking-widest block">
            {"//"} OPERATIVE ATTRIBUTE DOSSIER
          </span>
          <h3 className="font-robotic font-bold text-xl text-white">
            OPERATIVE: AKSHAY_RATHOD
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-cyan/10 border border-cyan/40 text-cyan font-hacker text-xs font-bold tracking-wider">
            CLASS: DATA & AI SPECIALIST
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-hacker text-xs">
            LVL.2026
          </span>
        </div>
      </div>

      {/* Attribute Stat Meters (Game RPG Style) */}
      <div className="space-y-4 relative z-10">
        <span className="text-xs font-hacker uppercase tracking-widest text-slate-300 flex items-center gap-2">
          <Target className="w-3.5 h-3.5 text-cyan" />
          <span>Combat Attribute Allocations</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.name}
              className="p-3.5 rounded-xl bg-deep-navy/80 border border-glass-border hover:border-cyan/40 transition-colors space-y-2"
            >
              <div className="flex justify-between items-center text-xs font-hacker">
                <span className="text-white font-bold">{s.name}</span>
                <span className="text-cyan font-robotic">{s.value} / 100</span>
              </div>
              <div className="w-full h-2 bg-midnight rounded-full overflow-hidden border border-glass-border p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-electric-blue via-cyan to-emerald-400 rounded-full shadow-[0_0_6px_#22d3ee]"
                  style={{ width: `${s.value}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-muted">
                <span>{s.desc}</span>
                <span className="text-amber-400 font-bold">{s.tier}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlocked Perks Matrix */}
      <div className="space-y-3 pt-2 border-t border-cyan/20 relative z-10">
        <span className="text-xs font-hacker uppercase tracking-widest text-slate-300 flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Unlocked Tactical Perks</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {perks.map((p) => (
            <div
              key={p.title}
              className="p-3 rounded-lg bg-deep-navy/50 border border-glass-border flex items-start gap-2.5 text-xs"
            >
              <Zap className="w-3.5 h-3.5 text-cyan shrink-0 mt-0.5" />
              <div>
                <span className="font-hacker font-bold text-white block">
                  [{p.title}]
                </span>
                <span className="text-[11px] text-muted font-body">
                  {p.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
