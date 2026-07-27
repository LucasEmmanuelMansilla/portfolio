import {
  createHighlighter,
  type BundledLanguage,
  type Highlighter,
} from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

const SUPPORTED_LANGS = [
  "typescript",
  "tsx",
  "javascript",
  "jsx",
  "json",
  "css",
  "markdown",
  "mdx",
  "html",
  "xml",
] as const satisfies readonly BundledLanguage[];

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["dark-plus"],
      langs: [...SUPPORTED_LANGS],
    });
  }

  return highlighterPromise;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function plainCodeHtml(code: string): string {
  return `<pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4" tabindex="0"><code>${escapeHtml(code)}</code></pre>`;
}

export async function highlightCode(
  code: string,
  language: string
): Promise<string> {
  const supported = (SUPPORTED_LANGS as readonly string[]).includes(language);

  if (!supported) {
    return plainCodeHtml(code);
  }

  const highlighter = await getHighlighter();

  return highlighter.codeToHtml(code, {
    lang: language as BundledLanguage,
    theme: "dark-plus",
  });
}
