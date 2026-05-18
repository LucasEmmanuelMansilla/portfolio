"use client";

import { useEffect, useRef, useState } from "react";

interface Job {
  role: string;
  company: string;
  client?: string;
  period: string;
  location: string;
  current?: boolean;
  bullets: string[];
  stack: string[];
}

const jobs: Job[] = [
  {
    role: "Mobile Developer",
    company: "MindTeck",
    client: "Juntos+ (Coca-Cola FEMSA)",
    period: "Mar 2026 – Actualidad",
    location: "Remoto · México",
    current: true,
    bullets: [
      "Implementación de Agente IA para responder preguntas a clientes.",
      "Desarrollo de funcionalidades de carrusel de promociones y venta fraccionada (por unidad y por caja).",
      "Participación en roadmap funcional y documentación técnica.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "Segment",
      "OneSignal",
      "Jumio",
      "Firebase",
    ],
  },
  {
    role: "React Native Developer",
    company: "Mobile Computing",
    client: "Pako Wallet",
    period: "Dic 2023 – Feb 2026",
    location: "Remoto · Argentina",
    bullets: [
      "Estabilización de la app en producción corrigiendo fallas críticas de performance, navegación y estado.",
      "Lanzamiento exitoso en tiendas: ~10.000 descargas en 3 meses en múltiples países de Centroamérica.",
      "Desarrollo de onboarding, validación de identidad (KYC con Jumio), pagos digitales y push notifications.",
      "Optimización de estado global con Zustand y fetching/caching con TanStack Query.",
      "Mentoría a nuevos desarrolladores: code reviews, debugging y buenas prácticas.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "Segment",
      "OneSignal",
      "Jumio",
      "Firebase",
    ],
  },
  {
    role: "React Native Developer",
    company: "Flux IT",
    client: "BanCo (Banco de Corrientes)",
    period: "Abr 2023 – Nov 2023",
    location: "Remoto · Argentina",
    bullets: [
      "Tokenización de tarjetas con APIs de Thales, Fiserv (Mastercard) y Prisma (Visa).",
      "Integración de Apple Pay y Google Pay habilitando pagos digitales nativos.",
      "Autenticación biométrica (Face ID, Touch ID, huella) con casi 100% de adopción.",
      "Desarrollo end-to-end, pruebas y soporte durante despliegues a producción.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Thales",
      "Fiserv",
      "Prisma",
      "Apple Pay",
      "Google Pay",
      "Biometrics",
    ],
  },
  {
    role: "React Native Developer",
    company: "NTT Data",
    client: "YPF Ruta",
    period: "Jun 2022 – Mar 2023",
    location: "Remoto · Argentina",
    bullets: [
      "Rediseño del onboarding logrando +30% de conversión en más de 10.000 transportistas.",
      "Implementación de flujos con geolocalización, mapas, rutas y visualización de consumos.",
      "Resolución de incidencias, debugging en dispositivos físicos y soporte a nuevos integrantes.",
    ],
    stack: ["React Native", "TypeScript", "Google Maps SDK", "Redux", "REST APIs"],
  },
  {
    role: "React Native Developer",
    company: "DVS 360",
    client: "PlayMatch",
    period: "Mar 2022 – Jun 2022",
    location: "Remoto · Argentina",
    bullets: [
      "App móvil para reservas deportivas y emparejamiento entre usuarios.",
      "Pagos, reservas, notificaciones push y geolocalización.",
      "Optimización del algoritmo de matching reduciendo ~90% partidos desbalanceados.",
      "Automatización de flujos administrativos reduciendo ~80% cancelaciones.",
    ],
    stack: ["React Native", "JavaScript", "Firebase", "Google Maps", "Redux"],
  },
  {
    role: "React Native Developer",
    company: "ITR",
    client: "MascoNet",
    period: "May 2021 – Mar 2022",
    location: "Remoto · Argentina",
    bullets: [
      "App de impacto social para búsqueda y devolución de mascotas perdidas.",
      "Feed, posteos, geolocalización, notificaciones y perfiles de usuario.",
      "Incremento de ~50% en la tasa de mascotas recuperadas en áreas implementadas.",
    ],
    stack: ["React Native", "Redux", "Node.js", "REST APIs"],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experiencia" ref={ref} className="relative py-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d47] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-[#00ff87] font-bebas tracking-widest text-sm mb-2">
            TRAYECTORIA
          </p>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
            Experiencia
            <br />
            <span className="text-[#6b7fa3]">profesional</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[#1e2d47] hidden md:block" />

          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div
                key={`${job.company}-${i}`}
                className={`transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="md:pl-12 relative">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-[13px] top-6 w-2.5 h-2.5 rounded-full border-2 hidden md:block transition-colors ${
                      job.current
                        ? "bg-[#00ff87] border-[#00ff87]"
                        : "bg-[#0d1424] border-[#1e2d47]"
                    }`}
                  />

                  {/* Card */}
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full text-left"
                  >
                    <div
                      className={`p-6 border rounded-lg transition-all duration-300 ${
                        expanded === i
                          ? "border-[#00ff87]/40 bg-[#0d1424]"
                          : "border-[#1e2d47] bg-[#0d1424]/50 hover:border-[#1e2d47]/80 hover:bg-[#0d1424]"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-karla font-bold text-white text-base">
                              {job.role}
                            </h3>
                            {job.current && (
                              <span className="px-2 py-0.5 text-xs font-karla font-medium bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20 rounded-full">
                                Actual
                              </span>
                            )}
                          </div>
                          <p className="font-karla text-[#00ff87] font-medium text-sm">
                            {job.company}
                            {job.client && (
                              <span className="text-[#6b7fa3] font-normal">
                                {" "}
                                — {job.client}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-karla text-sm text-white font-medium">
                            {job.period}
                          </p>
                          <p className="font-karla text-xs text-[#6b7fa3] mt-0.5">
                            {job.location}
                          </p>
                        </div>
                      </div>

                      {/* Expand icon */}
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex flex-wrap gap-1.5">
                          {job.stack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-xs font-karla text-[#6b7fa3] border border-[#1e2d47] rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {job.stack.length > 3 && (
                            <span className="px-2 py-0.5 text-xs font-karla text-[#6b7fa3]">
                              +{job.stack.length - 3}
                            </span>
                          )}
                        </div>
                        <span
                          className={`ml-auto text-[#6b7fa3] transition-transform duration-300 ${
                            expanded === i ? "rotate-180" : ""
                          }`}
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
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  {expanded === i && (
                    <div className="border border-t-0 border-[#00ff87]/20 rounded-b-lg bg-[#0d1424] px-6 pb-6">
                      <ul className="space-y-2 pt-4">
                        {job.bullets.map((bullet, bi) => (
                          <li
                            key={bi}
                            className="flex items-start gap-3 font-karla text-sm text-[#6b7fa3] leading-relaxed"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#00ff87] flex-shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[#1e2d47]">
                        {job.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs font-karla text-[#6b7fa3] border border-[#1e2d47] rounded hover:border-[#00ff87]/30 hover:text-white transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
