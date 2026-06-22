import type { ContactItem } from "@/src/types/portfolio";

export const contactItems: readonly ContactItem[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/lucasemansilla",
    href: "https://www.linkedin.com/in/lucasemansilla/",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/lucasemansilla",
    href: "https://github.com/lucasemmanuelmansilla",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    value: "lucas_e_93@hotmail.com",
    href: "mailto:lucas_e_93@hotmail.com",
    external: false,
  },
  {
    id: "phone",
    label: "Teléfono",
    value: "+54 9 364 462-0191",
    href: "tel:+5493644620191",
    external: false,
  },
];
