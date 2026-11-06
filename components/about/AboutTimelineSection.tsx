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
    angleDeg: -60,
    audioTrack: "/audio/milestone-2010.wav",
  },
  {
    year: "2012",
    tagline: "THE FIRST TALENT SHOW",
    description:
      "Meladine organized its first talent show, featuring 16 students and a pioneering Sri Lankan artist as the guest judge.",
    rotation: -26.25,
    angleDeg: -45,
    audioTrack: "/audio/milestone-2012.wav",
  },
  {
    year: "2013",
    tagline: "EXPANDING MUSICAL HORIZONS",
    description:
      "Meladine conducted its first visiting teaching session at Sara Music Academy – Kiribathgoda, in collaboration with partners of Yamaha Music Center.",
    rotation: -52.5,
    angleDeg: -30,
    audioTrack: "/audio/milestone-2012.wav",
  },
  {
    year: "2014",
    tagline: "THE FIRST POCKET SHOW",
    description:
      "Meladine presented its first-ever Pocket Show in Kiribathgoda, bringing music beyond the classroom and into the local community.",
    rotation: -78.75,
    angleDeg: -15,
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
    angleDeg: 15,
    audioTrack: "/audio/milestone-2018.wav",
  },
  {
    year: "2022",
    tagline: "MELADINE'S GOT TALENT",
    description:
      "A celebration of student talent, creativity, and musical expression that continued Meladine's tradition of encouraging performers.",
    rotation: -157.5,
    angleDeg: 30,
    audioTrack: "/audio/milestone-2020.wav",
  },
  {
    year: "2025",
    tagline: "EXPANDING THE MUSICAL JOURNEY",
    description:
      "Meladine expanded its educational offerings with the introduction of vocal and keyboard training classes.",
    rotation: -183.75,
    angleDeg: 45,
    audioTrack: "/audio/milestone-2018.wav",
  },
  {
    year: "2026",
    tagline: "MELADINE RHAPSODY — LIVE IN CONCERT",
    description:
      "A landmark celebration bringing Meladine's students together on one stage to showcase their musical development, dedication, and passion for performance.",
    rotation: -210,
    angleDeg: 60,
    audioTrack: "/audio/milestone-2020.wav",
  },
];

type PinState = "before" | "pinned" | "after" | "static";

// Below xl the timeline is a plain section: no pin, no scroll-driven spin, and
// the active year is chosen by tapping it. xl and up keeps the scroll-driven
// pinned experience. Must match the `xl:` classes in the markup.
const DESKTOP_QUERY = "(min-width: 1280px)";
let desktopMql: MediaQueryList | null = null;
function isDesktopView() {
  if (typeof window === "undefined") return false;
  desktopMql ??= window.matchMedia(DESKTOP_QUERY);
  return desktopMql.matches;
}

export default function AboutTimelineSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  // Rotation (desktop only) lives in refs and is written straight to the
  // disc's style from a rAF loop. Driving it through React state re-rendered
  // the whole section every frame.
  const scrollRotationRef = useRef(0);
  const idleRotationRef = useRef(0);
  const discRef = useRef<HTMLDivElement>(null);
  // The pinned stage. It is pinned with position: fixed from the scroll
  // handler instead of position: sticky — see the comment on the element.
  // Its height (in svh) stays fixed while mobile toolbars collapse, unlike
  // window.innerHeight, so scroll progress is measured against it.
  const stageRef = useRef<HTMLDivElement>(null);
  const pinStateRef = useRef<PinState | null>(null);
  const pinDirtyRef = useRef(true);
  const fixedBrokenRef = useRef(false);
  // Latest scroll handler, so the rAF loop and Lenis can call it each frame.
  const handleScrollRef = useRef<() => void>(() => {});

  // Pins the stage with position: fixed while the track covers the viewport,
  // parked at the track's top / bottom outside that range. Styles are only
  // written when the state changes (or after a resize).
  const applyPin = useCallback((rect: DOMRect, stage: HTMLDivElement, stageH: number) => {
    const next: PinState = rect.top > 0 ? "before" : rect.bottom < stageH ? "after" : "pinned";
    const st = stage.style;
    const changed = next !== pinStateRef.current || pinDirtyRef.current;

    if (next === "pinned" && fixedBrokenRef.current) {
      // Fallback when an ancestor breaks position: fixed — follow the scroll
      // by translating the absolutely positioned stage instead.
      if (changed) {
        st.position = "absolute";
        st.top = "0px";
        st.bottom = "auto";
        st.left = "0px";
        st.width = "100%";
      }
      st.transform = `translateY(${-rect.top}px)`;
    } else if (changed) {
      st.transform = "";
      if (next === "before") {
        st.position = "absolute";
        st.top = "0px";
        st.bottom = "auto";
        st.left = "0px";
        st.width = "100%";
      } else if (next === "after") {
        st.position = "absolute";
        st.top = "auto";
        st.bottom = "0px";
        st.left = "0px";
        st.width = "100%";
      } else {
        st.position = "fixed";
        st.top = "0px";
        st.bottom = "auto";
        st.left = `${rect.left}px`;
        st.width = `${rect.width}px`;
        // Verify fixed really pins to the viewport; a transformed ancestor
        // (e.g. injected by a device-emulation tool) would make it scroll away.
        if (Math.abs(stage.getBoundingClientRect().top) > 1) {
          fixedBrokenRef.current = true;
          st.position = "absolute";
          st.left = "0px";
          st.width = "100%";
          st.transform = `translateY(${-rect.top}px)`;
        }
      }
    }

    pinStateRef.current = next;
    pinDirtyRef.current = false;
  }, []);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const containerTrackRef = useRef<HTMLDivElement>(null);
  const audioMapRef = useRef<{ [key: number]: HTMLAudioElement }>({});
  const transitionAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentActiveIdxRef = useRef(0);
  const isInViewRef = useRef(false);

  // Per-frame loop: pin + scroll progress, then the disc's rotation.
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let lenis: Window["__lenis"];
    const onLenisScroll = () => handleScrollRef.current();

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Lenis is created by a parent effect, i.e. after this one ran, so it
      // is picked up lazily. Its "scroll" event fires synchronously right
      // after it moves the page, before paint; native scroll events only
      // arrive a frame later.
      if (!lenis && window.__lenis) {
        lenis = window.__lenis;
        lenis.on("scroll", onLenisScroll);
      }

      // Re-measure every frame too, so the pin never depends on a scroll
      // event reaching us (whatever element is actually scrolling).
      handleScrollRef.current();

      const disc = discRef.current;
      if (disc) {
        if (isDesktopView()) {
          // Gentle continuous spin (~12 degrees per second)
          idleRotationRef.current = (idleRotationRef.current + 12 * delta) % 360;
          disc.style.transform = `rotate(${scrollRotationRef.current + idleRotationRef.current}deg)`;
        } else if (disc.style.transform) {
          // Mobile / tablet: the disc stays still.
          disc.style.transform = "";
        }
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      lenis?.off("scroll", onLenisScroll);
    };
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
      const stage = stageRef.current;

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

      if (!isDesktopView()) {
        // Mobile / tablet: plain section. Drop any pin styles left over from
        // a desktop-sized window; the active year is chosen by tapping.
        if (stage && pinStateRef.current !== "static") {
          const st = stage.style;
          st.position = "";
          st.top = "";
          st.bottom = "";
          st.left = "";
          st.width = "";
          st.transform = "";
          pinStateRef.current = "static";
          pinDirtyRef.current = true;
        }
        return;
      }

      const stageH = stage?.offsetHeight ?? windowH;
      const totalScrollable = container.offsetHeight - stageH;

      if (stage) applyPin(rect, stage, stageH);

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      // Normal scroll progression rotation to milestones (0 to -210 degrees)
      scrollRotationRef.current = progress * -210;

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

    const handleResize = () => {
      pinDirtyRef.current = true;
      handleScroll();
    };

    handleScrollRef.current = handleScroll;
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });

    handleScroll();

    return () => {
      pauseAllAudio();
      handleScrollRef.current = () => {};
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [isAudioEnabled, playCurrentAudio, pauseAllAudio, switchTrackTo, applyPin]);

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

  // On phones/tablets nothing inside the pinned stage may get its own GPU layer
  // (will-change, CSS transform animations/transitions). Mobile Safari drifted
  // those layers away from the rest of the stage while scrolling — the CD and
  // some year labels separated from the disc shadow and the other labels.
  // So the compact toggle's equaliser is static and the disc is only promoted
  // (will-change) at xl, where the stage isn't affected.
  const renderAudioToggle = (compact: boolean) => {
    const pulse = compact ? "" : "animate-pulse";
    const bounce = compact ? "" : "animate-bounce";
    return (
      <button
        onClick={toggleAudio}
        className={`flex items-center gap-3 rounded-full ${compact ? "px-3.5 py-1.5 text-[10px]" : "px-4 py-2 text-xs"} border border-neutral-300 hover:border-black bg-white/90 shadow-sm hover:shadow transition-all font-mono tracking-wider uppercase text-neutral-900 cursor-pointer pointer-events-auto`}
        title={isAudioEnabled ? "Mute soundtrack" : "Play soundtrack"}
        aria-pressed={!isAudioEnabled}
      >
        {/* Equalizer Wave Animation */}
        <div className="flex items-end gap-[3px] h-3.5 w-4">
          <span
            className={`w-[2.5px] bg-[#ed1438] rounded-full transition-all duration-200 ${
              isAudioEnabled ? `${pulse} h-3.5` : "h-1 bg-neutral-300"
            }`}
          />
          <span
            className={`w-[2.5px] bg-[#ed1438] rounded-full transition-all duration-300 ${
              isAudioEnabled ? `${bounce} h-2.5` : "h-1 bg-neutral-300"
            }`}
          />
          <span
            className={`w-[2.5px] bg-[#ed1438] rounded-full transition-all duration-150 ${
              isAudioEnabled ? `${pulse} h-3` : "h-1 bg-neutral-300"
            }`}
          />
          <span
            className={`w-[2.5px] bg-[#ed1438] rounded-full transition-all duration-250 ${
              isAudioEnabled ? `${bounce} h-2` : "h-1 bg-neutral-300"
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold">{isAudioEnabled ? "PLAYING" : "MUTED"}</span>
          <span className="text-neutral-400">/</span>
          <span className="text-[#ed1438] font-bold">{currentMilestone.year} MIX</span>
        </div>
      </button>
    );
  };

  // Desktop scrolls the runway to the milestone (which rotates the disc);
  // mobile / tablet just selects it and shows its details below the disc.
  const selectMilestone = (idx: number) => {
    if (isDesktopView()) {
      scrollToMilestone(idx);
      return;
    }
    if (idx !== activeIdx) {
      setActiveIdx(idx);
      switchTrackTo(idx, true);
    }
  };

  const scrollToMilestone = (idx: number) => {
    if (idx !== activeIdx) {
      switchTrackTo(idx, true);
    }
    if (!containerTrackRef.current) return;
    const track = containerTrackRef.current;
    const stageH = stageRef.current?.offsetHeight ?? window.innerHeight;
    const distance = track.offsetHeight - stageH;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const targetScroll = trackTop + (distance * idx) / (MILESTONES.length - 1);

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
      // Negative margins cancel the About page's horizontal padding so the
      // stage spans the full viewport (its overflow clip otherwise cuts the
      // orbit labels a few pixels early on tablets). The 500vh runway only
      // exists at xl; below that the section has its natural height.
      className="relative xl:h-[500vh] bg-white font-sans -mx-6 sm:-mx-10 lg:-mx-14"
    >
      {/*
        Stage. Below xl it is an ordinary block (heading, still disc, details
        of the tapped year underneath) — pinning and scroll-driven motion on
        phones made parts of the stage drift apart while scrolling.
        At xl+ the scroll handler pins it with position: fixed (inline style)
        rather than position: sticky: with sticky the browser's compositor
        applies the scroll offset to each GPU layer separately, and a fixed
        element has no scroll-dependent offset, so its contents cannot come
        apart. `xl:sticky` only remains as the no-JS fallback.
      */}
      <div ref={stageRef} className="xl:sticky xl:top-0 w-full xl:h-svh xl:min-h-[720px] xl:max-h-svh bg-white text-neutral-900 overflow-hidden select-none flex flex-col xl:justify-between pt-8 pb-8 sm:pt-12 sm:pb-12 xl:pt-10 xl:pb-10 px-4 sm:px-12 lg:px-20">

        {/* Mobile / tablet heading + soundtrack toggle (the desktop column below is xl-only) */}
        <div className="xl:hidden shrink-0 z-30 flex flex-col items-center text-center">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#ed1438] font-bold uppercase block">
            The Evolution of Meladine
          </span>
          <h2 className="mt-1 text-4xl sm:text-6xl font-display uppercase tracking-tight text-black leading-[0.9]">
            A Disk of History
          </h2>
          <div className="mt-3">{renderAudioToggle(true)}</div>
        </div>

        {/* Main Center Stage */}
        <div className="relative z-10 w-full xl:flex-1 xl:min-h-0 flex items-center justify-center my-10 sm:my-14 xl:my-0">

          {/* Left Side: Consistent typography with website (font-display Bebas Neue & font-sans Inter) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 xl:max-w-[320px] 2xl:max-w-md hidden xl:flex flex-col">
            <span className="text-sm sm:text-base font-mono tracking-[0.35em] text-[#ed1438] font-bold uppercase mb-3 block">
              The Evolution of Meladine
            </span>
            <h2 className="text-6xl sm:text-6xl lg:text-6xl xl:text-8xl font-display uppercase tracking-tight text-black leading-[0.9]">
              A DISK<br />OF HISTORY
            </h2>

            <p className="mt-5 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed max-w-xs 2xl:max-w-sm">
              2007 — 2026 · A journey of passion, creativity, and musical growth (19+ Years)
            </p>

            {/* Active Milestone Story Detail */}
            <div className="mt-6 pt-5 border-t border-neutral-200/80 max-w-xs 2xl:max-w-sm transition-all duration-300">
              <span className="text-xs font-mono tracking-widest text-[#ed1438] font-bold uppercase block mb-1.5">
                {currentMilestone.year} · {currentMilestone.tagline}
              </span>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                {currentMilestone.description}
              </p>
            </div>

            {/* Interactive Audio Visualizer & Status Toggle */}
            <div className="mt-7 flex items-center gap-3">
              {renderAudioToggle(false)}
            </div>

          </div>

          {/* Center Stage: Large CD Disc + Orbit Ring (Sized to fit perfectly within viewport height) */}
          <div className="relative flex items-center justify-center w-[300px] h-[300px] xs:w-[340px] xs:h-[340px] max-sm:-ml-8 sm:ml-0 sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] lg:w-[560px] lg:h-[560px] xl:w-[480px] xl:h-[480px] 2xl:w-[620px] 2xl:h-[620px]">

            {/* The Light Orbital Guide Line: Exact 118% circle centered at (50%, 50%) */}
            <div className="absolute inset-[-9%] rounded-full border border-neutral-300 pointer-events-none" />

            {/* The Large CD Disc */}
            <div
              className="relative w-full h-full rounded-full shadow-[0_30px_90px_rgba(0,0,0,0.22),0_10px_30px_rgba(0,0,0,0.12)] z-20 cursor-pointer select-none"
              onClick={() => selectMilestone((activeIdx + 1) % MILESTONES.length)}
              title="Next milestone"
            >
              {/* Rotating layer: transform is written by the rAF loop, never by React */}
              <div
                ref={discRef}
                className="absolute inset-0 rounded-full xl:will-change-transform"
                style={{ transformOrigin: "50% 50%" }}
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
            </div>

            {/* 
              ORBITAL TIMELINE MILESTONE NODES:
              Calculated mathematically on the orbit circle so the dot lies EXACTLY ON THE LIGHT LINE!
            */}
            {MILESTONES.map((milestone, idx) => {
              const rad = (milestone.angleDeg * Math.PI) / 180;
              // Circle center is 50%, 50%
              // Rounded so the server-rendered style string matches what the
              // browser serialises (avoids a hydration attribute mismatch).
              const dotLeftPct = Number((50 + ORBIT_RADIUS_PCT * Math.cos(rad)).toFixed(2));
              const dotTopPct = Number((50 + ORBIT_RADIUS_PCT * Math.sin(rad)).toFixed(2));

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
                    onClick={() => selectMilestone(idx)}
                    className="relative flex items-center group cursor-pointer text-left"
                  >
                    {/* The Bullet Dot sitting exactly centered on the light orbit line */}
                    <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                      <span
                        className={`rounded-full transition-[background-color,box-shadow,width,height] duration-300 ${
                          isActive
                            ? "w-[15px] h-[15px] bg-[#ed1438] ring-4 ring-[#ed1438]/25 shadow-md"
                            : isPast
                            ? "w-3 h-3 bg-black"
                            : "w-3 h-3 bg-neutral-300 group-hover:bg-black"
                        }`}
                      />
                    </div>

                    {/* Milestone Text (Year & Tagline) */}
                    <div
                      className="absolute whitespace-nowrap left-4 sm:left-6 top-1/2 -translate-y-1/2 text-left pl-0.5 sm:pl-1"
                    >
                      <span
                        className={`text-base sm:text-2xl lg:text-2xl font-display uppercase tracking-tight block transition-colors leading-none ${
                          isActive
                            ? "text-[#ed1438] scale-110 origin-left font-bold"
                            : isPast
                            ? "text-black font-semibold"
                            : "text-neutral-400 group-hover:text-black"
                        }`}
                      >
                        {milestone.year}
                      </span>
                      <span
                        className={`text-[9px] sm:text-[11px] font-mono tracking-[0.16em] uppercase hidden xl:block mt-0.5 transition-colors ${
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

        {/* Mobile / tablet: details of the selected year (tap a year or the disc) */}
        <div className="xl:hidden shrink-0 w-full px-2 text-center z-30" aria-live="polite">
          <p className="text-xs sm:text-sm font-mono text-[#ed1438] font-bold uppercase tracking-wider mb-1">
            {currentMilestone.year} · {currentMilestone.tagline}
          </p>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed px-2 max-w-md mx-auto">
            {currentMilestone.description}
          </p>
          <p className="mt-4 text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-400">
            Tap a year to explore
          </p>
        </div>

      </div>
    </div>
  );
}
