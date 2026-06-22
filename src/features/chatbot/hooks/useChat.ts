"use client";

import { useCallback, useRef, useState } from "react";

export interface Message {
  readonly id: string;
  readonly role: "user" | "assistant";
  readonly content: string;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useChat() {
  const [messages, setMessages] = useState<readonly Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading) return;

      setError(null);

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: trimmed,
      };

      const assistantId = generateId();
      const assistantPlaceholder: Message = {
        id: assistantId,
        role: "assistant",
        content: "",
      };

      const historyForApi = [...messages, userMessage].map((message) => ({
        role: message.role,
        content: message.content,
      }));

      setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: historyForApi }),
          signal: controller.signal,
        });

        if (!response.ok) {
          let errorMessage = "No se pudo obtener una respuesta.";
          try {
            const data = (await response.json()) as { error?: string };
            if (data.error) errorMessage = data.error;
          } catch {
            /* use default */
          }
          throw new Error(errorMessage);
        }

        if (!response.body) {
          throw new Error("Streaming not supported");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulated += decoder.decode(value, { stream: true });

          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantId
                ? { ...message, content: accumulated }
                : message
            )
          );
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        const message =
          err instanceof Error ? err.message : "Error inesperado";
        setError(message);

        setMessages((prev) =>
          prev.filter(
            (item) => !(item.id === assistantId && item.content === "")
          )
        );
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [isLoading, messages]
  );

  const clearChat = useCallback(() => {
    stopGeneration();
    setMessages([]);
    setError(null);
  }, [stopGeneration]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    stopGeneration,
    clearChat,
  };
}
