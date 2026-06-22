"use client";

import { ArrowUp, Square } from "lucide-react";
import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";

interface ChatComposerProps {
  readonly onSend: (message: string) => void;
  readonly onStop?: () => void;
  readonly isLoading?: boolean;
  readonly disabled?: boolean;
}

export function ChatComposer({
  onSend,
  onStop,
  isLoading,
  disabled,
}: ChatComposerProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled || isLoading) return;
    onSend(trimmed);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 120)}px`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border/50 p-3 bg-surface/95 shrink-0"
    >
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Escribí tu pregunta..."
          rows={1}
          disabled={disabled}
          aria-label="Mensaje para el asistente"
          className="flex-1 resize-none rounded-2xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-text placeholder:text-faint focus:outline-none focus:border-border disabled:opacity-50 max-h-[120px]"
        />
        {isLoading ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Detener generación"
            className="shrink-0 w-10 h-10 rounded-full border border-border text-muted hover:text-text flex items-center justify-center"
          >
            <Square className="w-4 h-4" fill="currentColor" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            aria-label="Enviar mensaje"
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-40 bg-ios text-white"
          >
            <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </form>
  );
}
