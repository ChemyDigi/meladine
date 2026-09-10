// Ambient synthesizer audio specifically designed for the CD Timeline Section
// Generates a lush, warm analog vinyl/chillwave ambient drone chord progression using Web Audio API

let timelineAudioCtx: AudioContext | null = null;
let masterTimelineGain: GainNode | null = null;
let isPlaying = false;
let chordInterval: ReturnType<typeof setInterval> | null = null;

export const getTimelineAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  try {
    if (!timelineAudioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        timelineAudioCtx = new AudioCtxClass();
      }
    }
    if (timelineAudioCtx && timelineAudioCtx.state === "suspended") {
      timelineAudioCtx.resume();
    }
    return timelineAudioCtx;
  } catch {
    return null;
  }
};

// Lush, dreamy chords (Frequencies in Hz: Ambient Neo-Soul / Deep Electronic chords)
const CHORD_PROGRESSIONS = [
  // Fmaj9: F3, A3, C4, E4, G4
  [174.61, 220.0, 261.63, 329.63, 392.0],
  // Dm9: D3, F3, A3, C4, E4
  [146.83, 174.61, 220.0, 261.63, 329.63],
  // Bbmaj7: Bb2, D3, F3, A3, D4
  [116.54, 146.83, 174.61, 220.0, 293.66],
  // Cadd9: C3, E3, G3, D4, G4
  [130.81, 164.81, 196.0, 293.66, 392.0],
];

let currentChordIndex = 0;

export const startTimelineAmbient = (targetVolume = 0.28) => {
  const ctx = getTimelineAudioContext();
  if (!ctx) return;
  if (isPlaying) return;

  isPlaying = true;

  if (!masterTimelineGain) {
    masterTimelineGain = ctx.createGain();
    masterTimelineGain.gain.setValueAtTime(0, ctx.currentTime);

    // Warm analog low-pass filter
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(800, ctx.currentTime);
    lowpass.Q.setValueAtTime(1.5, ctx.currentTime);

    // Gentle slow filter LFO for subtle breathing movement
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // very slow breathe
    lfoGain.gain.setValueAtTime(250, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(lowpass.frequency);
    lfo.start();

    masterTimelineGain.connect(lowpass);
    lowpass.connect(ctx.destination);
  }

  // Smooth fade-in
  masterTimelineGain.gain.cancelScheduledValues(ctx.currentTime);
  masterTimelineGain.gain.setValueAtTime(masterTimelineGain.gain.value, ctx.currentTime);
  masterTimelineGain.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + 2.0);

  const playChord = () => {
    if (!isPlaying || !ctx || !masterTimelineGain) return;
    const chord = CHORD_PROGRESSIONS[currentChordIndex % CHORD_PROGRESSIONS.length];
    currentChordIndex++;
    const now = ctx.currentTime;
    const duration = 5.5;

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      // Warm analog blend: sine with slight detuned triangle shimmer
      osc.type = i === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now);

      // Organic drift detune
      const detuneAmount = (Math.random() - 0.5) * 6;
      osc.detune.setValueAtTime(detuneAmount, now);

      // Envelope: soft swell, warm sustain, gentle fade
      const peak = i === 0 ? 0.35 : 0.2;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(peak, now + 1.8);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      const targetGain = masterTimelineGain;
      if (targetGain) {
        osc.connect(noteGain);
        noteGain.connect(targetGain);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      }
    });
  };

  playChord();
  chordInterval = setInterval(playChord, 5200);
};

export const stopTimelineAmbient = () => {
  if (!isPlaying) return;
  isPlaying = false;

  if (chordInterval) {
    clearInterval(chordInterval);
    chordInterval = null;
  }

  if (timelineAudioCtx && masterTimelineGain) {
    const now = timelineAudioCtx.currentTime;
    masterTimelineGain.gain.cancelScheduledValues(now);
    masterTimelineGain.gain.setValueAtTime(masterTimelineGain.gain.value, now);
    masterTimelineGain.gain.linearRampToValueAtTime(0, now + 1.5);
  }
};
