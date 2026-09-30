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
        {/* Holographic Neural Data Core */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.25, 2]} />
          <meshStandardMaterial
            color="#0b1329"
            roughness={0.15}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Wireframe lattice */}
        <lineSegments ref={wireRef}>
          <wireframeGeometry args={[new THREE.OctahedronGeometry(1.28, 2)]} />
          <lineBasicMaterial color="#38bdf8" transparent opacity={0.4} />
        </lineSegments>

        {/* Glowing Vertex Points */}
        <points ref={pointsRef}>
          <octahedronGeometry args={[1.3, 2]} />
          <pointsMaterial
            size={0.065}
            color="#22d3ee"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </Float>
  );
}

export default function About3DVisual() {
  const { reducedMotion } = useSmoothScroll();
  const [isInView, setIsInView] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[340px] sm:h-[400px] relative rounded-2xl overflow-hidden glass-panel border border-glass-border"
    >
      <div className="absolute top-3 left-4 z-10 font-mono text-[11px] tracking-wider text-muted uppercase flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan" />
        Interactive Data Core // Drag to Rotate
      </div>
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        frameloop={isInView && !reducedMotion ? "always" : "demand"}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color="#22d3ee" />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#8b5cf6" />
        <Suspense fallback={null}>
          <GlobeInner />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!reducedMotion && isInView}
            autoRotateSpeed={0.8}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
