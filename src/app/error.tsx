"use client";

import React, { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application client error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#080B14] flex flex-col items-center justify-center p-6 text-center select-none text-white">
      <div className="max-w-md w-full p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-5">
        <div className="w-12 h-12 rounded-full border border-cyan/40 bg-cyan/10 flex items-center justify-center mx-auto text-cyan font-mono text-sm animate-pulse">
          !
        </div>
        <div className="space-y-1">
          <div className="text-xs font-mono text-cyan tracking-widest uppercase">
            {"// RUNTIME_RECOVERY"}
          </div>
          <h2 className="text-xl font-bold font-heading text-white">
            System Signal Interrupted
          </h2>
          <p className="text-xs text-muted font-sans leading-relaxed pt-1">
            A temporary client cache mismatch was detected. Reloading restores full neural visual pipelines.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan text-white text-xs font-mono tracking-wider font-semibold hover:opacity-90 transition-opacity"
          >
            [ REINITIALIZE ]
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono tracking-wider font-semibold hover:bg-white/10 transition-colors"
          >
            [ RELOAD PAGE ]
          </button>
        </div>
      </div>
    </div>
  );
}
