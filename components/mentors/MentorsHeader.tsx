"use client";

import React, { useState, useEffect } from "react";

const LETTERS = ["M", "E", "N", "T", "O", "R", "S"];

// Slight rotational tilts for initial entrance pop-up
const ROTATIONS = [-3, 2.5, -2, 3, -2.5, 2, -3];

export default function MentorsHeader() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Trigger initial staggered pop-up on mount
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-8 sm:pb-12 text-center flex flex-col items-center">
      {/* Giant "MENTORS" Title with Signature Red 'M' & Entrance Pop-up */}
      <h1 className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[13rem] xl:text-[15rem] font-display uppercase tracking-tight text-black leading-[0.85] select-none text-center cursor-default whitespace-nowrap pt-4 sm:pt-6 pb-2 sm:pb-4 pointer-events-none">
        {LETTERS.map((letter, i) => {
          const isM = i === 0;

          let transformStyle = "";
          let colorClass = isM ? "text-[#ed1438]" : "text-black";
          let filterStyle = isM ? "drop-shadow(0 16px 20px rgba(237, 20, 56, 0.26))" : "";

          if (isM) {
            // 'M' stays permanently popped up, tilted, and red
            if (revealed) {
              transformStyle = "translateY(-20px) scale(1.12) rotate(-3deg)";
            } else {
              transformStyle = "translateY(70px) scale(0.65) rotate(-6deg)";
            }
          } else {
            // Other letters (E, N, T, O, R, S)
            if (revealed) {
              transformStyle = "translateY(0) scale(1) rotate(0deg)";
            } else {
              transformStyle = `translateY(70px) scale(0.65) rotate(${ROTATIONS[i] * 2}deg)`;
            }
          }

          return (
            <span
              key={i}
              style={{
                transform: transformStyle,
                filter: filterStyle || undefined,
                transitionDelay: `${i * 60}ms`,
              }}
              className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${colorClass} ${
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
