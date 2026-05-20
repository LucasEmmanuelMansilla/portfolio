# Portfolio — Lucas Mansilla

Portfolio personal construido con Next.js 16, React 19 y Tailwind CSS v4, con asistente IA integrado (RAG sobre CV).

## Requisitos

- Node.js 20+
- Cuenta OpenAI con API key

## Configuración local

```bash
cd portfolio-web
cp .env.example .env.local
```

Editá `.env.local` y agregá tu `OPENAI_API_KEY`.

### Generar base de conocimiento (RAG)

El asistente usa embeddings precomputados del CV en PDF:

```bash
npm install
npm run ingest
```

Esto lee el PDF (ruta configurable con `CV_PDF_PATH`) y genera `data/knowledge/chunks.json`.

> Ejecutá `npm run ingest` cada vez que actualices el CV.

### Desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) y usá el botón flotante del asistente (esquina inferior derecha).

## Variables de entorno

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `OPENAI_API_KEY` | Sí | API key de OpenAI (solo servidor) |
| `OPENAI_CHAT_MODEL` | No | Modelo de chat (default: `gpt-4o-mini`) |
| `OPENAI_EMBEDDING_MODEL` | No | Modelo de embeddings (default: `text-embedding-3-small`) |
| `CV_PDF_PATH` | No | Ruta al PDF para ingest (default: `../LUCAS MANSILLA - React Native Developer.pdf`) |

## Deploy en Vercel

1. Importá el proyecto (root directory: `portfolio-web`).
2. En **Settings → Environment Variables**, agregá:
   - `OPENAI_API_KEY`
   - Opcionalmente `OPENAI_CHAT_MODEL` y `OPENAI_EMBEDDING_MODEL`
3. Commiteá `data/knowledge/chunks.json` generado por `npm run ingest`.
4. Deploy.

## Arquitectura del asistente

```
ChatWidget → POST /api/chat → RAG (chunks.json) → OpenAI (stream)
```

- **Frontend:** widget flotante, streaming, markdown + syntax highlight.
- **Backend:** `app/api/chat/route.ts` — retrieval por similitud coseno + respuesta en streaming.
- **RAG:** script offline `scripts/ingest-pdf.ts` — sin base de datos externa.

## Pruebas sugeridas

- ES: "¿En qué empresas trabajaste?", "¿Qué stack usás en fintech?"
- EN: "Tell me about your React Native experience"
- Fuera de contexto: "¿Cuál es tu color favorito?" → debe indicar que no tiene esa información.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run ingest` | Regenerar embeddings del CV |
| `npm run lint` | ESLint |
