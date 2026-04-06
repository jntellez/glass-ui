import { describe, expect, it, vi } from "vitest"
import { inspectProject } from "./inspect-project"

describe("inspectProject", () => {
  it("inspects a supported project and extracts aliases from config", async () => {
    const report = await inspectProject(
      {},
      {
        cwd: () => "/workspace",
        exists: (filePath, projectRoot) => {
          const key = `${projectRoot}:${filePath}`
          return new Set([
            "/workspace:.",
            "/workspace:package.json",
            "/workspace:glass.config.json",
            "/workspace:pnpm-lock.yaml",
            "/workspace:src/index.css",
          ]).has(key)
        },
        readFile: async (filePath, projectRoot) => {
          const key = `${projectRoot}:${filePath}`

          if (key === "/workspace:package.json") {
            return JSON.stringify({ dependencies: { vite: "5.0.0" } })
          }

          if (key === "/workspace:glass.config.json") {
            return JSON.stringify({
              framework: "vite",
              style: "default",
              css: "src/index.css",
              aliases: {
                components: "@/components/ui",
                utils: "@/lib/utils",
              },
            })
          }

          throw new Error(`unexpected read: ${key}`)
        },
        getFramework: async () => "vite",
        getPackageManager: async () => "pnpm",
        getCssPath: () => "src/index.css",
      },
    )

    expect(report.projectRoot).toBe("/workspace")
    expect(report.framework).toEqual({ value: "vite", source: "detected" })
    expect(report.packageManager).toEqual({ value: "pnpm", source: "detected" })
    expect(report.config).toMatchObject({
      source: "detected",
      css: "src/index.css",
      aliases: {
        components: "@/components/ui",
        utils: "@/lib/utils",
      },
    })
    expect(report.css).toEqual({ path: "src/index.css", exists: true, source: "detected" })
    expect(report.readiness).toEqual({ init: true, add: true })
  })

  it("reports missing glass.config.json as a failing diagnostic without crashing", async () => {
    const report = await inspectProject(
      {},
      {
        cwd: () => "/workspace",
        exists: (filePath, projectRoot) =>
          new Set(["/workspace:.", "/workspace:package.json", "/workspace:src/index.css"]).has(
            `${projectRoot}:${filePath}`,
          ),
        readFile: async () => JSON.stringify({ dependencies: { vite: "5.0.0" } }),
        getFramework: async () => "vite",
        getPackageManager: async () => "npm",
        getCssPath: () => "src/index.css",
      },
    )

    expect(report.config.source).toBe("missing")
    expect(report.readiness.add).toBe(false)
    expect(report.checks).toContainEqual(
      expect.objectContaining({
        id: "config",
        status: "error",
      }),
    )
  })

  it("reports invalid glass config json as an invalid diagnostic", async () => {
    const report = await inspectProject(
      {},
      {
        cwd: () => "/workspace",
        exists: (filePath, projectRoot) =>
          new Set(["/workspace:.", "/workspace:package.json", "/workspace:glass.config.json"]).has(
            `${projectRoot}:${filePath}`,
          ),
        readFile: async (filePath) =>
          filePath === "glass.config.json"
            ? "{"
            : JSON.stringify({ dependencies: { vite: "5.0.0" } }),
        getFramework: async () => "vite",
        getPackageManager: async () => "npm",
        getCssPath: () => "src/index.css",
      },
    )

    expect(report.config.source).toBe("invalid")
    expect(report.config.error).toContain("Invalid")
    expect(report.readiness.add).toBe(false)
  })

  it("marks fallback package-manager and css state as inferred", async () => {
    const report = await inspectProject(
      {},
      {
        cwd: () => "/workspace",
        exists: (filePath, projectRoot) =>
          new Set(["/workspace:.", "/workspace:package.json", "/workspace:src/index.css"]).has(
            `${projectRoot}:${filePath}`,
          ),
        readFile: async () => JSON.stringify({ dependencies: { vite: "5.0.0" } }),
        getFramework: async () => "vite",
        getPackageManager: async () => "npm",
        getCssPath: () => "src/index.css",
      },
    )

    expect(report.packageManager).toEqual({ value: "npm", source: "inferred" })
    expect(report.css).toEqual({ path: "src/index.css", exists: true, source: "inferred" })
  })

  it("detects bun when bun.lock exists", async () => {
    const report = await inspectProject(
      {},
      {
        cwd: () => "/workspace",
        exists: (filePath, projectRoot) =>
          new Set([
            "/workspace:.",
            "/workspace:package.json",
            "/workspace:glass.config.json",
            "/workspace:bun.lock",
            "/workspace:src/index.css",
          ]).has(`${projectRoot}:${filePath}`),
        readFile: async (filePath, projectRoot) => {
          const key = `${projectRoot}:${filePath}`

          if (key === "/workspace:package.json") {
            return JSON.stringify({ dependencies: { vite: "5.0.0" } })
          }

          if (key === "/workspace:glass.config.json") {
            return JSON.stringify({
              framework: "vite",
              style: "default",
              css: "src/index.css",
              aliases: {
                components: "@/components/ui",
                utils: "@/lib/utils",
              },
            })
          }

          throw new Error(`unexpected read: ${key}`)
        },
        getFramework: async () => "vite",
        getPackageManager: async () => "bun",
        getCssPath: () => "src/index.css",
      },
    )

    expect(report.packageManager).toEqual({ value: "bun", source: "detected" })
  })

  it("fails clearly when the target directory cannot be inspected", async () => {
    await expect(
      inspectProject(
        { cwd: "/missing" },
        {
          cwd: () => "/workspace",
          exists: () => false,
          readFile: vi.fn(),
          getFramework: async () => "unknown",
          getPackageManager: async () => "npm",
          getCssPath: () => null,
        },
      ),
    ).rejects.toThrow(
      'Could not inspect directory "/missing": path does not exist or is not accessible.',
    )
  })
})
