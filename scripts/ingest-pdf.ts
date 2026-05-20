import { config } from "dotenv";
import { createHash } from "crypto";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, resolve } from "path";
import OpenAI from "openai";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse") as (
  buffer: Buffer
) => Promise<{ text: string; numpages: number }>;

config({ path: ".env.local" });
config({ path: ".env" });

const CHUNK_SIZE = 550;
const CHUNK_OVERLAP = 80;
const EMBEDDING_BATCH_SIZE = 20;

interface RawChunk {
  id: string;
  text: string;
  metadata: { index: number };
}

function chunkText(text: string): RawChunk[] {
  const normalized = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const chunks: RawChunk[] = [];
  let start = 0;
  let index = 0;

  while (start < normalized.length) {
    let end = Math.min(start + CHUNK_SIZE, normalized.length);

    if (end < normalized.length) {
      const slice = normalized.slice(start, end);
      const lastBreak = Math.max(
        slice.lastIndexOf("\n\n"),
        slice.lastIndexOf(". "),
        slice.lastIndexOf("; ")
      );
      if (lastBreak > CHUNK_SIZE * 0.4) {
        end = start + lastBreak + 1;
      }
    }

    const chunkTextSlice = normalized.slice(start, end).trim();
    if (chunkTextSlice.length > 40) {
      const id = createHash("sha256")
        .update(`${index}:${chunkTextSlice}`)
        .digest("hex")
        .slice(0, 12);

      chunks.push({
        id,
        text: chunkTextSlice,
        metadata: { index },
      });
      index++;
    }

    if (end >= normalized.length) break;
    start = Math.max(end - CHUNK_OVERLAP, start + 1);
  }

  return chunks;
}

async function embedBatch(
  openai: OpenAI,
  texts: string[],
  model: string
): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model,
    input: texts,
  });

  return response.data
    .sort((a, b) => a.index - b.index)
    .map((item) => item.embedding);
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Error: OPENAI_API_KEY is required in .env.local");
    process.exit(1);
  }

  const pdfPath = resolve(
    process.cwd(),
    process.env.CV_PDF_PATH ??
      "../LUCAS MANSILLA - React Native Developer.pdf"
  );

  console.log(`Reading PDF: ${pdfPath}`);
  const buffer = readFileSync(pdfPath);
  const pdf = await pdfParse(buffer);

  console.log(`Extracted ${pdf.text.length} characters from ${pdf.numpages} pages`);

  const rawChunks = chunkText(pdf.text);
  console.log(`Created ${rawChunks.length} chunks`);

  const openai = new OpenAI({ apiKey });
  const embeddingModel =
    process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small";

  const chunksWithEmbeddings: Array<{
    id: string;
    text: string;
    embedding: number[];
    metadata: { index: number };
  }> = [];

  for (let i = 0; i < rawChunks.length; i += EMBEDDING_BATCH_SIZE) {
    const batch = rawChunks.slice(i, i + EMBEDDING_BATCH_SIZE);
    const texts = batch.map((c) => c.text);
    console.log(
      `Embedding batch ${Math.floor(i / EMBEDDING_BATCH_SIZE) + 1}/${Math.ceil(rawChunks.length / EMBEDDING_BATCH_SIZE)}...`
    );

    const embeddings = await embedBatch(openai, texts, embeddingModel);

    batch.forEach((chunk, idx) => {
      chunksWithEmbeddings.push({
        ...chunk,
        embedding: embeddings[idx],
      });
    });
  }

  const output = {
    version: 1,
    source: pdfPath,
    createdAt: new Date().toISOString(),
    chunks: chunksWithEmbeddings,
  };

  const outDir = join(process.cwd(), "data", "knowledge");
  const outPath = join(outDir, "chunks.json");

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, JSON.stringify(output, null, 2), "utf-8");

  console.log(`Saved ${chunksWithEmbeddings.length} chunks to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
