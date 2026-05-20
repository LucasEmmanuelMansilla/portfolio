import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type { KnowledgeStore } from "./types";

let cachedStore: KnowledgeStore | null = null;

const CHUNKS_PATH = join(process.cwd(), "data", "knowledge", "chunks.json");

export function loadKnowledge(): KnowledgeStore {
  if (cachedStore) return cachedStore;

  if (!existsSync(CHUNKS_PATH)) {
    throw new Error(
      "Knowledge base not found. Run: npm run ingest (requires OPENAI_API_KEY in .env.local)"
    );
  }

  const raw = readFileSync(CHUNKS_PATH, "utf-8");
  cachedStore = JSON.parse(raw) as KnowledgeStore;

  if (!cachedStore.chunks?.length) {
    throw new Error("Knowledge base is empty. Run: npm run ingest");
  }

  return cachedStore;
}

export function clearKnowledgeCache(): void {
  cachedStore = null;
}
