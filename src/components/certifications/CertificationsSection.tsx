"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import {
  Award,
  Trophy,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Medal,
} from "lucide-react";
import { motion } from "framer-motion";

import SceneTitle from "@/components/cinematic/SceneTitle";

export default function CertificationsSection() {
  const featuredCert = siteConfig.certifications.find((c) => c.featured);
  const otherCerts = siteConfig.certifications.filter((c) => !c.featured);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SceneTitle
          sceneNumber="06"
          sceneName="THE CREDENTIALS"
          headline="INDUSTRY CERTIFICATIONS &"
          highlightedText="COMPETITIVE MILESTONES."
          description="Validated competencies in machine learning and data engineering from premier institutions, paired with verified coding hackathons."
        />

        {/* Part A: Featured Certification Hero Card */}
        {featuredCert && (
          <div className="mb-14">
            <div className="p-8 sm:p-10 rounded-2xl glass-panel border border-cyan/40 bg-gradient-to-r from-deep-navy/90 via-[#0d1c3a]/70 to-[#181335]/70 relative overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)]">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan/15 to-electric-blue/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-cyan/20 text-cyan border border-cyan/40">
                      Featured Industry Certification
                    </span>
                    <span className="text-xs font-mono text-muted">
                      {featuredCert.issuer}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white">
                    {featuredCert.title}
                  </h3>

                  <p className="text-sm text-slate-300 font-body leading-relaxed">
                    Validates expertise in designing, building, operationalizing, securing, and monitoring data processing systems with a focus on security, scalability, and efficiency.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start md:items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-cyan/40 flex items-center justify-center text-cyan shadow-cyan-glow">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  {featuredCert.verifyUrl ? (
                    <a
                      href={featuredCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-electric-blue text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-glow flex items-center gap-2"
                    >
                      <span>Verify Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-glass-border text-xs font-mono text-cyan">
                      Verified Credential
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Part B: Certifications Grid */}
        <div className="space-y-4 mb-16">
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan" />
            <span>Additional Specialized Certifications</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCerts.map((cert) => (
              <div
                key={cert.title}
                className="p-5 rounded-xl glass-card flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan bg-cyan/10 px-2 py-0.5 rounded border border-cyan/20">
                      {cert.badge || "Verified"}
                    </span>
                    <span className="text-[11px] font-mono text-muted">
                      {cert.issuer}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white group-hover:text-cyan transition-colors">
                    {cert.title}
                  </h4>
                </div>

                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-muted hover:text-white pt-2 border-t border-glass-border/40"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <div className="pt-2 border-t border-glass-border/40 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <CheckCircle className="w-3 h-3 text-cyan" />
                    <span>Completed & Verified</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Part C: Achievements & Hackathons (Dedicated Trophy Cards) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-wider text-muted flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Competitive Programming & Hackathons</span>
            </h3>
            <span className="text-xs font-mono text-cyan">National Recognition</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.achievements.map((ach) => (
              <div
                key={ach.title}
                className="p-6 rounded-2xl glass-panel border border-glass-border hover:border-amber-400/50 transition-all duration-300 space-y-4 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 shadow-[0_0_15px_rgba(251,191,36,0.15)] group-hover:scale-110 transition-transform">
                    <Medal className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-muted bg-white/5 px-2.5 py-1 rounded-full border border-glass-border">
                    {ach.year}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-heading font-black text-xl text-white group-hover:text-amber-300 transition-colors">
                    {ach.title}
                  </h4>
                  <div className="text-xs font-mono text-cyan">
                    {ach.event} · {ach.organization}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
