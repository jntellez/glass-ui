import type { RegistryItem } from "@glass-ui-kit/schema"

function formatDependencySection(label: string, values: string[] | undefined) {
  return `${label}: ${values && values.length > 0 ? values.join(", ") : "None"}`
}

export function formatInfo(item: RegistryItem): string {
  const lines = [
    `Name: ${item.name}`,
    `Type: ${item.type}`,
    "Files:",
    ...item.files.map((file) => `- ${file.path} (${file.type})`),
    formatDependencySection("Dependencies", item.dependencies),
    formatDependencySection("Dev Dependencies", item.devDependencies),
    formatDependencySection("Registry Dependencies", item.registryDependencies),
  ]

  if (item.meta?.requiresBlur !== undefined) {
    lines.push(`Requires Blur: ${item.meta.requiresBlur}`)
  }

  return lines.join("\n")
}
