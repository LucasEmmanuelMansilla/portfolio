"use client";

import { useQuery } from "@tanstack/react-query";
import type { VSCodeFileResponse } from "@/src/features/vscode/types/vscode";

async function fetchVSCodeFile(path: string): Promise<VSCodeFileResponse> {
  const response = await fetch(
    `/api/vscode/file?path=${encodeURIComponent(path)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to load file: ${response.status}`);
  }

  return response.json() as Promise<VSCodeFileResponse>;
}

export function useVSCodeFile(path: string | null) {
  return useQuery({
    queryKey: ["vscode-file", path],
    queryFn: () => fetchVSCodeFile(path as string),
    enabled: Boolean(path),
    staleTime: 30_000,
  });
}
