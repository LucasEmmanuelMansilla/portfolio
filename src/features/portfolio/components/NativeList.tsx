import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/cn";

interface NativeListSectionProps {
  readonly title?: string;
  readonly children: ReactNode;
  readonly className?: string;
}

export function NativeListSection({
  title,
  children,
  className,
}: NativeListSectionProps) {
  return (
    <section className={cn("space-y-2", className)}>
      {title && (
        <h3 className="px-4 text-xs font-medium text-muted">{title}</h3>
      )}
      <div className="overflow-hidden rounded-xl border border-border/50 bg-surface/80">
        {children}
      </div>
    </section>
  );
}

interface NativeListRowProps {
  readonly label: string;
  readonly value?: string;
  readonly detail?: string;
  readonly icon?: ReactNode;
  readonly href?: string;
  readonly external?: boolean;
  readonly onClick?: () => void;
  readonly showChevron?: boolean;
  readonly isLast?: boolean;
}

export function NativeListRow({
  label,
  value,
  detail,
  icon,
  href,
  external,
  onClick,
  showChevron = Boolean(onClick || href),
  isLast = false,
}: NativeListRowProps) {
  const content = (
    <>
      {icon && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ios/10 text-ios">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        {label && <p className="text-sm text-text">{label}</p>}
        {value && (
          <p className="truncate text-xs text-muted mt-0.5">{value}</p>
        )}
        {detail && (
          <p className="text-xs text-muted mt-1 leading-relaxed">{detail}</p>
        )}
      </div>
      {showChevron && (
        <ChevronRight className="h-4 w-4 shrink-0 text-muted/60" />
      )}
    </>
  );

  const rowClass = cn(
    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
    !isLast && "border-b border-border/40",
    (onClick || href) && "active:bg-white/5"
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={rowClass}
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={rowClass}>
        {content}
      </button>
    );
  }

  return <div className={rowClass}>{content}</div>;
}
