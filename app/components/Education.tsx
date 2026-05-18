"use client";

import { useEffect, useRef, useState } from "react";

const education = [
  {
    type: "degree",
    title: "Ingeniería en Sistemas",
    institution: "UNCAus — Universidad Nacional del Chaco Austral",
    period: "2021 – Actualidad",
    location: "Chaco, Argentina",
    detail: "Actualmente cursando 4.º año de la carrera.",
    icon: "🎓",
  },
];

const certifications = [
  {
    title: "Desarrollador Web Full Stack MERN / Mobile Apps",
    institution: "MindHub LA",
    period: "2021",
    icon: "📜",
  },
  {
    title: "Node.js Esencial",
    institution: "LinkedIn Learning",
    period: "2021",
    icon: "📜",
  },
];

export default function Education() {
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
    <section id="educacion" ref={ref} className="relative py-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d47] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-[#00ff87] font-bebas tracking-widest text-sm mb-2">
            FORMACIÓN
          </p>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
            Educación
            <br />
            <span className="text-[#6b7fa3]">y certificaciones</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Degree */}
          {education.map((edu, i) => (
            <div
              key={edu.title}
              className={`p-7 border border-[#1e2d47] rounded-lg bg-[#0d1424]/50 hover:border-[#00ff87]/30 transition-all duration-500 hover:bg-[#0d1424] lg:col-span-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl mt-0.5">{edu.icon}</span>
                <div>
                  <h3 className="font-karla font-bold text-white text-lg leading-tight mb-1">
                    {edu.title}
                  </h3>
                  <p className="font-karla text-[#00ff87] text-sm font-medium mb-1">
                    {edu.institution}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-karla text-xs text-[#6b7fa3]">
                      {edu.period}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#1e2d47]" />
                    <span className="font-karla text-xs text-[#6b7fa3]">
                      {edu.location}
                    </span>
                  </div>
                  <p className="font-karla text-sm text-[#6b7fa3] leading-relaxed">
                    {edu.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Certifications */}
          <div
            className={`space-y-4 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            {certifications.map((cert, ci) => (
              <div
                key={cert.title}
                className="p-5 border border-[#1e2d47] rounded-lg bg-[#0d1424]/50 hover:border-[#00ff87]/30 hover:bg-[#0d1424] transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{cert.icon}</span>
                  <div>
                    <h3 className="font-karla font-semibold text-white text-sm leading-tight mb-1">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-karla text-xs text-[#00ff87]">
                        {cert.institution}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#1e2d47]" />
                      <span className="font-karla text-xs text-[#6b7fa3]">
                        {cert.period}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
