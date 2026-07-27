import { readFile } from "fs/promises";
import { resolve, normalize, sep } from "path";
import { NextResponse } from "next/server";
import { highlightCode } from "@/src/features/vscode/lib/highlightCode";
import { languageFromPath } from "@/src/features/vscode/lib/languageFromPath";

const ALLOWED_ROOTS = ["src", "app"] as const;
const MAX_FILE_BYTES = 250_000;

function toPosix(path: string): string {
  return path.split(sep).join("/");
}

function isAllowedPath(relativePath: string): boolean {
  if (!relativePath || relativePath.includes("\0")) {
    return false;
  }

  const normalized = toPosix(normalize(relativePath)).replace(/^(\.\/)+/, "");

  if (normalized.startsWith("..") || normalized.includes("/../")) {
    return false;
  }

  return ALLOWED_ROOTS.some(
    (root) => normalized === root || normalized.startsWith(`${root}/`)
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawPath = searchParams.get("path");

  if (!rawPath) {
    return NextResponse.json(
      { error: "Missing path query parameter" },
      { status: 400 }
    );
  }

  const relativePath = toPosix(normalize(rawPath)).replace(/^(\.\/)+/, "");

  if (!isAllowedPath(relativePath)) {
    return NextResponse.json({ error: "Path not allowed" }, { status: 403 });
  }

  const absolutePath = resolve(process.cwd(), relativePath);
  const projectRoot = resolve(process.cwd());

  if (!absolutePath.startsWith(projectRoot + sep) && absolutePath !== projectRoot) {
    return NextResponse.json({ error: "Path not allowed" }, { status: 403 });
  }

  try {
    const buffer = await readFile(absolutePath);

    if (buffer.byteLength > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "File too large" }, { status: 413 });
    }

    const code = buffer.toString("utf8");
    const language = languageFromPath(relativePath);
    const html = await highlightCode(code, language);
    const lineCount = code.length === 0 ? 0 : code.split(/\r?\n/).length;

    return NextResponse.json(
      {
        path: relativePath,
        language,
        lineCount,
        html,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=30, stale-while-revalidate=120",
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
