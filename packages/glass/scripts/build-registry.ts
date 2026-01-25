import path from "node:path";
import { existsSync, mkdirSync } from "node:fs"; // Node FS for directory creation
import { registry } from "../src/registry";
import { registryIndexSchema } from "@glass-ui-kit/schema";

// Target: apps/web/public/registry.json
// We resolve relative to packages/glass/scripts/
const PUBLIC_DIR = path.resolve(process.cwd(), "../../apps/web/public");
const TARGET_FILE = path.join(PUBLIC_DIR, "registry.json");

async function buildRegistry() {
  console.log("📦 Building registry...");

  // Ensure target directory exists (critical for CI/CD)
  if (!existsSync(PUBLIC_DIR)) {
    mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const result = [];

  for (const item of registry) {
    console.log(`   Processing: ${item.name}`);

    const filesContent = [];

    for (const file of item.files) {
      const filePath = path.resolve(process.cwd(), "src", file.path);
      const fileObj = Bun.file(filePath);

      if (!(await fileObj.exists())) {
        throw new Error(`File not found: ${filePath}`);
      }

      const content = await fileObj.text();

      filesContent.push({
        ...file,
        content: content,
      });
    }

    result.push({
      ...item,
      files: filesContent,
    });
  }

  const parsedRegistry = registryIndexSchema.parse(result);

  await Bun.write(TARGET_FILE, JSON.stringify(parsedRegistry, null, 2));

  console.log(`✅ Registry built with ${result.length} items.`);
  console.log(`📍 Output: ${TARGET_FILE}`);
}

buildRegistry().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
