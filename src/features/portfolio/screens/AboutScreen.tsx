"use client";

import { FileText } from "lucide-react";
import { SafeArea } from "@/src/components/layout/SafeArea";
import { ExperienceTimeline } from "@/src/features/portfolio/components/sections/ExperienceTimeline";
import { TechSections } from "@/src/features/portfolio/components/sections/TechSections";
import {
  NativeListRow,
  NativeListSection,
} from "@/src/features/portfolio/components/NativeList";
import { achievements, resumeAssetPath } from "@/src/data/achievements";
import { aboutParagraphs, profile } from "@/src/data/profile";
import { certifications, education } from "@/src/data/techStack";

export function AboutScreen() {
  return (
    <SafeArea className="flex min-h-0 flex-1 flex-col" bottom={false}>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
        <NativeListSection className="px-4 pt-3">
          <NativeListRow
            label="Bio"
            detail={aboutParagraphs.join(" ")}
            showChevron={false}
            isLast
          />
        </NativeListSection>

        <NativeListSection title="Ubicación" className="px-4 pt-5">
          <NativeListRow
            label={profile.location}
            value={`${profile.phone} · Remoto`}
            showChevron={false}
            isLast
          />
        </NativeListSection>

        <NativeListSection title="Logros" className="px-4 pt-5">
          {achievements.map((item, index) => (
            <NativeListRow
              key={item.id}
              label={item.title}
              value={item.subtitle}
              detail={item.description}
              showChevron={false}
              isLast={index === achievements.length - 1}
            />
          ))}
        </NativeListSection>

        <NativeListSection title="Experiencia" className="px-4 pt-5">
          <div className="px-1 py-1">
            <ExperienceTimeline />
          </div>
        </NativeListSection>

        <NativeListSection title="Skills" className="px-4 pt-5">
          <div className="px-1 py-1">
            <TechSections />
          </div>
        </NativeListSection>

        <NativeListSection title="Educación" className="px-4 pt-5">
          {education.map((edu, index) => (
            <NativeListRow
              key={edu.title}
              label={edu.title}
              value={edu.institution}
              detail={edu.detail}
              showChevron={false}
              isLast={index === education.length - 1 && certifications.length === 0}
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

        <NativeListSection title="CV" className="px-4 pt-5 pb-2">
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
