"use client";

import {
  Building2,
  CreditCard,
  ExternalLink,
  Fingerprint,
  Mail,
  Wallet,
} from "lucide-react";
import { Avatar } from "@/src/components/ui/Avatar";
import { SafeArea } from "@/src/components/layout/SafeArea";
import { ContactList } from "@/src/features/portfolio/components/sections/ContactList";
import {
  NativeListRow,
  NativeListSection,
} from "@/src/features/portfolio/components/NativeList";
import { getFintechProjects } from "@/src/data/projects";
import { profile } from "@/src/data/profile";
import { stats } from "@/src/data/stats";
import { useAppNavStore } from "@/src/store/appNavStore";
import { cn } from "@/src/lib/cn";

const FINTECH_ICONS = {
  banco: Building2,
  "pako-wallet": Wallet,
} as const;

export function HomeScreen() {
  const openProject = useAppNavStore((state) => state.openProject);
  const fintechProjects = getFintechProjects();

  return (
    <SafeArea className="flex min-h-0 flex-1 flex-col" bottom={false}>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
        <div className="flex flex-col items-center px-5 pb-6 pt-2">
          <Avatar
            src={profile.avatarSlot}
            name={profile.name}
            size="xl"
            variant="ios"
          />
          <h2 className="mt-4 text-center text-[18px] font-semibold leading-tight text-ios-label">
            {profile.name}
          </h2>
          <p className="mt-1 text-center text-[13px] text-ios-label-secondary">
            {profile.title}
          </p>
          {profile.available && (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-ios/15 px-2.5 py-0.5 text-[11px] font-medium text-ios">
              <span className="h-1.5 w-1.5 rounded-full bg-ios" aria-hidden />
              Disponible
            </span>
          )}
          <p className="mt-4 text-center text-[13px] leading-relaxed text-ios-label-secondary">
            {profile.summary}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {profile.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px]",
                  tag === "Fintech" || tag === "Banca"
                    ? "bg-ios/15 font-medium text-ios"
                    : "bg-ios-cell text-ios-label-secondary"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <NativeListSection
          title="Banca & Fintech"
          footer="Apps bancarias y billeteras digitales en producción."
          className="pt-2"
        >
          {fintechProjects.map((project, index) => {
            const Icon =
              FINTECH_ICONS[project.id as keyof typeof FINTECH_ICONS] ??
              CreditCard;

            return (
              <NativeListRow
                key={project.id}
                label={project.name}
                value={project.client}
                detail={project.impact}
                icon={<Icon className="h-4 w-4" />}
                onClick={() => openProject(project.id)}
                isLast={index === fintechProjects.length - 1}
              />
            );
          })}
        </NativeListSection>

        <NativeListSection title="Impacto en Fintech" className="pt-6">
          {stats.slice(0, 2).map((stat, index) => (
            <NativeListRow
              key={stat.label}
              label={`${stat.prefix ?? ""}${stat.value}${stat.suffix} ${stat.label}`}
              value={stat.sublabel}
              detail={stat.description}
              icon={
                index === 0 ? (
                  <Fingerprint className="h-4 w-4" />
                ) : (
                  <Wallet className="h-4 w-4" />
                )
              }
              showChevron={false}
              isLast={index === 1}
            />
          ))}
        </NativeListSection>

        <NativeListSection title="Contacto rápido" className="pt-6">
          <NativeListRow
            label="LinkedIn"
            value="Perfil profesional"
            href={profile.linkedin}
            external
            icon={<ExternalLink className="h-4 w-4" />}
          />
          <NativeListRow
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
            icon={<Mail className="h-4 w-4" />}
            isLast
          />
        </NativeListSection>

        <NativeListSection title="Más contacto" className="pt-6 pb-2">
          <ContactList grouped />
        </NativeListSection>
      </div>
    </SafeArea>
  );
}
