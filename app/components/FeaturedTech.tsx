"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { featuredTechnologies, type FeaturedTechItem } from "../data/featured-tech";

function TechLogo({ item }: { item: FeaturedTechItem }) {
  const [failed, setFailed] = useState(false);
  const src = `/logos/${item.logoFile}`;

  if (failed) {
    const initials = item.name
      .split(/[\s.]+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#131d30] border border-[#1e2d47] font-bebas text-lg text-[#00ff87]"
        title={`Falta logo: public/logos/${item.logoFile}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className="relative h-12 w-12 shrink-0">
      <Image
        src={src}
        alt={`Logo ${item.name}`}
        width={48}
        height={48}
        className="h-12 w-12 object-contain"
        onError={() => setFailed(true)}
        unoptimized
      />
    </div>
  );
}

export default function FeaturedTech() {
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
    <section id="tecnologias" ref={ref} className="relative py-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d47] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-[#00ff87] font-bebas tracking-widest text-sm mb-2">
            STACK PRINCIPAL
          </p>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
            Tecnologías
            <br />
            <span className="text-[#6b7fa3]">destacadas</span>
          </h2>
          <p className="mt-4 max-w-xl font-karla text-sm text-[#6b7fa3] leading-relaxed">
            Herramientas con las que trabajo a diario en producción. Los logos
            viven en{" "}
            <code className="text-[#00ff87]/80 text-xs">public/logos/</code>
            {" — "}
            podés reemplazarlos por los oficiales cuando quieras.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {featuredTechnologies.map((item, i) => (
            <div
              key={item.id}
              className={`group flex flex-col items-center gap-3 p-5 border border-[#1e2d47] rounded-lg bg-[#0d1424]/50 hover:border-[#00ff87]/35 hover:bg-[#0d1424] transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
             {
              /**
               <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#131d30]/80 border border-[#1e2d47] group-hover:border-[#00ff87]/25 transition-colors">
                <TechLogo item={item} />
              </div>
               */
             } 
              <div className="text-center">
                <p className="font-karla text-sm font-semibold text-white leading-tight">
                  {item.name}
                </p>
                {item.category && (
                  <p className="mt-0.5 font-karla text-[10px] uppercase tracking-wider text-[#6b7fa3]">
                    {item.category}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
