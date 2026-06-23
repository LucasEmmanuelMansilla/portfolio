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
      <p className="mb-1 text-xs text-ios-label-secondary">Asistente del portfolio</p>
      <p className="mb-6 max-w-[240px] text-[11px] text-ios-label-tertiary">
        Preguntame sobre experiencia, proyectos, tecnologías y más.
      </p>
      <div className="flex flex-col gap-2 w-full max-w-[280px]">
        {suggestions.map((text) => (
          <button
            key={text}
            type="button"
            disabled={disabled}
            onClick={() => onSuggestion(text)}
            className="rounded-xl border border-ios-separator bg-ios-grouped px-3 py-2 text-left text-[11px] text-ios-label-secondary transition-colors active:bg-ios-label/[0.06] disabled:opacity-50"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
