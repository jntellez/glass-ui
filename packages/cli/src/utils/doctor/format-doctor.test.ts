import { describe, expect, it } from "vitest"
import { formatDoctorReport } from "./format-doctor"
import type { DoctorReport } from "./run-doctor"

const baseReport: DoctorReport = {
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

describe("formatDoctorReport", () => {
  it("renders deterministic ready output", () => {
    expect(formatDoctorReport(baseReport)).toBe(
      [
        "Glass UI Doctor",
        "Project root: /project",
        "Init readiness: ready",
        "Add readiness: ready",
        "",
        "Detected state:",
        "- Framework: vite (detected)",
        "- Package manager: pnpm (detected)",
        "- Config: glass.config.json (detected)",
        "- CSS: src/index.css (detected, exists)",
        "- Aliases: components=@/components/ui, utils=@/lib/utils",
        "",
        "Checks:",
        "✓ config — Found valid glass.config.json.",
        "✓ framework — Detected framework: vite.",
        "✓ package-manager — Detected package manager: pnpm.",
        "✓ css — CSS file is available at src/index.css.",
        "✓ aliases — Detected components and utils aliases.",
        "✓ add-readiness — Project is ready for add.",
      ].join("\n"),
    )
  })

  it("renders warnings with actionable next steps", () => {
    const warningReport: DoctorReport = {
      ...baseReport,
      packageManager: { value: "npm", source: "inferred" },
      checks: baseReport.checks.map((check) =>
        check.id === "package-manager"
          ? {
              ...check,
              status: "warn",
              summary: "No lockfile found; defaulting to npm.",
              detail:
                "Create or commit the lockfile used by this project to confirm the package manager.",
            }
          : check,
      ),
    }

    expect(formatDoctorReport(warningReport)).toContain(
      "! package-manager — No lockfile found; defaulting to npm.",
    )
    expect(formatDoctorReport(warningReport)).toContain(
      "  Next step: Create or commit the lockfile used by this project to confirm the package manager.",
    )
  })

  it("renders failing checks with remediation guidance", () => {
    const failingReport: DoctorReport = {
      ...baseReport,
      readiness: { init: true, add: false },
      config: {
        path: "glass.config.json",
        source: "missing",
      },
      checks: [
        {
          id: "config",
          status: "error",
          summary: "glass.config.json was not found.",
          detail: "Run `glass-ui init` in this project before running `glass-ui add`.",
        },
        {
          id: "add-readiness",
          status: "error",
          summary: "Project is not ready for add.",
          detail: "Create a valid glass.config.json with aliases before adding components.",
        },
      ],
    }

    expect(formatDoctorReport(failingReport)).toContain("Add readiness: not ready")
    expect(formatDoctorReport(failingReport)).toContain(
      "✖ config — glass.config.json was not found.",
    )
    expect(formatDoctorReport(failingReport)).toContain(
      "  Next step: Run `glass-ui init` in this project before running `glass-ui add`.",
    )
  })
})
