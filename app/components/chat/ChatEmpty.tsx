"use client";

interface ChatEmptyProps {
  onSuggestion: (text: string) => void;
  disabled?: boolean;
}

const suggestions = [
  "¿En qué empresas trabajaste?",
  "¿Cuál es tu stack técnico?",
  "Tell me about your fintech experience",
];

export default function ChatEmpty({ onSuggestion, disabled }: ChatEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8 text-center">
      <div className="w-12 h-12 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-[#00ff87]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </div>
      <p className="text-sm text-[#6b7fa3] mb-1 font-karla">
        Asistente del portfolio
      </p>
      <p className="text-xs text-[#2a3a55] mb-6 font-karla max-w-[240px]">
        Preguntame sobre experiencia, proyectos, tecnologías y más.
      </p>
      <div className="flex flex-col gap-2 w-full max-w-[280px]">
        {suggestions.map((text) => (
          <button
            key={text}
            type="button"
            disabled={disabled}
            onClick={() => onSuggestion(text)}
            className="text-left text-xs px-3 py-2 rounded-lg border border-[#1e2d47] bg-[#0d1424] text-[#6b7fa3] hover:border-[#00ff87]/40 hover:text-[#e8edf5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-karla"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
