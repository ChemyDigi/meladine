"use client";

import React from "react";
import Image from "next/image";

interface NotationItem {
  id: number;
  src: string;
  top: string;
  left?: string;
  right?: string;
  sizeClass: string;
  width: number;
  height: number;
  rotation: string;
  delay: string;
  duration: string;
  opacity: string;
}

const NOTATIONS: NotationItem[] = [
  // 1. Near Mentors Header (Top-Left)
  {
    id: 1,
    src: "/images/About/Notation1.png",
    top: "2.5%",
    left: "4%",
    sizeClass: "w-10 sm:w-13 md:w-16",
    width: 120,
    height: 160,
    rotation: "-rotate-[14deg]",
    delay: "0s",
    duration: "2.8s",
    opacity: "opacity-100",
  },
  // 4. Beside Saliya description & guitar metrics (Upper Right)
  {
    id: 4,
    src: "/images/About/Notation1.png",
    top: "23%",
    right: "4%",
    sizeClass: "w-16 sm:w-22 md:w-28 lg:w-32",
    width: 220,
    height: 293,
    rotation: "-rotate-[22deg]",
    delay: "-0.6s",
    duration: "2.7s",
    opacity: "opacity-100",
  },
  // 5. Middle Section Left (Keyboard discipline area)
  {
    id: 5,
    src: "/images/About/Notation1.png",
    top: "37%",
    left: "5%",
    sizeClass: "w-10 sm:w-13 md:w-16",
    width: 120,
    height: 160,
    rotation: "rotate-[20deg]",
    delay: "-1.7s",
    duration: "3.1s",
    opacity: "opacity-100",
  },
  // 6. Middle Section Right
  {
    id: 6,
    src: "/images/About/Notation2.png",
    top: "48%",
    right: "6%",
    sizeClass: "w-9 sm:w-12 md:w-14",
    width: 100,
    height: 140,
    rotation: "-rotate-[15deg]",
    delay: "-0.9s",
    duration: "2.9s",
    opacity: "opacity-100",
  },
  // 8. Lower Section Right
  {
    id: 8,
    src: "/images/About/Notation1.png",
    top: "72%",
    right: "4%",
    sizeClass: "w-9 sm:w-12 md:w-15",
    width: 110,
    height: 146,
    rotation: "-rotate-[12deg]",
    delay: "-1.4s",
    duration: "2.8s",
    opacity: "opacity-100",
  },
  // 9. Above CTA Banner (Left Flank)
  {
    id: 9,
    src: "/images/About/Notation1.png",
    top: "84%",
    left: "4%",
    sizeClass: "w-10 sm:w-13 md:w-16",
    width: 120,
    height: 160,
    rotation: "-rotate-[16deg]",
    delay: "-0.4s",
    duration: "3.0s",
    opacity: "opacity-100",
  },
  // 10. Below CTA Banner (Right Flank)
  {
    id: 10,
    src: "/images/About/Notation2.png",
    top: "93%",
    right: "5%",
    sizeClass: "w-11 sm:w-14 md:w-17",
    width: 120,
    height: 168,
    rotation: "rotate-[14deg]",
    delay: "-1.9s",
    duration: "3.4s",
    opacity: "opacity-100",
  },
];

export default function FloatingNotations() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden"
    >
      {NOTATIONS.map((item) => (
        <div
          key={item.id}
          className="absolute"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
          }}
        >
          <div className={`${item.rotation} ${item.opacity} transition-opacity duration-500`}>
            <div
              style={{
                animation: `notationFloat ${item.duration} ease-in-out infinite`,
                animationDelay: item.delay,
              }}
              className="will-change-transform"
            >
              <div className={item.sizeClass}>
                <Image
                  src={item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                  className="w-full h-auto object-contain drop-shadow-xs"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
