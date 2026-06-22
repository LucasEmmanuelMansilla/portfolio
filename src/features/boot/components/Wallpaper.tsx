import { cn } from "@/src/lib/cn";

interface WallpaperConfig {
  readonly src: string;
  readonly fallback: string;
}

const macosWallpaper: WallpaperConfig = {
  src: "/images/HD-wallpaper-macos-catalina-stock-mountain-nebula-hill-desert-sci-fi.jpg",
  fallback:
    "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(255,120,80,0.35) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(80,140,255,0.3) 0%, transparent 50%), linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
};

interface WallpaperProps {
  readonly className?: string;
}

export function Wallpaper({ className }: WallpaperProps) {
  const { src, fallback } = macosWallpaper;

  return (
    <div
      className={cn("absolute inset-0 bg-cover bg-center bg-no-repeat", className)}
      style={{ backgroundImage: `url("${src}"), ${fallback}` }}
    />
  );
}
