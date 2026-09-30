"use client";

import React from "react";

export default function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Pristine 4K Cinematic Vignette (Velvety smooth contrast, zero noisy grain) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 65%, rgba(4, 6, 12, 0.4) 88%, rgba(3, 4, 8, 0.7) 100%)",
        }}
      />
    </div>
  );
}
