/**
 * Pure Web Audio API Film Sound Engine (Synthesized - Zero external audio files)
 * Features master compressor, low-gain ambient drone, riser, deep impact, and UI cues.
 */

class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private enabled: boolean = false; // Default mute until user gesture
  private droneGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private droneNoiseNode: AudioNode | null = null;

  constructor() {
    // Lazy initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // 1. Film-grade Dynamics Compressor (prevents clipping, smooths dynamics)
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-24, this.ctx.currentTime);
        this.compressor.knee.setValueAtTime(30, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(12, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

        // 2. Master Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

        // Route: Source -> MasterGain -> Compressor -> Destination
        this.masterGain.connect(this.compressor);
        this.compressor.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(force?: boolean): boolean {
    this.enabled = force !== undefined ? force : !this.enabled;

    if (this.enabled) {
      this.initContext();
      this.startAmbientDrone();
    } else {
      this.stopAmbientDrone();
    }

    return this.enabled;
  }

  // Very quiet ambient drone (55Hz fundamental A1 + harmonics + filtered noise)
  public startAmbientDrone() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.droneGain) return;

      this.droneGain = this.ctx.createGain();
      // Extremely low, unobtrusive film drone
      this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.025, this.ctx.currentTime + 3.0);
      this.droneGain.connect(this.masterGain);

      // Low-pass filter for warm cinematic warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(260, this.ctx.currentTime);
      filter.connect(this.droneGain);

      // 3 detuned subtle sine/triangle oscillators
      const freqs = [55, 110.2, 164.8];
      this.droneOscs = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime);
        osc.connect(filter);
        osc.start();
        return osc;
      });

      // Filtered pink-ish noise texture for subtle film air
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.05;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.008, this.ctx.currentTime);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.droneGain);

      whiteNoise.start();
      this.droneNoiseNode = whiteNoise;
    } catch {
      // Audio context may not be allowed yet
    }
  }

  public stopAmbientDrone() {
    if (this.droneGain && this.ctx) {
      try {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
        setTimeout(() => {
          this.droneOscs.forEach((o) => {
            try {
              o.stop();
              o.disconnect();
            } catch {
              // Ignore
            }
          });
          this.droneOscs = [];
          if (this.droneNoiseNode) {
            try {
              (this.droneNoiseNode as AudioScheduledSourceNode).stop();
              this.droneNoiseNode.disconnect();
            } catch {
              // Ignore
            }
            this.droneNoiseNode = null;
          }
          if (this.droneGain) {
            this.droneGain.disconnect();
            this.droneGain = null;
          }
        }, 1100);
      } catch {
        this.droneGain = null;
      }
    }
  }

  // Cinematic Intro Riser (Low tension pitch sweep)
  public playRiser(duration = 2.4) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(120, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + duration);

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(55, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(330, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + duration * 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore
    }
  }

  // Cinematic Sub Impact (Trailer title reveal thump)
  public playImpact() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.8);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.9);
    } catch {
      // Ignore
    }
  }

  // Cinematic Whoosh (Section transition)
  public playWhoosh() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const dur = 0.45;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + dur * 0.5);
      filter.frequency.exponentialRampToValueAtTime(150, now + dur);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(280, now + dur * 0.5);
      osc.frequency.linearRampToValueAtTime(80, now + dur);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + dur * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + dur);
    } catch {
      // Ignore
    }
  }

  // Sci-fi hover blip
  public hover() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(740, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // Ignore
    }
  }

  // Futuristic confirmation / click
  public select() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.045, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Ignore
    }
  }

  public unlock() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0.04, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.2);
      });
    } catch {
      // Ignore
    }
  }
}

export const sfx = new CinematicAudioEngine();
