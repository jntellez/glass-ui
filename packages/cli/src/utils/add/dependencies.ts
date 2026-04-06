import type { RegistryItem } from "@glass-ui-kit/schema"

export function collectDependencies(items: RegistryItem[]): string[] {
  const dependencies: string[] = []
  const seen = new Set<string>()

  for (const item of items) {
    for (const dependency of item.dependencies || []) {
      if (seen.has(dependency)) {
        continue
      }

      seen.add(dependency)
      dependencies.push(dependency)
    }
  }

  return dependencies
}
