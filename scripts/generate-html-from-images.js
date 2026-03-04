#!/usr/bin/env node
/**
 * Generate HTML/Tailwind/React code from email template images using OpenRouter vision model.
 *
 * Usage:
 *   npm run generate:emails:html              # process all emails
 *   LIMIT=10 npm run generate:emails:html     # process only 10 emails
 *   npx swipeemails-generate-html --limit 10
 *   VISION_MODEL=meta-llama/llama-3.2-90b-vision-instruct:free npm run generate:emails:html  # try free (may 404)
 *
 * Requires: OPENROUTER_API_KEY in .env.local
 * Output: public/emails/{slug}.html + htmlSrc added to emails.json
 */

const fs = require("fs");
const path = require("path");

// Default: Gemini (works). Free models (meta-llama/llama-3.2-*-vision-instruct:free) often return 404.
const VISION_MODEL = process.env.VISION_MODEL || "google/gemini-2.0-flash-001";
const DELAY_MS = 1000; // Rate limit for free tier
const DEFAULT_LIMIT = 0; // 0 = process all emails

const PROMPT = `Convert this email template screenshot into clean, semantic HTML with Tailwind CSS classes.
Output ONLY the inner body content - NO doctype, NO html/head/body tags, NO script/link tags.
Start with a single container div (e.g. <div class="...">). Use Tailwind classes. Make it responsive (mobile-first).
Match the layout, colors, typography, and structure from the image as closely as possible.`;

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

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimes = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp" };
  return mimes[ext] || "image/png";
}

function slugify(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "template";
}

function parseArgs() {
  const args = process.argv.slice(2);
  let limit = parseInt(process.env.LIMIT || "0", 10) || DEFAULT_LIMIT;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--limit" && args[i + 1]) {
      limit = parseInt(args[i + 1], 10) || DEFAULT_LIMIT;
      break;
    }
  }
  return { limit };
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function imageToHtml(apiKey, imagePath, base64) {
  const mime = getMimeType(imagePath);
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const body = {
    model: VISION_MODEL,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: PROMPT },
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
  let content = data.choices?.[0]?.message?.content?.trim() || "";
  if (content.includes("```")) {
    const match = content.match(/```(?:html)?\s*([\s\S]*?)```/);
    if (match) content = match[1].trim();
  }
  // Strip full document if model returned it
  content = content.replace(/<!DOCTYPE[\s\S]*?<body[^>]*>/i, "").replace(/<\/body>\s*<\/html>/i, "").trim();
  return content;
}

async function main() {
  loadEnv();
  const { limit } = parseArgs();
  const apiKey = process.env.OPENROUTER_API_KEY;
  const emailsJsonPath = path.join(process.cwd(), "public", "emails.json");
  const outputDir = path.join(process.cwd(), "public", "emails");

  if (!fs.existsSync(emailsJsonPath)) {
    console.error("public/emails.json not found. Run npm run generate:emails:ai first.");
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(emailsJsonPath, "utf8"));
  const allEmails = data.emails || [];
  const emails = limit > 0 ? allEmails.slice(0, limit) : allEmails;

  if (emails.length === 0) {
    console.error("No emails in emails.json");
    process.exit(1);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const isFree = VISION_MODEL.includes(":free");
  console.log(`\n📧 SwipeEmails HTML Generator\n`);
  console.log(`Model: ${VISION_MODEL}${isFree ? " (free)" : ""}`);
  console.log(`Processing ${emails.length} templates → public/emails/\n`);

  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    const filename = email.src?.replace(/^\/emails\//, "") || "";
    const decodedFilename = decodeURIComponent(filename);
    const imagePath = path.join(process.cwd(), "public", "emails", decodedFilename);

    if (!fs.existsSync(imagePath)) {
      console.log(`[${i + 1}/${emails.length}] ⚠ Skip ${email.title || email.name} (image not found)`);
      continue;
    }

    const base64 = fs.readFileSync(imagePath).toString("base64");
    const slug = slugify(email.title || email.name) + "-" + i;

    process.stdout.write(`[${i + 1}/${emails.length}] ${email.title || email.name}... `);

    try {
      const html = await imageToHtml(apiKey, imagePath, base64);
      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${(email.title || email.name).replace(/</g, "&lt;")}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
${html}
</body>
</html>`;

      const outPath = path.join(outputDir, `${slug}.html`);
      fs.writeFileSync(outPath, fullHtml, "utf8");
      email.htmlSrc = `/emails/${slug}.html`;
      console.log(`✓ ${slug}.html`);
    } catch (err) {
      console.log(`✗ ${err.message}`);
    }

    await sleep(DELAY_MS);
  }

  fs.writeFileSync(emailsJsonPath, JSON.stringify(data, null, 2), "utf8");
  console.log(`\n✓ Done. Generated templates in public/emails/ and updated emails.json\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
