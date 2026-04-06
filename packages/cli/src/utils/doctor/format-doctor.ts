import type { DoctorCheck, DoctorReport } from "./run-doctor"

function formatCheck(check: DoctorCheck) {
  const icon = check.status === "ok" ? "✓" : check.status === "warn" ? "!" : "✖"
  const lines = [`${icon} ${check.id} — ${check.summary}`]

  if (check.detail) {
    lines.push(`  Next step: ${check.detail}`)
  }

  return lines.join("\n")
}

export function formatDoctorReport(report: DoctorReport) {
  const aliasLine = report.config.aliases
    ? `- Aliases: components=${report.config.aliases.components}, utils=${report.config.aliases.utils}`
    : "- Aliases: missing"

  return [
    "Glass UI Doctor",
    `Project root: ${report.projectRoot}`,
    `Init readiness: ${report.readiness.init ? "ready" : "not ready"}`,
    `Add readiness: ${report.readiness.add ? "ready" : "not ready"}`,
    "",
    "Detected state:",
    `- Framework: ${report.framework.value} (${report.framework.source})`,
    `- Package manager: ${report.packageManager.value} (${report.packageManager.source})`,
    `- Config: ${report.config.path} (${report.config.source})`,
    `- CSS: ${report.css.path ?? "unresolved"} (${report.css.source}, ${report.css.exists ? "exists" : "missing"})`,
    aliasLine,
    "",
    "Checks:",
    ...report.checks.map(formatCheck),
  ].join("\n")
}
