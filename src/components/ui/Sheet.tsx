"use client";

import { AnimatePresence, m, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { sheetUpVariants, springSheet } from "@/src/lib/motion";
import { cn } from "@/src/lib/cn";

interface SheetProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly children: ReactNode;
  readonly title?: string;
  readonly className?: string;
}

const DISMISS_THRESHOLD = 120;

export function Sheet({
  open,
  onClose,
  children,
  title,
  className,
}: SheetProps) {
  const dragY = useMotionValue(0);
  const backdropOpacity = useTransform(dragY, [0, 240], [1, 0.35]);
  const sheetRef = useRef<HTMLDivElement>(null);

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

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
            style={{ opacity: backdropOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <m.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.35 }}
            style={{ y: dragY }}
            onDragEnd={(_, info) => {
              if (info.offset.y > DISMISS_THRESHOLD || info.velocity.y > 600) {
                onClose();
              }
            }}
            variants={sheetUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springSheet}
            className={cn(
              "absolute inset-x-0 bottom-0 z-50 max-h-[88%] rounded-t-[28px] border border-border bg-surface shadow-2xl overflow-hidden flex flex-col touch-pan-y",
              className
            )}
          >
            <div className="flex justify-center pt-3 pb-2 shrink-0 cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>
            {children}
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
