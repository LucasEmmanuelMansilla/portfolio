import { readdirSync, statSync, writeFileSync, mkdirSync } from "fs";
import { join, relative, sep } from "path";

interface FileNode {
  name: string;
  path: string;
  type: "file";
}

interface FolderNode {
  name: string;
  path: string;
  type: "folder";
  children: TreeNode[];
}

type TreeNode = FileNode | FolderNode;

const ROOTS = ["src", "app"] as const;

const EXCLUDED_DIR_NAMES = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  "coverage",
  "__pycache__",
]);

const EXCLUDED_FILE_PATTERNS = [
  /^\.env/,
  /\.map$/,
  /\.lock$/,
  /\.log$/,
  /\.DS_Store$/,
  /\.woff2?$/,
  /\.ttf$/,
  /\.otf$/,
  /\.png$/,
  /\.jpe?g$/,
  /\.gif$/,
  /\.webp$/,
  /\.ico$/,
  /\.mp4$/,
  /\.webm$/,
  /\.pdf$/,
];

const ALLOWED_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".css",
  ".md",
  ".mdx",
  ".svg",
  ".html",
  ".txt",
]);

function toPosix(path: string): string {
  return path.split(sep).join("/");
}

function isExcludedFile(name: string): boolean {
  if (EXCLUDED_FILE_PATTERNS.some((pattern) => pattern.test(name))) {
    return true;
  }

  const extIndex = name.lastIndexOf(".");
  if (extIndex === -1) {
    return true;
  }

  const ext = name.slice(extIndex).toLowerCase();
  return !ALLOWED_EXTENSIONS.has(ext);
}

function walkDirectory(absDir: string, rootDir: string): TreeNode[] {
  const entries = readdirSync(absDir, { withFileTypes: true }).sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  const nodes: TreeNode[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".") && entry.name !== ".cursorrules") {
      continue;
    }

    const absPath = join(absDir, entry.name);
    const relPath = toPosix(relative(rootDir, absPath));

    if (entry.isDirectory()) {
      if (EXCLUDED_DIR_NAMES.has(entry.name)) {
        continue;
      }

      const children = walkDirectory(absPath, rootDir);
      if (children.length === 0) {
        continue;
      }

      nodes.push({
        name: entry.name,
        path: relPath,
        type: "folder",
        children,
      });
      continue;
    }

    if (!entry.isFile() || isExcludedFile(entry.name)) {
      continue;
    }

    try {
      const size = statSync(absPath).size;
      if (size > 250_000) {
        continue;
      }
    } catch {
      continue;
    }

    nodes.push({
      name: entry.name,
      path: relPath,
      type: "file",
    });
  }

  return nodes;
}

function main() {
  const projectRoot = process.cwd();
  const children: TreeNode[] = [];

  for (const root of ROOTS) {
    const abs = join(projectRoot, root);
    try {
      const nested = walkDirectory(abs, projectRoot);
      children.push({
        name: root,
        path: root,
        type: "folder",
        children: nested,
      });
    } catch (error) {
      console.warn(`[vscode:tree] Skipping missing root: ${root}`, error);
    }
  }

  const outDir = join(projectRoot, "src", "features", "vscode", "data");
  mkdirSync(outDir, { recursive: true });

  const outFile = join(outDir, "fileTree.json");
  writeFileSync(outFile, `${JSON.stringify(children, null, 2)}\n`, "utf8");
  console.log(`[vscode:tree] Wrote ${outFile} (${children.length} roots)`);
}

main();
