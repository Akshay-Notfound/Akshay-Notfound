"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Project } from "@/data/site";
import ProjectVisual from "./ProjectVisual";
import { Github, ExternalLink, ArrowRight, Layers, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  isFlagship?: boolean;
}

export default function ProjectCard({
  project,
  isFlagship = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage for specular glow
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    setGlowX(px);
    setGlowY(py);

    // Calculate 3D tilt (max ~8 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className={`w-full ${isFlagship ? "lg:col-span-12" : "lg:col-span-6"}`}
    >
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="w-full rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.22)] transition-all duration-300"
      >
        {/* Specular dynamic light tracking */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 350px at ${glowX}% ${glowY}%, rgba(59, 130, 246, 0.18), transparent 70%)`,
          }}
        />

        <div className="relative z-10 space-y-6">
          {/* Cyber corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan/40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan/40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan/40 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan/40 pointer-events-none" />

          {/* Header row: Loadout Category & Tier */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-hacker tracking-wider uppercase bg-cyan/10 border border-cyan/40 text-cyan">
                LOADOUT // {project.category}
              </span>
              {isFlagship && (
                <span className="px-3 py-1 rounded-full text-[11px] font-hacker tracking-wider uppercase bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
                  ★ S-TIER LEGENDARY
                </span>
              )}
            </div>

            {project.metric && (
              <span className="text-xs font-hacker text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {project.metric}
              </span>
            )}
          </div>

          {/* Visual Showcase Graphic with 3D Depth Parallax */}
          <div
            className="w-full overflow-hidden rounded-xl border border-cyan/20 transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${-rotateY * 1.2}px, ${rotateX * 1.2}px, 0)`,
            }}
          >
            <ProjectVisual slug={project.slug} />
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h3 className="font-robotic font-black text-2xl sm:text-3xl text-white group-hover:text-cyan transition-colors tracking-wide">
              {project.title}
            </h3>
            <p className="text-sm font-body text-slate-300 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Key Feature Bullets */}
          <div className="space-y-2 border-t border-glass-border/60 pt-4">
            <span className="text-[11px] font-hacker uppercase tracking-widest text-cyan block">
              {"//"} TACTICAL SPECIFICATIONS:
            </span>
            <ul className="space-y-1.5">
              {project.features.slice(0, isFlagship ? 4 : 3).map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300 font-body">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-deep-navy/90 border border-cyan/20 text-[11px] font-hacker text-slate-200"
              >
                [{t}]
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Action Links */}
        <div className="relative z-10 pt-6 mt-6 border-t border-glass-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-white border border-glass-border hover:border-cyan/40 transition-colors"
                data-cursor-text="Code"
              >
                <Github className="w-3.5 h-3.5 text-cyan" />
                <span>Source</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-electric-blue/20 hover:bg-electric-blue/30 text-xs font-mono text-cyan border border-electric-blue/40 transition-colors"
                data-cursor-text="Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1 text-xs font-mono text-cyan hover:text-white group-hover:translate-x-1 transition-all"
            data-cursor-text="Detail"
          >
            <span>Inspect Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
