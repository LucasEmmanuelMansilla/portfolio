import type { ChatMessage } from "@/lib/ai/prompts";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 20;

export interface ChatRequestBody {
  messages: ChatMessage[];
}

export function validateChatBody(
  body: unknown
): { ok: true; data: ChatRequestBody } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const { messages } = body as { messages?: unknown };

  if (!Array.isArray(messages) || messages.length === 0) {
    return { ok: false, error: "messages array is required" };
  }

  if (messages.length > MAX_MESSAGES) {
    return {
      ok: false,
      error: `Maximum ${MAX_MESSAGES} messages allowed`,
    };
  }

  const validated: ChatMessage[] = [];

  for (const msg of messages) {
    if (
      !msg ||
      typeof msg !== "object" ||
      !("role" in msg) ||
      !("content" in msg)
    ) {
      return { ok: false, error: "Each message must have role and content" };
    }

    const { role, content } = msg as { role: unknown; content: unknown };

    if (role !== "user" && role !== "assistant") {
      return { ok: false, error: "Message role must be user or assistant" };
    }

    if (typeof content !== "string" || content.trim().length === 0) {
      return { ok: false, error: "Message content must be a non-empty string" };
    }

    if (content.length > MAX_MESSAGE_LENGTH) {
      return {
        ok: false,
        error: `Message exceeds ${MAX_MESSAGE_LENGTH} characters`,
      };
    }

    validated.push({ role, content: content.trim() });
  }

  const lastUser = [...validated].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return { ok: false, error: "At least one user message is required" };
  }

  return { ok: true, data: { messages: validated } };
}
