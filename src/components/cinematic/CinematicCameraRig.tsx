"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCinematic } from "@/components/providers/CinematicProvider";

interface CinematicCameraRigProps {
  reducedMotion?: boolean;
}

export default function CinematicCameraRig({
  reducedMotion = false,
}: CinematicCameraRigProps) {
  const { camera } = useThree();
  const { config, tier } = useCinematic();
  const initialFovRef = useRef<number>((camera as THREE.PerspectiveCamera).fov || 45);

  useFrame((state) => {
    if (reducedMotion || tier === "performance") return;

    const t = state.clock.getElapsedTime();
    const persCam = camera as THREE.PerspectiveCamera;

    // 1. Handheld Cinema Micro-Motion (Low-frequency noise)
    if (config.camera.handheldNoise.enabled) {
      const amp = config.camera.handheldNoise.amplitude;
      const freq = config.camera.handheldNoise.frequency;

      const noiseX = Math.sin(t * freq) * Math.cos(t * freq * 0.7) * amp;
      const noiseY = Math.cos(t * freq * 0.8) * Math.sin(t * freq * 0.5) * amp;
      const rollZ = Math.sin(t * freq * 0.4) * (amp * 0.3);

      persCam.position.x = THREE.MathUtils.lerp(persCam.position.x, noiseX, 0.05);
      persCam.position.y = THREE.MathUtils.lerp(persCam.position.y, noiseY, 0.05);
      persCam.rotation.z = THREE.MathUtils.lerp(persCam.rotation.z, rollZ, 0.05);
    }

    // 2. Scroll-driven Dolly Zoom (Vertigo Effect) upon leaving hero
    if (config.camera.dollyZoom.enabled && typeof window !== "undefined") {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

      if (progress > 0 && progress < config.camera.dollyZoom.heroDepartureTrigger * 2) {
        const factor = Math.sin((progress / (config.camera.dollyZoom.heroDepartureTrigger * 2)) * Math.PI);
        const fovTarget = initialFovRef.current + factor * config.camera.dollyZoom.maxFovOffset;
        const zTarget = 4.8 - factor * 0.8;

        persCam.fov = THREE.MathUtils.lerp(persCam.fov, fovTarget, 0.08);
        persCam.position.z = THREE.MathUtils.lerp(persCam.position.z, zTarget, 0.08);
        persCam.updateProjectionMatrix();
      } else {
        persCam.fov = THREE.MathUtils.lerp(persCam.fov, initialFovRef.current, 0.08);
        persCam.position.z = THREE.MathUtils.lerp(persCam.position.z, 4.8, 0.08);
        persCam.updateProjectionMatrix();
      }
    }
  });

  return null;
}
