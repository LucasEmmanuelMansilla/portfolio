"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import ChatEmpty from "./ChatEmpty";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

interface ChatPanelProps {
  onClose: () => void;
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
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
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading]);

  const lastMessage = messages[messages.length - 1];
  const isStreaming =
    isLoading && lastMessage?.role === "assistant" && lastMessage.content.length > 0;

  return (
    <div
      role="dialog"
      aria-label="Asistente IA del portfolio"
      className="flex flex-col w-[min(100vw-2rem,400px)] h-[min(70vh,560px)] rounded-2xl border border-[#1e2d47] bg-[#060810] shadow-2xl shadow-black/50 overflow-hidden"
      style={{
        boxShadow:
          "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,135,0.08)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2d47] bg-[#0d1424]/80 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
          <div>
            <p className="text-sm font-medium text-[#e8edf5] font-karla">
              AI Assistant
            </p>
            <p className="text-[10px] text-[#6b7fa3] font-karla">
              Lucas Mansilla · Portfolio
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearChat}
              disabled={isLoading}
              aria-label="Limpiar conversación"
              className="p-2 text-[#6b7fa3] hover:text-[#e8edf5] transition-colors disabled:opacity-50"
              title="Nueva conversación"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar chat"
            className="p-2 text-[#6b7fa3] hover:text-[#e8edf5] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-4 min-h-0"
      >
        {messages.length === 0 ? (
          <ChatEmpty
            onSuggestion={sendMessage}
            disabled={isLoading}
          />
        ) : (
          <>
            {messages.map((msg, i) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isStreaming={
                  isStreaming &&
                  i === messages.length - 1 &&
                  msg.role === "assistant"
                }
              />
            ))}
          </>
        )}
        {error && (
          <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 mt-2 font-karla">
            {error}
          </p>
        )}
      </div>

      <ChatInput
        onSend={sendMessage}
        onStop={stopGeneration}
        isLoading={isLoading}
      />
    </div>
  );
}
