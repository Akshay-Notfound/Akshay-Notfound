"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/data/site";
import {
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  Linkedin,
  Github,
  FileDown,
  Sparkles,
  MapPin,
  AlertCircle,
} from "lucide-react";
import SceneTitle from "@/components/cinematic/SceneTitle";

const Contact3DObject = dynamic(() => import("./Contact3DObject"), {
  ssr: false,
  loading: () => <div className="w-full h-[220px]" />,
});

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        setErrorMessage(
          data.errors?.[0]?.message || data.message || "Failed to deliver message."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try direct email instead.");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SceneTitle
          sceneNumber="07"
          sceneName="THE TRANSMISSION"
          headline="LET’S ENGINEER SOMETHING"
          highlightedText="IMPACTFUL TOGETHER."
          description="Available for full-time Data & AI Engineering roles, pipeline consultations, and collaborative technical initiatives."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & 3D Object */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel space-y-6 border border-glass-border">
              <Contact3DObject />

              <div className="space-y-4">
                <h3 className="font-heading font-bold text-xl text-white">
                  Direct Channels
                </h3>

                {/* Email with copy button */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-deep-navy/80 border border-glass-border">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-cyan" />
                    <span className="text-xs font-mono text-white select-all">
                      {siteConfig.email}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(siteConfig.email, "email")}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-colors"
                    title="Copy Email"
                    aria-label="Copy Email"
                    data-cursor-text="Copy"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone with copy button */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-deep-navy/80 border border-glass-border">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-electric-blue" />
                    <span className="text-xs font-mono text-white select-all">
                      {siteConfig.phone}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(siteConfig.phone, "phone")}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-colors"
                    title="Copy Phone"
                    aria-label="Copy Phone"
                    data-cursor-text="Copy"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-deep-navy/50 border border-glass-border text-xs font-mono text-muted">
                  <MapPin className="w-4 h-4 text-violet" />
                  <span>{siteConfig.location}</span>
                </div>
              </div>

              {/* Social and Resume links */}
              <div className="pt-4 border-t border-glass-border flex flex-wrap gap-2.5">
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-glass-border text-xs font-mono text-white transition-colors"
                  data-cursor-text="Open"
                >
                  <Linkedin className="w-3.5 h-3.5 text-electric-blue" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-glass-border text-xs font-mono text-white transition-colors"
                  data-cursor-text="Open"
                >
                  <Github className="w-3.5 h-3.5 text-cyan" />
                  <span>GitHub</span>
                </a>
                <a
                  href={siteConfig.resumeUrl}
                  download="Akshay_Rathod_Resume.pdf"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-electric-blue/15 hover:bg-electric-blue/25 border border-electric-blue/40 text-cyan text-xs font-mono tracking-wider uppercase font-semibold transition-colors"
                  data-cursor-text="PDF"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Complete Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl glass-panel border border-glass-border space-y-6">
              <div className="space-y-1">
                <h3 className="font-heading font-black text-2xl text-white">
                  Send a Message
                </h3>
                <p className="text-xs font-mono text-muted">
                  Fill out the form below and I will respond within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot anti-spam field */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    value={formData.honeypot}
                    onChange={(e) =>
                      setFormData({ ...formData, honeypot: e.target.value })
                    }
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-deep-navy/80 border border-glass-border focus:border-cyan focus:outline-none text-sm text-white placeholder-slate-500 font-body transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="s.jenkins@enterprise.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-deep-navy/80 border border-glass-border focus:border-cyan focus:outline-none text-sm text-white placeholder-slate-500 font-body transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted">
                    Project Requirements / Inquiry
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your data pipeline requirements, team opening, or technical inquiry..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-deep-navy/80 border border-glass-border focus:border-cyan focus:outline-none text-sm text-white placeholder-slate-500 font-body transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300 font-mono">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300 font-mono">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Message dispatched successfully! Akshay will be in touch shortly.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-electric-blue via-blue-600 to-cyan text-white font-heading font-semibold text-sm tracking-wide shadow-glow hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                  data-cursor-text="Send"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
