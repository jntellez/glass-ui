import path from "node:path"
import { existsSync, mkdirSync } from "node:fs" // Node FS for directory creation
import { registry } from "../src/registry"
import { registryIndexSchema } from "@glass-ui-kit/schema"

export type RegistryEntry = (typeof registry)[number]

export type BuildRegistryOptions = {
  cwd?: string
  publicDir?: string
  sourceDir?: string
  entries?: RegistryEntry[]
  fileExists?: (filePath: string) => Promise<boolean>
  readText?: (filePath: string) => Promise<string>
  writeText?: (filePath: string, content: string) => Promise<void>
  ensureDir?: (dirPath: string) => void
  logger?: Pick<Console, "log" | "error">
}

// Target: apps/web/public/registry.json
// We resolve relative to packages/glass/scripts/
function resolvePaths(cwd: string, publicDir?: string) {
  const resolvedPublicDir = publicDir ?? path.resolve(cwd, "../../apps/web/public")

  return {
    publicDir: resolvedPublicDir,
    targetFile: path.join(resolvedPublicDir, "registry.json"),
    sourceDir: path.join(cwd, "src"),
  }
}

export async function buildRegistry(options: BuildRegistryOptions = {}) {
  const cwd = options.cwd ?? process.cwd()
  const { publicDir, targetFile, sourceDir } = resolvePaths(cwd, options.publicDir)
  const entries = options.entries ?? registry
  const fileExists = options.fileExists ?? (async (filePath) => Bun.file(filePath).exists())
  const readText = options.readText ?? (async (filePath) => Bun.file(filePath).text())
  const writeText = options.writeText ?? (async (filePath, content) => Bun.write(filePath, content))
  const ensureDir =
    options.ensureDir ??
    ((dirPath) => {
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true })
      }
    })
  const logger = options.logger ?? console

  logger.log("📦 Building registry...")

  // Ensure target directory exists (critical for CI/CD)
  ensureDir(publicDir)

  const result = []

  for (const item of entries) {
    logger.log(`   Processing: ${item.name}`)

    const filesContent = []

    for (const file of item.files) {
      const filePath = path.resolve(sourceDir, file.path)

      if (!(await fileExists(filePath))) {
        throw new Error(`File not found: ${filePath}`)
      }

      const content = await readText(filePath)

      filesContent.push({
        ...file,
        content: content,
      })
    }

    result.push({
      ...item,
      files: filesContent,
    })
  }

  const parsedRegistry = registryIndexSchema.parse(result)

  await writeText(targetFile, JSON.stringify(parsedRegistry, null, 2))

  logger.log(`✅ Registry built with ${result.length} items.`)
  logger.log(`📍 Output: ${targetFile}`)

  return parsedRegistry
}

if (import.meta.main) {
  buildRegistry().catch((err) => {
    console.error("❌ Build failed:", err)
    process.exit(1)
  })
}
