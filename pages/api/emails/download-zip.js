import fs from "fs";
import path from "path";
import archiver from "archiver";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

export const config = {
  api: {
    responseLimit: false,
  },
};

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const emailsDir = path.join(process.cwd(), "public", "emails");
  const emailsJsonPath = path.join(process.cwd(), "public", "emails.json");

  if (!fs.existsSync(emailsDir)) {
    return res.status(404).json({ error: "Emails directory not found" });
  }

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", 'attachment; filename="swipeemails-templates.zip"');

  const archive = archiver("zip", { zlib: { level: 6 } });

  archive.on("error", (err) => {
    console.error("Archive error:", err);
    res.status(500).end();
  });

  archive.pipe(res);

  // Add emails.json
  if (fs.existsSync(emailsJsonPath)) {
    archive.file(emailsJsonPath, { name: "emails.json" });
  }

  // Add all image files
  const files = fs.readdirSync(emailsDir);
  for (const file of files) {
    if (isImageFile(file)) {
      const filePath = path.join(emailsDir, file);
      archive.file(filePath, { name: `emails/${file}` });
    }
  }

  archive.finalize();
}
