"use client";

import { m } from "framer-motion";
import { scaleInVariants, springGentle } from "@/src/lib/motion";
import { cn } from "@/src/lib/cn";

export function SplashScreen() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-ios-surface">
      <m.div
        variants={scaleInVariants}
        initial="initial"
        animate="animate"
        transition={springGentle}
        className="text-center"
      >
        <m.div
          className="w-20 h-20 mx-auto mb-6 rounded-[22px] border flex items-center justify-center bg-ios/20 border-ios/30"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-bebas text-3xl tracking-wider text-ios">LM</span>
        </m.div>
        <p className="text-base font-semibold text-ios">Portfolio</p>
        <p className="mt-1 text-xs text-ios-label-secondary font-karla">Lucas Mansilla</p>
        <m.div className="mt-8 w-24 h-1 rounded-full bg-ios-cell mx-auto overflow-hidden">
          <m.div
            className="h-full rounded-full bg-ios"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </m.div>
      </m.div>
    </div>
  );
}
