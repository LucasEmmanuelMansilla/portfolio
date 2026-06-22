export type PlatformOS = "macos" | "mobile";

export type DevicePlatform = "ios";

export type BootPhase = "boot" | "metro" | "emulator" | "splash" | "app";

export interface PlatformInfo {
  readonly os: PlatformOS;
  readonly device: DevicePlatform;
  readonly isMobile: boolean;
  readonly showDesktop: boolean;
  readonly showEmulator: boolean;
}
