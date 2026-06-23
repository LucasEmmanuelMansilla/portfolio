"use client";

import {
  AnimatePresence,
  m,
  useDragControls,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { sheetUpVariants, springSheet } from "@/src/lib/motion";
import { cn } from "@/src/lib/cn";

interface SheetProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly children: ReactNode;
  readonly title?: string;
  readonly className?: string;
}

const DISMISS_THRESHOLD = 80;

export function Sheet({
  open,
  onClose,
  children,
  title,
  className,
}: SheetProps) {
  const dragY = useMotionValue(0);
  const backdropOpacity = useTransform(dragY, [0, 200], [1, 0.25]);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      dragY.set(0);
    }
  }, [open, dragY]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > DISMISS_THRESHOLD || info.velocity.y > 500) {
      onClose();
      return;
    }

    dragY.set(0);
  };

  const handleHandlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragControls.start(event);
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="absolute inset-0 z-[100] overflow-hidden"
          role="presentation"
        >
          <m.button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 cursor-default bg-ios-label/30"
            style={{ opacity: backdropOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <m.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0.28 }}
            style={{ y: dragY }}
            onDragEnd={handleDragEnd}
            variants={sheetUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springSheet}
            className={cn(
              "absolute inset-x-0 bottom-0 z-[101] flex max-h-[85%] flex-col overflow-hidden rounded-t-[14px] border border-ios-separator bg-ios-grouped shadow-2xl",
              className
            )}
          >
            <div className="grid shrink-0 grid-cols-[40px_1fr_40px] items-center px-2 pb-2 pt-3">
              <div aria-hidden />
              <div
                className="flex cursor-grab justify-center active:cursor-grabbing"
                onPointerDown={handleHandlePointerDown}
              >
                <div className="h-1 w-9 rounded-full bg-ios-label-tertiary" />
              </div>
              <button
                type="button"
                onClick={onClose}
                onPointerDown={(event) => event.stopPropagation()}
                aria-label="Cerrar"
                className="flex h-8 w-8 items-center justify-center justify-self-end rounded-full bg-ios-cell text-ios-label-secondary active:bg-ios-label/10"
              >
                <X className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain no-scrollbar">
              {children}
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
