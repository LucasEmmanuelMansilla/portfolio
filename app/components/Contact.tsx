"use client";

import { useEffect, useRef, useState } from "react";

const contactItems = [
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/lucasemansilla",
    href: "https://www.linkedin.com/in/lucasemansilla/",
    external: true,
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
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
    ),
    label: "Email",
    value: "lucas_e_93@hotmail.com",
    href: "mailto:lucas_e_93@hotmail.com",
    external: false,
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    label: "Teléfono",
    value: "+54 9 364 462-0191",
    href: "tel:+5493644620191",
    external: false,
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contacto" ref={ref} className="relative py-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d47] to-transparent" />

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,255,135,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl">
            <p className="text-[#00ff87] font-bebas tracking-widest text-sm mb-2">
              CONTACTO
            </p>
            <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] leading-none text-white mb-6">
              Hablemos
              <br />
              <span className="text-[#6b7fa3]">de tu proyecto</span>
            </h2>
            <p className="font-karla text-[#6b7fa3] text-base leading-relaxed mb-10 max-w-lg">
              Estoy disponible para proyectos freelance, posiciones remotas y
              consultas técnicas. Escribime por cualquiera de estos canales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            {contactItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`group flex items-center gap-4 p-5 border border-[#1e2d47] rounded-lg bg-[#0d1424]/50 hover:border-[#00ff87]/40 hover:bg-[#0d1424] transition-all duration-300 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <span className="text-[#6b7fa3] group-hover:text-[#00ff87] transition-colors flex-shrink-0">
                  {item.icon}
                </span>
                <div>
                  <p className="font-karla text-xs text-[#6b7fa3] mb-0.5">
                    {item.label}
                  </p>
                  <p className="font-karla text-sm text-white font-medium group-hover:text-[#00ff87] transition-colors break-all">
                    {item.value}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-[#6b7fa3] group-hover:text-[#00ff87] ml-auto transition-colors opacity-0 group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#1e2d47] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bebas text-[#6b7fa3] tracking-widest text-sm">
            LUCAS MANSILLA<span className="text-[#00ff87]">.</span>
          </span>
          <p className="font-karla text-xs text-[#2a3a55]">
            © 2026 — React Native & Full Stack Developer — Argentina
          </p>
          <div className="flex items-center gap-1 text-xs font-karla text-[#2a3a55]">
            <span>Construido con</span>
            <span className="text-[#00ff87] mx-1">Next.js</span>
            <span>+</span>
            <span className="text-[#00ff87] mx-1">Tailwind</span>
          </div>
        </div>
      </div>
    </section>
  );
}
