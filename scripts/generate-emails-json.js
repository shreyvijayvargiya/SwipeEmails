#!/usr/bin/env node
/**
 * Generate emails.json manifest from public/emails directory.
 * Run: npm run generate:emails
 *
 * Output: public/emails.json — static JSON for client-side use (no fs at runtime).
 * Merges with existing emails.json: preserves title, description, company, embedding, etc.
 * Only adds/updates htmlSrc when matching HTML file exists (e.g. image.png → image.html).
 */

const fs = require("fs");
const path = require("path");

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
const CATEGORIES = [
  "Onboarding",
  "Marketing",
  "Transactional",
  "Reviews",
  "Feedback",
  "Re-engagement",
  "Newsletters",
  "General",
];

// Keyword → category mapping for inference (one-line, AI-friendly)
const CATEGORY_KEYWORDS = {
  Onboarding: [
    "welcome", "signup", "sign-up", "onboarding", "getting-started",
    "hello", "hi-", "introducing", "meet-", "new-user",
  ],
  Marketing: [
    "sale", "promo", "discount", "offer", "black-friday", "cyber",
    "deal", "percent-off", "save", "buy", "shop", "product",
    "announcement", "launch", "new-", "introducing", "discover",
    "holiday", "christmas", "easter", "valentine", "halloween",
    "seasonal", "gift", "bundle", "limited",
  ],
  Transactional: [
    "order", "confirm", "receipt", "shipping", "delivery",
    "payment", "invoice", "subscription", "account", "password",
    "reset", "verify", "notification", "alert",
  ],
  Reviews: [
    "review", "rating", "feedback-form", "rate-your",
  ],
  Feedback: [
    "survey", "nps", "poll", "feedback", "questionnaire",
    "help-us", "tell-us", "your-opinion", "expertise",
  ],
  "Re-engagement": [
    "win-back", "comeback", "re-engagement", "we-miss-you",
    "haven-t-seen", "long-time", "come-back", "return",
  ],
  Newsletters: [
    "newsletter", "bulletin", "digest", "weekly", "monthly",
    "roundup", "round-up", "highlights", "recap", "read",
    "article", "blog", "content", "stories",
  ],
};

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

/** Convert filename to human-readable name (title case) */
function filenameToName(filename) {
  const base = path.basename(filename, path.extname(filename));
  const cleaned = base
    .replace(/^[-_]+/, "")
    .replace(/[-_]+$/, "")
    .replace(/[-_]+/g, " ");
  return cleaned
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
    .trim() || base;
}

/** Infer one-line category from filename (keyword-based) */
function inferCategory(filename) {
  const lower = filename.toLowerCase().replace(/\.(png|jpg|jpeg|gif|webp)$/i, "");
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return category;
    }
  }
  return "General";
}

function main() {
  const emailsDir = path.join(process.cwd(), "public", "emails");
  const outputPath = path.join(process.cwd(), "public", "emails.json");

  if (!fs.existsSync(emailsDir)) {
    console.error("Directory not found: public/emails");
    process.exit(1);
  }

  // Load existing emails.json to preserve title, description, company, embedding, etc.
  let existingByFilename = {};
  let existingCategories = CATEGORIES;
  if (fs.existsSync(outputPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(outputPath, "utf8"));
      (existing.emails || []).forEach((e) => {
        const raw = (e.src || "").replace(/^\/emails\//, "");
        const filename = decodeURIComponent(raw);
        existingByFilename[filename] = { ...e };
      });
      if (existing.categories?.length) existingCategories = existing.categories;
    } catch (_) {}
  }

  const files = fs.readdirSync(emailsDir);
  const images = files
    .filter(isImageFile)
    .sort((a, b) => a.localeCompare(b))
    .map((filename) => {
      const src = `/emails/${encodeURIComponent(filename)}`;
      const basename = path.basename(filename, path.extname(filename));
      const htmlFilename = `${basename}.html`;
      const htmlPath = path.join(emailsDir, htmlFilename);

      const existing = existingByFilename[filename];
      const entry = existing
        ? { ...existing }
        : {
            name: filenameToName(filename),
            category: inferCategory(filename),
            src,
          };

      // Ensure src is set (in case existing had different encoding)
      entry.src = src;

      // Add or update htmlSrc when HTML file exists; remove if missing
      if (fs.existsSync(htmlPath)) {
        entry.htmlSrc = `/emails/${encodeURIComponent(htmlFilename)}`;
      } else if (entry.htmlSrc) {
        delete entry.htmlSrc;
      }

      return entry;
    });

  const manifest = {
    generatedAt: new Date().toISOString(),
    count: images.length,
    categories: existingCategories,
    emails: images,
  };

  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`✓ Generated public/emails.json with ${images.length} templates (existing data preserved)`);
}

main();
