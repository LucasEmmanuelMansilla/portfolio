"use client";

import { useEffect, useRef } from "react";

const tags = [
  "React Native",
  "TypeScript",
  "Fintech",
  "Mobile Apps",
  "Redux",
  "Node.js",
];

export default function Hero() {
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    let i = 0;
    const words = ["React Native.", "TypeScript.", "Fintech.", "Impacto real."];
    let wi = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const word = words[wi];
      if (!deleting) {
        el.textContent = word.slice(0, i + 1);
        i++;
        if (i === word.length) {
          deleting = true;
          timeout = setTimeout(type, 1800);
          return;
        }
      } else {
        el.textContent = word.slice(0, i - 1);
        i--;
        if (i === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
        }
      }
      timeout = setTimeout(type, deleting ? 60 : 90);
    };

    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,255,135,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Decorative large text behind */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas text-[20vw] leading-none text-white/[0.02] select-none pointer-events-none whitespace-nowrap"
      >
        DEVELOPER
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Available badge */}
        <div className="animate-fade-up flex items-center gap-2 mb-8 w-fit">
          <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
          <span className="text-sm font-karla text-[#6b7fa3] tracking-widest uppercase">
            Disponible para proyectos
          </span>
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-up delay-100 font-bebas leading-none tracking-wide">
          <span className="block text-[clamp(3rem,10vw,8rem)] text-white">
            Lucas
          </span>
          <span className="block text-[clamp(3rem,10vw,8rem)] text-[#00ff87]">
            Mansilla
          </span>
        </h1>

        {/* Typewriter subtitle */}
        <div className="animate-fade-up delay-200 mt-4 font-bebas text-[clamp(1.2rem,3.5vw,2.5rem)] text-[#6b7fa3] tracking-wider">
          Full Stack Developer /{" "}
          <span ref={lineRef} className="text-white" />
          <span className="inline-block w-0.5 h-[1em] bg-[#00ff87] ml-0.5 align-middle animate-pulse" />
        </div>

        {/* Description */}
        <p className="animate-fade-up delay-300 mt-6 max-w-xl text-[#6b7fa3] font-karla text-base leading-relaxed">
          5+ años construyendo aplicaciones móviles de alto tráfico en{" "}
          <span className="text-white font-medium">fintech</span>,{" "}
          <span className="text-white font-medium">banca</span> y{" "}
          <span className="text-white font-medium">billeteras digitales</span>.
          Especializado en onboarding, biometría, tokenización y pagos.
        </p>

        {/* Tags */}
        <div className="animate-fade-up delay-400 flex flex-wrap gap-2 mt-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-karla font-medium tracking-wide border border-[#1e2d47] text-[#6b7fa3] rounded-full hover:border-[#00ff87]/40 hover:text-white transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="animate-fade-up delay-500 flex flex-wrap gap-4 mt-10">
          <a
            href="https://www.linkedin.com/in/lucasemansilla/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 bg-[#00ff87] text-[#060810] font-karla font-bold text-sm rounded hover:bg-[#00cc6a] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="mailto:lucas_e_93@hotmail.com"
            className="flex items-center gap-2 px-6 py-3 border border-[#1e2d47] text-white font-karla font-medium text-sm rounded hover:border-[#00ff87]/50 hover:text-[#00ff87] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            lucas_e_93@hotmail.com
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-up delay-700 mt-20 flex items-center gap-3">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#00ff87]" />
          <span className="text-xs text-[#6b7fa3] font-karla tracking-widest uppercase">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
