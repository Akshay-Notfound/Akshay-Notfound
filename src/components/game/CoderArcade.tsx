"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { sfx } from "@/utils/audio";
import { Play, RotateCcw, Zap, Shield, Flame, Trophy, Volume2, Sparkles } from "lucide-react";

interface Bug {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  hp: number;
  maxHp: number;
  label: string;
  color: string;
  icon: string;
  drift: number;
}

interface Laser {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
}

const BUG_TYPES = [
  { label: "NullPointer", color: "#4ade80", hp: 1, speed: 2.0, icon: "🐛" },
  { label: "MemoryLeak", color: "#f59e0b", hp: 2, speed: 1.5, icon: "⚠️" },
  { label: "StackOverflow", color: "#ef4444", hp: 3, speed: 1.2, icon: "💥" },
  { label: "AI Hallucination", color: "#a855f7", hp: 1, speed: 2.4, icon: "👻" },
  { label: "SQL SyntaxError", color: "#22d3ee", hp: 1, speed: 2.2, icon: "⚡" },
  { label: "BigQuery Unindexed", color: "#38bdf8", hp: 2, speed: 1.6, icon: "🔍" },
];

export default function CoderArcade() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(1);
  const [linesDebugged, setLinesDebugged] = useState(0);

  // Power-up cooldowns & durations (in seconds or active flags)
  const [bigQueryReady, setBigQueryReady] = useState(true);
  const [pySparkActive, setPySparkActive] = useState(false);
  const [powerBiShield, setPowerBiShield] = useState(false);

  // Mutable refs for high-performance animation loop (no React state lag in requestAnimationFrame)
  const playerRef = useRef({
    x: 350,
    y: 420,
    width: 44,
    height: 36,
    speed: 7,
  });

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const bugsRef = useRef<Bug[]>([]);
  const lasersRef = useRef<Laser[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatTextsRef = useRef<FloatingText[]>([]);
  const lastShotTimeRef = useRef(0);
  const lastSpawnTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(1);
  const livesRef = useRef(3);
  const levelRef = useRef(1);
  const linesRef = useRef(0);
  const pySparkActiveRef = useRef(false);
  const powerBiShieldRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);

  // Load high score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("akshay_coder_arcade_highscore");
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {
      // Ignore
    }
  }, []);

  // Spawn a floating text notification in the canvas
  const addFloatText = (x: number, y: number, text: string, color = "#22d3ee") => {
    floatTextsRef.current.push({
      id: Math.random(),
      x,
      y,
      text,
      color,
      alpha: 1.0,
    });
  };

  // Create neon explosion particles
  const createExplosion = (x: number, y: number, color: string, count = 16) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 25 + 15,
        color,
        size: Math.random() * 3 + 1.5,
      });
    }
  };

  // SPECIAL ATTACK 1: Google BigQuery Blast
  const triggerBigQueryBlast = useCallback(() => {
    if (!bigQueryReady || gameState !== "playing") return;
    setBigQueryReady(false);
    sfx.levelUp();

    // Obliterate all bugs currently on screen
    const destroyedCount = bugsRef.current.length;
    bugsRef.current.forEach((bug) => {
      createExplosion(bug.x + bug.width / 2, bug.y + bug.height / 2, "#38bdf8", 20);
    });
    bugsRef.current = [];

    const bonus = destroyedCount * 150 + 500;
    scoreRef.current += bonus;
    linesRef.current += destroyedCount * 12 + 50;
    setScore(scoreRef.current);
    setLinesDebugged(linesRef.current);

    if (canvasRef.current) {
      addFloatText(
        canvasRef.current.width / 2 - 80,
        canvasRef.current.height / 2,
        `⚡ BIGQUERY PARTITION BLAST! +${bonus} XP`,
        "#60a5fa"
      );
    }

    // Cooldown timer: 20 seconds
    setTimeout(() => {
      setBigQueryReady(true);
      sfx.hover();
    }, 20000);
  }, [bigQueryReady, gameState]);

  // SPECIAL ATTACK 2: PySpark Distributed Overclock
  const triggerPySparkOverclock = useCallback(() => {
    if (pySparkActive || gameState !== "playing") return;
    setPySparkActive(true);
    pySparkActiveRef.current = true;
    sfx.powerup();

    if (canvasRef.current) {
      addFloatText(
        canvasRef.current.width / 2 - 70,
        canvasRef.current.height / 2 + 30,
        "🔥 PYSPARK OVERCLOCK: 3X SPREAD LASER!",
        "#fb923c"
      );
    }

    // Active for 8 seconds
    setTimeout(() => {
      setPySparkActive(false);
      pySparkActiveRef.current = false;
    }, 8000);
  }, [pySparkActive, gameState]);

  // SPECIAL ATTACK 3: Power BI Protective Shield
  const triggerPowerBiShield = useCallback(() => {
    if (powerBiShield || gameState !== "playing") return;
    setPowerBiShield(true);
    powerBiShieldRef.current = true;
    sfx.select();

    if (canvasRef.current) {
      addFloatText(
        canvasRef.current.width / 2 - 70,
        canvasRef.current.height / 2 + 50,
        "🛡️ POWER BI DAX SHIELD ACTIVE!",
        "#facc15"
      );
    }

    // Active for 8 seconds
    setTimeout(() => {
      setPowerBiShield(false);
      powerBiShieldRef.current = false;
    }, 8000);
  }, [powerBiShield, gameState]);

  // Start new game session
  const startGame = () => {
    sfx.select();
    sfx.playWhoosh();
    setGameState("playing");
    setScore(0);
    setLives(3);
    setLevel(1);
    setCombo(1);
    setLinesDebugged(0);

    scoreRef.current = 0;
    livesRef.current = 3;
    levelRef.current = 1;
    comboRef.current = 1;
    linesRef.current = 0;
    bugsRef.current = [];
    lasersRef.current = [];
    particlesRef.current = [];
    floatTextsRef.current = [];

    if (canvasRef.current) {
      playerRef.current.x = canvasRef.current.width / 2 - playerRef.current.width / 2;
      playerRef.current.y = canvasRef.current.height - 55;
    }
  };

  // Main high-performance Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localId: number;

    const gameLoop = (time: number) => {
      // Clear with dark cyber trail
      ctx.fillStyle = "rgba(7, 11, 20, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Cyber Grid Background
      ctx.strokeStyle = "rgba(30, 41, 59, 0.35)";
      ctx.lineWidth = 0.8;
      const gridSize = 32;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (gameState === "playing") {
        const player = playerRef.current;

        // Player movement
        if (keysRef.current["ArrowLeft"] || keysRef.current["KeyA"]) {
          player.x = Math.max(10, player.x - player.speed);
        }
        if (keysRef.current["ArrowRight"] || keysRef.current["KeyD"]) {
          player.x = Math.min(canvas.width - player.width - 10, player.x + player.speed);
        }

        // Firing lasers (Spacebar or continuous holding)
        const shotCooldown = pySparkActiveRef.current ? 120 : 200;
        if (keysRef.current["Space"] && time - lastShotTimeRef.current > shotCooldown) {
          lastShotTimeRef.current = time;
          sfx.laser();

          const laserY = player.y;
          const laserX = player.x + player.width / 2;

          if (pySparkActiveRef.current) {
            // Triple spread shot
            lasersRef.current.push({ id: Math.random(), x: laserX, y: laserY, vx: 0, vy: -10, color: "#fb923c" });
            lasersRef.current.push({ id: Math.random(), x: laserX - 8, y: laserY, vx: -2.2, vy: -9.5, color: "#f97316" });
            lasersRef.current.push({ id: Math.random(), x: laserX + 8, y: laserY, vx: 2.2, vy: -9.5, color: "#f97316" });
          } else {
            // Standard dual high-speed laser
            lasersRef.current.push({ id: Math.random(), x: laserX - 6, y: laserY, vx: 0, vy: -9, color: "#22d3ee" });
            lasersRef.current.push({ id: Math.random(), x: laserX + 6, y: laserY, vx: 0, vy: -9, color: "#22d3ee" });
          }
        }

        // Spawn bugs based on level
        const spawnInterval = Math.max(650, 1500 - levelRef.current * 120);
        if (time - lastSpawnTimeRef.current > spawnInterval) {
          lastSpawnTimeRef.current = time;
          const template = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];
          bugsRef.current.push({
            id: Math.random(),
            x: Math.random() * (canvas.width - 90) + 20,
            y: -30,
            width: 80,
            height: 26,
            speed: template.speed + Math.random() * 0.4 + levelRef.current * 0.1,
            hp: template.hp,
            maxHp: template.hp,
            label: template.label,
            color: template.color,
            icon: template.icon,
            drift: (Math.random() - 0.5) * 0.8,
          });
        }

        // Update & Render Lasers
        for (let i = lasersRef.current.length - 1; i >= 0; i--) {
          const l = lasersRef.current[i];
          l.x += l.vx;
          l.y += l.vy;

          // Draw neon laser bolt
          ctx.save();
          ctx.shadowColor = l.color;
          ctx.shadowBlur = 8;
          ctx.fillStyle = l.color;
          ctx.fillRect(l.x - 2, l.y, 4, 14);
          ctx.restore();

          if (l.y < -20 || l.x < 0 || l.x > canvas.width) {
            lasersRef.current.splice(i, 1);
          }
        }

        // Update & Render Bugs
        for (let i = bugsRef.current.length - 1; i >= 0; i--) {
          const b = bugsRef.current[i];
          b.y += b.speed;
          b.x += b.drift;

          // Wall bounce drift
          if (b.x < 10 || b.x > canvas.width - b.width - 10) {
            b.drift *= -1;
          }

          // Draw Bug Card
          ctx.save();
          ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 1.2;
          ctx.shadowColor = b.color;
          ctx.shadowBlur = 6;

          // Rounded rectangle box
          ctx.beginPath();
          ctx.roundRect(b.x, b.y, b.width, b.height, 6);
          ctx.fill();
          ctx.stroke();

          // Bug label & icon
          ctx.font = "bold 9.5px 'Fira Code', monospace";
          ctx.fillStyle = b.color;
          ctx.fillText(`${b.icon} ${b.label}`, b.x + 6, b.y + 16);

          // Health indicator bar
          if (b.maxHp > 1) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
            ctx.fillRect(b.x + 6, b.y + b.height - 4, b.width - 12, 2.5);
            ctx.fillStyle = b.color;
            ctx.fillRect(b.x + 6, b.y + b.height - 4, (b.width - 12) * (b.hp / b.maxHp), 2.5);
          }
          ctx.restore();

          // Laser-Bug Collision Detection
          for (let j = lasersRef.current.length - 1; j >= 0; j--) {
            const l = lasersRef.current[j];
            if (
              l.x > b.x &&
              l.x < b.x + b.width &&
              l.y > b.y &&
              l.y < b.y + b.height
            ) {
              // Hit!
              lasersRef.current.splice(j, 1);
              b.hp -= 1;
              createExplosion(l.x, l.y, b.color, 6);

              if (b.hp <= 0) {
                // Bug destroyed!
                sfx.explosion();
                createExplosion(b.x + b.width / 2, b.y + b.height / 2, b.color, 16);

                const pts = 100 * comboRef.current;
                scoreRef.current += pts;
                comboRef.current = Math.min(5, comboRef.current + 1);
                linesRef.current += 10;

                setScore(scoreRef.current);
                setCombo(comboRef.current);
                setLinesDebugged(linesRef.current);

                addFloatText(b.x + 10, b.y, `+${pts} XP`, b.color);

                // Level up every 1,500 points
                if (Math.floor(scoreRef.current / 1500) + 1 > levelRef.current) {
                  levelRef.current += 1;
                  setLevel(levelRef.current);
                  sfx.levelUp();
                  addFloatText(canvas.width / 2 - 50, 80, `LEVEL UP! LEVEL ${levelRef.current}`, "#22d3ee");
                }

                bugsRef.current.splice(i, 1);
                break;
              }
            }
          }

          // Bottom Breach / Player Collision
          if (b.y > canvas.height - 45) {
            // Bug escaped past defense
            bugsRef.current.splice(i, 1);

            if (!powerBiShieldRef.current) {
              livesRef.current -= 1;
              setLives(livesRef.current);
              comboRef.current = 1;
              setCombo(1);
              createExplosion(player.x + player.width / 2, player.y, "#ef4444", 20);

              if (livesRef.current <= 0) {
                // Game Over
                setGameState("gameover");
                sfx.explosion();

                // Save High Score
                if (scoreRef.current > highScore) {
                  setHighScore(scoreRef.current);
                  try {
                    localStorage.setItem("akshay_coder_arcade_highscore", scoreRef.current.toString());
                  } catch {
                    // Ignore
                  }
                }
              }
            } else {
              // Shield absorbed hit!
              createExplosion(b.x + b.width / 2, canvas.height - 30, "#facc15", 12);
              addFloatText(b.x, canvas.height - 40, "SHIELD DEFLECTED!", "#facc15");
            }
          }
        }

        // Draw Player Ship (Cyber Terminal Core)
        ctx.save();
        const px = player.x;
        const py = player.y;

        // Power BI Golden Protective Shield Bubble
        if (powerBiShieldRef.current) {
          ctx.beginPath();
          ctx.arc(px + player.width / 2, py + player.height / 2, 34, 0, Math.PI * 2);
          ctx.strokeStyle = "#facc15";
          ctx.lineWidth = 2.5;
          ctx.shadowColor = "#facc15";
          ctx.shadowBlur = 14;
          ctx.stroke();
        }

        // Cannon Body
        ctx.fillStyle = pySparkActiveRef.current ? "#f97316" : "#0f172a";
        ctx.strokeStyle = pySparkActiveRef.current ? "#fb923c" : "#22d3ee";
        ctx.lineWidth = 2;
        ctx.shadowColor = pySparkActiveRef.current ? "#fb923c" : "#22d3ee";
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.moveTo(px + player.width / 2, py); // Cannon tip
        ctx.lineTo(px + player.width, py + player.height);
        ctx.lineTo(px + player.width / 2, py + player.height - 8);
        ctx.lineTo(px, py + player.height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Reactor Core Dot
        ctx.beginPath();
        ctx.arc(px + player.width / 2, py + player.height / 2 + 4, 4, 0, Math.PI * 2);
        ctx.fillStyle = pySparkActiveRef.current ? "#ffffff" : "#38bdf8";
        ctx.fill();
        ctx.restore();
      }

      // Render Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;

        const alpha = 1 - p.life / p.maxLife;
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
        }
      }

      // Render Floating Combat Numbers
      for (let i = floatTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatTextsRef.current[i];
        ft.y -= 1.2;
        ft.alpha -= 0.025;

        ctx.save();
        ctx.font = "bold 11px 'Fira Code', monospace";
        ctx.fillStyle = ft.color;
        ctx.globalAlpha = Math.max(0, ft.alpha);
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();

        if (ft.alpha <= 0) {
          floatTextsRef.current.splice(i, 1);
        }
      }

      localId = requestAnimationFrame(gameLoop);
    };

    localId = requestAnimationFrame(gameLoop);
    animFrameIdRef.current = localId;

    return () => {
      cancelAnimationFrame(localId);
    };
  }, [gameState, highScore]);

  // Keyboard Event Listeners for Controls & Hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;

      // Special attack hotkeys
      if (e.code === "KeyB") triggerBigQueryBlast();
      if (e.code === "KeyS") triggerPySparkOverclock();
      if (e.code === "KeyP") triggerPowerBiShield();

      // Prevent scrolling when using Space or Arrow keys inside canvas
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        if (gameState === "playing") {
          e.preventDefault();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState, triggerBigQueryBlast, triggerPySparkOverclock, triggerPowerBiShield]);

  // Mouse & Touch Control for Mobile & Desktop Aiming
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== "playing" || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const scale = canvasRef.current.width / rect.width;
    playerRef.current.x = Math.max(
      10,
      Math.min(canvasRef.current.width - playerRef.current.width - 10, mouseX * scale - playerRef.current.width / 2)
    );
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== "playing" || !canvasRef.current || e.touches.length === 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const scale = canvasRef.current.width / rect.width;
    playerRef.current.x = Math.max(
      10,
      Math.min(canvasRef.current.width - playerRef.current.width - 10, touchX * scale - playerRef.current.width / 2)
    );
  };

  const handleMouseDown = () => {
    keysRef.current["Space"] = true;
  };

  const handleMouseUp = () => {
    keysRef.current["Space"] = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto rounded-2xl bg-midnight/95 border border-cyan/30 shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden font-mono select-none"
    >
      {/* Top Arcade Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
          <span className="font-bold text-white tracking-widest uppercase">CYBER CODER: BUG MATRIX INVASION</span>
          <span className="px-1.5 py-0.5 rounded bg-cyan/20 text-cyan text-[10px] font-semibold">v2.6 LIVE</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="text-slate-400">
            LOC FIXED: <span className="text-emerald-400 font-bold">{linesDebugged}</span>
          </div>
          <div className="text-slate-400">
            RECORD: <span className="text-cyan font-bold">{highScore} XP</span>
          </div>
        </div>
      </div>

      {/* In-Game Telemetry Dashboard Bar */}
      <div className="flex flex-wrap items-center justify-between px-5 py-2.5 bg-slate-900/60 border-b border-white/5 text-xs text-slate-300">
        <div className="flex items-center gap-5">
          <div>
            SCORE: <span className="text-cyan font-extrabold text-sm">{score} XP</span>
          </div>
          <div>
            LEVEL: <span className="text-amber-400 font-bold">{level}</span>
          </div>
          <div className="flex items-center gap-1">
            LIVES:{" "}
            {Array.from({ length: 3 }).map((_, idx) => (
              <span
                key={idx}
                className={`text-sm ${idx < lives ? "text-rose-500" : "text-slate-700"}`}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              combo > 1 ? "bg-amber-500/20 text-amber-400 animate-pulse" : "text-slate-500"
            }`}
          >
            COMBO x{combo}
          </span>
          <span className="text-slate-500 text-[11px]">
            RANK:{" "}
            <span className="text-emerald-400 font-semibold">
              {score > 8000
                ? "CYBER DEMIGOD"
                : score > 4000
                ? "AI ARCHITECT"
                : score > 1500
                ? "SENIOR ENGINEER"
                : "DATA ANALYST"}
            </span>
          </span>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <div className="relative aspect-[16/9] w-full bg-slate-950">
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="w-full h-full block cursor-crosshair touch-none"
        />

        {/* Start Overlay Screen */}
        {gameState === "idle" && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE PORTFOLIO MINI-GAME</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan via-sky-400 to-indigo-400 mb-2 font-mono">
              NEURAL BUG DEFENDER
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
              Null pointers, memory leaks, and AI hallucinations are invading the production server! Take command of the terminal core, shoot lasers, and deploy BigQuery & PySpark powerups to save the codebase!
            </p>

            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan to-blue-600 hover:from-cyan/90 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>LAUNCH MISSION [START]</span>
            </button>

            <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] text-slate-400 max-w-xs text-left">
              <div>⌨️ <b>A/D or Arrows:</b> Move</div>
              <div>⚡ <b>Spacebar / Click:</b> Shoot</div>
              <div>☁️ <b>[B]:</b> BigQuery Blast</div>
              <div>🔥 <b>[S]:</b> PySpark Overclock</div>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="text-rose-500 text-xs font-bold tracking-widest uppercase mb-1">
              SYSTEM INTEGRITY CRITICAL
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-2 font-mono">GAME OVER</h2>
            <p className="text-sm text-slate-300 mb-4">
              Final Debug Score: <span className="text-cyan font-bold">{score} XP</span> • Lines Fixed:{" "}
              <span className="text-emerald-400 font-bold">{linesDebugged}</span>
            </p>

            {score >= highScore && score > 0 && (
              <div className="mb-4 px-3 py-1.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>NEW PERSONAL HIGH SCORE RECORD!</span>
              </div>
            )}

            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-lg bg-cyan hover:bg-cyan/90 text-slate-950 font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESTART RUN [TRY AGAIN]</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Ultimate Attack Hotbar */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/90 border-t border-white/10 text-xs">
        <button
          onClick={triggerBigQueryBlast}
          disabled={!bigQueryReady || gameState !== "playing"}
          className={`px-3 py-2 rounded-lg border flex items-center justify-center gap-2 font-semibold transition-all ${
            bigQueryReady && gameState === "playing"
              ? "bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/60 text-blue-300 cursor-pointer shadow-[0_0_12px_rgba(59,130,246,0.3)]"
              : "bg-white/5 border-white/5 text-slate-600 cursor-not-allowed opacity-50"
          }`}
        >
          <Zap className="w-4 h-4 text-blue-400" />
          <span>[B] BigQuery Blast</span>
        </button>

        <button
          onClick={triggerPySparkOverclock}
          disabled={pySparkActive || gameState !== "playing"}
          className={`px-3 py-2 rounded-lg border flex items-center justify-center gap-2 font-semibold transition-all ${
            !pySparkActive && gameState === "playing"
              ? "bg-amber-600/20 hover:bg-amber-600/30 border-amber-500/60 text-amber-300 cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.3)]"
              : "bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse"
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>[S] PySpark Overclock</span>
        </button>

        <button
          onClick={triggerPowerBiShield}
          disabled={powerBiShield || gameState !== "playing"}
          className={`px-3 py-2 rounded-lg border flex items-center justify-center gap-2 font-semibold transition-all ${
            !powerBiShield && gameState === "playing"
              ? "bg-yellow-600/20 hover:bg-yellow-600/30 border-yellow-500/60 text-yellow-300 cursor-pointer shadow-[0_0_12px_rgba(234,179,8,0.3)]"
              : "bg-yellow-500/20 border-yellow-500 text-yellow-300 animate-pulse"
          }`}
        >
          <Shield className="w-4 h-4 text-yellow-400" />
          <span>[P] Power BI Shield</span>
        </button>
      </div>
    </div>
  );
}
