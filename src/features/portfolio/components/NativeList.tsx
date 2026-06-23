import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/cn";

interface NativeListSectionProps {
  readonly title?: string;
  readonly footer?: string;
  readonly children: ReactNode;
  readonly className?: string;
}

export function NativeListSection({
  title,
  footer,
  children,
  className,
}: NativeListSectionProps) {
  return (
    <section className={cn("space-y-1.5", className)}>
      {title && (
        <h3 className="px-5 text-[11px] font-medium uppercase tracking-wide text-ios-label-secondary">
          {title}
        </h3>
      )}
      <div className="overflow-hidden rounded-[10px] border border-ios-separator/50 bg-ios-grouped shadow-sm shadow-[rgba(108,84,62,0.06)] mx-4">
        {children}
      </div>
      {footer && (
        <p className="px-5 text-[11px] leading-relaxed text-ios-label-secondary">
          {footer}
        </p>
      )}
    </section>
  );
}

interface NativeListRowProps {
  readonly label: string;
  readonly value?: string;
  readonly detail?: string;
  readonly icon?: ReactNode;
  readonly leading?: ReactNode;
  readonly href?: string;
  readonly external?: boolean;
  readonly onClick?: () => void;
  readonly showChevron?: boolean;
  readonly isLast?: boolean;
  readonly variant?: "default" | "inset";
}

export function NativeListRow({
  label,
  value,
  detail,
  icon,
  leading,
  href,
  external,
  onClick,
  showChevron = Boolean(onClick || href),
  isLast = false,
  variant = "default",
}: NativeListRowProps) {
  const leadingNode = leading ?? (icon ? (
    <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[6px] bg-ios text-white">
      {icon}
    </div>
  ) : null);

  const stackValue = Boolean(value && showChevron && !detail);

  const content = (
    <>
      {leadingNode}
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <p className="min-w-0 flex-1 truncate text-[15px] leading-snug text-ios-label">
            {label}
          </p>
          {value && !stackValue && !detail && (
            <p className="max-w-[45%] shrink-0 truncate text-[15px] text-ios-label-secondary">
              {value}
            </p>
          )}
        </div>
        {stackValue && value && (
          <p className="mt-0.5 truncate text-[13px] text-ios-label-secondary">
            {value}
          </p>
        )}
        {value && detail && (
          <p className="mt-0.5 truncate text-[13px] text-ios-label-secondary">
            {value}
          </p>
        )}
        {detail && (
          <p className="mt-1 text-[13px] leading-relaxed text-ios-label-secondary">
            {detail}
          </p>
        )}
      </div>
      {showChevron && (
        <span
          className="ml-1 flex w-5 shrink-0 items-center justify-end self-center"
          aria-hidden
        >
          <ChevronRight
            className="h-4 w-4 text-ios-label-secondary"
            strokeWidth={2.5}
          />
        </span>
      )}
    </>
  );

  const rowClass = cn(
    "flex w-full items-center gap-3 px-4 py-[9px] text-left transition-colors",
    !isLast && "border-b border-ios-separator",
    variant === "inset" && "pl-12",
    (onClick || href) && "active:bg-ios-label/[0.06]"
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
