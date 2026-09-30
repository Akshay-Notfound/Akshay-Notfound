/**
 * CINEMATIC CONFIGURATION & TUNING SUITE
 * Single source of truth for all visual, lighting, camera, sound, and quality tier parameters.
 */

export type QualityTier = "cinematic" | "balanced" | "performance";

export interface CinematicConfig {
  // Quality presets
  tier: QualityTier;

  // Global Post-Processing
  postProcessing: {
    bloom: {
      intensity: number;
      luminanceThreshold: number;
      luminanceSmoothing: number;
      mipmapBlur: boolean;
    };
    depthOfField: {
      enabled: boolean;
      focusDistance: number;
      focalLength: number;
      bokehScale: number;
    };
    vignette: {
      offset: number;
      darkness: number;
    };
    noise: {
      opacity: number; // 0.02 to 0.04
      refreshFps: number; // 12fps
    };
    chromaticAberration: {
      offset: [number, number];
      radialModulation: boolean;
      modulationOffset: number;
    };
    colorGrading: {
      tealShadows: string;
      warmHighlights: string;
      liftedBlacks: number;
      contrast: number;
    };
  };

  // Realistic Lighting & Materials
  orb: {
    transmission: {
      samples: number;
      thickness: number;
      ior: number;
      roughness: number;
      chromaticAberration: number;
      anisotropy: number;
      distortion: number;
      attenuationDistance: number;
      attenuationColor: string;
    };
    lightingRig: {
      ambientIntensity: number;
      cyanRimIntensity: number;
      violetKeyIntensity: number;
      warmFillIntensity: number;
      coreEmissive: number;
    };
    volumetricLight: {
      enabled: boolean;
      intensity: number;
      color: string;
    };
    reflectiveFloor: {
      enabled: boolean;
      blur: [number, number];
      resolution: number;
      mirror: number;
      mixBlur: number;
      mixStrength: number;
    };
    dustMotes: {
      count: number;
      size: number;
      speed: number;
    };
  };

  // Cinematic Letterbox & Intro Sequence
  intro: {
    enabled: boolean;
    durationMs: number; // 5500ms
    letterboxAspect: string; // '2.39:1'
    letterboxHeightPercent: number; // ~12%
    skipKey: string;
  };

  // Scroll Camera & Handheld Micro-Motion
  camera: {
    fov: number;
    handheldNoise: {
      enabled: boolean;
      amplitude: number; // micro-shake amplitude
      frequency: number;
    };
    dollyZoom: {
      enabled: boolean;
      maxFovOffset: number;
      heroDepartureTrigger: number;
    };
  };

  // Sound Design Synthesis
  audio: {
    masterVolume: number;
    ambientDrone: {
      baseFreq: number; // 55Hz (A1)
      harmonics: number[]; // [110, 164.81, 220]
      filterCutoff: number; // 380Hz
      droneGain: number; // quiet ~0.03
    };
    riser: {
      startFreq: number;
      endFreq: number;
      duration: number;
    };
    impact: {
      subFreq: number;
      duration: number;
    };
  };

  // HUD Overlay Intensity
  hud: {
    opacity: number; // Dialed down from 0.9 to 0.45 for film feel
    showCornerReticles: boolean;
    showRadar: boolean;
  };
}

export const CINEMATIC_PRESETS: Record<QualityTier, CinematicConfig> = {
  cinematic: {
    tier: "cinematic",
    postProcessing: {
      bloom: {
        intensity: 1.25,
        luminanceThreshold: 0.85,
        luminanceSmoothing: 0.35,
        mipmapBlur: true,
      },
      depthOfField: {
        enabled: true,
        focusDistance: 0.02,
        focalLength: 0.05,
        bokehScale: 3.5,
      },
      vignette: {
        offset: 0.28,
        darkness: 0.72,
      },
      noise: {
        opacity: 0,
        refreshFps: 12,
      },
      chromaticAberration: {
        offset: [0.0018, 0.0018],
        radialModulation: true,
        modulationOffset: 0.15,
      },
      colorGrading: {
        tealShadows: "#0b1a28",
        warmHighlights: "#fff8f0",
        liftedBlacks: 0.035,
        contrast: 1.08,
      },
    },
    orb: {
      transmission: {
        samples: 16,
        thickness: 0.85,
        ior: 1.45,
        roughness: 0.05,
        chromaticAberration: 0.12,
        anisotropy: 0.22,
        distortion: 0.18,
        attenuationDistance: 2.2,
        attenuationColor: "#38bdf8",
      },
      lightingRig: {
        ambientIntensity: 0.35,
        cyanRimIntensity: 5.5,
        violetKeyIntensity: 4.0,
        warmFillIntensity: 1.2,
        coreEmissive: 3.2,
      },
      volumetricLight: {
        enabled: true,
        intensity: 0.4,
        color: "#22d3ee",
      },
      reflectiveFloor: {
        enabled: true,
        blur: [400, 100],
        resolution: 512,
        mirror: 0.45,
        mixBlur: 2.5,
        mixStrength: 1.5,
      },
      dustMotes: {
        count: 140,
        size: 0.04,
        speed: 0.25,
      },
    },
    intro: {
      enabled: true,
      durationMs: 5500,
      letterboxAspect: "2.39:1",
      letterboxHeightPercent: 10,
      skipKey: "Escape",
    },
    camera: {
      fov: 42,
      handheldNoise: {
        enabled: true,
        amplitude: 0.035,
        frequency: 0.8,
      },
      dollyZoom: {
        enabled: true,
        maxFovOffset: 8,
        heroDepartureTrigger: 0.35,
      },
    },
    audio: {
      masterVolume: 0.22,
      ambientDrone: {
        baseFreq: 55, // A1
        harmonics: [110, 164.81, 220],
        filterCutoff: 380,
        droneGain: 0.025,
      },
      riser: {
        startFreq: 60,
        endFreq: 440,
        duration: 2.4,
      },
      impact: {
        subFreq: 45,
        duration: 0.8,
      },
    },
    hud: {
      opacity: 0.42,
      showCornerReticles: true,
      showRadar: true,
    },
  },

  balanced: {
    tier: "balanced",
    postProcessing: {
      bloom: {
        intensity: 0.95,
        luminanceThreshold: 0.88,
        luminanceSmoothing: 0.3,
        mipmapBlur: false,
      },
      depthOfField: {
        enabled: false, // Turned off in balanced for stable 60fps
        focusDistance: 0.02,
        focalLength: 0.04,
        bokehScale: 2.0,
      },
      vignette: {
        offset: 0.3,
        darkness: 0.65,
      },
      noise: {
        opacity: 0,
        refreshFps: 12,
      },
      chromaticAberration: {
        offset: [0.0012, 0.0012],
        radialModulation: false,
        modulationOffset: 0.1,
      },
      colorGrading: {
        tealShadows: "#0b1a28",
        warmHighlights: "#fff8f0",
        liftedBlacks: 0.03,
        contrast: 1.05,
      },
    },
    orb: {
      transmission: {
        samples: 8,
        thickness: 0.75,
        ior: 1.45,
        roughness: 0.06,
        chromaticAberration: 0.08,
        anisotropy: 0.15,
        distortion: 0.12,
        attenuationDistance: 1.8,
        attenuationColor: "#38bdf8",
      },
      lightingRig: {
        ambientIntensity: 0.4,
        cyanRimIntensity: 4.5,
        violetKeyIntensity: 3.2,
        warmFillIntensity: 1.0,
        coreEmissive: 2.8,
      },
      volumetricLight: {
        enabled: true,
        intensity: 0.25,
        color: "#22d3ee",
      },
      reflectiveFloor: {
        enabled: false, // ContactShadows only in balanced
        blur: [200, 50],
        resolution: 256,
        mirror: 0.3,
        mixBlur: 2.0,
        mixStrength: 1.0,
      },
      dustMotes: {
        count: 80,
        size: 0.035,
        speed: 0.2,
      },
    },
    intro: {
      enabled: true,
      durationMs: 5000,
      letterboxAspect: "2.39:1",
      letterboxHeightPercent: 10,
      skipKey: "Escape",
    },
    camera: {
      fov: 45,
      handheldNoise: {
        enabled: true,
        amplitude: 0.025,
        frequency: 0.6,
      },
      dollyZoom: {
        enabled: true,
        maxFovOffset: 5,
        heroDepartureTrigger: 0.35,
      },
    },
    audio: {
      masterVolume: 0.2,
      ambientDrone: {
        baseFreq: 55,
        harmonics: [110, 220],
        filterCutoff: 340,
        droneGain: 0.02,
      },
      riser: {
        startFreq: 60,
        endFreq: 380,
        duration: 2.0,
      },
      impact: {
        subFreq: 45,
        duration: 0.7,
      },
    },
    hud: {
      opacity: 0.38,
      showCornerReticles: true,
      showRadar: false, // Simplified HUD in balanced
    },
  },

  performance: {
    tier: "performance",
    postProcessing: {
      bloom: {
        intensity: 0.6,
        luminanceThreshold: 0.92,
        luminanceSmoothing: 0.2,
        mipmapBlur: false,
      },
      depthOfField: {
        enabled: false,
        focusDistance: 0.02,
        focalLength: 0.03,
        bokehScale: 1.0,
      },
      vignette: {
        offset: 0.35,
        darkness: 0.5,
      },
      noise: {
        opacity: 0,
        refreshFps: 10,
      },
      chromaticAberration: {
        offset: [0.0006, 0.0006],
        radialModulation: false,
        modulationOffset: 0.05,
      },
      colorGrading: {
        tealShadows: "#080b14",
        warmHighlights: "#ffffff",
        liftedBlacks: 0.02,
        contrast: 1.02,
      },
    },
    orb: {
      transmission: {
        samples: 4,
        thickness: 0.6,
        ior: 1.4,
        roughness: 0.08,
        chromaticAberration: 0.04,
        anisotropy: 0.1,
        distortion: 0.08,
        attenuationDistance: 1.5,
        attenuationColor: "#38bdf8",
      },
      lightingRig: {
        ambientIntensity: 0.5,
        cyanRimIntensity: 3.5,
        violetKeyIntensity: 2.5,
        warmFillIntensity: 0.8,
        coreEmissive: 2.2,
      },
      volumetricLight: {
        enabled: false,
        intensity: 0,
        color: "#22d3ee",
      },
      reflectiveFloor: {
        enabled: false,
        blur: [100, 20],
        resolution: 128,
        mirror: 0.2,
        mixBlur: 1.0,
        mixStrength: 0.5,
      },
      dustMotes: {
        count: 35,
        size: 0.03,
        speed: 0.15,
      },
    },
    intro: {
      enabled: false, // Skipped automatically for performance
      durationMs: 3000,
      letterboxAspect: "2.39:1",
      letterboxHeightPercent: 8,
      skipKey: "Escape",
    },
    camera: {
      fov: 45,
      handheldNoise: {
        enabled: false,
        amplitude: 0,
        frequency: 0,
      },
      dollyZoom: {
        enabled: false,
        maxFovOffset: 0,
        heroDepartureTrigger: 0,
      },
    },
    audio: {
      masterVolume: 0.18,
      ambientDrone: {
        baseFreq: 55,
        harmonics: [110],
        filterCutoff: 300,
        droneGain: 0.015,
      },
      riser: {
        startFreq: 80,
        endFreq: 300,
        duration: 1.5,
      },
      impact: {
        subFreq: 50,
        duration: 0.5,
      },
    },
    hud: {
      opacity: 0.3,
      showCornerReticles: false,
      showRadar: false,
    },
  },
};

// Default active config (can be modified dynamically via context/state)
export const defaultCinematicConfig = CINEMATIC_PRESETS.cinematic;
