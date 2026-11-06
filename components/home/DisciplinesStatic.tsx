"use client";

import React from "react";
import Image from "next/image";
import { CATEGORIES, type DisciplineCategory } from "./Disciplines3D";

/**
 * Image-based stand-in for the Disciplines3D WebGL stage, used on phones,
 * tablets and touch devices. The PNGs are renders of the same GLB models with
 * the same camera, lighting and pose as the 3D scene's "center" slot.
 */

const INSTRUMENTS: Record<DisciplineCategory, { src: string; label: string }> = {
  guitar: { src: "/images/3d/acoustic-guitar.png", label: "Acoustic guitar" },
  piano: { src: "/images/3d/keyboard.png", label: "Stage keyboard" },
  vocals: { src: "/images/3d/microphone.png", label: "Studio microphone" },
};

type Slot = "center" | "left" | "right";

// Mirrors the three slots of the 3D composition: the active instrument large in
// the middle, the other two small and washed out on either side.
const SLOT_STYLES: Record<Slot, React.CSSProperties> = {
  center: {
    left: "50%",
    top: "53%",
    width: "84%",
    height: "88%",
    opacity: 1,
    transform: "translate(-50%, -50%)",
    zIndex: 20,
  },
  left: {
    left: "14%",
    top: "54%",
    width: "32%",
    height: "40%",
    opacity: 0.28,
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  },
  right: {
    left: "86%",
    top: "54%",
    width: "32%",
    height: "40%",
    opacity: 0.28,
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  },
};

interface DisciplinesStaticProps {
  activeCategory: DisciplineCategory;
  onSelectCategory: (cat: DisciplineCategory) => void;
}

export default function DisciplinesStatic({
  activeCategory,
  onSelectCategory,
}: DisciplinesStaticProps) {
  const activeIdx = CATEGORIES.indexOf(activeCategory);

  const slotFor = (cat: DisciplineCategory): Slot => {
    const rel = (CATEGORIES.indexOf(cat) - activeIdx + 3) % 3;
    if (rel === 0) return "center";
    if (rel === 1) return "right";
    return "left";
  };

  return (
    <div className="relative w-full h-[340px] xs:h-[380px] sm:h-[420px] md:h-[480px] lg:h-[500px] select-none">
      {CATEGORIES.map((cat) => {
        const slot = slotFor(cat);
        const isActive = slot === "center";
        const instrument = INSTRUMENTS[cat];

        return (
          <button
            key={cat}
            type="button"
            disabled={isActive}
            onClick={() => onSelectCategory(cat)}
            aria-label={isActive ? instrument.label : `Show ${instrument.label.toLowerCase()}`}
            style={{
              ...SLOT_STYLES[slot],
              transition:
                "left 500ms cubic-bezier(0.16, 1, 0.3, 1), top 500ms cubic-bezier(0.16, 1, 0.3, 1), width 500ms cubic-bezier(0.16, 1, 0.3, 1), height 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out, transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`absolute flex items-center justify-center focus:outline-none ${
              isActive ? "cursor-default" : "cursor-pointer grayscale-[30%]"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={instrument.src}
                alt=""
                fill
                sizes="(max-width: 640px) 80vw, 560px"
                className="object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.14)]"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
