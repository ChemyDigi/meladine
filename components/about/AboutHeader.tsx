"use client";

import React, { useState, useEffect, useRef } from "react";

const WORD_1 = ["A", "B", "O", "U", "T"];
const WORD_2 = ["M", "E", "L", "A", "D", "I", "N", "E"];

// Subtle rotational tilts for staggered pop-up effect
const ROTATIONS_1 = [-2, 2.5, -3, 2, -2];
const ROTATIONS_2 = [-3, 2, -2.5, 3, -2, 2.5, -2, 3];

// Narrative text for the scroll reveal
const PARAGRAPH_TEXT =
  "Meladine is an independent underground sound laboratory and creative collective uniting music producers, acoustic scientists, and visual innovators. Founded on the conviction that electronic music should be experienced as physical acoustic pressure rather than digital quantization, we craft borderless sonic frequencies that communicate directly through living harmonics, analogue imperfections, and raw voltage.";

const WORDS = PARAGRAPH_TEXT.split(" ");

export default function AboutHeader() {
  const [revealed, setRevealed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  // Scroll reveal calculation:
  // Since this paragraph is near the top of the page, we map scroll from 0 to 450px of page scroll
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      
      // Starts illuminating immediately as user scrolls (0px to 400px of scroll)
      const maxScroll = 380;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    if (window.__lenis) {
      window.__lenis.on("scroll", updateScrollProgress);
    }
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      if (window.__lenis) {
        window.__lenis.off("scroll", updateScrollProgress);
      }
    };
  }, []);

  return (
    <div className="pb-4 sm:pb-8 text-center flex flex-col items-center">

      {/* Giant "ABOUT MELADINE" with signature popped-up letters & staggered entrance */}
      <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-display uppercase tracking-tight text-black leading-[0.88] select-none text-center cursor-default pt-2 sm:pt-4 pb-4 sm:pb-8 flex flex-wrap justify-center gap-x-4 sm:gap-x-8">

        {/* Word: ABOUT */}
        <span className="inline-flex">
          {WORD_1.map((letter, i) => {
            let transformStyle = "";
            let colorClass = "text-black";

            if (revealed) {
              transformStyle = "translateY(0) scale(1) rotate(0deg)";
            } else {
              transformStyle = `translateY(70px) scale(0.65) rotate(${ROTATIONS_1[i] * 2}deg)`;
            }

            return (
              <span
                key={`about-${i}`}
                style={{
                  transform: transformStyle,
                  transitionDelay: `${i * 50}ms`,
                }}
                className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${colorClass} ${
                  revealed ? "opacity-100" : "opacity-0"
                }`}
              >
                {letter}
              </span>
            );
          })}
        </span>

        {/* Word: MELADINE (with Signature Red Popped-up 'M') */}
        <span className="inline-flex">
          {WORD_2.map((letter, i) => {
            const isM = i === 0;
            let transformStyle = "";
            let colorClass = isM ? "text-[#ed1438]" : "text-black";
            let filterStyle = isM ? "drop-shadow(0 16px 20px rgba(237, 20, 56, 0.26))" : "";

            if (isM) {
              // 'M' stays permanently popped up, tilted, and red
              if (revealed) {
                transformStyle = "translateY(-16px) scale(1.12) rotate(-3deg)";
              } else {
                transformStyle = "translateY(70px) scale(0.65) rotate(-6deg)";
              }
            } else {
              if (revealed) {
                transformStyle = "translateY(0) scale(1) rotate(0deg)";
              } else {
                transformStyle = `translateY(70px) scale(0.65) rotate(${ROTATIONS_2[i] * 2}deg)`;
              }
            }

            return (
              <span
                key={`meladine-${i}`}
                style={{
                  transform: transformStyle,
                  filter: filterStyle || undefined,
                  transitionDelay: `${(WORD_1.length + i) * 50}ms`,
                }}
                className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${colorClass} ${
                  revealed ? "opacity-100" : "opacity-0"
                }`}
              >
                {letter}
              </span>
            );
          })}
        </span>

      </h1>

      {/* Subtitle with Original Perfect Sizing & Interactive Scroll-Reveal Text Effect */}
      <p
        ref={paragraphRef}
        className={`mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light max-w-4xl leading-relaxed mx-auto transition-all duration-800 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {WORDS.map((word, index) => {
          // Calculate when each word should highlight based on scroll progress
          const wordThreshold = index / WORDS.length;
          const isHighlighted = scrollProgress >= wordThreshold;

          return (
            <span
              key={index}
              className={`inline-block transition-colors duration-200 mr-[0.28em] ${
                isHighlighted
                  ? "text-black"
                  : "text-neutral-300"
              }`}
            >
              {word}
            </span>
          );
        })}
      </p>

    </div>
  );
}
