"use client";

import React from "react";
import Image from "next/image";
import DoodleArrow from "@/components/home/DoodleArrow";

export default function FeaturedMentor() {
  return (
    <section className="relative w-full min-h-[1140px] sm:min-h-[1500px] md:min-h-[1870px] lg:min-h-[2220px] xl:min-h-[2480px] pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-0 flex flex-col items-start justify-start overflow-hidden">
      {/* Background Architectural Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="curtain-grid-columns h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-neutral-100 h-full" />
          ))}
        </div>
      </div>

      {/* Right Side Empty Chair Package with Doodle Arrow pointing to Chair & Left Descriptive Text */}
      <div className="absolute right-0 top-[380px] sm:top-[480px] md:top-[600px] lg:top-[720px] xl:top-[820px] z-20 flex flex-col items-end">
        <div className="relative w-[300px] sm:w-[420px] md:w-[520px] lg:w-[620px] xl:w-[700px] aspect-[1122/1402] -mr-10 sm:-mr-16 md:-mr-24 lg:-mr-32 xl:-mr-40 drop-shadow-2xl">
          <Image
            src="/images/Mentors/Chair.png"
            alt="Meladine Conservatory Chair"
            fill
            className="object-contain object-right pointer-events-none"
            priority
          />

          {/* Chair Annotation & Story Package positioned on the left of the Chair (Shifted further left) */}
          <div className="absolute right-[88%] sm:right-[92%] md:right-[96%] lg:right-[100%] xl:right-[104%] bottom-[28%] sm:bottom-[30%] md:bottom-[32%] lg:bottom-[34%] z-30 flex flex-col items-end pointer-events-auto">

            {/* Handwriting + Arrow pointing right towards chair */}
            <div className="flex items-center gap-2 sm:gap-3 pointer-events-none">
              <div className="flex flex-col items-end text-right translate-x-4 sm:translate-x-6 md:translate-x-8 lg:translate-x-10">
                <div className="font-handwriting text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-950 font-bold -rotate-2 tracking-wide select-none drop-shadow-xs whitespace-nowrap">
                  your seat in the lab
                </div>
                <div className="-mt-1 sm:-mt-2 font-handwriting text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#ed1438] font-bold -rotate-1 tracking-wide select-none drop-shadow-xs whitespace-nowrap">
                  Residency awaits
                </div>
              </div>
              <div className="w-22 sm:w-28 md:w-36 lg:w-40 shrink-0 rotate-[8deg] translate-x-4 sm:translate-x-8 md:translate-x-12 lg:translate-x-14">
                <DoodleArrow className="w-full h-auto drop-shadow-sm" />
              </div>
            </div>

            {/* Description Block placed right below the handwriting (Moved a little bit right) */}
            <div className="mt-4 sm:mt-5 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[480px] text-right -translate-x-6 sm:-translate-x-12 md:-translate-x-18 lg:-translate-x-24 xl:-translate-x-28">
              <p className="text-xs sm:text-sm md:text-base font-light text-neutral-700 leading-relaxed">
                Step into the inner circle of Meladine sound research. An open chair reserved for emerging guitarists, acoustic engineers, and modular producers.
              </p>

              <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-base font-light text-neutral-600 leading-relaxed">
                Experience intensive 1-on-1 mentorship, full conservatory studio keys, and stage residency opportunities alongside industry veterans and visionary resident faculty.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1st Mentor Showcase (Top Left) */}
      <div className="relative z-20 w-full pl-0 pr-6 sm:pr-10 lg:pr-14 flex flex-col items-start justify-start text-left">

        {/* Package Container: Shifted further left and UP */}
        <div className="relative flex flex-col items-start justify-start -mt-4 sm:-mt-8 md:-mt-12 lg:-mt-16 -ml-10 sm:-ml-16 md:-ml-24 lg:-ml-32 xl:-ml-40">

          {/* Saliya Image + Attached Doodle Arrow & Text Package (Scaled Up) */}
          <div className="relative z-20 w-[320px] sm:w-[440px] md:w-[560px] lg:w-[660px] xl:w-[740px] aspect-[1122/1402] drop-shadow-2xl">
            <Image
              src="/images/Mentors/Saliya.png"
              alt="Meladine Artist Saliya Illangasinghe"
              fill
              className="object-contain object-left pointer-events-none"
              priority
            />

            {/* Hand-drawn Loopy Arrow + "meet Saliya Illangasinghe" handwriting on TOP of the description */}
            <div className="absolute left-[70%] sm:left-[72%] md:left-[74%] bottom-[52%] sm:bottom-[54%] md:bottom-[56%] lg:bottom-[58%] z-30 flex flex-col items-start pointer-events-none">
              <div className="w-24 sm:w-32 md:w-40 lg:w-44 rotate-[190deg]">
                <DoodleArrow className="w-full h-auto drop-shadow-sm" />
              </div>
              <div className="-mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12 ml-20 sm:ml-28 md:ml-36 lg:ml-42 xl:ml-46 font-handwriting text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-950 font-bold -rotate-3 tracking-wide select-none drop-shadow-xs whitespace-nowrap">
                meet Saliya Illangasinghe
              </div>
              <div className="-mt-1 sm:-mt-2 ml-20 sm:ml-28 md:ml-36 lg:ml-42 xl:ml-46 font-handwriting text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#ed1438] font-bold -rotate-2 tracking-wide select-none drop-shadow-xs whitespace-nowrap">
                Guitar specialist
              </div>
            </div>

            {/* Description Block placed right BELOW the Arrow & Handwriting with tight gap */}
            <div className="absolute left-[88%] sm:left-[92%] md:left-[96%] lg:left-[100%] bottom-[28%] sm:bottom-[30%] md:bottom-[32%] lg:bottom-[34%] z-30 w-[280px] sm:w-[360px] md:w-[460px] lg:w-[540px] pointer-events-auto">
              <p className="text-xs sm:text-sm md:text-base font-light text-neutral-700 leading-relaxed">
                The Meladine Music Conservatory, founded by &quot;Wings&quot; band co-founder and guitarist <strong className="font-semibold text-neutral-950">Saliya Illangasinghe</strong>, has been offering a range of music-focused courses for the past 16 years.
              </p>

              <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-base font-light text-neutral-600 leading-relaxed">
                In 2008, Saliya began a small guitar class at his home as a favor to friends, teaching them as best he could. What started as an informal gathering has since evolved into a conservatory where more than 250 students have refined their singing and instrumental skills.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd Mentor Showcase (Left Side, Positioned Just Below Chair) */}
      <div className="absolute left-0 top-[720px] sm:top-[940px] md:top-[1160px] lg:top-[1380px] xl:top-[1540px] z-20 flex flex-col items-start">
        <div className="relative flex flex-col items-start justify-start -ml-10 sm:-ml-16 md:-ml-24 lg:-ml-32 xl:-ml-40">

          {/* Image + Attached Doodle Arrow & Text Package */}
          <div className="relative z-20 w-[320px] sm:w-[440px] md:w-[560px] lg:w-[660px] xl:w-[740px] aspect-[1122/1402] drop-shadow-2xl">
            <Image
              src="/images/Mentors/Chair.png"
              alt="Meladine Conservatory Chair"
              fill
              className="object-contain object-left pointer-events-none"
            />

            {/* Hand-drawn Loopy Arrow + "meet Saliya Illangasinghe" handwriting on TOP of the description */}
            <div className="absolute left-[70%] sm:left-[72%] md:left-[74%] bottom-[52%] sm:bottom-[54%] md:bottom-[56%] lg:bottom-[58%] z-30 flex flex-col items-start pointer-events-none">
              <div className="w-24 sm:w-32 md:w-40 lg:w-44 rotate-[190deg]">
                <DoodleArrow className="w-full h-auto drop-shadow-sm" />
              </div>
              <div className="-mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12 ml-20 sm:ml-28 md:ml-36 lg:ml-42 xl:ml-46 font-handwriting text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-950 font-bold -rotate-3 tracking-wide select-none drop-shadow-xs whitespace-nowrap">
                meet Dileepa Liyanage
              </div>
              <div className="-mt-1 sm:-mt-2 ml-20 sm:ml-28 md:ml-36 lg:ml-42 xl:ml-46 font-handwriting text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#ed1438] font-bold -rotate-2 tracking-wide select-none drop-shadow-xs whitespace-nowrap">
                Keybord specialist
              </div>
            </div>

            {/* Description Block placed right BELOW the Arrow & Handwriting with tight gap */}
            <div className="absolute left-[88%] sm:left-[92%] md:left-[96%] lg:left-[100%] bottom-[28%] sm:bottom-[30%] md:bottom-[32%] lg:bottom-[34%] z-30 w-[280px] sm:w-[360px] md:w-[460px] lg:w-[540px] pointer-events-auto">
              <p className="text-xs sm:text-sm md:text-base font-light text-neutral-700 leading-relaxed">
                The Meladine Music Conservatory, founded by &quot;Wings&quot; band co-founder and guitarist <strong className="font-semibold text-neutral-950">Saliya Illangasinghe</strong>, has been offering a range of music-focused courses for the past 16 years.
              </p>

              <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-base font-light text-neutral-600 leading-relaxed">
                In 2008, Saliya began a small guitar class at his home as a favor to friends, teaching them as best he could. What started as an informal gathering has since evolved into a conservatory where more than 250 students have refined their singing and instrumental skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
