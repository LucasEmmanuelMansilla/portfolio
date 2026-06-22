import { cn } from "@/src/lib/cn";

interface BrandIconProps {
  readonly className?: string;
}

export function FileExplorerIcon({ className }: BrandIconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M3 9.5A2.5 2.5 0 0 1 5.5 7h6.29c.66 0 1.3.26 1.76.73L15 9.5h11.5A2.5 2.5 0 0 1 29 12v2H3z"
        fill="#3aa0e3"
      />
      <path
        d="M3 12.5h25.4a1.6 1.6 0 0 1 1.58 1.86l-1.43 8.5A2.5 2.5 0 0 1 26.08 25H5.92a2.5 2.5 0 0 1-2.47-2.14l-1.43-8.5A1.6 1.6 0 0 1 3 12.5z"
        fill="#ffce54"
      />
    </svg>
  );
}

export function ChromeIcon({ className }: BrandIconProps) {
  return (
    <span
      className={cn("relative inline-block rounded-full", className)}
      style={{
        background:
          "conic-gradient(from 88deg, #ea4335 0deg 120deg, #34a853 120deg 240deg, #fbbc05 240deg 360deg)",
      }}
      aria-hidden
    >
      <span className="absolute inset-[22%] rounded-full bg-white" />
      <span className="absolute inset-[32%] rounded-full bg-[#4285f4]" />
    </span>
  );
}

export function VSCodeIcon({ className }: BrandIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#0098ff" aria-hidden>
      <path d="M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
    </svg>
  );
}

export function TerminalIcon({ className }: BrandIconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="7" fill="#0c1c2c" />
      <path
        d="M8 11l5 4.5-5 4.5"
        stroke="#5fd0ff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.5 21h8.5" stroke="#5fd0ff" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function GitHubIcon({ className }: BrandIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#ffffff" aria-hidden>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.69.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

export function FinderIcon({ className }: BrandIconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id="finder-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3ec1ff" />
          <stop offset="1" stopColor="#1a85e0" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill="url(#finder-g)" />
      <path d="M16 5v22" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="11" cy="12" r="1.4" fill="#0c2b4d" />
      <circle cx="21" cy="12" r="1.4" fill="#ffffff" />
      <path
        d="M10.5 20c1.6 1.8 3.4 2.6 5.5 2.6s3.9-.8 5.5-2.6"
        fill="none"
        stroke="#0c2b4d"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SafariIcon({ className }: BrandIconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#1f9bf0" />
      <circle cx="24" cy="24" r="18" fill="#f4f7fb" />
      <path d="M24 24 33 15 27 27z" fill="#ff5a4d" />
      <path d="M24 24 15 33 21 21z" fill="#d8dde6" />
      <circle cx="24" cy="24" r="1.6" fill="#34495e" />
    </svg>
  );
}

export function XcodeIcon({ className }: BrandIconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id="xcode-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2aa4f4" />
          <stop offset="1" stopColor="#1175e0" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill="url(#xcode-g)" />
      <path
        d="M9 21l6.4-10.6a.7.7 0 0 1 1.2 0L23 21"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13 21h6" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
