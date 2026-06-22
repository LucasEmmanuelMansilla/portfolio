"use client";

import dynamic from "next/dynamic";
import { StatusBar } from "@/src/components/device/StatusBar";
import { HomeIndicator } from "@/src/components/device/HomeIndicator";
import { AppHeader } from "@/src/features/portfolio/components/AppHeader";
import { BottomTabBar } from "@/src/features/portfolio/components/BottomTabBar";
import { ScreenTransition } from "@/src/features/portfolio/components/ScreenTransition";
import { AboutScreen } from "@/src/features/portfolio/screens/AboutScreen";
import { HomeScreen } from "@/src/features/portfolio/screens/HomeScreen";
import { ProjectDetailSheet } from "@/src/features/portfolio/screens/ProjectDetailSheet";
import { ProjectsScreen } from "@/src/features/portfolio/screens/ProjectsScreen";
import { useAppNavStore } from "@/src/store/appNavStore";
import type { AppTab } from "@/src/types/portfolio";
import { cn } from "@/src/lib/cn";

const ChatScreen = dynamic(
  () =>
    import("@/src/features/chatbot/components/ChatScreen").then(
      (mod) => mod.ChatScreen
    ),
  { ssr: false }
);

const TAB_TITLES: Record<AppTab, string> = {
  home: "Inicio",
  projects: "Proyectos",
  about: "Perfil",
  chat: "Asistente",
};

function renderScreen(tab: AppTab) {
  switch (tab) {
    case "home":
      return <HomeScreen />;
    case "about":
      return <AboutScreen />;
    case "projects":
      return <ProjectsScreen />;
    case "chat":
      return <ChatScreen />;
    default:
      return <HomeScreen />;
  }
}

interface AppShellProps {
  readonly fullscreen?: boolean;
}

export function AppShell({ fullscreen = false }: AppShellProps) {
  const activeTab = useAppNavStore((state) => state.activeTab);
  const isChat = activeTab === "chat";
  const showDeviceChrome = !fullscreen;

  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-ios-surface",
        fullscreen && "fixed inset-0 z-50 h-dvh w-full"
      )}
    >
      {showDeviceChrome && <StatusBar light />}
      {!isChat && (
        <AppHeader
          title={TAB_TITLES[activeTab]}
          className={
            showDeviceChrome
              ? undefined
              : "pt-[max(0.5rem,env(safe-area-inset-top))]"
          }
        />
      )}
      <ScreenTransition screenKey={activeTab} animate={false}>
        {renderScreen(activeTab)}
      </ScreenTransition>
      <ProjectDetailSheet />
      {!isChat && <BottomTabBar />}
      <HomeIndicator light />
    </div>
  );
}
