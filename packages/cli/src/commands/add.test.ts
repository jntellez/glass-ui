import { describe, expect, it, vi } from "vitest"
import type { RegistryIndex } from "@glass-ui-kit/schema"
import {
  AddCommandError,
  collectDependencies,
  createAddAction,
  resolveAddSelection,
  runAddCommand,
} from "./add"

const registry: RegistryIndex = [
  {
    name: "button",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [{ type: "client", path: "button.tsx", content: "export const Button = () => null;" }],
  },
  {
    name: "card",
    type: "registry:ui",
    dependencies: ["clsx", "class-variance-authority"],
    files: [{ type: "client", path: "card.tsx", content: "export const Card = () => null;" }],
  },
]

describe("resolveAddSelection", () => {
  it("preserves first-seen named order and removes duplicates", () => {
    const selection = resolveAddSelection(registry, ["card", "button", "card"], false)

    expect(selection).toEqual({
      ok: true,
      items: [registry[1], registry[0]],
    })
  })

  it("returns all registry items for --all", () => {
    const selection = resolveAddSelection(registry, [], true)

    expect(selection).toEqual({ ok: true, items: registry })
  })

  it("rejects mixing --all with named components", () => {
    const selection = resolveAddSelection(registry, ["button"], true)

    expect(selection).toEqual({ ok: false, reason: "invalid-combination" })
  })

  it("reports every missing named component", () => {
    const selection = resolveAddSelection(registry, ["button", "toast", "modal"], false)

    expect(selection).toEqual({
      ok: false,
      reason: "missing-components",
      names: ["toast", "modal"],
    })
  })
})

describe("collectDependencies", () => {
  it("deduplicates dependencies across selected items in command order", () => {
    expect(collectDependencies([registry[0], registry[1]])).toEqual([
      "clsx",
      "tailwind-merge",
      "class-variance-authority",
    ])
  })
})

describe("runAddCommand", () => {
  it("fails conflicting install flags before writing files or installing dependencies", async () => {
    const writeFile = vi.fn()
    const installDependencies = vi.fn()

    await expect(
      runAddCommand(
        ["button"],
        { depsOnly: true, install: false },
        {
          cwd: () => "/project",
          exists: vi.fn(),
          readFile: vi.fn(),
          writeFile,
          fetchRegistry: vi.fn(),
          getPackageManager: vi.fn(),
          installDependencies,
          log: vi.fn(),
        },
      ),
    ).rejects.toMatchObject({
      code: "invalid-combination",
      message: "Cannot combine --deps-only with --no-install.",
    })

    expect(writeFile).not.toHaveBeenCalled()
    expect(installDependencies).not.toHaveBeenCalled()
  })

  it("fails invalid batches before writing files or installing dependencies", async () => {
    const writeFile = vi.fn()
    const installDependencies = vi.fn()

    await expect(
      runAddCommand(
        ["button", "toast"],
        {},
        {
          cwd: () => "/project",
          exists: (filePath) => filePath === "glass.config.json",
          readFile: async () =>
            JSON.stringify({
              framework: "vite",
              style: "default",
              css: "src/index.css",
              aliases: {
                components: "@/components/ui",
                utils: "@/lib/utils",
              },
            }),
          writeFile,
          fetchRegistry: async () => registry,
          getPackageManager: async () => "pnpm",
          installDependencies,
          log: vi.fn(),
        },
      ),
    ).rejects.toMatchObject({
      code: "missing-components",
      message: "Components not found: toast.",
    })

    expect(writeFile).not.toHaveBeenCalled()
    expect(installDependencies).not.toHaveBeenCalled()
  })

  it("writes requested batch files with transformed imports and installs deduplicated dependencies once", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const installDependencies = vi.fn().mockResolvedValue(undefined)
    const log = vi.fn()

    await runAddCommand(
      ["button", "card"],
      {},
      {
        cwd: () => "/project",
        exists: (filePath) => filePath === "glass.config.json" || filePath === "src",
        readFile: async () =>
          JSON.stringify({
            framework: "vite",
            style: "default",
            css: "src/index.css",
            aliases: {
              components: "@/custom/ui",
              utils: "@/custom/utils",
            },
          }),
        writeFile,
        fetchRegistry: async () => [
          {
            name: "button",
            type: "registry:ui",
            dependencies: ["clsx", "tailwind-merge"],
            files: [
              {
                type: "client",
                path: "button.tsx",
                content:
                  'import { cn } from "../lib/utils"\nexport const Button = () => cn("button")',
              },
            ],
          },
          {
            name: "card",
            type: "registry:ui",
            dependencies: ["clsx", "class-variance-authority"],
            files: [
              {
                type: "client",
                path: "card.tsx",
                content:
                  'import { cn } from "../lib/utils"\nimport { Button } from "../ui/button"\nexport const Card = () => [cn("card"), Button].join(":")',
              },
            ],
          },
        ],
        getPackageManager: async () => "pnpm",
        installDependencies,
        log,
      },
    )

    expect(writeFile).toHaveBeenCalledTimes(2)
    expect(writeFile).toHaveBeenNthCalledWith(
      1,
      "src/custom/ui/button.tsx",
      'import { cn } from "@/custom/utils"\nexport const Button = () => cn("button")',
      "/project",
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      "src/custom/ui/card.tsx",
      'import { cn } from "@/custom/utils"\nimport { Button } from "@/custom/ui/button"\nexport const Card = () => [cn("card"), Button].join(":")',
      "/project",
    )
    expect(installDependencies).toHaveBeenCalledTimes(1)
    expect(installDependencies).toHaveBeenCalledWith(
      ["clsx", "tailwind-merge", "class-variance-authority"],
      "pnpm",
      "/project",
    )
    expect(log).toHaveBeenCalledWith(expect.stringContaining("Done"))
  })

  it("writes every registry item for --all using remix target paths", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const installDependencies = vi.fn().mockResolvedValue(undefined)

    await runAddCommand(
      [],
      { all: true },
      {
        cwd: () => "/project",
        exists: (filePath) => filePath === "glass.config.json",
        readFile: async () =>
          JSON.stringify({
            framework: "remix",
            style: "default",
            css: "app/app.css",
            aliases: {
              components: "~/components/ui",
              utils: "~/lib/utils",
            },
          }),
        writeFile,
        fetchRegistry: async () => registry,
        getPackageManager: async () => "npm",
        installDependencies,
        log: vi.fn(),
      },
    )

    expect(writeFile).toHaveBeenCalledTimes(2)
    expect(writeFile).toHaveBeenNthCalledWith(
      1,
      "app/components/ui/button.tsx",
      "export const Button = () => null;",
      "/project",
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      "app/components/ui/card.tsx",
      "export const Card = () => null;",
      "/project",
    )
    expect(installDependencies).toHaveBeenCalledTimes(1)
    expect(installDependencies).toHaveBeenCalledWith(
      ["clsx", "tailwind-merge", "class-variance-authority"],
      "npm",
      "/project",
    )
  })

  it("skips existing files by default and reports them", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const installDependencies = vi.fn().mockResolvedValue(undefined)
    const log = vi.fn()

    await runAddCommand(
      ["button", "card"],
      {},
      {
        cwd: () => "/project",
        exists: (filePath) =>
          filePath === "glass.config.json" ||
          filePath === "src" ||
          filePath === "src/components/ui/button.tsx",
        readFile: async () =>
          JSON.stringify({
            framework: "vite",
            style: "default",
            css: "src/index.css",
            aliases: {
              components: "@/components/ui",
              utils: "@/lib/utils",
            },
          }),
        writeFile,
        fetchRegistry: async () => registry,
        getPackageManager: async () => "pnpm",
        installDependencies,
        log,
      },
    )

    expect(writeFile).toHaveBeenCalledTimes(1)
    expect(writeFile).toHaveBeenCalledWith(
      "src/components/ui/card.tsx",
      "export const Card = () => null;",
      "/project",
    )
    expect(log).toHaveBeenCalledWith(
      expect.stringContaining("Skipped src/components/ui/button.tsx (already exists)"),
    )
    expect(installDependencies).toHaveBeenCalledTimes(1)
  })

  it("overwrites existing files when requested", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const installDependencies = vi.fn().mockResolvedValue(undefined)
    const log = vi.fn()

    await runAddCommand(
      ["button"],
      { overwrite: true },
      {
        cwd: () => "/project",
        exists: (filePath) =>
          filePath === "glass.config.json" ||
          filePath === "src" ||
          filePath === "src/components/ui/button.tsx",
        readFile: async () =>
          JSON.stringify({
            framework: "vite",
            style: "default",
            css: "src/index.css",
            aliases: {
              components: "@/components/ui",
              utils: "@/lib/utils",
            },
          }),
        writeFile,
        fetchRegistry: async () => registry,
        getPackageManager: async () => "pnpm",
        installDependencies,
        log,
      },
    )

    expect(writeFile).toHaveBeenCalledTimes(1)
    expect(writeFile).toHaveBeenCalledWith(
      "src/components/ui/button.tsx",
      "export const Button = () => null;",
      "/project",
    )
    expect(log).not.toHaveBeenCalledWith(expect.stringContaining("Skipped"))
  })

  it("writes to an explicit path while preserving alias-based import rewriting", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const installDependencies = vi.fn().mockResolvedValue(undefined)

    await runAddCommand(
      ["card"],
      { path: "src/components/custom" },
      {
        cwd: () => "/project",
        exists: (filePath) => filePath === "glass.config.json" || filePath === "src",
        readFile: async () =>
          JSON.stringify({
            framework: "vite",
            style: "default",
            css: "src/index.css",
            aliases: {
              components: "@/custom/ui",
              utils: "@/custom/utils",
            },
          }),
        writeFile,
        fetchRegistry: async () => [
          {
            name: "card",
            type: "registry:ui",
            dependencies: ["clsx"],
            files: [
              {
                type: "client",
                path: "card.tsx",
                content:
                  'import { cn } from "../lib/utils"\nimport { Button } from "../ui/button"\nexport const Card = () => [cn("card"), Button].join(":")',
              },
            ],
          },
        ],
        getPackageManager: async () => "pnpm",
        installDependencies,
        log: vi.fn(),
      },
    )

    expect(writeFile).toHaveBeenCalledWith(
      "src/components/custom/card.tsx",
      'import { cn } from "@/custom/utils"\nimport { Button } from "@/custom/ui/button"\nexport const Card = () => [cn("card"), Button].join(":")',
      "/project",
    )
  })

  it("uses cwd-aware project roots for config, writes, and installs", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const installDependencies = vi.fn().mockResolvedValue(undefined)
    const getPackageManager = vi.fn().mockResolvedValue("pnpm")

    await runAddCommand(
      ["card"],
      { cwd: "../astro" },
      {
        cwd: () => "/workspace/current",
        exists: (filePath, baseDir) =>
          baseDir === "/workspace/astro" &&
          (filePath === "glass.config.json" || filePath === "src"),
        readFile: async (_filePath, baseDir) => {
          expect(baseDir).toBe("/workspace/astro")
          return JSON.stringify({
            framework: "vite",
            style: "default",
            css: "src/index.css",
            aliases: {
              components: "@/components/ui",
              utils: "@/lib/utils",
            },
          })
        },
        writeFile,
        fetchRegistry: async () => [registry[1]],
        getPackageManager,
        installDependencies,
        log: vi.fn(),
      },
    )

    expect(writeFile).toHaveBeenCalledWith(
      "src/components/ui/card.tsx",
      "export const Card = () => null;",
      "/workspace/astro",
    )
    expect(getPackageManager).toHaveBeenCalledWith("/workspace/astro")
    expect(installDependencies).toHaveBeenCalledWith(
      ["clsx", "class-variance-authority"],
      "pnpm",
      "/workspace/astro",
    )
  })

  it("skips dependency installation when --no-install is passed", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const installDependencies = vi.fn().mockResolvedValue(undefined)
    const getPackageManager = vi.fn().mockResolvedValue("pnpm")

    await runAddCommand(
      ["button"],
      { install: false },
      {
        cwd: () => "/project",
        exists: (filePath) => filePath === "glass.config.json" || filePath === "src",
        readFile: async () =>
          JSON.stringify({
            framework: "vite",
            style: "default",
            css: "src/index.css",
            aliases: {
              components: "@/components/ui",
              utils: "@/lib/utils",
            },
          }),
        writeFile,
        fetchRegistry: async () => registry,
        getPackageManager,
        installDependencies,
        log: vi.fn(),
      },
    )

    expect(writeFile).toHaveBeenCalledTimes(1)
    expect(getPackageManager).not.toHaveBeenCalled()
    expect(installDependencies).not.toHaveBeenCalled()
  })

  it("installs dependencies without writing files for --deps-only", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const installDependencies = vi.fn().mockResolvedValue(undefined)
    const getPackageManager = vi.fn().mockResolvedValue("pnpm")

    await runAddCommand(
      ["button", "card"],
      { depsOnly: true },
      {
        cwd: () => "/project",
        exists: (filePath) => filePath === "glass.config.json" || filePath === "src",
        readFile: async () =>
          JSON.stringify({
            framework: "vite",
            style: "default",
            css: "src/index.css",
            aliases: {
              components: "@/components/ui",
              utils: "@/lib/utils",
            },
          }),
        writeFile,
        fetchRegistry: async () => registry,
        getPackageManager,
        installDependencies,
        log: vi.fn(),
      },
    )

    expect(writeFile).not.toHaveBeenCalled()
    expect(getPackageManager).toHaveBeenCalledTimes(1)
    expect(installDependencies).toHaveBeenCalledWith(
      ["clsx", "tailwind-merge", "class-variance-authority"],
      "pnpm",
      "/project",
    )
  })
})

describe("createAddAction", () => {
  it("invokes the extracted runner from the command boundary", async () => {
    const runner = vi.fn().mockResolvedValue(undefined)
    const action = createAddAction({
      runAddCommand: runner,
      error: vi.fn(),
      log: vi.fn(),
      exit: vi.fn() as never,
    })

    await action(["button", "card"], { all: false })

    expect(runner).toHaveBeenCalledWith(["button", "card"], { all: false })
  })

  it("forwards cwd through the command boundary", async () => {
    const runner = vi.fn().mockResolvedValue(undefined)
    const action = createAddAction({
      runAddCommand: runner,
      error: vi.fn(),
      log: vi.fn(),
      exit: vi.fn() as never,
    })

    await action(["card"], { cwd: "../astro" })

    expect(runner).toHaveBeenCalledWith(["card"], { cwd: "../astro" })
  })

  it("prints preserved registry failures through the command boundary", async () => {
    const error = vi.fn()
    const exit = vi.fn(() => {
      throw new Error("exit")
    })
    const action = createAddAction({
      runAddCommand: vi
        .fn()
        .mockRejectedValue(
          new Error(
            "Network error: Unable to connect to registry. Check your internet connection.",
          ),
        ),
      error,
      log: vi.fn(),
      exit: exit as never,
    })

    await expect(action(["button"], {})).rejects.toThrow("exit")

    expect(error).toHaveBeenNthCalledWith(1, expect.stringContaining("Operation failed"))
    expect(error).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("Network error: Unable to connect to registry"),
    )
    expect(exit).toHaveBeenCalledWith(1)
  })

  it("prints incompatible registry schema failures through the command boundary", async () => {
    const error = vi.fn()
    const exit = vi.fn(() => {
      throw new Error("exit")
    })
    const action = createAddAction({
      runAddCommand: vi
        .fn()
        .mockRejectedValue(
          new Error(
            "Incompatible registry version. Your CLI might be outdated. Please try updating @glass-ui-kit/cli.",
          ),
        ),
      error,
      log: vi.fn(),
      exit: exit as never,
    })

    await expect(action(["button"], {})).rejects.toThrow("exit")

    expect(error).toHaveBeenNthCalledWith(1, expect.stringContaining("Operation failed"))
    expect(error).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("Incompatible registry version. Your CLI might be outdated."),
    )
    expect(exit).toHaveBeenCalledWith(1)
  })

  it("prints non-JSON registry failures through the command boundary", async () => {
    const error = vi.fn()
    const exit = vi.fn(() => {
      throw new Error("exit")
    })
    const action = createAddAction({
      runAddCommand: vi
        .fn()
        .mockRejectedValue(new Error("Invalid response: Registry returned non-JSON data.")),
      error,
      log: vi.fn(),
      exit: exit as never,
    })

    await expect(action(["button"], {})).rejects.toThrow("exit")

    expect(error).toHaveBeenNthCalledWith(1, expect.stringContaining("Operation failed"))
    expect(error).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("Invalid response: Registry returned non-JSON data."),
    )
    expect(exit).toHaveBeenCalledWith(1)
  })

  it("keeps config-not-found guidance at the command boundary", async () => {
    const error = vi.fn()
    const log = vi.fn()
    const exit = vi.fn(() => {
      throw new Error("exit")
    })
    const action = createAddAction({
      runAddCommand: vi
        .fn()
        .mockRejectedValue(
          new AddCommandError("config-not-found", "Configuration file not found."),
        ),
      error,
      log,
      exit: exit as never,
    })

    await expect(action(["button"], {})).rejects.toThrow("exit")

    expect(error).toHaveBeenCalledWith(expect.stringContaining("Configuration file not found."))
    expect(log).toHaveBeenCalledWith(expect.stringContaining("Please run the init command first:"))
    expect(log).toHaveBeenCalledWith(expect.stringContaining("npx @glass-ui-kit/cli@latest init"))
    expect(exit).toHaveBeenCalledWith(1)
  })

  it("prints conflicting install flag guidance at the command boundary", async () => {
    const error = vi.fn()
    const exit = vi.fn(() => {
      throw new Error("exit")
    })
    const action = createAddAction({
      runAddCommand: vi
        .fn()
        .mockRejectedValue(
          new AddCommandError(
            "invalid-combination",
            "Cannot combine --deps-only with --no-install.",
          ),
        ),
      error,
      log: vi.fn(),
      exit: exit as never,
    })

    await expect(action(["button"], { depsOnly: true, install: false })).rejects.toThrow("exit")

    expect(error).toHaveBeenCalledWith(
      expect.stringContaining("Cannot combine --deps-only with --no-install."),
    )
    expect(exit).toHaveBeenCalledWith(1)
  })
})
