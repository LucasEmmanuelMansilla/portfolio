"use client";

import { FileText } from "lucide-react";
import { SafeArea } from "@/src/components/layout/SafeArea";
import { ExperienceTimeline } from "@/src/features/portfolio/components/sections/ExperienceTimeline";
import { TechSections } from "@/src/features/portfolio/components/sections/TechSections";
import {
  NativeListRow,
  NativeListSection,
} from "@/src/features/portfolio/components/NativeList";
import { highlights } from "@/src/data/profile";
import { resumeAssetPath } from "@/src/data/achievements";
import { aboutParagraphs, profile } from "@/src/data/profile";
import { certifications, education } from "@/src/data/techStack";

export function AboutScreen() {
  return (
    <SafeArea className="flex min-h-0 flex-1 flex-col" bottom={false}>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
        <NativeListSection
          title="Sobre mí"
          footer="Especializado en apps bancarias, billeteras digitales y plataformas fintech."
          className="pt-2"
        >
          <div className="space-y-4 px-4 py-[11px]">
            {aboutParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 30)}
                className="text-[13px] leading-relaxed text-ios-label-secondary"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </NativeListSection>

        <NativeListSection title="Ubicación" className="pt-6">
          <NativeListRow
            label={profile.location}
            value={`${profile.phone} · Remoto`}
            showChevron={false}
            isLast
          />
        </NativeListSection>

        <NativeListSection title="Fortalezas" className="pt-6">
          {highlights.map((item, index) => (
            <NativeListRow
              key={item.title}
              label={item.title}
              detail={item.text}
              showChevron={false}
              isLast={index === highlights.length - 1}
            />
          ))}
        </NativeListSection>

        <NativeListSection title="Experiencia" className="pt-6">
          <ExperienceTimeline />
        </NativeListSection>

        <div className="pt-6">
          <TechSections />
        </div>

        <NativeListSection title="Educación" className="pt-6">
          {education.map((edu, index) => (
            <NativeListRow
              key={edu.title}
              label={edu.title}
              value={edu.institution}
              detail={edu.detail}
              showChevron={false}
              isLast={
                index === education.length - 1 && certifications.length === 0
              }
            />
          ))}
          {certifications.map((cert, index) => (
            <NativeListRow
              key={cert.title}
              label={cert.title}
              value={cert.institution}
              showChevron={false}
              isLast={index === certifications.length - 1}
            />
          ))}
        </NativeListSection>

        <NativeListSection title="CV" className="pt-6 pb-2">
          <NativeListRow
            label="Descargar CV"
            value="PDF — React Native Developer"
            href={resumeAssetPath}
            external
            icon={<FileText className="h-4 w-4" />}
            isLast
          />
        </NativeListSection>
      </div>
    </SafeArea>
  );
}
