"use client";

import Image from "next/image";
import {
  NativeListRow,
  NativeListSection,
} from "@/src/features/portfolio/components/NativeList";
import {
  featuredTechnologies,
  languages,
  skillGroups,
} from "@/src/data/techStack";

const FINTECH_SKILL_CATEGORY = "Pagos & Seguridad";

export function TechSections() {
  const fintechSkills = skillGroups.find(
    (group) => group.category === FINTECH_SKILL_CATEGORY
  );
  const otherSkillGroups = skillGroups.filter(
    (group) => group.category !== FINTECH_SKILL_CATEGORY
  );

  return (
    <div className="space-y-6">
      <div className="mx-4">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {featuredTechnologies.map((tech) => (
            <div
              key={tech.id}
              className="flex w-[72px] shrink-0 flex-col items-center gap-1.5 rounded-[10px] border border-ios-separator/50 bg-ios-grouped p-3 shadow-sm shadow-[rgba(108,84,62,0.05)]"
            >
              <div className="relative h-9 w-9">
                <Image
                  src={`/logos/${tech.logoFile}`}
                  alt={tech.name}
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <span className="text-center text-[10px] leading-tight text-ios-label-secondary">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {fintechSkills && (
        <NativeListSection
          title={FINTECH_SKILL_CATEGORY}
          footer="Integraciones en producción con procesadores y wallets nativas."
        >
          {fintechSkills.items.map((item, index) => (
            <NativeListRow
              key={item}
              label={item}
              showChevron={false}
              isLast={index === fintechSkills.items.length - 1}
            />
          ))}
        </NativeListSection>
      )}

      {otherSkillGroups.map((group) => (
        <NativeListSection key={group.category} title={group.category}>
          {group.items.map((item, index) => (
            <NativeListRow
              key={item}
              label={item}
              showChevron={false}
              isLast={index === group.items.length - 1}
            />
          ))}
        </NativeListSection>
      ))}

      <NativeListSection title="Idiomas">
        {languages.map((lang, index) => (
          <div
            key={lang.lang}
            className={`px-4 py-[9px] ${index < languages.length - 1 ? "border-b border-ios-separator" : ""}`}
          >
            <div className="mb-2 flex justify-between text-[15px]">
              <span className="text-ios-label">{lang.lang}</span>
              <span className="text-ios-label-secondary">{lang.level}</span>
            </div>
            <div className="h-[4px] overflow-hidden rounded-full bg-ios-cell">
              <div
                className="h-full rounded-full bg-ios"
                style={{ width: `${lang.pct}%` }}
              />
            </div>
          </div>
        ))}
      </NativeListSection>
    </div>
  );
}
