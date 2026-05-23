import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(root, "public/brand/base-bong-icon.png");
const outDir = path.join(root, "public/brand");

async function main() {
  await mkdir(outDir, { recursive: true });

  const icon = await sharp(input)
    .resize(1024, 1024, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(icon).toFile(path.join(outDir, "base-bong-icon.png"));
  await sharp(icon).toFile(path.join(outDir, "base-bong-og.png"));
  await sharp(icon)
    .resize(200, 200, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, "base-bong-splash.png"));
  await sharp(icon).toFile(path.join(root, "public/logo.png"));

  const { size } = await sharp(path.join(outDir, "base-bong-icon.png")).stats();
  const file = await import("node:fs/promises").then((fs) =>
    fs.stat(path.join(outDir, "base-bong-icon.png")),
  );
  console.log(`icon bytes: ${file.size}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
