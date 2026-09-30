/**
 * LIQUID CHROME MORPH — Tuning Configuration
 * All tunables in one place. Import from components; never hard-code values.
 */

export type LiquidTier = "cinematic" | "balanced" | "performance";

export interface LiquidConfig {
  /** Raymarch quality */
  marchSteps: number;
  /** Resolution scale for the raymarch pass (1.0 = full, 0.6 = 60%) */
  resolutionScale: number;
  /** Whether to use fallback icosahedron mesh instead of shader */
  useFallback: boolean;

  /** Liquid surface turbulence amplitude (State 0) */
  noiseAmplitude: number;
  /** Surface turbulence frequency */
  noiseFrequency: number;
  /** Idle breathing speed */
  breathSpeed: number;
  /** Idle breathing amplitude */
  breathAmplitude: number;

  /** Cursor ripple strength */
  rippleStrength: number;
  /** Cursor ripple decay speed */
  rippleDecay: number;
  /** Cursor ripple wave speed */
  rippleSpeed: number;

  /** Click shockwave strength */
  shockwaveStrength: number;
  /** Shockwave expansion speed */
  shockwaveSpeed: number;

  /** Smooth-min (smin) blending radius between SDF shapes */
  blendRadius: number;

  /** Camera dolly range when scrolling (start z, end z) */
  cameraZRange: [number, number];
  /** Camera Y rotation range (radians) */
  cameraYRotRange: [number, number];

  /** Fresnel power for chrome reflections */
  fresnelPower: number;
  /** Metalness factor */
  metalness: number;
  /** Base roughness */
  roughness: number;

  /** Bloom intensity */
  bloomIntensity: number;
  /** DoF enabled */
  dof: boolean;
}

export const LIQUID_PRESETS: Record<LiquidTier, LiquidConfig> = {
  cinematic: {
    marchSteps: 80,
    resolutionScale: 1.0,
    useFallback: false,
    noiseAmplitude: 0.22,
    noiseFrequency: 1.8,
    breathSpeed: 0.55,
    breathAmplitude: 0.04,
    rippleStrength: 0.18,
    rippleDecay: 2.8,
    rippleSpeed: 3.5,
    shockwaveStrength: 0.35,
    shockwaveSpeed: 4.0,
    blendRadius: 0.38,
    cameraZRange: [4.2, 5.8],
    cameraYRotRange: [-0.25, 0.25],
    fresnelPower: 3.5,
    metalness: 1.0,
    roughness: 0.06,
    bloomIntensity: 1.4,
    dof: true,
  },
  balanced: {
    marchSteps: 48,
    resolutionScale: 0.8,
    useFallback: false,
    noiseAmplitude: 0.18,
    noiseFrequency: 1.5,
    breathSpeed: 0.5,
    breathAmplitude: 0.035,
    rippleStrength: 0.14,
    rippleDecay: 2.5,
    rippleSpeed: 3.0,
    shockwaveStrength: 0.25,
    shockwaveSpeed: 3.5,
    blendRadius: 0.32,
    cameraZRange: [4.4, 5.6],
    cameraYRotRange: [-0.2, 0.2],
    fresnelPower: 3.0,
    metalness: 0.95,
    roughness: 0.08,
    bloomIntensity: 1.0,
    dof: false,
  },
  performance: {
    marchSteps: 32,
    resolutionScale: 0.6,
    useFallback: true, // Use icosahedron mesh on low-end
    noiseAmplitude: 0.12,
    noiseFrequency: 1.2,
    breathSpeed: 0.4,
    breathAmplitude: 0.025,
    rippleStrength: 0.0,  // Disabled
    rippleDecay: 2.0,
    rippleSpeed: 2.5,
    shockwaveStrength: 0.0,
    shockwaveSpeed: 3.0,
    blendRadius: 0.25,
    cameraZRange: [4.5, 5.5],
    cameraYRotRange: [-0.15, 0.15],
    fresnelPower: 2.5,
    metalness: 0.85,
    roughness: 0.12,
    bloomIntensity: 0.6,
    dof: false,
  },
};

/** Morph state scroll thresholds (0–1 normalized page scroll) */
export const MORPH_SCROLL_MAP = {
  /** State 0 RAW: 0.00 → 0.22 */
  raw: { start: 0.0, end: 0.22 },
  /** State 1 CLEAN: 0.22 → 0.46 */
  clean: { start: 0.22, end: 0.46 },
  /** State 2 PIPELINE: 0.46 → 0.72 */
  pipeline: { start: 0.46, end: 0.72 },
  /** State 3 INTELLIGENCE: 0.72 → 1.0 */
  intelligence: { start: 0.72, end: 1.0 },
} as const;

/** Palette colours used in shader uniforms */
export const LIQUID_PALETTE = {
  cyanRim: "#22d3ee",
  violetKey: "#8b5cf6",
  chromeBase: "#c0cfe8",
  innerGlow: "#3b82f6",
  floorColor: "#080b14",
} as const;

export const defaultLiquidConfig = LIQUID_PRESETS.cinematic;
