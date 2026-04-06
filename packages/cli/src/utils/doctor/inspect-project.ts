import { z } from "zod"
import { getLockfilePath, resolveProjectRoot } from "../get-project-info"
import type { DoctorCheck, DoctorOptions, DoctorReport, DoctorRuntime } from "./run-doctor"

type DoctorInspectRuntime = Pick<
  DoctorRuntime,
  "cwd" | "exists" | "readFile" | "getFramework" | "getPackageManager" | "getCssPath"
>

const configSchema = z.object({
  framework: z.enum(["react", "next", "vite", "astro", "remix", "unknown"]),
  style: z.string(),
  css: z.string().min(1),
  aliases: z.object({
    components: z.string().min(1),
    utils: z.string().min(1),
  }),
})

function buildChecks(report: Omit<DoctorReport, "checks">): DoctorCheck[] {
  const checks: DoctorCheck[] = []

  if (report.config.source === "detected") {
    checks.push({ id: "config", status: "ok", summary: "Found valid glass.config.json." })
  } else if (report.config.source === "missing") {
    checks.push({
      id: "config",
      status: "error",
      summary: "glass.config.json was not found.",
      detail: "Run `glass-ui init` in this project before running `glass-ui add`.",
    })
  } else {
    checks.push({
      id: "config",
      status: "error",
      summary: "glass.config.json is invalid.",
      detail: report.config.error ?? "Fix the config JSON and try doctor again.",
    })
  }

  if (report.framework.source === "detected") {
    checks.push({
      id: "framework",
      status: "ok",
      summary: `Detected framework: ${report.framework.value}.`,
    })
  } else {
    checks.push({
      id: "framework",
      status: "warn",
      summary: `Could not confidently detect the framework; using ${report.framework.value}.`,
      detail:
        "Check package.json dependencies or pass an explicit framework during `glass-ui init`.",
    })
  }

  if (report.packageManager.source === "detected") {
    checks.push({
      id: "package-manager",
      status: "ok",
      summary: `Detected package manager: ${report.packageManager.value}.`,
    })
  } else {
    checks.push({
      id: "package-manager",
      status: "warn",
      summary: `No lockfile found; defaulting to ${report.packageManager.value}.`,
      detail: "Create or commit the lockfile used by this project to confirm the package manager.",
    })
  }

  if (report.css.path && report.css.exists && report.css.source === "detected") {
    checks.push({
      id: "css",
      status: "ok",
      summary: `CSS file is available at ${report.css.path}.`,
    })
  } else if (report.css.path && report.css.exists) {
    checks.push({
      id: "css",
      status: "warn",
      summary: `CSS path was inferred as ${report.css.path}.`,
      detail: "Save the CSS path in glass.config.json to confirm it explicitly.",
    })
  } else if (report.css.path) {
    checks.push({
      id: "css",
      status: "warn",
      summary: `CSS file is missing at ${report.css.path}.`,
      detail: "Create the CSS file or update glass.config.json to point at the correct path.",
    })
  } else {
    checks.push({
      id: "css",
      status: "warn",
      summary: "Could not resolve a CSS file path.",
      detail: "Set the css field in glass.config.json or rerun `glass-ui init`.",
    })
  }

  if (report.config.aliases) {
    checks.push({
      id: "aliases",
      status: "ok",
      summary: "Detected components and utils aliases.",
    })
  } else {
    checks.push({
      id: "aliases",
      status: "error",
      summary: "Components and utils aliases are missing.",
      detail: "Save both aliases in glass.config.json so generated imports resolve correctly.",
    })
  }

  if (report.readiness.add) {
    checks.push({ id: "add-readiness", status: "ok", summary: "Project is ready for add." })
  } else {
    checks.push({
      id: "add-readiness",
      status: "error",
      summary: "Project is not ready for add.",
      detail: "Create a valid glass.config.json with aliases before adding components.",
    })
  }

  return checks
}

export async function inspectProject(
  options: DoctorOptions = {},
  runtime: DoctorInspectRuntime,
): Promise<DoctorReport> {
  const projectRoot = resolveProjectRoot(options.cwd, runtime.cwd())

  if (!runtime.exists(".", projectRoot)) {
    throw new Error(
      `Could not inspect directory "${projectRoot}": path does not exist or is not accessible.`,
    )
  }

  const hasPackageJson = runtime.exists("package.json", projectRoot)
  const frameworkValue = await runtime.getFramework(projectRoot)
  const frameworkSource = hasPackageJson && frameworkValue !== "unknown" ? "detected" : "inferred"

  const packageManagerValue = await runtime.getPackageManager(projectRoot)
  const packageManagerSource = getLockfilePath(projectRoot, runtime.exists)
    ? "detected"
    : "inferred"

  let config: DoctorReport["config"] = {
    path: "glass.config.json",
    source: "missing",
  }

  if (runtime.exists("glass.config.json", projectRoot)) {
    try {
      const parsed = configSchema.parse(
        JSON.parse(await runtime.readFile("glass.config.json", projectRoot)),
      )

      config = {
        path: "glass.config.json",
        source: "detected",
        css: parsed.css,
        aliases: parsed.aliases,
      }
    } catch (error) {
      config = {
        path: "glass.config.json",
        source: "invalid",
        error: error instanceof Error ? `Invalid config: ${error.message}` : "Invalid config.",
      }
    }
  }

  const cssPath = config.css ?? runtime.getCssPath(frameworkValue, projectRoot)
  const cssSource = config.css ? "detected" : cssPath ? "inferred" : "missing"
  const cssExists = cssPath ? runtime.exists(cssPath, projectRoot) : false
  const readiness = {
    init: true as const,
    add:
      config.source === "detected" &&
      Boolean(config.aliases?.components) &&
      Boolean(config.aliases?.utils),
  }

  const reportWithoutChecks: Omit<DoctorReport, "checks"> = {
    projectRoot,
    framework: { value: frameworkValue, source: frameworkSource },
    packageManager: { value: packageManagerValue, source: packageManagerSource },
    config,
    css: {
      path: cssPath,
      exists: cssExists,
      source: cssSource,
    },
    readiness,
  }

  return {
    ...reportWithoutChecks,
    checks: buildChecks(reportWithoutChecks),
  }
}
