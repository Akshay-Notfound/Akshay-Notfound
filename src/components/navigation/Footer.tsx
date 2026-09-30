"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  EyeOff,
  Eye,
} from "lucide-react";

export default function Footer() {
  const { reducedMotion, toggleReducedMotion } = useSmoothScroll();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-glass-border bg-midnight/90 backdrop-blur-xl pt-16 pb-12 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-glass-border">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric-blue to-violet p-[1px]">
                <div className="w-full h-full bg-midnight rounded-[10px] flex items-center justify-center">
                  <span className="font-heading font-black text-xs text-white">AR</span>
                </div>
              </div>
              <span className="font-heading font-bold text-lg text-white">
                {siteConfig.fullName}
              </span>
            </div>
            <p className="text-sm text-muted max-w-md leading-relaxed font-body">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-muted">
                {siteConfig.status}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="#about" className="hover:text-cyan transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="#skills" className="hover:text-cyan transition-colors">
                  Skill Constellation
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-cyan transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-cyan transition-colors">
                  Work Experience
                </Link>
              </li>
              <li>
                <Link href="#certifications" className="hover:text-cyan transition-colors">
                  Certificates & Awards
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-muted">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-cyan" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-electric-blue" />
                <span>LinkedIn Network</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-violet" />
                <span>{siteConfig.email}</span>
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{siteConfig.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted font-mono">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Designed & built with Next.js, Three.js & Tailwind.
          </p>

          <div className="flex items-center gap-4">
            {/* Reduce motion toggle */}
            <button
              onClick={toggleReducedMotion}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-muted hover:text-white border border-glass-border transition-colors"
              aria-label="Toggle reduced motion"
              title="Toggle reduced motion"
            >
              {reducedMotion ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-cyan" />
                  <span>Motion: Off</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-muted" />
                  <span>Motion: On</span>
                </>
              )}
            </button>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-electric-blue hover:text-white text-muted border border-glass-border transition-all duration-300"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
