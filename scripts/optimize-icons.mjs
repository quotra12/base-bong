import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

const sourceCandidates = [
  path.join(publicDir, "logo.png"),
  path.join(publicDir, "brand", "base-bong-icon.png"),
  path.join(
    process.env.HOME ?? "",
    ".cursor/projects/Users-kimba-Desktop-FOUR/assets/icon.png",
  ),
];

async function pickSource() {
  for (const candidate of sourceCandidates) {
    try {
      await sharp(candidate).metadata();
      return candidate;
    } catch {
      /* next */
    }
  }
  throw new Error("No source icon found");
}

async function writePng(buffer, filePath) {
  await sharp(buffer).png({ compressionLevel: 9 }).toFile(filePath);
  const stat = await import("node:fs/promises").then((fs) => fs.stat(filePath));
  return stat.size;
}

async function main() {
  const input = await pickSource();
  await mkdir(publicDir, { recursive: true });

  const square = await sharp(input)
    .resize(1024, 1024, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const sizes = [
    ["logo.png", 1024],
    ["logo-512.png", 512],
    ["logo-192.png", 192],
    ["apple-touch-icon.png", 180],
    ["logo-splash.png", 200],
  ];

  for (const [name, px] of sizes) {
    const buf =
      px === 1024
        ? square
        : await sharp(square)
            .resize(px, px, { fit: "cover", position: "centre" })
            .png({ compressionLevel: 9 })
            .toBuffer();
    const bytes = await writePng(buf, path.join(publicDir, name));
    console.log(`${name}: ${px}x${px} (${bytes} bytes)`);
  }

  await writePng(square, path.join(publicDir, "brand", "base-bong-icon.png"));
  await writePng(square, path.join(publicDir, "brand", "base-bong-og.png"));

  const thumbW = 1200;
  const thumbH = Math.round(thumbW / 1.91);
  const logo512 = await sharp(path.join(publicDir, "logo-512.png"))
    .resize(420, 420, { fit: "contain" })
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: thumbW,
      height: thumbH,
      channels: 3,
      background: { r: 9, g: 9, b: 11 },
    },
  })
    .composite([{ input: logo512, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, "thumbnail-191.png"));
  console.log(`thumbnail-191.png: ${thumbW}x${thumbH} (1.91:1)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
