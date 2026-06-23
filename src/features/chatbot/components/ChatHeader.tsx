import { ChevronLeft, RotateCcw } from "lucide-react";
import { Avatar } from "@/src/components/ui/Avatar";
import { profile } from "@/src/data/profile";
import { usePlatform } from "@/src/hooks/usePlatform";
import { cn } from "@/src/lib/cn";

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
  const { isMobile } = usePlatform();

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 border-b border-ios-separator bg-ios-surface/95 shrink-0",
        isMobile && "pt-[max(0.75rem,env(safe-area-inset-top))]"
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver"
          className="p-1 -ml-1 rounded-lg active:bg-ios-label/[0.06] text-ios shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <Avatar src={profile.avatarSlot} name={profile.name} size="sm" variant="ios" />
        <div>
          <p className="text-xs font-semibold text-ios-label">Asistente IA</p>
          <p className="text-[9px] text-ios-label-secondary">
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
          className="p-2 rounded-lg active:bg-ios-label/[0.06] text-ios"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
