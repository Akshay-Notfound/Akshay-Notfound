"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { LIQUID_PRESETS, LIQUID_PALETTE } from "@/config/liquid";
import type { LiquidTier } from "@/config/liquid";

// ─── Vertex Shader ───────────────────────────────────────────────────────────
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

// ─── Fragment Shader ──────────────────────────────────────────────────────────
// Full raymarched SDF with 4 morph states and liquid-chrome shading
const fragmentShader = /* glsl */ `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
  #else
    precision mediump float;
  #endif

  // ── Uniforms ────────────────────────────────────────────────────────────────
  uniform float uTime;
  uniform float uMorphT;       // 0=RAW, 1=CLEAN, 2=PIPELINE, 3=INTEL (fractional)
  uniform vec2  uResolution;
  uniform vec3  uCamPos;
  uniform mat4  uCamRotMat;
  uniform int   uMarchSteps;

  // Ripple / shockwave
  uniform vec3  uRipplePos;    // mouse hit on unit sphere
  uniform float uRippleTime;
  uniform float uRippleStr;
  uniform float uRippleDecay;
  uniform float uRippleSpeed;
  uniform float uShockTime;
  uniform float uShockStr;
  uniform float uShockSpeed;

  // Surface params
  uniform float uNoiseAmp;
  uniform float uNoiseFreq;
  uniform float uBreath;
  uniform float uBlend;
  uniform float uFresnel;
  uniform float uMetalness;
  uniform float uRoughness;

  // Palette
  uniform vec3  uCyanRim;
  uniform vec3  uVioletKey;
  uniform vec3  uChromeBase;
  uniform vec3  uInnerGlow;

  varying vec2 vUv;

  // ── Math helpers ─────────────────────────────────────────────────────────────
  #define PI 3.14159265359
  #define TAU 6.28318530718

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
    return mix(b, a, h) - k*h*(1.0-h);
  }

  // 3D value noise
  vec3 hash3(vec3 p) {
    p = vec3(dot(p,vec3(127.1,311.7,74.7)),
             dot(p,vec3(269.5,183.3,246.1)),
             dot(p,vec3(113.5,271.9,124.6)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f*f*(3.0-2.0*f);
    return mix(mix(mix(dot(hash3(i+vec3(0,0,0)),f-vec3(0,0,0)),
                       dot(hash3(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
                   mix(dot(hash3(i+vec3(0,1,0)),f-vec3(0,1,0)),
                       dot(hash3(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
               mix(mix(dot(hash3(i+vec3(0,0,1)),f-vec3(0,0,1)),
                       dot(hash3(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
                   mix(dot(hash3(i+vec3(0,1,1)),f-vec3(0,1,1)),
                       dot(hash3(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);
  }

  float fbm(vec3 p, int oct) {
    float v = 0.0, a = 0.5, f = 1.0;
    for(int i=0; i<8; i++) {
      if(i >= oct) break;
      v += a * noise(p * f);
      f *= 2.1; a *= 0.5;
    }
    return v;
  }

  // ── SDF shapes ───────────────────────────────────────────────────────────────

  // State 0: Noisy mercury blob
  float sdfBlob(vec3 p) {
    float n = fbm(p * uNoiseFreq + uTime * 0.28, 4) * uNoiseAmp;
    float n2 = fbm(p * uNoiseFreq * 1.7 - uTime * 0.18, 3) * uNoiseAmp * 0.5;
    return length(p) - 1.0 + n + n2;
  }

  // State 1: Rounded cube (precise form)
  float sdfRoundBox(vec3 p, vec3 b, float r) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
  }
  float sdfClean(vec3 p) {
    // Very subtle surface grid emboss
    float grid = sin(p.x * PI * 3.0) * sin(p.y * PI * 3.0) * sin(p.z * PI * 3.0) * 0.015;
    return sdfRoundBox(p, vec3(0.72), 0.25) + grid;
  }

  // State 2: Torus-knot pipeline (p=2, q=3)
  float sdfTorusKnot(vec3 p) {
    float scale = 0.68;
    p /= scale;
    // p,q = 2,3 torus-knot via cos/sin parametric SDF
    float phi = atan(p.y, p.x);
    float R = 0.7, r = 0.25;
    float knotAngle = 2.0 * phi;
    vec2 ref = vec2(R + r * cos(3.0 * phi), r * sin(3.0 * phi));
    vec2 cyl = vec2(length(p.xz) - ref.x, p.y - ref.y);
    return (length(cyl) - 0.22) * scale;
  }
  float sdfPipeline(vec3 p) {
    // Rotate slowly
    float ct = cos(uTime * 0.15), st = sin(uTime * 0.15);
    vec3 rp = vec3(ct*p.x - st*p.z, p.y, st*p.x + ct*p.z);
    // Add travelling light wave along surface
    float wave = sin(atan(rp.y, rp.x) * 3.0 - uTime * 2.5) * 0.012;
    return sdfTorusKnot(rp) + wave;
  }

  // State 3: Simple rounded "AR" monogram — two rounded-box letters
  float sdfLetter_A(vec3 p) {
    // Crude A approximation: two diagonal legs + crossbar
    p.y -= 0.12;
    float r = 0.08;
    // Left leg
    float lx = p.x + 0.35, ly = p.y;
    float leg1 = length(vec2(lx + ly * 0.45, ly)) - r;
    // Right leg
    float rx = p.x - 0.35;
    float leg2 = length(vec2(rx - ly * 0.45, ly)) - r;
    float legs = min(leg1, leg2);
    // Crossbar
    float bar = length(vec2(p.x, p.y + 0.0) * vec2(1.0, 2.5)) - r * 1.2;
    bar = max(bar, abs(p.y + 0.05) - 0.09);
    bar = max(bar, abs(p.x) - 0.38);
    return min(legs, bar);
  }
  float sdfLetter_R(vec3 p) {
    p.x -= 0.75;
    float r = 0.08;
    // Vertical stem
    float stem = length(vec2(p.x + 0.28, 0.0)) - r;
    stem = max(stem, abs(p.y) - 0.55);
    // Upper bowl
    float bowl = length(vec2(p.x - 0.1, p.y - 0.25)) - 0.22;
    bowl = max(bowl, -length(vec2(p.x - 0.1, p.y - 0.25)) + 0.12);
    bowl = max(bowl, -p.y + 0.05);
    // Leg
    float leg = length(vec2(p.x - 0.1 + (p.y + 0.4) * 0.5, p.y + 0.3)) - r;
    leg = max(leg, -(p.y + 0.55));
    leg = max(leg, p.y + 0.05);
    return min(min(stem, bowl), leg);
  }
  float sdfIntelligence(vec3 p) {
    // "AR" planar — extrude into z with rounded depth
    float depth = 0.18;
    float zMask = abs(p.z) - depth;
    float letters2D = min(sdfLetter_A(p), sdfLetter_R(p));
    float extruded = max(letters2D, zMask);
    // Scale up
    float scale = 0.85;
    p /= scale;
    float n = fbm(p * 3.0 + uTime * 0.05, 2) * 0.008;
    return extruded * scale + n;
  }

  // ── Master SDF with smin morph ───────────────────────────────────────────────
  float sceneSDF(vec3 p) {
    // uMorphT: 0.0=RAW, 1.0=CLEAN, 2.0=PIPELINE, 3.0=INTEL
    float t = uMorphT;
    float k = uBlend;

    float d0 = sdfBlob(p);
    float d1 = sdfClean(p);
    float d2 = sdfPipeline(p);
    float d3 = sdfIntelligence(p);

    // Ripple deformation
    if(uRippleStr > 0.001) {
      float ripAge = uRippleTime * uRippleSpeed;
      float ripDist = distance(normalize(p), uRipplePos);
      float ripWave = sin(ripDist * 8.0 - ripAge) * exp(-uRippleDecay * ripDist) * exp(-uRippleTime * 1.8) * uRippleStr;
      d0 += ripWave;
      d1 += ripWave * 0.5;
    }
    // Shockwave
    if(uShockStr > 0.001) {
      float shAge = uShockTime * uShockSpeed;
      float r = length(p) - shAge;
      float shWave = exp(-r*r * 6.0) * uShockStr * exp(-uShockTime * 1.5);
      d0 += shWave; d1 += shWave; d2 += shWave; d3 += shWave;
    }

    // Breathing
    float breath = sin(uTime * 0.55) * uBreath;
    d0 -= breath * 0.5;

    float d;
    if(t < 1.0) {
      d = mix(d0, d1, smoothstep(0.0, 1.0, t));
      d = smin(d0, d1, k * (1.0 - abs(t - 0.5) * 1.5 + 0.1));
      d = mix(d0, d, smoothstep(0.0, 0.5, t));
      d = mix(d, d1, smoothstep(0.5, 1.0, t));
    } else if(t < 2.0) {
      float tt = t - 1.0;
      d = smin(d1, d2, k * (1.0 - abs(tt - 0.5) * 1.5 + 0.1));
      d = mix(d1, d, smoothstep(0.0, 0.5, tt));
      d = mix(d, d2, smoothstep(0.5, 1.0, tt));
    } else {
      float tt = t - 2.0;
      d = smin(d2, d3, k * (1.0 - abs(tt - 0.5) * 1.5 + 0.1));
      d = mix(d2, d, smoothstep(0.0, 0.5, tt));
      d = mix(d, d3, smoothstep(0.5, 1.0, tt));
    }
    return d;
  }

  // Finite-difference normal
  vec3 calcNormal(vec3 p) {
    float eps = 0.002;
    return normalize(vec3(
      sceneSDF(p + vec3(eps,0,0)) - sceneSDF(p - vec3(eps,0,0)),
      sceneSDF(p + vec3(0,eps,0)) - sceneSDF(p - vec3(0,eps,0)),
      sceneSDF(p + vec3(0,0,eps)) - sceneSDF(p - vec3(0,0,eps))
    ));
  }

  // ── Chrome / iridescent BRDF shading ────────────────────────────────────────
  vec3 shadeSurface(vec3 pos, vec3 nor, vec3 rd) {
    // Reflection vector
    vec3 ref = reflect(rd, nor);

    // Fake environment: gradient sky (deep navy top, cyan horizon)
    float envT = ref.y * 0.5 + 0.5;
    vec3 envSky = mix(vec3(0.03, 0.06, 0.12), uChromeBase, envT);
    vec3 envFloor = mix(vec3(0.01, 0.01, 0.02), uCyanRim * 0.4, clamp(-ref.y, 0.0, 1.0));
    vec3 envCol = mix(envFloor, envSky, step(0.0, ref.y));

    // Cyan rim from left-back
    vec3 rimDir = normalize(vec3(-2.0, 1.0, -2.5));
    float rimDot = max(dot(nor, rimDir), 0.0);
    float rimSpec = pow(max(dot(ref, rimDir), 0.0), 18.0);

    // Violet key from right
    vec3 keyDir = normalize(vec3(2.5, 2.0, 1.0));
    float keyDot = max(dot(nor, keyDir), 0.0);
    float keySpec = pow(max(dot(ref, keyDir), 0.0), 28.0);

    // Fresnel
    float cosTheta = clamp(1.0 + dot(rd, nor), 0.0, 1.0);
    float fresnel = pow(cosTheta, uFresnel);

    // Iridescence: thin-film shift at grazing — cyan to violet
    float iridT = clamp(1.0 - dot(-rd, nor), 0.0, 1.0);
    vec3 iridCol = mix(uCyanRim, uVioletKey, iridT * iridT);

    // Base chrome
    vec3 chrome = envCol * uMetalness;
    // Specular highlights
    chrome += uCyanRim * rimSpec * 1.8;
    chrome += uVioletKey * keySpec * 1.4;
    // Diffuse fill (very subtle)
    chrome += uChromeBase * (rimDot * 0.08 + keyDot * 0.06);
    // Fresnel irid overlay
    chrome = mix(chrome, iridCol, fresnel * 0.55);
    // Inner cyan glow (state-dependent)
    float glowT = clamp(3.0 - uMorphT, 0.0, 1.0); // strongest at state 0
    chrome += uInnerGlow * (0.06 + 0.08 * glowT) / (length(pos) + 0.5);

    return chrome;
  }

  // ── Main ─────────────────────────────────────────────────────────────────────
  void main() {
    vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);

    // Camera ray
    vec3 ro = uCamPos;
    vec3 rd = normalize((uCamRotMat * vec4(normalize(vec3(uv, -1.8)), 0.0)).xyz);

    // Bounding sphere cull (radius 2.0)
    float b = dot(ro, rd);
    float c = dot(ro, ro) - 4.0;
    float disc = b*b - c;
    if(disc < 0.0) { gl_FragColor = vec4(0.0); return; }
    float tNear = max(0.0, -b - sqrt(disc));
    float tFar  = -b + sqrt(disc);

    // Sphere-march
    float t = tNear;
    bool hit = false;
    vec3 p;
    for(int i = 0; i < 128; i++) {
      if(i >= uMarchSteps) break;
      p = ro + rd * t;
      float d = sceneSDF(p);
      if(d < 0.0015) { hit = true; break; }
      if(t > tFar + 0.1) break;
      t += d * 0.85;
    }

    if(!hit) { gl_FragColor = vec4(0.0); return; }

    vec3 nor = calcNormal(p);
    vec3 col = shadeSurface(p, nor, rd);

    // Soft AO
    float ao = clamp(sceneSDF(p + nor * 0.12) / 0.12, 0.0, 1.0);
    col *= 0.7 + 0.3 * ao;

    // Soft vignette from distance
    float fog = exp(-t * 0.08);
    col *= fog;

    // ACESFilmic tone mapping
    col = col * (2.51 * col + 0.03) / (col * (2.43 * col + 0.59) + 0.14);
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ── Shader material factory ───────────────────────────────────────────────────
const LiquidMaterial = shaderMaterial(
  {
    uTime: 0,
    uMorphT: 0,
    uResolution: new THREE.Vector2(1, 1),
    uCamPos: new THREE.Vector3(0, 0, 4.8),
    uCamRotMat: new THREE.Matrix4(),
    uMarchSteps: 80,
    uRipplePos: new THREE.Vector3(0, 1, 0),
    uRippleTime: 9999,
    uRippleStr: 0.18,
    uRippleDecay: 2.8,
    uRippleSpeed: 3.5,
    uShockTime: 9999,
    uShockStr: 0.0,
    uShockSpeed: 4.0,
    uNoiseAmp: 0.22,
    uNoiseFreq: 1.8,
    uBreath: 0.04,
    uBlend: 0.38,
    uFresnel: 3.5,
    uMetalness: 1.0,
    uRoughness: 0.06,
    uCyanRim: new THREE.Color(LIQUID_PALETTE.cyanRim),
    uVioletKey: new THREE.Color(LIQUID_PALETTE.violetKey),
    uChromeBase: new THREE.Color(LIQUID_PALETTE.chromeBase),
    uInnerGlow: new THREE.Color(LIQUID_PALETTE.innerGlow),
  },
  vertexShader,
  fragmentShader
);

extend({ LiquidMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidMaterial: React.ComponentPropsWithRef<"shaderMaterial"> & {
        uTime?: number;
        uMorphT?: number;
        uResolution?: THREE.Vector2;
        uCamPos?: THREE.Vector3;
        uCamRotMat?: THREE.Matrix4;
        uMarchSteps?: number;
        uRipplePos?: THREE.Vector3;
        uRippleTime?: number;
        uRippleStr?: number;
        uRippleDecay?: number;
        uRippleSpeed?: number;
        uShockTime?: number;
        uShockStr?: number;
        uShockSpeed?: number;
        uNoiseAmp?: number;
        uNoiseFreq?: number;
        uBreath?: number;
        uBlend?: number;
        uFresnel?: number;
        uMetalness?: number;
        uRoughness?: number;
        uCyanRim?: THREE.Color;
        uVioletKey?: THREE.Color;
        uChromeBase?: THREE.Color;
        uInnerGlow?: THREE.Color;
      };
    }
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
interface LiquidChromeMorphProps {
  morphT?: number;       // 0–3 from scroll
  tier?: LiquidTier;
  reducedMotion?: boolean;
}

export default function LiquidChromeMorph({
  morphT = 0,
  tier = "cinematic",
  reducedMotion = false,
}: LiquidChromeMorphProps) {
  const matRef = useRef<THREE.ShaderMaterial & { [key: string]: unknown }>(null);
  const { camera, size, pointer, gl, viewport } = useThree();

  const cfg = LIQUID_PRESETS[tier];
  const morphTRef = useRef(morphT);
  morphTRef.current = morphT;

  // Smoothed morph value (avoids instant jumps)
  const smoothMorphRef = useRef(morphT);

  // Ripple state
  const rippleTimeRef = useRef(9999);
  const ripplePosRef = useRef(new THREE.Vector3(0, 1, 0));
  const shockTimeRef = useRef(9999);

  // Unit sphere for mouse projection
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const sphereGeom = useMemo(() => new THREE.SphereGeometry(1.5, 1, 1), []);
  const sphereMesh = useMemo(() => {
    const m = new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial({ visible: false }));
    return m;
  }, [sphereGeom]);

  // Mouse move → ripple
  useEffect(() => {
    if (reducedMotion || cfg.rippleStrength === 0) return;
    const onMove = () => {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(sphereMesh);
      if (hits.length > 0) {
        ripplePosRef.current.copy(hits[0].point).normalize();
        rippleTimeRef.current = 0;
      }
    };
    const canvas = gl.domElement;
    canvas.addEventListener("mousemove", onMove, { passive: true });
    return () => canvas.removeEventListener("mousemove", onMove);
  }, [reducedMotion, cfg.rippleStrength, raycaster, pointer, camera, sphereMesh, gl]);

  // Click → shockwave
  useEffect(() => {
    if (reducedMotion || cfg.shockwaveStrength === 0) return;
    const onClick = () => {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(sphereMesh);
      if (hits.length > 0) {
        shockTimeRef.current = 0;
      }
    };
    const canvas = gl.domElement;
    canvas.addEventListener("click", onClick);
    return () => canvas.removeEventListener("click", onClick);
  }, [reducedMotion, cfg.shockwaveStrength, raycaster, pointer, camera, sphereMesh, gl]);

  const camRotMat = useMemo(() => new THREE.Matrix4(), []);
  const res = useMemo(() => new THREE.Vector2(), []);

  useFrame((state, delta) => {
    if (!matRef.current) return;
    const mat = matRef.current;
    const t = state.clock.getElapsedTime();

    // Smooth morph
    smoothMorphRef.current = THREE.MathUtils.lerp(smoothMorphRef.current, morphTRef.current, 0.04);

    // Ripple / shockwave timers
    if (rippleTimeRef.current < 4) rippleTimeRef.current += delta;
    if (shockTimeRef.current < 3) shockTimeRef.current += delta;

    // Camera rotation matrix
    camRotMat.extractRotation(camera.matrixWorld);

    // Resolution
    res.set(size.width, size.height);

    // Update uniforms
    mat.uTime = t;
    mat.uMorphT = smoothMorphRef.current;
    mat.uResolution = res;
    mat.uCamPos = camera.position;
    mat.uCamRotMat = camRotMat;
    mat.uMarchSteps = cfg.marchSteps;
    mat.uRipplePos = ripplePosRef.current;
    mat.uRippleTime = rippleTimeRef.current;
    mat.uRippleStr = reducedMotion ? 0 : cfg.rippleStrength;
    mat.uRippleDecay = cfg.rippleDecay;
    mat.uRippleSpeed = cfg.rippleSpeed;
    mat.uShockTime = shockTimeRef.current;
    mat.uShockStr = reducedMotion ? 0 : cfg.shockwaveStrength;
    mat.uShockSpeed = cfg.shockwaveSpeed;
    mat.uNoiseAmp = reducedMotion ? 0.01 : cfg.noiseAmplitude;
    mat.uNoiseFreq = cfg.noiseFrequency;
    mat.uBreath = reducedMotion ? 0 : cfg.breathAmplitude;
    mat.uBlend = cfg.blendRadius;
    mat.uFresnel = cfg.fresnelPower;
    mat.uMetalness = cfg.metalness;
    mat.uRoughness = cfg.roughness;
  });

  return (
    <mesh>
      {/* Dynamic quad that generously covers the camera frustum */}
      <planeGeometry args={[Math.max(viewport.width * 1.4, 6), Math.max(viewport.height * 1.4, 6), 1, 1]} />
      <liquidMaterial
        ref={matRef}
        key={LiquidMaterial.key}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
