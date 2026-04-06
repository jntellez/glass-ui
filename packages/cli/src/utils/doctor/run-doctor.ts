import { exists, readFile, writeFile } from "../filesystem"
import {
  getCssPath,
  getFramework,
  getPackageManager,
  installDependencies,
} from "../get-project-info"
import { formatDoctorReport } from "./format-doctor"
import { inspectProject } from "./inspect-project"

export type DoctorStatus = "ok" | "warn" | "error"
export type DoctorSource = "detected" | "inferred" | "missing" | "invalid"
export type DoctorCheckId =
  | "config"
  | "framework"
  | "css"
  | "aliases"
  | "package-manager"
  | "add-readiness"

export type DoctorCheck = {
  id: DoctorCheckId
  status: DoctorStatus
  summary: string
  detail?: string
}

export type DoctorReport = {
  projectRoot: string
  framework: { value: Awaited<ReturnType<typeof getFramework>>; source: DoctorSource }
  packageManager: { value: Awaited<ReturnType<typeof getPackageManager>>; source: DoctorSource }
  config: {
    path: string
    source: DoctorSource
    aliases?: {
      components: string
      utils: string
    }
    css?: string
    error?: string
  }
  css: { path: string | null; exists: boolean; source: DoctorSource }
  readiness: { init: true; add: boolean }
  checks: DoctorCheck[]
}

export type DoctorOptions = {
  cwd?: string
  json?: boolean
}

export type DoctorRuntime = {
  cwd: () => string
  exists: (filePath: string, projectRoot?: string) => boolean
  readFile: (filePath: string, projectRoot?: string) => Promise<string>
  writeFile: typeof writeFile
  getFramework: typeof getFramework
  getPackageManager: typeof getPackageManager
  getCssPath: typeof getCssPath
  installDependencies: typeof installDependencies
  inspectProject: (options: DoctorOptions, runtime: DoctorRuntime) => Promise<DoctorReport>
  formatDoctorReport: (report: DoctorReport) => string
}

export type DoctorRuntimeOverrides = Partial<DoctorRuntime>

export const defaultRuntime: DoctorRuntime = {
  cwd: () => process.cwd(),
  exists,
  readFile,
  writeFile,
  getFramework,
  getPackageManager,
  getCssPath,
  installDependencies,
  inspectProject,
  formatDoctorReport,
}

export async function runDoctorCommand(
  options: DoctorOptions = {},
  runtime: DoctorRuntimeOverrides = defaultRuntime,
): Promise<string> {
  const resolvedRuntime: DoctorRuntime = { ...defaultRuntime, ...runtime }
  const report = await resolvedRuntime.inspectProject(options, resolvedRuntime)

  if (options.json) {
    return JSON.stringify(report, null, 2)
  }

  return resolvedRuntime.formatDoctorReport(report)
}
