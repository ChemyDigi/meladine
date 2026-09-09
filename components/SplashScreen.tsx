"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // Lock Lenis smooth scroll and body overflow during splashscreen
  useEffect(() => {
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";

    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, []);

  // Animate progress smoothly from 0 to 100
  useEffect(() => {
    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds loading sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Start curtain lift transition
        setTimeout(() => {
          triggerExit();
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // Handle keyboard (Esc) to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerExit = () => {
    setIsExiting(true);
    // Unfreeze scroll right as curtain starts lifting
    setTimeout(() => {
      window.__lenis?.start();
      document.body.style.overflow = "";
    }, 400);

    // Remove from DOM once curtains have cleared
    setTimeout(() => {
      setIsRemoved(true);
      onComplete?.();
    }, 1100);
  };

  if (isRemoved) return null;

  const columnCount = 8;
  const columns = Array.from({ length: columnCount });

  return (
    <aside
      id="site-splash-screen"
      aria-label="Loading Meladine Academy"
      className={`fixed inset-0 z-[9999] overflow-hidden select-none pointer-events-auto ${
        isExiting ? "pointer-events-none" : ""
      }`}
    >
      {/* 
        ARCHITECTURAL CURTAIN PANELS (WHITE THEME)
        When exiting, each column slides upward in a staggered wave
      */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none z-10">
        {columns.map((_, index) => {
          // Stagger from middle outwards for unique cinematic reveal
          const distFromCenter = Math.abs(index - (columnCount - 1) / 2);
          const delayMs = isExiting ? Math.round(distFromCenter * 65) : 0;

          return (
            <div
              key={index}
              className="flex-1 h-full bg-white will-change-transform"
              style={{
                transform: isExiting ? "translateY(-101%)" : "translateY(0%)",
                transition: "transform 800ms cubic-bezier(0.76, 0, 0.24, 1)",
                transitionDelay: `${delayMs}ms`,
              }}
            />
          );
        })}
      </div>

      {/* 
        SPLASH CONTENT CONTAINER
        Fades out smoothly right before the curtain panels lift away
      */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 sm:p-12 transition-all duration-500 ease-out ${
          isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {/* Center Stage: Logo & Typography */}
        <div className="flex flex-col items-center justify-center text-center relative">
          
          {/* Logo with Natural Crisp Black Silhouette */}
          <div className="relative mb-2">
            <div className="relative w-18 sm:w-22 md:w-26 h-24 sm:h-30 md:h-36 flex items-center justify-center">
              <Image
                src="/images/LOGO.png"
                alt="Meladine Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Minimal Red Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-4">
            <span className="w-2 h-2 rounded-full bg-[#ed1438] animate-pulse [animation-duration:1.2s]" />
            <span className="w-2 h-2 rounded-full bg-[#ed1438] animate-pulse [animation-duration:1.2s] [animation-delay:200ms]" />
            <span className="w-2 h-2 rounded-full bg-[#ed1438] animate-pulse [animation-duration:1.2s] [animation-delay:400ms]" />
          </div>
        </div>

        {/* Bottom Bar: Loading Meter */}
        <div className="absolute bottom-8 sm:bottom-12 w-full max-w-md px-6 flex flex-col items-center">
          {/* Sleek hairline progress bar */}
          <div className="w-full h-0.5 bg-neutral-200 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[#ed1438] transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_rgba(237,20,56,0.4)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
