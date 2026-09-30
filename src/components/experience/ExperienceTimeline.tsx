"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import SceneTitle from "@/components/cinematic/SceneTitle";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-deep-navy/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SceneTitle
          sceneNumber="05"
          sceneName="THE CHRONICLES"
          headline="ENGINEERING & ANALYTICS"
          highlightedText="TRACK RECORD."
          description="Demonstrated real-world experience delivering analytical dashboards, automated pipelines, and full-stack applications."
        />

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-glass-border max-w-4xl mx-auto space-y-12">
          {siteConfig.experience.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Node Bullet */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-125 ${
                  exp.current
                    ? "bg-midnight border-cyan shadow-[0_0_15px_#22d3ee]"
                    : "bg-midnight border-electric-blue shadow-[0_0_10px_#3b82f6]"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    exp.current ? "bg-cyan animate-ping" : "bg-electric-blue"
                  }`}
                />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-glass-border hover:border-cyan/40 transition-all duration-300 space-y-5">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-glass-border/60 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan font-semibold flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {exp.company}
                    </span>
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-muted">
                    <span className="flex items-center gap-1.5 text-white/90 bg-white/5 px-3 py-1 rounded-full border border-glass-border w-fit">
                      <Calendar className="w-3.5 h-3.5 text-cyan" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 text-muted text-[11px] pt-0.5">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2.5">
                  {exp.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-slate-300 font-body leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Technology Badges */}
                <div className="pt-2 border-t border-glass-border/40 flex flex-wrap gap-2">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-deep-navy/80 border border-glass-border text-[11px] font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
