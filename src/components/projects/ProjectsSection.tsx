"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/site";
import ProjectCard from "./ProjectCard";
import { Sparkles, FolderGit2, ChevronDown, ChevronUp, Github, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SceneTitle from "@/components/cinematic/SceneTitle";

export default function ProjectsSection() {
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SceneTitle
          sceneNumber="04"
          sceneName="THE BLUEPRINTS"
          headline="ARCHITECTED FOR SCALE &"
          highlightedText="ANALYTICAL PRECISION."
          description="Flagship implementations showcasing schema retrieval, full-stack automated intelligence, and data pipeline modeling."
        />

        {/* 3 Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Flagship: GenAI RAG Agent */}
          <ProjectCard
            project={siteConfig.featuredProjects[0]}
            isFlagship={true}
          />

          {/* Project 2: Customer Churn Analysis */}
          <ProjectCard
            project={siteConfig.featuredProjects[1]}
            isFlagship={false}
          />

          {/* Project 3: DataMind AI */}
          <ProjectCard
            project={siteConfig.featuredProjects[2]}
            isFlagship={false}
          />
        </div>

        {/* More Projects Section Toggle */}
        <div className="mt-14 flex flex-col items-center">
          <button
            onClick={() => setShowMoreProjects(!showMoreProjects)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-deep-navy/60 hover:bg-deep-navy border border-glass-border text-xs font-mono tracking-wider uppercase text-cyan hover:border-cyan/50 transition-all duration-300"
            data-cursor-text={showMoreProjects ? "Collapse" : "Expand"}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>
              {showMoreProjects
                ? "Collapse Extended Repositories"
                : "Explore More Software & AI Repositories"}
            </span>
            {showMoreProjects ? (
              <ChevronUp className="w-4 h-4 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-1" />
            )}
          </button>

          <AnimatePresence>
            {showMoreProjects && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden"
              >
                {siteConfig.moreProjects.map((p) => (
                  <div
                    key={p.slug}
                    className="p-6 rounded-xl glass-panel space-y-4 border border-glass-border hover:border-cyan/40 transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded border border-glass-border">
                          {p.category}
                        </span>
                        {p.metric && (
                          <span className="text-[10px] font-mono text-emerald-400">
                            {p.metric}
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-lg text-white">
                        {p.title}
                      </h4>
                      <p className="text-xs text-muted leading-relaxed font-body">
                        {p.overview}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-midnight text-[10px] font-mono text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-glass-border flex items-center justify-between">
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-white transition-colors"
                        >
                          <Github className="w-3.5 h-3.5 text-cyan" />
                          <span>Code</span>
                        </a>
                      )}
                      {p.demoUrl && (
                        <a
                          href={p.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-mono text-cyan hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Site</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
