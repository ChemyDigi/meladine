"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface Milestone {
  year: string;
  tagline: string;
  description: string;
  rotation: number;
  // Exact polar coordinates along the orbit ring:
  // angle in degrees: 0 is 3 o'clock (right), -90 is 12 o'clock (top), etc.
  angleDeg: number;
  audioTrack?: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2007",
    tagline: "THE BEGINNING",
    description:
      "Meladine began as a small guitar class, founded on a passion for music and a vision to inspire aspiring musicians.",
    rotation: 0,
    angleDeg: -58,
    audioTrack: "/audio/milestone-2010.wav",
  },
  {
    year: "2012",
    tagline: "THE FIRST TALENT SHOW",
    description:
      "Meladine organized its first talent show, featuring 16 students and a pioneering Sri Lankan artist as the guest judge.",
    rotation: -26.25,
    angleDeg: -43.5,
    audioTrack: "/audio/milestone-2012.wav",
  },
  {
    year: "2013",
    tagline: "EXPANDING MUSICAL HORIZONS",
    description:
      "Meladine conducted its first visiting teaching session at Sara Music Academy – Kiribathgoda, in collaboration with partners of Yamaha Music Center.",
    rotation: -52.5,
    angleDeg: -29,
    audioTrack: "/audio/milestone-2012.wav",
  },
  {
    year: "2014",
    tagline: "THE FIRST POCKET SHOW",
    description:
      "Meladine presented its first-ever Pocket Show in Kiribathgoda, bringing music beyond the classroom and into the local community.",
    rotation: -78.75,
    angleDeg: -14.5,
    audioTrack: "/audio/milestone-2015.wav",
  },
  {
    year: "2015",
    tagline: "A GATHERING OF MUSIC LOVERS",
    description:
      "Meladine hosted its first workshop, bringing together more than 100 music lovers for a shared musical experience.",
    rotation: -105,
    angleDeg: 0,
    audioTrack: "/audio/milestone-2015.wav",
  },
  {
    year: "2018",
    tagline: "INTO THE STUDIO",
    description:
      "Meladine introduced a studio-based learning environment, giving students the opportunity to experience music education in a music studio setting.",
    rotation: -131.25,
    angleDeg: 14.5,
    audioTrack: "/audio/milestone-2018.wav",
  },
  {
    year: "2022",
    tagline: "MELADINE'S GOT TALENT",
    description:
      "A celebration of student talent, creativity, and musical expression that continued Meladine's tradition of encouraging performers.",
    rotation: -157.5,
    angleDeg: 29,
    audioTrack: "/audio/milestone-2020.wav",
  },
  {
    year: "2025",
    tagline: "EXPANDING THE MUSICAL JOURNEY",
    description:
      "Meladine expanded its educational offerings with the introduction of vocal and keyboard training classes.",
    rotation: -183.75,
    angleDeg: 43.5,
    audioTrack: "/audio/milestone-2018.wav",
  },
  {
    year: "2026",
    tagline: "MELADINE RHAPSODY — LIVE IN CONCERT",
    description:
      "A landmark celebration bringing Meladine's students together on one stage to showcase their musical development, dedication, and passion for performance.",
    rotation: -210,
    angleDeg: 58,
    audioTrack: "/audio/milestone-2020.wav",
  },
];

export default function AboutTimelineSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [idleRotation, setIdleRotation] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const containerTrackRef = useRef<HTMLDivElement>(null);
  const audioMapRef = useRef<{ [key: number]: HTMLAudioElement }>({});
  const transitionAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentActiveIdxRef = useRef(0);
  const isInViewRef = useRef(false);

  // Subtle continuous slow auto-rotation (e.g. gentle ambient disc spin)
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Gentle continuous spin (~12 degrees per second)
      setIdleRotation((prev) => (prev + 12 * delta) % 360);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, []);

  // Preload and initialize audio tracks for each milestone + transition chime
  useEffect(() => {
    const audios: { [key: number]: HTMLAudioElement } = {};

    MILESTONES.forEach((milestone, idx) => {
      const audio = new Audio(milestone.audioTrack || "/audio/cd-ambient-journey.wav");
      audio.loop = true;
      audio.volume = 0.75; // Crisp volume
      audio.preload = "auto";
      audios[idx] = audio;
    });

    const trans = new Audio("/audio/milestone-transition.wav");
    trans.volume = 0.85;
    trans.preload = "auto";
    transitionAudioRef.current = trans;

    audioMapRef.current = audios;

    return () => {
      Object.values(audios).forEach((a) => {
        a.pause();
        a.currentTime = 0;
      });
      if (transitionAudioRef.current) {
        transitionAudioRef.current.pause();
      }
    };
  }, []);

  // Function to switch music when milestone changes
  const switchTrackTo = useCallback(
    (newIdx: number, playTransition = true) => {
      const audios = audioMapRef.current;
      if (!audios) return;

      const oldIdx = currentActiveIdxRef.current;
      currentActiveIdxRef.current = newIdx;

      if (!isInViewRef.current || !isAudioEnabled) {
        return;
      }

      // Play milestone transition scratch/chime sound
      if (playTransition && oldIdx !== newIdx && transitionAudioRef.current) {
        const trans = transitionAudioRef.current;
        trans.currentTime = 0;
        trans.play().catch(() => {});
      }

      // Cross-fade tracks smoothly
      Object.entries(audios).forEach(([idxStr, audio]) => {
        const idx = Number(idxStr);
        if (idx === newIdx) {
          audio.volume = 0.75;
          if (audio.paused) {
            audio.play().catch(() => {});
          }
        } else {
          // Pause others
          audio.pause();
          audio.currentTime = 0;
        }
      });
    },
    [isAudioEnabled]
  );

  const playCurrentAudio = useCallback(() => {
    if (!isAudioEnabled) return;
    const currentAudio = audioMapRef.current[currentActiveIdxRef.current];
    if (currentAudio && currentAudio.paused) {
      currentAudio.volume = 0.75;
      currentAudio.play().catch(() => {});
    }
  }, [isAudioEnabled]);

  const pauseAllAudio = useCallback(() => {
    Object.values(audioMapRef.current).forEach((a) => a.pause());
  }, []);

  // Standard scroll speed tracking milestones + audio track switching
  useEffect(() => {
    const handleScroll = () => {
      const container = containerTrackRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = container.offsetHeight - windowH;

      if (totalScrollable <= 0) return;

      // Check if user is currently inside the CD timeline section
      const inView = rect.top <= windowH * 0.45 && rect.bottom >= windowH * 0.15;
      if (inView !== isInViewRef.current) {
        isInViewRef.current = inView;
        if (inView && isAudioEnabled) {
          playCurrentAudio();
        } else {
          pauseAllAudio();
        }
      }

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      // Normal scroll progression rotation to milestones (0 to -210 degrees)
      const rotation = progress * -210;
      setScrollRotation(rotation);

      // Select active milestone based on scroll position
      const step = progress * (MILESTONES.length - 1);
      const rounded = Math.min(Math.round(step), MILESTONES.length - 1);

      if (rounded !== currentActiveIdxRef.current) {
        setActiveIdx(rounded);
        switchTrackTo(rounded, true);
      }
    };

    // User interaction will unlock audio if user is scrolled in view
    const handleUserInteraction = () => {
      if (isInViewRef.current && isAudioEnabled) {
        playCurrentAudio();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    if (window.__lenis) {
      window.__lenis.on("scroll", handleScroll);
    }

    handleScroll();

    return () => {
      pauseAllAudio();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      if (window.__lenis) {
        window.__lenis.off("scroll", handleScroll);
      }
    };
  }, [isAudioEnabled, playCurrentAudio, pauseAllAudio, switchTrackTo]);

  const toggleAudio = () => {
    const nextState = !isAudioEnabled;
    setIsAudioEnabled(nextState);
    if (nextState && isInViewRef.current) {
      playCurrentAudio();
    } else {
      pauseAllAudio();
    }
  };

  const currentMilestone = MILESTONES[activeIdx];

  const scrollToMilestone = (idx: number) => {
    if (idx !== activeIdx) {
      switchTrackTo(idx, true);
    }
    if (!containerTrackRef.current) return;
    const distance = containerTrackRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTrackRef.current.offsetTop + (distance * idx) / (MILESTONES.length - 1);

    if (window.__lenis) {
      window.__lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // Orbit ring radius percentage relative to the center container (118% circle -> radius = 59%)
  const ORBIT_RADIUS_PCT = 59;

  return (
    <div
      ref={containerTrackRef}
      className="relative w-full h-[500vh] bg-white font-sans"
    >
      {/* 
        Sticky Viewport:
        Holds the screen in place while the user scrolls through the 500vh runway
      */}
      <div className="sticky top-0 w-full h-screen min-h-[720px] max-h-screen bg-white text-neutral-900 overflow-hidden select-none flex flex-col justify-between py-10 px-6 sm:px-12 lg:px-20">

        {/* Main Center Stage */}
        <div className="relative z-10 w-full flex-1 flex items-center justify-center">

          {/* Left Side: Consistent typography with website (font-display Bebas Neue & font-sans Inter) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 max-w-sm xl:max-w-md hidden md:flex flex-col">
            <span className="text-sm sm:text-base font-mono tracking-[0.35em] text-[#ed1438] font-bold uppercase mb-3 block">
              The Evolution of Meladine
            </span>
            <h2 className="text-6xl sm:text-6xl lg:text-6xl xl:text-8xl font-display uppercase tracking-tight text-black leading-[0.9]">
              A DISK<br />OF HISTORY
            </h2>

            <p className="mt-5 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed max-w-xs xl:max-w-sm">
              2007 — 2026 · A journey of passion, creativity, and musical growth (19+ Years)
            </p>

            {/* Active Milestone Story Detail */}
            <div className="mt-6 pt-5 border-t border-neutral-200/80 max-w-xs xl:max-w-sm transition-all duration-300">
              <span className="text-xs font-mono tracking-widest text-[#ed1438] font-bold uppercase block mb-1.5">
                {currentMilestone.year} · {currentMilestone.tagline}
              </span>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                {currentMilestone.description}
              </p>
            </div>

            {/* Interactive Audio Visualizer & Status Toggle */}
            <div className="mt-7 flex items-center gap-3">
              <button
                onClick={toggleAudio}
                className="flex items-center gap-3 px-4 py-2 rounded-full border border-neutral-300 hover:border-black bg-white/90 shadow-sm hover:shadow transition-all text-xs font-mono tracking-wider uppercase text-neutral-900 cursor-pointer"
                title={isAudioEnabled ? "Mute soundtrack" : "Play soundtrack"}
              >
                {/* Equalizer Wave Animation */}
                <div className="flex items-end gap-[3px] h-3.5 w-4">
                  <span
                    className={`w-[2.5px] bg-[#ed1438] rounded-full transition-all duration-200 ${
                      isAudioEnabled ? "animate-pulse h-3.5" : "h-1 bg-neutral-300"
                    }`}
                  />
                  <span
                    className={`w-[2.5px] bg-[#ed1438] rounded-full transition-all duration-300 ${
                      isAudioEnabled ? "animate-bounce h-2.5" : "h-1 bg-neutral-300"
                    }`}
                  />
                  <span
                    className={`w-[2.5px] bg-[#ed1438] rounded-full transition-all duration-150 ${
                      isAudioEnabled ? "animate-pulse h-3" : "h-1 bg-neutral-300"
                    }`}
                  />
                  <span
                    className={`w-[2.5px] bg-[#ed1438] rounded-full transition-all duration-250 ${
                      isAudioEnabled ? "animate-bounce h-2" : "h-1 bg-neutral-300"
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold">{isAudioEnabled ? "PLAYING" : "MUTED"}</span>
                  <span className="text-neutral-400">/</span>
                  <span className="text-[#ed1438] font-bold">{currentMilestone.year} MIX</span>
                </div>
              </button>
            </div>

          </div>

          {/* Center Stage: Large CD Disc + Orbit Ring (Sized to fit perfectly within viewport height) */}
          <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px] lg:w-[580px] lg:h-[580px] xl:w-[620px] xl:h-[620px]">

            {/* The Light Orbital Guide Line: Exact 118% circle centered at (50%, 50%) */}
            <div className="absolute w-[118%] h-[118%] rounded-full border border-neutral-300 pointer-events-none" />

            {/* The Large CD Disc */}
            <div
              className="relative w-full h-full rounded-full overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.22),0_10px_30px_rgba(0,0,0,0.12)] will-change-transform z-20 cursor-pointer"
              style={{ transform: `rotate(${scrollRotation + idleRotation}deg)` }}
              onClick={() => scrollToMilestone((activeIdx + 1) % MILESTONES.length)}
              title="Click or scroll to rotate to next milestone"
            >
              <Image
                src="/images/About/abouttimeline_centered.png"
                alt="A Disk of History"
                fill
                priority
                sizes="(max-width: 768px) 360px, (max-width: 1200px) 680px, 720px"
                className="object-contain pointer-events-none select-none"
              />

              {/* Center Disc Overlay Year & Tagline - Positioned higher and rotates WITH the CD */}
              <div className="absolute top-[16%] left-1/2 -translate-x-1/2 text-center pointer-events-none z-30 transition-opacity duration-300 w-full px-4 max-w-[280px] sm:max-w-[340px]">
                <span className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-tight text-neutral-900 block leading-none">
                  {currentMilestone.year}
                </span>
                <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] uppercase text-neutral-800 block mt-1 font-bold leading-tight">
                  {currentMilestone.tagline}
                </span>
              </div>

              {/* Left Side: Handwritten Signature Slogan (Rotates with CD, positioned clearly on the metallic sheen) */}
              <div className="absolute left-[3%] sm:left-[6%] top-[50%] -translate-y-1/2 -rotate-12 pointer-events-none z-30 text-left select-none max-w-[130px] sm:max-w-[170px]">
                <p className="font-signature text-4xl sm:text-5xl lg:text-4xl text-neutral-800 leading-[0.82] drop-shadow-xs tracking-wide">
                  More Than<br />
                  <span className="text-3xl sm:text-4xl lg:text-4xl text-[#ed1438]">Music</span>
                </p>
              </div>

              {/* Right Side: Meladine Logo & Collective Tag (Rotates with CD, centered in outer metallic band) */}
              <div className="absolute right-[4%] sm:right-[7%] top-[50%] -translate-y-1/2 pointer-events-none z-30 flex flex-col items-center text-center select-none w-28 sm:w-36">
                <div className="relative w-14 h-16 sm:w-16 sm:h-20 lg:w-20 lg:h-24 mb-1.5 drop-shadow-sm">
                  <Image
                    src="/images/LOGO.png"
                    alt="Meladine Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* 
              ORBITAL TIMELINE MILESTONE NODES:
              Calculated mathematically on the orbit circle so the dot lies EXACTLY ON THE LIGHT LINE!
            */}
            {MILESTONES.map((milestone, idx) => {
              const rad = (milestone.angleDeg * Math.PI) / 180;
              // Circle center is 50%, 50%
              const dotLeftPct = 50 + ORBIT_RADIUS_PCT * Math.cos(rad);
              const dotTopPct = 50 + ORBIT_RADIUS_PCT * Math.sin(rad);

              const isActive = activeIdx === idx;
              const isPast = activeIdx > idx;

              return (
                <div
                  key={milestone.year}
                  className="absolute z-30 pointer-events-auto"
                  style={{
                    left: `${dotLeftPct}%`,
                    top: `${dotTopPct}%`,
                    // Center the bullet dot precisely on the line intersection
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <button
                    onClick={() => scrollToMilestone(idx)}
                    className="relative flex items-center group cursor-pointer text-left"
                  >
                    {/* The Bullet Dot sitting exactly centered on the light orbit line */}
                    <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                      <span
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-[#ed1438] ring-4 ring-[#ed1438]/25 scale-125 shadow-md"
                            : isPast
                            ? "bg-black"
                            : "bg-neutral-300 group-hover:bg-black"
                        }`}
                      />
                    </div>

                    {/* Milestone Text (Year & Tagline) */}
                    <div
                      className="absolute whitespace-nowrap transition-all duration-300 left-5 sm:left-6 top-1/2 -translate-y-1/2 text-left pl-1"
                    >
                      <span
                        className={`text-lg sm:text-2xl lg:text-2xl font-display uppercase tracking-tight block transition-colors leading-none ${
                          isActive
                            ? "text-[#ed1438] scale-105 origin-left font-bold"
                            : isPast
                            ? "text-black"
                            : "text-neutral-400 group-hover:text-black"
                        }`}
                      >
                        {milestone.year}
                      </span>
                      <span
                        className={`text-[9px] sm:text-[11px] font-mono tracking-[0.16em] uppercase block mt-0.5 transition-colors ${
                          isActive
                            ? "text-neutral-900 font-bold"
                            : "text-neutral-500"
                        }`}
                      >
                        {milestone.tagline}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}

          </div>

        </div>

        {/* Mobile active milestone description banner */}
        <div className="md:hidden w-full pb-2 px-2 text-center z-30 pointer-events-none">
          <p className="text-xs font-mono text-[#ed1438] font-bold uppercase tracking-wider mb-0.5">
            {currentMilestone.year} · {currentMilestone.tagline}
          </p>
          <p className="text-xs text-neutral-600 line-clamp-2 px-4">
            {currentMilestone.description}
          </p>
        </div>

      </div>
    </div>
  );
}
