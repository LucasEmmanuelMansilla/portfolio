"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  description: string;
}

const stats: Stat[] = [
  {
    prefix: "+",
    value: 30,
    suffix: "%",
    label: "Conversión de onboarding",
    sublabel: "YPF Ruta — NTT Data",
    description:
      "Rediseño completo del flujo de registro para más de 10.000 transportistas en Argentina.",
  },
  {
    prefix: "~",
    value: 100,
    suffix: "%",
    label: "Adopción biométrica",
    sublabel: "BanCo — Flux IT",
    description:
      "Face ID, Touch ID y huella digital integrados con Apple Pay y Google Pay via Thales, Fiserv y Prisma.",
  },
  {
    prefix: "~",
    value: 10,
    suffix: "k",
    label: "Descargas en 3 meses",
    sublabel: "Pako Wallet — Mobile Computing",
    description:
      "Lanzamiento a producción en múltiples países de Centroamérica tras estabilizar la app desde cero.",
  },
];

function Counter({
  value,
  active,
}: {
  value: number;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [active, value]);

  return <>{display}</>;
}

export default function Stats() {
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="metricas" ref={ref} className="relative py-24">
      {/* Section divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d47] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-[#00ff87] font-bebas tracking-widest text-sm mb-2">
            IMPACTO MEDIBLE
          </p>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
            Resultados
            <br />
            <span className="text-[#6b7fa3]">en producción</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group relative p-8 border border-[#1e2d47] rounded-lg bg-[#0d1424]/50 hover:border-[#00ff87]/40 transition-all duration-500 hover:bg-[#0d1424] ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${i * 150}ms`,
                transition:
                  "opacity 0.7s ease, transform 0.7s ease, border-color 0.3s ease, background-color 0.3s ease",
              }}
            >
              {/* Glow corner */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#00ff87]/10 to-transparent rounded-tl-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Number */}
              <div className="font-bebas text-[clamp(3.5rem,8vw,5.5rem)] leading-none text-white mb-1">
                <span className="text-[#00ff87] text-[0.6em]">
                  {stat.prefix}
                </span>
                <Counter value={stat.value} active={visible} />
                <span className="text-[#00ff87]">{stat.suffix}</span>
              </div>

              {/* Label */}
              <p className="font-karla font-semibold text-white text-lg leading-tight mb-1">
                {stat.label}
              </p>
              <p className="font-karla text-xs text-[#00ff87] font-medium tracking-wide uppercase mb-3">
                {stat.sublabel}
              </p>
              <p className="font-karla text-sm text-[#6b7fa3] leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
