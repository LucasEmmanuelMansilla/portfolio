import type { ExperienceState } from "@/src/types/experience";

export interface MetroLogLine {
  readonly text: string;
  readonly delayMs: number;
  readonly color?: "default" | "success" | "info" | "warn";
}

export type MetroSegmentKind = "line" | "blank" | "box" | "bundle";

export interface MetroBoxLine {
  readonly text: string;
  readonly bold?: boolean;
  readonly link?: boolean;
}

export interface MetroSegment {
  readonly id: string;
  readonly kind: MetroSegmentKind;
  readonly text?: string;
  readonly tone?: "dim" | "normal" | "bright";
  readonly boxLines?: readonly MetroBoxLine[];
  readonly delayMs: number;
}

const METRO_BOX: readonly MetroBoxLine[] = [
  { text: "Running Metro Bundler on port 8081.", bold: true },
  { text: "" },
  {
    text: "Keep Metro running while developing on any JS projects. Feel free to",
  },
  { text: "close this tab and run your own Metro instance if you prefer." },
  { text: "" },
  { text: "https://github.com/facebook/react-native", link: true },
];

const PROJECT_PATH = "/Users/lucas/portfolio-app";

function line(
  id: string,
  text: string,
  delayMs: number,
  tone: MetroSegment["tone"] = "normal"
): MetroSegment {
  return { id, kind: "line", text, tone, delayMs };
}

function blank(id: string, delayMs: number): MetroSegment {
  return { id, kind: "blank", delayMs };
}

export function getMetroStartupSegments(): readonly MetroSegment[] {
  const nodeModules = `${PROJECT_PATH}/node_modules`;
  const appPath = `${PROJECT_PATH}/app`;

  return [
    line(
      "metro-scan",
      `Scanning folders for symlinks in ${nodeModules} (68ms)`,
      350,
      "dim"
    ),
    blank("metro-blank-1", 200),
    { id: "metro-box", kind: "box", boxLines: METRO_BOX, delayMs: 500 },
    blank("metro-blank-2", 250),
    line("metro-js", "Looking for JS files in", 350),
    line("metro-path", `   ${appPath}`, 300, "dim"),
    blank("metro-blank-3", 250),
    line("metro-start", "info Starting Metro Bundler...", 400, "bright"),
    line("metro-ready", "Metro Bundler ready.", 450, "bright"),
    blank("metro-blank-4", 300),
    line("metro-graph", "info Loading dependency graph...", 350),
    line("metro-graph-done", "Loading dependency graph, done.", 400),
    line("metro-build", "info Building JavaScript bundle...", 350),
    {
      id: "metro-bundle",
      kind: "bundle",
      text: "[ios, dev]",
      delayMs: 350,
    },
  ];
}

export function getInstallSegments(): readonly MetroSegment[] {
  return [
    blank("install-blank-1", 200),
    line("install-start", "info Installing application...", 400, "bright"),
    line(
      "install-path",
      `   ${PROJECT_PATH}/ios/build/Build/Products/Debug-iphonesimulator/PortfolioApp.app`,
      350,
      "dim"
    ),
    line("install-copy", "Copying bundle resources...", 400),
    line("install-sign", "Code signing completed.", 350),
    line("install-done", "Application installed successfully.", 450, "bright"),
  ];
}

export function getLaunchSegments(): readonly MetroSegment[] {
  return [
    blank("launch-blank-1", 200),
    line("launch-start", "info Launching application...", 400, "bright"),
    line("launch-sim", "info Connected to simulator...", 400, "bright"),
    line("launch-hermes", "Hermes engine initialized.", 350, "dim"),
    line("launch-fresh", "info Fast Refresh enabled", 400, "bright"),
    line("launch-loaded", "info Bundle loaded successfully", 450, "bright"),
  ];
}

export function getLiveReadySegments(): readonly MetroSegment[] {
  return [
    blank("live-blank-1", 300),
    line("live-ready", "info Fast Refresh ready", 200, "bright"),
    line("live-wait", "Waiting for changes...", 200, "dim"),
  ];
}

export function createNavigationLogSegment(screen: string): MetroSegment {
  return line(
    `nav-${screen}-${Date.now()}`,
    `info Navigated to ${screen}`,
    150,
    "normal"
  );
}

export function createPerformanceLogSegment(): MetroSegment {
  const ms = 12 + Math.floor(Math.random() * 12);
  return line(
    `perf-${Date.now()}`,
    `warn Performance: render ${ms}ms`,
    150,
    "dim"
  );
}

export const SEGMENTS_BY_STATE: Partial<
  Record<ExperienceState, () => readonly MetroSegment[]>
> = {
  STARTING_METRO: getMetroStartupSegments,
  INSTALLING_IPA: getInstallSegments,
  LAUNCHING_APPLICATION: getLaunchSegments,
  APPLICATION_READY: getLiveReadySegments,
};

/** @deprecated Use getMetroStartupSegments via MetroLogEngine */
export function getMetroSegments(): readonly MetroSegment[] {
  return getMetroStartupSegments();
}

export const metroLogsMobile: readonly MetroLogLine[] = [
  { text: "Metro Bundler", delayMs: 0, color: "info" },
  { text: "Building app...", delayMs: 500 },
  { text: "Bundling JavaScript...", delayMs: 800 },
  { text: "Launching...", delayMs: 600, color: "success" },
];

export const TYPEWRITER_SPEED_MS = 18;

export const TAB_SCREEN_NAMES: Record<string, string> = {
  home: "HomeScreen",
  projects: "ProjectsScreen",
  about: "AboutScreen",
  chat: "ChatScreen",
};
