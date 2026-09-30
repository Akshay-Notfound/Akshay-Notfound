"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { LIQUID_PALETTE } from "@/config/liquid";
import type { LiquidTier } from "@/config/liquid";

interface LiquidFallbackProps {
  morphT?: number;
  tier?: LiquidTier;
  reducedMotion?: boolean;
}

/**
 * SatelliteDroplet
 * Autonomous floating liquid mercury bead that orbits and distorts
 * with natural surface tension and fluid harmonics.
 */
function SatelliteDroplet({
  basePos,
  radius,
  speed,
  distort,
  orbitRadius,
  orbitSpeed,
  phase,
  reducedMotion,
}: {
  basePos: [number, number, number];
  radius: number;
  speed: number;
  distort: number;
  orbitRadius: number;
  orbitSpeed: number;
  phase: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion || !ref.current) return;
    const t = state.clock.getElapsedTime() * orbitSpeed + phase;
    // Harmonic orbital path with organic wobble
    const ox = Math.sin(t) * orbitRadius;
    const oy = Math.sin(t * 1.7) * (orbitRadius * 0.45);
    const oz = Math.cos(t) * orbitRadius;

    ref.current.position.set(basePos[0] + ox, basePos[1] + oy, basePos[2] + oz);
    ref.current.rotation.x = t * 0.6;
    ref.current.rotation.y = t * 0.8;
  });

  return (
    <mesh ref={ref} position={basePos}>
      <sphereGeometry args={[radius, 32, 32]} />
      <MeshDistortMaterial
        color="#0a1020"
        metalness={0.98}
        roughness={0.04}
        distort={reducedMotion ? 0.05 : distort}
        speed={reducedMotion ? 0 : speed}
        envMapIntensity={2.5}
      />
    </mesh>
  );
}

/**
 * LiquidFluidHero (LiquidFallback)
 * 100% Fluid Liquid Chrome / Mercury Blob with organic multi-frequency
 * fluid waves, fluid satellite droplets, and dynamic cursor reactivity.
 * Zero planet shapes, zero rings — pure hypnotic fluid animation.
 */
export default function LiquidFallback({
  morphT = 0,
  reducedMotion = false,
}: LiquidFallbackProps) {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  // Smoothed morph parameter for scroll transitions
  const smoothMorphRef = useRef(morphT);

  // Satellite droplets configuration for zero-g fluid dynamics
  const droplets = useMemo(
    () => [
      { basePos: [0, 0, 0] as [number, number, number], radius: 0.28, speed: 2.8, distort: 0.52, orbitRadius: 1.85, orbitSpeed: 0.7, phase: 0 },
      { basePos: [0, 0, 0] as [number, number, number], radius: 0.22, speed: 3.2, distort: 0.58, orbitRadius: 1.65, orbitSpeed: -0.9, phase: 2.1 },
      { basePos: [0, 0, 0] as [number, number, number], radius: 0.18, speed: 2.4, distort: 0.45, orbitRadius: 2.05, orbitSpeed: 0.55, phase: 4.3 },
      { basePos: [0, 0, 0] as [number, number, number], radius: 0.15, speed: 3.6, distort: 0.62, orbitRadius: 1.45, orbitSpeed: -1.1, phase: 1.2 },
    ],
    []
  );

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    smoothMorphRef.current = THREE.MathUtils.lerp(smoothMorphRef.current, morphT, 0.04);
    const sm = smoothMorphRef.current;

    if (meshRef.current) {
      // Fluid cursor lean: follows mouse pointer smoothly
      const targetRotX = (pointer.y * Math.PI) / 6;
      const targetRotY = (pointer.x * Math.PI) / 6;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotX + Math.sin(t * 0.7) * 0.12,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotY + t * 0.2 + sm * 0.3,
        0.05
      );

      // Non-uniform multi-harmonic fluid surface tension breathing
      const morphElongation = 1 + sm * 0.18;
      const waveX = (1 + Math.sin(t * 1.6) * 0.08 + Math.cos(t * 2.2) * 0.04) * (1 / Math.sqrt(morphElongation));
      const waveY = (1 + Math.cos(t * 1.4) * 0.09 + Math.sin(t * 2.7) * 0.05) * morphElongation;
      const waveZ = (1 + Math.sin(t * 1.9) * 0.07 + Math.cos(t * 1.2) * 0.04) * (1 / Math.sqrt(morphElongation));

      meshRef.current.scale.set(waveX, waveY, waveZ);
    }

    if (coreRef.current) {
      // Internal counter-fluid pulse
      coreRef.current.rotation.y = -t * 0.35;
      coreRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <>
      {/* High-contrast Cinematic Studio Lighting for Chrome Specularity */}
      <ambientLight intensity={0.6} />
      {/* Cyan Rim Light */}
      <directionalLight position={[-4, 3, -3]} intensity={5.0} color={LIQUID_PALETTE.cyanRim} />
      {/* Electric Blue Key Light */}
      <directionalLight position={[4, 3.5, 3]} intensity={4.5} color="#3b82f6" />
      {/* Violet Fill Light from below */}
      <directionalLight position={[0, -4, 2]} intensity={3.0} color={LIQUID_PALETTE.violetKey} />
      {/* Internal Core Radiance */}
      <pointLight position={[0, 0, 0]} intensity={3.5} color={LIQUID_PALETTE.innerGlow} distance={6} />

      <Float speed={1.4} floatIntensity={0.4} rotationIntensity={0.15}>
        <group ref={meshRef}>
          {/* Main Organic Liquid Chrome Fluid Body */}
          <mesh>
            <sphereGeometry args={[1.35, 64, 64]} />
            <MeshDistortMaterial
              color="#080d19"
              metalness={0.98}
              roughness={0.03}
              distort={reducedMotion ? 0.05 : 0.52}
              speed={reducedMotion ? 0 : 2.4}
              envMapIntensity={2.8}
            />
          </mesh>

          {/* Internal glowing fluid pulse layer */}
          <mesh ref={coreRef} scale={0.75}>
            <sphereGeometry args={[1.0, 32, 32]} />
            <MeshDistortMaterial
              color={LIQUID_PALETTE.cyanRim}
              emissive={LIQUID_PALETTE.cyanRim}
              emissiveIntensity={0.6}
              transparent
              opacity={0.35}
              distort={0.4}
              speed={3.0}
              roughness={0.1}
            />
          </mesh>

          {/* Liquid Mercury Satellite Droplets */}
          {droplets.map((d, i) => (
            <SatelliteDroplet
              key={i}
              basePos={d.basePos}
              radius={d.radius}
              speed={d.speed}
              distort={d.distort}
              orbitRadius={d.orbitRadius}
              orbitSpeed={d.orbitSpeed}
              phase={d.phase}
              reducedMotion={reducedMotion}
            />
          ))}
        </group>
      </Float>
    </>
  );
}
