import os from "node:os"
import path from "node:path"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { afterEach, describe, expect, it, vi } from "vitest"
import { registryIndexSchema } from "@glass-ui-kit/schema"
import { registry } from "../src/registry"
import { buildRegistry, type BuildRegistryOptions } from "./build-registry"

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const createdDirs: string[] = []

afterEach(() => {
  for (const dir of createdDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true })
  }
})

function makeWorkspaceDir(prefix: string) {
  const dir = mkdtempSync(path.join(os.tmpdir(), prefix))

  createdDirs.push(dir)

  return dir
}

function logger() {
  return { log: vi.fn(), error: vi.fn() }
}

function nodeFileIO() {
  return {
    fileExists: async (filePath: string) => existsSync(filePath),
    readText: async (filePath: string) => readFileSync(filePath, "utf8"),
    writeText: async (filePath: string, content: string) => {
      writeFileSync(filePath, content)
    },
  }
}

describe("buildRegistry", () => {
  it("reads component sources, creates the output directory, and writes the registry file", async () => {
    const workspaceDir = makeWorkspaceDir("glass-ui-build-registry-")
    const publicDir = path.join(workspaceDir, "apps/web/public")
    const outputFile = path.join(publicDir, "registry.json")
    const result = await buildRegistry({
      cwd: packageDir,
      publicDir,
      ...nodeFileIO(),
      logger: logger(),
    })

    expect(existsSync(publicDir)).toBe(true)
    expect(existsSync(outputFile)).toBe(true)

    const written = JSON.parse(readFileSync(outputFile, "utf8"))
    const parsed = registryIndexSchema.parse(written)

    expect(parsed).toEqual(result)
    expect(parsed).toHaveLength(registry.length)

    for (const entry of parsed) {
      const sourcePath = path.resolve(packageDir, "src", entry.files[0].path)

      expect(entry.files).toHaveLength(1)
      expect(entry.files[0].content).toBe(readFileSync(sourcePath, "utf8"))
    }
  })

  it("throws when a source file is missing", async () => {
    const workspaceDir = makeWorkspaceDir("glass-ui-build-registry-missing-")
    const publicDir = path.join(workspaceDir, "apps/web/public")
    const missingEntries: NonNullable<BuildRegistryOptions["entries"]> = [
      {
        name: "missing",
        type: "registry:ui",
        dependencies: ["clsx", "tailwind-merge"],
        files: [{ path: "ui/missing/index.tsx", type: "client" }],
      },
    ]

    await expect(
      buildRegistry({
        cwd: packageDir,
        publicDir,
        entries: missingEntries,
        ...nodeFileIO(),
        logger: logger(),
      }),
    ).rejects.toThrow(/File not found:/)

    expect(existsSync(publicDir)).toBe(true)
    expect(existsSync(path.join(publicDir, "registry.json"))).toBe(false)
  })
})
