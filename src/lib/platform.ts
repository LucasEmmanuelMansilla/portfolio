import type { DevicePlatform, PlatformInfo, PlatformOS } from "@/src/types/platform";

function detectOSFromUserAgent(ua: string): PlatformOS {
  const lower = ua.toLowerCase();

  if (/iphone|ipad|ipod|android|mobile/i.test(lower)) {
    return "mobile";
  }

  return "macos";
}

function getDevicePlatform(): DevicePlatform {
  return "ios";
}

export function detectPlatform(userAgent?: string): PlatformInfo {
  const ua =
    userAgent ??
    (typeof navigator !== "undefined" ? navigator.userAgent : "");

  const os = detectOSFromUserAgent(ua);
  const isMobile = os === "mobile";
  const device = getDevicePlatform();

  return {
    os: isMobile ? "mobile" : os,
    device,
    isMobile,
    showDesktop: !isMobile,
    showEmulator: !isMobile,
  };
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(max-width: 767px)").matches;
}

export function resolvePlatform(userAgent?: string): PlatformInfo {
  const detected = detectPlatform(userAgent);

  if (typeof window !== "undefined" && isMobileViewport()) {
    return {
      ...detected,
      os: "mobile",
      isMobile: true,
      showDesktop: false,
      showEmulator: false,
    };
  }

  return detected;
}
