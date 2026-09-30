"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      ) as HTMLElement | null;

      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute("data-cursor-text");
        setCursorText(customText || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted || isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Small Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_#22d3ee] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Trailing Ring with dynamic scale & label */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-electric-blue/60 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          width: isHovered ? (cursorText ? 64 : 44) : 24,
          height: isHovered ? (cursorText ? 64 : 44) : 24,
          backgroundColor: isHovered
            ? cursorText
              ? "rgba(59, 130, 246, 0.2)"
              : "rgba(34, 211, 238, 0.12)"
            : "transparent",
          backdropFilter: isHovered ? "blur(4px)" : "none",
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-wider text-cyan uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
