import { cn } from "@/src/lib/cn";
import type { DisplayedLog } from "@/src/features/terminal/hooks/useTypewriterLogs";

interface TypingLineProps {
  readonly log: DisplayedLog;
}

const colorMap = {
  default: "text-[#cccccc]",
  success: "text-[#4ec9b0]",
  info: "text-[#569cd6]",
  warn: "text-[#dcdcaa]",
};

export function TypingLine({ log }: TypingLineProps) {
  return (
    <div className={cn("font-mono text-[13px] leading-relaxed", colorMap[log.color ?? "default"])}>
      {log.displayedText}
      {!log.complete && (
        <span className="inline-block w-2 h-4 bg-accent ml-0.5 animate-pulse align-middle" />
      )}
    </div>
  );
}
