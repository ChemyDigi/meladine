"use client";

import React from "react";
import DriftWall, { DriftWallItem } from "./DriftWall";

interface DriftWallSectionProps {
  items?: DriftWallItem[];
}

const DEFAULT_DRIFT_ITEMS: DriftWallItem[] = [
  { image: "/images/about/661558127_956225036791095_755917439884307675_n.jpg", title: "Meladine Sound Lab", href: "#" },
  { image: "/images/about/660399686_957358356677763_1226881571608248548_n.jpg", title: "Analog Synthesis", href: "#" },
  { image: "/images/about/660284851_957370970009835_6256830940297256480_n.jpg", title: "Mastering Console", href: "#" },
  { image: "/images/about/659000626_957382760008656_2098156908236609135_n.jpg", title: "Studio Session", href: "#" },
  { image: "/images/about/658774865_956240096789589_5130895450585705500_n.jpg", title: "Acoustic Trial", href: "#" },
  { image: "/images/about/657346261_957363800010552_4140247321868341050_n.jpg", title: "Live Performance", href: "#" },
  { image: "/images/about/490127261_685425307204404_3560831706837257235_n.jpg", title: "Frequency Lab", href: "#" },
  { image: "/images/about/490126672_685424493871152_5248560093084004748_n.jpg", title: "Modular Rig", href: "#" },
  { image: "/images/about/484552410_665482035865398_2810937824235302766_n.jpg", title: "Sound Residency", href: "#" },
  { image: "/images/about/484471202_665481882532080_6676798231539888660_n.jpg", title: "Tape Echo Archive", href: "#" },
  { image: "/images/about/475139658_617750980627279_7745087480698847114_n.jpg", title: "Warehouse Session", href: "#" },
  { image: "/images/about/475065646_617750867293957_7214440984021338380_n.jpg", title: "Sub-Bass Array", href: "#" },
  { image: "/images/about/474906707_617751810627196_5133242727328882039_n.jpg", title: "Soundscape", href: "#" },
];

export default function DriftWallSection({ items = DEFAULT_DRIFT_ITEMS }: DriftWallSectionProps) {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-20 ">
          <div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-black">
              MOMENTS &amp; RESONANCE
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-wider max-w-xs">
            Interactive drifting gallery of live performances, acoustic trials, and laboratory experiments.
          </p>
        </div>
      </div>

      {/* DriftWall Interactive 3D Canvas */}
      <div className="w-full relative" style={{ height: 600 }}>
        <DriftWall
          items={items}
          columns={5}
          tileWidth={220}
          tileHeight={148}
          gap={18}
          tilt={10}
          turn={-8}
          perspective={1300}
          depth={100}
          speed={36}
          direction="up"
          variance={0.4}
          parallax={0.5}
          lift={50}
          fade={0.12}
          dim={0.92}
          overlayColor="#000000"
          radius={14}
          roll={0}
          pauseOnHover={false}
          grayscale={false}
        />

        {/* Soft subtle bottom blend into page background */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent z-10" />

        {/* Soft subtle top blend */}
        <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none bg-gradient-to-b from-white to-transparent z-10" />
      </div>
    </section>
  );
}
