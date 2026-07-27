"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";

interface UseWindowDragOptions {
  readonly position: { readonly x: number; readonly y: number };
  readonly onPositionChange: (position: { x: number; y: number }) => void;
  readonly disabled?: boolean;
}

interface UseWindowDragResult {
  readonly onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
}

export function useWindowDrag({
  position,
  onPositionChange,
  disabled = false,
}: UseWindowDragOptions): UseWindowDragResult {
  const draggingRef = useRef(false);
  const originRef = useRef({ pointerX: 0, pointerY: 0, x: 0, y: 0 });

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (!draggingRef.current) {
        return;
      }

      const dx = event.clientX - originRef.current.pointerX;
      const dy = event.clientY - originRef.current.pointerY;

      onPositionChange({
        x: Math.max(0, originRef.current.x + dx),
        y: Math.max(28, originRef.current.y + dy),
      });
    },
    [onPositionChange]
  );

  const onPointerUp = useCallback(() => {
    draggingRef.current = false;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }, [onPointerMove]);

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (disabled || event.button !== 0) {
        return;
      }

      const target = event.target as HTMLElement;
      if (target.closest("[data-no-drag]")) {
        return;
      }

      draggingRef.current = true;
      originRef.current = {
        pointerX: event.clientX,
        pointerY: event.clientY,
        x: position.x,
        y: position.y,
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    },
    [disabled, onPointerMove, onPointerUp, position.x, position.y]
  );

  return { onPointerDown };
}
