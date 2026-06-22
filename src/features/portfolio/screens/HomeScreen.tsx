"use client";

import { ExternalLink, Mail } from "lucide-react";
import { Avatar } from "@/src/components/ui/Avatar";
import { Badge } from "@/src/components/ui/Badge";
import { SafeArea } from "@/src/components/layout/SafeArea";
import { ContactList } from "@/src/features/portfolio/components/sections/ContactList";
import {
  NativeListRow,
  NativeListSection,
} from "@/src/features/portfolio/components/NativeList";
import { profile } from "@/src/data/profile";
import { stats } from "@/src/data/stats";

export function HomeScreen() {
  return (
    <SafeArea className="flex min-h-0 flex-1 flex-col" bottom={false}>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
        <NativeListSection className="px-4 pt-3">
          <div className="flex items-center gap-3 px-4 py-4">
            <Avatar src={profile.avatarSlot} name={profile.name} size="md" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-base font-semibold text-text">
                  {profile.name}
                </p>
                {profile.available && <Badge variant="ios">Disponible</Badge>}
              </div>
              <p className="truncate text-sm text-muted">{profile.title}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                {profile.summary}
              </p>
            </div>
          </div>
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

        <NativeListSection title="Impacto" className="px-4 pt-5">
          {stats.map((stat, index) => (
            <NativeListRow
              key={stat.label}
              label={`${stat.prefix ?? ""}${stat.value}${stat.suffix} ${stat.label}`}
              value={stat.sublabel}
              detail={stat.description}
              showChevron={false}
              isLast={index === stats.length - 1}
            />
          ))}
        </NativeListSection>

        <NativeListSection title="Contacto" className="px-4 pt-5">
          <ContactList grouped />
        </NativeListSection>
      </div>
    </SafeArea>
  );
}
