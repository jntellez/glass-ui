import { describe, expect, it, vi } from "vitest"
import { GLASS_BASE_STYLES } from "../templates/styles"
import { UTILS_CN } from "../templates/utils"
import { InitCommandError, createInitAction, resolveInitPaths, runInitCommand } from "./init"

describe("resolveInitPaths", () => {
  it("resolves src-based defaults for vite projects", () => {
    expect(
      resolveInitPaths({
        projectRoot: "/project",
        hasSrc: true,
        framework: "vite",
        detectedCssPath: null,
      }),
    ).toEqual({
      framework: "vite",
      cssPath: "src/index.css",
      utilsRelativePath: "src/lib/utils.ts",
      utilsPath: "/project/src/lib/utils.ts",
      aliasPrefix: "@",
      config: {
        framework: "vite",
        style: "default",
        css: "src/index.css",
        aliases: {
          components: "@/components/ui",
          utils: "@/lib/utils",
        },
      },
    })
  })

  it("keeps root-level defaults when src is absent", () => {
    expect(
      resolveInitPaths({
        projectRoot: "/project",
        hasSrc: false,
        framework: "unknown",
        detectedCssPath: null,
      }),
    ).toEqual({
      framework: "unknown",
      cssPath: "index.css",
      utilsRelativePath: "lib/utils.ts",
      utilsPath: "/project/lib/utils.ts",
      aliasPrefix: "@",
      config: {
        framework: "unknown",
        style: "default",
        css: "index.css",
        aliases: {
          components: "@/components/ui",
          utils: "@/lib/utils",
        },
      },
    })
  })

  it("lets explicit css override win for next", () => {
    expect(
      resolveInitPaths({
        projectRoot: "/project",
        hasSrc: true,
        framework: "next",
        detectedCssPath: "styles/globals.css",
        cssOverride: "src/custom.css",
      }),
    ).toMatchObject({
      cssPath: "src/custom.css",
      utilsRelativePath: "src/lib/utils.ts",
      aliasPrefix: "@",
    })
  })

  it("derives config aliases and utils target from overrides", () => {
    expect(
      resolveInitPaths({
        projectRoot: "/project",
        hasSrc: true,
        framework: "react",
        detectedCssPath: null,
        componentsAliasOverride: "@/ui/components",
        utilsAliasOverride: "@/shared/utils",
      }),
    ).toEqual({
      framework: "react",
      cssPath: "src/index.css",
      utilsRelativePath: "src/shared/utils.ts",
      utilsPath: "/project/src/shared/utils.ts",
      aliasPrefix: "@",
      config: {
        framework: "react",
        style: "default",
        css: "src/index.css",
        aliases: {
          components: "@/ui/components",
          utils: "@/shared/utils",
        },
      },
    })
  })

  it("uses remix app paths and tilde aliases while preserving detected css candidates", () => {
    expect(
      resolveInitPaths({
        projectRoot: "/project",
        hasSrc: true,
        framework: "remix",
        detectedCssPath: "app/tailwind.css",
      }),
    ).toEqual({
      framework: "remix",
      cssPath: "app/tailwind.css",
      utilsRelativePath: "app/lib/utils.ts",
      utilsPath: "/project/app/lib/utils.ts",
      aliasPrefix: "~",
      config: {
        framework: "remix",
        style: "default",
        css: "app/tailwind.css",
        aliases: {
          components: "~/components/ui",
          utils: "~/lib/utils",
        },
      },
    })
  })
})

describe("runInitCommand", () => {
  it("uses cwd-aware roots, writes planned files, and installs by default", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const installDependencies = vi.fn().mockResolvedValue(undefined)
    const log = vi.fn()

    await runInitCommand(
      {
        cwd: "../target-app",
        css: "src/custom.css",
        components: "@/ui/components",
        utils: "@/shared/utils",
        framework: "react",
      },
      {
        cwd: () => "/workspace/current",
        exists: (filePath, baseDir) => filePath === "src" && baseDir === "/workspace/target-app",
        readFile: vi.fn(),
        writeFile,
        getFramework: async () => "vite",
        getPackageManager: async () => "pnpm",
        getCssPath: () => "src/main.css",
        installDependencies,
        log,
      },
    )

    expect(writeFile).toHaveBeenNthCalledWith(
      1,
      "glass.config.json",
      JSON.stringify(
        {
          framework: "react",
          style: "default",
          css: "src/custom.css",
          aliases: {
            components: "@/ui/components",
            utils: "@/shared/utils",
          },
        },
        null,
        2,
      ),
      "/workspace/target-app",
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      2,
      "src/shared/utils.ts",
      UTILS_CN,
      "/workspace/target-app",
    )
    expect(writeFile).toHaveBeenNthCalledWith(
      3,
      "src/custom.css",
      `@import "tailwindcss";\n\n${GLASS_BASE_STYLES}`,
      "/workspace/target-app",
    )
    expect(installDependencies).toHaveBeenCalledWith(
      ["clsx", "tailwind-merge", "lucide-react"],
      "pnpm",
      "/workspace/target-app",
    )
    expect(log).toHaveBeenCalledWith(expect.stringContaining("Project root: /workspace/target-app"))
    expect(log).toHaveBeenCalledWith(expect.stringContaining("Framework: react"))
  })

  it("skips existing generated files by default and honors no-install", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const installDependencies = vi.fn().mockResolvedValue(undefined)
    const log = vi.fn()

    await runInitCommand(
      {
        install: false,
      },
      {
        cwd: () => "/project",
        exists: (filePath, baseDir) =>
          baseDir === "/project" &&
          ["glass.config.json", "src/lib/utils.ts", "src/main.css", "src"].includes(filePath),
        readFile: vi.fn(async (filePath) =>
          filePath === "src/main.css" ? `@import "tailwindcss";\n\n${GLASS_BASE_STYLES}` : "",
        ),
        writeFile,
        getFramework: async () => "vite",
        getPackageManager: async () => "npm",
        getCssPath: () => "src/main.css",
        installDependencies,
        log,
      },
    )

    expect(writeFile).not.toHaveBeenCalled()
    expect(installDependencies).not.toHaveBeenCalled()
    expect(log).toHaveBeenCalledWith(expect.stringContaining("Skipped glass.config.json"))
    expect(log).toHaveBeenCalledWith(expect.stringContaining("Skipped src/lib/utils.ts"))
    expect(log).toHaveBeenCalledWith(expect.stringContaining("Skipped src/main.css"))
    expect(log).toHaveBeenCalledWith(
      expect.stringContaining("Skipped dependency installation (--no-install)."),
    )
  })

  it("updates existing css files with glass tokens when they are missing", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const installDependencies = vi.fn().mockResolvedValue(undefined)
    const log = vi.fn()

    await runInitCommand(
      {
        install: false,
      },
      {
        cwd: () => "/project",
        exists: (filePath, baseDir) =>
          baseDir === "/project" &&
          ["glass.config.json", "src/lib/utils.ts", "src/main.css", "src"].includes(filePath),
        readFile: vi.fn(async (filePath) =>
          filePath === "src/main.css" ? '@import "tailwindcss";\n' : "",
        ),
        writeFile,
        getFramework: async () => "vite",
        getPackageManager: async () => "npm",
        getCssPath: () => "src/main.css",
        installDependencies,
        log,
      },
    )

    expect(writeFile).toHaveBeenCalledTimes(1)
    expect(writeFile).toHaveBeenCalledWith(
      "src/main.css",
      `@import "tailwindcss";\n\n${GLASS_BASE_STYLES}\n`,
      "/project",
    )
    expect(log).toHaveBeenCalledWith(
      expect.stringContaining("Updated src/main.css with Glass tokens"),
    )
    expect(installDependencies).not.toHaveBeenCalled()
  })

  it("replaces existing generated files when force is enabled", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const log = vi.fn()

    await runInitCommand(
      {
        force: true,
      },
      {
        cwd: () => "/project",
        exists: (filePath, baseDir) =>
          baseDir === "/project" &&
          ["glass.config.json", "src/lib/utils.ts", "src/index.css", "src"].includes(filePath),
        readFile: vi.fn(),
        writeFile,
        getFramework: async () => "vite",
        getPackageManager: async () => "bun",
        getCssPath: () => null,
        installDependencies: vi.fn().mockResolvedValue(undefined),
        log,
      },
    )

    expect(writeFile).toHaveBeenCalledTimes(3)
    expect(log).toHaveBeenCalledWith(expect.stringContaining("Replaced glass.config.json"))
    expect(log).toHaveBeenCalledWith(expect.stringContaining("Replaced src/lib/utils.ts"))
    expect(log).toHaveBeenCalledWith(expect.stringContaining("Replaced src/index.css"))
  })

  it("wraps helper failures as InitCommandError", async () => {
    await expect(runInitCommand({ framework: "astro" as never })).rejects.toEqual(
      new InitCommandError(
        'Unsupported framework "astro". Supported values: react, vite, next, remix.',
      ),
    )
  })

  it("fails invalid framework overrides before writes or dependency installation", async () => {
    const writeFile = vi.fn().mockResolvedValue(undefined)
    const installDependencies = vi.fn().mockResolvedValue(undefined)
    const getFramework = vi.fn().mockResolvedValue("vite")
    const getPackageManager = vi.fn().mockResolvedValue("pnpm")

    await expect(
      runInitCommand(
        { framework: "astro" as never },
        {
          cwd: () => "/project",
          exists: vi.fn().mockReturnValue(false),
          readFile: vi.fn(),
          writeFile,
          getFramework,
          getPackageManager,
          getCssPath: vi.fn().mockReturnValue(null),
          installDependencies,
          log: vi.fn(),
        },
      ),
    ).rejects.toEqual(
      new InitCommandError(
        'Unsupported framework "astro". Supported values: react, vite, next, remix.',
      ),
    )

    expect(writeFile).not.toHaveBeenCalled()
    expect(installDependencies).not.toHaveBeenCalled()
    expect(getFramework).not.toHaveBeenCalled()
    expect(getPackageManager).not.toHaveBeenCalled()
  })
})

describe("createInitAction", () => {
  it("forwards parsed init flags through the command boundary", async () => {
    const runInitCommandMock = vi.fn().mockResolvedValue(undefined)

    await createInitAction({
      runInitCommand: runInitCommandMock,
      error: vi.fn(),
      exit: vi.fn(() => {
        throw new Error("exit")
      }) as unknown as (code: number) => never,
    })({
      cwd: "../demo-app",
      css: "src/app.css",
      components: "@/components/ui",
      utils: "@/lib/utils",
      framework: "next",
      force: true,
      install: false,
    })

    expect(runInitCommandMock).toHaveBeenCalledWith({
      cwd: "../demo-app",
      css: "src/app.css",
      components: "@/components/ui",
      utils: "@/lib/utils",
      framework: "next",
      force: true,
      install: false,
    })
  })

  it("prints preserved top-level failure output and exits", async () => {
    const error = vi.fn()
    const exit = vi.fn(() => {
      throw new Error("exit")
    }) as unknown as (code: number) => never

    await expect(
      createInitAction({
        runInitCommand: async () => {
          throw new InitCommandError("install failed")
        },
        error,
        exit,
      })(),
    ).rejects.toThrow("exit")

    expect(error).toHaveBeenNthCalledWith(1, expect.stringContaining("Initialization failed:"))
    expect(error).toHaveBeenNthCalledWith(2, expect.stringContaining("install failed"))
    expect(exit).toHaveBeenCalledWith(1)
  })
})
