"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import DoodleArrow from "@/components/home/DoodleArrow";

export interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
  year: string;
  location: string;
  desc: string;
}

export const ARCHIVE_ITEMS: GalleryItem[] = [
  {
    id: 1,
    image: "/images/About/661558127_956225036791095_755917439884307675_n.jpg",
    title: "Acoustic Stage Showcase",
    category: "Live Concert",
    year: "2024",
    location: "Main Auditorium",
    desc: "Resident guitarist performing intricate acoustic arrangements under stage lights.",
  },
  {
    id: 2,
    image: "/images/About/660399686_957358356677763_1226881571608248548_n.jpg",
    title: "Young Virtuosos Ensemble",
    category: "Masterclass",
    year: "2024",
    location: "Studio Hall A",
    desc: "Conservatory students performing duo acoustic pieces during the mid-year showcase.",
  },
  {
    id: 3,
    image: "/images/About/660284851_957370970009835_6256830940297256480_n.jpg",
    title: "Analog Synthesis & Keys",
    category: "Laboratory",
    year: "2023",
    location: "Synth Lab 02",
    desc: "Deep exploration of analog oscillator routing and keyboard improvisation.",
  },
  {
    id: 4,
    image: "/images/About/659000626_957382760008656_2098156908236609135_n.jpg",
    title: "Rooftop Jam Session",
    category: "Live Session",
    year: "2024",
    location: "Conservatory Terrace",
    desc: "Sunset acoustic session featuring ensemble rhythms under warm ambient lights.",
  },
  {
    id: 5,
    image: "/images/About/658774865_956240096789589_5130895450585705500_n.jpg",
    title: "Percussion & Rhythm Array",
    category: "Workshop",
    year: "2023",
    location: "Courtyard Stage",
    desc: "Collaborative rhythm workshop with students mastering polyrhythmic timing.",
  },
  {
    id: 6,
    image: "/images/About/657346261_957363800010552_4140247321868341050_n.jpg",
    title: "Violin Master Performance",
    category: "Stagecraft",
    year: "2024",
    location: "Grand Hall",
    desc: "Electrifying live violin performance blending classical rigor with modern stagecraft.",
  },
  {
    id: 7,
    image: "/images/About/490127261_685425307204404_3560831706837257235_n.jpg",
    title: "Youth Orchestra Academy",
    category: "Curriculum",
    year: "2023",
    location: "Practice Pavilion",
    desc: "Next-generation instrumentalists developing collective harmony and timing.",
  },
  {
    id: 8,
    image: "/images/About/490126672_685424493871152_5248560093084004748_n.jpg",
    title: "Vocal Mastery & Phrasing",
    category: "Mentorship",
    year: "2022",
    location: "Acoustic Room",
    desc: "Master mentor guiding dual-vocal phrasing, dynamic projection, and breath control.",
  },
  {
    id: 9,
    image: "/images/About/484552410_665482035865398_2810937824235302766_n.jpg",
    title: "Red Curtain Vocal Solos",
    category: "Performance",
    year: "2023",
    location: "Black Box Theater",
    desc: "Solo vocal performance under theatrical red drape lighting.",
  },
  {
    id: 10,
    image: "/images/About/484471202_665481882532080_6676798231539888660_n.jpg",
    title: "Classical Guitar Prodigy",
    category: "Conservatory",
    year: "2023",
    location: "Concert Stage",
    desc: "Young prodigy executing intricate classical fingerstyle repertoire.",
  },
  {
    id: 11,
    image: "/images/About/475139658_617750980627279_7745087480698847114_n.jpg",
    title: "Annual Conservatory Gala",
    category: "Celebration",
    year: "2024",
    location: "Gala Ballroom",
    desc: "Faculty and leadership celebrating 16 years of musical excellence.",
  },
  {
    id: 12,
    image: "/images/About/475065646_617750867293957_7214440984021338380_n.jpg",
    title: "15th Anniversary Awards",
    category: "Milestone",
    year: "2023",
    location: "Main Auditorium",
    desc: "Awarding milestone certifications to outstanding conservatory graduates.",
  },
  {
    id: 13,
    image: "/images/About/474906707_617751810627196_5133242727328882039_n.jpg",
    title: "Acoustic Band Residency",
    category: "Residency",
    year: "2024",
    location: "Open Stage",
    desc: "Outdoor acoustic concert testing natural reverberation dynamics.",
  },
];

export default function ResonanceGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"deck" | "grid">("deck");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Drag state for touch / mouse
  const dragStartX = useRef<number | null>(null);
  const dragDeltaX = useRef<number>(0);

  const categories = ["ALL", "LIVE CONCERT", "MASTERCLASS", "WORKSHOP", "PERFORMANCE", "LABORATORY"];

  const filteredItems = selectedFilter === "ALL"
    ? ARCHIVE_ITEMS
    : ARCHIVE_ITEMS.filter((item) =>
        item.category.toUpperCase().includes(selectedFilter) ||
        selectedFilter.includes(item.category.toUpperCase())
      );

  // Ensure activeIndex is in bounds
  const currentIdx = Math.min(activeIndex, filteredItems.length - 1);
  const activeItem = filteredItems[currentIdx] || ARCHIVE_ITEMS[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev <= 0 ? filteredItems.length - 1 : prev - 1));
  }, [filteredItems.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev >= filteredItems.length - 1 ? 0 : prev + 1));
  }, [filteredItems.length]);

  // Autoplay timer triggered by the Play Button
  useEffect(() => {
    if (!isAutoPlaying || lightboxIndex !== null) return;
    const interval = setInterval(() => {
      handleNext();
    }, 2400);
    return () => clearInterval(interval);
  }, [isAutoPlaying, lightboxIndex, handleNext]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => {
      const next = !prev;
      if (next) {
        handleNext();
      }
      return next;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) => (prev! <= 0 ? filteredItems.length - 1 : prev! - 1));
        } else if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => (prev! >= filteredItems.length - 1 ? 0 : prev! + 1));
        } else if (e.key === "Escape") {
          setLightboxIndex(null);
        }
      } else if (viewMode === "deck") {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, viewMode, filteredItems.length, handlePrev, handleNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Mouse / Touch drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    dragDeltaX.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    dragDeltaX.current = e.clientX - dragStartX.current;
  };

  const handleMouseUp = () => {
    if (dragStartX.current !== null) {
      if (dragDeltaX.current > 60) handlePrev();
      if (dragDeltaX.current < -60) handleNext();
    }
    dragStartX.current = null;
    dragDeltaX.current = 0;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    dragDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    dragDeltaX.current = e.touches[0].clientX - dragStartX.current;
  };

  const handleTouchEnd = () => {
    if (dragStartX.current !== null) {
      if (dragDeltaX.current > 50) handlePrev();
      if (dragDeltaX.current < -50) handleNext();
    }
    dragStartX.current = null;
    dragDeltaX.current = 0;
  };

  // Filmstrip Scrubber drag-to-scroll logic
  const scrubberRef = useRef<HTMLDivElement>(null);
  const isScrubberDown = useRef(false);
  const scrubberStartX = useRef(0);
  const scrubberScrollLeft = useRef(0);
  const hasScrubberMoved = useRef(false);

  const handleScrubberMouseDown = (e: React.MouseEvent) => {
    if (!scrubberRef.current) return;
    isScrubberDown.current = true;
    hasScrubberMoved.current = false;
    scrubberStartX.current = e.pageX - scrubberRef.current.offsetLeft;
    scrubberScrollLeft.current = scrubberRef.current.scrollLeft;
  };

  const handleScrubberMouseMove = (e: React.MouseEvent) => {
    if (!isScrubberDown.current || !scrubberRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrubberRef.current.offsetLeft;
    const walk = (x - scrubberStartX.current) * 1.6;
    if (Math.abs(walk) > 4) {
      hasScrubberMoved.current = true;
    }
    scrubberRef.current.scrollLeft = scrubberScrollLeft.current - walk;
  };

  const handleScrubberMouseUpOrLeave = () => {
    isScrubberDown.current = false;
  };

  // Keep active thumbnail centered in the scrubber as slides change
  useEffect(() => {
    if (!scrubberRef.current || isScrubberDown.current) return;
    const wrapper = scrubberRef.current.children[0] as HTMLElement | undefined;
    const activeThumb = wrapper?.children[currentIdx] as HTMLElement | undefined;
    if (activeThumb) {
      const containerWidth = scrubberRef.current.offsetWidth;
      const elOffset = activeThumb.offsetLeft;
      const elWidth = activeThumb.offsetWidth;
      scrubberRef.current.scrollTo({
        left: elOffset - containerWidth / 2 + elWidth / 2,
        behavior: "smooth",
      });
    }
  }, [currentIdx]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 select-none">


      {/* ============================================================ */}
      {/* MODE 1: FOCUS DECK VIEW (3D Interactive Stage)               */}
      {/* ============================================================ */}
      {viewMode === "deck" && (
        <div
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Stage Container with Perspective Depth */}
          <div
            className="relative w-full h-[360px] sm:h-[470px] md:h-[540px] lg:h-[650px] pt-4 sm:pt-10 flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Flanking Card (Previous item teaser) */}
            {filteredItems.length > 1 && (
              <div
                onClick={handlePrev}
                className="hidden md:block absolute left-4 lg:left-12 xl:left-16 top-1/2 -translate-y-1/2 w-[280px] lg:w-[350px] aspect-[16/10] rounded-2xl overflow-hidden opacity-30 hover:opacity-75 transition-all duration-500 cursor-pointer z-10 scale-85 hover:scale-90 drop-shadow-lg [transform:perspective(1200px)_rotateY(16deg)] pointer-events-auto"
                title="Click to view previous"
              >
                <Image
                  src={filteredItems[(currentIdx - 1 + filteredItems.length) % filteredItems.length].image}
                  alt=""
                  fill
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-transparent pointer-events-none" />
              </div>
            )}

            {/* Right Flanking Card (Next item teaser) */}
            {filteredItems.length > 1 && (
              <div
                onClick={handleNext}
                className="hidden md:block absolute right-4 lg:right-12 xl:right-16 top-1/2 -translate-y-1/2 w-[280px] lg:w-[350px] aspect-[16/10] rounded-2xl overflow-hidden opacity-30 hover:opacity-75 transition-all duration-500 cursor-pointer z-10 scale-85 hover:scale-90 drop-shadow-lg [transform:perspective(1200px)_rotateY(-16deg)] pointer-events-auto"
                title="Click to view next"
              >
                <Image
                  src={filteredItems[(currentIdx + 1) % filteredItems.length].image}
                  alt=""
                  fill
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-white/70 to-transparent pointer-events-none" />
              </div>
            )}

            {/* Center Active Showcase Frame */}
            <div className="relative w-[92%] sm:w-[84%] md:w-[68%] lg:w-[60%] max-w-[800px] aspect-[16/10] z-20">
              {/* Active Image Card */}
              <div
                onClick={() => setLightboxIndex(currentIdx)}
                className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-all duration-500 ring-1 ring-black/5 group cursor-pointer"
              >
                <Image
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 92vw, (max-width: 1200px) 70vw, 820px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Bottom Caption */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 md:p-7 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10 flex flex-col justify-end">
                  <div className="flex items-end justify-between gap-4">
                    <div className="max-w-md">
                      <h3 className="font-display uppercase tracking-tight text-2xl sm:text-4xl text-white leading-tight drop-shadow-sm">
                        {activeItem.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-neutral-300 font-light line-clamp-2 leading-relaxed">
                        {activeItem.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hand-Drawn Annotation: Positioned right next to the gallery in the open white space */}
            <div className="absolute bottom-0 right-0 sm:right-2 md:bottom-auto md:top-4 md:right-2 lg:top-1/2 lg:-translate-y-1/2 lg:-right-10 xl:-right-24 2xl:-right-32 z-30 flex items-center pointer-events-auto select-none scale-[0.7] sm:scale-85 md:scale-90 lg:scale-100 origin-bottom-right md:origin-top-right lg:origin-right transition-all duration-300">
              <span className="w-14 sm:w-16 md:w-20 lg:w-24 rotate-[-4deg] shrink-0 block -mr-1 sm:-mr-2">
                <DoodleArrow className="w-full h-auto drop-shadow-xs" />
              </span>
              <span className="flex flex-col items-start rotate-1 ml-1 sm:ml-2 text-left">
                <span className="font-handwriting text-2xl sm:text-3xl text-neutral-950 font-bold tracking-wide drop-shadow-xs whitespace-nowrap leading-tight block">
                  ♫ live moments
                </span>
                <span className="-mt-0.5 font-handwriting text-base sm:text-lg text-[#ed1438] font-bold tracking-wide drop-shadow-xs whitespace-nowrap leading-tight block">
                  click to scroll gallery
                </span>

                {/* Red Circle Play Button with White Play Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAutoPlay();
                  }}
                  aria-label="Play and scroll gallery images"
                  title="Play and scroll gallery images"
                  className="pointer-events-auto mt-1 flex items-center gap-2 group cursor-pointer focus:outline-none"
                >
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ed1438] flex items-center justify-center text-white shadow-md shadow-[#ed1438]/30 transition-all duration-200 group-hover:scale-110 group-hover:bg-[#d60f30] group-active:scale-95 ${
                      isAutoPlaying ? "animate-pulse ring-4 ring-[#ed1438]/20" : ""
                    }`}
                  >
                    {isAutoPlaying ? (
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <polygon points="6 4 20 12 6 20 6 4" />
                      </svg>
                    )}
                  </span>
                  <span className="font-handwriting text-base sm:text-lg text-neutral-800 font-bold -rotate-1 group-hover:text-[#ed1438] transition-colors whitespace-nowrap select-none">
                    {isAutoPlaying ? "scrolling..." : "play gallery"}
                  </span>
                </button>
              </span>
            </div>
          </div>



          {/* ============================================================ */}
          {/* Analog Filmstrip Scrubber Track (Drag to scroll, no scrollbar) */}
          {/* ============================================================ */}
          <div
            ref={scrubberRef}
            onMouseDown={handleScrubberMouseDown}
            onMouseMove={handleScrubberMouseMove}
            onMouseUp={handleScrubberMouseUpOrLeave}
            onMouseLeave={handleScrubberMouseUpOrLeave}
            className="mt-6 sm:mt-8 pt-2 sm:pt-4 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex items-center gap-2.5 sm:gap-3 pb-2 min-w-max">
              {filteredItems.map((item, idx) => {
                const isActive = idx === currentIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (!hasScrubberMoved.current) {
                        setActiveIndex(idx);
                      }
                    }}
                    className={`relative group w-20 sm:w-28 md:w-32 aspect-[16/10] rounded-lg overflow-hidden transition-all duration-300 cursor-pointer shrink-0 ${
                      isActive
                        ? "ring-2 ring-[#ed1438] ring-offset-2 scale-105 opacity-100 shadow-md"
                        : "opacity-45 hover:opacity-85 hover:scale-100"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="130px"
                      draggable={false}
                      className="object-cover object-center pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                    {/* Frame Index Stamp */}
                    <span className="absolute bottom-1 right-1 text-[9px] font-mono text-white bg-black/60 px-1 py-0.5 rounded leading-none">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODE 2: CONTACT SHEET GRID VIEW                              */}
      {/* ============================================================ */}
      {viewMode === "grid" && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-100 aspect-[4/3] border border-neutral-100 hover:border-neutral-300 transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Red Corner Architectural Bracket Accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#ed1438] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#ed1438] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" />

              {/* Hover Dark Overlay with Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#ed1438] tracking-widest uppercase bg-black/60 px-2 py-0.5 rounded-full">
                    {"0"}{item.id}
                  </span>
                  <span className="text-[10px] font-mono text-white/80 uppercase">
                    {item.year}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-neutral-300 uppercase block">
                    {item.category}
                  </span>
                  <h4 className="font-display uppercase text-white text-xl leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================ */}
      {/* FULL-SCREEN DARKROOM LIGHTBOX MODAL                          */}
      {/* ============================================================ */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Controls */}
          <div
            className="flex items-center justify-between w-full z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ed1438]" />
              <span className="text-xs font-mono tracking-widest uppercase text-white font-bold">
                MELADINE ARCHIVE // {String(lightboxIndex + 1).padStart(2, "0")} OF {String(filteredItems.length).padStart(2, "0")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Close</span>
              <span className="text-sm font-sans">&times;</span>
            </button>
          </div>

          {/* Lightbox Center Image Stage */}
          <div
            className="relative flex-1 w-full max-w-5xl mx-auto my-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
              <Image
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                fill
                priority
                className="object-contain object-center"
              />
            </div>

            {/* Previous Photo Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev! <= 0 ? filteredItems.length - 1 : prev! - 1));
              }}
              className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#ed1438] text-white transition-colors cursor-pointer"
              title="Previous image (Left Arrow)"
            >
              &larr;
            </button>

            {/* Next Photo Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev! >= filteredItems.length - 1 ? 0 : prev! + 1));
              }}
              className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#ed1438] text-white transition-colors cursor-pointer"
              title="Next image (Right Arrow)"
            >
              &rarr;
            </button>
          </div>

          {/* Lightbox Bottom Caption */}
          <div
            className="max-w-2xl mx-auto text-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#ed1438] font-bold block mb-1">
              {filteredItems[lightboxIndex].category} • {filteredItems[lightboxIndex].location} ({filteredItems[lightboxIndex].year})
            </span>
            <h3 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-white leading-tight">
              {filteredItems[lightboxIndex].title}
            </h3>
            <p className="mt-1 text-xs text-neutral-400 max-w-md mx-auto">
              {filteredItems[lightboxIndex].desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
