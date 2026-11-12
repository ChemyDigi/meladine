"use client";

import React, { useState, useEffect } from "react";

const WORD_1 = ["C", "O", "N", "T", "A", "C", "T"];
const WORD_2 = ["U", "S"];
const ROTATIONS_1 = [-3, 2, -2.5, 3, -2, 2.5, -2];
const ROTATIONS_2 = [2, -2.5];

export default function ContactPage() {
  const [revealed, setRevealed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };


  return (
    <div className="w-full bg-white text-neutral-900 pt-32 sm:pt-40 pb-24 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="pb-6 sm:pb-8">

          {/* Giant "CONTACT US" with Signature Red Popped-up 'C' */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display uppercase tracking-tight text-black leading-[0.88] select-none cursor-default pt-2 sm:pt-4 pb-2 sm:pb-4 flex flex-wrap gap-x-4 sm:gap-x-8">
            <span className="inline-flex">
              {WORD_1.map((letter, i) => {
                const isC = i === 0;

                let transformStyle = "";
                let colorClass = isC ? "text-[#ed1438]" : "text-black";
                let filterStyle = isC ? "drop-shadow(0 16px 20px rgba(237, 20, 56, 0.26))" : "";

                if (isC) {
                  // 'C' stays permanently popped up, tilted, and red
                  if (revealed) {
                    transformStyle = "translateY(-16px) scale(1.12) rotate(-3deg)";
                  } else {
                    transformStyle = "translateY(70px) scale(0.65) rotate(-6deg)";
                  }
                } else {
                  // Other letters
                  if (revealed) {
                    transformStyle = "translateY(0) scale(1) rotate(0deg)";
                  } else {
                    transformStyle = `translateY(70px) scale(0.65) rotate(${ROTATIONS_1[i] * 2}deg)`;
                  }
                }

                return (
                  <span
                    key={`contact-${i}`}
                    style={{
                      transform: transformStyle,
                      filter: filterStyle || undefined,
                      transitionDelay: `${i * 50}ms`,
                    }}
                    className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${colorClass} ${
                      revealed ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>

            <span className="inline-flex">
              {WORD_2.map((letter, i) => {
                let transformStyle = revealed
                  ? "translateY(0) scale(1) rotate(0deg)"
                  : `translateY(70px) scale(0.65) rotate(${ROTATIONS_2[i] * 2}deg)`;

                return (
                  <span
                    key={`us-${i}`}
                    style={{
                      transform: transformStyle,
                      transitionDelay: `${(WORD_1.length + i) * 50}ms`,
                    }}
                    className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform text-black ${
                      revealed ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          </h1>
          <p
            style={{
              transform: revealed ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
              transitionDelay: "420ms",
            }}
            className={`mt-8 text-xl sm:text-2xl md:text-3xl font-light text-neutral-800 max-w-4xl leading-snug transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
          >
            Direct channels for admissions, auditions, trial sessions, and private mentorship across vocals, guitar, and keyboard.
          </p>
        </div>

        {/* Main Form & Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-20">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-12">
            <div>
              <span
                style={{
                  transform: revealed ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
                  transitionDelay: "500ms",
                }}
                className={`text-xs font-mono tracking-widest text-[#ed1438] uppercase font-bold block mb-3 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                  revealed ? "opacity-100" : "opacity-0"
                }`}
              >
                ADMISSIONS &amp; INQUIRIES
              </span>
              <h2
                style={{
                  transform: revealed ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                  transitionDelay: "550ms",
                }}
                className={`text-3xl sm:text-4xl font-display uppercase text-black transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                  revealed ? "opacity-100" : "opacity-0"
                }`}
              >
                JOIN THE ACADEMY
              </h2>
              <p
                style={{
                  transform: revealed ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
                  transitionDelay: "600ms",
                }}
                className={`text-sm sm:text-base text-neutral-600 mt-4 leading-relaxed font-normal transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                  revealed ? "opacity-100" : "opacity-0"
                }`}
              >
                Whether you are beginning your journey in vocals, mastering guitar technique, or exploring keyboard &amp; piano performance, our academy mentors respond within 48 hours.
              </p>

              <div className="mt-10 flex flex-col gap-6 font-mono text-sm">
                <div
                  style={{
                    transform: revealed ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
                    transitionDelay: "660ms",
                  }}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                    revealed ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-xs text-neutral-400 uppercase block">ACADEMY ADMISSIONS</span>
                  <a
                    href="mailto:admissions@meladine.com"
                    className="text-xl font-display uppercase text-black hover:text-[#ed1438] transition-colors"
                  >
                    admissions@meladine.com
                  </a>
                </div>

                <div
                  style={{
                    transform: revealed ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
                    transitionDelay: "720ms",
                  }}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                    revealed ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-xs text-neutral-400 uppercase block">DIRECT ACADEMY PHONE</span>
                  <a
                    href="tel:+905443237623"
                    className="text-xl font-display uppercase text-black hover:text-[#ed1438] transition-colors"
                  >
                    +90 544 323 7623
                  </a>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column: Interactive Transmission Form */}
          <div className="lg:col-span-7">
            <div>
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-display">
                    ✓
                  </div>
                  <h3 className="text-4xl font-display uppercase text-black">
                    INQUIRY RECEIVED
                  </h3>
                  <p className="text-neutral-600 font-mono text-sm mt-3 max-w-md mx-auto">
                    Thank you, {formData.name}. Your inquiry has been received. Our admissions team will get in touch with you at {formData.email} shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="mt-8 px-6 py-3 rounded-full border border-black text-xs font-mono uppercase tracking-wider hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div
                    style={{
                      transform: revealed ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                      transitionDelay: "580ms",
                    }}
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                      revealed ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm text-neutral-900 placeholder:text-neutral-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm text-neutral-900 placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      transform: revealed ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                      transitionDelay: "660ms",
                    }}
                    className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                      revealed ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Message / Course Interest *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your experience level and musical goals in vocals, guitar, or keyboard..."
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm text-neutral-900 placeholder:text-neutral-400 resize-none"
                    />
                  </div>

                  <div
                    style={{
                      transform: revealed ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                      transitionDelay: "740ms",
                    }}
                    className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                      revealed ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] transition-all duration-300 active:scale-98 shadow-sm cursor-pointer"
                    >
                      Send Inquiry &rarr;
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>


      </div>
    </div>
  );
}
