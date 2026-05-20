"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  onStop,
  isLoading,
  disabled,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled || isLoading) return;
    onSend(trimmed);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-[#1e2d47] p-3 bg-[#060810]"
    >
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Escribí tu pregunta..."
          rows={1}
          disabled={disabled}
          aria-label="Mensaje para el asistente"
          className="flex-1 resize-none rounded-xl border border-[#1e2d47] bg-[#0d1424] px-3 py-2.5 text-sm text-[#e8edf5] placeholder:text-[#2a3a55] focus:outline-none focus:border-[#00ff87]/50 font-karla disabled:opacity-50 max-h-[120px]"
        />
        {isLoading ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Detener generación"
            className="shrink-0 w-10 h-10 rounded-xl border border-[#1e2d47] text-[#6b7fa3] hover:text-[#e8edf5] hover:border-[#00ff87]/40 transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="1" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            aria-label="Enviar mensaje"
            className="shrink-0 w-10 h-10 rounded-xl bg-[#00ff87] text-[#060810] hover:bg-[#00cc6a] transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
