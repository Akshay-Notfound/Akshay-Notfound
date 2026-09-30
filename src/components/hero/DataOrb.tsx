"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Float,
  ContactShadows,
  MeshReflectorMaterial,
  Environment,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import { useCinematic } from "@/components/providers/CinematicProvider";

interface DataOrbProps {
  reducedMotion?: boolean;
}

export default function DataOrb({ reducedMotion = false }: DataOrbProps) {
  const { config, tier } = useCinematic();
  const outerOrbRef = useRef<THREE.Group>(null);
  const innerLatticeRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const godRaysRef = useRef<THREE.Group>(null);

  const { pointer, viewport } = useThree();

  // Generate neural network nodes and connections inside the orb
  const { nodePositions, lineGeometry } = useMemo(() => {
    const positions: [number, number, number][] = [];
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const radius = 0.95;

    const rawCoords = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
      [0, 0, 1.2], [0, 0, -1.2], [1.2, 0, 0], [-1.2, 0, 0],
      [0, 1.2, 0], [0, -1.2, 0],
    ];

    rawCoords.forEach(([x, y, z]) => {
      const v = new THREE.Vector3(x, y, z).normalize().multiplyScalar(radius * (0.65 + Math.random() * 0.3));
      positions.push([v.x, v.y, v.z]);
    });

    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const v1 = new THREE.Vector3(...positions[i]);
        const v2 = new THREE.Vector3(...positions[j]);
        if (v1.distanceTo(v2) < 1.1) {
          linePoints.push(v1, v2);
        }
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    return { nodePositions: positions, lineGeometry: geometry };
  }, []);

  // Ambient cinematic floating dust particles
  const dustParticles = useMemo(() => {
    const count = config.orb.dustMotes.count;
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      coords[i] = (Math.random() - 0.5) * 10;
      coords[i + 1] = (Math.random() - 0.5) * 8;
      coords[i + 2] = (Math.random() - 0.5) * 8;
    }
    return coords;
  }, [config.orb.dustMotes.count]);

  useFrame((state) => {
    if (reducedMotion) return;

    const t = state.clock.getElapsedTime();

    // Damped mouse tracking for whole group
    const targetX = (pointer.x * viewport.width) / 12;
    const targetY = (pointer.y * viewport.height) / 12;

    if (outerOrbRef.current) {
      outerOrbRef.current.position.x = THREE.MathUtils.lerp(
        outerOrbRef.current.position.x,
        targetX,
        0.04
      );
      outerOrbRef.current.position.y = THREE.MathUtils.lerp(
        outerOrbRef.current.position.y,
        targetY + Math.sin(t * 0.7) * 0.08,
        0.04
      );
      outerOrbRef.current.rotation.y = t * 0.12;
      outerOrbRef.current.rotation.x = Math.sin(t * 0.08) * 0.08;
    }

    if (innerLatticeRef.current) {
      innerLatticeRef.current.rotation.y = -t * 0.2;
      innerLatticeRef.current.rotation.z = Math.cos(t * 0.15) * 0.12;
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2.2) * 0.06;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.02;
      particlesRef.current.rotation.x = t * 0.015;
    }

    if (godRaysRef.current) {
      godRaysRef.current.rotation.z = t * 0.05;
      const beamPulse = 0.85 + Math.sin(t * 1.5) * 0.15;
      godRaysRef.current.scale.set(beamPulse, beamPulse, 1);
    }
  });

  return (
    <>
      {/* Cinematic Depth Fog */}
      <fog attach="fog" args={["#080b14", 4, 15]} />

      {/* Local Studio HDRI Reflections using Lightformers (Zero remote fetch) */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, 0.4, 0]}>
          <Lightformer
            form="circle"
            intensity={3.5}
            position={[0, 6, -8]}
            scale={4}
            color="#22d3ee"
          />
          <Lightformer
            form="rect"
            intensity={2.8}
            position={[7, 2, 2]}
            scale={6}
            color="#8b5cf6"
          />
          <Lightformer
            form="ring"
            intensity={1.5}
            position={[-6, -2, -2]}
            scale={5}
            color="#38bdf8"
          />
        </group>
      </Environment>

      {/* Cinematic Film Lighting Rig */}
      <ambientLight intensity={config.orb.lightingRig.ambientIntensity} />
      {/* Cyan Rim Light from behind */}
      <directionalLight
        position={[-4, 3, -5]}
        intensity={config.orb.lightingRig.cyanRimIntensity}
        color="#22d3ee"
      />
      {/* Violet Key Light from the side */}
      <directionalLight
        position={[4, 4, 3]}
        intensity={config.orb.lightingRig.violetKeyIntensity}
        color="#8b5cf6"
      />
      {/* Low Warm Fill Light */}
      <pointLight
        position={[0, -3.5, 2]}
        intensity={config.orb.lightingRig.warmFillIntensity}
        color="#fef08a"
        distance={8}
      />
      {/* Internal core illumination */}
      <pointLight
        position={[0, 0, 0]}
        intensity={config.orb.lightingRig.coreEmissive}
        color="#38bdf8"
        distance={3.5}
      />

      {/* Floating Group: Core, Lattice, Glass Shell, Halo & God Rays */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        <group ref={outerOrbRef} position={[0, 0, 0]}>
          {/* Volumetric Light Shafts / God Rays behind the Orb */}
          {config.orb.volumetricLight.enabled && !reducedMotion && (
            <group ref={godRaysRef} position={[0, 0, -0.6]}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <mesh
                  key={idx}
                  rotation={[0, 0, (angle * Math.PI) / 180]}
                  position={[0, 0, -0.1]}
                >
                  <coneGeometry args={[0.7, 5, 16, 1, true]} />
                  <meshBasicMaterial
                    color={config.orb.volumetricLight.color}
                    transparent
                    opacity={config.orb.volumetricLight.intensity * 0.08}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                  />
                </mesh>
              ))}
            </group>
          )}

          {/* Inner Glowing Neural Core */}
          <mesh ref={coreRef} position={[0, 0, 0]}>
            <sphereGeometry args={[0.38, 32, 32]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#3b82f6"
              emissiveIntensity={config.orb.lightingRig.coreEmissive}
              roughness={0.08}
            />
          </mesh>

          {/* Inner Neural Network Lattice */}
          <group ref={innerLatticeRef}>
            <lineSegments geometry={lineGeometry}>
              <lineBasicMaterial
                color="#60a5fa"
                transparent
                opacity={0.4}
                linewidth={1}
              />
            </lineSegments>

            {nodePositions.map((pos, idx) => (
              <mesh key={idx} position={pos}>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshStandardMaterial
                  color={idx % 3 === 0 ? "#22d3ee" : idx % 3 === 1 ? "#a78bfa" : "#38bdf8"}
                  emissive={idx % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
                  emissiveIntensity={2.6}
                  roughness={0.15}
                />
              </mesh>
            ))}
          </group>

          {/* Photorealistic Refractive Glass Shell */}
          <mesh>
            <sphereGeometry args={[1.5, 64, 64]} />
            <MeshTransmissionMaterial
              backside
              samples={config.orb.transmission.samples}
              thickness={config.orb.transmission.thickness}
              roughness={config.orb.transmission.roughness}
              ior={config.orb.transmission.ior}
              chromaticAberration={config.orb.transmission.chromaticAberration}
              anisotropy={config.orb.transmission.anisotropy}
              distortion={config.orb.transmission.distortion}
              distortionScale={0.3}
              temporalDistortion={0.15}
              attenuationColor={config.orb.transmission.attenuationColor}
              attenuationDistance={config.orb.transmission.attenuationDistance}
              color="#ffffff"
            />
          </mesh>

          {/* Anamorphic Thin Halo Ring */}
          <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
            <torusGeometry args={[1.85, 0.012, 16, 100]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={2.0}
              transparent
              opacity={0.65}
            />
          </mesh>
        </group>
      </Float>

      {/* Floating Dust Particles catching light */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustParticles.length / 3}
            array={dustParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={config.orb.dustMotes.size}
          color="#38bdf8"
          transparent
          opacity={0.55}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Dark Glossy Reflective Floor (Active in Cinematic Tier) */}
      {config.orb.reflectiveFloor.enabled && tier === "cinematic" && !reducedMotion && (
        <mesh position={[0, -2.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[16, 16]} />
          <MeshReflectorMaterial
            blur={config.orb.reflectiveFloor.blur}
            resolution={config.orb.reflectiveFloor.resolution}
            mirror={config.orb.reflectiveFloor.mirror}
            mixBlur={config.orb.reflectiveFloor.mixBlur}
            mixStrength={config.orb.reflectiveFloor.mixStrength}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#080b14"
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
      )}

      {/* Soft Contact Ground Reflection / Shadow */}
      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.7}
        scale={7}
        blur={2.6}
        far={4.8}
        color="#04060a"
      />
    </>
  );
}
