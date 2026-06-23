"use client";

import { useEffect, useRef } from "react";
import { ChatComposer } from "@/src/features/chatbot/components/ChatComposer";
import { ChatEmpty } from "@/src/features/chatbot/components/ChatEmpty";
import { ChatHeader } from "@/src/features/chatbot/components/ChatHeader";
import { MessageBubble } from "@/src/features/chatbot/components/MessageBubble";
import { useChat } from "@/src/features/chatbot/hooks/useChat";
import { useAppNavStore } from "@/src/store/appNavStore";

export function ChatScreen() {
  const goBackFromChat = useAppNavStore((state) => state.goBackFromChat);
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    stopGeneration,
    clearChat,
  } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages, isLoading]);

  const lastMessage = messages[messages.length - 1];
  const isStreaming =
    isLoading &&
    lastMessage?.role === "assistant" &&
    lastMessage.content.length > 0;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ChatHeader
        onBack={goBackFromChat}
        onClear={clearChat}
        canClear={messages.length > 0}
        isLoading={isLoading}
      />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 min-h-0"
        role="log"
        aria-live="polite"
        aria-label="Conversación con el asistente"
      >
        {messages.length === 0 ? (
          <ChatEmpty onSuggestion={sendMessage} disabled={isLoading} />
        ) : (
          messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              isStreaming={
                isStreaming &&
                index === messages.length - 1 &&
                message.role === "assistant"
              }
            />
          ))
        )}
        {error && (
      <p className="mt-2 rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-[11px] text-red-500">
            {error}
          </p>
        )}
      </div>
      <ChatComposer
        onSend={sendMessage}
        onStop={stopGeneration}
        isLoading={isLoading}
      />
    </div>
  );
}
