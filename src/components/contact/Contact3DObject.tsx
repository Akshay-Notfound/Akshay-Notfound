"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

function FloatingPolyhedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = -t * 0.2;
      coreRef.current.rotation.y = -t * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group>
        {/* Inner Glowing Tetrahedron Core */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#3b82f6"
            emissiveIntensity={2.5}
            roughness={0.2}
          />
        </mesh>

        {/* Outer Translucent Glass Icosahedron */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.3, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.6}
            roughness={0.08}
            ior={1.4}
            chromaticAberration={0.06}
            attenuationColor="#22d3ee"
            attenuationDistance={1.5}
            color="#ffffff"
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function Contact3DObject() {
  const { reducedMotion } = useSmoothScroll();

  return (
    <div className="w-full h-[220px] relative">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={3} color="#22d3ee" />
        <pointLight position={[-3, -3, -3]} intensity={2} color="#8b5cf6" />
        <Suspense fallback={null}>
          <FloatingPolyhedron />
        </Suspense>
      </Canvas>
    </div>
  );
}
