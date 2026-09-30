"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { LIQUID_PRESETS, LIQUID_PALETTE } from "@/config/liquid";
import type { LiquidTier } from "@/config/liquid";

interface LiquidFallbackProps {
  morphT?: number;
  tier?: LiquidTier;
  reducedMotion?: boolean;
}

export default function LiquidFallback({
  morphT = 0,
  tier = "performance",
  reducedMotion = false,
}: LiquidFallbackProps) {
  const cfg = LIQUID_PRESETS[tier];
  const meshRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  // Smoothed morph
  const smoothMorphRef = useRef(morphT);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    smoothMorphRef.current = THREE.MathUtils.lerp(smoothMorphRef.current, morphT, 0.04);
    const sm = smoothMorphRef.current;

    if (meshRef.current) {
      meshRef.current.rotation.y = t * (0.12 + sm * 0.04);
      meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.08;
      // Breathing
      const breath = 1 + Math.sin(t * cfg.breathSpeed) * cfg.breathAmplitude;
      meshRef.current.scale.setScalar(breath);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.2;
    }
  });

  // Morph-driven scale for the outer shape
  const outerScale = useMemo(() => {
    // At state 0→1 stays spherical; 1→2 gets slightly elongated
    return 1.0;
  }, []);

  const cyanColor = new THREE.Color(LIQUID_PALETTE.cyanRim);
  const violetColor = new THREE.Color(LIQUID_PALETTE.violetKey);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[-3, 2, -4]} intensity={4.0} color={LIQUID_PALETTE.cyanRim} />
      <directionalLight position={[3, 3, 2]} intensity={3.0} color={LIQUID_PALETTE.violetKey} />
      <pointLight position={[0, 0, 0]} intensity={3.0} color={LIQUID_PALETTE.innerGlow} distance={5} />

      <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.12}>
        <group ref={meshRef} scale={outerScale}>
          {/* Chrome icosahedron shell */}
          <mesh>
            <icosahedronGeometry args={[1.2, 5]} />
            <MeshDistortMaterial
              color={LIQUID_PALETTE.chromeBase}
              metalness={cfg.metalness}
              roughness={cfg.roughness}
              distort={reducedMotion ? 0.02 : cfg.noiseAmplitude * 0.8}
              speed={reducedMotion ? 0 : cfg.breathSpeed * 2}
              envMapIntensity={1.8}
            />
          </mesh>

          {/* Inner glowing core */}
          <mesh ref={innerRef}>
            <sphereGeometry args={[0.4, 24, 24]} />
            <meshStandardMaterial
              color={LIQUID_PALETTE.cyanRim}
              emissive={LIQUID_PALETTE.innerGlow}
              emissiveIntensity={3.0}
              roughness={0.05}
            />
          </mesh>

          {/* Halo ring */}
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[1.65, 0.012, 16, 100]} />
            <meshStandardMaterial
              color={LIQUID_PALETTE.cyanRim}
              emissive={LIQUID_PALETTE.cyanRim}
              emissiveIntensity={2.0}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      </Float>
    </>
  );
}
