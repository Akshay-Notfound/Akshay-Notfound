"use client";

import React, { useState, useEffect, useRef } from "react";
import { sfx } from "@/utils/audio";
import { Volume2, VolumeX, Sliders, Eye, Film, Gamepad2 } from "lucide-react";
import { useCinematic } from "@/components/providers/CinematicProvider";
import { QualityTier } from "@/config/cinematic";

export default function GameHUD() {
  const {
    tier,
    setTier,
    config,
    isMuted,
    toggleMute,
    reducedMotion,
    setIsIntroActive,
    setLetterboxOpen,
  } = useCinematic();
  const [activeScene, setActiveScene] = useState("SCENE 01 // THE ARCHITECT");
  const [showTierMenu, setShowTierMenu] = useState(false);
  const activeSceneRef = useRef("SCENE 01 // THE ARCHITECT");
  const fpsSpanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    // Live FPS estimation via direct DOM update (zero React re-renders)
    let lastTime = performance.now();
    let frames = 0;
    let animId: number;

    const calculateFps = (time: number) => {
      frames++;
      if (time - lastTime >= 1000) {
        if (fpsSpanRef.current) {
          fpsSpanRef.current.textContent = `${Math.round((frames * 1000) / (time - lastTime))} FPS`;
        }
        frames = 0;
        lastTime = time;
      }
      animId = requestAnimationFrame(calculateFps);
    };

    if (!isTouch && !reducedMotion) {
      animId = requestAnimationFrame(calculateFps);
    }

    // Scene tracking via IntersectionObserver — runs 100% off the main thread with 0 scroll lag
    const scenes = [
      { id: "hero-section", label: "SCENE 01 // THE ARCHITECT" },
      { id: "about", label: "SCENE 02 // THE ENGINEER" },
      { id: "skills", label: "SCENE 03 // THE MATRIX" },
      { id: "projects", label: "SCENE 04 // THE BLUEPRINTS" },
      { id: "experience", label: "SCENE 05 // THE CHRONICLES" },
      { id: "certifications", label: "SCENE 06 // THE CREDENTIALS" },
      { id: "coder-arcade", label: "SCENE 07 // CODER ARCADE" },
      { id: "contact", label: "SCENE 08 // THE TRANSMISSION" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = scenes.find((s) => s.id === entry.target.id);
            if (found && activeSceneRef.current !== found.label) {
              activeSceneRef.current = found.label;
              setActiveScene(found.label);
            }
          }
        });
      },
      { rootMargin: "-20% 0px -40% 0px", threshold: 0.1 }
    );

    scenes.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Keyboard fast-travel hotkeys (1-7) & sound toggle [M]
    const handleKeyDown = (e: KeyboardEvent) => {
      const shortcuts: Record<string, string> = {
        "1": "hero-section",
        "2": "about",
        "3": "skills",
        "4": "projects",
        "5": "experience",
        "6": "certifications",
        "7": "coder-arcade",
        "8": "contact",
        "g": "coder-arcade",
        "G": "coder-arcade",
      };

      if (shortcuts[e.key]) {
        const target = document.getElementById(shortcuts[e.key]);
        if (target) {
          sfx.playWhoosh();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }

      if (e.key.toLowerCase() === "m") {
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Sound effect on click & hover (desktop only)
    const handleGlobalClick = () => sfx.select();
    const handleGlobalHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("a, button, [data-cursor]")) {
        sfx.hover();
      }
    };

    document.addEventListener("click", handleGlobalClick);
    if (!isTouch) {
      document.addEventListener("mouseover", handleGlobalHover);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleGlobalClick);
      if (!isTouch) {
        document.removeEventListener("mouseover", handleGlobalHover);
      }
    };
  }, [toggleMute, reducedMotion]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden transition-opacity duration-500"
      style={{ opacity: config.hud.opacity }}
    >
      {/* Cinematic Viewfinder Corner Frame Marks (desktop only) */}
      {config.hud.showCornerReticles && !reducedMotion && (
        <div className="hidden sm:block">
          <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-cyan/40 pointer-events-none" />
          <div className="absolute top-5 right-5 w-8 h-8 border-t border-r border-cyan/40 pointer-events-none" />
          <div className="absolute bottom-5 left-5 w-8 h-8 border-b border-l border-cyan/40 pointer-events-none" />
          <div className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-cyan/40 pointer-events-none" />
        </div>
      )}

      {/* Top Left: Scene Viewfinder Identifier */}
      <div className="hidden lg:flex items-center gap-2.5 absolute top-7 left-14 pointer-events-auto">
        <div className="px-3 py-1 rounded-md bg-midnight/80 border border-white/10 backdrop-blur-md text-[10px] font-mono text-slate-300 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          <span className="text-white font-semibold tracking-wider font-hacker">
            {activeScene}
          </span>
          <span className="text-muted">|</span>
          <span ref={fpsSpanRef} className="text-cyan font-mono">60 FPS</span>
        </div>
      </div>

      {/* Top Right: Quality Tier Selector & Master Sound Switch */}
      <div className="hidden md:flex items-center gap-2 absolute top-7 right-14 pointer-events-auto">
        {/* Quality Tier Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowTierMenu(!showTierMenu)}
            className="px-2.5 py-1 rounded-md bg-midnight/80 hover:bg-midnight border border-white/10 text-[10px] font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
            title="Adjust Graphic Quality Tier"
          >
            <Sliders className="w-3 h-3 text-cyan" />
            <span className="uppercase text-cyan font-bold tracking-wider">
              {tier}
            </span>
          </button>

          {showTierMenu && (
            <div className="absolute top-full mt-1.5 right-0 w-36 rounded-lg bg-midnight/95 border border-cyan/30 shadow-2xl backdrop-blur-xl p-1.5 space-y-1 z-50">
              {(["cinematic", "balanced", "performance"] as QualityTier[]).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTier(t);
                    setShowTierMenu(false);
                    sfx.select();
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider flex items-center justify-between transition-colors ${
                    tier === t
                      ? "bg-cyan/20 text-cyan font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{t}</span>
                  {tier === t && <Eye className="w-2.5 h-2.5 text-cyan" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Play Coder Arcade Button */}
        <button
          onClick={() => {
            const arcade = document.getElementById("coder-arcade");
            if (arcade) {
              sfx.playWhoosh();
              arcade.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="px-2.5 py-1 rounded-md bg-cyan/15 hover:bg-cyan/25 border border-cyan/40 text-[10px] font-mono text-cyan font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(34,211,238,0.2)]"
          title="Play Coder Arcade Mini-Game [Press G]"
        >
          <Gamepad2 className="w-3 h-3 text-cyan animate-pulse" />
          <span>ARCADE [G]</span>
        </button>

        {/* Replay Intro Button */}
        <button
          onClick={() => {
            sfx.playWhoosh();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              setIsIntroActive(true);
              setLetterboxOpen(true);
            }, 300);
          }}
          className="px-2.5 py-1 rounded-md bg-midnight/80 hover:bg-midnight border border-white/10 text-[10px] font-mono text-slate-300 hover:text-cyan flex items-center gap-1.5 transition-colors"
          title="Replay Cinematic Movie Intro"
        >
          <Film className="w-3 h-3 text-cyan" />
          <span>REPLAY INTRO</span>
        </button>

        {/* Cinematic Audio Switch */}
        <button
          onClick={toggleMute}
          className="px-2.5 py-1 rounded-md bg-midnight/80 hover:bg-midnight border border-white/10 text-[10px] font-mono flex items-center gap-1.5 transition-colors"
          title="Toggle Cinematic Audio [Press M]"
        >
          {!isMuted ? (
            <>
              <Volume2 className="w-3 h-3 text-cyan" />
              <span className="text-cyan font-semibold">AUDIO: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3 h-3 text-slate-400" />
              <span className="text-slate-400">AUDIO: MUTED [M]</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom Center: Film Timecode / Frame Tracker */}
      <div className="hidden lg:flex items-center gap-4 absolute bottom-6 inset-x-0 justify-center pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-midnight/70 border border-white/5 text-[9px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-3">
          <span>REC ● [4K]</span>
          <span>SHUTTER: 1/48</span>
          <span>ISO: 800</span>
          <span>LUT: TEAL_ORANGE_FILMIC</span>
        </div>
      </div>
    </div>
  );
}
