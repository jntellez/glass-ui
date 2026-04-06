import type { RegistryIndex, RegistryItem } from "@glass-ui-kit/schema"
import { getItems } from "../registry"

export type AddSelectionResult =
  | { ok: true; items: RegistryItem[] }
  | {
      ok: false
      reason: "empty-selection" | "invalid-combination" | "missing-components"
      names?: string[]
    }

function dedupeNames(names: string[]): string[] {
  const uniqueNames: string[] = []
  const seen = new Set<string>()

  for (const name of names) {
    if (seen.has(name)) {
      continue
    }

    seen.add(name)
    uniqueNames.push(name)
  }

  return uniqueNames
}

export function resolveAddSelection(
  registry: RegistryIndex,
  requestedNames: string[],
  selectAll: boolean,
): AddSelectionResult {
  if (selectAll && requestedNames.length > 0) {
    return { ok: false, reason: "invalid-combination" }
  }

  if (selectAll) {
    return { ok: true, items: registry }
  }

  const uniqueRequestedNames = dedupeNames(requestedNames)

  if (uniqueRequestedNames.length === 0) {
    return { ok: false, reason: "empty-selection" }
  }

  const { items, missing } = getItems(registry, uniqueRequestedNames)

  if (missing.length > 0) {
    return { ok: false, reason: "missing-components", names: missing }
  }

  return { ok: true, items }
}
