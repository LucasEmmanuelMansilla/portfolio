"use client";

import { Briefcase, Home, MessageCircle, User } from "lucide-react";
import { m } from "framer-motion";
import { useAppNavStore } from "@/src/store/appNavStore";
import type { AppTab } from "@/src/types/portfolio";
import { cn } from "@/src/lib/cn";

interface TabItem {
  readonly id: AppTab;
  readonly label: string;
  readonly icon: typeof Home;
}

const tabs: readonly TabItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "about", label: "About", icon: User },
  { id: "chat", label: "AI", icon: MessageCircle },
];

export function BottomTabBar() {
  const activeTab = useAppNavStore((state) => state.activeTab);
  const setActiveTab = useAppNavStore((state) => state.setActiveTab);

  return (
    <nav
      className="z-10 shrink-0 border-t border-border/50 bg-surface/95 backdrop-blur-xl pt-1.5 pb-0.5 sm:pt-2 sm:pb-1"
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
                "relative flex flex-col items-center justify-center gap-1 min-w-[44px] px-3 py-2 rounded-2xl transition-colors",
                isActive ? "text-ios" : "text-muted hover:text-text"
              )}
            >
              {isActive && (
                <m.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-2xl bg-ios/12"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "w-[12px] h-[12px] relative z-10",
                  isActive && "stroke-[2.25]"
                )}
              />
              <span
                className={cn(
                  "text-[8px] relative z-10 leading-none",
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
