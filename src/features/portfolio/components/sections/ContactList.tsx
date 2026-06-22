"use client";

import { Code, Link2, Mail, Phone } from "lucide-react";
import { contactItems } from "@/src/data/contact";
import { NativeListRow } from "@/src/features/portfolio/components/NativeList";

const iconMap = {
  linkedin: Link2,
  github: Code,
  email: Mail,
  phone: Phone,
};

interface ContactListProps {
  readonly grouped?: boolean;
}

export function ContactList({ grouped = false }: ContactListProps) {
  if (grouped) {
    return (
      <>
        {contactItems.map((item, index) => {
          const Icon = iconMap[item.id as keyof typeof iconMap] ?? Mail;

          return (
            <NativeListRow
              key={item.id}
              label={item.label}
              value={item.value}
              href={item.href}
              external={item.external}
              icon={<Icon className="h-4 w-4" />}
              isLast={index === contactItems.length - 1}
            />
          );
        })}
      </>
    );
  }

  return (
    <div className="space-y-3">
      {contactItems.map((item) => {
        const Icon = iconMap[item.id as keyof typeof iconMap] ?? Mail;

        return (
          <NativeListRow
            key={item.id}
            label={item.label}
            value={item.value}
            href={item.href}
            external={item.external}
            icon={<Icon className="h-4 w-4" />}
            isLast
          />
        );
      })}
    </div>
  );
}
