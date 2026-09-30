"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  QualityTier,
  CinematicConfig,
  CINEMATIC_PRESETS,
} from "@/config/cinematic";
import { sfx } from "@/utils/audio";

interface CinematicContextType {
  tier: QualityTier;
  setTier: (tier: QualityTier) => void;
  config: CinematicConfig;
  isIntroActive: boolean;
  setIsIntroActive: (active: boolean) => void;
  letterboxOpen: boolean;
  setLetterboxOpen: (open: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  reducedMotion: boolean;
}

const CinematicContext = createContext<CinematicContextType>({
  tier: "cinematic",
  setTier: () => {},
  config: CINEMATIC_PRESETS.cinematic,
  isIntroActive: false,
  setIsIntroActive: () => {},
  letterboxOpen: false,
  setLetterboxOpen: () => {},
  isMuted: true, // Default to muted until user gesture/opt-in per web audio standards
  toggleMute: () => {},
  reducedMotion: false,
});

export const useCinematic = () => useContext(CinematicContext);

export default function CinematicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tier, setTierState] = useState<QualityTier>("cinematic");
  // Start as false — we'll set to true client-side if the session hasn't seen intro
  const [isIntroActive, setIsIntroActive] = useState<boolean>(false);
  const [letterboxOpen, setLetterboxOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setReducedMotion(true);
      setTierState("performance");
      setIsIntroActive(false);
      setLetterboxOpen(false);
      return;
    }

    // 2. Check if intro was already shown this session (skip on refresh)
    try {
      const alreadySeen = sessionStorage.getItem("ar_cinema_intro_seen");
      if (alreadySeen === "true") {
        setIsIntroActive(false);
        setLetterboxOpen(false);
        // Still resolve tier below
      } else {
        setIsIntroActive(true);
        setLetterboxOpen(true);
      }
    } catch {
      setIsIntroActive(true);
      setLetterboxOpen(true);
    }

    // 3. Check stored tier preference
    const savedTier = localStorage.getItem("ar_quality_tier") as QualityTier | null;
    if (savedTier && ["cinematic", "balanced", "performance"].includes(savedTier)) {
      setTierState(savedTier);
      return;
    }

    // 4. Hardware heuristics auto-detection
    try {
      const isMobile = window.innerWidth < 768;
      const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };
      const memory = nav.deviceMemory || 8;
      const cores = nav.hardwareConcurrency || 8;

      if (isMobile || memory < 4 || cores < 4) {
        setTierState("balanced");
      } else {
        setTierState("cinematic");
      }
    } catch {
      setTierState("balanced");
    }
  }, []);

  const setTier = (newTier: QualityTier) => {
    setTierState(newTier);
    try {
      localStorage.setItem("ar_quality_tier", newTier);
    } catch {
      // Ignore
    }
  };

  const toggleMute = () => {
    const newState = sfx.toggle();
    setIsMuted(!newState);
  };

  const config = CINEMATIC_PRESETS[tier];

  return (
    <CinematicContext.Provider
      value={{
        tier,
        setTier,
        config,
        isIntroActive,
        setIsIntroActive,
        letterboxOpen,
        setLetterboxOpen,
        isMuted,
        toggleMute,
        reducedMotion,
      }}
    >
      {children}
    </CinematicContext.Provider>
  );
}
