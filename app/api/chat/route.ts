import { buildChatMessages } from "@/lib/ai/prompts";
import { embedText, getChatModel, getOpenAIClient } from "@/lib/ai/openai";
import { checkRateLimit } from "@/lib/api/rateLimit";
import { validateChatBody } from "@/lib/api/validateChat";
import { loadKnowledge } from "@/lib/rag/loadKnowledge";
import { formatContext, retrieve } from "@/lib/rag/retrieve";

export const runtime = "nodejs";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(ip);

    if (!rate.allowed) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rate.retryAfterMs ?? 60000) / 1000)),
          },
        }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const validation = validateChatBody(body);
    if (!validation.ok) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const { messages } = validation.data;
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");

    if (!lastUserMessage) {
      return Response.json({ error: "No user message found" }, { status: 400 });
    }

    const store = loadKnowledge();
    const queryEmbedding = await embedText(lastUserMessage.content);
    const retrieved = retrieve(
      store.chunks,
      queryEmbedding,
      lastUserMessage.content
    );
    const context = formatContext(retrieved);

    const openai = getOpenAIClient();
    const chatMessages = buildChatMessages(context, messages);

    const stream = await openai.chat.completions.create({
      model: getChatModel(),
      messages: chatMessages,
      stream: true,
      temperature: 0.3,
      max_tokens: 800,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content;
            if (delta) {
              controller.enqueue(encoder.encode(delta));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("[chat]", err);

    if (err instanceof Error) {
      if (err.message.includes("OPENAI_API_KEY")) {
        return Response.json(
          { error: "AI service is not configured" },
          { status: 503 }
        );
      }
      if (
        err.message.includes("Knowledge base") ||
        err.message.includes("chunks.json")
      ) {
        return Response.json(
          { error: "Knowledge base not ready. Run npm run ingest." },
          { status: 503 }
        );
      }
    }

    return Response.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
