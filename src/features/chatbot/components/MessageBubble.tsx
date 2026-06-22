"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Message } from "@/src/features/chatbot/hooks/useChat";
import { TypingDots } from "@/src/features/chatbot/components/TypingDots";
import { cn } from "@/src/lib/cn";

interface MessageBubbleProps {
  readonly message: Message;
  readonly isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex mb-3", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-ios text-white rounded-br-md"
            : "bg-surface-2 border border-border text-text rounded-bl-md"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="chat-markdown text-sm">
            {message.content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              <TypingDots />
            )}
            {isStreaming && message.content && (
              <span className="inline-block w-0.5 h-4 ml-0.5 animate-pulse align-middle bg-ios" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
