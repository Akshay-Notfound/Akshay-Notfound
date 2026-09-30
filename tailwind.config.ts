import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        midnight: "#080B14",
        "deep-navy": "#10182B",
        "electric-blue": "#3B82F6",
        violet: "#8B5CF6",
        cyan: "#22D3EE",
        white: "#F8FAFC",
        muted: "#94A3B8",
        glass: "#1E293B",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "glass-surface": "rgba(16, 24, 43, 0.65)",
      },
      fontFamily: {
        heading: ["var(--font-orbitron)", "var(--font-space-grotesk)", "sans-serif"],
        robotic: ["var(--font-orbitron)", "monospace"],
        hacker: ["var(--font-hacker-mono)", "var(--font-jetbrains-mono)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 70%)",
        "cyan-glow": "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glow: "0 0 25px -5px rgba(59, 130, 246, 0.4)",
        "cyan-glow": "0 0 25px -5px rgba(34, 211, 238, 0.4)",
        "violet-glow": "0 0 25px -5px rgba(139, 92, 246, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
