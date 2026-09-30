"use client";

import React, { useMemo } from "react";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  ChromaticAberration,
  ToneMapping,
  SMAA,
} from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction } from "postprocessing";
import * as THREE from "three";
import { useCinematic } from "@/components/providers/CinematicProvider";

interface CinematicPostProcessingProps {
  reducedMotion?: boolean;
}

export default function CinematicPostProcessing({
  reducedMotion = false,
}: CinematicPostProcessingProps) {
  const { config, tier } = useCinematic();

  const chromaticOffset = useMemo(() => {
    return new THREE.Vector2(
      config.postProcessing.chromaticAberration.offset[0],
      config.postProcessing.chromaticAberration.offset[1]
    );
  }, [config.postProcessing.chromaticAberration.offset]);

  // Performance tier or reduced motion: ultra-lightweight
  if (tier === "performance" || reducedMotion) {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={config.postProcessing.bloom.intensity * 0.7}
          luminanceThreshold={config.postProcessing.bloom.luminanceThreshold}
          luminanceSmoothing={config.postProcessing.bloom.luminanceSmoothing}
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    );
  }

  // Balanced tier: Bloom, Vignette, ChromaticAberration, ACESFilmic
  if (tier === "balanced") {
    return (
      <EffectComposer multisampling={2}>
        <Bloom
          intensity={config.postProcessing.bloom.intensity}
          luminanceThreshold={config.postProcessing.bloom.luminanceThreshold}
          luminanceSmoothing={config.postProcessing.bloom.luminanceSmoothing}
          mipmapBlur={false}
        />
        <ChromaticAberration
          offset={chromaticOffset}
          radialModulation={false}
          modulationOffset={0.1}
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Vignette
          offset={config.postProcessing.vignette.offset}
          darkness={config.postProcessing.vignette.darkness}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    );
  }

  // Full Cinematic Tier: Selective Bloom with MipmapBlur, Depth of Field, Chromatic Aberration, ACESFilmic, Vignette, SMAA
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={config.postProcessing.bloom.intensity}
        luminanceThreshold={config.postProcessing.bloom.luminanceThreshold}
        luminanceSmoothing={config.postProcessing.bloom.luminanceSmoothing}
        mipmapBlur={config.postProcessing.bloom.mipmapBlur}
      />
      <DepthOfField
        focusDistance={config.postProcessing.depthOfField.focusDistance}
        focalLength={config.postProcessing.depthOfField.focalLength}
        bokehScale={config.postProcessing.depthOfField.bokehScale}
        height={720}
      />
      <ChromaticAberration
        offset={chromaticOffset}
        radialModulation={config.postProcessing.chromaticAberration.radialModulation}
        modulationOffset={config.postProcessing.chromaticAberration.modulationOffset}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Vignette
        offset={config.postProcessing.vignette.offset}
        darkness={config.postProcessing.vignette.darkness}
        blendFunction={BlendFunction.NORMAL}
      />
      <SMAA />
    </EffectComposer>
  );
}
