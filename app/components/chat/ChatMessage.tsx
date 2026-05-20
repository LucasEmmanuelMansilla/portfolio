"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Message } from "@/hooks/useChat";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export default function ChatMessage({
  message,
  isStreaming,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm font-karla leading-relaxed ${
          isUser
            ? "bg-[#00ff87]/15 border border-[#00ff87]/25 text-[#e8edf5]"
            : "bg-[#0d1424] border border-[#1e2d47] text-[#e8edf5]"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="chat-markdown prose-invert text-sm">
            {message.content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              <span className="inline-flex gap-1 text-[#6b7fa3]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-bounce [animation-delay:300ms]" />
              </span>
            )}
            {isStreaming && message.content && (
              <span className="inline-block w-0.5 h-4 bg-[#00ff87] ml-0.5 animate-pulse align-middle" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
