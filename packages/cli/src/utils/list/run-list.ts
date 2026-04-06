import { fetchRegistry } from "../registry"

export type ListOptions = {
  json?: boolean
}

export type ListRuntime = {
  fetchRegistry: typeof fetchRegistry
}

export const defaultRuntime: ListRuntime = {
  fetchRegistry,
}

export async function runListCommand(
  options: ListOptions = {},
  runtime: ListRuntime = defaultRuntime,
): Promise<string> {
  const registry = await runtime.fetchRegistry()

  if (options.json) {
    return JSON.stringify(registry, null, 2)
  }

  return registry.map((item) => item.name).join("\n")
}
