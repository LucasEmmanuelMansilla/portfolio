"use client";

import { Briefcase, Home, MessageCircle, User } from "lucide-react";
import { useAppNavStore } from "@/src/store/appNavStore";
import type { AppTab } from "@/src/types/portfolio";
import { cn } from "@/src/lib/cn";

interface TabItem {
  readonly id: AppTab;
  readonly label: string;
  readonly icon: typeof Home;
}

const tabs: readonly TabItem[] = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "projects", label: "Proyectos", icon: Briefcase },
  { id: "about", label: "Perfil", icon: User },
  { id: "chat", label: "Asistente", icon: MessageCircle },
];

export function BottomTabBar() {
  const activeTab = useAppNavStore((state) => state.activeTab);
  const setActiveTab = useAppNavStore((state) => state.setActiveTab);

  return (
    <nav
      className="z-10 shrink-0 border-t border-ios-separator bg-ios-grouped/95 backdrop-blur-xl pb-0.5 pt-1.5 shadow-[0_-1px_0_rgba(108,84,62,0.06)]"
      aria-label="Navegación principal"
    >
      <div className="flex items-stretch justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex min-w-[44px] flex-col items-center justify-center gap-0.5 px-3 py-1.5 transition-colors",
                isActive ? "text-ios" : "text-ios-label-secondary"
              )}
            >
              <Icon
                className={cn(
                  "relative z-10 h-[20px] w-[20px]",
                  isActive && "stroke-[2.25]"
                )}
              />
              <span
                className={cn(
                  "relative z-10 text-[9px] leading-none",
                  isActive && "font-semibold"
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
