"use client";

import { useEffect, useRef, useState } from "react";

const highlights = [
  {
    icon: "📱",
    title: "Apps móviles de alto tráfico",
    text: "Fintech, banca, logística y billeteras virtuales con miles de usuarios activos.",
  },
  {
    icon: "🔐",
    title: "Seguridad y pagos digitales",
    text: "Tokenización (Thales, Fiserv, Prisma), Apple Pay, Google Pay y autenticación biométrica.",
  },
  {
    icon: "🚀",
    title: "Ciclo completo de producto",
    text: "Desde el diseño funcional hasta el despliegue en tiendas con soporte en producción.",
  },
  {
    icon: "🤝",
    title: "Liderazgo técnico",
    text: "Mentoría de devs junior, code reviews, documentación y refinamiento de requerimientos.",
  },
];

export default function About() {
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
    <section id="sobre-mi" ref={ref} className="relative py-24 overflow-hidden w-full max-w-[100vw]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d47] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-y-4"}`}
          >
            <p className="text-[#00ff87] font-bebas tracking-widest text-sm mb-2">
              SOBRE MÍ
            </p>
            <h2 className="font-bebas text-[clamp(2.5rem,5vw,4rem)] leading-none text-white mb-8">
              Código que
              <br />
              <span className="text-[#6b7fa3]">mueve millones</span>
            </h2>

            <div className="space-y-5 font-karla text-[#6b7fa3] text-base leading-relaxed">
              <p>
                Soy un{" "}
                <span className="text-white font-medium">
                  Full Stack Developer
                </span>{" "}
                con más de 5 años de experiencia construyendo, optimizando y
                escalando aplicaciones móviles en TypeScript y React Native.
              </p>
              <p>
                Trabajé en proyectos de alto impacto en{" "}
                <span className="text-white font-medium">
                  fintech, banca, logística y billeteras virtuales
                </span>
                , participando en todo el ciclo: desarrollo de nuevas
                funcionalidades, estabilización de aplicaciones críticas, mejora
                de performance y despliegues a tiendas.
              </p>
              <p>
                Mi fortaleza está en resolver problemas técnicos complejos,
                mejorar la experiencia del usuario final y asegurar aplicaciones
                robustas en entornos con miles de usuarios activos.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm font-karla text-[#6b7fa3]">
                Argentina
              </span>
              <span className="w-1 h-1 rounded-full bg-[#1e2d47]" />
              <span className="text-sm font-karla text-[#6b7fa3]">
                Disponible remoto
              </span>
              <span className="w-1 h-1 rounded-full bg-[#1e2d47]" />
              <span className="text-sm font-karla text-[#6b7fa3]">
                +54 9 364 462-0191
              </span>
            </div>
          </div>

          {/* Right: highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <div
                key={item.title}
                className={`p-5 border border-[#1e2d47] rounded-lg bg-[#0d1424]/50 hover:border-[#00ff87]/30 transition-all duration-500 hover:bg-[#0d1424] ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="font-karla font-semibold text-white text-sm mb-2">
                  {item.title}
                </h3>
                <p className="font-karla text-sm text-[#6b7fa3] leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
