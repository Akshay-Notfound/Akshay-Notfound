"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Menu, X, FileDown, Volume2, VolumeX, Sliders } from "lucide-react";
import { useCinematic } from "@/components/providers/CinematicProvider";
import { QualityTier } from "@/config/cinematic";

export default function Navbar() {
  const { tier, setTier, isMuted, toggleMute } = useCinematic();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = React.useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTierDropdown, setShowTierDropdown] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrolled = currentScrollY > 40;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

          const prevY = lastScrollYRef.current;
          if (currentScrollY > prevY && currentScrollY > 150) {
            setIsVisible((prev) => (prev !== false ? false : prev));
          } else {
            setIsVisible((prev) => (prev !== true ? true : prev));
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-midnight/70 backdrop-blur-xl border-b border-glass-border py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-electric-blue rounded-lg"
          data-cursor-text="Home"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue to-cyan p-[1px] shadow-[0_0_15px_rgba(34,211,238,0.35)] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-midnight rounded-[11px] flex items-center justify-center">
              <span className="font-robotic font-black text-sm tracking-wider text-cyan group-hover:text-white transition-colors">
                AR
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-robotic font-bold text-sm tracking-wide text-white group-hover:text-cyan transition-colors">
              {siteConfig.name}
            </span>
            <span className="text-[10px] font-hacker tracking-wider text-cyan/70 uppercase">
              {"//"} SYS.ONLINE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-deep-navy/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-cyan/20 shadow-glass">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-hacker uppercase tracking-widest text-slate-300 hover:text-cyan rounded-full hover:bg-white/5 transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-cyan"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quality Selector */}
          <div className="relative">
            <button
              onClick={() => setShowTierDropdown(!showTierDropdown)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-glass-border hover:border-cyan/40 transition-colors"
              title="Graphic Quality Tier"
            >
              <Sliders className="w-3.5 h-3.5 text-cyan" />
              <span className="uppercase text-[11px] font-bold text-cyan">{tier}</span>
            </button>

            {showTierDropdown && (
              <div className="absolute top-full mt-2 right-0 w-36 rounded-xl bg-midnight/95 border border-cyan/30 shadow-2xl backdrop-blur-xl p-1.5 space-y-1 z-50">
                {(["cinematic", "balanced", "performance"] as QualityTier[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTier(t);
                      setShowTierDropdown(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors ${
                      tier === t
                        ? "bg-cyan/20 text-cyan font-bold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Audio toggle button */}
          <button
            onClick={toggleMute}
            className="flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-glass-border hover:border-cyan/40 transition-colors"
            title="Toggle Audio [M]"
          >
            {!isMuted ? (
              <Volume2 className="w-4 h-4 text-cyan" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          <a
            href={siteConfig.resumeUrl}
            download="Akshay_Rathod_Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium tracking-wider uppercase rounded-xl bg-white/5 hover:bg-white/10 text-white border border-glass-border hover:border-cyan/40 transition-all duration-300 hover:shadow-cyan-glow group outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            data-cursor-text="PDF"
          >
            <FileDown className="w-3.5 h-3.5 text-cyan group-hover:translate-y-0.5 transition-transform" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-glass-border text-white hover:text-cyan transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-midnight/95 backdrop-blur-2xl border-b border-glass-border px-6 py-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-mono tracking-wider uppercase text-muted hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-glass-border flex flex-col gap-2.5">
            <a
              href={siteConfig.resumeUrl}
              download="Akshay_Rathod_Resume.pdf"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-electric-blue text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-glow"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
            <div className="flex justify-between items-center px-2 pt-2 text-xs text-muted font-mono">
              <span>{siteConfig.location}</span>
              <span className="text-cyan font-semibold">Open to Work</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
