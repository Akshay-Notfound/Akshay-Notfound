import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/site";
import ProjectVisual from "@/components/projects/ProjectVisual";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  const allProjects = [...siteConfig.featuredProjects, ...siteConfig.moreProjects];
  return allProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const allProjects = [...siteConfig.featuredProjects, ...siteConfig.moreProjects];
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | ${siteConfig.name}`,
    description: project.overview,
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const allProjects = [...siteConfig.featuredProjects, ...siteConfig.moreProjects];
  const projectIndex = allProjects.findIndex((p) => p.slug === params.slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = allProjects[projectIndex];
  const nextProject = allProjects[(projectIndex + 1) % allProjects.length];

  return (
    <article className="pt-28 pb-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-electric-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Navigation Bar / Breadcrumb */}
        <div>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-cyan hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-white/5 border border-glass-border hover:border-cyan/40"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {/* Project Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-cyan/15 text-cyan border border-cyan/30">
              {project.category}
            </span>
            {project.metric && (
              <span className="px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20">
                {project.metric}
              </span>
            )}
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-body leading-relaxed max-w-3xl">
            {project.tagline}
          </p>
        </header>

        {/* Blueprint Visual Component */}
        <div className="w-full rounded-2xl glass-panel p-4 sm:p-6 border border-glass-border overflow-hidden">
          <ProjectVisual slug={project.slug} />
        </div>

        {/* Main Content Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Left 2 Cols: Deep Overview, Features, Architecture */}
          <div className="md:col-span-2 space-y-10">
            {/* Overview */}
            <div className="space-y-3">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan" />
                <span>Executive Overview</span>
              </h2>
              <p className="text-base text-slate-300 font-body leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Architecture Pipeline */}
            {project.architecture && (
              <div className="space-y-3 p-6 rounded-2xl glass-panel border border-glass-border">
                <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-electric-blue" />
                  <span>Data & Model Architecture</span>
                </h3>
                <div className="p-4 rounded-xl bg-midnight border border-glass-border font-mono text-xs text-cyan leading-relaxed">
                  {project.architecture}
                </div>
              </div>
            )}

            {/* Core Technical Highlights */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-violet" />
                <span>Key Capabilities & Engineering Features</span>
              </h3>
              <ul className="space-y-3">
                {project.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="p-4 rounded-xl glass-card flex items-start gap-3 text-sm text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Col: Metadata Sidebar */}
          <div className="space-y-6">
            {/* Action Links */}
            <div className="p-6 rounded-2xl glass-panel space-y-4 border border-glass-border">
              <span className="text-xs font-mono uppercase tracking-wider text-muted block">
                Deliverables & Code
              </span>

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider font-semibold border border-glass-border hover:border-cyan/40 transition-colors"
                >
                  <Github className="w-4 h-4 text-cyan" />
                  <span>Inspect Source Code</span>
                </a>
              ) : (
                <div className="p-3 rounded-xl bg-white/5 border border-glass-border text-xs font-mono text-muted text-center">
                  Private Enterprise Repository
                </div>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-electric-blue text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-glow transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Platform</span>
                </a>
              )}
            </div>

            {/* Tech Stack List */}
            <div className="p-6 rounded-2xl glass-panel space-y-3 border border-glass-border">
              <span className="text-xs font-mono uppercase tracking-wider text-muted block">
                Technologies Utilized
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-deep-navy/90 border border-glass-border text-xs font-mono text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Attribution */}
            <div className="p-5 rounded-2xl bg-deep-navy/40 border border-glass-border text-xs font-mono text-muted space-y-1">
              <div>ENGINEER: {siteConfig.name}</div>
              <div>SPECIALIZATION: {siteConfig.role}</div>
            </div>
          </div>
        </div>

        {/* Next Project Footer Bar */}
        <div className="pt-12 border-t border-glass-border flex items-center justify-between">
          <Link
            href="/#projects"
            className="text-xs font-mono text-muted hover:text-white transition-colors"
          >
            ← Back to All Projects
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="flex items-center gap-2 text-xs font-mono text-cyan hover:text-white transition-colors"
          >
            <span>Next System: {nextProject.title}</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
