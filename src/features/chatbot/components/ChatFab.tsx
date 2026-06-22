"use client";

import { MessageCircle } from "lucide-react";
import { m } from "framer-motion";
import { useAppNavStore } from "@/src/store/appNavStore";

export function ChatFab() {
  const setActiveTab = useAppNavStore((state) => state.setActiveTab);
  const chatFabVisible = useAppNavStore((state) => state.chatFabVisible);

  if (!chatFabVisible) return null;

  return (
    <m.button
      type="button"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => setActiveTab("chat")}
      aria-label="Abrir asistente IA"
      className="absolute right-4 bottom-28 z-30 w-11 h-11 rounded-full shadow-lg flex items-center justify-center text-white bg-ios shadow-ios/30"
    >
      <MessageCircle className="w-5 h-5" />
    </m.button>
  );
}
