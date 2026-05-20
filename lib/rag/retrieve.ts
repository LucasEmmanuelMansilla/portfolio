import type { KnowledgeChunk, RetrievedChunk } from "./types";

const DEFAULT_TOP_K = 6;
/** Floor for the best match; semantic scores for short questions vs CV chunks are often 0.4–0.55 */
const DEFAULT_MIN_BEST_SCORE = 0.32;

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dot / denominator;
}

/** Boost chunks when the query is about jobs/companies and the chunk mentions employers */
function keywordBoost(query: string, chunkText: string): number {
  const q = query.toLowerCase();
  const t = chunkText.toLowerCase();

  const isJobQuery =
    /empresa|compañ[ií]a|trabaj|trabajo|work|company|companies|experiencia|experience|empleo|employer|donde\s+trab|worked\s+for|jobs?/i.test(
      q
    );

  if (!isJobQuery) return 0;

  const employers = [
    "mindteck",
    "mobile computing",
    "flux it",
    "ntt data",
    "pako wallet",
    "juntos",
    "banco",
    "ypf ruta",
  ];

  let boost = 0;
  if (/experiencia\s+profesional|professional\s+experience/i.test(t)) {
    boost += 0.04;
  }
  for (const name of employers) {
    if (t.includes(name)) boost += 0.06;
  }
  if (/react native developer|mobile developer/i.test(t)) {
    boost += 0.02;
  }

  return Math.min(boost, 0.18);
}

export function retrieve(
  chunks: KnowledgeChunk[],
  queryEmbedding: number[],
  queryText?: string,
  options?: {
    topK?: number;
    minBestScore?: number;
  }
): RetrievedChunk[] {
  const topK = options?.topK ?? DEFAULT_TOP_K;
  const minBestScore = options?.minBestScore ?? DEFAULT_MIN_BEST_SCORE;

  const scored = chunks
    .map((chunk) => {
      let score = cosineSimilarity(chunk.embedding, queryEmbedding);
      if (queryText) {
        score += keywordBoost(queryText, chunk.text);
      }
      return {
        id: chunk.id,
        text: chunk.text,
        score,
        metadata: chunk.metadata,
      };
    })
    .sort((a, b) => b.score - a.score);

  const top = scored.slice(0, topK);

  if (top.length === 0 || top[0].score < minBestScore) {
    return [];
  }

  return top;
}

export function formatContext(chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) {
    return "No hay contexto relevante disponible para esta consulta.";
  }

  return chunks.map((chunk) => chunk.text).join("\n---\n");
}
