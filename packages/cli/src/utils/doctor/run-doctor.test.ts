import { describe, expect, it, vi } from "vitest"
import { runDoctorCommand, type DoctorReport } from "./run-doctor"

const readyReport: DoctorReport = {
  projectRoot: "/project",
  framework: { value: "vite", source: "detected" },
  packageManager: { value: "pnpm", source: "detected" },
  config: {
    path: "glass.config.json",
    source: "detected",
    css: "src/index.css",
    aliases: {
      components: "@/components/ui",
      utils: "@/lib/utils",
    },
  },
  css: {
    path: "src/index.css",
    exists: true,
    source: "detected",
  },
  readiness: { init: true, add: true },
  checks: [
    { id: "config", status: "ok", summary: "Found valid glass.config.json." },
    { id: "framework", status: "ok", summary: "Detected framework: vite." },
    { id: "package-manager", status: "ok", summary: "Detected package manager: pnpm." },
    { id: "css", status: "ok", summary: "CSS file is available at src/index.css." },
    {
      id: "aliases",
      status: "ok",
      summary: "Detected components and utils aliases.",
    },
    { id: "add-readiness", status: "ok", summary: "Project is ready for add." },
  ],
}

describe("runDoctorCommand", () => {
  it("returns default text output that reports add readiness", async () => {
    const output = await runDoctorCommand(
      {},
      {
        inspectProject: vi.fn().mockResolvedValue(readyReport),
        formatDoctorReport: vi.fn().mockReturnValue("Add readiness: ready"),
      },
    )

    expect(output).toBe("Add readiness: ready")
  })

  it("emits valid json only when json mode is enabled", async () => {
    const output = await runDoctorCommand(
      { json: true },
      {
        inspectProject: vi.fn().mockResolvedValue(readyReport),
        formatDoctorReport: vi.fn(() => {
          throw new Error("text formatter should not run")
        }),
      },
    )

    expect(JSON.parse(output)).toEqual(readyReport)
  })

  it("never attempts file writes or dependency installs while diagnosing", async () => {
    const writeFile = vi.fn()
    const installDependencies = vi.fn()

    await runDoctorCommand(
      {},
      {
        inspectProject: vi.fn().mockImplementation(async (_options, runtime) => {
          expect(runtime.writeFile).toBe(writeFile)
          expect(runtime.installDependencies).toBe(installDependencies)
          return readyReport
        }),
        formatDoctorReport: vi.fn().mockReturnValue("ok"),
        writeFile,
        installDependencies,
      },
    )

    expect(writeFile).not.toHaveBeenCalled()
    expect(installDependencies).not.toHaveBeenCalled()
  })
})
