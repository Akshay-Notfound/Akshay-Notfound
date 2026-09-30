"use client";

import React, { useState } from "react";
import { siteConfig, SkillCategory } from "@/data/site";
import { Sparkles, Layers, Cpu, Database, BarChart3, Cloud, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SceneTitle from "@/components/cinematic/SceneTitle";

const categoryIcons: Record<string, React.ReactNode> = {
  "GenAI & LLM Engineering": <Cpu className="w-4 h-4" />,
  "Data Engineering": <Database className="w-4 h-4" />,
  "Analytics & BI": <BarChart3 className="w-4 h-4" />,
  "Cloud & Big Data": <Cloud className="w-4 h-4" />,
  "Software Engineering": <Terminal className="w-4 h-4" />,
};

export default function SkillsConstellation() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = siteConfig.skills[activeCategoryIndex];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-deep-navy/20">
      {/* Background radial highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700"
        style={{
          backgroundColor: `${activeCategory.glowColor}15`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SceneTitle
          sceneNumber="03"
          sceneName="THE MATRIX"
          headline="SPECIALIZED CAPABILITY"
          highlightedText="MATRIX."
          description="Categorized across the entire data engineering and artificial intelligence lifecycle. Click any cluster to inspect technologies."
        />

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 pb-8 border-b border-glass-border" role="tablist">
          {siteConfig.skills.map((cat, idx) => {
            const isActive = idx === activeCategoryIndex;
            return (
              <button
                key={cat.name}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-mono text-xs tracking-wider uppercase transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
                  isActive
                    ? "bg-white/10 text-white border border-cyan/50 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                    : "bg-deep-navy/40 text-muted hover:text-white hover:bg-white/5 border border-glass-border"
                }`}
                data-cursor-text="Select"
              >
                <span
                  style={{ color: isActive ? "#22d3ee" : cat.glowColor }}
                >
                  {categoryIcons[cat.name] || <Layers className="w-4 h-4" />}
                </span>
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-60">({cat.skills.length})</span>
              </button>
            );
          })}
        </div>

        {/* Active Constellation Canvas / Panel */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Constellation Nodes Graphic Display */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel relative min-h-[380px] flex flex-col justify-between overflow-hidden">
            {/* Visual background star/grid effect */}
            <div className="absolute inset-0 bg-ambient-grid opacity-40 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan block">
                  Active Cluster
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  {activeCategory.name}
                </h3>
              </div>
              <div
                className="w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: activeCategory.glowColor }}
              />
            </div>

            {/* Glowing floating skill nodes */}
            <div className="relative z-10 py-8 flex flex-wrap gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-2.5 sm:gap-3 w-full"
                >
                  {activeCategory.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2.5 rounded-xl bg-deep-navy/80 border border-glass-border hover:border-cyan/50 text-white font-mono text-xs tracking-wide flex items-center gap-2 shadow-glass transition-colors cursor-default"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: activeCategory.glowColor }}
                      />
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative z-10 border-t border-glass-border/60 pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted font-mono gap-2">
              <span>{activeCategory.description}</span>
              <span className="text-cyan">{activeCategory.skills.length} VERIFIED STACK NODES</span>
            </div>
          </div>

          {/* Detailed Context Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl glass-panel space-y-4">
              <div className="flex items-center gap-2 text-cyan font-mono text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Architecture Focus</span>
              </div>
              <h4 className="font-heading font-bold text-lg text-white">
                How I apply {activeCategory.name}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                {activeCategory.name === "GenAI & LLM Engineering" &&
                  "Developing autonomous agents capable of semantic schema discovery, natural-language query compilation to executable Pandas scripts, and multi-provider failover across OpenAI and Anthropic."}
                {activeCategory.name === "Data Engineering" &&
                  "Building hardened extraction, transformation, and ingestion pipelines with SQLite, BigQuery, and Python that maintain integrity across messy real-world schemas and edge-case encodings."}
                {activeCategory.name === "Analytics & BI" &&
                  "Generating quantitative exploratory data analysis, KPI performance dashboards, churn inflection curves, and executive-ready visualizations in Power BI, Tableau, and Plotly."}
                {activeCategory.name === "Cloud & Big Data" &&
                  "Leveraging Google Cloud platform services, scalable data modeling with Apache Spark/Kafka, distributed repository workflows, and reproducible CI/CD pipelines."}
                {activeCategory.name === "Software Engineering" &&
                  "Developing full-stack web applications with FastAPI and Next.js, implementing REST APIs, and applying object-oriented design and rigorous testing standards."}
              </p>

              <div className="pt-2 border-t border-glass-border">
                <span className="text-xs font-mono text-muted">
                  Proficiency: Advanced Production Implementation
                </span>
              </div>
            </div>

            {/* Quick overview of all clusters */}
            <div className="p-4 rounded-xl bg-deep-navy/30 border border-glass-border flex items-center justify-between text-xs font-mono text-muted">
              <span>Constellation Clusters</span>
              <span className="text-white font-bold">5 Specialized Domains</span>
            </div>
          </div>
        </div>

        {/* Accessible Fallback (Screen Readers / No-JS fallback) */}
        <div className="sr-only">
          <h3>Full List of Technical Skills</h3>
          {siteConfig.skills.map((cat) => (
            <div key={cat.name}>
              <h4>{cat.name}</h4>
              <ul>
                {cat.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
