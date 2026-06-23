/** Viewport aspect ratio (iPhone 9:19.5) */
export const SIMULATOR_ASPECT_RATIO = 9 / 19.5;

/** Responsive max width: compact on short viewports, larger on desktop (+20%) */
export const simulatorWindowSizeClass =
  "w-full max-w-[298px] [@media(max-height:800px)]:max-w-[283px] sm:max-w-[312px] md:max-w-[342px] lg:max-w-[366px] xl:max-w-[384px]";

export const simulatorViewportClass =
  "relative mx-auto aspect-[9/19.5] h-auto max-h-full w-full min-h-0 shrink overflow-hidden rounded-[14px] bg-black ring-1 ring-black/80";

/** @deprecated */
export const SIMULATOR_MAX_WIDTH_PX = 384;

/** @deprecated */
export const simulatorWindowMaxWidthClass = simulatorWindowSizeClass;
