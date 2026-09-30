"use client";

import React from "react";

interface ProjectVisualProps {
  slug: string;
}

export default function ProjectVisual({ slug }: ProjectVisualProps) {
  if (slug === "genai-rag-analytics-agent") {
    return (
      <div className="w-full h-full min-h-[220px] bg-gradient-to-br from-deep-navy via-[#0d1527] to-[#171333] relative flex items-center justify-center overflow-hidden p-6 rounded-xl border border-glass-border">
        {/* Abstract Neural RAG Node Graphic */}
        <div className="absolute inset-0 bg-ambient-grid opacity-30" />
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full max-h-[180px] drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Query Source Vector */}
          <circle cx="50" cy="120" r="16" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
          <text x="50" y="124" fill="#93C5FD" fontSize="9" fontFamily="monospace" textAnchor="middle">QUERY</text>

          {/* Schema Vector Nodes */}
          <circle cx="150" cy="60" r="10" fill="#1E293B" stroke="#22D3EE" strokeWidth="1.5" />
          <circle cx="150" cy="120" r="12" fill="#1E293B" stroke="#8B5CF6" strokeWidth="1.5" />
          <circle cx="150" cy="180" r="10" fill="#1E293B" stroke="#3B82F6" strokeWidth="1.5" />

          {/* TF-IDF Cosine Match Lines */}
          <line x1="66" y1="120" x2="140" y2="60" stroke="#22D3EE" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
          <line x1="66" y1="120" x2="138" y2="120" stroke="#8B5CF6" strokeWidth="2" opacity="0.9" />
          <line x1="66" y1="120" x2="140" y2="180" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />

          {/* Central LLM AST Sandbox */}
          <rect x="210" y="85" width="80" height="70" rx="10" fill="#10182B" stroke="#60A5FA" strokeWidth="1.5" />
          <text x="250" y="112" fill="#F8FAFC" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">AST SANDBOX</text>
          <text x="250" y="132" fill="#22D3EE" fontSize="8" fontFamily="monospace" textAnchor="middle">df.groupby()</text>

          {/* Connectors to Output */}
          <line x1="162" y1="120" x2="210" y2="120" stroke="#8B5CF6" strokeWidth="1.5" />
          <line x1="290" y1="120" x2="335" y2="120" stroke="#34D399" strokeWidth="2" />

          {/* Insight Result */}
          <circle cx="350" cy="120" r="15" fill="#059669" fillOpacity="0.2" stroke="#34D399" strokeWidth="2" />
          <text x="350" y="124" fill="#6EE7B7" fontSize="9" fontFamily="monospace" textAnchor="middle">INSIGHT</text>
        </svg>

        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-cyan tracking-wider uppercase">
          TF-IDF Cosine Retrieval + Pandas AST Sandbox
        </div>
      </div>
    );
  }

  if (slug === "customer-churn-analysis") {
    return (
      <div className="w-full h-full min-h-[220px] bg-gradient-to-br from-[#0c1322] via-[#091a2e] to-[#122438] relative flex items-center justify-center overflow-hidden p-6 rounded-xl border border-glass-border">
        <div className="absolute inset-0 bg-ambient-grid opacity-30" />
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full max-h-[180px] drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Axis */}
          <line x1="40" y1="200" x2="360" y2="200" stroke="#334155" strokeWidth="1.5" />
          <line x1="40" y1="40" x2="40" y2="200" stroke="#334155" strokeWidth="1.5" />

          {/* Retention & Churn Curve */}
          <path
            d="M 40 60 Q 140 70 200 130 T 360 185"
            stroke="#EF4444"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 40 60 Q 140 70 200 130 T 360 185 L 360 200 L 40 200 Z"
            fill="url(#churnGradient)"
            opacity="0.15"
          />

          {/* Inflection Marker */}
          <circle cx="200" cy="130" r="5" fill="#F87171" stroke="#FEE2E2" strokeWidth="1.5" />
          <text x="210" y="125" fill="#FCA5A5" fontSize="9" fontFamily="monospace">Churn Inflection (Month 3)</text>

          {/* LTV Growth Curve */}
          <path
            d="M 40 180 Q 180 160 360 60"
            stroke="#22D3EE"
            strokeWidth="2"
            fill="none"
          />
          <text x="310" y="55" fill="#22D3EE" fontSize="9" fontFamily="monospace">High LTV Segment</text>

          <defs>
            <linearGradient id="churnGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-cyan tracking-wider uppercase">
          SQLite Relational Pipeline + Churn Hazard Modeling
        </div>
      </div>
    );
  }

  // DataMind AI and default
  return (
    <div className="w-full h-full min-h-[220px] bg-gradient-to-br from-[#0c1829] via-[#111f38] to-[#1c1836] relative flex items-center justify-center overflow-hidden p-6 rounded-xl border border-glass-border">
      <div className="absolute inset-0 bg-ambient-grid opacity-30" />
      <svg
        viewBox="0 0 400 240"
        className="w-full h-full max-h-[180px] drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Raw Dataset Grid Input */}
        <rect x="40" y="60" width="70" height="110" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1" />
        <line x1="50" y1="80" x2="100" y2="80" stroke="#64748B" strokeWidth="2" />
        <line x1="50" y1="100" x2="90" y2="100" stroke="#64748B" strokeWidth="2" />
        <line x1="50" y1="120" x2="100" y2="120" stroke="#64748B" strokeWidth="2" />
        <line x1="50" y1="140" x2="80" y2="140" stroke="#64748B" strokeWidth="2" />
        <text x="75" y="190" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">CSV / XLSX</text>

        {/* Processing Core */}
        <circle cx="185" cy="115" r="28" fill="#10182B" stroke="#8B5CF6" strokeWidth="2" />
        <text x="185" y="112" fill="#C4B5FD" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">FastAPI</text>
        <text x="185" y="125" fill="#22D3EE" fontSize="7" fontFamily="monospace" textAnchor="middle">Score: 94%</text>

        <path d="M 110 115 L 157 115" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 213 115 L 260 115" stroke="#3B82F6" strokeWidth="1.5" />

        {/* Dashboard Cards Output */}
        <rect x="260" y="55" width="100" height="55" rx="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M 275 90 L 295 75 L 315 85 L 345 65" stroke="#34D399" strokeWidth="2" fill="none" />
        <rect x="260" y="120" width="100" height="55" rx="8" fill="#1E293B" stroke="#A78BFA" strokeWidth="1.5" />
        <rect x="275" y="145" width="12" height="20" fill="#3B82F6" />
        <rect x="295" y="135" width="12" height="30" fill="#8B5CF6" />
        <rect x="315" y="140" width="12" height="25" fill="#22D3EE" />
        <rect x="335" y="130" width="12" height="35" fill="#34D399" />
      </svg>

      <div className="absolute bottom-3 left-4 text-[10px] font-mono text-cyan tracking-wider uppercase">
        Automated Schema Profiling + Next.js Reactive Charts
      </div>
    </div>
  );
}
