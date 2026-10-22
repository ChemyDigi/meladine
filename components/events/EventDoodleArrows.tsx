"use client";

import React from "react";

export function LeftDoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Hand-drawn curly loop curving down and to the right */}
      <path
        d="M 22 10 
           C 24 25, 18 42, 28 52 
           C 36 60, 48 58, 48 45 
           C 48 32, 32 30, 26 44 
           C 20 60, 35 78, 55 82 
           C 68 85, 85 80, 96 74"
        stroke="#262626"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrowhead pointing towards right/down */}
      <path
        d="M 82 66 
           L 98 74 
           L 90 89"
        stroke="#262626"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RightDoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Hand-drawn swooping loop from right to left pointing down-left */}
      <path
        d="M 112 18 
           C 95 10, 75 14, 62 26 
           C 50 38, 56 52, 68 50 
           C 78 48, 80 34, 68 28 
           C 54 22, 35 32, 24 48 
           C 18 56, 15 64, 12 70"
        stroke="#262626"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrowhead pointing down-left */}
      <path
        d="M 24 64 
           L 10 72 
           L 10 56"
        stroke="#262626"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
