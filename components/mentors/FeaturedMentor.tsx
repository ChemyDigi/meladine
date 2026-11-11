"use client";

import React from "react";
import Image from "next/image";
import DoodleArrow from "@/components/home/DoodleArrow";
import { useCompactLayout } from "@/lib/useMediaQuery";

/* ------------------------------------------------------------------ */
/* Mentor content (shared by the desktop composition and the stacked   */
/* phone / tablet layout)                                              */
/* ------------------------------------------------------------------ */

type MentorId = "mentor1" | "mentor2" | "mentor3";

interface Metric {
  value: string;
  label: string;
  small?: boolean;
}

interface Mentor {
  id: MentorId;
  anchor: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  sketch: string;
  sketchAspect: string;
  paragraphs: React.ReactNode[];
  metrics: Metric[];
  /** Which side the portrait sits on from the `sm` breakpoint up. */
  align: "left" | "right";
}

const MENTORS: Mentor[] = [
  {
    id: "mentor1",
    anchor: "mentor-block-1",
    name: "meet Saliya Illangasinghe",
    role: "Guitar specialist",
    image: "/images/Mentors/Saliya.png",
    imageAlt: "Meladine Artist Saliya Illangasinghe",
    sketch: "/images/Mentors/AcousticGuitar.png",
    sketchAspect: "aspect-[2/3]",
    paragraphs: [
      <React.Fragment key="saliya-1">
        A professional guitarist, music producer, music director, and educator with extensive experience in Sri Lanka&apos;s music industry. Co-Founder and former guitarist of &quot;WINGS&quot;, a Sumathi Awards-nominated music director and Raigam Tele&apos;es nominated best teledrama singer, <strong className="font-semibold text-neutral-950">Saliya</strong> founded Meladine Music Conservatory in 2007 with a vision to inspire the next generation of musicians.
      </React.Fragment>,
      <React.Fragment key="saliya-2">
        Combining professional stage experience with practical music education, he is dedicated to developing confident, creative, and skilled musicians through a passion-driven approach to teaching.
      </React.Fragment>,
    ],
    metrics: [
      { value: "19+", label: "Years Teaching" },
      { value: "Guitar / Music Theory · Music Production", label: "Specializations", small: true },
    ],
    align: "left",
  },
  {
    id: "mentor2",
    anchor: "next-mentor",
    name: "meet Dileepa Liyanage",
    role: "Vocal & keyboard instructor",
    image: "/images/Mentors/Dileepa.png",
    imageAlt: "Meladine Artist Dileepa Liyanage",
    sketch: "/images/Mentors/Keyboard.png",
    sketchAspect: "aspect-[1122/1402]",
    paragraphs: [
      <React.Fragment key="dileepa-1">
        A Music Director, Vocalist, Keyboardist, and Music Producer. He serves as the Music Director of <strong className="font-semibold text-neutral-950">SIMPSON&apos;S</strong>, actively involved in live performance, vocal coaching, music production, and artist development.
      </React.Fragment>,
      <React.Fragment key="dileepa-2">
        He has performed with several international bands and gained professional performance experience in Qatar, while continuing to create original music and contemporary musical projects.
      </React.Fragment>,
    ],
    metrics: [
      { value: "12+", label: "Years Teaching" },
      { value: "Vocal & Keyboard · Music Production", label: "Specializations", small: true },
    ],
    align: "right",
  },
  {
    id: "mentor3",
    anchor: "mentor-block-3",
    name: "meet Tharindu Perera",
    role: "Vocal & guitar instructor",
    image: "/images/Mentors/tharindu-vocal.png",
    imageAlt: "Meladine Artist Tharindu Perera",
    sketch: "/images/Mentors/Microphone.png",
    sketchAspect: "aspect-[1122/1402]",
    paragraphs: [
      <React.Fragment key="tharindu-1">
        A Music Producer, Vocalist, Lyricist, and Educator with 5 years of experience in music education. He graduated from the University of Visual and Performing Arts, holds a Visharadha in North Indian Vocal and North Indian Violin, and is the Founder of <strong className="font-semibold text-neutral-950">SoulFrame Studios</strong>.
      </React.Fragment>,
      <React.Fragment key="tharindu-2">
        Teaching guitar, vocals, and the local school syllabus, he helps students learn proper theory and break the frame with creativity and confidence.
      </React.Fragment>,
    ],
    metrics: [
      { value: "5+", label: "Years Teaching" },
      { value: "Guitar · Vocal · Local School Syllabus", label: "Specializations", small: true },
    ],
    align: "left",
  },
];

type Visibility = Record<MentorId, boolean>;

const ENTER = "opacity-100 translate-y-0 scale-100";
const HIDDEN = "opacity-0 translate-y-10 scale-[0.95]";
const EASE = "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]";

/* ------------------------------------------------------------------ */
/* Stacked layout for phones and tablets (below 1280px)                */
/* ------------------------------------------------------------------ */

function CompactShowcase({ visible }: { visible: Visibility }) {
  return (
    <section className="relative w-full pt-6 sm:pt-10 pb-10 sm:pb-14 px-6 sm:px-10 overflow-hidden">
      {/* Background Architectural Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <div className="curtain-grid-columns h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-neutral-100 h-full" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-16 sm:gap-24 md:gap-28">
        {MENTORS.map((mentor) => {
          const isRight = mentor.align === "right";
          const shown = visible[mentor.id];

          return (
            <article
              key={mentor.id}
              id={mentor.anchor}
              data-mentor={mentor.id}
              className="relative"
            >
              {/* Blueprint instrument sketch behind the block */}
              <div
                className={`absolute -top-8 ${
                  isRight ? "-left-20 sm:-left-28" : "-right-20 sm:-right-28"
                } w-[240px] sm:w-[320px] md:w-[400px] ${mentor.sketchAspect} opacity-[0.08] pointer-events-none select-none z-0 ${
                  isRight ? "-rotate-6" : "rotate-12"
                }`}
                aria-hidden="true"
              >
                <Image src={mentor.sketch} alt="" fill sizes="400px" className="object-contain" />
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-center">
                {/* Portrait / chair */}
                <div
                  className={`sm:col-span-5 flex ${
                    isRight ? "sm:order-2 justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`relative w-[250px] xs:w-[290px] sm:w-full max-w-[400px] aspect-[1122/1402] drop-shadow-2xl ${EASE} ${
                      shown ? ENTER : HIDDEN
                    }`}
                  >
                    <Image
                      src={mentor.image}
                      alt={mentor.imageAlt}
                      fill
                      sizes="(max-width: 640px) 290px, 400px"
                      className={`object-contain pointer-events-none ${
                        isRight ? "object-right" : "object-left"
                      }`}
                    />
                  </div>
                </div>

                {/* Annotation, story and metrics */}
                <div
                  className={`sm:col-span-7 flex flex-col items-start ${
                    isRight ? "sm:order-1 sm:items-end sm:text-right" : ""
                  }`}
                >
                  <div
                    className={`flex items-end gap-2 sm:gap-3 select-none ${
                      isRight ? "sm:flex-row-reverse" : "flex-row-reverse sm:flex-row"
                    } ${EASE} ${shown ? ENTER : HIDDEN}`}
                  >
                    <div
                      className={`w-12 sm:w-16 md:w-20 shrink-0 ${
                        isRight
                          ? "-rotate-[100deg] sm:rotate-[8deg]"
                          : "-rotate-[80deg] sm:rotate-[190deg]"
                      }`}
                    >
                      <DoodleArrow className="w-full h-auto drop-shadow-sm" />
                    </div>
                    <div className={`flex flex-col ${isRight ? "sm:items-end" : ""}`}>
                      <span className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-neutral-950 font-bold -rotate-2 tracking-wide leading-tight drop-shadow-xs">
                        {mentor.name}
                      </span>
                      <span className="-mt-0.5 sm:-mt-1 font-handwriting text-lg sm:text-2xl md:text-3xl text-[#ed1438] font-bold -rotate-1 tracking-wide leading-tight drop-shadow-xs">
                        {mentor.role}
                      </span>
                    </div>
                  </div>

                  <div className={`mt-4 sm:mt-5 max-w-xl ${EASE} delay-150 ${shown ? ENTER : HIDDEN}`}>
                    {mentor.paragraphs.map((text, i) => (
                      <p
                        key={i}
                        className={`text-sm md:text-base font-light leading-relaxed ${
                          i === 0 ? "text-neutral-700" : "mt-2.5 text-neutral-600"
                        }`}
                      >
                        {text}
                      </p>
                    ))}
                  </div>

                  <div className={`mt-6 ${EASE} delay-300 ${shown ? ENTER : HIDDEN}`}>
                    <div className={`flex items-center gap-6 sm:gap-10 ${isRight ? "sm:justify-end" : ""}`}>
                      {mentor.metrics.map((metric, i) => (
                        <React.Fragment key={metric.label}>
                          {i > 0 && <div className="w-px h-10 bg-neutral-200 shrink-0" />}
                          <div
                            className={`flex flex-col group cursor-default ${
                              isRight ? "sm:items-end sm:text-right" : ""
                            }`}
                          >
                            <div
                              className={
                                metric.small
                                  ? "text-sm sm:text-base font-bold font-sans text-[#ed1438] leading-tight"
                                  : "text-3xl sm:text-4xl font-display font-bold text-[#ed1438] leading-none"
                              }
                            >
                              {metric.value}
                            </div>
                            <div className="text-xs sm:text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">
                              {metric.label}
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop composition (1280px and up): free-form, overlapping layout  */
/* ------------------------------------------------------------------ */

function DesktopShowcase({
  visible,
  onNextMentor,
}: {
  visible: Visibility;
  onNextMentor: () => void;
}) {
  return (
    <section className="relative w-full min-h-[2260px] 2xl:min-h-[2480px] pt-16 pb-10 flex flex-col items-start justify-start overflow-hidden">
      {/* Background Architectural Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <div className="curtain-grid-columns h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-neutral-100 h-full" />
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1st Mentor Showcase (Top Left) - FULL SIZE Saliya Section    */}
      {/* ============================================================ */}
      <div className="relative z-20 w-full pl-0 pr-14 flex flex-col items-start justify-start text-left">

        {/* Package Container: Shifted left and UP */}
        <div id="mentor-block-1" data-mentor="mentor1" className="relative flex flex-col items-start justify-start -mt-16 -ml-32 2xl:-ml-40">

          {/* Saliya Image (Original Full Scale) + Attached Doodle Arrow & Story */}
          <div className="relative z-20 w-[660px] 2xl:w-[740px] aspect-[1122/1402] drop-shadow-2xl">
            <Image
              src="/images/Mentors/Saliya.png"
              alt="Meladine Artist Saliya Illangasinghe"
              fill
              sizes="740px"
              className="object-contain object-left pointer-events-none"
            />

            {/* Hand-drawn Loopy Arrow + "meet Saliya Illangasinghe" handwriting on TOP of the description */}
            <div className="absolute left-[74%] bottom-[68%] z-30 flex flex-col items-start pointer-events-none">
              <div className={`${EASE} ${visible.mentor1 ? ENTER : "opacity-0 translate-y-10 scale-[0.93]"}`}>
                <div className="w-44 rotate-[190deg]">
                  <DoodleArrow className="w-full h-auto drop-shadow-sm" />
                </div>
                <div className="-mt-12 ml-42 2xl:ml-46 font-handwriting text-5xl text-neutral-950 font-bold -rotate-3 tracking-wide select-none drop-shadow-xs whitespace-nowrap hover:scale-105 transition-transform cursor-default">
                  meet Saliya Illangasinghe
                </div>
                <div className="-mt-2 ml-42 2xl:ml-46 font-handwriting text-4xl text-[#ed1438] font-bold -rotate-2 tracking-wide select-none drop-shadow-xs whitespace-nowrap hover:scale-105 transition-transform cursor-default">
                  Guitar specialist
                </div>
              </div>
            </div>

            {/* Description Block placed right BELOW the Arrow & Handwriting */}
            <div className="absolute left-[100%] bottom-[28%] 2xl:bottom-[41%] z-30 w-[600px] 2xl:w-[760px] pointer-events-auto">
              <div className={`${EASE} delay-150 ${visible.mentor1 ? ENTER : HIDDEN}`}>
                <p className="text-base font-light text-neutral-700 leading-relaxed">
                  A professional guitarist, music producer, music director, and educator with extensive experience in Sri Lanka&apos;s music industry. Co-Founder and former guitarist of &quot;WINGS&quot;, a Sumathi Awards-nominated music director and Raigam Tele&apos;es nominated best teledrama singer, <strong className="font-semibold text-neutral-950">Saliya</strong> founded Meladine Music Conservatory in 2007 with a vision to inspire the next generation of musicians.
                </p>

                <p className="mt-2.5 text-base font-light text-neutral-600 leading-relaxed">
                  Combining professional stage experience with practical music education, he is dedicated to developing confident, creative, and skilled musicians through a passion-driven approach to teaching.
                </p>
              </div>

              {/* Metrics Placed Below Descriptive Text */}
              <div className={`mt-6 ${EASE} delay-300 ${visible.mentor1 ? ENTER : HIDDEN}`}>
                <div className="flex items-center gap-10">
                  <div className="flex flex-col group cursor-default">
                    <div className="text-4xl font-display font-bold text-[#ed1438] leading-none group-hover:scale-105 transition-transform duration-200 origin-left">19+</div>
                    <div className="text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">Years Teaching</div>
                  </div>

                  <div className="w-px h-10 bg-neutral-200" />

                  <div className="flex flex-col group cursor-default">
                    <div className="text-base font-bold font-sans text-[#ed1438] leading-tight group-hover:scale-105 transition-transform duration-200 origin-left">Guitar / Music Theory · Music Production</div>
                    <div className="text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">Specializations</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Right Side Guitar Showcase (Guitar Sketch + NEXT MENTOR indicator)        */}
      {/* ========================================================================= */}
      <div className="absolute -right-18 2xl:-right-24 -top-28 2xl:-top-32 z-10 flex flex-col items-end">
        <div className="relative flex flex-col items-end">
          <div className="relative w-[580px] 2xl:w-[660px] aspect-[2/3] z-0">
            <Image
              src="/images/Mentors/AcousticGuitar.png"
              alt=""
              fill
              sizes="660px"
              className="object-contain object-center pointer-events-none opacity-10 z-0 rotate-[24deg] origin-center transition-transform"
            />
          </div>

          {/* Vertical NEXT MENTOR Indicator */}
          <div className="flex absolute -right-4 2xl:-right-6 bottom-4 2xl:bottom-8 z-30 flex-col items-center gap-4">
            <div className="w-px h-16 bg-neutral-200" />
            <span className="[writing-mode:vertical-rl] text-[10px] font-mono tracking-widest text-neutral-400 uppercase select-none">
              NEXT MENTOR
            </span>
            <button
              onClick={onNextMentor}
              aria-label="Scroll to next mentor"
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-black hover:text-black hover:scale-105 active:scale-95 transition-all bg-white shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2nd Mentor (Dileepa) Left Side Keyboard Showcase                          */}
      {/* ========================================================================= */}
      <div className="absolute -left-18 2xl:-left-24 top-[620px] 2xl:top-[700px] z-10 flex flex-col items-start">
        <div className="relative flex flex-col items-start">
          <div className="relative w-[580px] 2xl:w-[660px] aspect-[1122/1402] z-0">
            <Image
              src="/images/Mentors/Keyboard.png"
              alt=""
              fill
              sizes="660px"
              className="object-contain object-center pointer-events-none opacity-10 z-0 transition-transform"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2nd Mentor Showcase: Right Side (Dileepa Liyanage)           */}
      {/* ============================================================ */}
      <div id="next-mentor" data-mentor="mentor2" className="absolute right-0 top-[680px] 2xl:top-[760px] z-20 flex flex-col items-end">
        <div className="relative w-[620px] 2xl:w-[700px] aspect-[1122/1402] -mr-32 2xl:-mr-40 drop-shadow-2xl">
          <Image
            src="/images/Mentors/Dileepa.png"
            alt="Meladine Artist Dileepa Liyanage"
            fill
            sizes="700px"
            className="object-contain object-right pointer-events-none"
          />

          {/* Chair Annotation & Story Package positioned on the left of the Chair */}
          <div className="absolute right-[96%] 2xl:right-[98%] bottom-[34%] z-30 flex flex-col items-end pointer-events-auto">

            {/* Handwriting + Arrow pointing right towards chair */}
            <div className="flex items-center gap-3 pointer-events-none">
              <div className={`${EASE} ${visible.mentor2 ? ENTER : "opacity-0 translate-y-10 scale-[0.93]"} flex items-center gap-3`}>
                <div className="flex flex-col items-end text-right translate-x-22 2xl:translate-x-26">
                  <div className="font-handwriting text-5xl text-neutral-950 font-bold -rotate-2 tracking-wide select-none drop-shadow-xs whitespace-nowrap hover:scale-105 transition-transform cursor-default">
                    meet Dileepa Liyanage
                  </div>
                  <div className="-mt-2 font-handwriting text-4xl text-[#ed1438] font-bold -rotate-1 tracking-wide select-none drop-shadow-xs whitespace-nowrap hover:scale-105 transition-transform cursor-default">
                    Vocal &amp; keyboard instructor
                  </div>
                </div>
                <div className="w-40 shrink-0 rotate-[8deg] translate-x-26 2xl:translate-x-30">
                  <DoodleArrow className="w-full h-auto drop-shadow-sm" />
                </div>
              </div>
            </div>

            {/* Description Block placed right below the handwriting */}
            <div className="mt-5 w-[620px] 2xl:w-[680px] text-right -translate-x-9 2xl:-translate-x-12">
              <div className={`${EASE} delay-150 ${visible.mentor2 ? ENTER : HIDDEN}`}>
                <p className="text-base font-light text-neutral-700 leading-relaxed">
                  A Music Director, Vocalist, Keyboardist, and Music Producer. He serves as the Music Director of <strong className="font-semibold text-neutral-950">SIMPSON&apos;S</strong>, actively involved in live performance, vocal coaching, music production, and artist development.
                </p>

                <p className="mt-2.5 text-base font-light text-neutral-600 leading-relaxed">
                  He has performed with several international bands and gained professional performance experience in Qatar, while continuing to create original music and contemporary musical projects.
                </p>
              </div>

              {/* Metrics Placed Below Descriptive Text */}
              <div className={`mt-6 ${EASE} delay-300 ${visible.mentor2 ? ENTER : HIDDEN}`}>
                <div className="flex items-center justify-end gap-10">
                  <div className="flex flex-col items-end text-right group cursor-default">
                    <div className="text-4xl font-display font-bold text-[#ed1438] leading-none group-hover:scale-105 transition-transform duration-200 origin-right">12+</div>
                    <div className="text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">Years Teaching</div>
                  </div>

                  <div className="w-px h-10 bg-neutral-200" />

                  <div className="flex flex-col items-end text-right group cursor-default">
                    <div className="text-base font-bold font-sans text-[#ed1438] leading-tight group-hover:scale-105 transition-transform duration-200 origin-right">Vocal &amp; Keyboard · Music Production</div>
                    <div className="text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">Specializations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3rd Mentor (Vocals) Right Side Microphone Showcase                        */}
      {/* ========================================================================= */}
      <div className="absolute -right-18 2xl:-right-24 top-[1240px] 2xl:top-[1380px] z-10 flex flex-col items-end">
        <div className="relative flex flex-col items-end">
          <div className="relative w-[580px] 2xl:w-[660px] aspect-[1122/1402] z-0">
            <Image
              src="/images/Mentors/Microphone.png"
              alt=""
              fill
              sizes="660px"
              className="object-contain object-center pointer-events-none opacity-10 z-0 transition-transform"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3rd Mentor Showcase: Left Side (Tharindu Perera)              */}
      {/* ============================================================ */}
      <div id="mentor-block-3" data-mentor="mentor3" className="absolute left-0 top-[1280px] 2xl:top-[1420px] z-20 flex flex-col items-start">
        <div className="relative flex flex-col items-start justify-start -ml-32 2xl:-ml-40">

          {/* Image + Attached Doodle Arrow & Text Package */}
          <div className="relative z-20 w-[660px] 2xl:w-[740px] aspect-[1122/1402] drop-shadow-2xl">
            <Image
              src="/images/Mentors/tharindu-vocal.png"
              alt="Meladine Artist Tharindu Perera"
              fill
              sizes="740px"
              className="object-contain object-left pointer-events-none"
            />

            {/* Hand-drawn Loopy Arrow + "meet Tharindu Perera" handwriting on TOP of the description */}
            <div className="absolute left-[74%] bottom-[58%] z-30 flex flex-col items-start pointer-events-none">
              <div className={`${EASE} ${visible.mentor3 ? ENTER : "opacity-0 translate-y-10 scale-[0.93]"}`}>
                <div className="w-44 rotate-[190deg]">
                  <DoodleArrow className="w-full h-auto drop-shadow-sm" />
                </div>
                <div className="-mt-12 ml-42 2xl:ml-46 font-handwriting text-5xl text-neutral-950 font-bold -rotate-3 tracking-wide select-none drop-shadow-xs whitespace-nowrap hover:scale-105 transition-transform cursor-default">
                  meet Tharindu Perera
                </div>
                <div className="-mt-2 ml-42 2xl:ml-46 font-handwriting text-4xl text-[#ed1438] font-bold -rotate-2 tracking-wide select-none drop-shadow-xs whitespace-nowrap hover:scale-105 transition-transform cursor-default">
                  Vocal &amp; guitar instructor
                </div>
              </div>
            </div>

            {/* Description Block placed right BELOW the Arrow & Handwriting with tight gap */}
            <div className="absolute left-[100%] bottom-[24%] 2xl:bottom-[34%] z-30 w-[600px] 2xl:w-[760px] pointer-events-auto">
              <div className={`${EASE} delay-150 ${visible.mentor3 ? ENTER : HIDDEN}`}>
                <p className="text-base font-light text-neutral-700 leading-relaxed">
                  A Music Producer, Vocalist, Lyricist, and Educator with 5 years of experience in music education. He graduated from the University of Visual and Performing Arts, holds a Visharadha in North Indian Vocal and North Indian Violin, and is the Founder of <strong className="font-semibold text-neutral-950">SoulFrame Studios</strong>.
                </p>

                <p className="mt-2.5 text-base font-light text-neutral-600 leading-relaxed">
                  Teaching guitar, vocals, and the local school syllabus, he helps students learn proper theory and break the frame with creativity and confidence.
                </p>
              </div>

              {/* Metrics Placed Below Descriptive Text */}
              <div className={`mt-6 ${EASE} delay-300 ${visible.mentor3 ? ENTER : HIDDEN}`}>
                <div className="flex items-center gap-10">
                  <div className="flex flex-col group cursor-default">
                    <div className="text-4xl font-display font-bold text-[#ed1438] leading-none group-hover:scale-105 transition-transform duration-200 origin-left">5+</div>
                    <div className="text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">Years Teaching</div>
                  </div>

                  <div className="w-px h-10 bg-neutral-200" />

                  <div className="flex flex-col group cursor-default">
                    <div className="text-base font-bold font-sans text-[#ed1438] leading-tight group-hover:scale-105 transition-transform duration-200 origin-left">Guitar · Vocal · Local School Syllabus</div>
                    <div className="text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">Specializations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function FeaturedMentor() {
  // Below 1280px the free-form desktop composition pushes text off-screen, so
  // phones and tablets get the stacked layout. `undefined` (server render and
  // hydration) also uses the stacked layout: it reads correctly at any width.
  const compact = useCompactLayout();
  const showDesktop = compact === false;

  const [visible, setVisible] = React.useState<Visibility>({
    mentor1: false,
    mentor2: false,
    mentor3: false,
  });

  // Scroll-reveal for each mentor block. Re-armed whenever the layout switches,
  // because the observed elements are re-created.
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-mentor") as MentorId | null;
          if (!id) return;
          setVisible((prev) =>
            prev[id] !== entry.isIntersecting ? { ...prev, [id]: entry.isIntersecting } : prev
          );
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-mentor]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [showDesktop]);

  const scrollToNextMentor = () => {
    const el = document.getElementById("next-mentor");
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -40, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return showDesktop ? (
    <DesktopShowcase visible={visible} onNextMentor={scrollToNextMentor} />
  ) : (
    <CompactShowcase visible={visible} />
  );
}
