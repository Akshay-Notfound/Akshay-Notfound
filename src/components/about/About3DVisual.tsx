"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

function GlobeInner() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.2;
    if (wireRef.current) wireRef.current.rotation.y += delta * 0.2;
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Core sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.3, 32, 32]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Wireframe overlay */}
        <lineSegments ref={wireRef}>
          <wireframeGeometry args={[new THREE.IcosahedronGeometry(1.35, 2)]} />
          <lineBasicMaterial color="#3b82f6" transparent opacity={0.35} />
        </lineSegments>

        {/* Glowing Vertex Points */}
        <points ref={pointsRef}>
          <icosahedronGeometry args={[1.36, 2]} />
          <pointsMaterial
            size={0.06}
            color="#22d3ee"
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Ambient Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.6, 1.62, 64]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
}

export default function About3DVisual() {
  const { reducedMotion } = useSmoothScroll();

  return (
    <div className="w-full h-[340px] sm:h-[400px] relative rounded-2xl overflow-hidden glass-panel border border-glass-border">
      <div className="absolute top-3 left-4 z-10 font-mono text-[11px] tracking-wider text-muted uppercase flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan" />
        Interactive Data Core // Drag to Rotate
      </div>
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color="#22d3ee" />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#8b5cf6" />
        <Suspense fallback={null}>
          <GlobeInner />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!reducedMotion}
            autoRotateSpeed={0.8}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
