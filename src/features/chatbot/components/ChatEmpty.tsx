interface ChatEmptyProps {
  readonly onSuggestion: (text: string) => void;
  readonly disabled?: boolean;
}

const suggestions = [
  "¿En qué empresas trabajaste?",
  "¿Cuál es tu stack técnico?",
  "Tell me about your fintech experience",
] as const;

export function ChatEmpty({ onSuggestion, disabled }: ChatEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8 text-center">
      <p className="text-sm text-muted mb-1">Asistente del portfolio</p>
      <p className="text-xs text-faint mb-6 max-w-[240px]">
        Preguntame sobre experiencia, proyectos, tecnologías y más.
      </p>
      <div className="flex flex-col gap-2 w-full max-w-[280px]">
        {suggestions.map((text) => (
          <button
            key={text}
            type="button"
            disabled={disabled}
            onClick={() => onSuggestion(text)}
            className="text-left text-xs px-3 py-2.5 rounded-xl border border-border bg-surface-2 text-muted hover:text-text hover:border-border transition-colors disabled:opacity-50"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
