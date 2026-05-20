import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const OWNER_NAME = "Lucas Mansilla";

function buildSystemPrompt(context: string): string {
  return `Sos el asistente IA del portfolio de ${OWNER_NAME}.

Tu trabajo es responder preguntas sobre:
- experiencia profesional
- tecnologías
- proyectos
- empresas
- estudios
- stack técnico

Reglas:
- Respondé únicamente usando el contexto proporcionado.
- Si la información no existe en el contexto, decí claramente que no está disponible en el portfolio.
- No inventes experiencia ni tecnologías.
- Mantené respuestas profesionales y naturales.
- Respondé en el idioma del usuario.
- Sé conciso pero útil.
- Cuando hables de tecnologías, incluí ejemplos prácticos solo si existen en el contexto.
- Cuando hables de proyectos, explicá impacto y stack técnico solo si están en el contexto.

<context>
${context}
</context>`;
}

export function buildChatMessages(
  context: string,
  history: ChatMessage[]
): ChatCompletionMessageParam[] {
  const system: ChatCompletionMessageParam = {
    role: "system",
    content: buildSystemPrompt(context),
  };

  const conversation: ChatCompletionMessageParam[] = history.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  return [system, ...conversation];
}
