"use client";

import { m } from "framer-motion";
import { bootMessages } from "@/src/features/boot/data/bootSteps";
import { Wallpaper } from "@/src/features/boot/components/Wallpaper";
import { fadeUpVariants, springGentle } from "@/src/lib/motion";

export function MacOSDesktop() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Wallpaper />

      <div className="absolute top-0 left-0 right-0 h-7 bg-black/30 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 text-[11px] text-white/80">
        <div className="flex items-center gap-3">
          <span className="font-semibold"></span>
          <span>Finder</span>
          <span>Terminal</span>
          <span>Xcode</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Wi-Fi</span>
          <span>100%</span>
          <span>Mar 9 9:41</span>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-2 px-2 py-2 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/15">
        {["Finder", "Terminal", "Xcode", "Simulator"].map((app) => (
          <div
            key={app}
            className="w-11 h-11 rounded-xl bg-gradient-to-b from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-[8px] text-white/70"
          >
            {app.slice(0, 3)}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <m.div
          variants={fadeUpVariants}
          initial="initial"
          animate="animate"
          transition={springGentle}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl"></span>
          </div>
          <m.p
            className="text-white/70 text-sm font-karla"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {bootMessages.macos[0]}
          </m.p>
        </m.div>
      </div>
    </div>
  );
}
