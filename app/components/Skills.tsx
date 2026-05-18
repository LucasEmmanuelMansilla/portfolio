"use client";

import { useEffect, useRef, useState } from "react";

interface SkillGroup {
  category: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Core Mobile",
    items: [
      "React Native",
      "TypeScript",
      "JavaScript",
      "React Navigation",
      "Expo",
    ],
  },
  {
    category: "State & Data",
    items: ["Redux Toolkit", "Zustand", "TanStack Query", "Context API", "Redux"],
  },
  {
    category: "Web & Backend",
    items: ["React", "Next.js", "Node.js", "REST APIs", "Firebase"],
  },
  {
    category: "Pagos & Seguridad",
    items: [
      "Apple Pay",
      "Google Pay",
      "Thales",
      "Fiserv",
      "Prisma",
      "Face ID / Touch ID",
      "Biometrics",
      "Jumio (KYC)",
    ],
  },
  {
    category: "Analytics & Push",
    items: ["Segment", "OneSignal", "Branch.io", "Firebase Analytics"],
  },
  {
    category: "Mapas & Geo",
    items: ["Google Maps SDK", "Geolocation API"],
  },
  {
    category: "Bases de datos",
    items: ["MongoDB", "PostgreSQL", "Firebase Firestore"],
  },
  {
    category: "Herramientas",
    items: ["Git", "GitHub", "GitLab", "Jira", "Confluence", "VS Code"],
  },
  {
    category: "Metodologías",
    items: ["Scrum", "Agile", "Code Review", "CI/CD", "Mentoría"],
  },
];

export default function Skills() {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="relative py-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d47] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-[#00ff87] font-bebas tracking-widest text-sm mb-2">
            TECNOLOGÍAS
          </p>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
            Stack
            <br />
            <span className="text-[#6b7fa3]">técnico</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className={`p-5 border border-[#1e2d47] rounded-lg bg-[#0d1424]/50 hover:border-[#00ff87]/25 transition-all duration-500 hover:bg-[#0d1424] ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${gi * 80}ms` }}
            >
              <h3 className="font-bebas text-[#00ff87] tracking-widest text-xs mb-4 uppercase">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-karla text-[#e8edf5] bg-[#131d30] border border-[#1e2d47] rounded hover:border-[#00ff87]/40 hover:text-white transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Languages bar */}
        <div
          className={`mt-8 p-5 border border-[#1e2d47] rounded-lg bg-[#0d1424]/50 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "720ms" }}
        >
          <h3 className="font-bebas text-[#00ff87] tracking-widest text-xs mb-4 uppercase">
            Idiomas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { lang: "Español", level: "Nativo", pct: 100 },
              { lang: "Inglés", level: "Básico — lectura técnica", pct: 35 },
            ].map((l) => (
              <div key={l.lang}>
                <div className="flex justify-between mb-2">
                  <span className="font-karla text-sm text-white font-medium">
                    {l.lang}
                  </span>
                  <span className="font-karla text-xs text-[#6b7fa3]">
                    {l.level}
                  </span>
                </div>
                <div className="h-1 bg-[#1e2d47] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00ff87] rounded-full transition-all duration-1000"
                    style={{ width: visible ? `${l.pct}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
