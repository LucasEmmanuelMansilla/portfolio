export interface KnowledgeChunk {
  id: string;
  text: string;
  embedding: number[];
  metadata?: {
    section?: string;
    index?: number;
  };
}

export interface KnowledgeStore {
  version: number;
  source: string;
  createdAt: string;
  chunks: KnowledgeChunk[];
}

export interface RetrievedChunk {
  id: string;
  text: string;
  score: number;
  metadata?: KnowledgeChunk["metadata"];
}
