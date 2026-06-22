import { ChevronLeft, RotateCcw } from "lucide-react";
import { Avatar } from "@/src/components/ui/Avatar";
import { profile } from "@/src/data/profile";

interface ChatHeaderProps {
  readonly onBack: () => void;
  readonly onClear?: () => void;
  readonly canClear?: boolean;
  readonly isLoading?: boolean;
}

export function ChatHeader({
  onBack,
  onClear,
  canClear = false,
  isLoading = false,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver"
          className="p-1 -ml-1 rounded-lg hover:bg-white/5 text-ios shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <Avatar src={profile.avatarSlot} name={profile.name} size="sm" />
        <div>
          <p className="text-sm font-semibold text-text">AI Assistant</p>
          <p className="text-[10px] text-muted">
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 bg-ios" />
            {profile.name}
          </p>
        </div>
      </div>
      {canClear && onClear && (
        <button
          type="button"
          onClick={onClear}
          disabled={isLoading}
          aria-label="Nueva conversación"
          className="p-2 rounded-lg hover:bg-white/5 text-ios"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
