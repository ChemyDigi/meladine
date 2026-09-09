import React from "react";

export default function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 450 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
    >
      {/* Hand-drawn Loopy Arrow Body */}
      <path
        d="M 45 65 
           C 70 30, 115 35, 125 75 
           C 135 125, 110 200, 135 235 
           C 160 270, 215 270, 245 225 
           C 275 180, 280 120, 240 110 
           C 200 100, 190 170, 220 220 
           C 255 275, 315 275, 365 260"
        stroke="#111111"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Secondary Organic Stroke for hand-drawn ink texture */}
      <path
        d="M 47 67 
           C 72 32, 113 37, 123 77 
           C 133 127, 112 198, 137 233 
           C 162 268, 213 268, 243 223 
           C 273 178, 278 122, 242 112 
           C 202 102, 192 168, 222 218 
           C 257 273, 317 273, 365 260"
        stroke="#111111"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />

      {/* Sketched / Hatched Arrowhead */}
      <g>
        {/* Arrowhead Outline */}
        <path
          d="M 355 215 
             L 425 255 
             L 348 295 
             Q 368 255 355 215 Z"
          stroke="#111111"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="white"
        />

        {/* Hand-drawn Hatching Lines inside Arrowhead */}
        <path
          d="M 365 230 L 362 275
             M 378 238 L 375 270
             M 390 244 L 388 266
             M 402 250 L 401 260"
          stroke="#111111"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
