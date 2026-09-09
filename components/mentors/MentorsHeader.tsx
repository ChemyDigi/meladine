"use client";

import React, { useState, useEffect } from "react";

const LETTERS = ["M", "E", "N", "T", "O", "R", "S"];

// C Major Scale Frequencies: C4, D4, E4, F4, G4, A4, C5
const PIANO_NOTES = [
  261.63, // M -> C4
  293.66, // E -> D4
  329.63, // N -> E4
  349.23, // T -> F4
  392.0,  // O -> G4
  440.0,  // R -> A4
  523.25, // S -> C5
];

// Slight rotational tilts for dynamic spring pop-up
const ROTATIONS = [-3, 2.5, -2, 3, -2.5, 2, -3];

// Shared AudioContext instance for zero-latency instant playback
let sharedAudioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
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

// Acoustic Piano Sound Synthesizer via Web Audio API
const playPianoSound = (freq: number, volume = 0.42) => {
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
    // Safe fallback if audio context fails
  }
};

export default function MentorsHeader() {
  const [revealed, setRevealed] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeClickIdx, setActiveClickIdx] = useState<number | null>(null);
  const [waveActive, setWaveActive] = useState(false);
  const [waveIdx, setWaveIdx] = useState<number | null>(null);

  useEffect(() => {
    // Trigger initial staggered pop-up on mount
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  // Handle single letter piano key press
  const handleLetterClick = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    playPianoSound(PIANO_NOTES[i], 0.48);
    setActiveClickIdx(i);

    setTimeout(() => {
      setActiveClickIdx((curr) => (curr === i ? null : curr));
    }, 280);
  };

  // Sequential audio-wave arpeggio ripple across all letters
  const triggerWave = () => {
    if (waveActive) return;
    setWaveActive(true);

    LETTERS.forEach((_, i) => {
      setTimeout(() => {
        setWaveIdx(i);
        playPianoSound(PIANO_NOTES[i], 0.32);
        if (i === LETTERS.length - 1) {
          setTimeout(() => {
            setWaveIdx(null);
            setWaveActive(false);
          }, 260);
        }
      }, i * 75);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-8 sm:pb-12 text-center flex flex-col items-center">
      {/* Giant "MENTORS" Animated Title with Elastic Letter Pop-ups & Piano Synthesis */}
      <h1
        onClick={triggerWave}
        className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[13rem] xl:text-[15rem] font-display uppercase tracking-tight text-black leading-[0.85] select-none text-center cursor-pointer group whitespace-nowrap pt-4 sm:pt-6 pb-2 sm:pb-4"
        title="Click each letter to play piano notes"
      >
        {LETTERS.map((letter, i) => {
          const isDirectlyHovered = hoveredIdx === i;
          const isNeighborHovered = hoveredIdx !== null && Math.abs(hoveredIdx - i) === 1;
          const isWaveCurrent = waveIdx === i;
          const isClicked = activeClickIdx === i;

          let transformStyle = "";
          let colorClass = "text-black";
          let filterStyle = "";

          if (isClicked) {
            transformStyle = `translateY(-28px) scale(1.18) rotate(${ROTATIONS[i] * 1.5}deg)`;
            colorClass = "text-[#ed1438]";
            filterStyle = "drop-shadow(0 20px 26px rgba(237, 20, 56, 0.35))";
          } else if (isDirectlyHovered || isWaveCurrent) {
            transformStyle = `translateY(-20px) scale(1.12) rotate(${ROTATIONS[i]}deg)`;
            colorClass = "text-[#ed1438]";
            filterStyle = "drop-shadow(0 16px 20px rgba(237, 20, 56, 0.22))";
          } else if (isNeighborHovered) {
            transformStyle = "translateY(-7px) scale(1.04)";
            colorClass = "text-neutral-800";
          } else if (revealed) {
            transformStyle = "translateY(0) scale(1) rotate(0deg)";
          } else {
            // Initial hidden state: pop from below with scale down and tilt
            transformStyle = `translateY(70px) scale(0.65) rotate(${ROTATIONS[i] * 2}deg)`;
          }

          // Delay for initial entrance sequence (staggered)
          const delayStyle =
            revealed && (isDirectlyHovered || isNeighborHovered || isWaveCurrent || isClicked)
              ? "0ms"
              : `${i * 60}ms`;

          return (
            <span
              key={i}
              onClick={(e) => handleLetterClick(i, e)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                transform: transformStyle,
                filter: filterStyle || undefined,
                transitionDelay: delayStyle,
              }}
              className={`inline-block transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${colorClass} ${
                revealed ? "opacity-100" : "opacity-0"
              }`}
            >
              {letter}
            </span>
          );
        })}
      </h1>

      {/* Subtitle with Staggered Entrance */}
      <p
        className={`mt-6 text-sm sm:text-base md:text-lg lg:text-xl font-light text-neutral-600 max-w-2xl leading-relaxed mx-auto transition-all duration-800 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Learn directly from seasoned artists and dedicated masters across guitar, vocals, and keyboard nurturing technique, musicality, and artistic expression.
      </p>
    </div>
  );
}
