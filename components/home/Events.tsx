import React from "react";

export default function Events() {
  const eventList = [
    { date: "OCT 24, 2026", title: "FREQUENCY RESONANCE VOL. IV", location: "KRAFTWERK // BERLIN", status: "TICKETS AVAILABLE" },
    { date: "NOV 12, 2026", title: "DEEP PRESSURE COLLECTIVE", location: "WAREHOUSE 7 // COLOMBO", status: "SELLING FAST" },
    { date: "DEC 05, 2026", title: "ECHO CHAMBERS: LIVE MODULAR", location: "THE SUBSTATION // TOKYO", status: "WAITLIST" },
  ];

  return (
    <section
      id="events"
      className="w-full bg-white py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-t border-neutral-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#ed1438] uppercase font-bold">
              // 02 LIVE DATES
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-display uppercase tracking-tight text-black mt-2">
              UPCOMING SESSIONS
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">UPDATED WEEKLY</span>
        </div>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {eventList.map((ev, i) => (
            <div
              key={i}
              className="group py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-neutral-50/80 px-4 -mx-4 rounded-xl"
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-neutral-400 w-28">{ev.date}</span>
                <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight group-hover:text-[#ed1438] transition-colors">
                  {ev.title}
                </h3>
              </div>
              <div className="flex items-center gap-6 justify-between md:justify-end">
                <span className="font-mono text-xs text-neutral-500 uppercase">{ev.location}</span>
                <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider border border-neutral-200 group-hover:border-black transition-colors">
                  {ev.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
