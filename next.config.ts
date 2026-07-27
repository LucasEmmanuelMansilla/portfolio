import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/vscode/file": ["./src/**/*", "./app/**/*"],
  },
};

export default nextConfig;
