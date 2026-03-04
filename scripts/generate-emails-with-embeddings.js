#!/usr/bin/env node
/**
 * Generate emails.json with AI-generated title, description, and embeddings.
 * Uses OpenRouter API for vision (title+description) and embeddings.
 *
 * Run: npm run generate:emails:ai
 * Requires: OPENROUTER_API_KEY in .env.local
 *
 * Output: public/emails.json — { name, title, description, category, embedding, src }
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
const VISION_MODEL = "google/gemini-2.0-flash-001";
const EMBEDDING_MODEL = "openai/text-embedding-3-small";
const DELAY_MS = 500; // Rate limit between API calls
const BATCH_EMBED_SIZE = 20; // Embed in batches

// Load OPENROUTER_API_KEY from .env.local
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    content.split("\n").forEach((line) => {
      const match = line.match(/^OPENROUTER_API_KEY\s*=\s*(.+)$/);
      if (match) process.env.OPENROUTER_API_KEY = match[1].trim();
    });
  }
  if (!process.env.OPENROUTER_API_KEY) {
    console.error("Missing OPENROUTER_API_KEY. Add it to .env.local");
    process.exit(1);
  }
}

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimes = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp" };
  return mimes[ext] || "image/png";
}

function filenameToName(filename) {
  const base = path.basename(filename, path.extname(filename));
  const cleaned = base.replace(/^[-_]+/, "").replace(/[-_]+$/, "").replace(/[-_]+/g, " ");
  return cleaned
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
    .trim() || base;
}

function getContentHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(buf).digest("hex");
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function describeImage(apiKey, imagePath, base64) {
  const mime = getMimeType(imagePath);
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const body = {
    model: VISION_MODEL,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `This is an email template preview image. Respond with ONLY valid JSON in this exact format, no other text:
{"title":"Short catchy title (3-6 words)","description":"One sentence describing the email design, style, and purpose","category":"One of: Onboarding, Marketing, Transactional, Reviews, Feedback, Re-engagement, Newsletters, General"}`,
          },
          {
            type: "image_url",
            image_url: { url: `data:${mime};base64,${base64}` },
          },
        ],
      },
    ],
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Vision API ${res.status}: ${err}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim() || "{}";
  try {
    const parsed = JSON.parse(content.replace(/```json\n?|\n?```/g, "").trim());
    return {
      title: parsed.title || filenameToName(path.basename(imagePath)),
      description: parsed.description || "",
      category: parsed.category || "General",
    };
  } catch {
    return {
      title: filenameToName(path.basename(imagePath)),
      description: content.slice(0, 200) || "",
      category: "General",
    };
  }
}

async function getEmbeddings(apiKey, texts) {
  const url = "https://openrouter.ai/api/v1/embeddings";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: texts,
      encoding_format: "float",
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Embeddings API ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.data.map((d) => d.embedding);
}

async function main() {
  loadEnv();
  const apiKey = process.env.OPENROUTER_API_KEY;
  const emailsDir = path.join(process.cwd(), "public", "emails");
  const outputPath = path.join(process.cwd(), "public", "emails.json");

  const limit = parseInt(process.env.LIMIT || "0", 10) || Infinity;

  if (!fs.existsSync(emailsDir)) {
    console.error("Directory not found: public/emails");
    process.exit(1);
  }

  const files = fs.readdirSync(emailsDir).filter(isImageFile).sort((a, b) => a.localeCompare(b));

  // Deduplicate by content hash
  const seen = new Set();
  const unique = [];
  for (const f of files) {
    const p = path.join(emailsDir, f);
    const hash = getContentHash(p);
    if (seen.has(hash)) continue;
    seen.add(hash);
    unique.push(f);
  }
  console.log(`Found ${files.length} images, ${unique.length} unique (after dedup)`);

  const emails = [];
  const toProcess = unique.slice(0, limit);

  for (let i = 0; i < toProcess.length; i++) {
    const filename = toProcess[i];
    const imagePath = path.join(emailsDir, filename);
    const base64 = fs.readFileSync(imagePath).toString("base64");
    const src = `/emails/${encodeURIComponent(filename)}`;
    const name = filenameToName(filename);

    process.stdout.write(`[${i + 1}/${toProcess.length}] ${filename.slice(0, 40)}... `);

    try {
      const { title, description, category } = await describeImage(apiKey, imagePath, base64);
      await sleep(DELAY_MS);

      emails.push({
        name,
        title,
        description,
        category,
        src,
        _embedText: `${title}. ${description}`,
      });
      console.log(`✓ ${title}`);
    } catch (err) {
      console.log(`✗ ${err.message}`);
      emails.push({
        name,
        title: name,
        description: "",
        category: "General",
        src,
        _embedText: name,
      });
    }
  }

  // Batch embed
  console.log(`\nGenerating embeddings (batches of ${BATCH_EMBED_SIZE})...`);
  for (let i = 0; i < emails.length; i += BATCH_EMBED_SIZE) {
    const batch = emails.slice(i, i + BATCH_EMBED_SIZE);
    const texts = batch.map((e) => e._embedText);
    try {
      const embeddings = await getEmbeddings(apiKey, texts);
      batch.forEach((e, j) => {
        e.embedding = embeddings[j];
        delete e._embedText;
      });
      await sleep(DELAY_MS);
      console.log(`  Embedded ${Math.min(i + BATCH_EMBED_SIZE, emails.length)}/${emails.length}`);
    } catch (err) {
      console.error(`  Embedding batch failed: ${err.message}`);
      batch.forEach((e) => {
        delete e._embedText;
        e.embedding = [];
      });
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    count: emails.length,
    categories: ["Onboarding", "Marketing", "Transactional", "Reviews", "Feedback", "Re-engagement", "Newsletters", "General"],
    emails,
  };

  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`\n✓ Saved public/emails.json with ${emails.length} templates (title, description, embedding)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
