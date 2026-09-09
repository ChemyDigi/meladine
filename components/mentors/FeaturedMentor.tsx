"use client";

import React from "react";
import Image from "next/image";
import DoodleArrow from "@/components/home/DoodleArrow";

export default function FeaturedMentor() {
  const [visible, setVisible] = React.useState<Record<string, boolean>>({
    mentor1: false,
    mentor2: false,
    mentor3: false,
  });

  React.useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight || 800;
      const targets = [
        { id: "mentor1", el: document.getElementById("mentor-block-1") },
        { id: "mentor2", el: document.getElementById("next-mentor") },
        { id: "mentor3", el: document.getElementById("mentor-block-3") },
      ];

      targets.forEach(({ id, el }) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Visible when top is within 82% of viewport height and bottom hasn't scrolled off top
        const isVisible = rect.top < vh * 0.82 && rect.bottom > 80;
        setVisible((prev) => {
          if (prev[id] !== isVisible) {
            return { ...prev, [id]: isVisible };
          }
          return prev;
        });
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-mentor");
          if (id) {
            setVisible((prev) => {
              if (prev[id] !== entry.isIntersecting) {
                return { ...prev, [id]: entry.isIntersecting };
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const blocks = document.querySelectorAll("[data-mentor]");
    blocks.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToNextMentor = () => {
    const el = document.getElementById("next-mentor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[1500px] sm:min-h-[1750px] md:min-h-[1980px] lg:min-h-[2200px] xl:min-h-[2380px] pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-10 flex flex-col items-start justify-start overflow-hidden">
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
      <div className="relative z-20 w-full pl-0 pr-6 sm:pr-10 lg:pr-14 flex flex-col items-start justify-start text-left">

        {/* Package Container: Shifted left and UP */}
        <div id="mentor-block-1" data-mentor="mentor1" className="relative flex flex-col items-start justify-start -mt-4 sm:-mt-8 md:-mt-12 lg:-mt-16 -ml-10 sm:-ml-16 md:-ml-24 lg:-ml-32 xl:-ml-40">

          {/* Saliya Image (Original Full Scale) + Attached Doodle Arrow & Story */}
          <div className="relative z-20 w-[320px] sm:w-[440px] md:w-[560px] lg:w-[660px] xl:w-[740px] aspect-[1122/1402] drop-shadow-2xl">
            <Image
              src="/images/Mentors/Saliya.png"
              alt="Meladine Artist Saliya Illangasinghe"
              fill
              className="object-contain object-left pointer-events-none"
              priority
            />

            {/* Hand-drawn Loopy Arrow + "meet Saliya Illangasinghe" handwriting on TOP of the description */}
            <div className="absolute left-[70%] sm:left-[72%] md:left-[74%] bottom-[62%] sm:bottom-[64%] md:bottom-[66%] lg:bottom-[68%] z-30 flex flex-col items-start pointer-events-none">
              <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible.mentor1 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.93]"}`}>
                <div className="w-24 sm:w-32 md:w-40 lg:w-44 rotate-[190deg]">
                  <DoodleArrow className="w-full h-auto drop-shadow-sm" />
                </div>
                <div className="-mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12 ml-20 sm:ml-28 md:ml-36 lg:ml-42 xl:ml-46 font-handwriting text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-950 font-bold -rotate-3 tracking-wide select-none drop-shadow-xs whitespace-nowrap hover:scale-105 transition-transform cursor-default">
                  meet Saliya Illangasinghe
                </div>
                <div className="-mt-1 sm:-mt-2 ml-20 sm:ml-28 md:ml-36 lg:ml-42 xl:ml-46 font-handwriting text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#ed1438] font-bold -rotate-2 tracking-wide select-none drop-shadow-xs whitespace-nowrap hover:scale-105 transition-transform cursor-default">
                  Guitar specialist
                </div>
              </div>
            </div>

            {/* Description Block placed right BELOW the Arrow & Handwriting */}
            <div className="absolute left-[88%] sm:left-[92%] md:left-[96%] lg:left-[100%] bottom-[32%] sm:bottom-[35%] md:bottom-[38%] lg:bottom-[41%] z-30 w-[350px] sm:w-[460px] md:w-[580px] lg:w-[680px] xl:w-[760px] pointer-events-auto">
              <div className={`transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible.mentor1 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.95]"}`}>
                <p className="text-xs sm:text-sm md:text-base font-light text-neutral-700 leading-relaxed">
                  The Meladine Music Conservatory, founded by &quot;Wings&quot; band co-founder and guitarist <strong className="font-semibold text-neutral-950">Saliya Illangasinghe</strong>, has been offering a range of music-focused courses for the past 16 years.
                </p>

                <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-base font-light text-neutral-600 leading-relaxed">
                  In 2008, Saliya began a small guitar class at his home as a favor to friends, teaching them as best he could. What started as an informal gathering has since evolved into a conservatory where more than 250 students have refined their singing and instrumental skills.
                </p>
              </div>

              {/* Metrics Placed Below Descriptive Text */}
              <div className={`mt-6 transition-all duration-700 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible.mentor1 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.95]"}`}>
                <div className="flex items-center gap-8 sm:gap-10">
                  {/* Metric 1: 16+ Years Teaching */}
                  <div className="flex flex-col group cursor-default">
                    <div className="text-3xl sm:text-4xl font-display font-bold text-[#ed1438] leading-none group-hover:scale-105 transition-transform duration-200 origin-left">16+</div>
                    <div className="text-xs sm:text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">Years Teaching</div>
                  </div>

                  <div className="w-px h-10 bg-neutral-200" />

                  {/* Metric 2: Guitar / Music Theory Specializations */}
                  <div className="flex flex-col group cursor-default">
                    <div className="text-sm sm:text-base font-bold font-sans text-[#ed1438] leading-tight group-hover:scale-105 transition-transform duration-200 origin-left">Guitar / Music Theory</div>
                    <div className="text-xs sm:text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">Specializations</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Right Side Guitar Showcase (Guitar Sketch + Floating Cards + Quote)      */}
      {/* ========================================================================= */}
      <div className="absolute -right-6 sm:-right-10 md:-right-14 lg:-right-18 xl:-right-24 -top-16 sm:-top-20 md:-top-24 lg:-top-28 xl:-top-32 z-10 flex flex-col items-end">

        {/* Relative Container for the Guitar Artwork Package */}
        <div className="relative flex flex-col items-end">


          {/* Guitar Composition Container (Scaled Up, Lower Z-Index) */}
          <div className="relative w-[340px] sm:w-[420px] md:w-[500px] lg:w-[580px] xl:w-[660px] aspect-[2/3] z-0">


            {/* Architectural Guitar Image */}
            <Image
              src="/images/Mentors/AcousticGuitar.png"
              alt="Acoustic Guitar Architectural Drawing"
              fill
              className="object-contain object-center pointer-events-none opacity-10 z-0 rotate-[24deg] origin-center transition-transform"
              priority
            />



          </div>

          {/* Vertical NEXT MENTOR Indicator */}
          <div className="hidden lg:flex absolute -right-4 xl:-right-6 bottom-4 xl:bottom-8 z-30 flex-col items-center gap-4">
            <div className="w-px h-16 bg-neutral-200" />
            <span className="[writing-mode:vertical-rl] text-[10px] font-mono tracking-widest text-neutral-400 uppercase select-none">
              NEXT MENTOR
            </span>
            <button
              onClick={scrollToNextMentor}
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
      <div className="absolute -left-6 sm:-left-10 md:-left-14 lg:-left-18 xl:-left-24 top-[340px] sm:top-[440px] md:top-[540px] lg:top-[620px] xl:top-[700px] z-10 flex flex-col items-start">
        {/* Relative Container for the Keyboard Artwork Package */}
        <div className="relative flex flex-col items-start">
          {/* Keyboard Composition Container (Matching Acoustic Guitar scale & low z-index) */}
          <div className="relative w-[340px] sm:w-[420px] md:w-[500px] lg:w-[580px] xl:w-[660px] aspect-[1122/1402] z-0">
            {/* Architectural Keyboard Image */}
            <Image
              src="/images/Mentors/Keyboard.png"
              alt="Keyboard Architectural Drawing"
              fill
              className="object-contain object-center pointer-events-none opacity-10 z-0 transition-transform"
              priority
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2nd Mentor Showcase: Right Side (Dileepa Liyanage)           */}
      {/* ============================================================ */}
      <div id="next-mentor" data-mentor="mentor2" className="absolute right-0 top-[380px] sm:top-[480px] md:top-[580px] lg:top-[680px] xl:top-[760px] z-20 flex flex-col items-end">
        <div className="relative w-[300px] sm:w-[420px] md:w-[520px] lg:w-[620px] xl:w-[700px] aspect-[1122/1402] -mr-10 sm:-mr-16 md:-mr-24 lg:-mr-32 xl:-mr-40 drop-shadow-2xl">
          <Image
            src="/images/Mentors/Chair.png"
            alt="Meladine Conservatory Chair"
            fill
            className="object-contain object-right pointer-events-none"
            priority
          />

          {/* Chair Annotation & Story Package positioned on the left of the Chair */}
          <div className="absolute right-[86%] sm:right-[90%] md:right-[94%] lg:right-[96%] xl:right-[98%] bottom-[28%] sm:bottom-[30%] md:bottom-[32%] lg:bottom-[34%] z-30 flex flex-col items-end pointer-events-auto">

            {/* Handwriting + Arrow pointing right towards chair */}
            <div className="flex items-center gap-2 sm:gap-3 pointer-events-none">
              <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible.mentor2 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.93]"} flex items-center gap-2 sm:gap-3`}>
                <div className="flex flex-col items-end text-right translate-x-10 sm:translate-x-14 md:translate-x-18 lg:translate-x-22 xl:translate-x-26">
                  <div className="font-handwriting text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-950 font-bold -rotate-2 tracking-wide select-none drop-shadow-xs whitespace-nowrap hover:scale-105 transition-transform cursor-default">
                    meet Dileepa Liyanage
                  </div>
                  <div className="-mt-1 sm:-mt-2 font-handwriting text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#ed1438] font-bold -rotate-1 tracking-wide select-none drop-shadow-xs whitespace-nowrap hover:scale-105 transition-transform cursor-default">
                    Keyboard specialist
                  </div>
                </div>
                <div className="w-22 sm:w-28 md:w-36 lg:w-40 shrink-0 rotate-[8deg] translate-x-10 sm:translate-x-16 md:translate-x-22 lg:translate-x-26 xl:translate-x-30">
                  <DoodleArrow className="w-full h-auto drop-shadow-sm" />
                </div>
              </div>
            </div>

            {/* Description Block placed right below the handwriting */}
            <div className="mt-4 sm:mt-5 w-[330px] sm:w-[440px] md:w-[540px] lg:w-[620px] xl:w-[680px] text-right -translate-x-3 sm:-translate-x-5 md:-translate-x-7 lg:-translate-x-9 xl:-translate-x-12">
              <div className={`transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible.mentor2 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.95]"}`}>
                <p className="text-xs sm:text-sm md:text-base font-light text-neutral-700 leading-relaxed">
                  With a rich background in piano performance and contemporary harmony, <strong className="font-semibold text-neutral-950">Dileepa Liyanage</strong> guides students through classical mastery, chord voicings, and modern keyboard techniques.
                </p>

                <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-base font-light text-neutral-600 leading-relaxed">
                  From foundational scales, finger dexterity, and sheet reading to creative improvisation and synthesis, lessons are crafted to nurture both expressive musicianship and technical confidence behind the keys.
                </p>
              </div>

              {/* Metrics Placed Below Descriptive Text */}
              <div className={`mt-6 transition-all duration-700 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible.mentor2 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.95]"}`}>
                <div className="flex items-center justify-end gap-8 sm:gap-10">
                  {/* Metric 1: 12+ Years Teaching */}
                  <div className="flex flex-col items-end text-right group cursor-default">
                    <div className="text-3xl sm:text-4xl font-display font-bold text-[#ed1438] leading-none group-hover:scale-105 transition-transform duration-200 origin-right">12+</div>
                    <div className="text-xs sm:text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">Years Teaching</div>
                  </div>

                  <div className="w-px h-10 bg-neutral-200" />

                  {/* Metric 2: Piano / Keyboard Specializations */}
                  <div className="flex flex-col items-end text-right group cursor-default">
                    <div className="text-sm sm:text-base font-bold font-sans text-[#ed1438] leading-tight group-hover:scale-105 transition-transform duration-200 origin-right">Piano / Keyboard</div>
                    <div className="text-xs sm:text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">Specializations</div>
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
      <div className="absolute -right-6 sm:-right-10 md:-right-14 lg:-right-18 xl:-right-24 top-[720px] sm:top-[900px] md:top-[1080px] lg:top-[1240px] xl:top-[1380px] z-10 flex flex-col items-end">
        {/* Relative Container for the Microphone Artwork Package */}
        <div className="relative flex flex-col items-end">
          {/* Microphone Composition Container (Matching Scale & Low Z-Index) */}
          <div className="relative w-[340px] sm:w-[420px] md:w-[500px] lg:w-[580px] xl:w-[660px] aspect-[1122/1402] z-0">
            {/* Architectural Microphone Image */}
            <Image
              src="/images/Mentors/Microphone.png"
              alt="Microphone Architectural Drawing"
              fill
              className="object-contain object-center pointer-events-none opacity-10 z-0 transition-transform"
              priority
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3rd Mentor Showcase: Left Side (Vocals Specialist)           */}
      {/* ============================================================ */}
      <div id="mentor-block-3" data-mentor="mentor3" className="absolute left-0 top-[760px] sm:top-[940px] md:top-[1120px] lg:top-[1280px] xl:top-[1420px] z-20 flex flex-col items-start">
        <div className="relative flex flex-col items-start justify-start -ml-10 sm:-ml-16 md:-ml-24 lg:-ml-32 xl:-ml-40">

          {/* Image + Attached Doodle Arrow & Text Package */}
          <div className="relative z-20 w-[320px] sm:w-[440px] md:w-[560px] lg:w-[660px] xl:w-[740px] aspect-[1122/1402] drop-shadow-2xl">
            <Image
              src="/images/Mentors/Chair.png"
              alt="Meladine Conservatory Chair"
              fill
              className="object-contain object-left pointer-events-none"
            />

            {/* Hand-drawn Loopy Arrow + "meet Dileepa Liyanage" handwriting on TOP of the description */}
            <div className="absolute left-[70%] sm:left-[72%] md:left-[74%] bottom-[52%] sm:bottom-[54%] md:bottom-[56%] lg:bottom-[58%] z-30 flex flex-col items-start pointer-events-none">
              <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible.mentor3 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.93]"}`}>
                <div className="w-24 sm:w-32 md:w-40 lg:w-44 rotate-[190deg]">
                  <DoodleArrow className="w-full h-auto drop-shadow-sm" />
                </div>
                <div className="-mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12 ml-20 sm:ml-28 md:ml-36 lg:ml-42 xl:ml-46 font-handwriting text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-950 font-bold -rotate-3 tracking-wide select-none drop-shadow-xs whitespace-nowrap hover:scale-105 transition-transform cursor-default">
                  meet Dileepa Liyanage
                </div>
                <div className="-mt-1 sm:-mt-2 ml-20 sm:ml-28 md:ml-36 lg:ml-42 xl:ml-46 font-handwriting text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#ed1438] font-bold -rotate-2 tracking-wide select-none drop-shadow-xs whitespace-nowrap hover:scale-105 transition-transform cursor-default">
                  Vocals specialist
                </div>
              </div>
            </div>

            {/* Description Block placed right BELOW the Arrow & Handwriting with tight gap */}
            <div className="absolute left-[88%] sm:left-[92%] md:left-[96%] lg:left-[100%] bottom-[28%] sm:bottom-[30%] md:bottom-[32%] lg:bottom-[34%] z-30 w-[350px] sm:w-[460px] md:w-[580px] lg:w-[680px] xl:w-[760px] pointer-events-auto">
              <div className={`transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible.mentor3 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.95]"}`}>
                <p className="text-xs sm:text-sm md:text-base font-light text-neutral-700 leading-relaxed">
                  Dedicated to unlocking each singer&apos;s natural resonance and authentic expression, our vocal coaching blends diaphragmatic breath control with contemporary phrasing and pitch precision.
                </p>

                <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-base font-light text-neutral-600 leading-relaxed">
                  From foundational vocal health, resonance placement, and range expansion to microphone technique and expressive stage performance, lessons are tailored to empower your unique voice.
                </p>
              </div>

              {/* Metrics Placed Below Descriptive Text */}
              <div className={`mt-6 transition-all duration-700 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible.mentor3 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.95]"}`}>
                <div className="flex items-center gap-8 sm:gap-10">
                  {/* Metric 1: 10+ Years Teaching */}
                  <div className="flex flex-col group cursor-default">
                    <div className="text-3xl sm:text-4xl font-display font-bold text-[#ed1438] leading-none group-hover:scale-105 transition-transform duration-200 origin-left">10+</div>
                    <div className="text-xs sm:text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">Years Teaching</div>
                  </div>

                  <div className="w-px h-10 bg-neutral-200" />

                  {/* Metric 2: Vocal / Performance Specializations */}
                  <div className="flex flex-col group cursor-default">
                    <div className="text-sm sm:text-base font-bold font-sans text-[#ed1438] leading-tight group-hover:scale-105 transition-transform duration-200 origin-left">Vocal / Performance</div>
                    <div className="text-xs sm:text-sm text-neutral-500 font-sans font-medium tracking-tight mt-1">Specializations</div>
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
