import { extname } from "path";

const EXTENSION_LANGUAGE_MAP: Readonly<Record<string, string>> = {
  ".ts": "typescript",
  ".tsx": "tsx",
  ".js": "javascript",
  ".jsx": "jsx",
  ".mjs": "javascript",
  ".cjs": "javascript",
  ".json": "json",
  ".css": "css",
  ".md": "markdown",
  ".mdx": "mdx",
  ".svg": "xml",
  ".html": "html",
  ".txt": "plaintext",
};

export function languageFromPath(filePath: string): string {
  const ext = extname(filePath).toLowerCase();
  return EXTENSION_LANGUAGE_MAP[ext] ?? "plaintext";
}
