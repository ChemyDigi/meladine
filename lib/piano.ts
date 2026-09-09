// Shared Web Audio API Acoustic Piano Synthesizer

let sharedAudioCtx: AudioContext | null = null;

export const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  try {
    if (!sharedAudioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        sharedAudioCtx = new AudioCtxClass();
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
};

export const playPianoSound = (freq: number, volume = 0.42) => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const duration = 1.9;

    // Master gain with acoustic piano strike & decay envelope
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(volume, now + 0.005); // sharp hammer strike
    masterGain.gain.exponentialRampToValueAtTime(volume * 0.45, now + 0.14); // body resonance
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // smooth sustain decay

    // Dynamic lowpass filter to emulate piano soundboard & felt hammer warmth
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(3600, now);
    filter.frequency.exponentialRampToValueAtTime(650, now + duration * 0.7);

    masterGain.connect(filter);
    filter.connect(ctx.destination);

    // Warm piano string harmonics with subtle unison detuning
    const harmonics = [
      { mult: 1, gain: 0.55, detune: 0 },
      { mult: 1, gain: 0.22, detune: 1.4 }, // unison string shimmer
      { mult: 2, gain: 0.28, detune: -0.8 },
      { mult: 3, gain: 0.12, detune: 1.5 },
      { mult: 4, gain: 0.05, detune: 0 },
    ];

    harmonics.forEach(({ mult, gain: hGain, detune }) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = mult === 1 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq * mult, now);
      osc.detune.setValueAtTime(detune * 3.5, now);

      oscGain.gain.setValueAtTime(hGain, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration * (1 / Math.sqrt(mult)));

      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + duration);
    });
  } catch {
    // Safe audio fallback
  }
};
